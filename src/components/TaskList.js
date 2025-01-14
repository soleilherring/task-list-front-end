import React from 'react';
import PropTypes from 'prop-types';
import Task from './Task';
import './TaskList.css';

const TaskList = (props) => {
  const buildTaskList = () => {
    return props.tasks.map((task) => {
      return (
        <Task
          key={task.id}
          id={task.id}
          title={task.title}
          isComplete={task.isComplete}
          onToggleCompleteCallback={props.onToggleCompleteCallback}
          onDeleteTask={props.onDeleteTask}
        />
      );
    });
  };
  return <ul className="tasks__list no-bullet">{buildTaskList()}</ul>;
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      isComplete: PropTypes.bool.isRequired,
    })
  ).isRequired,

  onToggleCompleteCallback: PropTypes.func,
  onDeleteTask: PropTypes.func,
};

export default TaskList;
