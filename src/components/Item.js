import { useEffect, useRef, useState } from 'react'
import './List.sass'
import { faGripLines, faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function Item({ draggedOver, list, setList, item, handleOnDragStart, handleOnDragOver, handleOnDrop }) {
    const node = useRef()
    const form = useRef()
    const inputId = "input-" + item.id
    const [editMode, setEditMode] = useState(false)
    const [newName, setNewName] = useState(item.name)

    useEffect(() => {
        document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, [])

    const inputCheckHandler = () => {
        setList(list.map((todo) => {
            if (todo.id === item.id) {
                return {
                    ...todo, checked: !todo.checked
                }
            }
            return todo
        }))
    }

    const updateName = () => {
        setList(list.map(todo => {
            if (todo.id === item.id) {
                return {
                    ...todo, name: newName
                }
            }
            return todo
        }))
    }

    const deleteItem = () => {
        setList(list.filter(todo => {
            return todo.id !== item.id
        }))
    }

    const handleClick = e => {
        // trigger form submit on outside click
        if (node.current && !node.current.contains(e.target))
            form.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
    }

    const handleSubmit = e => {
        e.preventDefault()
        updateName()
        setEditMode(false)
    }

    return (
        <div>
            {
                editMode ? (
                    <div ref={node} className='checkbox'>
                        <input type="checkbox" defaultChecked={item.checked} onChange={inputCheckHandler} />
                        <form ref={form} className='edit-item' onSubmit={handleSubmit} >
                            <input type='text' value={newName} onChange={e => { setNewName(e.target.value) }} autoFocus />
                            <button type='submit' style={{ display: 'none' }}></button>
                        </form>
                    </div>
                ) : (
                    <div id={item.id} draggable
                        className={draggedOver ? 'checkbox-container dragged-over' : 'checkbox-container'}
                        onDragStart={handleOnDragStart}
                        onDragOver={handleOnDragOver}
                        onDrop={handleOnDrop}
                    >
                        <FontAwesomeIcon className='icon icon-lines' icon={faGripLines} />
                        <div className="checkbox" >
                            <input id={inputId} type="checkbox" defaultChecked={item.checked} onChange={inputCheckHandler} />
                            <label htmlFor={inputId} >
                                <div className="item-name" onClick={() => { setEditMode(true) }} >
                                    {item.name}
                                </div>
                            </label>
                        </div>
                        <FontAwesomeIcon className='icon icon-delete' icon={faTrashAlt} onClick={deleteItem} />
                    </div>
                )
            }
        </div >

    )
}

export default Item