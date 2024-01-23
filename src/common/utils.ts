function buildWikidataQuery(
  occupations: string[],
  gender: string,
  ethnicity: string
): string {
  let query = `SELECT DISTINCT ?article
WHERE {
    ?person wdt:P31 wd:Q5 .`; // Q5 represents human

  if (gender) {
    query += `\n    ?person wdt:P21 wd:${gender} .`;
  }

  if (ethnicity) {
    query += `\n    ?person wdt:P172 wd:${ethnicity} .`;
  }

  query += `\n    ?person wdt:P106 ?occ .\n    VALUES ?occ { ${occupations
    .map((occ) => `wd:${occ}`)
    .join(" ")} }`;

  query += `
    ?article schema:about ?person .
    ?article schema:isPartOf <https://en.wikipedia.org/>.
    SERVICE wikibase:label { bd:serviceParam wikibase:language "en" }
}`;

  return query;
}

export default { buildWikidataQuery };
