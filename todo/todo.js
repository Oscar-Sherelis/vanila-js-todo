if (localStorage.getItem("name") && localStorage.getItem("surname")) {
  document.querySelector(".loged-in-user").innerText =
    localStorage.getItem("name") + " " + localStorage.getItem("surname");

  function createTbodyTr(arr) {
    document.querySelector("tbody").innerHTML = "";
    arr.forEach((obj) => {
      let trEl = document.createElement("tr");

      let tdTodoContent = document.createElement("td");
      let tdType = document.createElement("td");
      let tdEndDate = document.createElement("td");

      let updateObj = {
        key: localStorage.getItem("name") + localStorage.getItem("surname"),
        content: obj.content,
        type: obj.type,
        endDate: obj.endDate,
      };

      // inputs

      let inputTodoContent = document.createElement("input");
      inputTodoContent.setAttribute("value", obj.content);
      inputTodoContent.setAttribute("class", "todo-content-input");

      let inputTodoType = document.createElement("input");
      inputTodoType.setAttribute("value", obj.type);
      inputTodoType.setAttribute("class", "todo-type-input");

      let inputTodoEndDate = document.createElement("input");
      inputTodoEndDate.setAttribute("value", obj.endDate);
      inputTodoEndDate.setAttribute("class", "todo-end-date");

      // Input append to td

      tdTodoContent.append(inputTodoContent);
      tdType.append(inputTodoType);
      tdEndDate.append(inputTodoEndDate);

      // Buttons

      let deleteBtn = document.createElement("button");
      deleteBtn.innerText = "Delete";
      deleteBtn.setAttribute("class", "delete-btn");

      let updateBtn = document.createElement("button");
      updateBtn.innerText = "Update";
      updateBtn.setAttribute("class", "update-btn");

      trEl.append(tdTodoContent, tdType, tdEndDate, updateBtn, deleteBtn);

      document.querySelector("tbody").append(trEl);

      // Input events

      document.querySelector(".todo-content-input").addEventListener("input", (e) => {
        updateObj.content = e.target.value;
      });

      document.querySelector(".todo-type-input").addEventListener("input", (e) => {
        updateObj.type = e.target.value;
      });

      document.querySelector(".todo-end-date").addEventListener("input", (e) => {
        updateObj.endDate = e.target.value;
      });

      // HTTP req events

      document.querySelector(".delete-btn").addEventListener("click", async () => {
        await httpReq(mainUrl + "todo/" + obj.id, {}, "DELETE");
        getTodos();
      });

      document.querySelector(".update-btn").addEventListener("click", async () => {
        console.log(updateObj);
        await httpReq(mainUrl + "todo/" + obj.id, updateObj, "PUT");
        getTodos();
      });
    });
  }

  async function getTodos() {
    let todos = await httpReq(mainUrl + "todo", {}, "GET");

    let filteredTodos = todos.data.filter(
      (el) => el.key === localStorage.getItem("name") + localStorage.getItem("surname"),
    );

    if (filteredTodos.length > 0) {
      document.querySelector("table").style.display = "block";

      createTbodyTr(filteredTodos);
    }
  }

  getTodos();

  // display form on click
  document.querySelector(".add-todo").addEventListener("click", () => {
    document.querySelector(".add-todo-form").style.display = "block";
  });

  // Add new todo

  let newTodoObj = {};

  document.querySelector("form input[name='content']").addEventListener("input", (e) => {
    newTodoObj.content = e.target.value;
  });

  document.querySelector("form input[name='type']").addEventListener("input", (e) => {
    newTodoObj.type = e.target.value;
  });

  document.querySelector("form input[name='end-date']").addEventListener("input", (e) => {
    newTodoObj.endDate = e.target.value;
  });

  newTodoObj.key = localStorage.getItem("name") + localStorage.getItem("surname");

  document.querySelector(".add-new-todo").addEventListener("click", async (e) => {
    e.preventDefault();
    await httpReq(mainUrl + "todo", newTodoObj, "POST");
    getTodos();
  });
} else {
  document.querySelector(".todo-section").style.display = "none";
  document.querySelector(".not-logged-in").style.display = "block";
}
