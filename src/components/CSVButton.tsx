import { SPARQLResponse } from "../types";
import { downloadAsCSV } from "../common/utils";
import { INode } from "react-accessible-treeview";
import { IFlatMetadata } from "react-accessible-treeview/dist/TreeView/utils";

export default function CSVButton({
  articles,
  csvConvert,
}: {
  articles:
    | SPARQLResponse["results"]["bindings"]
    | IterableIterator<INode<IFlatMetadata>>;
  csvConvert: (articles: unknown) => string;
}) {
  const handleExportCSV = () => {
    const csvContent = csvConvert(articles);
    downloadAsCSV(csvContent);
  };
  return (
    <button onClick={handleExportCSV} className="export-csv-button">
      Export to CSV
    </button>
  );
}
