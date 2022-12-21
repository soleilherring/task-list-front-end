import React from 'react';
import PropTypes from 'prop-types';
import './Task.css';

const Task = (props) => {
  const buttonClass = props.isComplete ? 'tasks__item__toggle--completed' : '';

  const onUpdateTaskButtonClick = () => {
    props.onToggleCompleteCallback(props.id);
  };

  const onDeleteTaskButtonClick = () => {
    props.onDeleteTask(props.id);
  };

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={onUpdateTaskButtonClick}
      >
        {props.title}
      </button>
      <button
        className="tasks__item__remove button"
        onClick={onDeleteTaskButtonClick}
      >
        x
      </button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  updateTask: PropTypes.func.isRequired,
  onToggleCompleteCallback: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
};

export default Task;
