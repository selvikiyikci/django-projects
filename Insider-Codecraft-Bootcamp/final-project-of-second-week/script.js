document.addEventListener("DOMContentLoaded", function () {
    const taskList = document.getElementById("task-list");
    const addTaskBtn = document.getElementById("add-task");
    const filterCompletedBtn = document.getElementById("filter-completed");
    const sortPriorityBtn = document.getElementById("sort-priority");

    addTaskBtn.addEventListener("click", function (event) {
        event.stopPropagation(); 
        try {
            const title = document.getElementById("task-title").value.trim();
            const desc = document.getElementById("task-desc").value.trim();
            const priority = document.getElementById("task-priority").value;

            if (title === "") {
                alert("Görev başlığı boş olamaz!");
                return;
            }
            if (priority === "") {
                alert("Lütfen bir öncelik seçiniz!");
                return;
            }
            const taskItem = document.createElement("li");
            taskItem.classList.add("task-item");
            taskItem.setAttribute("data-priority", priority);
            let priorityColor = "";
            if (priority === "Yüksek") priorityColor = "red";
            else if (priority === "Orta") priorityColor = "orange";
            else if (priority === "Düşük") priorityColor = "green";
            taskItem.innerHTML = `
                <div class="task-title">${title}</div>
                <div class="task-desc">${desc}</div>
                <div class="task-priority" style="background:${priorityColor}">${priority}</div>
                <div class="task-buttons">
                    <button class="complete-btn">✔</button>
                    <button class="delete-btn">✖</button>
                </div>
            `;

            taskList.appendChild(taskItem);

            document.getElementById("task-title").value = "";
            document.getElementById("task-desc").value = "";
            document.getElementById("task-priority").value = "";
        } catch (error) {
            console.error("Beklenmeyen hata: ", error);
        }
    });

    taskList.addEventListener("click", function (event) {
        event.stopPropagation(); 

        const target = event.target;

        if (target.classList.contains("complete-btn")) {
            const task = target.closest(".task-item");
            task.classList.toggle("completed");

            if (task.classList.contains("completed")) {
                task.style.backgroundColor = "#c8e6c9"; 
            } else {
                task.style.backgroundColor = "white"; 
            }
        }

        if (target.classList.contains("delete-btn")) {
            target.closest(".task-item").remove();
        }
    });

    filterCompletedBtn.addEventListener("click", function (event) {
        event.stopPropagation(); 
        const tasks = document.querySelectorAll(".task-item");
        tasks.forEach((task) => {
            if (!task.classList.contains("completed")) {
                task.style.display = task.style.display === "none" ? "block" : "none";
            }
        });
    });

    sortPriorityBtn.addEventListener("click", function (event) {
        event.stopPropagation(); 

        let tasksArray = Array.from(taskList.children);
        tasksArray.sort((a, b) => {
            const priorityOrder = { Yüksek: 1, Orta: 2, Düşük: 3 };
            let aPriority = a.getAttribute("data-priority");
            let bPriority = b.getAttribute("data-priority");
            return priorityOrder[aPriority] - priorityOrder[bPriority];
        });

        tasksArray.forEach((task) => taskList.appendChild(task));
    });
});
