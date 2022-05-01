import { useEffect, useState } from "react";
import { ColorList, Priority, Todo, TodoGroup } from "../Model";
import useStorage from "./UseStorage";

const getGroup = (id:number, groups:TodoGroup[]) => groups.find(group => group.id === id)!

export default function useGroups(groupID:number) {
    const [groups, setGroups] = useStorage<TodoGroup[]>("groups", [])
    const [group, setGroup] = useState(getGroup(groupID, groups));
    const [todos, setTodos] = useState(group?.todos)
    const hasTodos = (group?:TodoGroup) => group && group.todos.length > 0;

    const sectionTotals = (group:TodoGroup) => {
        let sectionTotals = 0
        let completed = 0
        for(var i = 0; i < group.sections.length; i ++) {
            let sections = group.sections[i]
            sectionTotals += sections.todos.length
            let completedTodos = sections.todos.filter(item => item.complete)
            completed += completedTodos.length
        }

        return { completed, sectionTotals }
    }

    const numberOfCompleted = group && group.todos.length > 0 
        ? group.todos.filter(item => item.complete ).length + sectionTotals(group).completed
        : 0

    const remaining = group && hasTodos(group)
        ? group.todos.length - numberOfCompleted
        : 0

    const isComplete = hasTodos(group) && remaining === 0;

    const completedString = group && `${numberOfCompleted}/${group.todos.length + sectionTotals(group).sectionTotals} completed`;

    const addEmptyGroup = () => {
        let newList = groups;
        let newGroup:TodoGroup = {
            id: groups.length,
            title: "New Todo Group",
            description: "A new set of Todods!",
            dateCreated: new Date(),
            complete: false,
            archived: false,
            todos: [],
            starred: false,
            sections: [],
            color: "emerald"
        }

        newList.push(newGroup)
        setGroups(newList)
    }

    const updateGroups = (group:TodoGroup) => {
        let newGroups = groups.map(item => {
            if(item.id === group.id) return group;
            return item;
        })
    
        setGroups(newGroups)
    }

    useEffect(() => {
        let group = getGroup(groupID, groups)
        setGroup(group)
        setTodos(group?.todos)
    }, [groupID, group, groups])

    const deleteGroup = (id:number) => {
        let newGroups = groups.filter(item => item.id !== id)
        setGroups(newGroups)
    }

    const starGroupToggle = (id:number) => {
        let newGroups = groups.map(item => {
            if(item.id === id) item.starred = !item.starred
            return item;
        })

        setGroups(newGroups)
    }

    function incompleteTodos() : Todo[] {
        let groupTodos = group.todos.filter(item => !item.complete)
        let sectionTodos = group.sections.flatMap(item => item.todos).filter(item => !item.complete)
        return groupTodos.concat(sectionTodos)
    }

    function completeTodos() : Todo[] {
        let groupTodos = group.todos.filter(item => item.complete)
        let sectionTodos = group.sections.flatMap(item => item.todos).filter(item => item.complete)
        return groupTodos.concat(sectionTodos)
    }

    function completeTodosCount() {
        return completeTodos().length
    }

    function incompleteTodosCount() {
        return incompleteTodos().length
    }

    function completeAndIncompleteTodoTotals() {
        let incompleteCount = incompleteTodosCount()
        let completeCount = completeTodosCount()
        let totalCount = incompleteCount + completeCount
        return { incompleteCount, completeCount, totalCount }
    }

    function getGroupColour(group:TodoGroup) {
        let col = ColorList.find(item => item.name === group.color)
        if (col == null) col = ColorList[0]
        return col
    }

    return {
        numberOfCompleted,
        remaining,
        completedString,
        hasTodos,
        groups,
        setGroups,
        addEmptyGroup,
        group,
        todos,
        deleteGroup,
        isComplete,
        starGroupToggle,
        updateGroups,
        incompleteTodos,
        completeTodos,
        completeTodosCount,
        incompleteTodosCount,
        completeAndIncompleteTodoTotals,
        getGroupColour
    }
}