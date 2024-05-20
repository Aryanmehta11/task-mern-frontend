import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset, getTasks } from '../features/tasks/taskSlice';
import TaskItem from './TaskItem';
import Spinner from './Spinner';
import { useNavigate } from "react-router-dom";

const TaskList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { tasks, isLoading, isError, message } = useSelector(state => state.tasks);

    useEffect(() => {
        if (isError) console.log(message) 
        else dispatch(getTasks()); // Corrected: Call getTasks() function
        return () =>  dispatch(reset()); // Reset state when component unmounts or gets re-rendered
        }, [navigate, isError, message, dispatch]);

    return (
        isLoading ? <Spinner /> : (
            <section className="content">
                {tasks.length > 0 && (
                    <div className="tasks">
                        {tasks.map(task => <TaskItem key={task._id} task={task} />)}
                    </div>
                )}
            </section>
        )
    );
}

export default TaskList;
