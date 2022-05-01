import { useEffect, useRef, useState } from "react";
import { ButtonPrimary, ButtonPrimarySecondary } from "../Common/Button";

export default function NewSectionForm({onAddClickedHandler} : Props) {
    const [sectionName, setSectionName] = useState("")
    const [editing, setEditing] = useState(false)
    
    const sectionNameUpdatedHandler = (event:any) => setSectionName(event.target.value)
    const toggleEditing = () => setEditing(!editing)
    const addClickHandler = () => {
        onAddClickedHandler(sectionName)
        toggleEditing()
    }

    useEffect(() => {
        setSectionName("")
    }, [editing])

    if(editing)
        return (
            <div className="w-full mt-4 border p-2 rounded-md border-slate-400">
                <input 
                    className="flex-grow border w-full p-1 rounded-md"
                    value={sectionName} 
                    onChange={sectionNameUpdatedHandler}
                    autoFocus
                />

                <div className="w-full text-left mt-2">
                    <ButtonPrimary className="mr-2" onClick={addClickHandler}>Add</ButtonPrimary> 
                    <ButtonPrimarySecondary onClick={toggleEditing}>Cancel</ButtonPrimarySecondary>
                </div>
            </div>
        )

    return (
        <div className="bg-transparent text-gray-300 hover:text-black mt-4 cursor-pointer transition hover:bg-gray-100 py-2" onClick={toggleEditing}>
          Add Section
        </div>
    )
}

interface Props {
    onAddClickedHandler: (sectionName:string) => void;
}