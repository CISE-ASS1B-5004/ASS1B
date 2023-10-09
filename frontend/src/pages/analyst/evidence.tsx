
import axios from "axios"; // Import axios for making HTTP requests
import styles from './evidence.module.css'
import { useUserRole } from "../../components/UserContext";
import React, { useState, useEffect } from "react";

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

const evidence = () => {
    const [articles, setArticles] = useState<ArticlesInterface[]>([]);
    const [article, setArticle] = useState(null);
    const [articleId, setArticleId] = useState<string | null>(null);
    const [userRole, setUserRole] = useUserRole(); // Get the user role using the hook
    const [claimStrength, setClaimStrength] = useState("Weak");
    const [forClaim, setForClaim] = useState("For");
    const [title, setTitle] = useState("");

    //get all articles from analyst queue
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
          })
          .catch((error) => {
            console.error("Error fetching articles:", error);
          });
      }, [userRole]);

    //map all the titles into the dropdown

    //once title clicked load all the data

    //once approved set the data input and remove from queue

    const handleArticle = (e: React.ChangeEvent<HTMLSelectElement>) => {
       //get id of selected title
        setArticleId(e.target.value);
        
        //pull single article

        //display as info
    };
 
    useEffect(() => {
      if (articleId) {
        // Make an API request to fetch the article data
        axios
          .get(`http://localhost:8082/api/articles/${articleId}`)
          .then((response) => {
            // Set the fetched article data in the state
            setArticle(response.data);
          })
          .catch((error) => {
            console.error("Error fetching article data:", error);
            // Handle errors, e.g., show an error message to the user
          });
      }
    }, [articleId]);
  
    



    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <h1>Analysis of text</h1>
                <div className={styles.queue}>
                    <select value={title} onChange={(event) => handleArticle(event)}>
                        <option value="">Select an Article</option>
                        {articles.map((article) => (
                        <option key={article._id} value={article._id}>
                            {article.title}
                        </option>
                        ))}
                    </select>
                </div>
            
                <div className="info">
                    <h3>Title: </h3>
                    <p>Authors: </p>
                    <p>Journal Name: </p>
                    <p>Publication Year: </p>
                    <p>Volume: </p>
                    <p>Page: </p>
                    <p>DOI: </p>

                </div>
            </div>
        
            <div className={styles.analystEvidence}>
                <form className="evidence">
                    <div className="section">
                        <label htmlFor="claim">Claim:</label>
                        <input type="text" placeholder="Claim" id="claim"></input>
                    </div>

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
                
                    <div className="section">
                        <label htmlFor="method">Method:</label>
                        <input type="text" placeholder="Method" id="Method"></input>
                    </div>
                </form>
            </div>
        </div>
     
      );
}

export default evidence;