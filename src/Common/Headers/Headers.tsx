function H1({children, ClassName } : Props) {
    return (
        <h1 className={`p-t-4 text-3xl text-blue-600${ClassName ? " " + ClassName : ""}`}
        >{children}</h1>
    )
}

interface Props {
    children?:any;
    ClassName?:string;
}

export {
    H1
}