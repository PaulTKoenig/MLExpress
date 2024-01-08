import React, { useState } from 'react';

interface CsvTableProps {
  data: any[];
}

const CsvTableFull: React.FC<CsvTableProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 15;

  if (data.length === 0) {
    return <p>No data to display</p>;
  }

  const headers = Object.keys(data[0]);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const displayPageChangeBtn = () => {
    if (totalPages > 1) {
      return (
        <div className='text-center p-8'>
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous Page
          </button>
          <span style={{ margin: '0 10px' }}>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next Page
          </button>
        </div>
      )
    }
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="border-collapse w-auto">
          <thead>
            <tr>
              {headers.map((header) => (
                <th className='whitespace-nowrap' key={header} style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {headers.map((header) => (
                  <td className='whitespace-nowrap' key={header} style={{ border: '1px solid #ddd', padding: '8px' }}>
                    {row[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {displayPageChangeBtn()}
    </>
  );
};

export default CsvTableFull;