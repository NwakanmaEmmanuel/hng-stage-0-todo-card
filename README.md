# HNG Stage 0 - Testable Todo Card

## 🔗 Live Demo
[View Project](https://your-live-url-here)

---

## 📌 Overview
This project is a testable and interactive Todo Task Card built as part of the HNG Internship Stage 0 task.

The component represents a single task and includes key information such as title, description, priority, due date, status, and tags. It also provides interactive functionality like marking a task as completed and dynamically updating the time remaining.

---

## ✨ Features

- Semantic HTML structure using elements like `<article>`, `<time>`, and `<button>`
- Fully testable with required `data-testid` attributes
- Interactive checkbox to toggle task completion
- Dynamic time calculation:
  - "Due in X days"
  - "Overdue by X hours"
- Automatic time updates every 30 seconds
- Clean and modern UI design
- Accessible elements (real checkbox, labeled buttons)

---

## 🛠️ How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git

2. Navigate into the project folder:
   cd your-repo-name

3. Open the project:
  Open index.html in your browser


##  Key Decisions
- Used semantic HTML elements (<article>, <time>, <ul>, <button>) to improve accessibility and structure
- Added data-testid attributes to support automated testing requirements
- Used a real <input type="checkbox"> instead of a custom element for proper accessibility
- Implemented dynamic time calculation using the JavaScript Date API
- Used setInterval to update the time every 30 seconds for accuracy without performance issues
- Structured the UI into logical sections (header, meta, description, time, tags)

## Trade-offs
- Used vanilla JavaScript instead of a framework like React for simplicity and faster setup
- Time calculation is approximate (minutes, hours, days) rather than second-by-second precision
- Edit and Delete buttons are currently UI placeholders (no full functionality implemented)