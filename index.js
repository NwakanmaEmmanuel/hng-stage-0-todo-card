
  // const checkbox = document.querySelector('[data-testid="test-todo-complete-toggle"]');
  // const title = document.querySelector('[data-testid="test-todo-title"]');
  // const status = document.querySelector('[data-testid="test-todo-status"]');

  // const dueDateEl = document.getElementById("dueDateEl");
  // const timeRemainingEl = document.getElementById("timeRemainingEl");

  // const dueDate = new Date(dueDateEl.getAttribute("datetime"));

  // // ✅ Checkbox toggle
  // checkbox.addEventListener("change", () => {
  //   if (checkbox.checked) {
  //     title.classList.add("completed");
  //     status.textContent = "Completed";
  //   } else {
  //     title.classList.remove("completed");
  //     status.textContent = "Pending";
  //   }
  // });

  // function formatDate(date) {
  //   return date.toLocaleDateString("en-US", {
  //     month: "short",
  //     day: "numeric",
  //     year: "numeric",
  //   });
  // }

  // function updateTime() {
  //   const now = new Date();
  //   const diff = dueDate - now;

  //   const seconds = Math.floor(Math.abs(diff) / 1000);
  //   const minutes = Math.floor(seconds / 60);
  //   const hours = Math.floor(minutes / 60);
  //   const days = Math.floor(hours / 24);

  //   let text = "";

  //   if (diff > 0) {
  //     // future
  //     if (days > 0) {
  //       text = `Due in ${days} day${days > 1 ? "s" : ""}`;
  //     } else if (hours > 0) {
  //       text = `Due in ${hours} hour${hours > 1 ? "s" : ""}`;
  //     } else {
  //       text = `Due in ${minutes} minute${minutes > 1 ? "s" : ""}`;
  //     }
  //   } else {
  //     // past
  //     if (days > 0) {
  //       text = `Overdue by ${days} day${days > 1 ? "s" : ""}`;
  //     } else if (hours > 0) {
  //       text = `Overdue by ${hours} hour${hours > 1 ? "s" : ""}`;
  //     } else {
  //       text = `Overdue by ${minutes} minute${minutes > 1 ? "s" : ""}`;
  //     }
  //   }

  //   timeRemainingEl.textContent = text;
  // }

  // // ✅ Set due date text
  // dueDateEl.textContent = `Due ${formatDate(dueDate)}`;

  // // ✅ Initial call
  // updateTime();

  // // ✅ Update every 30 seconds
  // setInterval(updateTime, 30000);



const task = {
  title: "Complete HNG Stage 0 Todo Card",
  description:
    "Build a clean, interactive task card with proper semantics, test IDs, and time-based updates",
  priority: "High",
  status: "Pending",
  dueDate: "2026-04-16T23:59:00",
  completed: false,
  tags: ["Frontend", "UX", "Design", "Sprint-2"],
};



function renderTask() {
  const titleEl = document.querySelector('[data-testid="test-todo-title"]');
  const descEl = document.querySelector('[data-testid="test-todo-description"]');
  const priorityEl = document.querySelector('[data-testid="test-todo-priority"]');
  const statusEl = document.querySelector('[data-testid="test-todo-status"]');
  const checkbox = document.querySelector('[data-testid="test-todo-complete-toggle"]');
  const dueDateEl = document.getElementById("dueDateEl");

  // 🔹 Update content
  titleEl.textContent = task.title;
  descEl.textContent = task.description;
  priorityEl.textContent = task.priority;
  statusEl.textContent = task.status;

  // 🔹 Checkbox state
  checkbox.checked = task.completed;

  // 🔹 Strike-through if completed
  if (task.completed) {
    titleEl.classList.add("completed");
  } else {
    titleEl.classList.remove("completed");
  }

   const indicator = document.querySelector('[data-testid="test-todo-priority-indicator"]');

  // reset classes
  indicator.classList.remove("high", "medium", "low");

  // apply correct one
  indicator.classList.add(task.priority.toLowerCase());

  const statusControl = document.querySelector('[data-testid="test-todo-status-control"]');
  statusControl.value = task.status;  

  const descContainer = document.querySelector('[data-testid="test-todo-collapsible-section"]');
  const expandBtn = document.querySelector('[data-testid="test-todo-expand-toggle"]');

  if (task.description.length > 100) {
    if (isExpanded) {
      descContainer.style.maxHeight = "none";
      expandBtn.textContent = "Show Less";
    } else {
      descContainer.style.maxHeight = "60px";
      expandBtn.textContent = "Show More";
    }
  } else {
    expandBtn.style.display = "none";
  }

  updateTime()
}

