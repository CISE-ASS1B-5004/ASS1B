import css from "../styles/pages.module.scss";

export default function Home() {
  return (
    <div className={css.page}>
      <h1>Welcome to SPEED - Software Practice Empirical Evidence Database</h1>

      <h2>About SPEED</h2>
      <p>
        SPEED, short for Software Practice Empirical Evidence Database, is a
        collaborative platform created as part of CISE Group 5004's Assignment
        1B. Our primary goal is to provide a centralized repository for
        empirical evidence related to software development practices.
      </p>

      <h2>What We Offer</h2>
      <p>
        SPEED offers a range of features to help you explore and contribute to
        our database:
      </p>
      <ul>
        <li>
          <strong>Article Submission:</strong> We encourage anyone from the
          public to propose articles for inclusion in SPEED. You can submit
          links to relevant articles, allowing us to collect a diverse range of
          empirical evidence.
        </li>
        <li>
          <strong>Moderation:</strong> Our dedicated team of experts from the
          Software Engineering Research Center (SERC) serves as moderators. They
          meticulously review proposed articles for quality, relevance, and
          duplication. Only the most valuable contributions proceed to the next
          step.
        </li>
        <li>
          <strong>Analysis:</strong> Our team of Analysts, who are SERC staff
          members, carefully read and analyze the approved articles. They
          extract vital information such as abstracts, methodologies, and
          references.
        </li>
        <li>
          <strong>Database Entry:</strong> The extracted information is then
          entered into the SPEED database, making it easily accessible for users
          interested in researching and exploring software development
          practices.
        </li>
      </ul>
    </div>
  );
}
