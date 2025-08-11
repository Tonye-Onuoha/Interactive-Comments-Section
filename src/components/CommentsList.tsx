import Comment from "./Comment";

type Comment = {
    id: number;
    content: string;
    createdAt: string;
    score: number;
    user: { image: { png: string; webp: string }; username: string };
    replies: [];
};



function CommentsList(props: { comments: Comment[] }) {
    const commentsJSX = [];

    function renderComments(comment, commentReplies, reply=false) {

        commentsJSX.push(<Comment key={comment.id} userComment={comment} isReply={reply} />)

        if (commentReplies.length > 0) {
            commentReplies.forEach((r) => renderComments(r, r.replies ?? [], true))
        }
    }

    props.comments?.forEach((comment) => renderComments(comment, comment.replies))

    return (
        <div className="comments-list">
            {commentsJSX}
        </div>
    );
}

export default CommentsList;
