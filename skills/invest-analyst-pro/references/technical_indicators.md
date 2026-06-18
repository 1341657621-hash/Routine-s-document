# Technical Indicators Reference — A-Share Edition

## RSI (Relative Strength Index)

### Calculation
```
RSI = 100 - (100 / (1 + RS))
RS = Average of X days' up closes / Average of X days' down closes
```
Standard period: 14 days.

### A-Share Adjustments
- Limit-up/limit-down days: RSI may flatten at extremes. Use 9-day RSI for faster signals in high-volatility small-caps.
- Interpretation thresholds:
  - >70: Overbought (consider profit-taking)
  - 30-70: Neutral
  - <30: Oversold (potential bounce, but can stay oversold in downtrends)
  - >80 or <20: Extreme — high probability of reversal or continuation exhaustion

## MACD (Moving Average Convergence Divergence)

### Calculation
```
EMA(12) - EMA(26) = MACD Line
EMA(9) of MACD Line = Signal Line
MACD Histogram = MACD Line - Signal Line
```

### A-Share Adjustments
- Use standard parameters (12, 26, 9) for blue-chips and large-caps.
- For small-caps/high-beta: consider (6, 13, 5) for faster response.
- Lag is significant in gap-up/gap-down scenarios — confirm with volume.

### Signal Interpretation
- MACD Line crosses above Signal Line: Bullish (but verify with volume)
- MACD Line crosses below Signal Line: Bearish
- Histogram expanding: Momentum accelerating
- Histogram contracting: Momentum decelerating (potential reversal)
- Divergence (price makes new high/low, MACD doesn't): High-confidence reversal signal

## ATR (Average True Range)

### Calculation
```
TR = max(High - Low, |High - Previous Close|, |Low - Previous Close|)
ATR(14) = 14-day SMA of TR
ATR% = ATR / Close * 100
```

### A-Share Specifics
- Normal ATR% for large-caps: 1.5% - 3.5%
- Normal ATR% for small-caps: 3% - 8%
- ATR% > 10%: Extreme volatility — reduce position size or avoid new entries
- Use ATR for stop-loss placement: 1.5x ATR below entry for longs

## Moving Averages

### Standard Setup
- MA5 (5-day): Short-term trend
- MA10 (10-day): Short-term support/resistance
- MA20 (20-day): Primary trend direction
- MA60 (60-day): Intermediate trend

### Golden Cross / Death Cross
- Golden Cross: MA5 crosses above MA20 — short-term bullish
- Death Cross: MA5 crosses below MA20 — short-term bearish
- MA20 crosses above MA60: Strong bullish confirmation
- MA20 crosses below MA60: Strong bearish confirmation

### A-Share Adjustments
- Whipsaws are common in sideways markets. Use MA10 + MA30 instead of MA5 + MA20 for smoother signals.
- In strong trends, price can stay above/below MA5 for extended periods — don't treat every touch as reversal.

## Volume Analysis

### Key Metrics
- **Volume Ratio**: 5-day avg volume / 20-day avg volume
  - > 1.5: Significant increase in interest
  - > 2.0: Breakout/breakdown confirmation level
  - < 0.7: Declining interest — trend may be losing momentum
- **Volume-Price Relationship**:
  - Price up + Volume up: Healthy rally
  - Price up + Volume down: Weak rally — suspect
  - Price down + Volume up: Distribution — bearish
  - Price down + Volume down: Declining interest — potential bottoming

### A-Share Specifics
- Pre-market auction (9:15-9:25) volume can indicate overnight sentiment. Compare to previous days.
- Post-market (15:00-15:30) fixed-price volume for ETFs — less relevant for individual stocks.
- Limit-up days often show volume contraction (locked limit-up) — not a signal of weakness.

## Bollinger Bands

### Calculation
```
Middle Band = MA(20)
Upper Band = MA(20) + (2 * STD(20))
Lower Band = MA(20) - (2 * STD(20))
```

### Interpretation
- Price touching Upper Band: Overbought short-term, but can "walk the band" in strong trends
- Price touching Lower Band: Oversold short-term
- Band squeeze (narrowing): Volatility compression — expect expansion/move soon
- Band expansion: Volatility expansion — trend likely continuing
- %B indicator: (Price - Lower) / (Upper - Lower). >1 = above upper, <0 = below lower.

## KDJ (Stochastic Oscillator)

### A-Share Popularity
KDJ is widely used by Chinese retail investors. Include for completeness.

### Calculation
```
RSV = (Close - Lowest Low(9)) / (Highest High(9) - Lowest Low(9)) * 100
K = 2/3 * Previous K + 1/3 * RSV
D = 2/3 * Previous D + 1/3 * K
J = 3K - 2D
```

### Signals
- K crosses above D below 20: Buy signal
- K crosses below D above 80: Sell signal
- J > 100: Extreme overbought
- J < 0: Extreme oversold
- Divergence between price and KDJ: Reversal signal

## Support & Resistance

### Identification Methods
1. **Recent Lows/Highs**: Last 10-20 session lows form support, highs form resistance
2. **Moving Averages**: MA20 and MA60 often act as dynamic support/resistance
3. **Volume Profile**: High-volume nodes (price levels with most trading) are strong S/R
4. **Psychological Levels**: Round numbers (e.g., ¥10, ¥50, ¥100) often act as S/R

### A-Share Considerations
- Limit-down levels create "hard" support/resistance — price may bounce there due to trading halts.
- Gap areas (untraded price zones) often become future S/R when revisited.
