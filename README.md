<!--
SPDX-FileCopyrightText: 2026 Yaroslav Halchenko <yaroslav.o.halchenko@dartmouth.edu>
SPDX-License-Identifier: CC-BY-4.0
-->

# serve-wayback-archive-demo

Companion dataset for [con/serve](https://github.com/con/serve) showing
**per-snapshot recovery of public web history from the Internet Archive's
Wayback Machine into a DataLad-managed git + git-annex repository**, with
a [WACZ](https://specs.webrecorder.net/wacz/1.1.1/) export that
[ReplayWeb.page](https://replayweb.page/) can replay as a
Wayback-Machine-style timeline.

Each `[DATALAD RUNCMD] snapshot ...` commit on the branches below was
produced by [`wayback-to-datalad.sh`](https://github.com/con/serve/blob/master/content/tools/web/wayback-archive/wayback-to-datalad.sh)
calling [GeiserX/Wayback-Archive](https://github.com/GeiserX/Wayback-Archive)
once per CDX-listed capture. Author identity is `Internet Archive
<ia@example.com>` with the capture date as author date; committer is the
human who ran the recovery, with their wall clock. So:

- `git log --author='Internet Archive'` selects capture commits.
- `git log --until=2020` filters by *archive era*, not recovery date.
- `git blame site/index.html` attributes each line to the snapshot it
  first appeared in.

## Try the live demo

The `con-full` branch ships a packaged WACZ at
[`con-full-demo.wacz`](con-full-demo.wacz), kept in sync with the
git-annex content. A copy is mirrored at
`https://www.oneukrainian.com/tmp/wayback-archive-demo/con-full-demo.wacz`
with CORS + HTTP range support enabled so ReplayWeb.page can stream it
without uploading.

| Link | What it does |
|---|---|
| [Open in ReplayWeb.page (pages view)](https://replayweb.page/?source=https%3A%2F%2Fwww.oneukrainian.com%2Ftmp%2Fwayback-archive-demo%2Fcon-full-demo.wacz#view=pages) | Lists every captured page across all snapshots; click any row to replay |
| [Land on most recent capture](https://replayweb.page/?source=https%3A%2F%2Fwww.oneukrainian.com%2Ftmp%2Fwayback-archive-demo%2Fcon-full-demo.wacz) | Jumps into replay with the timestamp scrubber active |
| [Search for "Who" in pages](https://replayweb.page/?source=https%3A%2F%2Fwww.oneukrainian.com%2Ftmp%2Fwayback-archive-demo%2Fcon-full-demo.wacz#view=pages&query=Who&urlSearchType=contains) | Filters pages list to `whoweare.html` across all captured dates |
| [Replay `whoweare.html` at 2018-10-17](https://replayweb.page/?source=https%3A%2F%2Fwww.oneukrainian.com%2Ftmp%2Fwayback-archive-demo%2Fcon-full-demo.wacz#url=https%3A%2F%2Fcenterforopenneuroscience.org%2Fwhoweare.html&ts=20181017195754) | Direct deep-link with the richest theme-image capture |

If you see a CORS error or stale "loading" spinner, **hard-refresh
(Ctrl+Shift+R)**: the WACZ URL serves correct CORS + range headers,
but the browser may have cached a prior failed fetch.

## Branches

All branches share the `text2git` bootstrap (`master` head) and diverge
from there. Each demonstrates a different recovery pattern.

| Branch | Site | Density | Captures | Notes |
|---|---|---|---|---|
| `master` | -- | (bootstrap) | 0 | DataLad `text2git` config -- HTML stays in git, binaries to annex |
| `more` | `neuro.debian.net` | monthly 2025 | 2 captured / 3 unchanged / 7 IA-empty | Demonstrates the *unchanged-since-previous* classification |
| `full-history` | `neuro.debian.net` | yearly 2009-2026 | 7 captured / 3 unchanged / 8 IA-empty | 8-year stretch missing where IA throttled |
| `con` | `centerforopenneuroscience.org` | yearly 2016-2025 | 10 captured | All 10 yearly snapshots successful, capped recovery |
| `con-full` | `centerforopenneuroscience.org` | every CDX capture 2016-2025 | 10 captured / 58 IA-empty | Full-asset recovery (no `MAX_FILES` cap); some snapshots include 100+ files with team photos |

## How to reproduce

Setup (in `con/serve`):

```bash
git clone https://github.com/con/serve
cd serve
git submodule update --init projects/wayback-archive-demo
uv venv .venv
uv pip install -r content/tools/web/wayback-archive/requirements.txt
```

To regenerate the WACZ from the current `con-full` capture history:

```bash
cd projects/wayback-archive-demo
. ../../.venv/bin/activate
datalad rerun HEAD     # re-runs the recorded [DATALAD RUNCMD]
```

To attempt more captures (resume support skips snapshots already on the
branch):

```bash
VENV_ACTIVATE=../../.venv/bin/activate SNAPSHOT_TIMEOUT=900 \
  ../../content/tools/web/wayback-archive/wayback-to-datalad.sh \
  centerforopenneuroscience.org . '' '' '' ''
```

## Notes & limitations

- **IA throttling.** Without the `MAX_FILES` cap, the Wayback Machine
  rate-limits aggressively, so a single recovery pass typically lands
  10-15% of CDX-listed captures. Re-running fills in more over time.
- **No external-byte WARC records.** WACZ 1.1.1 requires all replay
  bytes inline, so large binaries (e.g. `.ova` VM images on
  `neuro.debian.net`) bloat the file. A clean fix would be a per-record
  external-fetch loader; tracked separately upstream.
- **Multi-snapshot UX.** ReplayWeb.page surfaces multiple captures of
  the same URL via the timestamp picker (top-right) and the Pages
  view's date column, not a true scrubber.

## License

Capture *content* is reproduced from the Internet Archive's archived
copies of the original websites and remains subject to those sites'
licenses. The provenance commits, scripts, and this README are licensed
under CC-BY-4.0; see SPDX headers on individual files.
