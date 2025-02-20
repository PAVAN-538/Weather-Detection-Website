document.addEventListener("DOMContentLoaded",() => {
    let input = document.getElementById("todo-input");
    let button = document.getElementById("todo-btn");
    let list = document.getElementById("todo-list");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((test) => rendertask(test))

    button.addEventListener("click", () => {
      const TodoValue = input.value.trim();
      if (TodoValue == "") {
        return;
      }

      const newtask = {
        id: Date.now(),
        text: TodoValue,
        completed: false,
      };
      tasks.push(newtask);
      savetasks();
      rendertask(newtask);
      input.value = "";
      console.log(tasks);
    });

    function rendertask(task) {
      const li = document.createElement("li");
      li.setAttribute("data-id", task.id);
      if(task.completed)  li.classList.add("completed");
      li.innerHTML = 
      `<span>${task.text}</span>
      <button class="delete-btn" back>delete</button>`;
      

      li.addEventListener("click", (e) => {
        if(e.target.classList.contains("delete-btn")) return;
        task.completed = !task.completed;
        li.classList.toggle("completed");
        
        savetasks();
    

   
      });
        li.querySelector(".delete-btn")
        .addEventListener("click", () => {
          tasks = tasks.filter((t) => t.id !== task.id);
          savetasks();
          li.remove();
        });

        list.appendChild(li);
  
    }
    function savetasks() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
});