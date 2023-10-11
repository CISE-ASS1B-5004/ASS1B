import axios from "axios"; // Import axios for making HTTP requests
import styles from "./evidence.module.css";
import { useUserRole } from "../../components/UserContext";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
// import formStyles from "../styles/Form.module.scss";

interface ArticlesInterface {
  title: string;
  authors: string[];
  journalName: string;
  pubYear: string;
  volume: string;
  pages: string;
  doi: string;
  method: string;
  claims: string;
  isForClaim: string;
  strengthOfClaim: string;
  evidence: string;
  _id: string;
}

const Evidence = () => {
  const [Articles, SetArticles] = useState<ArticlesInterface[]>([]);
  const [article, setArticle] = useState<ArticlesInterface | null>(null);
  const [articleId, setArticleId] = useState<string | null>(null);
  const [userRole, setUserRole] = useUserRole(); // Get the user role using the hook
  const [claimStrength, setClaimStrength] = useState("Weak");
  const [forClaim, setForClaim] = useState("For");
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [analystMethod, setAnalystMethod] = useState("");
  const [evidence, setEvidence] = useState("");
  const [analystClaim, setAnalystClaim] = useState("");

  
  const { register, handleSubmit, reset } = useForm();
  
  const onSubmit = async () => {
    console.log("onsubmit called");
    if (article) {
      article.claims = analystClaim;
      article.strengthOfClaim = claimStrength;
      article.method = analystMethod;
      article.evidence = evidence;
      article.isForClaim = forClaim;
    }

    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/analyst/approve/${articleId}`;

    console.log(articleId);
    console.log("URL:", url);
    // console.log("Data:", data);
    console.log("Updating");

    if (articleId) {
      try {
        console.log("Sending request...");
        console.log(article);
        await axios
          .put(url, article, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            // Handle the successful response
            console.log("Data:", response.data);
          })
          .catch((error) => {
            // Handle errors
            console.error("Error:", error);

            // You can access the response status and data here:
            if (error.response) {
              console.error("Response Status:", error.response.status);
              console.error("Response Data:", error.response.data);
            }
          });

        console.log("URL:", url);
        console.log("Data:", article);
        console.log("Headers:", {
          "Content-Type": "application/json",
        });
        // setIsSubmitted(true);
        console.log("Updated successfully!");

        // handleApprove();

        reset(); // Reset the form fields
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  //get all articles from analyst queue
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/analyst/`, {
        headers: { "user-role": userRole }, // send user role in headers
      })
      .then((response) => {
        const fetchedArticles: ArticlesInterface[] = response.data.map(
          (article: any) => ({
            ...article,
            id: article._id, // Ensure the correct id is set here
          })
        );
        SetArticles(fetchedArticles);
        setArticleId(fetchedArticles[0]._id);
        setTitle(fetchedArticles[0].title);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
      });
  }, [userRole]);

  //Called after successful update
  const handleApprove = () => {
    if (article) {
      article.claims = analystClaim;
      article.strengthOfClaim = claimStrength;
      article.method = analystMethod;
      article.evidence = evidence;
      article.isForClaim = forClaim;
    }

    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/analyst/approve/${articleId}`;

    console.log(articleId);
    console.log("URL:", url);
    // console.log("Data:", data);
    console.log("Updating");

    if (articleId) {
      try {
        console.log("Sending request...");
        console.log(article);
        axios
          .put(url, article, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            // Handle the successful response
            console.log("Data:", response.data);
          })
          .catch((error) => {
            // Handle errors
            console.error("Error:", error);

            // You can access the response status and data here:
            if (error.response) {
              console.error("Response Status:", error.response.status);
              console.error("Response Data:", error.response.data);
            }
          });

        console.log("URL:", url);
        console.log("Data:", article);
        console.log("Headers:", {
          "Content-Type": "application/json",
        });
        // setIsSubmitted(true);
        console.log("Updated successfully!");

        // handleApprove();

        reset(); // Reset the form fields
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleReject = () => {
    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/analyst/reject/${articleId}`,
        {},
        {
          headers: { "user-role": userRole }, // send user role in headers
        }
      )
      .then(() => {
        console.log("Rejected!");
        SetArticles(Articles.filter((article) => article._id !== articleId));
        reset();
      })
      .catch((error) => console.error("Error rejecting article:", error));
  };

  const handleArticle = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //get id of selected title
    setArticleId(e.target.value);
    // setTitle(e.target.title);
    console.log(`id: ${articleId} `);
  };

  useEffect(() => {
    if (articleId) {
      // Make an API request to fetch the article data
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/articles/${articleId}`)
        .then((response) => {
          // Set the fetched article data in the state
          setArticle(response.data);
          console.log(response.data.method);
          setMethod(response.data.method);
        })
        .catch((error) => {
          console.error("Error fetching articles:", error);
        });
    }
  }, [articleId]);

  const router = useRouter();

  const handleNavigateToArchive = () => {
    router.push("/analyst/archive"); // Navigate to the archive page
  };

  return (
    <div className={styles.container}>
      {userRole !== "Analyst" ? (
        <div style={{ color: "red", textAlign: "center", marginTop: "20px" }}>
          <h1>403 Access Denied</h1>
          <p>You do not have permission to view this page.</p>
        </div>
      ) : (
        <>
          <div className="Header">
            <button
              onClick={handleNavigateToArchive}
              style={{ display: "block", marginBottom: "20px" }}
            >
              Go to Archive
            </button>
            <h1>Analysis of text</h1>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.analystForm}
          >
            <div className={styles.left}>
              <div className={styles.queue}>
                <select
                  className={styles.menu}
                  value={title}
                  onChange={(event) => handleArticle(event)}
                >
                  <option value={title}>Select an Article</option>
                  {Articles.map((article) => (
                    <option key={article._id} value={article._id}>
                      {article.title}
                    </option>
                  ))}
                </select>
              </div>

              {article ? (
                <div className="info">
                  <h3>Title: {article.title}</h3>
                  <p>Authors:{article.authors} </p>
                  <p>Journal Name: {article.journalName}</p>
                  <p>Publication Year: {article.pubYear}</p>
                  <p>Volume: {article.volume}</p>
                  <p>Pages: {article.pages}</p>
                  <p>DOI: {article.doi} </p>
                  <p>Claim: {article.claims} </p>
                  <p>Method: {article.method} </p>
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>

            <div className={styles.analystEvidence}>
              <div className="evidence">
                <div className="section">
                  <label htmlFor="claim">Claim:</label>
                  <input
                    type="text"
                    placeholder="Claim"
                    id="claim"
                    onChange={(event) => {
                      setAnalystClaim(event.target.value);
                    }}
                    //  {...register(`analystClaims`)}
                    required
                  />
                </div>

                {/* Dropdown menus */}
                <div className="dropdownMenus">
                  <div className="strenghtDropdown">
                    <label>Strength Of Claim</label>
                    <select
                      value={claimStrength}
                      onChange={(event) => {
                        setClaimStrength(event.target.value);
                      }}
                      //   console.log(event.target.value);}}
                      // {...register("claimStrength")}

                      required
                    >
                      <option value="Weak">Weak</option>
                      <option value="Average">Average</option>
                      <option value="Strong">Strong</option>
                    </select>
                  </div>
                  <div className="to/forClaim">
                    <label>For/Against claim</label>
                    <select
                      value={forClaim}
                      onChange={(event) => {
                        setForClaim(event.target.value);
                      }}
                      //   console.log(event.target.value);}}
                      // {...register(`isForClaim`)}

                      required
                    >
                      <option value="For">For</option>
                      <option value="Against">Against</option>
                    </select>
                  </div>
                </div>

                <div className="method">
                  <label htmlFor="method">Method:</label>
                  <input
                    // className={formStyles.input}
                    onChange={(event) => {
                      setAnalystMethod(event.target.value);
                    }}
                    // {...register(`method`)}

                    type="text"
                    id="method"
                    placeholder="Method"
                    required
                  />
                </div>
                <div className="evidence">
                  <label htmlFor="evidence">Evidence:</label>
                  <input
                    className={styles.evidenceInput}
                    type="text"
                    placeholder="Evidence"
                    id="evidence"
                    onChange={(event) => {
                      setEvidence(event.target.value);
                    }}
                    // console.log(event.target.value);}}
                    // {...register("evidence")}

                    required
                  ></input>
                </div>
                <div className="Buttons">
                  <button onClick={() => handleApprove()}>Approve</button>
                  <button onClick={() => handleReject()}>Reject</button>
                </div>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default Evidence;
