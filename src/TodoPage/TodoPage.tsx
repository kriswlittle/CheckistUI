import { useEffect, useState } from "react"
import { Todo, TodoFilter, Priority, GroupSection } from "../Model"
import TodoForm from "./TodoForm"
import TodoList from "./TodoList"
import { useNavigate, useParams } from "react-router-dom"
import FlexBox from "../Common/FlexBox"
import { ArrowLeftIcon, CogIcon, DotsVerticalIcon, PlusIcon } from "@heroicons/react/outline"
import Container from "../Common/Container"
import useGroups from "../Hooks/UseGroups"
import HeaderInput from "./HeaderInput"
import { completeTodo, deleteTodos, editTodoDescription } from "./TodoPage.utils"
import { SectionList } from "./SectionList"
import { getNextID } from "../Helpers/Helper"
import NewSectionForm from "./NewSectionForm"

export default function TodoPage() {
    const params = useParams();
    const { group, todos, updateGroups, completeAndIncompleteTodoTotals } = useGroups(parseInt(params.groupID!));
    const [filteredTodos, setFilteredTodos] = useState<Todo[]>([])
    const [filter, setFilter] = useState(TodoFilter.All)
    const [editingTitle, setEditingTitle] = useState(false)
    const [selectedSectionID, setSelectedSectionID] = useState<number>(-1)
    
    const navigation = useNavigate();

    const addNewTodo = (description:string) => {
      let todo:Todo = {id: getNextID(group.todos), groupID: group.id, description: description, complete: false, priority: Priority.Low, dateCreated: new Date()};
      console.log(typeof selectedSectionID)
      if(selectedSectionID !== -1) {
        todo.sectionID = selectedSectionID
        let newSections = group.sections.map(item => {
          if(item.id === selectedSectionID) {
            todo.id = getNextID(item.todos)
            item.todos.push(todo)
          }

          return item
        })

        sectionsUpdatedHandler(newSections)
      } else {
        group.todos.push(todo)
        updateGroups(group)
      }
    }

    const addNewSection = (sectionName:string) => {
      let section:GroupSection = {id: getNextID(group.sections), groupID: group.id, description: "", title: sectionName, dateCreated: new Date(), complete: false, archived: false, todos: [], expanded: true}
      group.sections.push(section)
      updateGroups(group)
    }
  
    const completeTodoHandler = (id:number) => {
      let newTodos = completeTodo(id, todos)
      updateGroups({...group, todos: newTodos})
    }
  
    const deleteTodoHandler = (id:number) => {
      let newTodos = deleteTodos(id, todos)
      updateGroups({...group, todos: newTodos})
    }

    const descriptionTodoHandler = (id:number, description:string) => {
      let newTodos = editTodoDescription(id, description, todos)
      updateGroups({...group, todos: newTodos})
    }

    const groupEditHandler = (value:string) => {
      let theGroup = group
      theGroup.title = value
      updateGroups(group)
    }
  
    const numCompleted = () => {
      let { completeCount, totalCount } = completeAndIncompleteTodoTotals()
      
      return totalCount > 0 ? `${completeCount}/${totalCount} completed` : ""
    }
  
    const sectionsUpdatedHandler = (sections:GroupSection[]) => updateGroups({...group, sections : sections})

    useEffect(() => {
      if(todos === null) return

      let todoList = todos;
      if(filter === TodoFilter.Completed)
        todoList = todos.filter(todo => todo.complete)
  
      if(filter === TodoFilter.Todo)
        todoList = todos.filter(todo => !todo.complete)
      
      todoList = todoList.sort((x, y) => {return (x.complete === y.complete) ? 0 : x.complete ? 1 : -1})
      setFilteredTodos(todoList)
    }, [filter, todos])

    return (
      <FlexBox>
        <Container>
          <FlexBox ItemsCenter>
            <div className="w-1/6">
              <ArrowLeftIcon 
                width={32} 
                height={32} 
                className="rounded-full bg-gray-300 p-2 text-white cursor-pointer transition hover:bg-blue-600"
                onClick={() => {navigation("/")}}  
              />
            </div>
            
              <div className="flex-grow" onDoubleClick={() => setEditingTitle(!editingTitle)}>
                <HeaderInput
                  Value={group.title}
                  OnEditCallback={(value) => groupEditHandler(value)}
                />
              </div>
            <div className="w-1/6">
              <CogIcon 
                width={32} 
                height={32} 
                className="rounded-full bg-gray-300 p-2 text-white cursor-pointer transition hover:bg-blue-600 float-right"
                onClick={() => {navigation("/")}}  
              />
            </div>
          </FlexBox>
          <p className='mb-4 text-slate-400'>{numCompleted()}</p>

          <TodoForm
            OnAddTodoCallback={addNewTodo}
            selectedSectionValue={selectedSectionID}
            onSectionSelectChange={setSelectedSectionID}
            sections={group.sections}
            defaultOption={group.title}
          />
          
          <TodoList 
            Todos={filteredTodos} 
            OnCompleteTodoCallback={completeTodoHandler}
            OnDeleteTodoCallback={deleteTodoHandler}
            OnEditDescriptionCallback={descriptionTodoHandler}
          />

          <SectionList 
            sections={group.sections} 
            sectionsUpdatedHandler={sectionsUpdatedHandler} 
          />
          
          <NewSectionForm 
            onAddClickedHandler={addNewSection}
          />
        </Container>

        <div className="w-72 h-screen border-l"></div>
      </FlexBox>
    );
  }



  function DropDown() {
    const [show, setShow] = useState(false)
    return (
      <div className="bg-white rounded-lg w-72 cursor-pointer" onClick={() => setShow(!show)}>
        <DotsVerticalIcon width={24} />
        {show &&
          <div className="absolute shadow-sm rounded-lg w-72 bg-white border">
            <DropDownOption>Child</DropDownOption>
            <DropDownOption>Child</DropDownOption>
            <DropDownOption>Child</DropDownOption>
            <DropDownOption>Child</DropDownOption>
            <DropDownOption>Child</DropDownOption>
          </div>
        }
      </div>
    )
  }

  function DropDownOption({children} : any) {
    return (
      <div className="p-1 hover:bg-gray-50 cursor-pointer first:rounded-t-lg last:rounded-b-lg text-sm">
        {children}
      </div>
    )
  }