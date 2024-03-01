import { NodeId } from "react-accessible-treeview";
import { MediaWikiResponse } from "../types";

async function fetchSubcatsAndPages(
  categoryIdentifier: NodeId,
  usePageID: boolean = false
): Promise<MediaWikiResponse | null> {
  let queriedSubcatsJSON: MediaWikiResponse | null = null;
  try {
    let identifier: string = "";
    if (usePageID) {
      identifier = `gcmpageid=${categoryIdentifier}`;
    } else {
      identifier = `gcmtitle=${categoryIdentifier}`;
    }
    const urlParams: string = `action=query&generator=categorymembers&gcmlimit=500&prop=categoryinfo&${identifier}&format=json&origin=*`;
    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?${urlParams}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }

    queriedSubcatsJSON = await response.json();
  } catch (error) {
    console.error("Error fetching subcats: ", error);
  }

  return queriedSubcatsJSON;
}

export { fetchSubcatsAndPages };
