import { GetStaticProps, NextPage } from "next";
import SortableTable from "../../components/table/SortableTable";
import data from "../../utils/dummydata.json";
import { useEffect, useState } from "react";
import axios from "axios";

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

  const [articles, setArticles] = useState(initialArticles);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch articles from the API
    axios
      .get("http://localhost:8082/api/articles")
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
