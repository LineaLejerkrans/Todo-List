let button = document.querySelector('.todo_button');
let input = document.querySelector('.todo_input');
let list = document.querySelector('.todo_list');
let todoDiv;
let todoLi;
let close;
let done;
 
button.addEventListener("click", add);
 
function add(event){
   event.preventDefault(); // otherwise the button will reset
   if(input.value){ // if you haven't written anything it will not print it
   todoDiv = document.createElement('div'); // this creates a div that is called todoDiv
   todoDiv.classList.add('todo'); // and you give that div this class
 
   todoLi = document.createElement('li'); // creates a list
   todoLi.classList.add('todo_item'); // gives it a class
   
   close = document.createElement('div');
   close.classList.add('delete_btn');

   done = document.createElement('div');
   done.classList.add('complete_btn');

   todoLi.appendChild(document.createTextNode(input.value)) // creates a text node with what you wrote in the box than appends it to the list
   todoDiv.appendChild(todoLi); // append the item to the div               
   list.appendChild(todoDiv); // append the div to the list
   todoDiv.appendChild(close);
   todoDiv.appendChild(done);
 
   document.getElementById("form").reset(); // after you add a task the text will disappear in the box
   }
}

   close.addEventListener("click", red);

function red(){
   console.log("hej");
}
 

