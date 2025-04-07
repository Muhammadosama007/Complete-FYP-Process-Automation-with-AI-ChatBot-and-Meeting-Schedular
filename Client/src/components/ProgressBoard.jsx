import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const initialTasks = {
    "To Do": [],
    "In Progress": [],
    Done: [],
};

let idCounter = 1;

const ProgressBoard = ({ userRole }) => {
    const [columns, setColumns] = useState(() => {
        // Retrieve tasks from localStorage or fallback to initialTasks
        const savedColumns = localStorage.getItem("columns");
        return savedColumns ? JSON.parse(savedColumns) : initialTasks;
    });
    const [showModal, setShowModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [newTaskData, setNewTaskData] = useState({
        title: "",
        description: "",
        status: "To Do",
    });
    const [taskToEdit, setTaskToEdit] = useState(null);

    // Save columns to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("columns", JSON.stringify(columns));
    }, [columns]);

    const handleDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return;

        const sourceCol = source.droppableId;
        const destCol = destination.droppableId;

        const copiedTasks = { ...columns };
        const [movedTask] = copiedTasks[sourceCol].splice(source.index, 1);
        copiedTasks[destCol].splice(destination.index, 0, movedTask);

        setColumns(copiedTasks);
    };

    const handleInputChange = (e) => {
        setNewTaskData({ ...newTaskData, [e.target.name]: e.target.value });
    };

    const handleEditInputChange = (e) => {
        setTaskToEdit({ ...taskToEdit, [e.target.name]: e.target.value });
    };

    const addTask = () => {
        const { title, description, status } = newTaskData;
        if (!title.trim()) return;

        const newItem = {
            id: `task-${idCounter++}`,
            title,
            description,
        };

        setColumns((prev) => ({
            ...prev,
            [status]: [...prev[status], newItem],
        }));

        setNewTaskData({ title: "", description: "", status: "To Do" });
        setShowModal(false);
    };

    const updateTask = () => {
        const { title, description, status } = taskToEdit;
        setColumns((prev) => {
            const updatedColumns = { ...prev };
            Object.keys(updatedColumns).forEach((col) => {
                updatedColumns[col] = updatedColumns[col].map((task) =>
                    task.id === taskToEdit.id ? { ...task, title, description, status } : task
                );
            });
            return updatedColumns;
        });
        setTaskToEdit(null);
        setEditModal(false);
    };

    const deleteTask = (col, id) => {
        setColumns((prev) => ({
            ...prev,
            [col]: prev[col].filter((task) => task.id !== id),
        }));
    };

    const openEditModal = (task) => {
        setTaskToEdit(task);
        setEditModal(true);
    };

    return (
        <div className="p-4">
            {userRole !== "advisor" && (
                <div className="mb-4 flex justify-start">
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-blue-950 text-white px-4 py-2 rounded"
                    >
                        Add Task
                    </button>
                </div>
            )}

            {/* Add Task Modal */}
            {showModal && userRole !== "advisor" && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white p-6 rounded shadow w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Add New Task</h2>

                        <input
                            name="title"
                            value={newTaskData.title}
                            onChange={handleInputChange}
                            placeholder="Title"
                            className="w-full mb-3 p-2 border rounded"
                        />
                        <textarea
                            name="description"
                            value={newTaskData.description}
                            onChange={handleInputChange}
                            placeholder="Description"
                            className="w-full mb-3 p-2 border rounded"
                        />
                        <select
                            name="status"
                            value={newTaskData.status}
                            onChange={handleInputChange}
                            className="w-full mb-4 p-2 border rounded"
                        >
                            <option>To Do</option>
                            <option>In Progress</option>
                            <option>Done</option>
                        </select>

                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-300 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={addTask}
                                className="px-4 py-2 bg-blue-950 text-white rounded"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Task Modal */}
            {editModal && taskToEdit && userRole !== "advisor" && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white p-6 rounded shadow w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Edit Task</h2>

                        <input
                            name="title"
                            value={taskToEdit.title}
                            onChange={handleEditInputChange}
                            placeholder="Title"
                            className="w-full mb-3 p-2 border rounded"
                        />
                        <textarea
                            name="description"
                            value={taskToEdit.description}
                            onChange={handleEditInputChange}
                            placeholder="Description"
                            className="w-full mb-3 p-2 border rounded"
                        />
                        <select
                            name="status"
                            value={taskToEdit.status}
                            onChange={handleEditInputChange}
                            className="w-full mb-4 p-2 border rounded"
                        >
                            <option>To Do</option>
                            <option>In Progress</option>
                            <option>Done</option>
                        </select>

                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setEditModal(false)}
                                className="px-4 py-2 bg-gray-300 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={updateTask}
                                className="px-4 py-2 bg-blue-950 text-white rounded"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(columns).map(([status, tasks]) => (
                        <Droppable droppableId={status} key={status}>
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="bg-gray-100 p-4 rounded shadow min-h-[300px]"
                                >
                                    <h3 className="text-lg font-bold mb-2">{status}</h3>
                                    {tasks.map((task, index) => (
                                        <Draggable draggableId={task.id} index={index} key={task.id}>
                                            {(provided) => (
                                                <div
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    ref={provided.innerRef}
                                                    className="bg-white p-3 mb-2 rounded shadow border border-gray-300"
                                                >
                                                    <div className="flex justify-between items-center">
                                                        <div>
                                                            <div className="font-medium">{task.title}</div>
                                                            <div className="text-sm text-gray-600">{task.description}</div>
                                                        </div>
                                                        {userRole !== "advisor" && (
                                                            <div className="flex space-x-2">
                                                                <button
                                                                    onClick={() => openEditModal(task)}
                                                                    className="text-blue-600 text-sm"
                                                                >
                                                                    Edit
                                                                </button>
                                                                <button
                                                                    onClick={() => deleteTask(status, task.id)}
                                                                    className="text-red-600 text-sm"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
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
