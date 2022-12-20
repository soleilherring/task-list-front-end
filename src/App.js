import React from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import { useState } from 'react';

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

  const updateTask = (taskId) => {
    const newTaskData = [...taskData];
    for (const task of newTaskData) {
      if (task.id === taskId) {
        !task.isComplete;
      }
    }
    setTaskData(updateTask);
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          <TaskList tasks={taskData} updateTask={updateTask} />
        </div>
      </main>
    </div>
  );
};

export default App;
