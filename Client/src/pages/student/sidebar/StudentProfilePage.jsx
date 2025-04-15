import React from "react";
import UserProfile from "../../../components/UserProfile";

const StudentProfilePage = () => {
    const user = {
        name: "Muhammad Hannan Haider",
        regNo: "L1F21BSSE0375",
        faculty: "Faculty of Information Technology and Computer Science",
        program: "Software Engineering",
        email: "mhannan13606@gmail.com",
        phone: "0312-3456789",
        emergencyContact: "0300-1122334",

        vaccinated: true,
        vaccineCertificate: "/files/vaccine_certificate.pdf",
        signature: "/files/signature.png",
        presentAddress: "House #123, Street 4, Model Town, Lahore",
        permanentAddress: "Village XYZ, District ABC, Punjab",

        // Personal Details
        dob: "2003-01-02",
        gender: "Male",
        cnic: "3530254032499",
        domicile: "Punjab",
        nationality: "Pakistan",
        religion: "Islam",
        bloodGroup: "B+",

        // Family Details
        fatherName: "MUHAMMAD YASIN",
        fatherCnic: "3530220360697",
        guardianName: "-",
        guardianCnic: "-",
        maritalStatus: "Single",
    };

    return <UserProfile role="student" user={user} />;
};

export default StudentProfilePage;
