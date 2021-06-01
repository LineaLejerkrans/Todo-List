let button = document.querySelector('.todo_button');
let input = document.querySelector('.todo_input');
let list = document.querySelector('.todo_list');
let select = document.querySelector('.select');
let container = document.querySelector('.todo_container');
 
let todoMap = new Map(); // you get a par, where you have a key and a value
 
let todoDiv;
let todoLi;
let close;
let done;
let n = 0;
 
document.addEventListener('DOMContentLoaded', start); // starts when the page is opened
 
button.addEventListener("click", add); // when you click on the button the function add will be called
 
function start(event) { // as soon as the page opens this function will start
   event.preventDefault(); // otherwise the button will reset
 
   todoMap = new Map(JSON.parse(localStorage.getItem("lista"))); // gets the list from the local storage and saves it in a new map
 
   todoMap.forEach((value, key) => {
       createTodoDiv(key, value)
   }) // loops the map, so for each key the function createTodoDiv will be called
 
   n = todoMap.size; // n get the value of the size of the map, so it won't overwrite other values when you refresh the page
}
 
function createTodoDiv(id, object) {
 
   todoDiv = document.createElement('div'); // this creates a div that is called todoDiv
 
   todoDiv.classList.add('todo'); // and you give that div this class
   todoDiv.setAttribute("completed", object.status); // giv todoDiv an attribute that indicates if the task is finished or not
   todoDiv.id = id; // put an id on every task
 
 
   todoLi = document.createElement('li'); // creates a list
 
 
   todoLi.appendChild(document.createTextNode(object.value)) // creates a text node with what you wrote in the box than appends it to the list
   todoLi.classList.add('todo_item'); // gives it a class
   todoDiv.appendChild(todoLi); // append the item to the div
 
   if (object.status == "true") { // if the task's status is true it means the task is completed and it should be given the css for the finished tasks
       todoDiv.classList.add('completedItem');
   }
   list.appendChild(todoDiv); // append the div to the list
 
 
   close = document.createElement('button');
   close.classList.add('delete_btn');
   close.addEventListener("click", delElem); // can't send the id of which tasks has been deleted
 
 
   done = document.createElement('button');
   done.classList.add('complete_btn');
   done.addEventListener("click", comElem);
 
   todoDiv.appendChild(close);
   todoDiv.appendChild(done);
}
 
 
function add(event) {
   event.preventDefault(); // otherwise the button will reset
   if (input.value) { // if you haven't written anything it will not print it
 
       let obj = {
           value: input.value,
           status: "false"
       };
 
       createTodoDiv(++n, obj);
 
       todoMap.set(n, obj); // key = n, value = obj, set means you put it in the map
 
       localStorage.setItem("lista", JSON.stringify(Array.from(todoMap.entries()))); // saves the list but you first have to convert the map to an array and then turn it into a json
       document.getElementById("form").reset(); // after you add a task the text will disappear in the box
 
       printSelected('all');
   }
}
 
function printSelected(option) { // sorts the tasks after completed, uncompleted and all
   let newList = document.createElement('ul');
   newList.classList.add('todo_list');
 
   container.replaceChild(newList, list); // replaces the old list with a new empty one
   list = newList
 
   todoMap = new Map(JSON.parse(localStorage.getItem("lista"))); // get the saved tasks from the local storage
 
   todoMap.forEach((value, key) => { // for every par in the map this function will be runned
       console.log(option, value)
       if (option == "uncompleted" && value.status == "false") {
           createTodoDiv(key, value) // if you have pressed the uncompleted option only the tasks with the status false will be added
       }
       else if (option == "completed" && value.status == "true") {
           createTodoDiv(key, value) // if you have pressed the completed option only the tasks with the status true will be added
       }
       else if (option == "all") { // else all tasks
           createTodoDiv(key, value) 
       }
   })
}
 
function delElem(event) { // event.target tillhör kanppen man tryckte på
   event.preventDefault();
   let id = parseInt(event.target.parentNode.id); // the value you get from the event is a string so you have to convert it to an int
   let elem = document.getElementById(id);
   elem.parentNode.removeChild(elem); // removes the div from the parent
 
   todoMap.delete(id); // deletes the place that has that id
   localStorage.setItem("lista", JSON.stringify(Array.from(todoMap.entries()))); // saves the new map
}
 
function comElem(event) {
   event.preventDefault();
   let id = parseInt(event.target.parentNode.id);
   let elem = document.getElementById(id);
   let newStatus = "true";
   if (elem.getAttribute("completed") == "true") { // if you press the completed button twice the task will become uncompleted
       newStatus = "false";
   }
 
   todoMap.get(id).status = newStatus; // gets the par that has that id as a key, which is an object and then you change its status
 
   localStorage.setItem("lista", JSON.stringify(Array.from(todoMap.entries())));
 
   elem.setAttribute("completed", newStatus);
   if (newStatus == "false") {
       elem.classList.remove('completedItem'); // removes the css
   }
   else {
       elem.classList.add('completedItem'); // adds css
   }
}