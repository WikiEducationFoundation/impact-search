import { FormEvent, useState } from "react";
import "./WikipediaCategoryPage.scss";

export default function WikipediaCategoryPage() {
  const [categoryURL, setCategoryURL] = useState<string>("");

  const handleChange = (e) => {
    setCategoryURL(e.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="category-container">
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          value={categoryURL}
          onChange={handleChange}
          placeholder="Enter a Category URL"
          required
        />
        <button type="submit" className="submit-button">
          Run Query
        </button>
      </form>
    </div>
  );
}
