import { ToDoItem } from "./todoItems";

type itemCounts ={ 
  total: number,
  incomplete: number
}

export class ToDoCollection {
  private nextId: number = 1;
  private itemMap = new Map<number, ToDoItem>();

  constructor(public userName: string, public todoItems: ToDoItem[]=[]){

    todoItems.forEach(item => this.itemMap.set(item.id, item));

  };

  addToDo(task: string): number {
    while (this.getToDoById(this.nextId)){
      this.nextId++;
    }
    
    this.itemMap.set(this.nextId, new ToDoItem(this.nextId, task));
    return this.nextId;
  }
    

  getToDoById(id: number) {
     return this.itemMap.get(id);

  }

  getToDoItems(includeComplete: boolean): ToDoItem[]{
    return [...this.itemMap.values()]
    .filter(item => includeComplete || !item.complete);

  }

  markComplete(id: number, complete: boolean){
    const todoItem = this.getToDoById(id);
    if (todoItem){
      todoItem.complete = complete }
  }

  removeComplete(){
    this.itemMap.forEach(item =>{ 
      if (item.complete){
        this.itemMap.delete(item.id);
      }
    })
  }
  getItemCounts(): itemCounts{
    return { total: this.itemMap.size,
    incomplete: this.getToDoItems(false).length};
  }
}