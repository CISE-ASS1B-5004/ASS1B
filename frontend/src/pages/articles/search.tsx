// src/pages/SearchPage.tsx
import React, { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar";
import axios from "axios";
import SortableTable from "../../components/table/SortableTable";
import pageStyle from "../pages.module.scss";

interface ArticlesInterface {
  id: string;
  title: string;
  authors: string;
  journalName: string;
  pubYear: number;
  volume: string;
  pages: string;
  doi: string;
  claims: string;
  method: string;
}
type ArticlesProps = {
  articles: ArticlesInterface[];
};

const SearchPage: React.FC = () => {
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
  const [searchResults, setSearchResults] = useState<ArticlesInterface[]>([]);
  const [articles, setArticles] = useState<ArticlesInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [methodOptions, setMethodOptions] = useState<string[]>([]);
  const [startYear, setStartYear] = useState<string>("");
  const [endYear, setEndYear] = useState<string>("");

  useEffect(() => {
    // Fetch articles from the API when the component mounts
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
        const uniqueMethods = Array.from(
          new Set(fetchedArticles.map((article) => article.method))
        );
        setMethodOptions(uniqueMethods);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
        setIsLoading(false); // An error occurred while fetching
      });
  }, []);

  const handleSearch = (query: string) => {
    // Filter articles based on the search query, selected method, and year range
    const filteredArticles = articles.filter((article) => {
      const matchesTitle = article.title
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesMethod =
        selectedMethod === "" || article.method === selectedMethod;
      const withinYearRange =
        (startYear === "" ||
          parseInt(article.pubYear.toString()) >= parseInt(startYear)) &&
        (endYear === "" ||
          parseInt(article.pubYear.toString()) <= parseInt(endYear));
      return matchesTitle && matchesMethod && withinYearRange;
    });
    setSearchResults(filteredArticles);
  };

  const handleMethodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // Update the selected method filter when the drop-down value changes
    setSelectedMethod(event.target.value);
  };

  const handleStartYearChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Update the start year when the input value changes
    setStartYear(event.target.value);
  };

  const handleEndYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Update the end year when the input value changes
    setEndYear(event.target.value);
  };

  return (
    <div className={pageStyle.page}>
      <h1>Search Page</h1>
      <div className={pageStyle.searchbar}>
        <h2>Search Article Title</h2>
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className={pageStyle.methodFilter}>
        <h2>Filter by Method</h2>
        <select onChange={handleMethodChange} value={selectedMethod}>
          <option value="">All Methods</option>
          {methodOptions.map((method) => (
            <option key={method} value={method}>
              {method}
            </option>
          ))}
        </select>
      </div>
      <div className={pageStyle.yearFilter}>
        <h2>Filter by Year Range</h2>
        <input
          type="text"
          placeholder="Start Year"
          value={startYear}
          onChange={handleStartYearChange}
        />
        <input
          type="text"
          placeholder="End Year"
          value={endYear}
          onChange={handleEndYearChange}
        />
      </div>
      <h2>Search Results</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <SortableTable headers={headers} data={searchResults} />
      )}
    </div>
  );
};

export default SearchPage;
