import { useState } from "react";
import "./QueryBuilder.scss";
import QueryItem from "./QueryItem";

export default function QueryBuilder() {
  const [properties, setProperties] = useState<QueryProperty[]>([
    { property: "", qValue: "" },
  ]);

  const handleAddProperty = () => {
    if (properties.length < 5) {
      setProperties([...properties, { property: "", qValue: "" }]);
    }
  };

  const handleRemoveQueryItem = (index: number) => {
    if (properties.length > 1) {
      const updatedProperties = properties.filter((_, idx) => idx !== index);
      setProperties(updatedProperties);
    }
  };

  const handleChange = (
    index: number,
    field: "property" | "qValue",
    value: string
  ) => {
    const updatedProperties = [...properties];
    updatedProperties[index][field] = value;
    setProperties(updatedProperties);
  };

  return (
    <div className="query-builder">
      <label>Select Properties</label>
      {properties.map((property, index) => (
        <QueryItem
          handleChange={(index, value) =>
            handleChange(index, "property", value)
          }
          handleTextFieldChange={(index, value) =>
            handleChange(index, "qValue", value)
          }
          handleRemoveQueryItem={handleRemoveQueryItem}
          index={index}
          properties={properties}
          property={property.property}
          qValue={property.qValue}
        />
      ))}
      {properties.length < 5 && (
        <button className="add-button" onClick={handleAddProperty}>
          Add
        </button>
      )}
    </div>
  );
}

type QueryProperty = {
  property: string;
  qValue: string;
};
