/*=== Select ==========================*/
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

/*======= Events ======================*/
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener('click', deletecheck);
filterOption.addEventListener('click', filterTodo);



/*======= Functions =======================================*/

function addTodo (event){
    event.preventDefault();
// create 'div'
    if(!todoInput.value==""){
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");
        // create 'li'
        const newTodo = document.createElement("li");
        newTodo.innerText=todoInput.value;
        newTodo.classList.add("todo-item")
        todoDiv.appendChild(newTodo);
        // SAVE TO LOCAL STORAGE
        saveLocalTodos(todoInput.value);

        // create button checked
        const completedButton= document.createElement('button');
        completedButton.innerHTML=('<i class="fas fa-check"></i>');
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);

        // create button checked
        const trashButton= document.createElement('button');
        trashButton.innerHTML=('<i class="fas fa-trash"></i>');
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);

        // append to tha main HTML 
        todoList.appendChild(todoDiv);


    }
        
 
    
  // clear input field
  todoInput.value=""
}

function deletecheck(e){
 const item = e.target;
 //delete todo
 if(item.classList[0] === 'trash-btn'){

     const todo = item.parentElement;
     todo.classList.add("fall");
     removeLocalTodos(todo);
     todo.addEventListener("transitionend", function() {
        todo.remove()
     });
    
 }
 // check todo
 if(item.classList[0] === 'complete-btn'){
     const todo= item.parentElement;
     todo.classList.toggle('completed');
 }

}

function filterTodo (e) {
    const todos= todoList.childNodes;
    todos.forEach(todo=>{
        switch(e.target.value){
            case "all":
                todo.style.display="flex";
                break;

            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display="flex";
                }else{
                    todo.style.display= "none";   
                }
                break;

            case  "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display="flex";
                }else{
                    todo.style.display= "none";   
                }
                break;
        }
    })
}

//Storage
function checkPresence(todo){
    let todos;
    if(localStorage.getItem("todos")=== null){
        todos=[];
    }
    else{
        todos= JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos))
}

function saveLocalTodos(todo){

    let todos;
    if(localStorage.getItem("todos")=== null){
        todos=[];
    }
    else{
        todos= JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos))

}

function getTodos(){
    let todos;
    if(localStorage.getItem("todos")=== null){
        todos=[];
    }
    else{
        todos= JSON.parse(localStorage.getItem("todos"));
    }
   
   todos.forEach(function(todo){

//-----------------------------
    // create 'div'
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");
        // create 'li'
        const newTodo = document.createElement("li");
        newTodo.innerText=todo;
        newTodo.classList.add("todo-item")
        todoDiv.appendChild(newTodo);
    

        // create button checked
        const completedButton= document.createElement('button');
        completedButton.innerHTML=('<i class="fas fa-check"></i>');
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);

        // create button checked
        const trashButton= document.createElement('button');
        trashButton.innerHTML=('<i class="fas fa-trash"></i>');
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);

        // append to tha main HTML 
        todoList.appendChild(todoDiv);
//--------------
 
   });
}

function removeLocalTodos(todo){
    //checkinggggggggggggggggggggg
    let todos;
    if(localStorage.getItem("todos")=== null){
        todos=[];
    }
    else{
        todos= JSON.parse(localStorage.getItem("todos"));
    }
    const  todoElement= todo.children[0].value;
    todos.splice(todos.indexOf(todoElement, 1));
    localStorage.setItem("todos", JSON.stringify(todos));
}