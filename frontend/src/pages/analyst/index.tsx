import { GetStaticProps, NextPage } from "next";
import SortableTable from "../../components/table/SortableTable";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUserRole } from "../../components/UserContext";
import { useRouter } from 'next/router'; 
import tableStyles from "../../components/table/SortableTable.module.scss";


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


// function navigateToEvidenceFormPage(Id: string) {
//   const router = useRouter();
//   router.push(`/path/to/evidence-form?articleId=${Id}`);
// }

const Articles: React.FC = () => {
  const [articles, setArticles] = useState<ArticlesInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useUserRole(); // Get the user role using the hook
  const [articleId, setArticleId] = useState(String);


  useEffect(() => {
    axios
      .get("http://localhost:8082/api/analyst", {
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

  const router = useRouter();

  function handleAddingEvidence(ID: string) {
    setArticleId(ID);
    // router.push("/analyst/EvidenceForm");
   router.push(`/analyst/EvidenceForm?articleId=${ID}`);
    // throw new Error("Function not implemented.");
  }

  useEffect(() => {
    console.log(`Article id: ${articleId}`);
  }, [articleId]);

  return (
    <div className="container">
      {userRole !== 'Analyst' ? (
        <div style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>
          <h1>403 Access Denied</h1>
          <p>You do not have permission to view this page.</p>
        </div>
      ) : (
        <>
          <h1>Analyst Index Page</h1>
          <p>Page containing a table of articles in analysis queue:</p>
          {isLoading ? (
            <div>Loading...</div>
          ) : articles.length === 0 ? (
            <div>No Articles found in the analysis queue</div>
          ) : (
            <table className={tableStyles.table}>
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
                      <button onClick={() => handleAddingEvidence(article._id)}>Add evidence</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default Articles;