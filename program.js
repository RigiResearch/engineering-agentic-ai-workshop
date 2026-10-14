/* ==========================================================================
   ENGINEERING WITH AGENTIC AI — WORKSHOP CONFIGURATION
   --------------------------------------------------------------------------
   This is the ONLY file you need to edit to keep the website up to date.
   Everything below (dates, program parts, talks, speakers, organizers) is
   rendered automatically. Save the file, refresh the page — no build step,
   no tooling.

   QUICK GUIDE
   -----------
   1. Confirm a speaker      -> fill in `speaker`, `affiliation` and `title` on
                                one of the open "invited" slots in Part I. The
                                Speakers section updates itself.
   2. Add / remove a talk    -> add or delete an object in that part's `talks`.
   3. A slot not yet filled  -> just leave out `speaker` (it renders as "Speaker
                                to be announced" and is excluded from the
                                Speakers grid).
   4. Abstract / bio         -> add `abstract` and/or `bio` to that talk (see
                                below). Both are optional and independent.
   5. Session clock times    -> set `start` / `end` on each part once CASCON
                                assigns the slot. Until then the length of each
                                part is shown instead.
   6. Talk clock times       -> set `showTalkTimes: true` below. Start times are
                                then computed from the part's `start` and each
                                talk's `mins`.
   7. Date confirmed         -> set `dateNote: ""` to remove the "Tentative" badge.
   8. Emphasis               -> in WORKSHOP texts, wrap a word in *asterisks* to
                                set it in italics (as in "Engineering *with*").

   TALK FIELDS (all optional except `mins`)
   ----------------------------------------
     speaker     "Jane Doe"                 omit -> "Speaker to be announced"
     affiliation "University of Toronto"
     title       "Title of the talk"        shown when known
     topic       "Short topic"              fallback when the title isn't known
     url         "https://..."              speaker's homepage (links the name
                                            in the Speakers section)
     photo       "assets/img/speakers/jane-doe.jpg"
                                            optional square headshot; initials
                                            are shown when there is no photo
     abstract    "Full abstract text..."    optional collapsible "Abstract"
     bio         "Speaker biography..."     optional collapsible "Bio"
     kind        "keynote" | "invited" | "paper" | "activity"
                                            controls the tag on the right.
                                            "activity" is a non-talk item
                                            (welcome, breakouts, plenary...):
                                            it has a `title`, an optional
                                            `lead` and `detail`, and never
                                            counts as an open speaker slot.
     tag         "Opening"                  custom tag text for activities
     paper       "12"                       paper number, for kind: "paper"
     mins        25                         length in minutes (talk + questions)
     note        "To be confirmed"          small caveat chip

   ABSTRACTS AND BIOS
   ------------------
   Long text is easiest to write with back-ticks, which may span lines:

     {
       speaker: "Jane Doe",
       affiliation: "University of Toronto",
       title: "Title of the talk",
       kind: "invited",
       mins: 25,
       abstract: `First paragraph of the abstract. Single line breaks are
       ignored, so wrap the text however is comfortable to read here.

       Leave a blank line to start a second paragraph.`,
       bio: `Jane Doe is a professor of ... Same formatting rules as the
       abstract: wrap freely, blank line for a new paragraph.`
     }
   ========================================================================== */

const WORKSHOP = {
  /* ---- Identity ---- */
  shortTitle: "Engineering with Agentic AI",
  title: "Engineering *with* Agentic AI",
  tagline: "The Future of Software-Intensive Systems",
  intro:
    "A half-day workshop at CASCON 2026 on the two-way relationship between Software " +
    "Engineering and Agentic AI: how autonomous agents are transforming the software " +
    "lifecycle, and what it takes to engineer resilient multi-agent systems.",

  /* ---- When & where ---- */
  date: "Wednesday, November 11, 2026",
  dateShort: "Wed 11 Nov 2026",
  dateNote: "Tentative",             // badge next to the date; set to "" once confirmed
  timeSpan: "Half day · 4 hours",    // e.g. "09:00 – 13:00" once CASCON assigns the slot
  format: "Invited talks + working groups",
  venue: "York University, Keele Campus",
  city: "Toronto, Canada",
  room: "",                          // e.g. "Second Student Centre, Room 101"; hidden while empty

  /* ---- Conference & links ---- */
  conferenceName: "CASCON 2026",
  conferenceFullName:
    "36th IEEE International Conference on Collaborative Advances in Software and Computing",
  conferenceDates: "November 9–12, 2026",
  conferenceUrl: "https://conf.researchr.org/home/cascon-2026",
  registrationUrl: "https://conf.researchr.org/home/cascon-2026",
  workshopsUrl: "https://conf.researchr.org/track/cascon-2026/casconworkshops2026",
  contactEmail: "rivera@uvic.ca",

  /* ---- Display switches ---- */
  showTalkTimes: false,              // true -> compute a start time for every talk
  programNote:
    "Preliminary program. The date, times and invited speakers will be confirmed closer to the event."
};

