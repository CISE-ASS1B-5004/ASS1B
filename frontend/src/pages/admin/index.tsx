import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUserRole } from "../../components/UserContext";

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

const Administrator: React.FC = () => {
    const [articles, setArticles] = useState<ArticlesInterface[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const [userRole] = useUserRole();

    useEffect(() => {
        axios
          .get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin`, {
            headers: { "user-role": userRole }, // send user role in headers
          })
          .then((response) => {
            const fetchedArticles: ArticlesInterface[] = response.data.map(
              (article: any) => ({
                ...article,
                id: article._id, // Ensure the correct id is set here
              })
            );
            setArticles(fetchedArticles);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching articles:", error);
            setIsLoading(false);
          });
      }, [userRole]); // Add userRole as a dependency, so if it changes, this effect runs again.
    

    const handleEdit = (id: string) => {
        router.push(`/admin/${id}`);
    };

    return (
        <div>
            <h1>Administrator Dashboard</h1>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Authors</th>
                        <th>Journal Name</th>
                        <th>Published Year</th>
                        <th>Volume</th>
                        <th>Pages</th>
                        <th>DOI</th>
                        <th>Claims</th>
                        <th>Method</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {articles.map(article => (
                        <tr key={article._id}>
                            <td>{article.title}</td>
                            <td>{article.authors.join(", ")}</td>
                            <td>{article.journalName}</td>
                            <td>{article.pubYear}</td>
                            <td>{article.volume}</td>
                            <td>{article.pages}</td>
                            <td>{article.doi}</td>
                            <td>{article.claims}</td>
                            <td>{article.method}</td>
                            <td>
                                <button onClick={() => handleEdit(article._id)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Administrator;
