import { useEffect, useState } from "react";
import TaskList from "./components/TaskList";
import NewTaskModal from "./components/NewTaskModal";

function App() {
    const [theme, setTheme] = useState("light");
    const [modalOpen, setModalOpen] = useState(false);
    const [tasks, setTasks] = useState(() => {
        const todos = localStorage.getItem("todos");
        return todos ? JSON.parse(todos) : [];
    });
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState(0);

    // If user visits the website for the first time
    // add empty todos list to the localstorage
    useEffect(() => {
        if (!localStorage.getItem("todos")) {
            localStorage.setItem("todos", JSON.stringify([]));
        }
    }, []);

    // Checking preferred theme and setting default(light) if there is none
    useEffect(() => {
        if (localStorage.getItem("theme")) {
            setTheme(localStorage.getItem("theme"));
            document.body.dataset.theme = localStorage.getItem("theme");
        } else {
            localStorage.setItem("theme", theme);
        }
    }, [theme]);

    // Search implementation
    useEffect(() => {
        if (search.trim() === "") {
            setTasks(() => {
                const todos = localStorage.getItem("todos");
                return todos ? JSON.parse(todos) : [];
            });
        } else {
            setTasks(() => {
                const todos = localStorage.getItem("todos");
                const updatedTodos = JSON.parse(todos).filter((todo) =>
                    todo.name.includes(search.trim())
                );
                return updatedTodos;
            });
        }
    }, [search]);

    // Filter implementation
    useEffect(() => {
        switch (filter) {
            case 0:
                setTasks(() => {
                    const todos = localStorage.getItem("todos");
                    return todos ? JSON.parse(todos) : [];
                });
                break;
            case 1:
                setTasks(() => {
                    const todos = localStorage.getItem("todos");
                    const updatedTodos = JSON.parse(todos).filter(
                        (todo) => todo.active === true
                    );
                    return updatedTodos;
                });
                break;
            case 2:
                setTasks(() => {
                    const todos = localStorage.getItem("todos");
                    const updatedTodos = JSON.parse(todos).filter(
                        (todo) => todo.active === false
                    );
                    return updatedTodos;
                });
                break;
        }
    }, [filter]);

    // Switching theme from light to dark and vice versa
    const switchTheme = () => {
        const nextTheme = theme === "light" ? "dark" : "light";
        setTheme(nextTheme);
        document.body.dataset.theme = nextTheme;
        localStorage.setItem("theme", nextTheme);
    };

    // Task sort options
    const sortOptions = [
        { value: 0, label: "all" },
        { value: 1, label: "active" },
        { value: 2, label: "finished" },
    ];
    // Renders sort options
    const navLinks = sortOptions.map((option) => (
        <li className="filter" key={option.value}>
            <a
                type="button"
                id={option.value}
                onClick={() => setFilter(option.value)}
            >
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
                        className="input search"
                        placeholder="Search..."
                        autoComplete="off"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <div className="header__buttons">
                        <button
                            type="button"
                            className="btn default"
                            id="new-task"
                            onClick={() => setModalOpen(true)}
                        >
                            New task
                        </button>
                        <button
                            type="button"
                            className="btn default"
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

export default App;
