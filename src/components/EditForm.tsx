import { useState, useContext } from "react";
import { CommentsContext } from "../Context";
import type { ChangeEvent, FormEvent } from "react";

type User = {
    image: {
        png: string;
        webp: string;
    };
    username: string;
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

type EditFormProps = {
    comment: CommentType;
    onFinishEditing: () => void;
    forReply: boolean;
};

type Context = {
    user: User | undefined;
    deleteComment: (id: number) => void;
    updateComment: (id: number, newComment: any) => void;
    replyComment: (id: number, newReply: any) => void;
};

function EditForm(props: EditFormProps) {
    const [text, setText] = useState(props.comment.content);
    const [error, setError] = useState("");
    const commentsContext = useContext(CommentsContext) as Context;

    const handleEditForm = (e: ChangeEvent<HTMLTextAreaElement>) =>
        {
            if (props.forReply) {
                // We slice the reply content to save the actual input value without the "@username" signature.
                const replyingToLength = props.comment.replyingTo?.length as number;
                const inputValue = e.currentTarget.value.slice(2 + replyingToLength);
                setText(inputValue);
            } else {
                setText(e.currentTarget.value);
            }
        }

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // prevent default form behaviour (browser reload)
        const newContent = text.trim();
        if (!newContent) {
            setError("Input field cannot be empty.");
        } else {
            const updatedComment: CommentType = {
                id: props.comment.id,
                content: newContent,
                createdAt: new Date(),
                score: props.comment.score,
                user: {
                    image: {
                        png: props.comment.user.image.png as string,
                        webp: props.comment.user.image.webp as string,
                    },
                    username: props.comment.user.username as string,
                },
                replies: props.comment.replies ?? [],
            };
            if (props.forReply) updatedComment["replyingTo"] = props.comment.replyingTo;
            commentsContext.updateComment(props.comment.id, updatedComment);
            props.onFinishEditing();
        }
    };

    const textValue = props.forReply ? `@${props.comment.replyingTo} ${text}` : text;

    return (
        <form className="edit-form" onSubmit={handleFormSubmit}>
            <textarea
                value={textValue}
                placeholder="Edit a comment"
                rows={7}
                onChange={handleEditForm}
            ></textarea>
            <div className="update-button-container">
                <button
                    type="submit"
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.cursor = "pointer")
                    }>UPDATE</button>
            </div>
            {error && <p className="error-text">{error}</p>}
        </form>
    );
}

export default EditForm;
