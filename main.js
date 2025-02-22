let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".tab");
let taskList = [];
let filter = "all"; // 현재 필터 상태 (모두, 진행, 완료)

addButton.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});
tabs.forEach(tab => tab.addEventListener("click", changeTab));

function addTask() {
    let taskContent = taskInput.value.trim();
    if (taskContent === "") {
        alert("할 일을 입력하세요! 😺"); //  빈 값 경고 메시지 추가
        return;
    }

    let task = { text: taskContent, isCompleted: false };
    taskList.push(task);
    taskInput.value = ""; // 입력 필드 초기화
    render();
}

function render() {
    let taskBoard = document.getElementById("task-board");
    taskBoard.innerHTML = "";

    taskList
        .filter(task => {
            if (filter === "all") return true;
            if (filter === "progress") return !task.isCompleted;
            if (filter === "completed") return task.isCompleted;
        })
        .forEach((task, index) => {
            let taskDiv = document.createElement("div");
            taskDiv.classList.add("task");
            if (task.isCompleted) taskDiv.classList.add("completed");

            taskDiv.innerHTML = `
                <div>${task.text}</div>
                <div class="buttons">
                    <button onclick="toggleTask(${index})">${task.isCompleted ? "되돌리기" : "Check"}</button><!-
                    -><button onclick="deleteTask(${index})">Delete</button>
                </div>
            `;

            taskBoard.appendChild(taskDiv);
        });
}

function deleteTask(index) {
    let realIndex = taskList.findIndex(task => task === filterList()[index]); // ✅ 원본에서 올바른 인덱스 찾기
    if (realIndex !== -1) {
        taskList.splice(realIndex, 1);
    }
    render();
}

function toggleTask(index) {
    let realIndex = taskList.findIndex(task => task === filterList()[index]); // ✅ 원본에서 정확한 인덱스 찾기
    if (realIndex !== -1) {
        taskList[realIndex].isCompleted = !taskList[realIndex].isCompleted;
    }
    render();
}

function changeTab(event) {
    tabs.forEach(tab => tab.classList.remove("active"));
    event.target.classList.add("active");

    filter = event.target.dataset.filter;
    render();
}

//  필터링된 리스트 반환 (원본 인덱스 찾을 때 사용)
function filterList() {
    return taskList.filter(task => {
        if (filter === "all") return true;
        if (filter === "progress") return !task.isCompleted;
        return task.isCompleted;
    });
}