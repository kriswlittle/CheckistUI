import { useState } from "react";
import { EnterKey, GroupSection } from "../Model";
import FlexBox from "../Common/FlexBox";
import SectionSelect from "./SectionSelect";

export default function TodoForm({OnAddTodoCallback, sections, defaultOption, selectedSectionValue, onSectionSelectChange} : TodoFormProps) {
    const [todo, setTodo] = useState("");
    
    const newTodoChangeHandler = (event:any) => setTodo(event.target.value);

    const enterHandler = (event:any) => {
        if(event.key !== EnterKey) return;
        clickHandler()
    }

    const clickHandler = () => {
        if(!valid()) return;
        OnAddTodoCallback(todo);
        setTodo((todo: string) => todo = "");
    }

    const valid = () => {
        return todo !== ""
    }
  
    return (
        <FlexBox ClassName='rounded-md border mb-4'>
            <input 
                className='rounded-l-md flex-grow p-2 bg-gray-100 border-gray-100 border-2 text-gray-700' 
                value={todo} 
                onChange={newTodoChangeHandler} 
                onKeyDown={enterHandler} 
            />

            {sections.length > 0 &&
                <SectionSelect
                    sections={sections}
                    defaultOption={defaultOption}
                    value={selectedSectionValue}
                    onChange={onSectionSelectChange}
                />
            }
            
            <button 
                className='rounded-r-md bg-gray-200 w-16 text-gray-500'
                onClick={clickHandler}
            >
                Add
            </button>
        </FlexBox>
    )
}
  
interface TodoFormProps {
    OnAddTodoCallback: (todo:string) => void;
    onSectionSelectChange: (id:number) => void;
    sections: GroupSection[]
    selectedSectionValue: number;
    defaultOption:string;
}