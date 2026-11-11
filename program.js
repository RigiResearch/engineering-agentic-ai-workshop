/* ==========================================================================
   ENGINEERING WITH AGENTIC AI — WORKSHOP CONFIGURATION
   --------------------------------------------------------------------------
   This is the ONLY file you need to edit to keep the website up to date.
   Everything below (dates, program parts, talks, speakers, organizers) is
   rendered automatically. Save the file, refresh the page — no build step,
   no tooling.

   QUICK GUIDE
   -----------
   1. Edit a speaker         -> change `speaker`, `affiliation` and `title` on
                                that talk in Session 1. The Speakers section
                                updates itself.
   2. Add / remove a talk    -> add or delete an object in that session's `talks`.
   3. A slot not yet filled  -> just leave out `speaker` (it renders as "Speaker
                                to be announced" and is excluded from the
                                Speakers grid).
   4. Abstract / bio         -> add `abstract` and/or `bio` to that talk (see
                                below). Both are optional and independent.
   5. Session clock times    -> `start` / `end` on each session, written either
                                as "14:45" or "2:45 PM". Leave them empty and the
                                length of the session is shown instead.
   6. Clock style            -> `timeFormat: "12h"` shows "2:45 PM";
                                `timeFormat: "24h"` shows "14:45".
   7. Talk clock times       -> set `showTalkTimes: true` below. Start times are
                                then computed from the session's `start` and each
                                talk's `mins`.
   8. Tentative date         -> set `dateNote: "Tentative"` to show a badge next
                                to the date; `""` hides it.
   9. Emphasis               -> in WORKSHOP texts, wrap a word in *asterisks* to
                                set it in italics (as in "Engineering *with*").
  10. Padlet board           -> `padletUrl` and `padletQr` below. Set
                                `padletUrl: ""` to hide the Padlet section, the
                                "Join the Padlet" buttons and the QR screen.
                                Adding #qr to the address (site/#qr) opens the
                                QR code full screen, for the projector.

   TALK FIELDS (all optional except `mins`)
   ----------------------------------------
     speaker     "Jane Doe"                 omit -> "Speaker to be announced"
                 ["Jane Doe", "John Roe"]   a list for several presenters
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
     tag         "Vision talk"              custom text for the tag on the right
                                            (otherwise it follows `kind`)
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
  dateNote: "",                      // e.g. "Tentative" shows a badge next to the date
  timeSpan: "2:45 PM – 6:15 PM",
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

  /* ---- Live participation: the workshop's Padlet board ---- */
  padletUrl: "https://padlet.com/rivera_qtb4/engineering-with-agentic-ai-2026-s025d4aqbplwhcuytf85",
  padletQr: "assets/img/padlet-qr.png",   // the QR code image; it points to the board above

  /* ---- Display switches ---- */
  timeFormat: "12h",                 // "12h" -> 2:45 PM, "24h" -> 14:45
  showTalkTimes: false,              // true -> compute a start time for every talk
  programNote:
    "Preliminary program. The running order and timings within each session may still change."
};

/* ==========================================================================
   PROGRAM — the two sessions of the workshop
   `short` is the label used in the at-a-glance timeline bar.
   `groups` (optional) lists the discussion themes shown under a session,
   with an optional `groupsIntro` sentence above them. Each theme has a
   `title`, an optional `summary` and optional `questions`, one per lens:
   the first is shown in amber, the second in iris.
   ========================================================================== */

