import Card from "../components/Card";

export default function HomePage() {
  return (
    <>
      <Card
        description="Search for common property combinations with this tool"
        title="Wikidata Query Tool"
      />
      <Card
        description="Filter through wikipedia categories and their subcategories"
        title="Wikipedia Category Tool"
      />
      <Card description="WIP" title="WIP" />
    </>
  );
}
