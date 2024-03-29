import { Link } from "react-router-dom";
import Card from "../components/Card";
import "./HomePage.scss";

export default function HomePage() {
  return (
    <div className="card-row">
      <Link to={"/wikidata-tool"}>
        <Card
          description="Search for common property combinations with this tool"
          title="Wikidata Query Tool"
        />
      </Link>
      <Link to={"/wikipedia-category-tool"}>
        <Card
          description="Filter through wikipedia categories and their subcategories"
          title="Wikipedia Category Tool"
        />
      </Link>

      <Card description="WIP" title="WIP" />
    </div>
  );
}
