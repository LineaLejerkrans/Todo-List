let button = document.querySelector('.todo_button');
let input = document.querySelector('.todo_input');
let list = document.querySelector('.todo_list');

 
let todoDiv;
let todoLi;
let close;
let done;
let n = 0;
 
button.addEventListener("click", add);
 
function add(event){
    event.preventDefault(); // otherwise the button will reset
    if(input.value){ // if you haven't written anything it will not print it
        todoDiv = document.createElement('div'); // this creates a div that is called todoDiv
        todoDiv.classList.add('todo'); // and you give that div this class
        todoDiv.setAttribute("completed", "false"); // sätt ett värde som säger om upgiften är klar eller inte 
        todoDiv.id = ++n; // sätter ett id på varje uppgift 
        console.log(todoDiv.id)
        
        todoLi = document.createElement('li'); // creates a list
        todoLi.classList.add('todo_item'); // gives it a class

        todoLi.appendChild(document.createTextNode(input.value)) // creates a text node with what you wrote in the box than appends it to the list
        todoDiv.appendChild(todoLi); // append the item to the div               
        list.appendChild(todoDiv); // append the div to the list
        
        
        document.getElementById("form").reset(); // after you add a task the text will disappear in the box
            
        close = document.createElement('button');
        close.classList.add('delete_btn');
        close.addEventListener("click", delElem); // kan inte skicka med id:et
  

        done = document.createElement('button');
        done.classList.add('complete_btn'); 
        done.addEventListener("click", comElem); // kan inte skicka med id:et
        
        todoDiv.appendChild(close);
        todoDiv.appendChild(done);

    }
}

function delElem(event){ // event.target tillhör kanppen man tryckte på 
    event.preventDefault(); // otherwise the button will reset
    let elem = document.getElementById(event.target.parentNode.id); // hitta id:et på förälden till kanppen som är diven som skas ta bort 
    elem.parentNode.removeChild(elem); // tar bort diven från föräldern, barnet säger till föräldern att ta bort sig själv 
    
}

function comElem(event){
    event.preventDefault(); // otherwise the button will reset
    let elem = document.getElementById(event.target.parentNode.id); // hitta id:et på förälden till kanppen som är diven som skas ta bort 
    console.log(elem.getAttribute("completed"))
    if(elem.getAttribute("completed") == "true"){ // om uppgiften är avklarad ska den bli oklarad ifall man trycker på klar knappen igen
        elem.setAttribute("completed", "false");
        elem.classList.remove('completedItem'); // tar bort css:en för det avklarde uppgifterna
    }
    else{
        elem.setAttribute("completed", "true"); // är den inte klarad men blir det ska den sättas till klar 
        elem.classList.add('completedItem'); // och få css:en för en klar uppgift 
    }
    

}