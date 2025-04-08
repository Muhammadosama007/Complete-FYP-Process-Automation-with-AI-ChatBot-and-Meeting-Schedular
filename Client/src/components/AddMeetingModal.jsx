import React from "react";

const AddMeetingModal = ({ meetingData, handleChange, handleSave, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 border border-gray-300">
                <h2 className="text-xl font-bold mb-4">
                    {meetingData.id ? "Edit Meeting" : "Add Meeting"}
                </h2>

                <input
                    type="date"
                    name="date"
                    value={meetingData.date}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mb-3"
                />
                
                <input
                    type="time"
                    name="time"
                    value={meetingData.time}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mb-3"
                />
                <input
                    type="text"
                    name="agenda"
                    value={meetingData.agenda}
                    onChange={handleChange}
                    placeholder="Agenda"
                    className="w-full p-2 border border-gray-300 rounded mb-3"
                />

                <div className="mb-3">
                    <p className="font-semibold mb-2">Meeting Type:</p>
                    <label className="inline-flex items-center mr-4">
                        <input
                            type="radio"
                            name="meetingType"
                            value="In-Person"
                            checked={meetingData.meetingType === "In-Person"}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        In-Person
                    </label>
                    <label className="inline-flex items-center">
                        <input
                            type="radio"
                            name="meetingType"
                            value="Online"
                            checked={meetingData.meetingType === "Online"}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        Online
                    </label>
                </div>

                {meetingData.meetingType === "In-Person" && (
                    <input
                        type="text"
                        name="roomNumber"
                        value={meetingData.roomNumber}
                        onChange={handleChange}
                        placeholder="Room Number"
                        className="w-full p-2 border border-gray-300 rounded mb-3"
                    />
                )}

                {meetingData.meetingType === "Online" && (
                    <div className="p-2 bg-gray-100 border border-gray-300 rounded mb-3 text-center text-gray-600">
                        Online Meeting Link (Coming Soon)
                    </div>
                )}

                <div className="flex justify-end space-x-2 mt-4">
                    <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition" onClick={onClose}>Cancel</button>
                    <button className="px-4 py-2 bg-blue-950 text-white rounded hover:bg-blue-800 transition" onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default AddMeetingModal;