/* ==========================================================================
   PROGRAM — the three parts of the workshop
   `short` is the label used in the at-a-glance timeline bar.
   `groups` (optional) lists the discussion themes shown under a part.
   ========================================================================== */

const SESSIONS = [
  {
    label: "Part I",
    short: "Perspectives",
    title: "Welcome, introductory perspectives and setup",
    start: "",
    end: "",
    summary:
      "Keynote-style presentations from researchers and practitioners that frame the state of " +
      "the art and motivate the breakout discussions.",
    talks: [
      { kind: "activity", tag: "Opening", title: "Welcome and workshop overview", lead: "Workshop organizers", mins: 10 },
      { kind: "invited", mins: 25 },
      { kind: "invited", mins: 25 },
      { kind: "invited", mins: 25 },
      { kind: "activity", tag: "Setup", title: "Forming the working groups", mins: 5 }
    ]
  },

  {
    label: "Part II",
    short: "Working groups",
    title: "Interactive working groups",
    start: "",
    end: "",
    summary:
      "Attendees split into breakout clusters to discuss research challenges and opportunities " +
      "in specific areas. The themes below are a starting point, to be refined with speakers " +
      "and participants.",
    talks: [
      { kind: "activity", tag: "Breakouts", title: "Breakout working groups", detail: "Parallel discussions, one cluster per theme", mins: 90 }
    ],
    groups: [
      {
        title: "Agents across the software lifecycle",
        summary:
          "How autonomous agents change development and operations — and what that means for " +
          "validating, certifying, maintaining and evolving software."
      },
      {
        title: "Dynamic context and memory",
        summary:
          "Keeping agents stateful: context relevance, memory staleness, and context shared " +
          "across agents, tools and users."
      },
      {
        title: "Runtime governance and adaptive control",
        summary:
          "Self-adaptation, runtime V&V and viability-zone enforcement under high operational " +
          "uncertainty."
      },
      {
        title: "Architectures for multi-agent ecosystems",
        summary:
          "Design abstractions and reference architectures for decentralized, cooperating " +
          "agents built on Foundation Models."
      }
    ]
  },

  {
    label: "Part III",
    short: "Synthesis",
    title: "Synthesis, reports and community roadmap",
    start: "",
    end: "",
    summary:
      "Each group reports its findings, followed by a moderated plenary discussion that " +
      "consolidates them into shared research directions and collaboration opportunities.",
    talks: [
      { kind: "activity", tag: "Reports", title: "Working-group reports", mins: 30 },
      { kind: "activity", tag: "Plenary", title: "Moderated plenary discussion and community roadmap", mins: 25 },
      { kind: "activity", tag: "Closing", title: "Closing remarks", lead: "Workshop organizers", mins: 5 }
    ]
  }
];

/* ==========================================================================
   ORGANIZERS
   Optional per person: `url` (links the name), `photo` (square headshot).
   ========================================================================== */

const ORGANIZERS = [
  {
    name: "Norha M. Villegas",
    affiliation: "University of Victoria",
    unit: "Computer Science · Electrical & Computer Engineering",
    focus: "Dynamic context management and self-adaptive software systems."
  },
  {
    name: "Luis F. Rivera",
    affiliation: "University of Victoria",
    unit: "Computer Science",
    focus: "Digital twins, generative AI and continuous experimentation."
  },
  {
    name: "Hausi A. Müller",
    affiliation: "University of Victoria",
    unit: "Computer Science",
    focus: "Self-adaptive and autonomic systems, software engineering and evolution."
  },
  {
    name: "Ulrike Stege",
    affiliation: "University of Victoria",
    unit: "Computer Science",
    focus: "Algorithms, parameterized complexity and hybrid quantum-classical computing."
  },
  {
    name: "Gabriel Tamura",
    affiliation: "University of Victoria",
    unit: "Computer Science · Electrical & Computer Engineering",
    focus: "Self-adaptive software systems and runtime engineering."
  },
  {
    name: "Marin Litoiu",
    affiliation: "York University",
    unit: "School of Information Technology",
    focus: "Adaptive and autonomic systems, cloud computing and AIOps."
  },
  {
    name: "Ian Watts",
    affiliation: "IBM",
    unit: "Software Engineering · Core Automation Observability",
    focus: "Engineering automation and observability for enterprise software."
  }
];

/* ==========================================================================
   TOPICS — the chips shown in the "Topics" strip
   ========================================================================== */

const TOPICS = [
  "Agentic software engineering",
  "Multi-agent systems",
  "Foundation models as reasoning engines",
  "Dynamic context management",
  "Memory staleness & context relevance",
  "Runtime governance",
  "Adaptive control",
  "Self-adaptive software",
  "Viability-zone enforcement",
  "Runtime verification & validation",
  "Reference architectures",
  "Design abstractions for agents",
  "AIOps",
  "Validating & certifying agentic systems",
  "Software maintenance & evolution"
];
