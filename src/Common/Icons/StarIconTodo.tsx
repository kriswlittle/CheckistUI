import { StarIcon } from "@heroicons/react/solid"
export function StarIconTodo({width, height, className, onClick} : StarIconProps) {
    return (
        <StarIcon width={width ?? 24} height={height ?? 24} className={className} onClick={onClick} />
    )
}

export function NavStarIcon({className, onClick} : NavStarIconProps) {
    return (
        <StarIconTodo width={12} height={12} onClick={onClick} className={className}/>
    )
        
}

interface StarIconProps {
    width?: number;
    height?: number;
    className?: string;
    onClick: (event:any) => void;
}

interface NavStarIconProps {
    className?:string;
    onClick: (event:any) => void;
}