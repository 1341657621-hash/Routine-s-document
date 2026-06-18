#!/usr/bin/env node
/**
 * sync-from-local.js
 * 将本地 OpenClaw workspace 的变更同步到 GitHub 仓库
 * 
 * 用法:
 *   node scripts/sync-from-local.js
 * 
 * 环境变量:
 *   LOCAL_WORKSPACE  - 本地 workspace 路径（默认: C:\Users\Routi\.kimi_openclaw\workspace）
 *   REPO_PATH        - Git 仓库路径（默认: 当前目录）
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const LOCAL_WORKSPACE = process.env.LOCAL_WORKSPACE || 'C:\\Users\\Routi\\.kimi_openclaw\\workspace';
const REPO_PATH = process.env.REPO_PATH || __dirname;

// 定义同步映射规则
const SYNC_MAP = [
  // Skills
  { src: 'skills/hipapa-media-analyst/SKILL.md',                       dest: 'skills/hipapa-media-analyst/SKILL.md' },
  { src: 'skills/hipapa-media-analyst/assets/',                        dest: 'skills/hipapa-media-analyst/assets/' },
  { src: 'skills/hipapa-media-analyst/references/',                    dest: 'skills/hipapa-media-analyst/references/' },
  { src: 'skills/brand-social-media-planner/SKILL.md',                 dest: 'skills/brand-social-media-planner/SKILL.md' },
  { src: 'skills/brand-social-media-planner/references/',              dest: 'skills/brand-social-media-planner/references/' },
  { src: 'skills/beauty-signal-reporter/SKILL.md',                     dest: 'skills/beauty-signal-reporter/SKILL.md' },
  { src: 'skills/beauty-signal-reporter/*.html',                       dest: 'skills/beauty-signal-reporter/' },
  { src: 'skills/beauty-signal-reporter/*.md',                         dest: 'skills/beauty-signal-reporter/' },
  { src: 'skills/invest-analyst-pro/SKILL.md',                         dest: 'skills/invest-analyst-pro/SKILL.md' },
  { src: 'skills/invest-analyst-pro/references/',                      dest: 'skills/invest-analyst-pro/references/' },
  { src: 'skills/kimi-webbridge-desktop/SKILL.md',                     dest: 'skills/kimi-webbridge-desktop/SKILL.md' },
  { src: 'skills/kimi-webbridge-desktop/references/',                  dest: 'skills/kimi-webbridge-desktop/references/' },
  { src: 'skills/kimi-webbridge-desktop/scripts/',                     dest: 'skills/kimi-webbridge-desktop/scripts/' },

  // Projects
  { src: 'projects/business-leads/execution-plan.md',                  dest: 'projects/business-leads/execution-plan.md' },
  { src: 'projects/business-leads/project-cards/',                     dest: 'projects/business-leads/project-cards/' },
  { src: 'projects/business-leads/templates/',                         dest: 'projects/business-leads/templates/' },
  { src: 'projects/business-leads/weekly/',                            dest: 'projects/business-leads/weekly/' },

  // Dashboards
  { src: 'hipapa-dashboard/',                                         dest: 'dashboards/hipapa/' },

  // Configs
  { src: 'feishu_bot_config.md',                                      dest: 'configs/feishu-bot.md' },
  { src: 'auto_pipeline_config.md',                                   dest: 'configs/auto-pipeline.md' },

  // Reports (按时间戳命名，保留历史)
  { src: 'competitor_analysis.md',                                    dest: 'reports/competitor-analysis-latest.md' },
  { src: 'competitor_analysis_*.md',                                  dest: 'reports/' },
  { src: 'hipapa_monthly_report_*.md',                                dest: 'reports/' },
  { src: 'weekly_top5_content_report*.md',                            dest: 'reports/' },

  // Scripts
  { src: 'github_deploy.js',                                          dest: 'scripts/github-deploy.js' },
  { src: 'feishu_push.js',                                            dest: 'scripts/feishu-push.js' },
  { src: 'feishu_card_push.js',                                       dest: 'scripts/feishu-card-push.js' },
  { src: 'feishu_card_review_push.js',                                dest: 'scripts/feishu-card-review-push.js' },
  { src: 'extract_vi.js',                                             dest: 'scripts/extract-vi.js' },
  { src: 'github_check.js',                                           dest: 'scripts/github-check.js' },
];

function log(msg) {
  console.log(`[${new Date().toISOString()}] ${msg}`);
}

function copyFile(src, dest) {
  try {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
    return true;
  } catch (e) {
    log(`❌ 复制失败: ${src} -> ${dest}: ${e.message}`);
    return false;
  }
}

function copyDir(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) {
    log(`⚠️ 源目录不存在: ${srcDir}`);
    return 0;
  }
  
  let count = 0;
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      count += copyDir(srcPath, destPath);
    } else {
      if (copyFile(srcPath, destPath)) count++;
    }
  }
  return count;
}

function expandGlob(pattern, baseDir) {
  const parts = pattern.split('/');
  let current = [baseDir];
  
  for (const part of parts) {
    if (part === '') continue;
    const next = [];
    for (const dir of current) {
      if (!fs.existsSync(dir)) continue;
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      const regex = new RegExp('^' + part.replace(/\*/g, '.*').replace(/\?/g, '.') + '$');
      for (const entry of entries) {
        if (regex.test(entry.name)) {
          next.push(path.join(dir, entry.name));
        }
      }
    }
    current = next;
  }
  return current;
}

