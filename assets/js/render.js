/* ==========================================================================
   Engineering with Agentic AI — renderer
   Reads WORKSHOP / SESSIONS / ORGANIZERS / TOPICS from program.js and builds
   the page. You should not need to touch this file to update the workshop.
   ========================================================================== */

(function () {
  "use strict";

  /* --------------------------- small helpers ---------------------------- */
  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };

  /* "14:45", "2:45 PM" and "2:45pm" all read as minutes after midnight. */
  const toMinutes = (time) => {
    const m = /^(\d{1,2}):(\d{2})\s*(?:([ap])\.?\s*m\.?)?$/i.exec(String(time || "").trim());
    if (!m) return null;
    let h = +m[1];
    const ampm = m[3] && m[3].toLowerCase();
    if (ampm === "p" && h < 12) h += 12;
    if (ampm === "a" && h === 12) h = 0;
    return h * 60 + (+m[2]);
  };

  const twelveHour = () => WORKSHOP.timeFormat === "12h";
  const meridiem = (mins) => (Math.floor(mins / 60) % 24 < 12 ? "AM" : "PM");

  /* Minutes after midnight as a clock time, in the configured format.
     `bare` leaves out the AM/PM, for the first half of a range. */
  const toClock = (mins, bare) => {
    const h = Math.floor(mins / 60) % 24;
    const mm = String(mins % 60).padStart(2, "0");
    if (!twelveHour()) return String(h).padStart(2, "0") + ":" + mm;
    return ((h % 12) || 12) + ":" + mm + (bare ? "" : " " + meridiem(mins));
  };

  /* "2:45 – 4:15 PM", or "11:30 AM – 1:00 PM" when the range spans noon. */
  const toRange = (a, b, sep) => {
    if (b == null) return toClock(a);
    const bare = twelveHour() && meridiem(a) === meridiem(b);
    return toClock(a, bare) + sep + toClock(b);
  };

  /* A time as written in program.js, shown in the configured format. */
  const timeRange = (start, end) => {
    const a = toMinutes(start);
    const b = toMinutes(end);
    if (a == null) return [start, end].filter(Boolean).join(" – ");
    return toRange(a, b, " – ");
  };

  const initials = (name) => {
    const parts = String(name).replace(/\(.*?\)/g, "").trim().split(/\s+/);
    const first = parts[0] || "";
    const last = parts.length > 1 ? parts[parts.length - 1] : "";
    return ((first[0] || "") + (last[0] || "")).toUpperCase();
  };

  /* "*word*" in a text becomes an emphasised word; plain() strips the marks. */
  const plain = (text) => String(text).replace(/\*([^*]+)\*/g, "$1");

  function rich(node, text) {
    node.textContent = "";
    String(text)
      .split(/(\*[^*]+\*)/)
      .forEach((part) => {
        if (!part) return;
        const m = /^\*([^*]+)\*$/.exec(part);
        node.appendChild(m ? el("em", null, m[1]) : document.createTextNode(part));
      });
  }

  /* Length of a part: from its clock times when set, otherwise its talks. */
  function sessionMinutes(session) {
    const a = toMinutes(session.start);
    const b = toMinutes(session.end);
    if (a != null && b != null && b > a) return b - a;
    return (session.talks || []).reduce((sum, t) => sum + (t.mins || 0), 0);
  }

  const isActivity = (talk) => talk.kind === "activity";

  /* `speaker` is one name, or a list of names for a talk with several presenters. */
  const speakerNames = (talk) => [].concat(talk.speaker || []).filter(Boolean);
  const joinNames = (names) =>
    names.length < 2 ? names.join("") : names.slice(0, -1).join(", ") + " and " + names[names.length - 1];
  const speakerLabel = (talk) => joinNames(speakerNames(talk));

  /* Colour of a session: the first leans iris ("with"), the last amber ("of"),
     any in between blend the two. */
  const sessionTone = (i) =>
    i === 0 ? "tone-with" : i === SESSIONS.length - 1 ? "tone-of" : "tone-blend";

  /* A round avatar: the photo when there is one, initials otherwise. */
  function avatar(person, cls) {
    const box = el("span", "avatar" + (cls ? " " + cls : ""));
    box.setAttribute("aria-hidden", "true");
    if (person.photo) {
      const img = el("img");
      img.src = person.photo;
      img.alt = "";
      img.loading = "lazy";
      img.decoding = "async";
      box.appendChild(img);
    } else {
      box.textContent = initials(person.name || speakerLabel(person));
    }
    return box;
  }

  /* Several presenters: up to four small initials in a 2×2 cluster, "+N" for the rest. */
  function avatarGroup(names) {
    const box = el("span", "avatar-group");
    box.setAttribute("aria-hidden", "true");
    const shown = names.length > 4 ? names.slice(0, 3) : names;
    shown.forEach((n) => box.appendChild(el("span", "avatar", initials(n))));
    if (names.length > 4) box.appendChild(el("span", "avatar is-extra", "+" + (names.length - 3)));
    return box;
  }

  function maybeLink(text, url, cls) {
    if (!url) return el("span", cls, text);
    const a = el("a", cls, text);
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener";
    return a;
  }

  /* ------------------- static fields from WORKSHOP ---------------------- */
  function fillMeta() {
    document.querySelectorAll("[data-w-if]").forEach((node) => {
      if (!WORKSHOP[node.dataset.wIf]) node.remove();
    });

    document.querySelectorAll("[data-w]").forEach((node) => {
      const value = WORKSHOP[node.dataset.w];
      if (value != null && value !== "") rich(node, value);
    });

    document.querySelectorAll("[data-w-href]").forEach((node) => {
      const value = WORKSHOP[node.dataset.wHref];
      if (value) node.setAttribute("href", value);
    });

    document.querySelectorAll("[data-w-src]").forEach((node) => {
      const value = WORKSHOP[node.dataset.wSrc];
      if (value) node.setAttribute("src", value);
    });

    document.querySelectorAll("[data-w-mail]").forEach((node) => {
      if (!WORKSHOP.contactEmail) return;
      node.href = "mailto:" + WORKSHOP.contactEmail;
      if (node.dataset.wMail === "show") node.textContent = WORKSHOP.contactEmail;
    });

    document.title =
      plain(WORKSHOP.title) + ": " + WORKSHOP.tagline + " — " + WORKSHOP.conferenceName + " Workshop";
  }

  /* ------------------------------ topics -------------------------------- */
  function renderTopics() {
    const list = document.getElementById("topics");
    if (!list || typeof TOPICS === "undefined") return;
    TOPICS.forEach((t) => list.appendChild(el("li", null, t)));
  }

  /* ---------------------- program at a glance --------------------------- */
  function renderTimeline() {
    const bar = document.getElementById("timeline");
    if (!bar || typeof SESSIONS === "undefined") return;

    let total = 0;
    SESSIONS.forEach((session, i) => {
      const mins = sessionMinutes(session);
      total += mins;

      const seg = el("li", "seg " + sessionTone(i));
      seg.style.flexGrow = String(mins || 1);
      const label = el("span", "seg-label", session.label || "");
      if (mins) label.appendChild(el("span", "seg-mins", mins + " min"));
      seg.appendChild(label);
      seg.appendChild(el("span", "seg-title", session.short || session.title || ""));
      bar.appendChild(seg);

      const b = session.breakAfter;
      const breakMins = b ? (toMinutes(b.end) || 0) - (toMinutes(b.start) || 0) : 0;
      if (breakMins > 0) {
        const gap = el("li", "seg is-break");
        gap.style.flexGrow = String(breakMins);
        gap.title = b.label + " · " + timeRange(b.start, b.end);
        gap.appendChild(el("span", "seg-label", breakMins + " min"));
        gap.appendChild(el("span", "seg-title", b.label || "Break"));
        bar.appendChild(gap);
        total += breakMins;
      }
    });

    const sum = document.getElementById("timeline-total");
    if (sum && total) {
      const h = Math.floor(total / 60);
      const m = total % 60;
      sum.textContent =
        (h ? h + (h === 1 ? " hour" : " hours") : "") + (h && m ? " " : "") + (m ? m + " min" : "");
    }
  }

  /* ----------------------------- program -------------------------------- */

  /* An optional block of prose under a talk — the abstract, or the speaker's
     bio — collapsed by default. Blank lines in the text start a new paragraph;
     single line breaks are just wrapping and are ignored. `context` names what
     is being opened, so screen readers don't read a list of identical labels. */
  function renderDisclosure(kind, label, text, context) {
    const box = el("details", "talk-disclosure talk-" + kind);

    const head = el("summary", null, label);
    head.setAttribute("aria-label", context ? label + " — " + context : label);
    box.appendChild(head);

    const body = el("div", "disclosure-body");
    String(text)
      .trim()
      .split(/\n\s*\n/)
      .forEach((para) => body.appendChild(el("p", null, para.replace(/\s+/g, " ").trim())));
    box.appendChild(body);

    return box;
  }

  /* The abstract / bio toggles, when a talk has either. */
  function renderMore(talk) {
    const more = el("div", "talk-more");

    if (talk.abstract) {
      more.appendChild(
        renderDisclosure(
          "abstract", "Abstract", talk.abstract,
          talk.title || talk.topic || speakerLabel(talk) || "this talk"
        )
      );
    }
    if (talk.bio) {
      more.appendChild(
        renderDisclosure("bio", "Bio", talk.bio, speakerLabel(talk) || "the speaker")
      );
    }

    return more;
  }

  function talkTag(talk) {
    if (talk.tag) return talk.tag;
    switch (talk.kind) {
      case "activity": return "Activity";
      case "paper":    return talk.paper ? "Paper " + talk.paper : "Paper";
      case "keynote":  return "Keynote";
      default:         return "Invited talk";
    }
  }

  function renderTalk(talk, clock) {
    const activity = isActivity(talk);
    const row = el(
      "li",
      "talk" + (activity ? " is-activity" : speakerNames(talk).length ? "" : " is-tba")
    );

    /* when: a computed start time, or the length of the slot */
    const when = el("div", "talk-when");
    if (WORKSHOP.showTalkTimes && clock != null) {
      when.textContent = toRange(clock, talk.mins ? clock + talk.mins : null, "–");
    } else if (talk.mins) {
      when.textContent = talk.mins + " min";
    }
    row.appendChild(when);

    /* who + what */
    const body = el("div", "talk-body");
    const name = el("div", "talk-name");

    if (activity) {
      name.textContent = talk.title || talk.topic || "";
      if (talk.lead) name.appendChild(el("span", "talk-aff", talk.lead));
      body.appendChild(name);
      if (talk.detail) body.appendChild(el("p", "talk-topic", talk.detail));
    } else {
      if (speakerNames(talk).length) {
        name.appendChild(document.createTextNode(speakerLabel(talk)));
        if (talk.affiliation) name.appendChild(el("span", "talk-aff", talk.affiliation));
      } else {
        name.textContent = "Speaker to be announced";
      }
      body.appendChild(name);
      const detail = talk.title || talk.topic;
      if (detail) body.appendChild(el("p", "talk-topic", detail));
    }

    if (talk.note) body.appendChild(el("span", "talk-note", talk.note));
    if (talk.abstract || talk.bio) body.appendChild(renderMore(talk));
    row.appendChild(body);

    /* tag */
    const tag = el(
      "span",
      "talk-tag" + (talk.kind === "paper" ? " is-paper" : "") + (activity ? " is-activity" : ""),
      talkTag(talk)
    );
    row.appendChild(tag);

    return row;
  }

  /* The discussion themes under a session. Three themes sit side by side;
     two or four make a two-column grid. Each theme's optional `questions`
     are one per lens: the first in amber, the second in iris. */
  function renderGroups(session) {
    const groups = session.groups;
    const wrap = el("div", "groups");
    wrap.appendChild(el("p", "groups-head", "Discussion themes"));
    if (session.groupsIntro) wrap.appendChild(el("p", "groups-intro", session.groupsIntro));

    const n = groups.length;
    const list = el("ol", "group-list cols-" + (n === 1 ? 1 : n === 2 || n === 4 ? 2 : 3));
    groups.forEach((g, i) => {
      const item = el("li", "group");
      const head = el("div", "group-head");
      head.appendChild(el("span", "group-num", String(i + 1).padStart(2, "0")));
      head.appendChild(el("h4", "group-title", g.title));
      item.appendChild(head);
      if (g.summary) item.appendChild(el("p", "group-summary", g.summary));

      if (g.questions && g.questions.length) {
        const qs = el("div", "group-qs");
        g.questions.forEach((q, j) => {
          const box = el("div", "group-q " + (j % 2 ? "lens-with" : "lens-of"));
          if (q.lens) box.appendChild(el("p", "group-lens", q.lens));
          box.appendChild(el("p", "group-question", q.text || ""));
          qs.appendChild(box);
        });
        item.appendChild(qs);
      }
      list.appendChild(item);
    });
    wrap.appendChild(list);
    return wrap;
  }

  function renderSessions() {
    const root = document.getElementById("schedule");
    if (!root || typeof SESSIONS === "undefined") return;

    if (WORKSHOP.showTalkTimes) root.classList.add("has-times");

    SESSIONS.forEach((session, i) => {
      const card = el("article", "session " + sessionTone(i));
      card.id = (session.label || "session").toLowerCase().replace(/[^a-z0-9]+/g, "-");

      const head = el("header", "session-head");
      if (session.label) head.appendChild(el("span", "session-label", session.label));

      const mins = sessionMinutes(session);
      if (session.start) {
        head.appendChild(el("span", "session-time", timeRange(session.start, session.end)));
      } else if (mins) {
        head.appendChild(el("span", "session-time", mins + " min"));
      }
      if (session.title) head.appendChild(el("h3", "session-title", session.title));
      if (session.summary) head.appendChild(el("p", "session-summary", session.summary));
      card.appendChild(head);

      const list = el("ul", "talks");
      let clock = toMinutes(session.start);
      (session.talks || []).forEach((talk) => {
        const start = toMinutes(talk.time);
        if (start != null) clock = start;              // an explicit time resets the clock
        list.appendChild(renderTalk(talk, clock));
        if (clock != null && talk.mins) clock += talk.mins;
      });
      card.appendChild(list);

      if (session.groups && session.groups.length) card.appendChild(renderGroups(session));
      root.appendChild(card);

      if (session.breakAfter) {
        const b = session.breakAfter;
        const gap = el("div", "gap");
        const time = b.start ? timeRange(b.start, b.end) : "";
        gap.appendChild(el("span", null, time ? b.label + " · " + time : b.label));
        root.appendChild(gap);
      }
    });
  }

  /* ----------------------------- speakers ------------------------------- */
  function renderSpeakers() {
    const grid = document.getElementById("speakers-grid");
    const empty = document.getElementById("speakers-empty");
    if (!grid || typeof SESSIONS === "undefined") return;

    const seen = new Set();
    let confirmed = 0;
    let openSlots = 0;

    SESSIONS.forEach((session) => {
      (session.talks || []).forEach((talk) => {
        if (isActivity(talk)) return;
        const names = speakerNames(talk);
        if (!names.length) { openSlots++; return; }
        const label = joinNames(names);
        const key = label.toLowerCase();
        if (seen.has(key)) return;
        seen.add(key);
        confirmed++;

        const item = el("li", "speaker" + (names.length > 1 ? " is-group" : ""));
        item.appendChild(names.length > 1 ? avatarGroup(names) : avatar(talk, "avatar-lg"));
        const meta = el("div", "speaker-meta");
        meta.appendChild(maybeLink(label, talk.url, "speaker-name"));
        if (talk.affiliation) meta.appendChild(el("div", "speaker-aff", talk.affiliation));
        const detail = talk.title || talk.topic;
        if (detail) meta.appendChild(el("p", "speaker-talk", detail));
        item.appendChild(meta);
        grid.appendChild(item);
      });
    });

    if (confirmed === 0) {
      grid.hidden = true;
      if (empty) empty.hidden = false;
      return;
    }

    if (openSlots > 0) {
      grid.appendChild(
        el(
          "li",
          "speaker is-more",
          openSlots === 1 ? "1 more speaker to be announced" : openSlots + " more speakers to be announced"
        )
      );
    }
  }

  /* ---------------------------- organizers ------------------------------ */
  function renderOrganizers() {
    const grid = document.getElementById("organizers-grid");
    if (!grid || typeof ORGANIZERS === "undefined") return;

    ORGANIZERS.forEach((person) => {
      const item = el("li", "organizer");
      const top = el("div", "o-top");
      top.appendChild(avatar(person));
      const who = el("div");
      who.appendChild(maybeLink(person.name, person.url, "o-name"));
      if (person.affiliation) who.appendChild(el("div", "o-aff", person.affiliation));
      top.appendChild(who);
      item.appendChild(top);
      if (person.unit) item.appendChild(el("div", "o-unit", person.unit));
      if (person.focus) item.appendChild(el("p", "o-focus", person.focus));
      grid.appendChild(item);
    });
  }

  /* ------------------------- mobile navigation -------------------------- */
  function initNav() {
    const nav = document.querySelector(".nav");
    const toggle = nav && nav.querySelector(".nav-toggle");
    const links = document.getElementById("nav-links");
    if (!toggle || !links) return;

    nav.classList.add("has-js");
    const setOpen = (open) => {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
    };

    toggle.addEventListener("click", () => setOpen(!nav.classList.contains("is-open")));
    links.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("is-open")) { setOpen(false); toggle.focus(); }
    });
    document.addEventListener("click", (e) => { if (!nav.contains(e.target)) setOpen(false); });
  }

  /* --------------------- Padlet QR, full screen ------------------------- */
  /* "Show QR code full screen" (and a click on the QR itself) opens a screen
     with nothing but a large QR code, for the projector. Opening the page at
     #qr does the same. Without JavaScript, the QR simply links to the board. */
  function initQrScreen() {
    const dialog = document.getElementById("qr-dialog");
    if (!dialog || typeof dialog.showModal !== "function") return;

    let wentFullscreen = false;

    /* The QR screen opens at once; full screen, when the browser allows it,
       follows. Going full screen can draw the page over the dialog, so the
       dialog is then opened again on top. */
    const open = (fullscreen) => {
      if (!dialog.open) dialog.showModal();
      const root = document.documentElement;
      if (!fullscreen || !root.requestFullscreen || document.fullscreenElement) return;
      root.requestFullscreen()
        .then(() => {
          wentFullscreen = true;
          if (dialog.open) { dialog.close(); dialog.showModal(); }
        })
        .catch(() => {});
    };

    document.querySelectorAll("[data-qr-open]").forEach((node) => {
      node.hidden = false;
      node.addEventListener("click", (e) => { e.preventDefault(); open(true); });
    });

    dialog.addEventListener("close", () => {
      if (dialog.open) return;                         // closed only to be redrawn on top
      if (wentFullscreen && document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      wentFullscreen = false;
      if (location.hash === "#qr") history.replaceState(null, "", location.pathname + location.search);
    });

    /* Esc in full screen leaves full screen; close the QR screen with it. */
    document.addEventListener("fullscreenchange", () => {
      if (!document.fullscreenElement && wentFullscreen && dialog.open) dialog.close();
    });

    const closeBtn = dialog.querySelector("[data-qr-close]");
    if (closeBtn) closeBtn.addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });

    const fromHash = () => { if (location.hash === "#qr") open(false); };
    window.addEventListener("hashchange", fromHash);
    fromHash();
  }

  /* -------------------------------- go ---------------------------------- */
  function init() {
    initNav();
    if (typeof WORKSHOP === "undefined") {
      console.error("program.js did not load — the page cannot be rendered.");
      return;
    }
    fillMeta();
    renderTopics();
    renderTimeline();
    renderSessions();
    renderSpeakers();
    renderOrganizers();
    initQrScreen();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
