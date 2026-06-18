# Sample Report Examples

## Example 1: Full Portfolio Review (5 Holdings)

```markdown
# 📊 A-Stock Portfolio Review — 2026-05-15

## Executive Summary
- Portfolio Value: ¥85,320.70
- Day P&L: ¥-1,982.86 (-2.27%)
- Total P&L: ¥+4,105.69 (+5.05%)
- Strategy Bias: Defensive (3 of 9 stocks flagged for risk)

---

## 🔬 Per-Stock Technical Diagnosis

### 永鼎股份 (600105.SH)
| Metric | Value | Signal |
|--------|-------|--------|
| Trend | Bearish (Price < MA20 < MA60) | ⚠️ |
| RSI(14) | 38.2 | Neutral-Oversold |
| MACD | Below signal, histogram expanding negative | Bearish |
| ATR | 2.8% | Normal |
| Volume | 156.5万 | Below avg (85% of 20-day) |
| Position vs Cost | -7.0% | Underwater |
| Close Quality | 45% | Neutral |

**Verdict**: WATCH — Price below all key MAs but RSI not yet extreme. Volume declining suggests selling exhaustion may be near. Hold with stop at ¥49.50.

### 拓维信息 (002261.SZ)
| Metric | Value | Signal |
|--------|-------|--------|
| Trend | Sideways (Price between MA10 and MA20) | ⚠️ |
| RSI(14) | 44.5 | Neutral |
| MACD | Near zero line, flat histogram | Neutral |
| ATR | 4.2% | High |
| Volume | 75.5万 | Above avg (132% of 20-day) |
| Position vs Cost | -6.8% | Underwater |
| Close Quality | 68% | Strong (recovered from -6.8% to -1.0%) |

**Verdict**: HOLD — Dramatic intraday recovery suggests support at ¥32.50 is valid. High volatility but strong close. Set alert at ¥32.00.

### 中国核电 (601985.SH)
| Metric | Value | Signal |
|--------|-------|--------|
| Trend | Bullish (Price > MA20 > MA60) | ✅ |
| RSI(14) | 58.7 | Neutral |
| MACD | Above signal, histogram positive | Bullish |
| ATR | 1.6% | Low |
| Volume | 89.8万 | Normal (102% of 20-day) |
| Position vs Cost | +5.5% | In profit |
| Close Quality | 72% | Strong |

**Verdict**: HOLD — Healthy uptrend with moderate momentum. Low volatility, steady volume. Trailing stop at ¥8.75 (4% below current).

---

## ⚠️ Risk Alerts

1. **永鼎股份 — Cost Breach** — Price closed ¥3.89 below cost basis (-7.0%). 20-day MA broken with volume. High priority.
2. **拓维信息 — Intraday Volatility** — Swung from -6.8% to -1.0% in final 10 minutes. High-beta behavior suggests uncertainty. Monitor tomorrow's open.
3. **中钨高新 — Trend Break** — Price below MA20 for 3 consecutive days. Volume 85% of average — weak bounce attempt failed.

---

## 📈 Next-Day Strategy Matrix

| Stock | Action | Trigger Price | Size | Horizon | Invalidation |
|-------|--------|---------------|------|---------|--------------|
| 永鼎股份 | WATCH | Stop at ¥49.50 | 100% hold | 1-3 days | Volume spike >200% on break below ¥49 |
| 拓维信息 | HOLD | Alert at ¥32.00 | 100% hold | Intraday | Gap down >2% at open |
| 中钨高新 | TRIM | If rallies to ¥58.00 | -50% | 1-2 days | Breaks below ¥55 with volume |
| 中国核电 | HOLD | Trailing stop ¥8.75 | 100% hold | 1-2 weeks | Closes below MA20 |
| 工业富联 | HOLD | Alert at ¥66.00 | 100% hold | 1-3 days | RSI drops below 40 |

---

## 🏛️ Market Context

- CSI 300: -1.2% — Bearish bias, broad-based decline
- Sector Flow: Technology (-2.8%), Energy (+0.5%). Portfolio tech-heavy, underperforming
- Breadth: Narrow — Only 28% of stocks advanced. Index held by financials/defensives.
- Overnight Catalysts: None noted

---

## 🔄 Validation Notes

- Defensive bias warranted given 3 underwater positions and broad market weakness
- Consider rotating from tech (拓维, 永鼎) to defensive if market continues lower
- Re-evaluate all stops if CSI 300 gaps >1% either direction at next open
```

