function Task({ id, name, active, tasks, setTasks }) {
    const handleChange = (selectedID) => {
        const updatedTasks = tasks.map((task) => {
            if (task.id == selectedID) {
                return { ...task, active: !task.active };
            }
            return task;
        });

        setTasks(updatedTasks);
        localStorage.setItem("todos", JSON.stringify(updatedTasks));
    };

    const handleRemove = (selectedID) => {
        const updatedTasks = tasks.filter((task) => task.id != selectedID);

        setTasks(updatedTasks);
        localStorage.setItem("todos", JSON.stringify(updatedTasks));
    };

    return (
        <li className="task-card">
            <div className="task-card__main">
                <input
                    id={id}
                    type="checkbox"
                    checked={!active}
                    onChange={() => handleChange(id)}
                />
                <label htmlFor={id} className="custom-checkbox">
                    <span className="material-symbols-rounded">
                        check_small
                    </span>
                </label>

                <span className="task-card__text">{name}</span>
            </div>

            {!active && (
                <button
                    type="button"
                    className="btn transparent"
                    onClick={() => handleRemove(id)}
                >
                    <span className="material-symbols-rounded">
                        delete_forever
                    </span>
                </button>
            )}
        </li>
    );
}

export default Task;
