const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const add = document.querySelector(".fa-plus-circle");
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-us", options);

let LIST = [],
  id = 0;

let data = localStorage.getItem("TODO");

if (data) {
  LIST = JSON.parse(data);
  id = LIST.length;
  loadList(LIST);
} else {
  LIST = [];
  id = 0;
}

function loadList(array) {
  array.forEach(function (item) {
    addToDo(item.name, item.id, item.done, item.trash);
  });
}

function addToDo(toDo, id, done, trash) {
  if (trash) {
    return;
  }

  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";

  const item = `  
 <div>
 <li class="item">
 <i class="fa ${DONE} com" job="complete" id="${id}"></i>
 <p class=" text ${LINE} ">${toDo}</p>
 <i class="fa fa-trash-o del" job="delete" id="${id}"></i> 

</li>
<hr class="hr">
</div>
`;
  const position = "beforeend";
  list.insertAdjacentHTML(position, item);
}
//add item

document.addEventListener("keyup", function (event) {
  if (event.keyCode == 13) {
    const toDo = input.value;

    if (toDo) {
      addToDo(toDo, id, false, false);

      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false,
      });
      localStorage.setItem("TODO", JSON.stringify(LIST));

      id++;
    }
    input.value = "";
  }
});

add.addEventListener("click", function (event) {
  const toDo = input.value;

  if (toDo) {
    addToDo(toDo, id, false, false);

    LIST.push({
      name: toDo,
      id: id,
      done: false,
      trash: false,
    });
    localStorage.setItem("TODO", JSON.stringify(LIST));

    id++;
  }
  input.value = "";
});

clear.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

function completeToDo(element) {
  element.classList.toggle(CHECK);

  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

  LIST[element.id].done = LIST[element.id].done ? false : true;
}

function removeToDo(element) {
  element.parentNode.parentNode.parentNode.removeChild(
    element.parentNode.parentNode
  );

  LIST[element.id].trash = true;
}

list.addEventListener("click", function (event) {
  const element = event.target;
  const elementJob = element.attributes.job.value;
  console.log(elementJob);
  if (elementJob == "complete") {
    completeToDo(element);
    console.log("a");
  } else if (elementJob == "delete") {
    removeToDo(element);
    removeToDo(hr);
  }
  localStorage.setItem("TODO", JSON.stringify(LIST));
});
