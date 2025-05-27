import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const statuses = ["Todo", "Inprogress", "Done"];

const ProgressBoard = ({ userRole }) => {
    const [modal, setModal] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [editTask, setEditTask] = useState(null);
    const [form, setForm] = useState({ title: "", description: "", status: "" });
    const [isLoaded, setIsLoaded] = useState(false);

    // Load tasks from localStorage on initial render
    useEffect(() => {
        const savedTasks = localStorage.getItem("progress-cards");
        if (savedTasks) {
            try {
                const parsedTasks = JSON.parse(savedTasks);
                if (Array.isArray(parsedTasks)) {
                    // Ensure all tasks have proper structure
                    const validatedTasks = parsedTasks.map(task => ({
                        id: task.id || `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                        title: task.title || "Untitled Task",
                        description: task.description || "",
                        status: statuses.includes(task.status) ? task.status : "Todo",
                        index: typeof task.index === "number" ? task.index : 0
                    }));
                    setTasks(validatedTasks);
                }
            } catch (error) {
                console.error("Error loading tasks:", error);
                setTasks([]);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save tasks to localStorage whenever they change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("progress-cards", JSON.stringify(tasks));
        }
    }, [tasks, isLoaded]);

    // Set form values when editing a task
    useEffect(() => {
        if (editTask) {
            setForm({
                title: editTask.title,
                description: editTask.description,
                status: editTask.status,
            });
        } else {
            setForm({ title: "", description: "", status: "" });
        }
    }, [editTask]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (!form.title.trim() || !form.status) return;

        if (editTask) {
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === editTask.id
                        ? { ...task, ...form }
                        : task
                )
            );
        } else {
            const statusTasks = tasks.filter(t => t.status === form.status);
            const newTask = {
                ...form,
                id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
                index: statusTasks.length
            };
            setTasks(prevTasks => [...prevTasks, newTask]);
        }

        setModal(false);
        setEditTask(null);
        setForm({ title: "", description: "", status: "" });
    };

    const handleDelete = (id) => {
        const taskToDelete = tasks.find(t => t.id === id);
        if (!taskToDelete) return;

        setTasks(prevTasks => {
            // Filter out the deleted task
            const updatedTasks = prevTasks.filter(t => t.id !== id);

            // Update indexes for remaining tasks in the same status
            return updatedTasks.map(t => {
                if (t.status === taskToDelete.status && t.index > taskToDelete.index) {
                    return { ...t, index: t.index - 1 };
                }
                return t;
            });
        });
    };

    const handleEdit = (task) => {
        setEditTask(task);
        setModal(true);
    };

    const onDragEnd = (result) => {
        const { source, destination, draggableId } = result;

        // If dropped outside a droppable area or in the same position
        if (!destination ||
            (source.droppableId === destination.droppableId &&
                source.index === destination.index)) {
            return;
        }

        setTasks(prevTasks => {
            const draggedTask = prevTasks.find(t => t.id === draggableId);
            if (!draggedTask) return prevTasks;

            // Create new array without the dragged item
            const newTasks = prevTasks.filter(t => t.id !== draggableId);

            // Moving between different status columns
            if (source.droppableId !== destination.droppableId) {
                // Decrement indexes in source column for tasks after the removed one
                newTasks.forEach(t => {
                    if (t.status === source.droppableId && t.index > source.index) {
                        t.index -= 1;
                    }
                });

                // Increment indexes in destination column for tasks at or after the new position
                newTasks.forEach(t => {
                    if (t.status === destination.droppableId && t.index >= destination.index) {
                        t.index += 1;
                    }
                });

                // Add the dragged task with updated status and index
                newTasks.push({
                    ...draggedTask,
                    status: destination.droppableId,
                    index: destination.index
                });
            }
            // Moving within the same column
            else {
                const direction = destination.index > source.index ? 1 : -1;
                const start = Math.min(source.index, destination.index);
                const end = Math.max(source.index, destination.index);

                newTasks.forEach(t => {
                    if (t.status === source.droppableId && t.index >= start && t.index <= end) {
                        if (t.index === source.index) {
                            t.index = destination.index;
                        } else {
                            t.index -= direction;
                        }
                    }
                });

                // Add the dragged task back with updated index
                newTasks.push({
                    ...draggedTask,
                    index: destination.index
                });
            }

            return newTasks;
        });
    };

    return (
        <div className="p-4">
            {userRole !== "advisor" && (
                <div className="mb-4">
                    <button
                        className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2.5 rounded-xl shadow"
                        onClick={() => {
                            setEditTask(null);
                            setModal(true);
                        }}
                    >
                        Add Task
                    </button>
                </div>
            )}

            {modal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4">
                            {editTask ? "Edit Task" : "Add Task"}
                        </h2>
                        <input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Title"
                            className="w-full mb-3 p-2 border rounded-xl"
                            required
                        />
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Description"
                            className="w-full mb-3 p-2 border rounded-xl"
                        />
                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            className="w-full mb-4 p-2 border rounded-xl"
                            required
                        >
                            <option value="">Select Status</option>
                            {statuses.map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>

                        <div className="flex justify-end gap-2">
                            <button
                                className="px-4 py-2 bg-gray-200 rounded-xl"
                                onClick={() => {
                                    setModal(false);
                                    setEditTask(null);
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl"
                                onClick={handleSubmit}
                            >
                                {editTask ? "Update" : "Add"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <DragDropContext onDragEnd={onDragEnd}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {statuses.map((status) => (
                        <Droppable droppableId={status} key={status}>
                            {(provided) => (
                                <div
                                    className="flex flex-col p-4 rounded-2xl bg-gray-100 shadow-inner min-h-[300px]"
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    <h2 className="text-xl font-bold text-gray-700 text-center mb-4">
                                        {status}
                                    </h2>
                                    <div className="space-y-3">
                                        {tasks
                                            .filter((t) => t.status === status)
                                            .sort((a, b) => a.index - b.index)
                                            .map((task, index) => (
                                                <Draggable
                                                    key={task.id}
                                                    draggableId={task.id}
                                                    index={index}
                                                >
                                                    {(provided) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className="bg-white rounded-2xl p-4 shadow flex flex-col border border-gray-200"
                                                        >
                                                            <h3 className="font-semibold text-lg text-gray-800">
                                                                {task.title}
                                                            </h3>
                                                            <p className="text-sm text-gray-600 mt-1">
                                                                {task.description}
                                                            </p>
                                                            {userRole !== "advisor" && (
                                                                <div className="flex justify-end gap-2 mt-3">
                                                                    <button
                                                                        className="text-blue-600 text-sm font-medium"
                                                                        onClick={() => handleEdit(task)}
                                                                    >
                                                                        Edit
                                                                    </button>
                                                                    <button
                                                                        className="text-red-500 text-sm font-medium"
                                                                        onClick={() => handleDelete(task.id)}
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                        {provided.placeholder}
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
};

export default ProgressBoard;