document.querySelector('[data-testid="test-todo-edit-button"]').addEventListener("click", () => {
  toggleEditMode(true);
});

  const checkbox = document.querySelector('[data-testid="test-todo-complete-toggle"]');

  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    task.status = checkbox.checked ? "Done" : "Pending";

    renderTask();
  });

  const statusControl = document.querySelector('[data-testid="test-todo-status-control"]');

  statusControl.addEventListener("change", (e) => {
    task.status = e.target.value;
    task.completed = task.status === "Done";

    renderTask();
  });

  let isEditing = false;

  // function toggleEditMode(state) {
  //   isEditing = state;

  //   const input = document.createElement("input") 

  //   input.type = "text"
  //   input.placeholder = "Enter Something"

  //   if (isEditing) {
  //     const checkbox = document.querySelector('[data-testid="test-todo-complete-toggle"]');
  //     checkbox.disabled = true;
  //     document.querySelector('[data-testid="test-todo-edit-form"]').style.display = "block";
  //     document.querySelector('[data-testid="test-todo-title"]').textContent = '';
  //     document.querySelector('[data-testid="test-todo-title"]').appendChild(input)
  //   } else {
  //     document.querySelector('[data-testid="test-todo-edit-form"]').style.display = "none";
  //   }
  // }

 function toggleEditMode(state) {
  isEditing = state;

  const form = document.querySelector('[data-testid="test-todo-edit-form"]');
  const checkbox = document.querySelector('[data-testid="test-todo-complete-toggle"]');
  const mainContent = document.querySelector('[data-testid="test-todo-description"]').parentElement;
  const mainTitle = document.querySelector('[data-testid="test-todo-title"]').parentElement;

  if (state) {
    form.style.display = "block";

    // hide normal view
    mainContent.style.display = "none";
    mainTitle.style.display = "none"

    checkbox.disabled = true;

    // prefill
    document.querySelector('[data-testid="test-todo-edit-title-input"]').value = task.title;
    document.querySelector('[data-testid="test-todo-edit-description-input"]').value = task.description;
    document.querySelector('[data-testid="test-todo-edit-due-date-input"]').value = task.dueDate;
    document.querySelector('[data-testid="test-todo-edit-priority-select"]').value = task.priority;

  } else {
    form.style.display = "none";

    // show normal view
    mainContent.style.display = "block";
    mainTitle.style.display = "block"

    checkbox.disabled = false;
  }
}

let isExpanded = false;
const expandBtn = document.querySelector('[data-testid="test-todo-expand-toggle"]');

expandBtn.addEventListener("click", () => {
  isExpanded = !isExpanded;
  renderTask();
});

  document.querySelector('[data-testid="test-todo-save-button"]').addEventListener("click", () => {
  task.title = document.querySelector('[data-testid="test-todo-edit-title-input"]').value;
  task.description = document.querySelector('[data-testid="test-todo-edit-description-input"]').value;
  task.priority = document.querySelector('[data-testid="test-todo-edit-priority-select"]').value;
  task.dueDate = document.querySelector('[data-testid="test-todo-edit-due-date-input"]').value;

  toggleEditMode(false);
  renderTask();
});

  document.querySelector('[data-testid="test-todo-cancel-button"]').addEventListener("click", () => {
  toggleEditMode(false);
});



  function updateTime() {
  if (task.status === "Done") {
    document.querySelector('[data-testid="test-todo-time-remaining"]').textContent = "Completed";
    return;
  }

  const now = new Date();
  const due = new Date(task.dueDate);
  const diff = due - now;

  let text = "";

  const minutes = Math.floor(Math.abs(diff) / 1000 / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (diff > 0) {
    text =
      days > 0
        ? `Due in ${days} days`
        : hours > 0
        ? `Due in ${hours} hours`
        : `Due in ${minutes} minutes`;
  } else {
    text =
      days > 0
        ? `Overdue by ${days} days`
        : hours > 0
        ? `Overdue by ${hours} hours`
        : `Overdue by ${minutes} minutes`;
  }

  document.querySelector('[data-testid="test-todo-time-remaining"]').textContent = text;
}

 setInterval(updateTime, 30000);

 renderTask();
updateTime();