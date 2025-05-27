import React from "react";
import { HiHome } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

const bgColor = "#1F3F6A";

const Breadcrumb = ({ exclude = [] }) => {
    const location = useLocation();
    const rawSegments = location.pathname.split("/").filter(Boolean);
    const userRole = rawSegments[0] || "";
    const pathSegments = rawSegments.slice(1).filter(segment =>
        segment.toLowerCase() !== "dashboard" &&
        !exclude.map(e => e.toLowerCase()).includes(segment.toLowerCase())
    );
    const breadcrumbPaths = pathSegments.map((segment, index) => {
        const path = `/${userRole}/dashboard/` + pathSegments.slice(0, index + 1).join("/");
        const label = segment
            .replace(/-/g, " ")
            .replace(/\b\w/g, char => char.toUpperCase());
        return { path, label };
    });

    return (
        <nav
            className="w-full overflow-x-auto whitespace-nowrap px-5 py-3 border-b border-gray-300 dark:bg-white dark:border-gray-300"
            aria-label="Breadcrumb"
            style={{ color: bgColor }}
        >
            <ol className="flex items-center space-x-2 min-w-max">
                <li className="flex items-center shrink-0">
                    <Link
                        to={`/${userRole}/dashboard`}
                        className="flex items-center text-lg font-semibold hover:text-blue-600 dark:text-white dark:hover:text-white"
                        style={{ color: bgColor }}
                    >
                        <HiHome className="w-5 h-5 me-2.5" />
                        Dashboard
                    </Link>
                </li>

                {/* Dynamic Breadcrumbs */}
                {breadcrumbPaths.map((crumb, index) => (
                    <li key={index} className="flex items-center shrink-0">
                        <svg
                            className="w-3 h-3 mx-1"
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
                                d="M1 9L5 5 1 1"
                                style={{ color: bgColor }}
                            />
                        </svg>
                        {index === breadcrumbPaths.length - 1 ? (
                            <span
                                className="text-lg font-semibold dark:text-white"
                                style={{ color: bgColor }}
                            >
                                {crumb.label}
                            </span>
                        ) : (
                            <Link
                                to={crumb.path}
                                className="text-lg font-semibold hover:underline"
                                style={{ color: bgColor }}
                            >
                                {crumb.label}
                            </Link>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
