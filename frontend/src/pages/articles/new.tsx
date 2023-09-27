import { FormEvent, useState } from "react";
import formStyles from "../../styles/Form.module.scss";
import SubmissionForm from "../../components/SubmissionForm";

const NewDiscussion = () => {
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState<string[]>([]);
  const [source, setSource] = useState("");
  const [pubYear, setPubYear] = useState<number>(0);
  const [doi, setDoi] = useState("");
  const [summary, setSummary] = useState("");
  const [linkedDiscussion, setLinkedDiscussion] = useState("");

  const submitNewArticle = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(
      JSON.stringify({
        title,
        authors,
        source,
        publication_year: pubYear,
        doi,
        summary,
        linked_discussion: linkedDiscussion,
      })
    );
  };

  // Some helper methods for the authors array
  const addAuthor = () => {
    setAuthors(authors.concat([""]));
  };
  const removeAuthor = (index: number) => {
    setAuthors(authors.filter((_, i) => i !== index));
  };
  const changeAuthor = (index: number, value: string) => {
    setAuthors(
      authors.map((oldValue, i) => {
        return index === i ? value : oldValue;
      })
    );
  };
  // Return the full form
  return (
    <SubmissionForm />
  );
};

export default NewDiscussion;
