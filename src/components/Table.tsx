import React, { useEffect, useState } from 'react';
import axios from 'axios';
interface TableData {
  ID_Nation: string;
  Nation: string;
  ID_Year: number;
  Year: string;
  Population: number;
}
const  TableCom = () => {
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [sortConfig,setSortConfig] =useState({
    key:"",
    direction:'ascending'
  });
  type sortType = keyof TableData;
  const BASE_URL = process.env.REACT_APP_BASE_URL;
const fetchData = async () => {
try{
const res = await axios.get(`${BASE_URL}`);
const data = await res.data.data;
console.log(data)
setTableData(data);
}
catch(error){
alert(error)
}
}
const handleSort = (key: sortType) => {
  
  let direction = "ascending";
  if (sortConfig.key === key && sortConfig.direction === "ascending"){
    direction = "descending";
  }
  else if(sortConfig.key === key && sortConfig.direction === "descending"){
    direction = "ascending";
  }
  setSortConfig({key,direction});
  const sortHandle = [...tableData].sort((a,b) => {
    if(a[key] < b[key]){
      return direction === "ascending" ? 1 : -1;
    }
    else if(a[key] > b[key]){
      return direction === "ascending" ? -1 : 1; 
    }
    return 0;
  })
  setTableData(sortHandle);
}
  useEffect(() => {
    fetchData();
  }, [])
  return (
    <>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("Nation")} >Nation {(sortConfig.direction === 'ascending' && sortConfig.key === "Nation") ? ' ↑' : ' ↓' } </th>
            <th  onClick={() => handleSort("Year")} >Year {(sortConfig.direction === 'ascending' && sortConfig.key === "Year") ? ' ↑' : ' ↓' } </th>
            <th onClick={() => handleSort("Population")}>Population  {(sortConfig.direction === 'ascending' && sortConfig.key === "Population") ? ' ↑' : ' ↓' }</th>
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

export default TableCom;