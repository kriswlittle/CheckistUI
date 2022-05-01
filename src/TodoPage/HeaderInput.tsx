import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { EnterKey } from "../Model";
import { H1 } from "../Common/Headers/Headers";

export default function HeaderInput({Value, OnEditCallback} : HeaderInputProps) {
    const [editing, setEditing] = useState(true);
    const [editingValue, setEditingValue] = useState(Value);

    const descriptionStyle = classNames(
        "flex items-center rounded p-1 resize-none text-white flex-grow w-full text-center text-3xl text-blue-600"
    );

    useEffect(() => {
        setEditingValue(Value)
    }, [Value])    
    
    const toggleEditing = () => setEditing(editing => editing = !editing)

    const editTextHandler = (event:any) => 
        setEditingValue(editingValue => editingValue = event.target.value)

    const editTextFocusLostHandler = () => {
        OnEditCallback(editingValue)
        toggleEditing()
    }

    const editKeydownHandler = (event:React.KeyboardEvent) => {
        if(event.key !== EnterKey) return
        OnEditCallback(editingValue)
        toggleEditing()
    }
    
    if(!editing) return (
        <H1>{Value}</H1>
    )

    return (
        <div>
            <input 
                value={editingValue} 
                className={descriptionStyle} 
                onClick={(event) => event.stopPropagation()} 
                onKeyDown={editKeydownHandler}
                onChange={editTextHandler}
                onBlur={editTextFocusLostHandler}
            />
        </div>
    )
}

interface HeaderInputProps {
    Value: string;
    OnEditCallback: (value:string) => void;
}