function sync() {
  log('🚀 开始同步本地 workspace 到 GitHub 仓库...');
  let totalCopied = 0;

  for (const rule of SYNC_MAP) {
    const srcPath = path.join(LOCAL_WORKSPACE, rule.src);
    const destPath = path.join(REPO_PATH, rule.dest);

    if (rule.src.endsWith('/')) {
      // 目录同步
      const count = copyDir(srcPath, destPath);
      totalCopied += count;
      if (count > 0) log(`📁 同步目录: ${rule.src} -> ${rule.dest} (${count} 个文件)`);
    } else if (rule.src.includes('*')) {
      // Glob 模式
      const matches = expandGlob(rule.src, LOCAL_WORKSPACE);
      for (const match of matches) {
        const relPath = path.relative(LOCAL_WORKSPACE, match);
        const fileName = path.basename(match);
        const destFile = path.join(destPath, fileName);
        if (copyFile(match, destFile)) totalCopied++;
      }
      if (matches.length > 0) log(`🌐 Glob匹配: ${rule.src} -> ${rule.dest} (${matches.length} 个文件)`);
    } else {
      // 单文件
      if (fs.existsSync(srcPath)) {
        if (copyFile(srcPath, destPath)) {
          totalCopied++;
          log(`📄 同步文件: ${rule.src} -> ${rule.dest}`);
        }
      } else {
        log(`⚠️ 源文件不存在: ${srcPath}`);
      }
    }
  }

  log(`✅ 同步完成，共复制 ${totalCopied} 个文件`);
  return totalCopied;
}

function gitCommitAndPush() {
  try {
    log('📦 检查 Git 变更...');
    
    // 检查是否有变更
    const status = execSync('git status --porcelain', { cwd: REPO_PATH, encoding: 'utf-8' }).trim();
    if (!status) {
      log('ℹ️ 没有变更需要提交');
      return false;
    }

    // 添加所有变更
    execSync('git add -A', { cwd: REPO_PATH, stdio: 'inherit' });
    
    // 提交
    const now = new Date().toISOString();
    const msg = `🤖 自动同步: ${now}`;
    execSync(`git commit -m "${msg}"`, { cwd: REPO_PATH, stdio: 'inherit' });
    
    // 推送
    execSync('git push origin main', { cwd: REPO_PATH, stdio: 'inherit' });
    
    log('🎉 成功推送到 GitHub！');
    return true;
  } catch (e) {
    log(`❌ Git 操作失败: ${e.message}`);
    return false;
  }
}

// 主流程
const copied = sync();
if (copied > 0) {
  gitCommitAndPush();
} else {
  log('ℹ️ 无文件变更，跳过 Git 提交');
}
