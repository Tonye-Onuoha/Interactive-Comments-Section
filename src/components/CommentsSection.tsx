import { useState, useEffect } from "react";
import CommentsList from "./CommentsList";
import CommentForm from "./CommentForm";
import Modal from "./Modal";
import UserContext from "../Context";

type User = {
    image: {
        png: string;
        webp: string;
    };
    username: string;
};

type ReplyType = {
    id: number;
    content: string;
    createdAt: string;
    score: number;
    user: { image: { png: string; webp: string }; username: string };
    replyingTo: string;
    replies?: ReplyType[];
};

type CommentType = {
    id: number;
    content: string;
    createdAt: string;
    score: number;
    user: { image: { png: string; webp: string }; username: string };
    replies: ReplyType[];
};


interface Data {
    currentUser: User;
    comments: CommentType[]
}

function CommentsSection() {
    const [userComments, setUserComments] = useState<Data | null>(null);
    //const [commentId, setCommentId] = useState(null);
    // const [status, setStatus] = useState("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<string>("");

    useEffect(() => {
        let ignore = false;

        async function getComments() {
            try {
                const response = await fetch("data.json");
                const commentsData = await response.json();
                if (!ignore) setUserComments({ ...commentsData });
            } catch (e) {
                if (typeof e === "object" && e !== null && "message" in e && typeof e.message === "string") {
                    console.error(e.message);

                    setIsError(e.message);
                }
            } finally {
                setIsLoading(false);
            }
        }

        getComments();

        return () => {
            ignore = true
        };
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
        <UserContext value={userComments?.currentUser.username}>
            <div className="comments-section">
                {Object.keys(userComments ?? []).length > 0 && <CommentsList comments={userComments?.comments} />}
                {Object.keys(userComments ?? []).length > 0 && <CommentForm onSubmit={() => {}} user={userComments?.currentUser} />}
            </div>
            {status == "delete" && <div className="modal-background"></div>}
            {status == "delete" && <Modal />}
        </UserContext>
    );
}

export default CommentsSection;
