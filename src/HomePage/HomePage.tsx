import { H1 } from "../Common/Headers/Headers";
import GroupList from "./GroupList";
import NewGroup from "./NewGroup";
import Container from "../Common/Container";
import useGroups from "../Hooks/UseGroups";

export default function HomePage() {
    const {groups, addEmptyGroup} = useGroups(0)

    return (
        <Container>
            <H1>Todo Groups</H1>
            <div className='grid gap-2 mt-4 grid-cols-2 md:grid-cols-4 container p-4'>
                <NewGroup 
                    ClickHandler={addEmptyGroup} 
                />

                <GroupList 
                    Groups={groups}
                />
            </div>
        </Container>
    )
}