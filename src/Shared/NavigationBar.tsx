import { PlusSmIcon, ViewListIcon } from "@heroicons/react/outline"
import classNames from "classnames"
import { useNavigate } from "react-router-dom"
import FlexBox from "../Common/FlexBox"
import { NavStarIcon } from "../Common/Icons/StarIconTodo"
import useGroups from "../Hooks/UseGroups"
import { ColorList, Colour, TodoGroup } from "../Model"

export default function NavigationBar() {
    const { groups, starGroupToggle } = useGroups(0)
    const favourites = groups.filter(item => item.starred)
    return (
        <div className='hidden sm:block w-64 bg-gray-100'>
            <div className='text-center p-4 font-bold bg-blue-500 text-white'>
                Checkist
            </div>

            <div className="px-4">
                {favourites.length > 0 && 
                    <div className="py-4">
                        <h1 className="mb-1 px-1">Favourites</h1>
                        {favourites.map(item => 
                            <NavLinkTodoGroup Group={item} onClick={starGroupToggle} />
                        )}
                    </div>
                }

                <div className="py-4">
                    
                    <FlexBox ItemsCenter JustifyBetween>
                        <h1 className="mb-1">Groups</h1>
                        <PlusSmIcon width={16} className="rounded-full text-gray-400"/>
                    </FlexBox>
                    {groups.sort((x, y) => {return (x.starred === y.starred) ? 0 : x.starred ? -1 : 1}).map(item => 
                        <NavLinkTodoGroup Group={item} onClick={starGroupToggle} />
                    )}
                </div>
            </div>
        </div>
    )
}

function NavLink({Label, To, children, Colour} : NavLinkProps) {
    let navigate = useNavigate()
    let viewListStyle = classNames("mr-2 text-white bg-blue-500 rounded-full p-1", Colour.bg)
    return (
        <div className="text-sm text-black hover:bg-gray-300 transition p-1 rounded-md flex items-center group justify-between cursor-pointer" onClick={() => navigate(To)}>
            <FlexBox ItemsCenter>
                <ViewListIcon width={18} className={viewListStyle}/>
                {Label}
            </FlexBox>
            {children}
        </div>
    )
}

function NavLinkTodoGroup({Group, onClick} : NavLinkTodoGroupProps) {
    let { title, id, starred } = Group
    const { getGroupColour } = useGroups(Group.id)
    let col = getGroupColour(Group)
    let starIconStyle = classNames ("block", {
        "text-slate-600 group-hover:text-blue-500 block" : starred,
        "text-white hidden group-hover:block" : !starred
    })

    const clickHandler = (event:any) => {
        event.stopPropagation();
        onClick(id);
    }

    return (
        <NavLink Label={title} To={`/todo/${id}`} Colour={col}>
            <NavStarIcon className={starIconStyle} onClick={clickHandler}/>
        </NavLink>
    )
}

interface NavLinkTodoGroupProps {
    Group:TodoGroup;
    onClick: (id:number) => void;
}

interface NavLinkProps {
    Label:string;
    children?:any;
    To:string;
    Colour: Colour
}