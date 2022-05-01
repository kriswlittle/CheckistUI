import { Todo } from "../Model";
import TodoItem from "./TodoItem";

export default function TodoList({Todos, OnCompleteTodoCallback, OnDeleteTodoCallback, OnEditDescriptionCallback}:TodoListProps) {
    return (
        <div>
            {Todos.map(todo =>
                <TodoItem 
                    key={todo.id}
                    Todo={todo}   
                    OnCompleteTodoCallback={OnCompleteTodoCallback}                 
                    OnDeleteTodoCallback={OnDeleteTodoCallback}
                    OnEditDescriptionCallback={OnEditDescriptionCallback}
                />
            )}
        </div>
    )
}

interface TodoListProps {
    Todos: Todo[];
    OnCompleteTodoCallback: (id:number) => void;
    OnDeleteTodoCallback: (id:number) => void;
    OnEditDescriptionCallback: (id:number, description:string) => void;
}