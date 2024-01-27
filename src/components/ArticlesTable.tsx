import "./ArticlesTable.scss";

export default function ArticlesTable({
  articles,
}: {
  articles: {
    article: {
      type: string;
      value: string;
    };
  }[];
}) {
  return (
    <table className="articles-table">
      <thead>
        <tr>
          <th>Article</th>
        </tr>
      </thead>
      <tbody>
        {articles.map((item, index) => (
          <tr key={index}>
            <td>
              <a href={item.article.value}>{item.article.value}</a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
