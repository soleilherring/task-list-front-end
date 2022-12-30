import React, { useEffect } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import { useState } from 'react';
import axios from 'axios';

const TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
];
const App = () => {
  const [taskData, setTaskData] = useState(TASKS);

  const kBaseUrl = 'http://localhost:5000';

  useEffect(() => {
    getAllTasks();
  }, []);

  const getAllTasks = () => {
    return axios
      .get(`${kBaseUrl}/tasks`)
      .then((response) => {
        setTaskData(response.data.task);
        console.log(response.data.task);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateTask = (id) => {
    setTaskData((oldTasks) => {
      return oldTasks.map((task) => {
        if (task.id === id) {
          return { ...task, isComplete: !task.isComplete };
        } else {
          return task;
        }
      });
    });
  };

  const deleteTask = (id) => {
    setTaskData((oldTasks) => {
      return oldTasks.filter((task) => {
        if (task.id != id) return task;
      });
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          <TaskList
            tasks={taskData}
            onToggleCompleteCallback={updateTask}
            onDeleteTask={deleteTask}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