## Example 2: Single Stock Deep Dive

```markdown
# 📊 Single-Stock Review — 贵州茅台 (600519.SH)

## Executive Summary
- Current Price: ¥1,680.00
- Day P&L: +1.2%
- Position vs Cost: +12.3%
- Strategy Bias: Hold with trailing stop

## Technical Diagnosis

### Trend Structure
- Primary: Bullish (Price > MA20 > MA60 > MA120)
- Intermediate: Bullish (MA20 slope positive, 15° angle)
- Short-term: Price pulled back to MA10 — normal consolidation

### Key Levels
- Resistance: ¥1,720 (previous high, psychological ¥1,700)
- Support: ¥1,650 (MA10), ¥1,600 (MA20, strong)
- ATR(14): ¥32.50 (1.93% of price — normal for 茅台)

### Momentum
- RSI(14): 62.5 — Neutral-bullish, room to run before overbought
- MACD: Above signal, histogram positive but contracting — momentum easing
- KDJ: K=65, D=58, J=79 — Neutral, not yet extreme

### Volume
- 5-day avg: 12,500 lots
- Today: 11,200 lots (90% of avg — slight decline)
- Interpretation: Healthy consolidation, no distribution signs

## Verdict

**HOLD** — Bullish trend intact. Pullback to MA10 is normal within uptrend. RSI and MACD suggest no urgency to take profits yet. Volume declining on consolidation is constructive.

## Next-Day Strategy

| Parameter | Value |
|-----------|-------|
| Action | HOLD |
| Entry (if adding) | ¥1,650 at MA10 |
| Stop-loss | ¥1,580 (below MA20, 6% risk) |
| Target | ¥1,750 (previous resistance + ATR extension) |
| Size | Maintain 100%, add 20% if ¥1,650 holds with volume |
| Invalidation | Close below ¥1,600 on volume >150% avg |

## Risk Alerts

None — No alerts triggered. All metrics within normal ranges for this stock's volatility profile.
```

## Example 3: Defensive/Rebalance Review

```markdown
# 📊 Portfolio Rebalance Review — 2026-05-15

## Executive Summary
- Portfolio Value: ¥500,000
- Day P&L: -¥8,500 (-1.7%)
- Total P&L: +¥45,000 (+9.9%)
- Strategy Bias: DEFENSIVE — Market showing distribution signs

## Market Context Analysis

### Broad Market
- SSE Composite: -1.5%, broke below MA20
- CSI 300: -1.8%, volume 125% of avg (distribution volume)
- Advance/Decline: 1,200 up / 3,800 down (23% advanced — weak breadth)
- Sector leaders: Banking, Utilities, Energy (defensive rotation)
- Sector laggards: Tech, Biotech, New Energy (growth selloff)

### Portfolio Correlation
- Portfolio beta to CSI 300: 1.15 (slightly more volatile than market)
- Correlation: 0.82 (highly correlated — not enough diversification)
- Max drawdown (30-day): -8.5% vs CSI 300 -5.2% (underperforming in down moves)

## Rebalance Recommendations

### Immediate Actions
1. **Reduce Tech Exposure** (currently 45% of portfolio)
   - Trim 拓维信息 to 50% of current size
   - Trim 永鼎股份 to 60% of current size
   - Target: Tech allocation to 25%

2. **Add Defensive Positions**
   - Consider adding 银行ETF (512800) or 长江电力
   - Target: Defensive allocation to 20%

3. **Raise Cash**
   - Current: 5% cash
   - Target: 15% cash for opportunities
   - Source: Tech trim proceeds

### Position-Level Adjustments

| Stock | Current | Target | Action | Rationale |
|-------|---------|--------|--------|-----------|
| 拓维信息 | 15% | 8% | Trim 50% | High beta, breaking support |
| 永鼎股份 | 12% | 7% | Trim 40% | Underwater, trend broken |
| 中国核电 | 8% | 10% | Add | Defensive, dividend yield, uptrend |
| 银行ETF | 0% | 10% | New buy | Sector rotation leader, low beta |
| Cash | 5% | 15% | Build | Opportunity reserve |

## Risk Management

- Stop all remaining tech positions if SSE Composite breaks 3,100
- Re-evaluate if breadth improves to >50% stocks advancing for 3 consecutive days
- Consider hedging with 买入看跌期权 on CSI 300 if portfolio value drops below ¥480,000
```
