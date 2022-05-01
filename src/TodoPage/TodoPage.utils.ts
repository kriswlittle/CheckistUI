import { Todo } from "../Model";

function deleteTodos(id:number, todos:Todo[]) : Todo[] {
    return todos.filter(item => { return item.id !== id})
  }
  
  function completeTodo(id:number, todos:Todo[]) : Todo[] {
    return todos.map(item => {
      if(item.id === id) {
        item.complete = !item.complete;
        item.dateCompleted = item.complete ? new Date() : undefined;
      }
  
      return item;
    }); 
  }
  
  function editTodoDescription(id:number, description:string, todos:Todo[]) : Todo[] {
    return todos.map(item => {
      if(item.id === id) item.description = description
      return item
    }); 
  }


  export {
    deleteTodos,
    completeTodo,
    editTodoDescription
  }