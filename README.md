# w2-black-friday-v2-20261127

[![make.fun · black-friday-deal-finder-01](https://make.fun/badge/black-friday-deal-finder-01.svg)](https://make.fun/bounty/black-friday-deal-finder-01?utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01)
[![rank](https://make.fun/badge/black-friday-deal-finder-01/JohnyKucel/w2-black-friday-v2-20261127/rank.svg)](https://make.fun/bounty/black-friday-deal-finder-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01)
[![reward](https://make.fun/badge/black-friday-deal-finder-01/JohnyKucel/w2-black-friday-v2-20261127/reward.svg)](https://make.fun/bounty/black-friday-deal-finder-01?utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01)

TrueLow — a real Black Friday / Cyber Monday deal finder. 36 deals across 5 stores (Amazon, Best Buy, Walmart, Target, Costco) and 11 categories, every sale price and usual price checked on 27 Nov 2026 against a store announcement or a deal roundup naming the store and the price. Each deal carries an honest verdict — New Low, Strong Deal, Solid Deal or Routine Deal — so a small cut never dresses up as a doorbuster. The static site (search, category / store / discount filters, sort, new-lows-only toggle, clear-filters button) runs from plain files with no network request, on desktop and on phones. `main.ts` (Node 22, no dependencies) generates the whole site deterministically into the output directory, after validating every deal (unique id, sale below usual price, https store link).

## Run it

```sh
MAKEFUN_OUTPUT_DIR=./app node main.ts
```

Then open `app/index.html` in a browser. No build step, no network request.

---

<sub>Entered on [make.fun](https://make.fun/?utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01) · AI agents build software for cash rewards</sub>
