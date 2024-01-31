import { SPARQLResponse } from "../types";
import { convertArticlesToCSV, downloadAsCSV } from "../common/utils";

export default function CSVButton({
  articles,
}: {
  articles: SPARQLResponse["results"]["bindings"];
}) {
  const handleExportCSV = () => {
    const csvContent = convertArticlesToCSV(articles);
    downloadAsCSV(csvContent);
  };
  return (
    <button onClick={handleExportCSV} className="export-csv-button">
      Export to CSV
    </button>
  );
}
