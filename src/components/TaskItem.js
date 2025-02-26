import React from "react";
import { useDispatch } from "react-redux";
import { deleteTask } from '../features/tasks/taskSlice';


const TaskItem = ({ task }) => {
    const dispatch = useDispatch();

    return (
        <div className="task-item">
            <div className="task-info">
                {new Date(task.createdAt).toLocaleString('en-US')}
            </div>
            <h2 className="task-text">{task.text}</h2>
            <button onClick={() => dispatch(deleteTask(task._id))} className="close">
                X
            </button>
        </div>
    );
}

export default TaskItem;
