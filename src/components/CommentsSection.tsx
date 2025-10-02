import { useState, useEffect } from "react";
import CommentsList from "./CommentsList";
import CommentForm from "./CommentForm";
import Modal from "./Modal";
import { CommentsContext } from "../Context";

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
    createdAt: string | Date;
    score: number;
    user: User;
    replyingTo: string;
    replies?: ReplyType[];
};

type CommentType = {
    id: number;
    content: string;
    createdAt: string | Date;
    score: number;
    user: User;
    replies: ReplyType[];
    replyingTo?: string;
};

type Data = {
    currentUser: User;
    comments: CommentType[];
};

function CommentsSection() {
    const [userComments, setUserComments] = useState<Data | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<string>("");
    const [commentID, setCommentID] = useState<number>();
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const commentsSorted = userComments?.comments.sort((a, b) => {
        return a.score === b.score ? 0 : a.score > b.score ? -1 : 1;
    });

    const handleSubmitComment = (newComment: CommentType) => {
        const updatedData =
            userComments && "currentUser" in userComments
                ? {
                      ...userComments,
                      comments: [newComment, ...userComments?.comments],
                  }
                : undefined;
        if (updatedData) {
            setUserComments(updatedData);
            sessionStorage.setItem("comments", JSON.stringify(updatedData));
        }
    };

    const handleDeleteState = (id: number): void => {
        setCommentID(id);
        setIsDeleting(true);
        window.scrollTo(0, 0);
    };

    const filterComments = (id: number, comment: any) => {
        if (comment.id !== id && !("replies" in comment)) return true;
        else if (
            comment.id !== id &&
            "replies" in comment &&
            comment.replies.length === 0
        )
            return true;
        else if (
            comment.id !== id &&
            "replies" in comment &&
            comment.replies.length > 0
        ) {
            const returnedArray = comment.replies.filter(
                filterComments.bind(null, id),
            );
            comment.replies = returnedArray;
            return true;
        }
    };

    const handleDeleteComment = () => {
        const filteredComments = userComments?.comments.filter(
            filterComments.bind(null, commentID as number),
        ) as CommentType[];
        const user = userComments?.currentUser as User;
        setUserComments({ currentUser: user, comments: filteredComments });
        sessionStorage.setItem("comments", JSON.stringify({ currentUser: user, comments: filteredComments }));
        setIsDeleting(false);
    };

    const handleCancelDelete = () => {
        setCommentID(undefined);
        setIsDeleting(false);
    };

    const commentsUpdater = (comment: any, id: number, newComment: any) => {
        if (comment.id === id) {
            return newComment;
        } else if (
            !("replies" in comment) ||
            ("replies" in comment && comment.replies.length === 0)
        ) {
            return comment;
        } else if ("replies" in comment && comment.replies.length > 0) {
            const returnedCommentsArray = comment.replies.map((c: ReplyType) =>
                commentsUpdater(c, id, newComment),
            );
            comment.replies = returnedCommentsArray;
            return comment;
        }
    };

    const handleUpdateComment = (id: number, newComment: any): void => {
        const updatedComments = userComments?.comments.map(
            (comment: CommentType) => commentsUpdater(comment, id, newComment),
        ) as CommentType[];
        const user = userComments?.currentUser as User;
        setUserComments({ currentUser: user, comments: updatedComments });
        sessionStorage.setItem("comments", JSON.stringify({ currentUser: user, comments: updatedComments }));
    };

    const commentRepliesUpdater = (comment: any, id: number, newReply: any) => {
        if (comment.id === id) {
            if ("replies" in comment) {
                const updatedReplies = [...comment.replies, newReply];
                comment.replies = updatedReplies;
            } else {
                comment.replies = [newReply];
            }
            return comment;
        } else if (
            !("replies" in comment) ||
            ("replies" in comment && comment.replies.length === 0)
        ) {
            return comment;
        } else if ("replies" in comment && comment.replies.length > 0) {
            const returnedCommentsArray = comment.replies.map((c: ReplyType) =>
                commentRepliesUpdater(c, id, newReply),
            );
            comment.replies = returnedCommentsArray;
            return comment;
        }
    };

    const handleReplyComment = (id: number, newReply: any): void => {
        const updatedComments = userComments?.comments.map(
            (comment: CommentType) =>
                commentRepliesUpdater(comment, id, newReply),
        ) as CommentType[];
        const user = userComments?.currentUser as User;
        setUserComments({ currentUser: user, comments: updatedComments });
        sessionStorage.setItem("comments", JSON.stringify({ currentUser: user, comments: updatedComments }));
    };

    useEffect(() => {
        const savedComments = sessionStorage.getItem("comments");
        if (savedComments) {
            const commentsObj = JSON.parse(savedComments);
            setUserComments(commentsObj);
            setIsLoading(false);
            return;
        }

        let ignore = false;

        async function getComments() {
            try {
                const response = await fetch("/data.json");
                const commentsData = await response.json();
                if (!ignore) {
                    setUserComments({ ...commentsData });
                    sessionStorage.setItem(
                        "comments",
                        JSON.stringify(commentsData),
                    );
                }
            } catch (e) {
                if (
                    typeof e === "object" &&
                    e !== null &&
                    "message" in e &&
                    typeof e.message === "string"
                ) {
                    console.error(e.message);
                    setIsError(e.message);
                }
            } finally {
                setIsLoading(false);
            }
        }

        getComments();

        return () => {
            ignore = true;
        };
    }, []);

    if (isLoading) {
        return (
            <div className="loading-screen">
                <p className="loading-text">Loading comments...</p>
            </div>
        );
    } else if (!isLoading && isError) {
        return (
            <div className="error-screen">
                <p className="error-text">Failed to load comments!</p>
            </div>
        );
    }

    return (
        <CommentsContext
            value={{
                user: userComments?.currentUser,
                deleteComment: handleDeleteState,
                updateComment: handleUpdateComment,
                replyComment: handleReplyComment,
            }}
        >
            <div className="comments-section">
                {Object.keys(userComments ?? []).length > 0 && (
                    <CommentsList
                        comments={userComments ? commentsSorted : undefined}
                    />
                )}
                {Object.keys(userComments ?? []).length > 0 && (
                    <CommentForm
                        onSubmit={handleSubmitComment}
                        user={userComments?.currentUser}
                    />
                )}
            </div>
            {isDeleting && <div className="modal-background"></div>}
            {isDeleting && (
                <Modal
                    onCancel={handleCancelDelete}
                    onDelete={handleDeleteComment}
                />
            )}
        </CommentsContext>
    );
}

export default CommentsSection;
