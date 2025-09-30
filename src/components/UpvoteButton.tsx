import { useState, useContext } from "react";
import { CommentsContext } from "../Context";
import decrementIcon from "../assets/images/icon-minus.svg";
import incrementIcon from "../assets/images/icon-plus.svg";
import type { MouseEvent } from "react";

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

type UpvoteProps = {
    comment: CommentType;
    userScore: number;
};

function UpvoteButton(props: UpvoteProps) {
    const [score, setScore] = useState(props.userScore);
    const commentsContext = useContext(CommentsContext) as Context;

    const incrementScore: (
        event: MouseEvent<HTMLImageElement>,
    ) => void = () => {
        setScore((prevScore) => prevScore + 1);
        const updatedComment = { ...props.comment, score: score + 1 };
        commentsContext.updateComment(props.comment.id, updatedComment);
    };

    const decrementScore: (
        event: MouseEvent<HTMLImageElement>,
    ) => void = () => {
        setScore((prevScore) => {
            if (prevScore === 0) return 0;
            else {
                return prevScore - 1;
            }
        });
        const updatedComment = { ...props.comment, score: score - 1 };
        commentsContext.updateComment(props.comment.id, updatedComment);
    };

    return (
        <div className="upvote-button">
            <img
                src={incrementIcon}
                alt="plus-icon"
                onClick={incrementScore}
                onMouseEnter={(e) => {
                    e.currentTarget.style.cursor = "pointer";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.cursor = "default";
                }}
            ></img>
            <span data-testid="score" className="upvote-score">{score}</span>
            <img
                src={decrementIcon}
                alt="minus-icon"
                onClick={decrementScore}
                onMouseEnter={(e) => {
                    e.currentTarget.style.cursor = "pointer";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.cursor = "default";
                }}
            ></img>
        </div>
    );
}

export default UpvoteButton;
