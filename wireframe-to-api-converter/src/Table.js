import React, { useState, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';

const Table = ({ id, initialTitle, position, handleDrag, tables, setTables }) => {
  const [title, setTitle] = useState(initialTitle);
  const [relationshipType, setRelationshipType] = useState('');
  const [relatedTable, setRelatedTable] = useState('');
  const [throughTable, setThroughTable] = useState('');
  const [relatedAttribute, setRelatedAttribute] = useState('');
  const [throughAttribute, setThroughAttribute] = useState('');
  const [attributes, setAttributes] = useState([]);
  const [relationships, setRelationships] = useState([]);
  const [newAttribute, setNewAttribute] = useState('');
  const [selectedType, setSelectedType] = useState('Data Type');
  const initialTablesRef = useRef(tables);

  // This useEffect will run when the component mounts and store the initial tables prop
  useEffect(() => {
    initialTablesRef.current = tables;
  }, [tables]);

  useEffect(() => {
    // Update the tables array when the table is modified
    if (tables && tables !== initialTablesRef.current) {
      updateTableData();
    }
  }, [title, attributes, relationships, tables]);

  const updateTableData = () => {
    const tableData = {
      id: id,
      title: title,
      attributes: attributes,
      relationships: relationships.map((relationship) =>
        relationship.type === 'has_many_through'
          ? `has_many :${relationship.relatedTable}, through: :${relationship.throughTable}`
          : `${relationship.type} :${relationship.relatedTable}`
      ),
    };
    updateTablesArray(tableData);
  };

  const updateTablesArray = (tableData) => {
    // Find the index of the table in the tables array
    const tableIndex = tables.findIndex((table) => table.id === tableData.id);

    if (tableIndex !== -1) {
      // If the table exists in the tables array, update it
      const updatedTables = [...tables];
      updatedTables[tableIndex] = tableData;
      setTables(updatedTables);
    } else {
      // If the table doesn't exist in the tables array, add it
      setTables([...tables, tableData]);
    }
  };

  const handleAddAttribute = () => {
    if (newAttribute.trim() !== '') {
      const newAttributeObj = {
        name: newAttribute,
        type: selectedType.toLowerCase(),
      };
      setAttributes([...attributes, newAttributeObj]);
      setNewAttribute('');
      setSelectedType('Data Type');
    }
  };

  const handleAddRelationship = () => {
    if (
      relatedTable.trim() !== '' &&
      relationshipType.trim() !== '' &&
      (relationshipType !== 'has_many_through' || throughTable.trim() !== '')
    ) {
      const newRelationship = {
        type: relationshipType,
        relatedTable: relatedTable.toLowerCase(),
        throughTable: throughTable.toLowerCase(),
      };
      setRelationships([...relationships, newRelationship]);
      setRelationshipType('');
      setRelatedTable('');
      setThroughTable('');
    }
  };

  const handleAttributeChange = (index, newValue) => {
    const updatedAttributes = [...attributes];
    updatedAttributes[index].name = newValue.toLowerCase();
    setAttributes(updatedAttributes);
  };

  const handleTypeChange = (index, newType) => {
    const updatedAttributes = [...attributes];
    updatedAttributes[index].type = newType;
    setAttributes(updatedAttributes);
  };

  const handleTitleChange = (event) => {
    const newTitle = event.target.value;
    setTitle(newTitle.toLowerCase());
  };

  const handleRelationshipTypeChange = (event) => {
    const type = event.target.value;
    setRelationshipType(type);
    if (type === 'belongs_to') {
      setRelatedTable('');
      setThroughTable('');
      setRelatedAttribute('');
      setThroughAttribute('');
    }
  };

  const handleRelatedTableChange = (event) => {
    const table = event.target.value;
    setRelatedTable(table);
  };

  const handleThroughTableChange = (event) => {
    const table = event.target.value;
    setThroughTable(table);
  };

  return (
    <Draggable
      position={position}
      onStop={(e, draggableData) => handleDrag(id, draggableData)}
    >
      <div
        style={{
          border: '1px solid #ccc',
          padding: '8px',
          margin: '8px',
          backgroundColor: '#fff',
          width: 'fit-content'
        }}
      >
        <h3>Table Title</h3>
        <p>Make titles singular to prevent issues with API. Ruby with pluralize</p>
          <input
            type="text"
            value={title}
            placeholder="Table Title"
            onChange={handleTitleChange}
          />
          <select value={relationshipType} onChange={handleRelationshipTypeChange}>
            <option value="">Select Relationship Type</option>
            <option value="belongs_to">Belongs To</option>
            <option value="has_many">Has Many</option>
            <option value="has_many_through">Has Many, through:</option>
          </select>
          {relationshipType !== '' && (
            <>
              <select value={relatedTable} onChange={handleRelatedTableChange}>
                <option value="">Select Related Table</option>
                {tables
                  .filter((table) => table.id !== id)
                  .map((table) => (
                    <option key={table.id} value={table.title}>
                      {table.title}
                    </option>
                  ))}
              </select>
              {relationshipType === 'has_many_through' && (
                <>
                  through
                  <select value={throughTable} onChange={handleThroughTableChange}>
                    <option value="">Select Through Table</option>
                    {tables
                      .filter(
                        (table) => table.id !== id && table.title !== relatedTable
                      )
                      .map((table) => (
                        <option key={table.id} value={table.title}>
                          {table.title}
                        </option>
                      ))}
                  </select>
                </>
              )}
            </>
          )}
          <button onClick={handleAddRelationship}>Add Relationship</button>
          <h3>Columns</h3>
        <ul>
          {attributes.map((attribute, index) => (
            <li key={index}>
              <input
                type="text"
                value={attribute.name}
                onChange={(e) => handleAttributeChange(index, e.target.value)}
              />
              <select
                value={attribute.type}
                onChange={(e) => handleTypeChange(index, e.target.value)}
              >
                <option value="data type">Data Type</option>
                <option value="integer">Integer</option>
                <option value="boolean">Boolean</option>
                <option value="float">Float</option>
                <option value="string">String</option>
              </select>
            </li>
          ))}
        </ul>
        <div>
          <input
            type="text"
            value={newAttribute}
            onChange={(e) => setNewAttribute(e.target.value)}
          />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="Data Type">Data Type</option>
            <option value="Integer">Integer</option>
            <option value="Boolean">Boolean</option>
            <option value="Float">Float</option>
            <option value="String">String</option>
          </select>
          <button onClick={handleAddAttribute}>Add Attribute</button>
        </div>
        {relationships.length > 0 && (
  <div>
    <h3>Relationships</h3>
    <ul>
      {relationships.map((relationship, index) => (
        <li key={index}>
          {relationship.type === 'has_many_through'
            ? `has_many :${relationship.relatedTable}, through: :${relationship.throughTable}`
            : `${relationship.type} :${relationship.relatedTable}`}
        </li>
      ))}
    </ul>
  </div>
)}
      </div>
    </Draggable>
  );
};

export default Table;

