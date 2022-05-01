import FlexBox from "../FlexBox"
import ButtonGroupItem from "./ButtonGroupItem"

export default function ButtonGroup<T>({
    Labels,
    Selected,
    OnClick
} : ButtonGroupProps<T>) {
    return (
        <FlexBox ClassName="mt-4 w-full">
            {Labels.map((item, index) => 
                <ButtonGroupItem 
                    Label={item}
                    Active={item === Selected}
                    OnClick={OnClick}
                    key={`${item}${index}`}
                /> 
            )}
        </FlexBox>
    )
}

interface ButtonGroupProps<T> {
    Labels: T[];
    Selected: T;
    OnClick: (filter:T) => void;
}

