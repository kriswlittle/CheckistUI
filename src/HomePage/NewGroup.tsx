import { PlusIcon } from "@heroicons/react/outline";
import FlexBox from "../Common/FlexBox";

export default function NewGroup({ClickHandler} : Props) {
    return (
        <div className='p-4 border-2 flex-grow basis-0 border-gray-200 rounded-lg text-blue-600 border-dashed transition hover:bg-gray-300 cursor-pointer hover:border-solid hover:border-gray-300 text-left'
            onClick={ClickHandler}
        >
            <FlexBox ItemsCenter>
                <PlusIcon height={16} width={16} className='mr-2'/>
                <h1>New Todo Group</h1>
            </FlexBox>
            <p className='text-gray-700'>Create a new Todo Group</p>
        </div>
    )
}

interface Props {
    ClickHandler: () => void;
}