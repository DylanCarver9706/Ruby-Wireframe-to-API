import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const WireFrameMaker = () => {
  const [databaseName, setDatabaseName] = useState("");
  const [relationshipType, setRelationshipType] = useState("");
  const [relatedTable, setRelatedTable] = useState("");
  const [throughTable, setThroughTable] = useState("");
  const [tables, setTables] = useState([
    {
      id: 1,
      title: "",
      attributes: [],
      relationships: [],
      position: { x: 0, y: 0 },
      relationshipType: "",
      relatedTable: "",
      throughTable: "",
    },
  ]);

  // This useEffect will run when the component mounts and store the initial tables state
  useEffect(() => {
    initialTablesRef.current = tables;
  }, [tables]);

  useEffect(() => {
    // Update the tables array when the table is modified
    if (tables && tables !== initialTablesRef.current) {
      updateTableData();
    }
  }, [tables]);

  const initialTablesRef = useRef([]);

  const handleDrag = (id, draggableData) => {
    const { x, y } = draggableData;
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === id ? { ...table, position: { x, y } } : table
      )
    );
  };

  const addTable = () => {
    const newTable = {
      id: tables.length + 1,
      title: "",
      attributes: [],
      relationships: [],
      position: { x: 0, y: 0 },
      relationshipType: "",
      relatedTable: "",
      throughTable: "",
    };
    setTables((prevTables) => [...prevTables, newTable]);
  };
  const updateTableData = () => {
    const updatedTables = tables.map((table) => {
      return {
        id: table.id,
        title: table.title.toLowerCase(),
        attributes: table.attributes.map((attribute) => ({
          name: attribute.name.toLowerCase(),
          type: attribute.type.toLowerCase(),
        })),
        relationships: table.relationships.map((relationship) => relationship),
        position: table.position,
      };
    });
    setTables(updatedTables);
  };

  const generateAPI = async () => {
    const apiData = {
      "database-name": databaseName,
      tables: tables,
    };

    const tablesBlob = new Blob([JSON.stringify(apiData, null, 2)], {
      type: "application/json",
    });

    const zip = new JSZip();
    zip.file("tables.txt", tablesBlob);

    const response = await fetch("/rails_api_script.exe");
    const exeBlob = await response.blob();
    zip.file("rails_api_script.exe", exeBlob);

    const zipBlob = await zip.generateAsync({ type: "blob" });

    saveAs(zipBlob, "rails-api.zip");
  };

  const logTables = () => {
    const data = {
      "database-name": databaseName,
      tables: tables.map((table) => {
        return {
          id: table.id,
          title: table.title,
          attributes: table.attributes.map((attribute) => {
            return {
              name: attribute.name,
              type: attribute.type,
            };
          }),
          relationships: table.relationships,
        };
      }),
    };
    console.log(JSON.stringify(data, null, 2));
  };

  const handleAttributeChange = (tableId, attributeIndex, newValue) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === tableId
          ? {
              ...table,
              attributes: table.attributes.map((attribute, index) =>
                index === attributeIndex
                  ? { ...attribute, name: newValue }
                  : attribute
              ),
            }
          : table
      )
    );
  };

  const handleTypeChange = (tableId, attributeIndex, newType) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === tableId
          ? {
              ...table,
              attributes: table.attributes.map((attribute, index) =>
                index === attributeIndex
                  ? { ...attribute, type: newType }
                  : attribute
              ),
            }
          : table
      )
    );
  };

  const handleTitleChange = (tableId, event) => {
    const newTitle = event.target.value;
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === tableId ? { ...table, title: newTitle } : table
      )
    );
  };

  const handleRelationshipTypeChange = (tableId, event) => {
    const type = event.target.value;
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === tableId
          ? {
              ...table,
              relationshipType: type,
              relatedTable: "",
              throughTable: "",
            }
          : table
      )
    );
  };

  const handleRelatedTableChange = (tableId, event) => {
    const tableTitle = event.target.value;
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === tableId ? { ...table, relatedTable: tableTitle } : table
      )
    );
  };

  const handleThroughTableChange = (tableId, event) => {
    const tableTitle = event.target.value;
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === tableId ? { ...table, throughTable: tableTitle } : table
      )
    );
  };

  const handleAddAttribute = (tableId) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === tableId
          ? {
              ...table,
              attributes: [
                ...table.attributes,
                {
                  name:
                    table.newAttribute.trim() !== "" ? table.newAttribute : "",
                  type: table.selectedType.toLowerCase(),
                },
              ],
              newAttribute: "",
              selectedType: "Data Type",
            }
          : table
      )
    );
  };

  const handleAddRelationship = (tableId) => {
    setTables((prevTables) =>
      prevTables.map((table) => {
        if (table.id !== tableId) return table;

        if (
          table.relatedTable.trim() !== "" &&
          table.relationshipType.trim() !== "" &&
          (table.relationshipType !== "has_many_through" ||
            table.throughTable.trim() !== "")
        ) {
          const relationshipString =
            table.relationshipType === "has_many_through"
              ? `has_many :${table.relatedTable}, through: :${table.throughTable}`
              : `${table.relationshipType} :${table.relatedTable}`;

          return {
            ...table,
            relationships: [...table.relationships, relationshipString],
            relationshipType: "",
            relatedTable: "",
            throughTable: "",
          };
        }
        return table;
      })
    );
  };

  const renderRelationships = (relationships) => {
    return relationships.map((relationship, index) => {
      const parts = relationship.split(":").map((part) => part.trim());
      const type = parts[0];
      const relatedTable = parts[1];
      const throughTable = parts[2];

      return (
        <li key={index}>
          {throughTable
            ? `${type} :${relatedTable}, through: :${throughTable}`
            : `${type} :${relatedTable}`}
        </li>
      );
    });
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={databaseName}
          placeholder="Database Name"
          onChange={(event) => setDatabaseName(event.target.value)}
        />
        <button onClick={addTable}>Add Table</button>
        <button onClick={generateAPI}>Generate API</button>
        <button onClick={logTables}>Log Tables</button>
      </div>
      {tables.map((table) => (
        <Draggable
          key={table.id}
          position={table.position}
          onStop={(e, draggableData) => handleDrag(table.id, draggableData)}
        >
          <div
            style={{
              border: "1px solid #ccc",
              padding: "8px",
              margin: "8px",
              backgroundColor: "#fff",
              width: "fit-content",
            }}
          >
            <h3>Table Title</h3>
            <p>
              *Make titles singular to prevent issues with API. Ruby with
              pluralize*
            </p>
            <input
              type="text"
              value={table.title}
              placeholder="Table Title"
              onChange={(event) => handleTitleChange(table.id, event)}
            />
            <select
              value={table.relationshipType}
              onChange={(event) =>
                handleRelationshipTypeChange(table.id, event)
              }
            >
              <option value="">Select Relationship Type</option>
              <option value="belongs_to">Belongs To</option>
              <option value="has_many">Has Many</option>
              <option value="has_many_through">Has Many, through:</option>
            </select>
            {table.relationshipType !== "" && (
              <>
                <select
                  value={table.relatedTable}
                  onChange={(event) =>
                    handleRelatedTableChange(table.id, event)
                  }
                >
                  <option value="">Select Related Table</option>
                  {tables
                    .filter((t) => t.id !== table.id)
                    .map((t) => (
                      <option key={t.id} value={t.title}>
                        {t.title}
                      </option>
                    ))}
                </select>
                {table.relationshipType === "has_many_through" && (
                  <>
                    through
                    <select
                      value={table.throughTable}
                      onChange={(event) =>
                        handleThroughTableChange(table.id, event)
                      }
                    >
                      <option value="">Select Through Table</option>
                      {tables
                        .filter(
                          (t) => t.id !== table.id && t.title !== relatedTable
                        )
                        .map((t) => (
                          <option key={t.id} value={t.title}>
                            {t.title}
                          </option>
                        ))}
                    </select>
                  </>
                )}
                <button onClick={() => handleAddRelationship(table.id)}>
                  Add Relationship
                </button>
              </>
            )}
            {table.relationships.length > 0 && (
              <div>
                <h3>Relationships</h3>
                <ul>
                  {table.relationships.map((relationship, index) => (
                    <li key={index}>{relationship}</li>
                  ))}
                </ul>
              </div>
            )}
            <h3>Attributes/Columns</h3>
            <ul>
              {table.attributes.map((attribute, index) => (
                <li key={index}>
                  <input
                    type="text"
                    value={attribute.name}
                    onChange={(e) =>
                      handleAttributeChange(table.id, index, e.target.value)
                    }
                  />
                  <select
                    value={attribute.type}
                    onChange={(e) =>
                      handleTypeChange(table.id, index, e.target.value)
                    }
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
                value={table.newAttribute}
                onChange={(e) =>
                  setTables((prevTables) =>
                    prevTables.map((t) =>
                      t.id === table.id
                        ? { ...t, newAttribute: e.target.value }
                        : t
                    )
                  )
                }
              />
              <select
                value={table.selectedType}
                onChange={(e) =>
                  setTables((prevTables) =>
                    prevTables.map((t) =>
                      t.id === table.id
                        ? { ...t, selectedType: e.target.value }
                        : t
                    )
                  )
                }
              >
                <option value="Data Type">Data Type</option>
                <option value="Integer">Integer</option>
                <option value="Boolean">Boolean</option>
                <option value="Float">Float</option>
                <option value="String">String</option>
              </select>
              <button onClick={() => handleAddAttribute(table.id)}>
                Add Attribute
              </button>
            </div>
            
          </div>
        </Draggable>
      ))}
    </div>
  );
};

export default WireFrameMaker;
