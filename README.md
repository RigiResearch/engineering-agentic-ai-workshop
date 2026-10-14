# Engineering with Agentic AI — Workshop website

Website for **Engineering with Agentic AI: The Future of Software-Intensive Systems**, a half-day
workshop at [CASCON 2026](https://conf.researchr.org/home/cascon-2026), the 36th IEEE International
Conference on Collaborative Advances in Software and Computing — tentatively Wednesday,
November 11, 2026, York University (Keele Campus), Toronto.

Organized by researchers from the University of Victoria, York University and IBM.

Static HTML/CSS/JS — no build step, no dependencies.

---

## Updating the program

**Edit [`program.js`](program.js) and nothing else.** The three parts of the workshop, talks,
speakers, organizers and topics all live there; the page is rendered from that file. Save,
refresh, done.

| I want to…                         | Do this in `program.js`                                          |
| ---------------------------------- | ---------------------------------------------------------------- |
| Confirm an invited speaker         | Fill in `speaker`, `affiliation`, `title` on an open Part I slot |
| Add a speaker photo / homepage     | Add `photo` and/or `url` to that talk                            |
| Add or remove a talk               | Add/delete an object in that part's `talks` array                |
| Add a session or break             | Copy a whole `SESSIONS` block, or add `breakAfter` to a part     |
| Mark a slot as not yet filled      | Leave out `speaker` — it renders as "Speaker to be announced"    |
| Add an abstract for a talk         | Add `abstract` to that talk — optional, and collapsed by default |
| Add a speaker bio                  | Add `bio` to that talk — same idea, shown as its own toggle      |
| Edit the working-group themes      | Edit the `groups` list of Part II                                |
| Set the clock times                | Set `start` / `end` on each part, and `timeSpan` in `WORKSHOP`   |
| Show a start time for every talk   | Set `showTalkTimes: true` (times are computed from `mins`)       |
| Confirm the date                   | Edit `date` / `dateShort`, and set `dateNote: ""`                |
| Set the room                       | Fill in `room` (it stays hidden while empty)                     |
| Change the venue, links, contact   | Edit the fields at the top of `WORKSHOP`                         |
| Remove the "preliminary" banner    | Set `programNote: ""`                                            |

Talk fields (all optional except `mins`):

```js
{
  speaker: "Jane Doe",                // omit -> "Speaker to be announced"
  affiliation: "University of Toronto",
  title: "Title of the talk",         // shown when known
  topic: "Short topic",               // fallback when the title isn't known
  url: "https://example.org/~jane",   // links the name in the Speakers section
  photo: "assets/img/speakers/jane-doe.jpg", // square headshot; initials otherwise
  abstract: `Full abstract text.`,    // omit -> no abstract shown
  bio: `Speaker biography.`,          // omit -> no bio shown
  kind: "invited",                    // "keynote", "invited", "paper" or "activity"
  mins: 25,                           // slot length, talk + questions
  note: "To be confirmed"             // small caveat chip
}
```

Non-talk items in the program (welcome, breakouts, reports, plenary) use `kind: "activity"`
with a `title`, a short `tag`, and optionally a `lead` and a `detail`. They never count as open
speaker slots.

### Abstracts and bios

Both are optional and independent — add either, both, or neither. A talk that has one shows a
small **Abstract** / **Bio** toggle under its title, collapsed by default so the program stays
scannable. Back-ticks let the text span several lines, and a blank line starts a new paragraph:

```js
{
  speaker: "Jane Doe",
  affiliation: "University of Toronto",
  title: "Title of the talk",
  kind: "invited",
  mins: 25,
  abstract: `First paragraph. Single line breaks are ignored, so wrap the
  text however is comfortable to read in this file.

  Leave a blank line to start a second paragraph.`,
  bio: `Jane Doe is a professor of ... Same formatting rules as the abstract.`
}
```

The **Speakers** section is generated automatically from the talks — you never edit it directly.
While no speaker is confirmed it shows a "Speakers to be announced" panel instead.

## Preview locally

Open `index.html` in a browser, or:

```bash
python3 -m http.server 8000
```

then visit <http://localhost:8000>.
