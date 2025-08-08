import replyIcon from "../assets/images/icon-reply.svg";
import UpvoteButton from "./UpvoteButton";

function Comment(props: {
    id: number;
    content: string;
    createdAt: string;
    score: number;
    user: { image: { png: string; webp: string }; username: string };
    replies: [];
}) {
    return (
        <div className="comment">
            <div className="comment__header">
                <img className="header__user-image" src="#" alt="user-image" />
                <p className="header__username">
                    <b>amyrobson</b>
                </p>
                <p className="header__time-created">1 month ago</p>
            </div>
            <p className="comment__text">
                Impressive! Though it seems the drag feature could be improved.
                But overall it looks incredible. You've nailed the design and
                the responsiveness at various breakpoints works really well.
            </p>
            <div className="comment__footer">
                <UpvoteButton />
                <div className="footer__reply-button">
                    <img src={replyIcon} alt="reply-icon" />
                    <p>Reply</p>
                </div>
            </div>
        </div>
    );
}

export default Comment;
