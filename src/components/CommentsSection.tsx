import { useState, useEffect } from "react";
import CommentsList from "./CommentsList";
import CommentForm from "./CommentForm";

function CommentsSection() {
    const [userComments, setUserComments] = useState({});

    useEffect(() => {
        let ignore = false;

        async function getComments() {
            try {
                const response = await fetch("data.json");
                const commentsData = await response.json();
                if (!ignore) setUserComments({ ...commentsData });
            } catch (e) {
                console.error(e.message);
            }
        }

        getComments();

        return () => (ignore = false);
    }, []);

    return (
        <div className="comments-section">
            {Object.keys(userComments).length > 0 && <CommentsList comments={userComments.comments} />}
            {Object.keys(userComments).length > 0 && <CommentForm user={userComments.currentUser} />}
        </div>
    );
}

export default CommentsSection;
