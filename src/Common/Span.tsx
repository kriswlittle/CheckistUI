export default function Span({children, ClassName, OnClickHandler, OnDoubleClickHandler} : SpanProps) {
    return (
        <span className={ClassName ? ClassName : ""} onClick={OnClickHandler} onDoubleClick={OnDoubleClickHandler}>
            {children}
        </span>
    )
}

interface SpanProps {
    children?: any;
    ClassName?: string;
    OnClickHandler?: (event:any) => void;
    OnDoubleClickHandler?: (event:any) => void;
}