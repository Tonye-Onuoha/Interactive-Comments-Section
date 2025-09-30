import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { commentIdGenerator } from "../utils/idGenerator";

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
};

interface SubmitHandler {
    (newComment: CommentType): void;
}

function CommentForm(props: {
    onSubmit: SubmitHandler;
    user: User | undefined;
}) {
    const [comment, setComment] = useState("");
    const [error, setError] = useState("");

    const handleComment: (e: ChangeEvent<HTMLTextAreaElement>) => void = (
        e: ChangeEvent<HTMLTextAreaElement>,
    ) => setComment(e.currentTarget.value);

    const handleFormSubmit: (e: FormEvent<HTMLFormElement>) => void = (
        e: FormEvent<HTMLFormElement>,
    ) => {
        e.preventDefault(); // prevent default form behaviour (browser reload)
        const commentContent = comment.trim();
        if (!commentContent) setError("Input field cannot be empty.");
        else {
            const commentData = {
                id: commentIdGenerator(),
                content: commentContent,
                createdAt: new Date(),
                score: 0,
                user: {
                    image: {
                        png: props.user?.image.png as string,
                        webp: props.user?.image.webp as string,
                    },
                    username: props.user?.username as string,
                },
                replies: [],
            };
            props.onSubmit(commentData);
            setComment("");
            window.scrollTo(0, 0);
        }
    };

    return (
        <form className="comment-form" data-testid="comment-form" onSubmit={handleFormSubmit}>
            <textarea
                name="comment"
                value={comment}
                placeholder="Add a comment"
                rows={7}
                onChange={handleComment}
                data-testid="form-input"
            ></textarea>
            {error && <p className="error-text">{error}</p>}
            <div className="comment-form__footer">
                <img src={props.user?.image.png} alt="user-image" />
                <button
                    type="submit"
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.cursor = "pointer")
                    }
                    data-testid="form-submit"
                >
                    SEND
                </button>
            </div>
        </form>
    );
}

export default CommentForm;
