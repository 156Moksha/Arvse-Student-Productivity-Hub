let addBtn = document.querySelector("#addBtn");
let task = document.querySelector("#task");
let timeInput = document.querySelector("#time");
let list = document.querySelector("#list");

addBtn.addEventListener("click", function(){
  let taskValue = task.value.trim();
  let timeValue = timeInput.value;

  if (!taskValue) {
    alert("Please enter reminder text.");
    task.focus();
    return;
  }

  if (!timeValue) {
    alert("Please select a reminder time.");
    timeInput.focus();
    return;
  }

  let li = document.createElement("li");
  li.innerHTML = `
    <div class="reminder-item">
      <div>
        <div class="reminder-text">${taskValue}</div>
        <div class="reminder-time">Reminder at ${timeValue}</div>
      </div>
      <button class="remove-btn" type="button">Remove</button>
    </div>
  `;

  let removeBtn = li.querySelector(".remove-btn");
  removeBtn.addEventListener("click", function(){
    list.removeChild(li);
  });

  list.appendChild(li);
  task.value = "";
  timeInput.value = "";
  task.focus();
});