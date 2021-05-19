import { useState } from "react"
import Item from "./Item"
import Input from "./Input"
import "./List.sass"

function List({ list, setList }) {
    const [listTitle, setListTitle] = useState("My List")
    const [listDescription, setListDescription] = useState("Tasks for a productive day")
    const [newItem, setNewItem] = useState("")
    const [draggedId, setDraggedId] = useState(-1)
    const [droppedId, setDroppedId] = useState(-1)
    const [draggedOverId, setDraggedOverId] = useState(-1)

    function inputHandler(e) {
        setNewItem(e.target.value)
    }

    function addElement(e) {
        e.preventDefault()
        setList([
            ...list, { name: newItem, checked: false, id: list.length }
        ])
        setNewItem("")
    }

    const handleOnDragStart = e => {
        setDraggedId(e.target.id)
        // console.log("dragging " + e.currentTarget.id)
    }

    const handleOnDragOver = e => {
        e.preventDefault()
        setDraggedOverId(e.currentTarget.id)
        setDroppedId(e.currentTarget.id)
    }

    const handleOnDrop = e => {
        setDroppedId(e.currentTarget.id)

        let start = 0, end = list.length - 1

        list.forEach((item, i) => {
            if (parseInt(item.id) === parseInt(draggedId))
                start = i

            if (parseInt(item.id) === parseInt(droppedId))
                end = i
        });

        reorderItems({ start, end })
        setDraggedOverId(-1)
        setDraggedId(-1)
    }

    const reorderItems = ({ start, end }) => {
        let item = { ...list[start] }
        let listCopy = list
        listCopy.splice(start, 1)
        listCopy.splice(end, 0, item)
        setList(listCopy)
    }

    return (
        <ul>
            <input className="list-info list-title" type="text" value={listTitle} onChange={e => setListTitle(e.target.value)} />
            <input className="list-info list-description" type="text" value={listDescription}
                onChange={e => setListDescription(e.target.value)} />
            {list.map((item) => (
                <li key={item.id}>
                    <Item
                        draggedOver={parseInt(draggedOverId) === parseInt(item.id)}
                        list={list}
                        setList={setList}
                        item={item}
                        handleOnDragStart={handleOnDragStart}
                        handleOnDragOver={handleOnDragOver}
                        handleOnDrop={handleOnDrop} />
                </li>
            ))}
            <li><Input addElement={addElement} newItem={newItem} inputHandler={inputHandler} /></li>
        </ul>
    )
}

export default List