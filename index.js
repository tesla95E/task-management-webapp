document.addEventListener("DOMContentLoaded", () => {
  const req = fetch("http://127.0.0.1:5500/proiect2/inProgressTasks.json");
  //console.log(req);
  req
    .then((data) => {
      console.log("success");
      //   console.log(data);
      return data.json();
    })
    .then((body) => {
      console.log("success json");
      //    console.log(body);
      console.log(body.tasks);
      addTaskToList(body.tasks);
    });
  const list = document.getElementById("in-progress-list");
  function addTaskToList(tasks) {
    //console.log(tasks.length);
    for (let i = 0; i < tasks.length; i++) {
      const listItem = document.createElement("li");
      const h3 = document.createElement("h3");
      h3.textContent = `${tasks[i].title}`;
      listItem.appendChild(h3);
      const p = document.createElement("p");
      p.textContent = `${tasks[i].description}`;
      listItem.appendChild(p);
      const removeButton = document.createElement("button");
      removeButton.textContent = "Task finalizat";
      removeButton.addEventListener("click", () => {
        listItem.remove();
      });
      listItem.appendChild(removeButton);
      list.appendChild(listItem);
    }
  }

  async function getData() {
    //console.log("getData");
    const req = await fetch(
      "http://127.0.0.1:5500/proiect2/externalTasks.json"
    );
    //console.log(req);
    const body = await req.json();
    return body.tasks;
  }
  const getButton = document.getElementById("get-external-task");
  getButton.addEventListener("click", () => {
    const ExternaList = document.getElementById("external-task-list");
    const loadingText = document.getElementById("loading-msg");
    loadingText.textContent = "";
    const p = document.createElement("p");
    for (let i = 0; i < 5; i++) {
      loading = true;
      setTimeout(() => {
        console.log(i);
        p.textContent = `Task-urile externe vor fi aduse in ${5 - i} secunde!`;
        loadingText.appendChild(p);
        ExternaList.appendChild(loadingText);
      }, i * 1000);
    }

    setTimeout(() => {
      loadingText.removeChild(p);
      ExternaList.removeChild(loadingText);
    }, "5000");

    setTimeout(() => {
      const infoTasks = getData();
      infoTasks.then((tasks) => {
        for (let i = 0; i < tasks.length; i++) {
          const listItem = document.createElement("li");
          const h3 = document.createElement("h3");
          h3.textContent = `${tasks[i].title}`;
          listItem.appendChild(h3);
          const p = document.createElement("p");
          p.textContent = `${tasks[i].description}`;
          listItem.appendChild(p);
          const moveButton = document.createElement("button");
          moveButton.textContent =
            "Muta acest task in lista de taskuri in progres";
          moveButton.addEventListener("click", () => {
            const newListItem = document.createElement("li");
            newListItem.appendChild(h3);
            newListItem.appendChild(p);
            const removeButton = document.createElement("button");
            removeButton.textContent = "Task finalizat";
            removeButton.addEventListener("click", () => {
              newListItem.remove();
            });
            newListItem.appendChild(removeButton);
            list.appendChild(newListItem);
            listItem.remove();
          });
          listItem.appendChild(moveButton);
          ExternaList.appendChild(listItem);
        }
      });
    }, "5000");
  });
});

//edge case-uri in json:
//am observat ca daca nu avem un id, functia tot aduce datele pentru ca if-ul pe care l-am facut se uita la lungimea array-ului de task-uri.
//daca nu avem titlu sau descriere va returna undifined
//daca avem un obiect gol in array se va comporta ca la lipsa titlu+lipsa text. va forma un task cu undifined la h3 si p
