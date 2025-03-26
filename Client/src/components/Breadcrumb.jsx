import React from "react";
import { HiHome } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = ({ bgColor }) => {
    const location = useLocation();
    const pathSegments = location.pathname.split("/").filter(segment => segment);

    return (
        <nav className="bg-white border-b border-gray-300 flex items-center space-x-2 text-gray-700 px-4 py-2">
            {/* Home Icon */}
            <Link to="/">
                <HiHome style={{ color: bgColor }} className="text-2xl" />
            </Link>
            <span className="text-black text-2xl">{">"}</span>

            {/* Dashboard (Static) */}
            <Link to="/" className="font-semibold text-xl hover:underline" style={{ color: bgColor }}>
                Dashboard
            </Link>

            {/* Dynamic Breadcrumb */}
            {pathSegments.map((segment, index) => {
                const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
                const isLast = index === pathSegments.length - 1;
                const formattedSegment = segment.replace(/-/g, " ").replace(/\b\w/g, char => char.toUpperCase());

                return (
                    <React.Fragment key={index}>
                        <span className="text-black text-2xl">{">"}</span>
                        {isLast ? (
                            <span className="font-semibold text-xl" style={{ color: bgColor }}>
                                {formattedSegment}
                            </span>
                        ) : (
                            <Link to={path} className="font-semibold text-xl hover:underline" style={{ color: bgColor }}>
                                {formattedSegment}
                            </Link>
                        )}
                    </React.Fragment>
                );
            })}
        </nav>
    );
};

export default Breadcrumb;
