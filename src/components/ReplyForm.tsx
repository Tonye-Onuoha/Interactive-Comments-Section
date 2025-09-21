import { useState, useContext } from "react";
import { CommentsContext } from "../Context";
import type { FormEvent, ChangeEvent } from "react";
import { commentIdGenerator } from "../utils/idGenerator";

type User = {
    image: {
        png: string;
        webp: string;
    };
    username: string;
};

type Context = {
    user: User | undefined;
    deleteComment: (id: number) => void;
    updateComment: (id: number, newComment: any) => void;
    replyComment: (id: number, newReply: any) => void;
};

type CommentType = {
    id: number;
    content: string;
    createdAt: string | Date;
    score: number;
    user: User;
    replies?: CommentType[];
    replyingTo?: string;
};

type ReplyFormProp = {
    comment: CommentType;
    onFinishReplying: () => void;
    forReply: boolean;
};

function ReplyForm(props: ReplyFormProp) {
    const [reply, setReply] = useState("");
    const [error, setError] = useState("");
    const commentsContext = useContext(CommentsContext) as Context;

    const handleReply: (e: ChangeEvent<HTMLTextAreaElement>) => void = (
        e: ChangeEvent<HTMLTextAreaElement>,
    ) => {
        // We slice the reply content to save the actual input value without the "@username" signature.
        const inputValue = e.currentTarget.value.slice(
            2 + props.comment.user.username.length,
        );
        setReply(inputValue);
    };

    const handleFormSubmit: (e: FormEvent<HTMLFormElement>) => void = (
        e: FormEvent<HTMLFormElement>,
    ) => {
        e.preventDefault(); // prevent default form behaviour (browser reload)
        const replyContent = reply.trim();
        if (!replyContent) setError("Input field cannot be empty.");
        else {
            const replyData = {
                id: commentIdGenerator(),
                content: replyContent,
                createdAt: new Date(),
                score: 0,
                replyingTo: props.comment.user.username,
                user: {
                    image: {
                        png: commentsContext.user?.image.png as string,
                        webp: commentsContext.user?.image.webp as string,
                    },
                    username: commentsContext.user?.username as string,
                },
                replies: [],
            };
            setReply("");
            commentsContext.replyComment(props.comment.id, replyData);
            props.onFinishReplying();
            window.scrollTo(0, 0);
        }
    };

    return (
        <form
            className={
                props.forReply ? "comment-form reply-form" : "comment-form"
            }
            onSubmit={handleFormSubmit}
        >
            <textarea
                name="comment"
                value={`@${props.comment.user.username} ${reply}`}
                placeholder="Add a reply"
                rows={7}
                onChange={handleReply}
            ></textarea>
            {error && <p className="error-text">{error}</p>}
            <div className="comment-form__footer">
                <img src={commentsContext.user?.image.png} alt="user-image" />
                <button
                    type="submit"
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.cursor = "pointer")
                    }
                >
                    REPLY
                </button>
            </div>
        </form>
    );
}

export default ReplyForm;
