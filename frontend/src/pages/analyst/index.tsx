import { GetStaticProps, NextPage } from "next";
import SortableTable from "../../components/table/SortableTable";
import { useEffect, useState } from "react";
import * as React from 'react';
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

const Articles: React.FC = () => {
  const [articles, setArticles] = useState<ArticlesInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useUserRole(); // Get the user role using the hook
  const [articleId, setArticleId] = useState(String);
  const [claimStrength, setClaimStrength] = useState("Weak");
  const [forClaim, setForClaim] = useState("For");


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

  useEffect(() => {
    console.log(`Article id: ${articleId}`);
  }, [articleId]);

  const router = useRouter();

  const handleNavigateToArchive = () => {
    router.push('/analyst/archive'); // Navigate to the archive page
  };

  function updateArticle(id: string){
    axios
      .put(`http://localhost:8082/api/analyst/update/${id}/${claimStrength}/${forClaim}`, {}, {
        headers: { 'user-role': userRole } // send user role in headers
      })
      .then(() => {
        setArticles(articles.filter(article => article._id !== id));
        console.log('Approved!');
      })
      .catch((error) => console.error("Error approving article:", error));

  }

  const handleApprove = (id: string) => {
    console.log(`claim strenght: ${claimStrength} for ${id}`);
    console.log(`For/Against: ${forClaim} for ${id}`);

    updateArticle(id);

    axios
      .put(`http://localhost:8082/api/moderator/approve/${id}`, {}, {
        headers: { 'user-role': userRole } // send user role in headers
      })
      .then(() => {
        setArticles(articles.filter(article => article._id !== id));
        console.log('Approved!');
      })
      .catch((error) => console.error("Error approving article:", error));
  };

  const handleReject = (id: string) => {
    axios
      .put(`http://localhost:8082/api/analyst/reject/${id}`, {}, {
        headers: { 'user-role': userRole } // send user role in headers
      })
      .then(() => {
        console.log('Rejected!');
        setArticles(articles.filter(article => article._id !== id));
      })
      .catch((error) => console.error("Error rejecting article:", error));
  };

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
          <button onClick={handleNavigateToArchive} style={{ display: 'block', marginBottom: '20px' }}>
            Go to Archive
          </button>
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
                    {/* Dropdown menus */}
                    <div className="dropdownMenus">
                    <div className="strenghtDropdown">
                      <label>Strength Of Claim</label>
                    <select value={claimStrength} onChange={(event) => { setClaimStrength(event.target.value);}}>
                      <option value="Weak">Weak</option>
                      <option value="Average">Average</option>
                      <option value="Strong">Strong</option>
                    </select>
                    </div>
                    <div className="to/forClaim">
                      <label>For/Against claim</label>
                    <select  value={forClaim} onChange={(event) => { setForClaim(event.target.value);}}>
                      <option value="For">For</option>
                      <option value="Against">Against</option>
                    </select>
                    </div>
                    </div>
                    </td>
                    <td>
                    <button onClick={() => handleApprove(article._id)}>Approve</button>
                    <button onClick={() => handleReject(article._id)}>Reject</button>
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