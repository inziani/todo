import { ToDoItem } from "./todoItems";
import { ToDoCollection } from "./todoCollection";
import * as inquirer from 'inquirer';

let todos: ToDoItem[]= [
  new ToDoItem(1, 'Buy Flowers'),
  new ToDoItem(2, 'Get Shoes'),
  new ToDoItem(3, 'Collect Tickets'),
  new ToDoItem(4, 'Call Joe', true)
];
let collection: ToDoCollection = new ToDoCollection('Val', todos);
let showCompleted = true;

function displayToDoList(): void{
  console.log(`${collection.userName}'s to do list` + (`${collection.getItemCounts().incomplete} items to do`));
  collection.getToDoItems(showCompleted).forEach(item => item.printDetails());
}
enum Commands{
  Quit = 'Quit',
  Add = 'Add New Task',
  Toggle = 'Show/hide Completed'
}

function promptAdd(): void{
  console.clear();
  inquirer.prompt({
    type: 'input',
  name: 'add', 
  message: 'Enter Task:'}).then (answers => {if (answers['add'] !== ''){
    collection.addToDo(answers['add']);
  }
promptUser()})
}

function promptUser(): void{
  console.clear();
  displayToDoList();
  inquirer.prompt({
    type: 'list', 
    name: 'command', 
    message: 'Choose option',
    choices: Object.values(Commands),
}).then(answers => {
  switch (answers['command']){
    case Commands.Toggle:
      showCompleted = !showCompleted;
    promptUser();
    break;
  case Commands.Add:
    promptAdd();
    break;

  }
})
}

promptUser();



console.clear()
console.log(`${collection.userName}'s Todo list` + `(${ collection.getItemCounts().incomplete } items to do)`);

collection.removeComplete();
collection.getToDoItems(true).forEach(item =>item.printDetails());



let newId = collection.addToDo('Go buy birthday cake');
let todoItem = collection.getToDoById(newId); 
console.log(JSON.stringify(todoItem));



