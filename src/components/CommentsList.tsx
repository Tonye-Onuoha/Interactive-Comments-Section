import React from 'react';
import Comment from "./Comment";

interface ReplyType {
    id: number;
    content: string;
    createdAt: string;
    score: number;
    user: { image: { png: string; webp: string }; username: string };
    replyingTo: string;
    replies?: ReplyType[];
};

interface CommentType {
    id: number;
    content: string;
    createdAt: string;
    score: number;
    user: { image: { png: string; webp: string }; username: string };
    replies: ReplyType[];
};

function CommentsList(props: { comments: CommentType[] | undefined }) {

    const commentsJSX : React.ReactElement[] = []

    function renderComments(comment: CommentType | ReplyType, commentReplies: undefined | ReplyType[], reply=false) {

        commentsJSX.push(<Comment key={comment.id} userComment={comment} isReply={reply} />)

        if (commentReplies !== undefined && commentReplies.length > 0) {
            commentReplies.forEach((r) => renderComments(r, r.replies, true))
        }
    }

    props.comments?.forEach((comment: CommentType) => renderComments(comment, comment.replies))

    return (
        <div className="comments-list">
            {commentsJSX}
        </div>
    );
}

export default CommentsList;
