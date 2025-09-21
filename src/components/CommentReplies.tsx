import Comment from "./Comment";

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
    replies?: ReplyType[];
    replyingTo?: string;
};

type Replies = {
    replies: ReplyType[] | undefined;
};

function CommentReplies(props: Replies) {
    const replies = props.replies ?  props.replies : [];

    return (
        <div className="reply-container">
            {replies.length > 0 && replies.map((reply) => (
                    <Comment key={reply.id} userComment={reply} isReply={true} />
                ))}
        </div>
    );
}

export default CommentReplies;
