## How to Reference in Obsidian

Use links instead of re-typing details — that way when something changes, you only update it in one place.

**Inline wikilinks** — use these for anything the reader (you) might want to jump to mid-sentence: character names, locations, factions, other pages. `[[Page Name]]` is enough; use the pipe to keep prose clean, e.g. `[[Character Name|she]]` or `[[Silverhold|the city]]`.

**Linking to a subheading** — once a page has its own headings (e.g. a `[[Weave]]` page with a `## Leylines` section), link straight to that section with `[[Weave#Leylines|leylines]]` — the `#Heading` jumps to that spot in the file, and the pipe controls the display text. Useful for long pages: instead of linking the whole page every time, link the exact subsection you mean (`[[Weave#Leylines]]`, `[[Weave#Cost of Use]]`, etc.).

**Footnotes** — better for anything that would clutter the sentence if inlined: a caveat, a "needs verification" note, a research source, or reasoning you want to preserve without it interrupting the read. Use Obsidian's standard footnote syntax: a marker like `[^1]` in the text, with the corresponding `[^1]: note text` collected at the bottom of the document.

**Suggested convention:**
- First mention of a name/place/term on any page → wikilink it.
- Repeated mentions in the same paragraph → plain text is fine, no need to re-link every time.
- Long reference pages (magic systems, tech, politics) → give each rule its own `##` heading so other pages can link straight to that piece.
- Caveats or "verify this" notes → footnote, not inline.
- Keep link names consistent with note titles so backlinks and graph view stay useful.