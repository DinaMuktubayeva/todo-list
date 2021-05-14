import "./List.sass"

function Input({ addElement, newItem, inputHandler }) {
    return (
        <div className='new-item'>
            <form onSubmit={addElement} >
                <input type="text" onChange={inputHandler} value={newItem} placeholder="Add a new task" autoFocus />
                <input type="submit" style={{ display: 'none' }} />
            </form>
        </div>
    )
}

export default Input