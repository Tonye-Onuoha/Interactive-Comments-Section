import { useContext } from "react";
import UpvoteButton from "./UpvoteButton";
import UserContext from "../Context";
import replyIcon from "../assets/images/icon-reply.svg";
import deleteIcon from "../assets/images/icon-delete.svg";
import editIcon from "../assets/images/icon-edit.svg";

type CommentData = {
  userComment: {
    id: number;
    content: string;
    createdAt: string;
    score: number;
    user: { image: { png: string; webp: string }; username: string };
    replies: [];
  };
  isReply: boolean;
};

function Comment(props: CommentData) {
  const username: string | null = useContext(UserContext);
  let renderedComment;

  if (props.isReply) {
    renderedComment = (
      <div className="reply-container">
        <div className="reply-comment comment">
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
              {props.userComment.createdAt}
            </p>
          </div>
          <p className="comment__text">{props.userComment.content}</p>
          <div className="comment__footer">
            <UpvoteButton userScore={props.userComment.score} />
            {username === props.userComment.user.username ? (
              <div className="modify-container">
                <div className="delete-container">
                  <img src={deleteIcon} alt="delete-icon" />
                  <p>Delete</p>
                </div>
                <div className="edit-container">
                  <img src={editIcon} alt="edit-icon" />
                  <p>Edit</p>
                </div>
              </div>
            ) : (
              <div className="footer__reply-button">
                <img src={replyIcon} alt="reply-icon" />
                <p>Reply</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    renderedComment = (
      <div className="comment">
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
          <p className="header__time-created">{props.userComment.createdAt}</p>
        </div>
        <p className="comment__text">{props.userComment.content}</p>
        <div className="comment__footer">
          <UpvoteButton userScore={props.userComment.score} />
          {username === props.userComment.user.username ? (
            <div className="modify-container">
              <div className="delete-container">
                <img src={deleteIcon} alt="delete-icon" />
                <p>Delete</p>
              </div>
              <div className="edit-container">
                <img src={editIcon} alt="edit-icon" />
                <p>Edit</p>
              </div>
            </div>
          ) : (
            <div className="footer__reply-button">
              <img src={replyIcon} alt="reply-icon" />
              <p>Reply</p>
            </div>
          )}
        </div>
      </div>
    );
  }
  return renderedComment;
}

export default Comment;
