import {useState, useEffect} from "react";
import Todoinput from "./Todoinput";
import TodoList from "./TodoList";
function App() {
	const [todos, setTodos] = useState([]);
	const [todoValue, setTodoValue] = useState("");
	function handleAddtodos(newTodo) {
		const newTodoList = [...todos, newTodo];
		setTodos(newTodoList);
		persisitData(newTodoList)
	}
	function handleDeleteTodo(index) {
		const newTodoList = todos.filter((todo, todoidx) => {
			return todoidx !== index;
		});
		setTodos(newTodos);
		persisitData(newTodoList)
	}
	function persisitData(newList) {
		localStorage.setItem('todos', JSON.stringify({todos: newList }))
	}
	function handleEditTodo(index) {
		const valueToBeEditted = todos[index];
		setTodoValue(valueToBeEditted);
		handleDeleteTodo(index);
	
	}
 
	useEffect(() => {
		if (!localStorage) {
			return;
		}
		let localTodos = localStorage.getItem("todos");
		if (!localTodos) {
			return;
		}
		localTodos = JSON.parse(localTodos).todos;
		setTodos(localTodos); 
	}, []);
	return (
		<>
			<Todoinput
				todoValue={todoValue}
				setTodoValue={setTodoValue}
				handleAddtodos={handleAddtodos}
			/>
			<TodoList
				handleEditTodo={handleEditTodo}
				handleDeleteTodo={handleDeleteTodo}
				todos={todos}
			/>
		</>
	);
}

export default App;
