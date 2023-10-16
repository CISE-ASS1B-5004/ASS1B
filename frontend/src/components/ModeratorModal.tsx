import React, { useState } from "react";
import { ArticlesInterface } from "../utils/types";
import styles from "../styles/moderator.Modal.module.scss"

interface ModalProps {
    article: ArticlesInterface | null;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ article, onClose }) => {
    const [peerReview, setPeerReview] = useState("");
  
    if (!article) return null;
  
    const handlePeerReviewSubmit = () => {
      console.log("Peer Review Submitted:", peerReview);
    };
  
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.articleSection}>
                    <h2>{article.title}</h2>
                    <p><strong>Authors:</strong> {article.authors.join(", ")}</p>
                    <p><strong>Journal Name:</strong> {article.journalName}</p>
                    <p><strong>Published Year:</strong> {article.pubYear}</p>
                    <p><strong>Volume:</strong> {article.volume}</p>
                    <p><strong>Pages:</strong> {article.pages}</p>
                    <p><strong>DOI:</strong> {article.doi}</p>
                    <p><strong>Claims:</strong> {article.claims}</p>
                    <p><strong>Method:</strong> {article.method}</p>
                    <button onClick={onClose} className={styles.closeButton}>Close</button>
                </div>
                <div className={styles.peerReviewSection}>
                    <h3>Peer Review</h3>
                    <textarea 
                        value={peerReview} 
                        onChange={(e) => setPeerReview(e.target.value)} 
                        rows={4}
                        className={styles.textarea}
                        placeholder="Write your peer review here..."
                    />
                    <button onClick={handlePeerReviewSubmit} className={styles.submitButton}>Submit Review</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;