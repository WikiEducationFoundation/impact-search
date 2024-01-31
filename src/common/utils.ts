import { SPARQLResponse } from "../types";

function buildWikidataQuery(
  occupationIDs: string[],
  genderID: string,
  ethnicityID: string
): string {
  const properties = {
    instanceOf: "P31",
    sexOrGender: "P21",
    ethnicGroup: "P172",
    occupation: "P106",
  };
  const qValues = { human: "Q5" };
  let query = `SELECT DISTINCT ?article ?personLabel WHERE {
    ?person wdt:${properties.instanceOf} wd:${qValues.human} .`;

  if (genderID) {
    query += `\n    ?person wdt:${properties.sexOrGender} wd:${genderID} .`;
  }

  if (ethnicityID) {
    query += `\n    ?person wdt:${properties.ethnicGroup} wd:${ethnicityID} .`;
  }

  if (occupationIDs.length > 0) {
    query += `\n    ?person wdt:${
      properties.occupation
    } ?occ .\n    VALUES ?occ { ${occupationIDs
      .map((occ) => `wd:${occ}`)
      .join(" ")} }`;
  }

  query += `
    ?article schema:about ?person .
    ?article schema:isPartOf <https://en.wikipedia.org/>.
    SERVICE wikibase:label { bd:serviceParam wikibase:language "en" }
}`;

  return encodeURIComponent(query);
}

function convertArticlesToCSV(
  articles: SPARQLResponse["results"]["bindings"]
): string {
  let csvContent = "data:text/csv;charset=utf-8,Articles\n";

  articles.forEach((item) => {
    csvContent += `${item.personLabel.value}\n`;
  });

  return csvContent;
}

function downloadAsCSV(csvContent: string, fileName = "articles.csv"): void {
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", fileName);
  link.click();
}

export { buildWikidataQuery, convertArticlesToCSV, downloadAsCSV };
