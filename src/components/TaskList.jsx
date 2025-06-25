import Task from "./Task";

function TaskList({ tasks, setTasks }) {
    const renderTasks = tasks.map((task) => (
        <Task
            key={task.id}
            id={task.id}
            name={task.name}
            active={task.active}
            tasks={tasks}
            setTasks={setTasks}
        />
    ));

    if (tasks.length === 0) {
        return <h3>Start by adding a new task</h3>;
    }

    return <ul className="task-list">{renderTasks}</ul>;
}

export default TaskList;
