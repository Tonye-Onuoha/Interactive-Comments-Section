import { useState, useEffect } from "react";
import CommentsList from "./CommentsList";
import CommentForm from "./CommentForm";
import UserContext from "../Context";

function CommentsSection() {
    const [userComments, setUserComments] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(null);

    useEffect(() => {
        let ignore = false;

        async function getComments() {
            try {
                const response = await fetch("data.json");
                const commentsData = await response.json();
                if (!ignore) setUserComments({ ...commentsData });
            } catch (e) {
                console.error(e.message);
                setIsError(e.message);
            } finally {
                setIsLoading(false);
            }
        }

        getComments();

        return () => (ignore = false);
    }, []);

    if (isLoading) {
        return (
            <div className="loading-screen">
                <p className="loading-message">Loading comments...</p>
            </div>
        );
    } else if (!isLoading && isError) {
        return (
            <div className="error-screen">
                <p className="error-message">Failed to load comments!</p>
            </div>
        );
    }

    return (
        <UserContext value={userComments.currentUser.username}>
            <div className="comments-section">
                {Object.keys(userComments).length > 0 && <CommentsList comments={userComments.comments} />}
                {Object.keys(userComments).length > 0 && <CommentForm user={userComments.currentUser} />}
            </div>
        </UserContext>
    );
}

export default CommentsSection;
