import React from 'react';

interface CsvTableProps {
  data: any[];
}

const CsvTablePreview: React.FC<CsvTableProps> = ({ data }) => {
  if (data.length === 0) {
    return <p>No data to display</p>;
  }

  const headers = Object.keys(data[0]);

  // Display only the first 10 rows
  const rowsToDisplay = data.slice(0, 10);

  return (
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header} style={{ border: '1px solid #ddd', padding: '8px' }}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rowsToDisplay.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {headers.map((header) => (
              <td key={header} style={{ border: '1px solid #ddd', padding: '8px' }}>
                {row[header]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CsvTablePreview;