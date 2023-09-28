import { GetStaticProps, NextPage } from "next";
import SortableTable from "../../components/table/SortableTable";
import { useEffect, useState } from "react";
import axios from "axios";

interface ArticlesInterface {
  id: string;
  title: string;
  authors: string;
  journalName: string;
  pubYear: string;
  volume: string;
  pages: string;
  doi: string;
  claims: string;
  method: string;
}
type ArticlesProps = {
  articles: ArticlesInterface[];
};

const Articles: NextPage<ArticlesProps> = ({ articles: initialArticles }) => {
  const headers: { key: keyof ArticlesInterface; label: string }[] = [
    { key: "title", label: "Title" },
    { key: "authors", label: "Authors" },
    { key: "journalName", label: "Journal Name" },
    { key: "pubYear", label: "Publication Year" },
    { key: "volume", label: "Volume" },
    { key: "pages", label: "Pages" },
    { key: "doi", label: "DOI" },
    { key: "claims", label: "Claims" },
    { key: "method", label: "Method" },
  ];

  const [articles, setArticles] = useState(initialArticles);
  const [isLoading, setIsLoading] = useState(true);

  const handleDelete = (id: string) => {
    axios
      .delete(`http://localhost:8082/api/moderator/${id}`)
      .then(() => {
        // update the status, delete article from the UI
        setArticles((prevArticles) => prevArticles.filter((article) => article.id !== id));
      })
      .catch((error) => console.error("Error deleting article:", error));
  };

  useEffect(() => {
    // Fetch articles from the API
    axios
      .get("http://localhost:8082/api/moderator")
      .then((response) => {
        const data = response.data;
        console.log(data);
        const fetchedArticles: ArticlesInterface[] = data.map(
          (article: any) => ({
            id: article.id ?? article._id,
            title: article.title,
            authors: article.authors,
            journalName: article.journalName,
            pubYear: article.pubYear,
            volume: article.volume,
            pages: article.pages,
            doi: article.doi,
            claims: article.claims,
            method: article.method,
            inModerationQueue: article.inModerationQueue,
          })
        );
        setArticles(fetchedArticles);
        setIsLoading(false); // Data has been fetched
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
        setIsLoading(false); // An error occurred while fetching
      });
  }, []);

  return (
    <div className="container">
      <h1>Moderator Index Page</h1>
      <p>Page containing a table of articles with moderation queue:</p>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <table>
          <thead>
            <tr>
              {headers && headers.map((header) => (
                <th key={header.key}>{header.label}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles && articles.map((article) => (
              <tr key={article.id}>
                {headers && headers.map((header) => (
                  <td key={header.key}>{article[header.key]}</td>
                ))}
                <td>
                  <button onClick={() => handleDelete(article.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Articles;