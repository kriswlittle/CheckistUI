import classNames from "classnames"

export default function ButtonGroupItem<T>({
    Label,
    Active,
    OnClick
} : ButtonGroupItem<T>) {
    let style = classNames(
        "border-slate-800 p-2 border-y-2 first:rounded-l-lg first:border-2 last:rounded-r-lg last:border-2 flex-grow basis-0 transition", {
            "bg-slate-800": Active
        }
    )
    return (
        <button 
            className={style} 
            onClick={() => OnClick(Label)}>
            {Label}
        </button>
    )
}

interface ButtonGroupItem<T> {
    Label:T;
    Active:boolean;
    OnClick: (filter:T) => void;
}