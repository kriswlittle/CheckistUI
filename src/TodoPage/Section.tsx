import { ChevronDownIcon, ChevronUpIcon, TrashIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import FlexBox from "../Common/FlexBox";
import { getNextID } from "../Helpers/Helper";
import { Todo, Priority, GroupSection } from "../Model";
import DescriptionInput from "./DescriptionInput";
import { deleteTodos, completeTodo, editTodoDescription } from "./TodoPage.utils";
import TodoList from "./TodoList";

export function Section({section, sectionUpdatedHandler, deleteSectionHandler} : SectionProps) {
    let { todos } = section
  
    const deleteTodoHandler = (id:number) => {
      let newTodos = deleteTodos(id, todos)
      sectionUpdatedHandler({...section, todos: newTodos})
    }
  
    const completeTodoHandler = (id:number) => {
      let newTodos = completeTodo(id, todos)
      sectionUpdatedHandler({...section, todos: newTodos})
    }
  
    const descriptionTodoHandler = (id:number, description:string) => {
      let newTodos = editTodoDescription(id, description, todos)
      sectionUpdatedHandler({...section, todos: newTodos})
    }

    const sectionTitleHandler = (value:string) =>  {
        let newSection = {...section, title: value}
        sectionUpdatedHandler(newSection)
    }

    const deleteSection = () => deleteSectionHandler(section.id)

    const toggleExpanded = () => {
      let newSection = {...section, expanded: !section.expanded}
      sectionUpdatedHandler(newSection)
    }

    let todoListClass = classNames("overflow-hidden transition-all", {
      "h-full opacity-100" : section.expanded,
      "h-0 opacity-0" : !section.expanded
    })
  
    return (
      <>
        <FlexBox ClassName="text-left mt-4 transition hover:bg-gray-50 group" ItemsCenter>
          <SectionControls section={section} toggleExpand={toggleExpanded}/>
          <DescriptionInput 
            Value={section.title}
            OnEditCallback={sectionTitleHandler}
            bold
          />

          <TrashIcon 
            width={16} 
            height={16} 
            className="text-gray-300 cursor-pointer transition hover:text-red-500 mr-1 hidden group-hover:block" 
            onClick={deleteSection}
          />
        </FlexBox>
  
          <div className={todoListClass}>
            <TodoList 
                Todos={todos} 
                OnCompleteTodoCallback={completeTodoHandler}
                OnDeleteTodoCallback={deleteTodoHandler}
                OnEditDescriptionCallback={descriptionTodoHandler}
            />
          </div>
      </>
    )
  }
  
  interface SectionProps {
    sectionUpdatedHandler: (section:GroupSection) => void;
    section: GroupSection;
    deleteSectionHandler: (id:number) => void
  }

  function SectionControls({toggleExpand, section} : SectionControlProps) {
    let showExpand = section.todos.length > 0
    let style = classNames(
      "ml-1 text-slate-300 hover:text-slate-700 hover:bg-gray-200 cursor-pointer transition rounded-sm", {
        "opacity-0" : !showExpand,
        "rotate-0" : !section.expanded,
        "rotate-180" : section.expanded
      }
    )
    return (
      <FlexBox ClassName="mr-1 group">
        <ChevronUpIcon width={14} className={style} onClick={toggleExpand}/>
      </FlexBox>
    )
  }

  interface SectionControlProps {
    toggleExpand: (event:any) => void
    section: GroupSection
  }