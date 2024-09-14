import React, {useState, useEffect} from 'react';
import './ToDoList.css';

const ToDoList = () => {
  const [newTitle, setNewTitle] = useState ('');
  const [newDescription, setNewDescription] = useState ('');
  const [isCompleteScreen, setIsCompleteScreen] = useState (false);
  const [allTodos, setTodos] = useState ([]);
  const [currentEdit,setCurrentEdit] = useState("");
  const [currentEditedItem,setCurrentEditedItem] = useState("");
  const [completedTodos, setCompletedTodos] = useState ([]);

  const AddTodo = () => {
    if (newTitle == null) {
        alert('Title cannot be empty');
        return; 
      }
    let newTodoItem = {
      title: newTitle,
      description: newDescription,  
    };

    let updatedTodoList = [...allTodos];
    updatedTodoList.push (newTodoItem);
    setTodos (updatedTodoList);
    localStorage.setItem ('todolist', JSON.stringify (updatedTodoList));
  };

  const DeleteTodo = index => {
    let deletedTodo = [...allTodos];
    deletedTodo.splice (index,1);
    localStorage.setItem ('todolist', JSON.stringify (deletedTodo));
    setTodos (deletedTodo);
  };

  const CompleteTodo = index => {
    let filteredItem = {
      ...allTodos[index],
    };

    let updatedCompletedToDoList = [...completedTodos];
    updatedCompletedToDoList.push (filteredItem);
    setCompletedTodos (updatedCompletedToDoList);
    DeleteTodo(index);
    localStorage.setItem (
      'completedTodos',
      JSON.stringify (updatedCompletedToDoList)
    );
  };

  const DeleteCompletedTodo = index => {
    let RemovedTodo = [...completedTodos];
    RemovedTodo.splice (index,1);
    localStorage.setItem ('completedTodos', JSON.stringify (RemovedTodo));
    setCompletedTodos (RemovedTodo);
  };

  useEffect (() => {
    let savedTodoItem = JSON.parse (localStorage.getItem ('todolist'));
    let savedCompletedTodoItem = JSON.parse (
      localStorage.getItem ('completedTodos')
    );
    if (savedTodoItem) {
      setTodos (savedTodoItem);
    }
    if (savedCompletedTodoItem) {
      setCompletedTodos (savedCompletedTodoItem);
    }
  }, []);

  const EditTodo = (ind,item)=>{
    console.log(ind);
    setCurrentEdit(ind);
    setCurrentEditedItem(item);
  }

  const UpdateTitle = (value)=>{
    setCurrentEditedItem((prev)=>{
      return {...prev,title:value}
    })
  }

  const UpdateDescription = (value)=>{
    setCurrentEditedItem((prev)=>{
      return {...prev,description:value}
    })
  }

  const UpdateToDo = ()=>{
      let newToDo = [...allTodos];
      newToDo[currentEdit] = currentEditedItem;
      setTodos(newToDo);
      setCurrentEdit("");
  }

  return (
    <div className="App">
      <h1 className="title">My ToDos</h1>
        <div className="todo-wrapper">
            <div className="todo-input">
                <div className="todo-input-item">
                    <label>Title</label>
                    <input
                        type="text"
                        value={newTitle}
                        onChange={e => setNewTitle (e.target.value)}
                        placeholder="Add task Title Here"
                    />
                </div>

                <div className="todo-input-item">
                    <label>Description</label>
                    <input
                        type="text"
                        value={newDescription}
                        onChange={e => setNewDescription (e.target.value)}
                        placeholder="Add task Description here"
                    />
                </div>

                <div className="todo-input-item">
                    <button
                        type="button"
                        onClick={AddTodo}
                        className="addButton"
                    >Add
                    </button>
                </div>
            </div>

        <div className="button-area">
            <button
                className={`checkButton ${isCompleteScreen === false && 'active'}`}
                onClick={() => setIsCompleteScreen (false)}
            >To Do
            </button>

            <button
                className={`checkButton ${isCompleteScreen === true && 'active'}`}
                onClick={() => setIsCompleteScreen (true)}
            >Completed
            </button>
        </div>

        <div className="todo-list">
            {isCompleteScreen === false &&allTodos.map ((item, index) => {
                if(currentEdit===index){
                    return(
                        <div className='editbox' key={index}>
                            <input 
                            placeholder='Add New Title Here' 
                            onChange={(e)=>UpdateTitle(e.target.value)} 
                            value={currentEditedItem.title}  />

                            <textarea placeholder='Add New Description Here' 
                            rows={4}
                            onChange={(e)=>UpdateDescription(e.target.value)} 
                            value={currentEditedItem.description}  />

                            <button
                                type="button"
                                onClick={UpdateToDo}
                                className="updateButton"
                            >Update
                            </button>
                        </div> ) }
                else{
                    return(
                        <div className="todo-list-item" key={index}>
                            <div>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
  
                        <div className="todoItemButton">
                            <button
                                type="button"
                                onClick={() => CompleteTodo (index)}
                                className="completedButton"
                            >Completed
                            </button>

                            <button
                                type="button"
                                onClick={() => EditTodo (index,item)}
                                className="updateButton"
                            >Edit
                            </button>

                            <button
                                type="button"
                                onClick={() => DeleteTodo (index)}
                                className="deleteButton"
                            >Delete
                            </button>    
                        </div>
  
        </div>
        );}})}

            {isCompleteScreen === true &&completedTodos.map ((item, index) => {
                return (
                    <div className="todo-list-item" key={index}>
                        <div>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                    <div>
                    
                    <button
                        type="button"
                        onClick={() => DeleteCompletedTodo (index)}
                        className="deleteButton"
                    >Delete
                    </button>
    
                    </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default ToDoList;