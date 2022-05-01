import classNames from "classnames";
import React, { useState } from "react";
import { EnterKey } from "../Model";
import Span from "../Common/Span";

export default function DescriptionInput({Value, OnEditCallback, bold} : DescriptionInputProps) {
    const [editing, setEditing] = useState(false);
    const [editingValue, setEditingValue] = useState(Value);

    const descriptionStyle = classNames(
        "flex items-center rounded p-1 resize-none flex-grow bg-transparent", {
            "font-bold" : bold
        }
    );
    
    const toggleEditing = () => setEditing(editing => editing = !editing)

    const onDoubleClick = (event:any) => {
        event.stopPropagation();
        setEditing(editing => editing = !editing)
    }

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
        <Span ClassName={descriptionStyle} OnClickHandler={onDoubleClick} OnDoubleClickHandler={onDoubleClick}>{Value}</Span>
    )

    return (
        <input 
            value={editingValue} 
            className={descriptionStyle} 
            onClick={(event) => event.stopPropagation()} 
            onKeyDown={editKeydownHandler}
            onChange={editTextHandler}
            onBlur={editTextFocusLostHandler}
        />
    )
}

interface DescriptionInputProps {
    Value: string;
    OnEditCallback: (value:string) => void;
    bold?: boolean;
}