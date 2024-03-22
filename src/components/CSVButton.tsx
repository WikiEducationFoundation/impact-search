import { downloadAsCSV } from "../common/utils";
interface CSVButtonProps<T> {
  articles: T;
  csvConvert: (articles: T) => string;
}
export default function CSVButton<T>({
  articles,
  csvConvert,
}: CSVButtonProps<T>) {
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
