let button = document.querySelector('.todo_button');
let input = document.querySelector('.todo_input');
let list = document.querySelector('.todo_list');
let select = document.querySelector('.select');

let todoMap = new Map(); // man får par där man har ett key och ett value 

let todoDiv;
let todoLi;
let close;
let done;
let n = 0;


button.addEventListener("click", add);

document.addEventListener('DOMContentLoaded', start); // startar när sidan öppnas


function start(event) {
    event.preventDefault(); // otherwise the button will reset

    todoMap = new Map(JSON.parse(localStorage.getItem("lista"))); // hämtar listan från minet och sparar den i en ny map 

    todoMap.forEach((value, key) => { createTodoDiv(key, value) }) // loopar mappen, så får varje key anropas functionen createTodoDiv

    n = todoMap.size; // n får värdet av så stor mappen är, så den inte skriver över andra värden när man refreshar

}

function createTodoDiv(id, object) {

    todoDiv = document.createElement('div'); // this creates a div that is called todoDiv

    todoDiv.classList.add('todo'); // and you give that div this class
    todoDiv.setAttribute("completed", object.status); // sätt ett värde som säger om upgiften är klar eller inte 
    todoDiv.id = id; // sätter ett id på varje uppgift 


    todoLi = document.createElement('li'); // creates a list


    todoLi.appendChild(document.createTextNode(object.value)) // creates a text node with what you wrote in the box than appends it to the list
    todoLi.classList.add('todo_item'); // gives it a class
    todoDiv.appendChild(todoLi); // append the item to the div 

    if (object.status == "true") { // om statusen är sann betyder det att uppgiften är avklarad vilket betyder att den ska få klassen av de avklarade
        todoDiv.classList.add('completedItem');
    }
    list.appendChild(todoDiv); // append the div to the list


    close = document.createElement('button');
    close.classList.add('delete_btn');
    close.addEventListener("click", delElem); // kan inte skicka med id:et


    done = document.createElement('button');
    done.classList.add('complete_btn');
    done.addEventListener("click", comElem); // kan inte skicka med id:et

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

        createTodoDiv(++n, obj); // anropar funktionen med id och objektet

        todoMap.set(n, obj); // key = n, value = obj, set betyder att man lägger in det i mappen

        localStorage.setItem("lista", JSON.stringify(Array.from(todoMap.entries()))); // sparar listan men man måste först konvertera mappen till ett fält och sedan göra den till en json
        document.getElementById("form").reset(); // after you add a task the text will disappear in the box

    }
}

function delElem(event) { // event.target tillhör kanppen man tryckte på 
    event.preventDefault(); // otherwise the button will reset
    let id = parseInt(event.target.parentNode.id); // värdet man får från eventet är en string så du behöver göra om den till ett heltal
    let elem = document.getElementById(id); // hitta id:et på förälden till kanppen som är diven som skas ta bort 
    elem.parentNode.removeChild(elem); // tar bort diven från föräldern, barnet säger till föräldern att ta bort sig själv 

    todoMap.delete(id); // du raderar den platsen som har det idtet
    localStorage.setItem("lista", JSON.stringify(Array.from(todoMap.entries()))); // sparar den nya mappen
}

function comElem(event) {

    event.preventDefault(); // otherwise the button will reset
    let id = parseInt(event.target.parentNode.id);
    let elem = document.getElementById(id); // hitta id:et på förälden till kanppen som är diven som skas ta bort 
    let newStatus = "true";
    if (elem.getAttribute("completed") == "true") { // om uppgiften är avklarad ska den bli oklarad ifall man trycker på klar knappen igen
        newStatus = "false";
    }

    //let object = todoMap.get(id);
    todoMap.get(id).status = newStatus; // hämntrar paret som har det idet som key, då får du ett objekt och sedan ändrar du dess status
    //object.status = newStatus;

    localStorage.setItem("lista", JSON.stringify(Array.from(todoMap.entries()))); 

    elem.setAttribute("completed", newStatus); // inte för minnet utan för de som syns på skärmen
    if (newStatus == "false") { // om uppgiften är avklarad ska den bli oklarad ifall man trycker på klar knappen igen
        elem.classList.remove('completedItem'); // tar bort css:en för det avklarde uppgifterna
    }
    else {
        elem.classList.add('completedItem'); // och få css:en för en klar uppgift 
    }
}


// spara som ett objkt med ett värde och status 
// spara i storageet 
// hämta den sen och skapa om elemeneten ge de värdena av objekten