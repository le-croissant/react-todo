import { useState } from "react";

function NewTaskModal({ closeModal, setTasks }) {
    const [taskName, setTaskName] = useState("");
    const [hasError, setHasError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (taskName.trim() === "") {
            setHasError(true);
            return;
        }

        if (localStorage.getItem("todos")) {
            const todos = JSON.parse(localStorage.getItem("todos"));

            const newTodo = {
                id: Date.now(),
                name: taskName.trim(),
                active: true,
            };

            todos.push(newTodo);

            localStorage.setItem("todos", JSON.stringify(todos));
        } else {
            const todos = [];

            const newTodo = {
                id: Date.now(),
                name: taskName.trim(),
                active: true,
            };

            todos.push(newTodo);

            localStorage.setItem("todos", JSON.stringify(todos));
        }

        setHasError(false);
        setTasks(JSON.parse(localStorage.getItem("todos")));
        closeModal();
    };

    return (
        <div className="modal-bg">
            <form className="modal" onSubmit={handleSubmit}>
                <div className="modal__header">
                    <h2>New Task</h2>
                    <button
                        type="button"
                        className="btn transparent"
                        onClick={() => closeModal()}
                    >
                        <span className="material-symbols-rounded">close</span>
                    </button>
                </div>
                <div className="input-box">
                    {hasError && (
                        <label htmlFor="task-name">
                            This field is required
                        </label>
                    )}
                    <input
                        type="text"
                        id="task-name"
                        className={`input${hasError ? " error" : ""}`}
                        placeholder="Input new task"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        autoComplete="off"
                        maxLength={150}
                    />
                </div>
                <button type="submit" className="btn default">
                    Add task
                </button>
            </form>
        </div>
    );
}

export default NewTaskModal;
