import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

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

const EditArticle: React.FC = () => {
    const router = useRouter();
    const { id } = router.query; // Retrieve the article ID from the URL

    const [article, setArticle] = useState<ArticlesInterface | null>(null);
    // State for modal visibility
    const [isModalOpen, setIsModalOpen] = useState(true); 

    useEffect(() => {
        // Fetch the specific article when the ID is available
        if (id) {
            axios
                .get(`${process.env.NEXT_PUBLIC_API_URL}/api/articles/${id}`)
                .then((response) => {
                    setArticle(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching the article:", error);
                });
        }
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setArticle((prev) => (prev ? { ...prev, [name]: value } : null));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(article);
        axios
            .put(`${process.env.NEXT_PUBLIC_API_URL}/api/articles/${id}`, article)
            .then(() => {
                alert('Article updated successfully!');
                router.push('/administrator');
            })
            .catch((error) => {
                console.error('Error updating the article:', error);
            });
    };

    if (!article) return <div>Loading...</div>;

    return (
        <div>
            {/* Trigger Button (You can place it wherever necessary) */}
            <button onClick={() => setIsModalOpen(true)}>Edit Article</button>
    
            {/* Modal */}
            {isModalOpen && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ width: '80%', maxHeight: '90%', overflowY: 'auto', backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
                        
                    <h1>Edit Article</h1>

                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Title: </label>
                            <input type="text" name="title" value={article.title} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label>Authors: </label>
                            <input type="text" name="authors" value={article.authors.join(', ')} onChange={(e) => setArticle({ ...article, authors: e.target.value.split(', ') })} />
                        </div>
                        <div>
                            <label>Journal Name: </label>
                            <input type="text" name="journalName" value={article.journalName} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label>Publication Year: </label>
                            <input type="text" name="pubYear" value={article.pubYear} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label>Volume: </label>
                            <input type="text" name="volume" value={article.volume} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label>Pages: </label>
                            <input type="text" name="pages" value={article.pages} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label>DOI: </label>
                            <input type="text" name="doi" value={article.doi} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label>Claims: </label>
                            <input type="text" name="claims" value={article.claims} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label>Methods: </label>
                            <input type="text" name="method" value={article.method} onChange={handleInputChange} />
                        </div>
                        <div>
                            <button type="submit">Update</button>
                        </div>
                    </form>
    
                        <button onClick={() => setIsModalOpen(false)}>Close</button>
    
                    </div>
                </div> 
            )}
        </div>
    );
}
export default EditArticle;
