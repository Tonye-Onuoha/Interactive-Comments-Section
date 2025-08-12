import { useState } from "react";

type User = {
    image: {
        png: string;
        webp: string;
    };
    username: string;
};

function CommentForm(props: { onSubmit: Function; user: User }) {
    const [comment, setComment] = useState("");
    const [error, setError] = useState("");

    const handleComment: Function = (e: any) => setComment(e.currentTarget.value);

    const handleFormSubmit: Function = (e: any) => {
        e.preventDefault(); // prevent default form behaviour (browser reload)
        const commentContent = comment.trim();
        if (!commentContent) setError("Input field cannot be empty.");
        else {
            const commentData = {
                id: 5,
                content: commentContent,
                createdAt: new Date(),
                score: 0,
                user: {
                    image: {
                        png: "./images/avatars/image-juliusomo.png",
                        webp: "./images/avatars/image-juliusomo.webp",
                    },
                    username: "juliusomo",
                },
            };
            props.onSubmit(commentData);
        }
    };

    return (
        <form className="comment-form" onSubmit={handleFormSubmit}>
            <textarea
                name="comment"
                value={comment}
                placeholder="Add a comment"
                rows={7}
                onChange={handleComment}
            ></textarea>
            {error && <p className="error-text">{error}</p>}
            <div className="comment-form__footer">
                <img src={props.user.image.png} alt="user-image" />
                <button type="submit">SEND</button>
            </div>
        </form>
    );
}

export default CommentForm;
