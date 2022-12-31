import React, { useEffect } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import { useState } from 'react';
import axios from 'axios';

// const TASKS = [
//   {
//     id: 1,
//     title: 'Mow the lawn',
//     isComplete: false,
//   },
//   {
//     id: 2,
//     title: 'Cook Pasta',
//     isComplete: true,
//   },
// ];
const App = () => {
  const [tasks, setTaskData] = useState([]);

  const kBaseUrl = 'http://localhost:5000';

  useEffect(() => {
    getAllTasks();
  }, []);

  const getAllTasks = () => {
    return axios
      .get(`${kBaseUrl}/tasks`)
      .then((response) => {
        const newTasks = response.data.map((task) => {
          return {
            id: task.id,
            title: task.title,
            isComplete: task.is_complete,
          };
        });
        setTaskData(newTasks);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateTask = (id) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        task.isComplete = !task.isComplete;
        let routeWord = 'mark_complete';
        if (!task.isComplete) {
          routeWord = 'mark_incomplete';
        }
        axios
          .patch(`${kBaseUrl}/tasks/${id}/${routeWord}`)
          .then(() => setTaskData(newTasks))
          .catch((err) => console.log(err));
      }
      return task;
    });
  };

  const deleteTask = (id) => {
    return axios
      .delete(`${kBaseUrl}/tasks/${id}`)
      .then(() => {
        setTaskData((oldTasks) => {
          return oldTasks.filter((task) => task.id !== id);
        });
      })
      .catch((err) => console.log(err));
  };

  const addTask = ({ title, isComplete }) => {
    const description = 'created task in frontend';
    const completedAt = isComplete ? new Date() : null;
    axios
      .post(`${kBaseUrl}/tasks`, {
        title,
        description,
        // eslint-disable-next-line camelcase
        completed_at: completedAt,
      })
      .then((response) => {
        const newTask = {
          id: response.data.task.id,
          title: response.data.task.title,
          isComplete: response.data.task.is_complete,
        };
        setTaskData([...tasks, newTask]);
      })
      .catch((err) => console.log(err));
  };

  // const updateTask = (id) => {
  //   const task = tasks.find((task) => task.id === id);
  //   const endpoint = task.isComplete ? 'mark_complete' : 'mark_incomplete';
  //   axios
  //     .patch(`${kBaseUrl}/tasks/${id}/${endpoint}`)
  //     .then(() =>
  //       setTaskData((oldTasks) => {
  //         oldTasks.map((task) => {
  //           if (task.id === id) {
  //             task.isComplete = !task.isComplete;
  //             return task;
  //           } else {
  //             return task;
  //           }
  //         });
  //       })
  //     )
  //     .catch((err) => console.log(err));
  // };

  // const updateTask = (id) => {
  //   setTaskData((oldTasks) => {
  //     return oldTasks.map((task) => {
  //       if (task.id === id) {
  //         return { ...task, isComplete: !task.isComplete };
  //       } else {
  //         return task;
  //       }
  //     });
  //   });
  // };

  // const deleteTask = (id) => {
  //   setTaskData((oldTasks) => {
  //     return oldTasks.filter((task) => {
  //       if (task.id != id) return task;
  //     });
  //   });
  // };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          <TaskList
            tasks={tasks}
            onToggleCompleteCallback={updateTask}
            onDeleteTask={deleteTask}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
