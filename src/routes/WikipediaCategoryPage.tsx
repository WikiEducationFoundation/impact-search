import { ChangeEvent, FormEvent, useState } from "react";
import "./WikipediaCategoryPage.scss";
import { CategoryNode } from "../types";
import CategoryTree from "../components/CategoryTree";
import LoadingOval from "../components/LoadingOval";
import { convertResponseToTree } from "../common/utils";
import { fetchSubcatsAndPages } from "../common/api";

export default function WikipediaCategoryPage() {
  const [categoryURL, setCategoryURL] = useState<string>("");
  const [SubcatsData, setSubcatsData] = useState<CategoryNode>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCategoryURL(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const fetchedSubcats = await fetchSubcatsAndPages(
      categoryURL.split("/").slice(-1)[0]
    );
    setSubcatsData(convertResponseToTree(fetchedSubcats, [], 0));
    setIsLoading(false);
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
        <button type="submit" className="submit-button" disabled={isLoading}>
          Run Query
        </button>
      </form>
      {isLoading ? (
        <div className="oval-container">
          <LoadingOval visible={isLoading} />
        </div>
      ) : SubcatsData ? (
        <CategoryTree treeData={SubcatsData} />
      ) : (
        ""
      )}
    </div>
  );
}
