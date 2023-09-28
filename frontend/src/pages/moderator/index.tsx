import { GetStaticProps, NextPage } from "next";
import SortableTable from "../../components/table/SortableTable";
import data from "../../utils/dummydata.json";
import { useEffect, useState } from "react";
import axios from "axios";

interface ArticlesInterface {
  _id: string;
  title: string;
  authors: string[];
  journalName: string;
  pubYear: string;
  volume: string;
  pages: string;
  doi: string;
  claims: string;
  method: string;
}

const Articles: React.FC = () => {
  const [articles, setArticles] = useState<ArticlesInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8082/api/moderator")
      .then((response) => {
        const fetchedArticles: ArticlesInterface[] = response.data.map((article: any) => ({
            ...article,
            id: article._id // Ensure the correct id is set here
          }));
        setArticles(fetchedArticles);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
        setIsLoading(false);
      });
  }, []);

  const handleApprove = (id: string) => {
    axios
      .put(`http://localhost:8082/api/moderator/approve/${id}`)
      .then(() => {
        setArticles(articles.filter(article => article._id !== id));
      })
      .catch((error) => console.error("Error approving article:", error));
  };

  const handleReject = (id: string) => {
      axios
        .put(`http://localhost:8082/api/moderator/reject/${id}`)
        .then(() => {
          setArticles(articles.filter(article => article._id !== id));
        })
        .catch((error) => console.error("Error rejecting article:", error));
    };
  return (
    <div className="container">
      <h1>Moderator Index Page</h1>
      <p>Page containing a table of articles with moderation queue:</p>
      {isLoading ? (
        <div>Loading...</div>
      ) : articles.length === 0 ? (
        <div>No Articles found in the moderation queue</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Authors</th>
              <th>Journal Name</th>
              <th>Published Year</th>
              <th>Volume</th>
              <th>Pages</th>
              <th>DOI</th>
              <th>Claims</th>
              <th>Method</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article._id}>
                <td>{article.title}</td>
                <td>{article.authors.join(', ')}</td>
                <td>{article.journalName}</td>
                <td>{article.pubYear}</td>
                <td>{article.volume}</td>
                <td>{article.pages}</td>
                <td>{article.doi}</td>
                <td>{article.claims}</td>
                <td>{article.method}</td>
                <td>
                  <button onClick={() => handleApprove(article._id)}>Approve</button>
                  <button onClick={() => handleReject(article._id)}>Reject</button>
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