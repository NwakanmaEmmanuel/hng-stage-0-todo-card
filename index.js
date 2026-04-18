// ── State ──
const task = {
  title: "Complete HNG Stage 0 Todo Card",
  description: "Build a clean, interactive task card with proper semantics, test IDs, and time-based updates. This description is long enough to trigger the expand/collapse behaviour so testers can verify it works correctly.",
  priority: "High",
  status: "Pending",
  dueDate: "2026-04-16T23:59:00",
  completed: false,
};

// ── Element refs ──
const card              = document.querySelector('[data-testid="test-todo-card"]');
const viewMode          = document.getElementById("viewMode");
const editForm          = document.getElementById("editForm");

const checkbox          = document.querySelector('[data-testid="test-todo-complete-toggle"]');
const titleEl           = document.querySelector('[data-testid="test-todo-title"]');
const priorityBadge     = document.querySelector('[data-testid="test-todo-priority"]');
const priorityIndicator = document.querySelector('[data-testid="test-todo-priority-indicator"]');
const statusDisplay     = document.querySelector('[data-testid="test-todo-status"]');
const statusControl     = document.querySelector('[data-testid="test-todo-status-control"]');
const descEl            = document.querySelector('[data-testid="test-todo-description"]');
const collapsible       = document.querySelector('[data-testid="test-todo-collapsible-section"]');
const expandBtn         = document.querySelector('[data-testid="test-todo-expand-toggle"]');
const dueDateEl         = document.getElementById("dueDateEl");
const timeRemainingEl   = document.getElementById("timeRemainingEl");
const overdueIndicator  = document.querySelector('[data-testid="test-todo-overdue-indicator"]');

const editTitleInput    = document.querySelector('[data-testid="test-todo-edit-title-input"]');
const editDescInput     = document.querySelector('[data-testid="test-todo-edit-description-input"]');
const editDueDateInput  = document.querySelector('[data-testid="test-todo-edit-due-date-input"]');
const editPrioritySelect= document.querySelector('[data-testid="test-todo-edit-priority-select"]');
const saveBtn           = document.querySelector('[data-testid="test-todo-save-button"]');
const cancelBtn         = document.querySelector('[data-testid="test-todo-cancel-button"]');

let isExpanded = false;
let timerInterval = null;
const COLLAPSE_HEIGHT = "56px"; // ~3 lines of text

// ══════════════════════════════════════
// RENDER — syncs all UI to task state
// ══════════════════════════════════════
function renderTask() {
  // Title
  titleEl.textContent = task.title;
  titleEl.classList.toggle("completed", task.completed);

  // Description
  descEl.textContent = task.description;

  // Priority badge + dot
  priorityBadge.textContent = task.priority;
  priorityBadge.className   = ""; // reset
  priorityBadge.classList.add(task.priority.toLowerCase());

  priorityIndicator.className = "priority-dot";
  priorityIndicator.classList.add(task.priority.toLowerCase());

  // Card left-border accent
  card.classList.remove("priority-high", "priority-medium", "priority-low");
  card.classList.add("priority-" + task.priority.toLowerCase());

  // Status badge
  statusDisplay.textContent = task.status;
  statusDisplay.className   = "";
  if (task.status === "Pending")     statusDisplay.classList.add("pending");
  if (task.status === "In Progress") statusDisplay.classList.add("in-progress");
  if (task.status === "Done")        statusDisplay.classList.add("done");

  // Status control
  statusControl.value = task.status;

  // Checkbox
  checkbox.checked = task.completed;

  // Done state on card
  card.classList.toggle("done-state", task.completed);

  // Collapse / expand
  if (task.description.length > 100) {
    expandBtn.style.display = "block";
    collapsible.style.maxHeight = isExpanded ? "none" : COLLAPSE_HEIGHT;
    collapsible.style.overflow  = isExpanded ? "visible" : "hidden";
    expandBtn.textContent = isExpanded ? "Show Less" : "Show More";
    expandBtn.setAttribute("aria-expanded", String(isExpanded));
  } else {
    expandBtn.style.display     = "none";
    collapsible.style.maxHeight = "none";
    collapsible.style.overflow  = "visible";
  }

  // Time
  updateTime();
}

