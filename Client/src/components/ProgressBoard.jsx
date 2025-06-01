import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import axios from "axios";

const statuses = ["Todo", "Inprogress", "Done"];

const ProgressBoard = ({ userRole }) => {
    const [modal, setModal] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [editTask, setEditTask] = useState(null);
    const [form, setForm] = useState({ title: "", description: "", status: "" });

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await axios.get("http://localhost:3002/api/tasks/");
                const sorted = res.data.sort((a, b) => a.index - b.index);
                setTasks(sorted);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        fetchTasks();
    }, []);

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

    const handleSubmit = async () => {
        if (!form.title.trim() || !form.status) return;

        try {
            if (editTask) {
                const res = await axios.put(`http://localhost:3002/api/tasks/${editTask._id}`, form);
                setTasks(prev => prev.map(t => (t._id === editTask._id ? res.data : t)));
            } else {
                const sameStatusTasks = tasks.filter(t => t.status === form.status);
                const newTask = { ...form, index: sameStatusTasks.length };
                const res = await axios.post("http://localhost:3002/api/tasks/", newTask);
                setTasks(prev => [...prev, res.data]);
            }

            setModal(false);
            setEditTask(null);
            setForm({ title: "", description: "", status: "" });
        } catch (error) {
            console.error("Submit error:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3002/api/tasks/${id}`);
            setTasks(prev => prev.filter(t => t._id !== id));
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    const handleEdit = (task) => {
        setEditTask(task);
        setModal(true);
    };

    const onDragEnd = async (result) => {
        const { source, destination, draggableId } = result;
        if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
            return;
        }

        const updatedTasks = [...tasks];
        const draggedTask = updatedTasks.find(t => t._id === draggableId);

        if (!draggedTask) return;

        // Remove from source
        updatedTasks.forEach(t => {
            if (t.status === source.droppableId && t.index > source.index) t.index--;
        });

        // Add to destination
        updatedTasks.forEach(t => {
            if (t.status === destination.droppableId && t.index >= destination.index) t.index++;
        });

        draggedTask.status = destination.droppableId;
        draggedTask.index = destination.index;

        const newTasks = updatedTasks.filter(t => t._id !== draggedTask._id);
        newTasks.push(draggedTask);

        try {
            await axios.patch("http://localhost:3002/api/tasks/reorder", { reorderedTasks: newTasks });
            setTasks(newTasks);
        } catch (error) {
            console.error("Reorder error:", error);
        }
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
                        <h2 className="text-2xl font-bold mb-4">{editTask ? "Edit Task" : "Add Task"}</h2>
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
                            >Cancel</button>
                            <button
                                className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl"
                                onClick={handleSubmit}
                            >{editTask ? "Update" : "Add"}</button>
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
                                    <h2 className="text-xl font-bold text-gray-700 text-center mb-4">{status}</h2>
                                    <div className="space-y-3">
                                        {tasks
                                            .filter((t) => t.status === status)
                                            .sort((a, b) => a.index - b.index)
                                            .map((task, index) => (
                                                <Draggable
                                                    key={task._id}
                                                    draggableId={task._id}
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
                                                                    >Edit</button>
                                                                    <button
                                                                        className="text-red-500 text-sm font-medium"
                                                                        onClick={() => handleDelete(task._id)}
                                                                    >Delete</button>
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