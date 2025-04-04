const DataTable = ({ columns, data, noDataMessage = "No data available" }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
                <thead>
                    <tr className="bg-[#1F3F6A] text-white">
                        {columns.map((column, index) => (
                            <th key={index} className="border border-gray-300 px-4 py-3 text-left">
                                {column}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data && data.length > 0 ? (
                        data.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                    <td
                                        key={cellIndex}
                                        className="border border-gray-300 px-4 py-3 text-gray-700"
                                    >
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length} className="border border-gray-300 px-4 py-3 text-center text-gray-700">
                                {noDataMessage}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;
