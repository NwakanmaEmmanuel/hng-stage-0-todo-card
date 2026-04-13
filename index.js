
  const checkbox = document.querySelector('[data-testid="test-todo-complete-toggle"]');
  const title = document.querySelector('[data-testid="test-todo-title"]');
  const status = document.querySelector('[data-testid="test-todo-status"]');

  const dueDateEl = document.getElementById("dueDateEl");
  const timeRemainingEl = document.getElementById("timeRemainingEl");

  const dueDate = new Date(dueDateEl.getAttribute("datetime"));

  // ✅ Checkbox toggle
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      title.classList.add("completed");
      status.textContent = "Completed";
    } else {
      title.classList.remove("completed");
      status.textContent = "Pending";
    }
  });

  function formatDate(date) {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  function updateTime() {
    const now = new Date();
    const diff = dueDate - now;

    const seconds = Math.floor(Math.abs(diff) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    let text = "";

    if (diff > 0) {
      // future
      if (days > 0) {
        text = `Due in ${days} day${days > 1 ? "s" : ""}`;
      } else if (hours > 0) {
        text = `Due in ${hours} hour${hours > 1 ? "s" : ""}`;
      } else {
        text = `Due in ${minutes} minute${minutes > 1 ? "s" : ""}`;
      }
    } else {
      // past
      if (days > 0) {
        text = `Overdue by ${days} day${days > 1 ? "s" : ""}`;
      } else if (hours > 0) {
        text = `Overdue by ${hours} hour${hours > 1 ? "s" : ""}`;
      } else {
        text = `Overdue by ${minutes} minute${minutes > 1 ? "s" : ""}`;
      }
    }

    timeRemainingEl.textContent = text;
  }

  // ✅ Set due date text
  dueDateEl.textContent = `Due ${formatDate(dueDate)}`;

  // ✅ Initial call
  updateTime();

  // ✅ Update every 30 seconds
  setInterval(updateTime, 30000);
