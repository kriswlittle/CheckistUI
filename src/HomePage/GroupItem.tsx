import { useNavigate } from "react-router-dom"
import { TodoGroup } from "../Model"
import useGroups from "../Hooks/UseGroups";
import FlexBox from "../Common/FlexBox";
import { TrashIcon } from "@heroicons/react/outline";

export default function GroupItem({group} : Props) {
    const { completedString, hasTodos, deleteGroup } = useGroups(group.id);
    let navigate = useNavigate()
    let {title, description, id} = group

    const clickTrashHandler = (event:any) => {
        event.stopPropagation();
        deleteGroup(id);
    }

    return (
        <div 
            className='flex-grow basis-0 p-4 rounded-lg transition cursor-pointer text-left bg-gray-100 hover:bg-gray-200'
            onClick={() => {navigate(`/todo/${id}`)}}
        >
            <FlexBox JustifyBetween>
                <h1 className="text-blue-600">{title}</h1>
                <FlexBox>
                    <TrashIcon 
                        width={16} 
                        height={16} 
                        className="text-slate-700 hover:text-blue-500 cursor-pointer transition"
                        onClick={clickTrashHandler}
                    />
                </FlexBox>
            </FlexBox>
            <p className='text-gray-700'>{description}</p>
            {hasTodos(group) && <p className='text-gray-500'>{completedString}</p>}
        </div>
    )
}

interface Props {
    group: TodoGroup;
}