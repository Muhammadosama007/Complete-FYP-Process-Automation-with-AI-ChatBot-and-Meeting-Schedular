import React from "react";
import { HiHome } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

const bgColor = "#1F3F6A";

const Breadcrumb = () => {
    const location = useLocation();
    const pathSegments = location.pathname.split("/").filter(segment => segment);
    const isDashboardOnly = location.pathname === "/dashboard";

    return (
        <nav
            className="flex px-5 py-3 text-white border-b border-gray-300 dark:bg-white dark:border-gray-300"
            aria-label="Breadcrumb"
        >
            <ol className="inline-flex items-center rtl:space-x-reverse">
                <li className="inline-flex items-center">
                    <Link
                        to="/dashboard"
                        className="inline-flex items-center text-lg font-semibold hover:text-blue-600 dark:text-white dark:hover:text-white"
                        style={{ color: bgColor }}
                    >
                        <HiHome className="w-5 h-5 me-2.5" />
                        Dashboard
                    </Link>
                </li>

                {!isDashboardOnly && (
                    <>

                        {pathSegments.map((segment, index) => {
                            const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
                            const formattedSegment = segment
                                .replace(/-/g, " ")
                                .replace(/\b\w/g, char => char.toUpperCase());

                            return (
                                <li key={index}>
                                    <div className="flex items-center">
                                        <svg
                                            className="rtl:rotate-180 w-3 h-3 mx-1 text-white"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 6 10"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="m1 9 4-4-4-4"
                                                style={{ color: bgColor }}
                                            />
                                        </svg>
                                        {location.pathname === path ? (
                                            <span
                                                className="ms-1 text-lg font-semibold  dark:text-white"
                                                style={{ color: bgColor }}
                                            >
                                                {formattedSegment}
                                            </span>
                                        ) : (
                                            <Link
                                                to={path}
                                                className="ms-1 text-lg font-semibold hover:underline  "
                                            >
                                                {formattedSegment}
                                            </Link>
                                        )}
                                    </div>
                                </li>
                            );
                        })}
                    </>
                )}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
