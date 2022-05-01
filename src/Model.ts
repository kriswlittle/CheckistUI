export interface Todo extends IDate {
  id: number;
  complete: boolean;
  description: string;
  priority: Priority;
  sectionID?:number;
  groupID?:number;
}

export interface TodoList {
  id: number;
  todos: Todo[]
}
  
export enum Priority {
  Low = 1,
  Medium,
  Urgent
}

export enum TodoFilter {
  All = "All",
  Completed = "Completed",
  Todo = "Todo"
}

export interface TodoGroup extends IDate, IDescription {
  id:number;
  todos: Todo[]
  complete: boolean;
  archived: boolean;
  starred?: boolean;
  sections: GroupSection[]
  color: ColourType
}

type ColourType = "sky" | "emerald" | "amber" | "orange" | "red"



export const ColorList:Colour[] = [
  {name: "sky", text: "text-sky-900", bg: "bg-sky-500"},
  {name: "emerald", text: "text-emerald-900", bg: "bg-emerald-500"},
  {name: "amber", text: "text-amber-900", bg: "bg-amber-500"},
  {name: "orange", text: "text-orange-900", bg: "bg-orange-500"},
  {name: "red", text: "text-red-900", bg: "bg-red-400"}
]


export interface Colour {
  name: ColourType;
  text: string;
  bg: string;
}

export interface GroupSection extends IDescription, IDate {
  id: number;
  groupID: number;
  todos: Todo[];
  complete: boolean;
  archived: boolean;
  expanded: boolean;
}

export interface IDate {
  dateCompleted?: Date;
  dateCreated: Date;
}

export interface IDescription {
  title: string;
  description: string;
}

export const EnterKey = "Enter";