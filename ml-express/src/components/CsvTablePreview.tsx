import React, { useState } from 'react';

interface CsvTableProps {
  data: any[];
}

const CsvTable: React.FC<CsvTableProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const rowsPerPage = 10;

  const headers = Object.keys(data[0]);
  const totalColumns = headers.length;
  const totalPages = Math.ceil(totalColumns / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const columnsToDisplay = headers.slice(startIndex, endIndex);

  const startIndexRows = (currentPage - 1) * rowsPerPage;
  const endIndexRows = startIndexRows + rowsPerPage;
  const rowsToDisplay = data.slice(startIndexRows, endIndexRows);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const displayPageChangeBtn = () => {
    if (totalPages > 1) {
      return (
        <div className='text-center' style={{ marginTop: '10px' }}>
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Previous Page
          </button>
          <span style={{ margin: '0 10px' }}>Page {currentPage} of {totalPages}</span>
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Next Page
          </button>
        </div>
      )
    }
  }

  return (
    <div>
      <div className='mb-4 text-lg font-bold'>Preview of the First 10 Rows of Data:</div>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            {columnsToDisplay.map((header) => (
              <th key={header} style={{ border: '1px solid #ddd', padding: '8px' }}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rowsToDisplay.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columnsToDisplay.map((column) => (
                <td key={column} style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {row[column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {displayPageChangeBtn()}
    </div>
  );
};

export default CsvTable;