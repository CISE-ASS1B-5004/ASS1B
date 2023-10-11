import { GetStaticProps, NextPage } from "next";
import SortableTable from "../../components/table/SortableTable";
import { useEffect, useState } from "react";
import axios from "axios";

interface ArticlesInterface {
  title: string;
  authors: string[];
  journalName: string;
  pubYear: string;
  volume: string;
  pages: string;
  doi: string;
  method: string;
  subClaims: string;
  analystClaims: string;
  isForClaim: string;
  strengthOfClaim: string;
  evidence: string;
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
    { key: "method", label: "Method" },
    { key: "subClaims", label: "Submission Claim" },
    { key: "analystClaims", label: "Analyst Claim" },
    { key: "isForClaim", label: "For/Against claim" },
    { key: "strengthOfClaim", label: "Strength Of CLaim" },
    { key: "evidence", label: "evidence" },
  ];

  const [articles, setArticles] = useState(initialArticles);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch articles from the API
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/articles`)
      .then((response) => {
        const data = response.data;
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
  }, []);

  return (
    <div className="container">
      <h1>Articles Index Page</h1>
      <p>Page containing a table of articles:</p>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <SortableTable headers={headers} data={articles} />
      )}
    </div>
  );
};

export default Articles;
