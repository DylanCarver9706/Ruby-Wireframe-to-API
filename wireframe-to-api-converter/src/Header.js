import React, { useState } from 'react';
import Table from './Table';
import JSZip from 'jszip';
import { Routes, Route } from "react-router-dom"
import { saveAs } from 'file-saver';

const Header = () => {
  const [tables, setTables] = useState([
    {
      id: 1,
      title: '',
      attributes: [],
      relationships: [],
    },
  ]);
  const [databaseName, setDatabaseName] = useState('');

  const handleDrag = (id, draggableData) => {
    const { x, y } = draggableData;
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === id ? { ...table, position: { x, y } } : table
      )
    );
  };

  const handleTableChange = (id, field, value) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === id ? { ...table, [field]: value } : table
      )
    );
  };

  const addTable = () => {
    const newTable = {
      id: tables.length + 1,
      title: '',
      attributes: [],
    };
    setTables((prevTables) => [...prevTables, newTable]);
  };

  const generateAPI = async () => {
    const lowercasedTables = tables.map((table) => ({
      id: table.id,
      title: table.title.toLowerCase(),
      attributes: table.attributes.map((attribute) => ({
        name: attribute.name.toLowerCase(),
        type: attribute.type.toLowerCase(),
      })),
      relationships: table.relationships,
    }));
  
    const apiData = {
      'database-name': databaseName,
      tables: lowercasedTables,
    };
  
    const tablesBlob = new Blob([JSON.stringify(apiData, null, 2)], {
      type: 'application/json',
    });
  
    const zip = new JSZip();
    zip.file('tables.txt', tablesBlob);
  
    const response = await fetch('/rails_api_script.exe');
    const exeBlob = await response.blob();
    zip.file('rails_api_script.exe', exeBlob);
  
    const zipBlob = await zip.generateAsync({ type: 'blob' });
  
    saveAs(zipBlob, 'rails-api.zip');
  };
  
  const logTables = () => {
    const data = {
      database_name: databaseName,
      tables: tables,
    };
    console.log(data);
  };

  const handleDatabaseNameChange = (event) => {
    setDatabaseName(event.target.value);
  };

  return (
    <div>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, backgroundColor: '#fff' }}>
        <input
          type="text"
          value={databaseName}
          placeholder="Database Name"
          onChange={handleDatabaseNameChange}
        />
        <button onClick={addTable}>Add Table</button>
        <button onClick={generateAPI}>Generate API</button>
        <button onClick={logTables}>Log Tables</button>
      </div>
      {tables.map((table) => (
        <Table
          key={table.id}
          id={table.id}
          title={table.title}
          attributes={table.attributes}
          handleDrag={handleDrag}
          handleTableChange={handleTableChange}
          tables={tables}
          setTables={setTables}
        />
      ))}
    </div>
  );
};

export default Header;
