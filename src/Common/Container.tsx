export default function Container({children} : Props) {
    return (
        <div className="mx-auto text-center p-4 container w-2/3">
            {children}
        </div>
    )
}

interface Props {
    children?: any;
}