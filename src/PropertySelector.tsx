import { useState } from "react";

export default function PropertySelector() {
  const [property, setProperties] = useState<string[]>([""]);

  const handleAddDropdown = () => {
    if (property.length < 5) {
      setProperties([...property, ""]);
    }
  };

  const handleRemoveDropdown = (index: number) => {
    if (property.length > 1) {
      const updatedDropdowns = property.filter((_, idx) => idx !== index);
      setProperties(updatedDropdowns);
    }
  };

  const handleChange = (index: number, value: string) => {
    const updatedDropdowns = [...property];
    updatedDropdowns[index] = value;
    setProperties(updatedDropdowns);
  };

  return (
    <div>
      <label>Select Properties</label>
      {property.map((selectedOption: string, index: number) => (
        <div className="property-selector">
          <select
            onChange={(e) => handleChange(index, e.target.value)}
            value={selectedOption}
          >
            <option value="">--Please choose an option--</option>
            <option value="gender">Gender</option>
            <option value="ethnicity">Ethnicity</option>
            <option value="occupation">Occupation</option>
          </select>

          {property.length > 1 && (
            <button onClick={() => handleRemoveDropdown(index)}>Remove</button>
          )}
        </div>
      ))}
      {property.length < 5 && (
        <button className="addButton" onClick={handleAddDropdown}>
          Add
        </button>
      )}
    </div>
  );
}
