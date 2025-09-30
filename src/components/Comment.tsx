import { useState, useContext } from "react";
import type { ReactNode } from "react";
import UpvoteButton from "./UpvoteButton";
import EditForm from "./EditForm";
import CommentReplies from "./CommentReplies";
import ReplyForm from "./ReplyForm";
import replyIcon from "../assets/images/icon-reply.svg";
import deleteIcon from "../assets/images/icon-delete.svg";
import editIcon from "../assets/images/icon-edit.svg";
import { CommentsContext } from "../Context";
import { format } from "timeago.js";

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

type CommentData = {
    userComment: CommentType;
    isReply: boolean;
};

function Comment(props: CommentData) {
    const [isEditing, setIsEditing] = useState(false);
    const [isReplying, setIsReplying] = useState(false);
    const commentsContext = useContext(CommentsContext) as Context;
    const username = commentsContext.user?.username as string;
    const repliesLength = props.userComment.replies?.length;
    const commentHasReplies = repliesLength ? repliesLength > 0 : false;

    const handleSwitchEditing = () => setIsEditing(!isEditing);

    const handleFinishEditing = () => setIsEditing(false);

    const handleIsReplying = () => setIsReplying(!isReplying);

    const handleFinishReplying = () => setIsReplying(false);

    let content: string | ReactNode = props.userComment.content;

    if (props.isReply)
        content = (
            <span>
                <b className="replying-to">@{props.userComment.replyingTo}</b>{" "}
                {`${props.userComment.content}`}
            </span>
        );

    return (
        <>
            <div
                className={props.isReply ? "reply-comment comment" : "comment"}
                data-testid="comment"
            >
                <div className="comment-container">
                    <div className="upvote-container">
                        <UpvoteButton
                            comment={props.userComment}
                            userScore={props.userComment.score}
                        />
                    </div>
                    <div className="comment-content">
                        <div className="comment__header">
                            <img
                                className="header__user-image"
                                src={props.userComment.user.image.png}
                                alt="user-image"
                            />
                            <p className="header__username">
                                <b>{props.userComment.user.username}</b>
                            </p>
                            {username === props.userComment.user.username && (
                                <span className="user-identifier">you</span>
                            )}
                            <p className="header__time-created">
                                {typeof props.userComment.createdAt !== "object"
                                    ? props.userComment.createdAt
                                    : format(props.userComment.createdAt)}
                            </p>
                            {username === props.userComment.user.username ? (
                                <div className="modify-container modify-desktop">
                                    <div
                                        className="delete-container"
                                        onClick={() =>
                                            commentsContext.deleteComment(
                                                props.userComment.id,
                                            )
                                        }
                                        onMouseEnter={(e) =>
                                            (e.currentTarget.style.cursor =
                                                "pointer")
                                        }
                                    >
                                        <img
                                            src={deleteIcon}
                                            alt="delete-icon"
                                        />
                                        <p>Delete</p>
                                    </div>
                                    <div
                                        className="edit-container"
                                        onClick={handleSwitchEditing}
                                        onMouseEnter={(e) =>
                                            (e.currentTarget.style.cursor =
                                                "pointer")
                                        }
                                    >
                                        <img src={editIcon} alt="edit-icon" />
                                        <p>Edit</p>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className="header__reply-button"
                                    onClick={handleIsReplying}
                                    onMouseEnter={(e) =>
                                        (e.currentTarget.style.cursor =
                                            "pointer")
                                    }
                                    data-testid="reply-icon"
                                >
                                    <img src={replyIcon} alt="reply-icon" />
                                    <p>Reply</p>
                                </div>
                            )}
                        </div>
                        {isEditing ? (
                            <EditForm
                                comment={props.userComment}
                                onFinishEditing={handleFinishEditing}
                                forReply={props.isReply}
                            />
                        ) : (
                            <p className="comment__text">{content}</p>
                        )}
                    </div>
                </div>
                <div className="comment__footer">
                    <UpvoteButton
                        comment={props.userComment}
                        userScore={props.userComment.score}
                    />
                    {username === props.userComment.user.username ? (
                        <div className="modify-container">
                            <div
                                className="delete-container"
                                onClick={() =>
                                    commentsContext.deleteComment(
                                        props.userComment.id,
                                    )
                                }
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.cursor = "pointer")
                                }
                            >
                                <img src={deleteIcon} alt="delete-icon" />
                                <p>Delete</p>
                            </div>
                            <div
                                className="edit-container"
                                onClick={handleSwitchEditing}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.cursor = "pointer")
                                }
                            >
                                <img src={editIcon} alt="edit-icon" />
                                <p>Edit</p>
                            </div>
                        </div>
                    ) : (
                        <div
                            className="footer__reply-button"
                            onClick={handleIsReplying}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.cursor = "pointer")
                            }
                        >
                            <img src={replyIcon} alt="reply-icon" />
                            <p>Reply</p>
                        </div>
                    )}
                </div>
            </div>
            {isReplying && (
                <ReplyForm
                    comment={props.userComment}
                    onFinishReplying={handleFinishReplying}
                    forReply={props.isReply}
                />
            )}
            {commentHasReplies && (
                <CommentReplies replies={props.userComment.replies} />
            )}
        </>
    );
}

export default Comment;
