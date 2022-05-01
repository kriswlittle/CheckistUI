import classNames from "classnames";
import { Todo } from "../Model";
import { TrashIcon } from "@heroicons/react/outline";
import DescriptionInput from "./DescriptionInput";
import FlexBox from "../Common/FlexBox";

export default function TodoItem({Todo, OnCompleteTodoCallback, OnDeleteTodoCallback, OnEditDescriptionCallback}: TodoProps) {
    const { id, description, complete } = Todo

    const style = classNames(
        "group flex items-center gap-4 text-left p-1 transition justify-between border-b hover:bg-gray-50 text-sm", {
            "text-slate-500": complete,
            "text" : !complete
        }
    )

    const checkboxStyle = classNames(
        "border-slate-400 rounded-full mr-2 bg-white border-2 hover:border-blue-500 cursor-pointer", {
            "checked:bg-blue-500 checked:border-blue-500 text-blue-500" : complete
        }
    )

    const deleteHandler = (event:any) => {
        event.stopPropagation()
        OnDeleteTodoCallback(Todo.id)
    }
                            
    const checkHandler = (event:any) => {
        event.stopPropagation()
        OnCompleteTodoCallback(Todo.id)
    }

    return (
        <div className={style}>
            <FlexBox  ItemsCenter FlexGrow>
                <input type="checkbox" checked={complete} className={checkboxStyle} onChange={checkHandler} />

                <DescriptionInput
                    Value={description}
                    OnEditCallback={(value) => OnEditDescriptionCallback(id, value)}
                />
            </FlexBox>
            
            <FlexBox ItemsCenter ClassName="hidden group-hover:flex transition">
                <TrashIcon 
                    width={16} 
                    height={16} 
                    className="text-gray-300 cursor-pointer transition hover:text-red-500" 
                    onClick={deleteHandler}
                />
            </FlexBox>    
        </div>
    )
}

interface TodoProps {
    Todo: Todo;
    OnCompleteTodoCallback: (id:number) => void;
    OnDeleteTodoCallback: (id:number) => void;
    OnEditDescriptionCallback: (id:number, description:string) => void;
}