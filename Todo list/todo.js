document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("task-input");
    const addTaskBtn = document.getElementById("add-task-btn");
    const taskList = document.getElementById("task-list");

    // Task function ko add karta hai
    addTaskBtn.addEventListener("click", function() {
        const taskText = taskInput.value.trim();

        if (taskText !== "") {
            const li = document.createElement("li");
            li.innerHTML = `
                <span class="task-text">${taskText}</span>
                <button class="delete-btn">X</button>
            `;

            // Task par ek line laga de ga whrn it is comlpleted
            li.addEventListener("click", function() {
                li.classList.toggle("completed"); // ye line lagata nad hatia bhi hai whenever the task is completed
            });

            // Task delete karde ga
            li.querySelector(".delete-btn").addEventListener("click", function(event) {
                event.stopPropagation();
                li.remove();
            });

            taskList.appendChild(li); // creating a new list item
            taskInput.value = ""; // jo line hoti hai task add karnay wali osko mita ta hai
        }
    });

    
    taskInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            addTaskBtn.click();
        }
``    });
});