const SESSIONS = [
  {
    label: "Session 1",
    short: "Perspectives",
    title: "Welcome, introductory perspectives and setup",
    start: "14:45",
    end: "16:15",
    summary:
      "Keynote-style presentations that frame the state of the art and motivate the breakout " +
      "discussions.",
    talks: [
      { kind: "activity", tag: "Opening", title: "Welcome and workshop overview", lead: "Workshop organizers", mins: 10 },
      {
        speaker: "Norha M. Villegas",
        affiliation: "University of Victoria",
        title: "Context Engineering, Self-Adaptation and Runtime Governance in Agentic AI Ecosystems",
        kind: "invited",
        tag: "Vision talk",
        mins: 20,
        abstract: `As Agentic AI transitions from experimental prototypes to mission-critical deployments, agentic systems face fundamental operational challenges: non-deterministic execution, memory staleness ("context rot"), and alignment drift. These challenges do not stem from model limitations, but from an architectural deficit in context engineering and system control. Attempting to govern autonomous agents through prompt engineering or model scaling alone fails because probabilistic reasoning engines cannot self-regulate their own operational envelopes, context lifecycles, or shifting system goals.

        In this vision talk, I argue that establishing certifiable trust in agentic AI requires a control-engineered software paradigm that decouples probabilistic reasoning engines from the external software architectures that govern them. Grounded in self-adaptive systems research and our DYNAMICO reference model, I frame agentic governance around two foundational pillars: external control loops that bound non-deterministic actions within certifiable viability zones, and dynamic context management that actively governs the context lifecycle (acquisition, relevance filtering, decay, and disposal) to prevent error cascades. This talk offers a strategic vision for how software engineering can provide the abstractions and foundations required to transition agentic AI from fragile, prompt-bound scripts to resilient, certifiable software ecosystems.`,
        bio: `Norha M. Villegas, Ph.D., is an internationally recognized software engineering leader with over 20 years of professional experience, currently serving as a Professor and Director of the Bachelor of Software Engineering Program in the Department of Computer Science and the Department of Electrical and Computer Engineering at the University of Victoria (UVic). Her work integrates software engineering research, interdisciplinary collaboration, and STEM education to tackle complex societal challenges. Prior to her full-time appointment at UVic in July 2026, she was the Dean of the Faculty of Engineering, Design, and Applied Sciences at Universidad Icesi in Colombia, where she significantly advanced the regional tech ecosystem, STEM research, and nationwide higher education. Her academic and professional background spans foundational contributions to intelligent, resilient, and trustworthy software-intensive systems—including self-adaptive systems, digital twins, context-aware computing, and agentic AI ecosystems. Dr. Villegas has fostered robust global collaborations across Europe, North America, and Latin America, and she was the first woman in Colombia to achieve IEEE Senior Member status. Her dedication to expanding diversity, mentoring hundreds of women, and championing inclusion in technology and STEM education has earned her prestigious global recognitions, including the 2022 Globant Women that Build – Global Digital Leader Award.`
      },
      {
        speaker: "Ratnadira Widyasari",
        affiliation: "University of Victoria",
        title: "More Agents, More Trust? Lessons from AI Agents in Software Quality Assurance",
        kind: "invited",
        mins: 20,
        abstract: `AI agents are now used to detect vulnerabilities, review pull requests, and suggest fixes, but do agentic designs actually help, and how do developers respond to what agents produce? Drawing on my recent work, this talk shows that multi-agent collaboration can substantially improve vulnerability detection and even uncover zero-day vulnerabilities. However, more orchestration is not automatically better, and polished explanations do not necessarily indicate whether an agent is correct. Through an analysis of thousands of agent-generated code review comments, we also find that developers value concrete and actionable comments. These findings suggest that more agents do not automatically earn more trust: agent output should be judged by whether it helps developers make correct decisions, not by how convincing it sounds.`,
        bio: `Ratnadira Widyasari is an Assistant Professor in the Department of Computer Science at the University of Victoria. Her research focuses on advancing software quality assurance through automation and explainability, with a particular interest in how AI and LLMs can help build more reliable, transparent, and effective software engineering tools. Her research has been published in leading software engineering venues, including the ICSE and FSE conferences and the TSE, TOSEM, and EMSE journals. Beyond her research, she is passionate about communicating technical ideas to broader audiences and making research more accessible to the public. In 2025, she was named one of Singapore’s 100 Women in Tech.`
      },
      {
        speaker: "Ladan Tahvildari",
        affiliation: "University of Waterloo",
        title: "From Code Generation to Autonomous Systems: Engineering Quality in Agentic AI",
        kind: "invited",
        mins: 20,
        note: "Presented with PhD students Shizhe Lin, Majid Dashtbani and Hasti Ghaneshirazi",
        abstract: `As Large Language Models evolve from passive code generators into autonomous systems, software engineering faces a critical imperative: guaranteeing functional correctness, execution scalability, and system reliability within stochastic environments. Addressing this challenge requires moving beyond ad-hoc prompting toward a principled discipline for engineering quality directly into agentic software workflows. This talk outlines the research vision of the Software Technologies Applied Research (STAR) Lab at the University of Waterloo, structured around two complementary perspectives: Engineering Agentic AI (advancing agent intelligence and decision-making) and Engineering Software with AI (harnessing AI to modernize systems and automate workflows). Within this dual framework, our research advances four interconnected fronts. To enhance agent intelligence, we first quantify what an agent knows and when it is uncertain through real-time state estimation. To govern agent behaviour, we guide planning and orchestration through structured search, coordinating multi-step execution while preventing agent bloat. Shifting focus to the software systems being engineered, we leverage AI to automatically transform legacy microservices into scalable, future-ready architectures. Finally, to ensure the dependability of AI-driven analysis, we establish selective invariance and prediction robustness to guarantee explainable, trustworthy outcomes. By unifying these directions into a cohesive narrative, this presentation highlights our latest breakthroughs in real-time uncertainty estimation, demonstrating how bridging agent state awareness with automated software workflows unlocks the full potential of dependable Agentic AI.`,
        bio: `Ladan Tahvildari is a Professor in the Department of Electrical and Computer Engineering and Director of the Software Technologies Applied Research (STAR) Lab at the University of Waterloo. In this presentation, she outlines the STAR lab’s unified vision for engineering quality in Agentic AI alongside PhD students Shizhe Lin, Majid Dashtbani, and Hasti Ghaneshirazi. Together, the team introduces the lab’s foundational research pillars: Shizhe Lin addresses agent uncertainty estimation and multi-agent planning and orchestration (Engineering Agentic AI); Majid Dashtbani details experience-driven frameworks for legacy microservice transformation and cloud scalability (Engineering Software with AI); and Hasti Ghaneshirazi presents methods for ensuring prediction robustness, explanation fidelity, and trustworthiness in AI-driven software analysis (Engineering Software with AI).`
      },
      {
        speaker: ["Komal Sarda", "Amr Zaki", "Marin Litoiu"],
        affiliation: "York University",
        title: "When GenAI Becomes Your Software Reliability Engineer: What Can and Cannot be Automated",
        kind: "invited",
        mins: 20
      }
    ],
    breakAfter: { label: "Break", start: "16:15", end: "16:45" }
  },

  {
    label: "Session 2",
    short: "Industry view & working groups",
    title: "Industry perspective, working groups and community roadmap",
    start: "16:45",
    end: "18:15",
    summary:
      "An industry talk opens the session with directions and challenges for the working " +
      "groups. Attendees then split into three working groups, one per theme: Context, Control " +
      "and Assurance for Agentic AI. Each group reports its findings in a moderated plenary " +
      "that consolidates them into shared research directions and collaboration opportunities. " +
      "If attendance is small, the working groups become a single general discussion on the " +
      "same themes.",
    talks: [
      {
        speaker: "Ian Watts",
        affiliation: "IBM",
        title: "Gen AI and Automation: An Industry Perspective",
        kind: "invited",
        tag: "Industry talk",
        mins: 20,
        note: "Tentative title"
      },
      { kind: "activity", tag: "Setup", title: "Forming the working groups", mins: 5 },
      { kind: "activity", tag: "Breakouts", title: "Breakout working groups", detail: "Parallel discussions, one group per theme, or a single general discussion on the same themes if attendance is small", mins: 35 },
      { kind: "activity", tag: "Reports", title: "Working-group reports", mins: 15 },
      { kind: "activity", tag: "Plenary", title: "Moderated plenary discussion and community roadmap", mins: 10 },
      { kind: "activity", tag: "Closing", title: "Closing remarks", lead: "Workshop organizers", mins: 5 }
    ],
    groupsIntro:
      "Each theme is discussed in both directions: Software Engineering for Agentic AI " +
      "(engineering agentic systems) and Agentic AI for Software Engineering (agents " +
      "engineering software).",
    groups: [
      {
        title: "Context",
        summary:
          "Context management: what agents need to know and remember, and when context goes " +
          "stale.",
        questions: [
          {
            lens: "SENG for Agentic AI",
            text:
              "How do we dynamically manage the context lifecycle (acquisition, relevance, " +
              "versioning, decay, disposal) so agents remember what matters and drop what is stale?"
          },
          {
            lens: "Agentic AI for SENG",
            text:
              "What code, requirements and runtime behaviour do agents need to act reliably " +
              "across the software lifecycle?"
          }
        ]
      },
      {
        title: "Control",
        summary:
          "Control actions: which decisions agents may take on their own, and what keeps them " +
          "within safe limits.",
        questions: [
          {
            lens: "SENG for Agentic AI",
            text:
              "Which external control loops keep non-deterministic agents within their viability " +
              "zones, and when should a human step in?"
          },
          {
            lens: "Agentic AI for SENG",
            text:
              "Which development and operations actions can we safely hand over to agents, and " +
              "which must stay with engineers?"
          }
        ]
      },
      {
        title: "Assurance",
        summary:
          "Establishing trust in behaviour that is probabilistic and evolving, and in what " +
          "agents produce.",
        questions: [
          {
            lens: "SENG for Agentic AI",
            text:
              "How do we verify, validate and certify systems whose behaviour is probabilistic " +
              "and keeps changing at runtime?"
          },
          {
            lens: "Agentic AI for SENG",
            text:
              "How do we judge agent output: by whether it helps developers make correct " +
              "decisions, not by how convincing it sounds?"
          }
        ]
      }
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
