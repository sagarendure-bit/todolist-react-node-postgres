import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './components/Layout';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const API_URL = '/api';

  const handleCharactersError = (value) => {
    if (value.length < 3 || value.length > 50) {
      alert('Todo must have at least 3 characters and less than 50 characters.');
      return false;
    }
    return true;
  };

  const addTodo = async () => {
    if (!handleCharactersError(todo)) return;

    try {
      await axios.post(`${API_URL}/create`, {
        todo,
      });

      setTodo('');
      getAllTodos();
    } catch (err) {
      console.error(err);
    }
  };

  const getAllTodos = async () => {
    try {
      const response = await axios.get(`${API_URL}/`);
      setTodoList(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateTodo = async (id) => {
    if (!handleCharactersError(newTodo)) return;

    try {
      await axios.put(`${API_URL}/update/${id}`, {
        id,
        todo: newTodo,
      });

      setNewTodo('');
      getAllTodos();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      getAllTodos();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addTodo();
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  return (
    <div className="App">
      <Layout>
        <TodoForm
          handleSubmit={handleSubmit}
          setTodo={setTodo}
          todo={todo}
        />

        <TodoList
          todoList={todoList}
          setNewTodo={setNewTodo}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
        />
      </Layout>
    </div>
  );
}

export default App;