# HNG Stage 1A — Advanced Todo Card (Interactive & Stateful)

## 🔗 Live Demo
[View Project](https://hng-stage-0-todo-card-five.vercel.app/)

## 📁 GitHub Repo
[View Repository](https://github.com/NwakanmaEmmanuel/hng-stage-0-todo-card)

---

## 📌 Overview
This is the Stage 1A upgrade of the HNG Internship Todo Card. The component has been extended from a static display card into a fully interactive, stateful task card — supporting edit mode, status transitions, priority changes, collapsible content, and dynamic time handling.

---

##  What Changed from Stage 0

### New Features Added
- **Edit Mode** — clicking Edit reveals a form pre-filled with the current task values. Save updates the card live; Cancel restores the previous view and returns focus to the Edit button.
- **Status Control** — a dropdown lets users switch between Pending, In Progress, and Done without using the checkbox.
- **Checkbox ↔ Status Sync** — checking the checkbox sets status to Done; manually selecting Done from the dropdown checks the checkbox. They always stay in sync.
- **Priority Indicator** — a colored dot (`test-todo-priority-indicator`) and left border accent now change color based on priority (High = red, Medium = amber, Low = green).
- **Expand / Collapse** — descriptions longer than 100 characters are collapsed by default with a Show More / Show Less toggle button.
- **Overdue Indicator** — a red badge (`test-todo-overdue-indicator`) appears automatically when the due date has passed.
- **Time stops when Done** — when status is Done, the time remaining stops updating and displays "Completed" instead.
- **Delete animation** — the card fades and scales out smoothly when deleted.

### Bug Fixes from Stage 0
- Edit mode previously only hid the description div, leaving the title and other elements visible alongside the form. Fixed by wrapping all view content in a single `#viewMode` container that gets toggled entirely.
- Show More / Show Less was not working because the expand button was outside the collapsible section and `isExpanded` was declared after the event listener that used it.
- `dueDateEl` was never populated — `updateTime()` now sets both date elements.
- `test-todo-overdue-indicator` testid was missing from the HTML entirely.

---

## 🛠️ How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   ```

2. Navigate into the project folder:
   ```bash
   cd your-repo-name
   ```

3. Open `index.html` directly in your browser — no build step or server needed.

---

## 🧱 File Structure

```
├── index.html   — markup and structure
├── index.css    — all styling
├── index.js     — all interactivity and state logic
└── README.md
```

---

## 🔑 Key Design Decisions

- **Single `task` object as source of truth** — all state lives in one JS object. Every interaction updates the object, then calls `renderTask()` to sync the UI. This avoids bugs from UI getting out of sync with state.
- **`renderTask()` as a single render function** — instead of scattered DOM updates across multiple event listeners, one function handles all UI updates. This made the expand/collapse and edit bugs much easier to fix.
- **`#viewMode` wrapper** — wrapping all view-mode content in one div makes toggling edit mode clean and reliable (one show/hide instead of targeting individual rows).
- **Semantic HTML preserved** — `<article>`, `<time>`, `<form>`, `<button>`, `<ul>` used throughout for accessibility and test reliability.
- **Real `<input type="checkbox">`** — used instead of a custom element to ensure keyboard accessibility and proper `aria` behavior.
- **Focus management** — when edit mode closes (Save or Cancel), focus returns to the Edit button automatically.

---

## ⚖️ Trade-offs

- **Vanilla JS over a framework** — keeps the project zero-dependency and fast to load, but managing state manually requires discipline (hence the single `renderTask()` pattern).
- **Tags are static** — tag editing is not implemented; tags are display-only in this version.
- **No persistence** — task state resets on page refresh. A real app would use localStorage or a backend.
- **Time is approximate** — displays in minutes, hours, or days rather than a live countdown ticker, which is appropriate for a task card and avoids unnecessary re-renders.

---

## ♿ Accessibility Notes

- All buttons have `aria-label` attributes.
- The expand toggle has `aria-expanded` set to `"true"` or `"false"` on each toggle.
- The checkbox is a native `<input type="checkbox">` with a wrapping `<label>`.
- Focus returns to the Edit button when edit mode is closed.
- All interactive elements are keyboard accessible and have `:focus-visible` styles.
- Color is never the only indicator of state — text labels accompany all color-coded badges.

---

## ⚠️ Known Limitations

- Tags cannot be edited or added.
- Delete removes the card from the DOM only — no undo.
- No data persistence between page loads.
- Edit form does not trap focus inside (optional bonus per spec — not implemented).
