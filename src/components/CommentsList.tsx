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
    replyingTo: string;
    replies?: ReplyType[];
};

type CommentType = {
    id: number;
    content: string;
    createdAt: string | Date;
    score: number;
    user: User;
    replies: ReplyType[];
};

function CommentsList(props: { comments: CommentType[] | undefined }) {
    const commentList = props.comments?.map((comment) => (
        <Comment key={comment.id} userComment={comment} isReply={false} />
    ));

    return <div className="comments-list" data-testid="comments-list">{commentList}</div>;
}

export default CommentsList;
