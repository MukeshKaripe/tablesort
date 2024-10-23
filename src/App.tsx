import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
interface TableData {
  ID_Nation: string;
  Nation: string;
  ID_Year: number;
  Year: string;
  Population: number;
}
function App() {
  const [tableData, setTableData] = useState<TableData[]>([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const fetchData = async () => {
    try {
      const res = await axios(`${BASE_URL}`)
      const data = await res.data.data
      setTableData(data);
      console.log(data);
      

    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    fetchData();
  }, [])
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Nation</th>
            <th>Year</th>
            <th>Population</th>
          </tr>
        </thead>
        <tbody>
          
        {tableData.length > 0 ? (
            tableData.map((item, index) => (
              <tr key={index}>
                <td>{item.Nation}</td>
                <td>{item.Year}</td>
                <td>{item.Population}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>Loading...</td>
            </tr>
          )}

          
        </tbody>
      </table>
    </>
  );
}

export default App;
