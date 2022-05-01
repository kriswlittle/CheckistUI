import classNames from "classnames";

export default function FlexBox({
    ItemsCenter,
    FlexGrow,
    JustifyBetween,
    JustifyAround,
    ClassName,
    children
} : FlexBoxProps) {
    let style = classNames(
        "flex", {
            "flex-grow": FlexGrow,
            "items-center": ItemsCenter,
            "justify-around" : JustifyAround,
            "justify-between" : JustifyBetween
        }
    )

    let joinedStyle = ClassName 
        ? ClassName + " " + style
        : style;

    return (
        <div className={joinedStyle}>
            {children}
        </div>
    )
}

interface FlexBoxProps {
    ItemsCenter?:boolean;
    JustifyBetween?:boolean;
    JustifyAround?:boolean;
    FlexGrow?:boolean;
    ClassName?:string;
    children:any;
}