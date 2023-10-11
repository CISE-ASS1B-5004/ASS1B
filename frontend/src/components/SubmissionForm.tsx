import React, { useState } from "react";
import { useForm } from "react-hook-form";
import formStyles from "../styles/Form.module.scss";
import axios from "axios";

export default function SubmissionForm() {
  const { register, handleSubmit, reset } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = async (data: any) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/articles`;

    try {
      const realAuthors = data.authors.split(",");
      data.authors = realAuthors;

      await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Submitted successfully!");
      setIsSubmitted(true);
      reset(); // Reset the form fields
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const confirmationMessage = isSubmitted && (
    <div className={formStyles.confirmation}>
      Submission successful! Thank you.
    </div>
  );

  return (
    <div className={formStyles.content}>
      {confirmationMessage}
      <form
        className={formStyles.form}
        onSubmit={handleSubmit(onSubmit)}
      ></form>
      <form className={formStyles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={formStyles.formSection}>
          <div className={formStyles.formItem}>
            <label htmlFor="title">Title:</label>
            <input
              className={formStyles.input}
              {...register("title")}
              type="text"
              id="title"
              placeholder="Title"
              required
            />
          </div>

          <div className={formStyles.formItem}>
            <label htmlFor="authors">Authors (comma-separated):</label>
            <input
              className={formStyles.input}
              {...register("authors")}
              type="text"
              id="authors"
              placeholder="Authors"
              required
            />
          </div>
          <div className={formStyles.formItem}>
            <label htmlFor="journalName">Journal Name:</label>
            <input
              className={formStyles.input}
              {...register("journalName")}
              type="text"
              id="journalName"
              placeholder="Journal Name"
              required
            />
          </div>

          <div className={formStyles.formItem}>
            <label htmlFor="pubYear">Publication Year:</label>
            <input
              className={formStyles.input}
              {...register("pubYear")}
              type="number"
              id="pubYear"
              placeholder="Publication Year"
              required
            />
          </div>

          <div className={formStyles.formItem}>
            <label htmlFor="volume">Volume:</label>
            <input
              className={formStyles.input}
              {...register("volume")}
              type="number"
              id="volume"
              placeholder="Volume"
              required
            />
          </div>
        </div>
        <div className={formStyles.formSection}>
          <div className={formStyles.formItem}>
            <label htmlFor="pages">Pages:</label>
            <input
              className={formStyles.input}
              {...register("pages")}
              type="number"
              id="pages"
              placeholder="Pages"
              required
            />
          </div>

          <div className={formStyles.formItem}>
            <label htmlFor="doi">DOI:</label>
            <input
              className={formStyles.input}
              {...register("doi")}
              type="text"
              id="doi"
              placeholder="DOI"
              required
            />
          </div>
          <div className={formStyles.formItem}>
            <label htmlFor="claims">Claims:</label>
            <input
              className={formStyles.input}
              {...register("claims")}
              type="text"
              id="claims"
              placeholder="Claims"
              required
            />
          </div>
          <div className={formStyles.formItem}>
            <label htmlFor="method">Method:</label>
            <input
              className={formStyles.input}
              {...register("method")}
              type="text"
              id="method"
              placeholder="Method"
              required
            />
          </div>
          <div className={formStyles.formItem}>
            <label>‎ </label>
            <input type="submit" className={formStyles.buttonItem} />
          </div>
        </div>
      </form>
    </div>
  );
}