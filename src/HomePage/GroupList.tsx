import { TodoGroup } from "../Model";
import GroupItem from "./GroupItem";

export default function GroupList({Groups} : Props) {
    return (
        <>
            {Groups.map(group => 
                <GroupItem 
                    group={group} 
                    key={group.id}
                />
            )}
        </>
    )
}

interface Props {
    Groups: TodoGroup[]
}