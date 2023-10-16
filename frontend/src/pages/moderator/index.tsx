import { GetStaticProps, NextPage } from "next";
import SortableTable from "../../components/table/SortableTable";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUserRole } from "../../components/UserContext";
import { useRouter } from "next/router";
import Modal from "../../components/ModeratorModal";
import css from "../../styles/moderator.module.scss";

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
  review: string;
}

const Articles: React.FC = () => {
  const [articles, setArticles] = useState<ArticlesInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useUserRole(); // Get the user role using the hook
  const [selectedArticle, setSelectedArticle] = useState<ArticlesInterface | null>(null);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/moderator`, {
        headers: { "user-role": userRole }, // send user role in headers
      })
      .then((response) => {
        const fetchedArticles: ArticlesInterface[] = response.data.map(
          (article: any) => ({
            ...article,
            id: article._id, // Ensure the correct id is set here
          })
        );
        setArticles(fetchedArticles);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
        setIsLoading(false);
      });
  }, [userRole]); // Add userRole as a dependency, so if it changes, this effect runs again.

  const router = useRouter();

  const handleNavigateToArchive = () => {
    router.push("/moderator/archive"); // Navigate to the archive page
  };

  const handleApprove = (id: string) => {
    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/moderator/approve/${id}`,
        {},
        {
          headers: { "user-role": userRole }, // send user role in headers
        }
      )
      .then(() => {
        setArticles(articles.filter((article) => article._id !== id));
      })
      .catch((error) => console.error("Error approving article:", error));
  };

  const handleReject = (id: string) => {
    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/moderator/reject/${id}`,
        {},
        {
          headers: { "user-role": userRole }, // send user role in headers
        }
      )
      .then(() => {
        setArticles(articles.filter((article) => article._id !== id));
      })
      .catch((error) => console.error("Error rejecting article:", error));
  };

  const handleArticleClick = (article: ArticlesInterface) => {
    setSelectedArticle(article);
  };

  const handleCloseModal = () => {
    setSelectedArticle(null);
  };
  
  return (
    <div className="container">
      {userRole !== "Moderator" ? (
        <div style={{ color: "red", textAlign: "center", marginTop: "20px" }}>
          <h1>403 Access Denied</h1>
          <p>You do not have permission to view this page.</p>
        </div>
      ) : (
        <>
          <h1>Moderator Index Page</h1>
          <button
            onClick={handleNavigateToArchive}
            style={{ display: "block", marginBottom: "20px" }}
          >
            Go to Archive
          </button>
          <Modal article={selectedArticle} onClose={handleCloseModal} />
          <p>Page containing a table of articles with moderation queue:</p>
          {isLoading ? (
            <div>Loading...</div>
          ) : articles.length === 0 ? (
            <div>No Articles found in the moderation queue</div>
          ) : (
            <div className={css.table}>
              <div className={css.tableHeader}>
                <span>Title</span>
                <span>Authors</span>
                <span>Journal Name</span>
                <span>Published Year</span>
                <span>Volume</span>
                <span>Pages</span>
                <span>DOI</span>
                <span>Claims</span>
                <span>Method</span>
              </div>

              {articles.map((article) => (
                <div key={article._id} className={css.tableRow} onClick={() => handleArticleClick(article)}>
                  <span>{article.title}</span>
                  <span>{article.authors.join(", ")}</span>
                  <span>{article.journalName}</span>
                  <span>{article.pubYear}</span>
                  <span>{article.volume}</span>
                  <span>{article.pages}</span>
                  <span>{article.doi}</span>
                  <span>{article.claims}</span>
                  <span>{article.method}</span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Articles;
