import React, { useState } from "react";
import { useForm } from "react-hook-form";
import formStyles from "../styles/Form.module.scss";
import axios from "axios";

export default function SubmissionForm() {
  const { register, handleSubmit, reset } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = async (data: any) => {
    const url = "http://localhost:8082/api/articles";

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
    <div>
      {confirmationMessage}
      <form
        className={formStyles.form}
        onSubmit={handleSubmit(onSubmit)}
      ></form>
      <form className={formStyles.form} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="title">Title:</label>
          <input className={formStyles.input}
            {...register("title")}
            type="text"
            id="title"
            placeholder="Title"
            required
          />
        </div>

        <div>
          <label htmlFor="authors">Authors (comma-separated):</label>
          <input className={formStyles.input}
            {...register("authors")}
            type="text"
            id="authors"
            placeholder="Authors"
            required
          />
        </div>

        <div>
          <label htmlFor="journalName">Journal Name:</label>
          <input className={formStyles.input}
            {...register("journalName")}
            type="text"
            id="journalName"
            placeholder="Journal Name"
            required
          />
        </div>

        <div>
          <label htmlFor="pubYear">Publication Year:</label>
          <input className={formStyles.input}
            {...register("pubYear")}
            type="number"
            id="pubYear"
            placeholder="Publication Year"
            required
          />
        </div>

        <div>
          <label htmlFor="volume">Volume:</label>
          <input className={formStyles.input}
            {...register("volume")}
            type="number"
            id="volume"
            placeholder="Volume"
            required
          />
        </div>

        <div>
          <label htmlFor="pages">Pages:</label>
          <input className={formStyles.input}
            {...register("pages")}
            type="number"
            id="pages"
            placeholder="Pages"
            required
          />
        </div>

        <div>
          <label htmlFor="doi">DOI:</label>
          <input className={formStyles.input}
            {...register("doi")}
            type="text"
            id="doi"
            placeholder="DOI"
            required
          />
        </div>

        <input type="submit" className={formStyles.buttonItem}/>
      </form>
    </div>
  );
}
