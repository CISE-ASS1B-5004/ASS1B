import { GetStaticProps, NextPage } from "next";
import SortableTable from "../../components/table/SortableTable";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUserRole } from "../../components/UserContext";

interface ArticlesInterface {
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

  const [articles, setArticles] = useState(initialArticles || []);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useUserRole();

  useEffect(() => {
    // Fetch articles from the API
    axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/api/analyst/archive`, {
        headers: { 'user-role': userRole } // send user role in headers
      })
      .then((response) => {
        const data = response.data || [];
        console.log(data);
        const fetchedArticles: ArticlesInterface[] = data.map(
          (article: any) => {
            const transformedArticle: any = {};

            headers.forEach((mapping) => {
              transformedArticle[mapping.key] = article[mapping.key];
            });

            return transformedArticle;
          }
        );
        setArticles(fetchedArticles);
        setIsLoading(false); // Data has been fetched
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
        setIsLoading(false); // An error occurred while fetching
      });
  }, [userRole]);

  return (
    <div className="container">
      <h1>Analyst Archive Index Page</h1>
      <p>Page containing a table of archived articles which are rejected by Moderator or Analyst:</p>
      {isLoading ? (
        <div>Loading...</div>
      ) : articles?.length === 0 ? (  // using optional chaining to prevent when article is undefined
        <div>No Articles found in the archive list</div>
      ) : (
        <SortableTable headers={headers} data={articles} />
      )}
    </div>
  );
};

export default Articles;