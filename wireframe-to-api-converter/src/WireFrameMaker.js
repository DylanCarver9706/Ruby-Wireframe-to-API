import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import Modal from "./Modal";

const WireFrameMaker = () => {
  const [databaseName, setDatabaseName] = useState("");
  const [relationshipType, setRelationshipType] = useState("");
  const [relatedTable, setRelatedTable] = useState("");
  const [throughTable, setThroughTable] = useState("");
  const [newAttributeInput, setNewAttributeInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [tables, setTables] = useState([
    {
      id: 1,
      title: "",
      attributes: [],
      relationships: [],
      position: { x: 10, y: 75 },
      relationshipType: "",
      relatedTable: "",
      throughTable: "",
    },
  ]);

  useEffect(() => {
    // Load the tables state from local storage when the component mounts
    const savedTables = JSON.parse(localStorage.getItem("tables"));
    if (savedTables) {
      setTables(savedTables);
    }
  }, []);

  useEffect(() => {
    // Save the tables state to local storage whenever it changes
    localStorage.setItem("tables", JSON.stringify(tables));
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
      position: { x: 10, y: tables.length * 15 + 75 },
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
    openModal();
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
                    table.newAttribute && table.newAttribute.trim() !== "" // Check if newAttribute exists and is not an empty string
                      ? table.newAttribute.trim()
                      : "",
                  type: table.selectedType && table.selectedType.toLowerCase(), // Check if selectedType exists before converting to lowercase
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

  const renderTableAttributes = (attributes, tableId) => {
    return attributes.map((attribute, index) => (
      <li key={index}>
        <input
          type="text"
          value={attribute.name}
          onChange={(e) =>
            handleAttributeChange(tableId, index, e.target.value)
          }
        />
        &nbsp;
        <select
          value={attribute.type}
          onChange={(e) => handleTypeChange(tableId, index, e.target.value)}
        >
          <option value="data type">Data Type</option>
          <option value="integer">Integer</option>
          <option value="boolean">Boolean</option>
          <option value="float">Float</option>
          <option value="string">String</option>
        </select>
        &nbsp;
        <button onClick={() => handleDeleteAttribute(tableId, index)}>
          Delete Attribute
        </button>
      </li>
    ));
  };

  const renderTableRelationships = (relationships, tableId) => {
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
          <button onClick={() => handleDeleteRelationship(tableId, index)}>
            Delete Relationship
          </button>
        </li>
      );
    });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteAttribute = (tableId, attributeIndex) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === tableId
          ? {
              ...table,
              attributes: table.attributes.filter(
                (_, index) => index !== attributeIndex
              ),
            }
          : table
      )
    );
  };

  const handleDeleteRelationship = (tableId, relationshipIndex) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === tableId
          ? {
              ...table,
              relationships: table.relationships.filter(
                (_, index) => index !== relationshipIndex
              ),
            }
          : table
      )
    );
  };

  const handleDeleteTable = (tableId) => {
    setTables((prevTables) =>
      prevTables.filter((table) => table.id !== tableId)
    );
  };

  const handleZoomIn = () => {
    const newZoomLevel = zoomLevel + 0.1;
    // Limit the zoom level between 0.5 and 2
    if (newZoomLevel <= 2) {
      setZoomLevel(newZoomLevel);
    }
  };

  const handleZoomOut = () => {
    const newZoomLevel = zoomLevel - 0.1;
    // Limit the zoom level between 0.5 and 2
    if (newZoomLevel >= 0.5) {
      setZoomLevel(newZoomLevel);
    }
  };

  return (
    <div>
      <div className="header">
        <div className="input-container">
          <input
            type="text"
            value={databaseName}
            placeholder="Database Name"
            onChange={(event) => setDatabaseName(event.target.value)}
            className="input-field"
          />
          <button onClick={addTable} className="add-table-button">
            Add Table
          </button>
        </div>
        &nbsp;
        <button onClick={generateAPI} className="generate-api-button">
          Generate API
        </button>
        <button onClick={logTables}>Log Tables</button>
      </div>
      <div
        className="wireframe-container"
        style={{ transform: `scale(${zoomLevel})` }}
      >
        <Modal isOpen={isModalOpen} onClose={closeModal} />
        <div>
          {tables.map((table) => (
            <Draggable
              key={table.id}
              position={table.position}
              onStop={(e, draggableData) => handleDrag(table.id, draggableData)}
            >
              <div className="table">
                <h3>
                  http://localhost:3000/&nbsp;
                  <input
                    type="text"
                    value={table.title}
                    placeholder="Table Title"
                    onChange={(event) => handleTitleChange(table.id, event)}
                  />
                </h3>
                <h3>Attributes</h3>
                <ul>{renderTableAttributes(table.attributes, table.id)}</ul>
                {/* {table.attributes.map((attribute, index) => (
                <li key={index}>
                  <input
                    type="text"
                    value={attribute.name}
                    onChange={(e) =>
                      handleAttributeChange(table.id, index, e.target.value)
                    }
                  />
                  &nbsp;
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
              ))} */}
                <input
                  type="text"
                  value={table.newAttribute}
                  placeholder="Column Name"
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
                &nbsp;
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
                &nbsp;
                <button onClick={() => handleAddAttribute(table.id)}>
                  Add Attribute
                </button>
                <h3>Relationships</h3>
                {table.relationships.length > 0 && (
                  <ul>
                    {renderTableRelationships(table.relationships, table.id)}
                  </ul>
                )}
                <select
                  value={table.relationshipType}
                  onChange={(event) =>
                    handleRelationshipTypeChange(table.id, event)
                  }
                >
                  <option value="">Select Relationship Type</option>
                  <option value="belongs_to">Belongs_To</option>
                  <option value="has_many">Has_Many</option>
                  <option value="has_many_through">Has_Many, Through:</option>
                </select>
                &nbsp;
                <br />
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
                        &nbsp;through&nbsp;
                        <select
                          value={table.throughTable}
                          onChange={(event) =>
                            handleThroughTableChange(table.id, event)
                          }
                        >
                          <option value="">Select Through Table</option>
                          {tables
                            .filter(
                              (t) =>
                                t.id !== table.id && t.title !== relatedTable
                            )
                            .map((t) => (
                              <option key={t.id} value={t.title}>
                                {t.title}
                              </option>
                            ))}
                        </select>
                      </>
                    )}
                    <br />
                    <button onClick={() => handleAddRelationship(table.id)}>
                      Add Relationship
                    </button>
                  </>
                )}
                <button onClick={() => handleDeleteTable(table.id)}>
                  Delete Table
                </button>
              </div>
            </Draggable>
          ))}
        </div>
      </div>
      <div className="zoom-buttons">
        <button className="zoom-in" onClick={() => handleZoomIn()}></button>
        <button className="zoom-out" onClick={() => handleZoomOut()}></button>
      </div>
    </div>
  );
};

export default WireFrameMaker;
