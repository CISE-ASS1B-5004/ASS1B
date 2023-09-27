
//import queue from moderation
import styles from './analysis.module.scss'
import React, { useState } from "react";


//display titles from queue 
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


function getClaim() {
    return "Placeholder claim";
}


const analysis = () => {

    const [value, setValue] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const claim = getClaim();
    const handleChange = (event) => {
        //get article obj from array
        setValue(event.target.value);
    }

    return (
        <div className={styles.analysis}>
            <h1>Analysis of text</h1>
            <h2>Queue</h2>
            <select value={value} onChange={handleChange} className={styles.queue}>
                {//get queue and print titles
                }
                <option>Article 1</option>
                <option>Article 2</option>
                <option>Article 3</option>
            </select>

            <div  className={styles.container}>
                <div className={styles.info}>
                    <h3>Title: {value}</h3>
                    <p>Authors: </p>
                    <p>Journal Name: </p>
                    <p>Publication Year: </p>
                    <p>Volume: </p>
                    <p>Page: </p>
                    <p>DOI: </p>

                </div>
            
                <div className={styles.editor}>
                    <form className="evidence">
                    <div className="section">
                    <label htmlFor="claim">Claim:</label>
                    <input type="text" placeholder="Claim" id="claim"></input>
                    </div>
                   
                    <div className="section">
                    <label htmlFor="method">Method:</label>
                    <input type="text" placeholder="Method" id="Method" className={styles.method}></input>
                    </div>
                    </form>
                </div>
            </div>
        </div>
      );
} 

export default analysis;