// ══════════════════════════════════════
// TIME
// ══════════════════════════════════════
function formatDueDate(d) {
  return "Due " + d.toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric"
  });
}

function updateTime() {
  dueDateEl.textContent = formatDueDate(new Date(task.dueDate));

  if (task.status === "Done") {
    timeRemainingEl.textContent = "Completed";
    timeRemainingEl.className   = "done";
    overdueIndicator.style.display = "none";
    return;
  }

  const now  = new Date();
  const due  = new Date(task.dueDate);
  const diff = due - now;
  const abs  = Math.abs(diff);
  const mins  = Math.floor(abs / 60000);
  const hours = Math.floor(abs / 3600000);
  const days  = Math.floor(abs / 86400000);

  timeRemainingEl.className = "";
  overdueIndicator.style.display = "none";

  let text = "";
  if (diff < 0) {
    // Overdue
    timeRemainingEl.classList.add("overdue");
    overdueIndicator.style.display = "inline-block";
    text = days  > 0 ? `Overdue by ${days} day${days > 1 ? "s" : ""}`
         : hours > 0 ? `Overdue by ${hours} hour${hours > 1 ? "s" : ""}`
         :             `Overdue by ${mins} minute${mins !== 1 ? "s" : ""}`;
  } else {
    if (hours < 1)       timeRemainingEl.classList.add("soon");
    else if (days <= 3)  timeRemainingEl.classList.add("soon");
    text = days  > 0 ? `Due in ${days} day${days > 1 ? "s" : ""}`
         : hours > 0 ? `Due in ${hours} hour${hours > 1 ? "s" : ""}`
         :             `Due in ${mins} minute${mins !== 1 ? "s" : ""}`;
  }

  timeRemainingEl.textContent = text;
}

function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(updateTime, 30000);
}

// ══════════════════════════════════════
// EDIT MODE
// ══════════════════════════════════════
function openEditMode() {
  // Pre-fill
  editTitleInput.value     = task.title;
  editDescInput.value      = task.description;
  editPrioritySelect.value = task.priority;

  // Format for datetime-local input
  const d   = new Date(task.dueDate);
  const pad = n => String(n).padStart(2, "0");
  editDueDateInput.value =
    `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;

  // BUG FIX: hide the whole viewMode, not just description's parent
  viewMode.style.display = "none";
  editForm.style.display = "flex";

  editTitleInput.focus();
}

function closeEditMode() {
  editForm.style.display  = "none";
  viewMode.style.display  = "block";
  // Return focus to edit button
  document.querySelector('[data-testid="test-todo-edit-button"]').focus();
}

// ══════════════════════════════════════
// EVENT LISTENERS
// ══════════════════════════════════════

// Edit button
document.querySelector('[data-testid="test-todo-edit-button"]')
  .addEventListener("click", openEditMode);

// Cancel
cancelBtn.addEventListener("click", closeEditMode);

// Save
saveBtn.addEventListener("click", () => {
  const newTitle = editTitleInput.value.trim();
  if (!newTitle) { editTitleInput.focus(); return; }

  task.title       = newTitle;
  task.description = editDescInput.value.trim() || task.description;
  task.priority    = editPrioritySelect.value;
  if (editDueDateInput.value) task.dueDate = editDueDateInput.value;

  // Reset expand state after description may have changed
  isExpanded = false;

  closeEditMode();
  renderTask();
});

// Checkbox
checkbox.addEventListener("change", () => {
  task.completed = checkbox.checked;
  task.status    = checkbox.checked ? "Done" : "Pending";
  renderTask();
});

// Status control dropdown
statusControl.addEventListener("change", (e) => {
  task.status    = e.target.value;
  task.completed = (task.status === "Done");
  renderTask();
});

// Expand / collapse — BUG FIX: toggle flag then re-render
expandBtn.addEventListener("click", () => {
  isExpanded = !isExpanded;
  renderTask();
});

// Delete
document.querySelector('[data-testid="test-todo-delete-button"]')
  .addEventListener("click", () => {
    card.style.transition = "opacity 0.3s, transform 0.3s";
    card.style.opacity    = "0";
    card.style.transform  = "scale(0.95)";
    setTimeout(() => card.remove(), 320);
  });

// ── Init ──
renderTask();
startTimer();
