import { ChangeEvent, FormEvent, useState } from "react";
import "./WikipediaCategoryPage.scss";
import { CategoryNode } from "../types";
import CategoryTree from "../components/CategoryTree";
import LoadingOval from "../components/LoadingOval";
import { convertInitialResponseToTree } from "../common/utils";
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
    try {
      const fetchedSubcatsAndPages = await fetchSubcatsAndPages(
        categoryURL.split("/").slice(-1)[0]
      );
      if (!fetchedSubcatsAndPages) {
        throw new Error("Invalid Response (possibly null)");
      }
      if (fetchedSubcatsAndPages.error) {
        throw new Error(fetchedSubcatsAndPages.error.info);
      }
      setSubcatsData(
        convertInitialResponseToTree(fetchedSubcatsAndPages, [], 0)
      );
    } catch (error) {
      console.error(error);
    }

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
