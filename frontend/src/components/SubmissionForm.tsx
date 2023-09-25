import React from "react";
import { useForm } from "react-hook-form";
import formStyles from "../styles/Form.module.scss";
import axios from "axios";

export default function SubmissionForm() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    const url = "http://localhost:8082/api/articles";

    try {
      const realAuthors = data.authors.split(",");
      data.authors = realAuthors;

      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form className={formStyles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={formStyles.section}>
        <label htmlFor="title">Title:</label>
        <input
          {...register("title")}
          type="text"
          id="title"
          placeholder="Title"
          required
        />
      </div>

      <div className={formStyles.section}>
        <label htmlFor="authors">Authors (comma-separated):</label>
        <input
          {...register("authors")}
          type="text"
          id="authors"
          placeholder="Authors"
          required
        />
      </div>

      <div className={formStyles.section}>
        <label htmlFor="journalName">Journal Name:</label>
        <input
          {...register("journalName")}
          type="text"
          id="journalName"
          placeholder="Journal Name"
          required
        />
      </div>

      <div className={formStyles.section}>
        <label htmlFor="pubYear">Publication Year:</label>
        <input
          {...register("pubYear")}
          type="number"
          id="pubYear"
          placeholder="Publication Year"
          required
        />
      </div>

      <div className={formStyles.section}>
        <label htmlFor="volume">Volume:</label>
        <input
          {...register("volume")}
          type="number"
          id="volume"
          placeholder="Volume"
          required
        />
      </div>

      <div className={formStyles.section}>
        <label htmlFor="pages">Pages:</label>
        <input
          {...register("pages")}
          type="number"
          id="pages"
          placeholder="Pages"
          required
        />
      </div>

      <div className={formStyles.section}>
        <label htmlFor="doi">DOI:</label>
        <input
          {...register("doi")}
          type="text"
          id="doi"
          placeholder="DOI"
          required
        />
      </div>

      <input type="submit" />
    </form>
  );
}
