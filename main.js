let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".tab");
let taskList = [];
let filter = "all"; // 현재 필터 상태 (모두, 진행, 완료)

addButton.addEventListener("click", addTask);
tabs.forEach(tab => tab.addEventListener("click", changeTab));

function addTask() {
    let taskContent = taskInput.value.trim();
    if (taskContent === "") return;
    let task = { text: taskContent, isCompleted: false };
    taskList.push(task);
    taskInput.value = ""; // 입력 필드 초기화
    render();
}

function render() {
    let resultHTML = "";
    let filteredList = taskList.filter(task => {
        if (filter === "all") return true;
        if (filter === "progress") return !task.isCompleted;
        if (filter === "completed") return task.isCompleted;
    });

    filteredList.forEach((task, index) => {
        resultHTML += `
            <div class="task ${task.isCompleted ? "completed" : ""}">
                <div>${task.text}</div>
                <div class="buttons">
                    <button onclick="toggleTask(${index})">${task.isCompleted ?"되돌리기":"Check"}</button><!--
                    --><button onclick="deleteTask(${index})">Delete</button>
                </div>
            </div>`;
    });

    document.getElementById("task-board").innerHTML = resultHTML;
}

function deleteTask(index) {
    taskList.splice(index, 1);
    render();
}

function toggleTask(index) {
    let task = taskList[index];
    task.isCompleted = !task.isCompleted; // 완료/미완료 토글
    render();
}

function changeTab(event) {
    tabs.forEach(tab => tab.classList.remove("active"));
    event.target.classList.add("active");

    filter = event.target.dataset.filter;
    render();
}