import { useEffect, useState } from "react";
import TaskList from "../components/TaskList";
import NewTaskModal from "../components/NewTaskModal";

function HomePage() {
    const [theme, setTheme] = useState("light");
    const [modalOpen, setModalOpen] = useState(false);
    const [tasks, setTasks] = useState(() => {
        const todos = localStorage.getItem("todos");
        return todos ? JSON.parse(todos) : [];
    });

    useEffect(() => {
        if (localStorage.getItem("theme")) {
            setTheme(localStorage.getItem("theme"));
            document.body.dataset.theme = localStorage.getItem("theme");
        } else {
            localStorage.setItem("theme", theme);
        }
    }, [theme]);

    const switchTheme = () => {
        const nextTheme = theme === "light" ? "dark" : "light";
        setTheme(nextTheme);
        document.body.dataset.theme = nextTheme;
        localStorage.setItem("theme", nextTheme);
    };

    // Task sort options
    const sortOptions = [
        { value: "all", label: "all" },
        { value: "active", label: "active" },
        { value: "finished", label: "finished" },
    ];
    // Renders sort options
    const navLinks = sortOptions.map((option) => (
        <li key={option.value}>
            <a type="button" id={option.value}>
                {option.label}
            </a>
        </li>
    ));

    return (
        <main>
            {modalOpen && (
                <NewTaskModal
                    closeModal={() => setModalOpen(false)}
                    setTasks={setTasks}
                />
            )}

            <h2>Todo</h2>
            <header className="header">
                <div className="header__top">
                    <input
                        type="text"
                        name=""
                        id="search"
                        className="input"
                        placeholder="Search..."
                        autoComplete="off"
                    />
                    <div className="header__btns">
                        <button
                            type="button"
                            className="btn"
                            id="new-task"
                            onClick={() => setModalOpen(true)}
                        >
                            New task
                        </button>
                        <button
                            type="button"
                            className="btn"
                            id="theme-switch"
                            onClick={switchTheme}
                        >
                            <span className="material-symbols-rounded">
                                {theme === "light" ? "dark_mode" : "light_mode"}
                            </span>
                        </button>
                    </div>
                </div>
                <nav className="header__bottom">
                    <ul className="header__nav">{navLinks}</ul>
                </nav>
            </header>

            <TaskList tasks={tasks} setTasks={setTasks} />
        </main>
    );
}

export default HomePage;
