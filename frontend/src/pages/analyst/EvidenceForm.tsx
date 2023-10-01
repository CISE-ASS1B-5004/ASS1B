import { GetStaticProps, NextPage } from "next";
import SortableTable from "../../components/table/SortableTable";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUserRole } from "../../components/UserContext";
import { useRouter } from 'next/router'; 



interface ArticlesInterface {
  _id: string;
  title: string;
  authors: string[];
  journalName: string;
  pubYear: string;
  volume: string;
  pages: string;
  doi: string;
  method: string;
  claims: string;
  forClaim: boolean;
  strengthofClaim: string;
  evidence: string;
}

const EvidenceForm: React.FC = () => {
  const [articles, setArticles] = useState<ArticlesInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useUserRole(); // Get the user role using the hook
  const [articleId, setArticleId] = useState(String);

  useEffect(() => {
    axios
      .get(`http://localhost:8082/api/analyst/evidence${articleId}`, {
        headers: { 'user-role': userRole } // send user role in headers
      })
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
  }, [userRole]); // Add userRole as a dependency, so if it changes, this effect runs again.


    return (
        <div className="container">
          {userRole !== 'Analyst' ? (
            <div style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>
              <h1>403 Access Denied</h1>
              <p>You do not have permission to view this page.</p>
            </div>
          ) : (
            <>
              <h1>Analysis Index Page</h1>
              {isLoading ? (
                <div>Loading...</div>
              ) : <table>
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
                      {/* <button onClick={() => handleApprove(article._id)}>Approve</button>
                      <button onClick={() => handleReject(article._id)}>Reject</button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
              }
            </>
          )}
        </div>
      );
}

export default EvidenceForm;