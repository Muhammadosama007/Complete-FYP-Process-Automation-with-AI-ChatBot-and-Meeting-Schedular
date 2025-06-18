import React, { useState } from "react";
import {
    FaEnvelope,
    FaPhone,
    FaUserEdit,
    FaBirthdayCake,
    FaIdCard,
    FaUserFriends,
    FaMapMarkerAlt,
    FaFlag,
    FaPrayingHands,
    FaTint,
    FaHome,
} from "react-icons/fa";
import Breadcrumb from "./Breadcrumb";
import background from "../assets/images/bg.jpg";

const bgColor = "#1F3F6A";

const UserProfile = ({ role = "student", user }) => {
    const storedUser = JSON.parse(localStorage.getItem("googleUser"));
    const profilePic = storedUser?.image || background;
    const [activeTab, setActiveTab] = useState("about");

    const renderRoleInfo = () => {
        switch (role) {
            case "student":
                return (
                    <>
                        <p className="text-xl font-semibold">Undergraduate</p>
                        <p>Bachelor of Science ({user.program})</p>
                        <p className="mt-2">8th Semester</p>
                    </>
                );
            case "advisor":
                return (
                    <>
                        <p className="text-xl font-semibold">Faculty Advisor</p>
                        <p>{user.department}</p>
                        <p className="mt-2">{user.designation}</p>
                    </>
                );
            case "po":
                return (
                    <>
                        <p className="text-xl font-semibold">Program Officer</p>
                        <p>{user.department}</p>
                        <p className="mt-2">{user.office}</p>
                    </>
                );
            default:
                return null;
        }
    };

    const renderBioData = () => {
        if (role === "student") {
            return (
                <div className="flex flex-col lg:flex-row gap-8" >
                    <div className="flex-1">
                        <h2 className="text-lg font-light mb-4" style={{ color: bgColor }}>Personal Detail</h2>
                        <div className="space-y-4 text-sm">
                            <div className="flex items-center">
                                <FaBirthdayCake className="text-blue-900 mr-3" />
                                <div>
                                    <p className="font-semibold">{user.dob || "-"}</p>
                                    <p className="text-gray-500">Date of Birth</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <FaUserFriends className="text-blue-900 mr-3" />
                                <div>
                                    <p className="font-semibold">{user.gender || "-"}</p>
                                    <p className="text-gray-500">Gender</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <FaIdCard className="text-blue-900 mr-3" />
                                <div>
                                    <p className="font-semibold">{user.cnic || "-"}</p>
                                    <p className="text-gray-500">CNIC</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <FaMapMarkerAlt className="text-blue-900 mr-3" />
                                <div>
                                    <p className="font-semibold">{user.domicile || "-"}</p>
                                    <p className="text-gray-500">Domicile</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <FaFlag className="text-blue-900 mr-3" />
                                <div>
                                    <p className="font-semibold">{user.nationality || "Pakistan"}</p>
                                    <p className="text-gray-500">Nationality</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <FaPrayingHands className="text-blue-900 mr-3" />
                                <div>
                                    <p className="font-semibold">{user.religion || "Islam"}</p>
                                    <p className="text-gray-500">Religion</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <FaTint className="text-blue-900 mr-3" />
                                <div>
                                    <p className="font-semibold">{user.bloodGroup || "-"}</p>
                                    <p className="text-gray-500">Blood Group</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1">
                        <h2 className="text-lg font-light mb-4" style={{ color: bgColor }}>Family Detail</h2>
                        <div className="space-y-4 text-sm">
                            <div>
                                <p className="font-semibold">{user.fatherName || "-"}</p>
                                <p className="text-gray-500">Father Name</p>
                            </div>
                            <div>
                                <p className="font-semibold">{user.fatherCnic || "-"}</p>
                                <p className="text-gray-500">Father CNIC</p>
                            </div>
                            <div>
                                <p className="font-semibold">{user.guardianName || "-"}</p>
                                <p className="text-gray-500">Guardian Name</p>
                            </div>
                            <div>
                                <p className="font-semibold">{user.guardianCnic || "-"}</p>
                                <p className="text-gray-500">Guardian CNIC</p>
                            </div>
                            <div>
                                <p className="font-semibold">{user.maritalStatus || "-"}</p>
                                <p className="text-gray-500">Marital Status</p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return <p className="text-gray-600">Bio Data for {role} not available yet.</p>;
    };

    return (
        <div>
            <div className="fixed mt-14 w-full shadow-md bg-white z-50">
                <Breadcrumb />
            </div>

            <div className="pt-32 px-6">
                <div
                    style={{ background: bgColor }}
                    className="text-white rounded-md p-6 flex flex-col md:flex-row md:items-center justify-between"
                >
                    <div className="flex items-center space-x-6">
                        <img src={profilePic} alt="Profile" className="w-24 h-24 rounded-full" />
                        <div>
                            <p className="text-xl font-bold">{user.name}</p>
                            <p>{user.regNo || user.staffId}</p>
                            <p>{user.faculty || user.department}</p>
                            {renderRoleInfo()}
                        </div>
                    </div>
                    <button className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full mt-4 md:mt-0">
                        <FaUserEdit />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b mt-4">
                    <button
                        className={`px-4 py-2 font-semibold ${activeTab === "about" ? "border-b-2 border-blue-900 text-blue-900" : "text-gray-500 hover:text-blue-900"}`}
                        onClick={() => setActiveTab("about")}
                    >
                        ABOUT
                    </button>
                    <button
                        className={`px-4 py-2 font-semibold ${activeTab === "bio" ? "border-b-2 border-blue-900 text-blue-900" : "text-gray-500 hover:text-blue-900"}`}
                        onClick={() => setActiveTab("bio")}
                    >
                        BIO DATA
                    </button>
                </div>

                {/* Tab Content */}
                <div className="mt-6">
                    {activeTab === "about" ? (
                        <div className="flex flex-col lg:flex-row gap-4">
                            {/* Contact Information */}
                            <div className="flex-1 bg-white shadow-md p-6 rounded-md" style={{ color: bgColor }}>
                                <h2 className="text-lg font-light mb-4">Contact Information</h2>

                                <div className="space-y-4 text-sm">
                                    <div className="flex items-center">
                                        <FaEnvelope className="text-blue-900 mr-3" />
                                        <div>
                                            <p className="font-semibold">{user.email}</p>
                                            <p className="text-gray-500">Email</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <FaPhone className="text-blue-900 mr-3" />
                                        <div>
                                            <p className="font-semibold">{user.phone || "-"}</p>
                                            <p className="text-gray-500">Phone</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <FaUserFriends className="text-blue-900 mr-3" />
                                        <div>
                                            <p className="font-semibold">{user.emergencyContact || "-"}</p>
                                            <p className="text-gray-500">Emergency Contact</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="flex items-start">
                                        <FaHome className="text-blue-900 mr-3 mt-1" />
                                        <div>
                                            <p className="font-semibold whitespace-pre-line">{user.presentAddress || "-"}</p>
                                            <p className="text-gray-500">Present Address</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <FaHome className="text-blue-900 mr-3 mt-1" />
                                        <div>
                                            <p className="font-semibold whitespace-pre-line">{user.permanentAddress || "-"}</p>
                                            <p className="text-gray-500">Permanent Address</p>
                                        </div>
                                    </div>
                                    <hr />
                                    {user.signature && (
                                        <div className="flex items-center">
                                            <FaIdCard className="text-blue-900 mr-3" />
                                            <div>
                                                <a
                                                    href={user.signature}
                                                    download
                                                    className="font-semibold text-blue-800 hover:underline"
                                                >
                                                    Download Signature File
                                                </a>
                                                <p className="text-gray-500">Signature</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Vaccine Info */}
                            <div className="flex-1 bg-white shadow-md p-6 rounded-md" style={{ color: bgColor }}>
                                <h2 className="text-lg font-light mb-4">Vaccine Certification Information</h2>
                                <p>
                                    Are you COVID-19 vaccinated?{" "}
                                    <strong>{user.vaccinated ? "Yes" : "No"}</strong>
                                </p>
                                <hr className="my-4" />
                                {user.vaccineCertificate && (
                                    <div className="mb-2">
                                        <a
                                            href={user.vaccineCertificate}
                                            download
                                            className="text-blue-900 hover:underline font-medium flex items-center gap-1"
                                        >
                                            Download COVID-19 Certificate
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-4 h-4"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M5 20h14v-2H5v2zm7-18l-6 6h4v6h4v-6h4l-6-6z" />
                                            </svg>
                                        </a>
                                    </div>
                                )}
                                <a
                                    href="https://nims.nadra.gov.pk"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-900 hover:underline"
                                >
                                    Get Vaccination Certificate (NADRA)
                                </a>
                            </div>
                        </div>
                    ) : (
                        renderBioData()
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
