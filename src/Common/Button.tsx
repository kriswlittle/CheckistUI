import classNames from "classnames"

function Button({children, onClick, className} : ButtonProps) {
    let style = classNames("p-1 text-md transition", className)
    return (
        <button onClick={onClick} className={style}>
            {children}
        </button>
    )
}

function ButtonPrimary({children, onClick, className} : ButtonProps) {
    let style = classNames("border border-slate-500 bg-slate-500 rounded-md text-white hover:bg-slate-600 px-2", className)
    return (
        <Button onClick={onClick} className={style}>
            {children}
        </Button>
    )
}

function ButtonPrimarySecondary({children, onClick, className} : ButtonProps) {
    let style = classNames("border-slate-200 rounded-md hover:bg-slate-100 px-2 border text-slate-700 hover:text-slate-900", className)
    return (
        <Button onClick={onClick} className={style}>
            {children}
        </Button>
    )
}
interface ButtonProps {
    children?: any;
    onClick?: (event:any) => any;
    className?: string;
}

export {
    Button, ButtonPrimary, ButtonPrimarySecondary
}