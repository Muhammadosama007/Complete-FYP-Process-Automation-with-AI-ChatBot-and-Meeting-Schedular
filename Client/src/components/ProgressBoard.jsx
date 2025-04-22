import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const statuses = ["Todo", "Inprogress", "Done"];

const ProgressBoard = ({ userRole }) => {
    const [modal, setModal] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [editTask, setEditTask] = useState(null);
    const [form, setForm] = useState({ title: "", description: "", status: "" });

    useEffect(() => {
        const saved = localStorage.getItem("frontend-tasks");
        if (saved) setTasks(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem("frontend-tasks", JSON.stringify(tasks));
    }, [tasks]);

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
        if (!form.title.trim()) return;
        if (editTask) {
            setTasks(tasks.map((task) =>
                task.id === editTask.id ? { ...task, ...form } : task
            ));
        } else {
            setTasks([...tasks, { ...form, id: `task-${Date.now()}` }]);
        }
        setModal(false);
        setEditTask(null);
        setForm({ title: "", description: "", status: "" });
    };

    const handleDelete = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const handleEdit = (task) => {
        setEditTask(task);
        setModal(true);
    };

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;
        if (!destination) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) return;

        const draggedTask = tasks.find((t) => t.id === draggableId);
        const remainingTasks = tasks.filter((t) => t.id !== draggableId);

        const updatedTask = {
            ...draggedTask,
            status: destination.droppableId,
        };

        const reordered = [];
        let index = 0;
        for (let status of statuses) {
            const group = remainingTasks
                .filter((t) => t.status === status)
                .sort((a, b) => a.index - b.index);

            if (status === destination.droppableId) {
                group.splice(destination.index, 0, updatedTask);
            }

            reordered.push(...group.map((t, i) => ({ ...t, index: i })));
        }

        setTasks(reordered);
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
                        >
                            <option value="" >Select Status</option>
                            <option value="Todo">Todo</option>
                            <option value="Inprogress">Inprogress</option>
                            <option value="Done">Done</option>
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
                                                            <h3 className="font-semibold text-lg text-gray-800">{task.title}</h3>
                                                            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
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
