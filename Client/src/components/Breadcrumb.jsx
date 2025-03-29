import React from "react";
import { HiHome } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = ({ bgColor }) => {
    const location = useLocation();
    const pathSegments = location.pathname.split("/").filter(segment => segment);
    const isDashboardOnly = location.pathname === "/dashboard";

    return (
        <nav className="bg-white border-b border-gray-300 flex items-center space-x-2 text-gray-700 px-4 py-2">
            {/* Home Icon */}
            <Link to="/dashboard" className="text-2xl">
                <HiHome style={{ color: bgColor }} />
            </Link>

            {/* Only show ">" if additional breadcrumbs exist */}
            {!isDashboardOnly && <span className="text-black text-2xl">{">"}</span>}

            {/* Dashboard Link (Show only if additional paths exist) */}
            {!isDashboardOnly && (
                <Link to="/dashboard" className="font-semibold text-xl hover:underline" style={{ color: bgColor }}>
                    Dashboard
                </Link>
            )}

            {/* Dynamic Breadcrumbs */}
            {pathSegments.map((segment, index) => {
                const path = `/dashboard/${pathSegments.slice(0, index + 1).join("/")}`;
                const formattedSegment = segment.replace(/-/g, " ").replace(/\b\w/g, char => char.toUpperCase());

                return (
                    <React.Fragment key={index}>
                        <span className="text-black text-2xl">{">"}</span>
                        <Link to={path} className="font-semibold text-xl hover:underline" style={{ color: bgColor }}>
                            {formattedSegment}
                        </Link>
                    </React.Fragment>
                );
            })}
        </nav>
    );
};

export default Breadcrumb;
