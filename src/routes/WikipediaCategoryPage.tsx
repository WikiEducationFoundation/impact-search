import { ChangeEvent, FormEvent, useState } from "react";
import "./WikipediaCategoryPage.scss";
import { CategoryNode, MediaWikiResponse } from "../types";
import CategoryTree from "../components/CategoryTree";
import LoadingOval from "../components/LoadingOval";
import { convertResponseToTree } from "../common/utils";

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
    const fetchedSubcats = await fetchInitialSubcats();
    setSubcatsData(convertResponseToTree(fetchedSubcats));
    setIsLoading(false);
  };

  async function fetchInitialSubcats(): Promise<MediaWikiResponse> {
    let queriedSubcatsJSON: MediaWikiResponse;
    const categoryTitle: string = categoryURL.split("/").slice(-1)[0];
    try {
      const urlParams: string = `action=query&generator=categorymembers&gcmlimit=500&prop=categoryinfo&gcmtitle=${categoryTitle}&format=json&origin=*`;
      const response = await fetch(
        `https://en.wikipedia.org/w/api.php?${urlParams}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      queriedSubcatsJSON = await response.json();
      if (queriedSubcatsJSON?.error) {
        console.error(queriedSubcatsJSON?.error.info);
      }
    } catch (error) {
      console.error("Error fetching subcats: ", error);
      queriedSubcatsJSON = {};
    }

    return queriedSubcatsJSON;
  }
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
