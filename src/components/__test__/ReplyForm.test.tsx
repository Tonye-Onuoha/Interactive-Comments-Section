import { render, screen, fireEvent } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import ReplyForm from "../ReplyForm";
import { CommentsContext } from "../../Context";

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

const commentData = {
    id: 1,
    content:
        "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
    createdAt: "1 month ago",
    score: 12,
    user: {
        image: {
            png: "./src/assets/images/avatars/image-amyrobson.png",
            webp: "./src/assets/images/avatars/image-amyrobson.webp",
        },
        username: "amyrobson",
    },
    replies: [],
};

type Prop = {
    comment: CommentType;
    onFinishReplying: () => void;
    forReply: boolean;
};

const MockedReplyForm = (props: Prop) => {
    return (
        <CommentsContext
            value={{
                user: props.comment.user,
                deleteComment: () => {},
                updateComment: () => {},
                replyComment: () => {},
            }}
        >
            <ReplyForm
                comment={props.comment}
                onFinishReplying={props.onFinishReplying}
                forReply={props.forReply}
            />
        </CommentsContext>
    );
};

describe("ReplyForm component tests", () => {
    test("render reply-form correctly", () => {
        render(
            <MockedReplyForm
                comment={commentData}
                onFinishReplying={() => {}}
                forReply
            />,
        );
        const inputElement = screen.getByPlaceholderText("Add a reply");
        expect(inputElement).toBeInTheDocument();
    });

    test("change reply-form value", () => {
        render(
            <MockedReplyForm
                comment={commentData}
                onFinishReplying={() => {}}
                forReply
            />,
        );
        const inputElement = screen.getByPlaceholderText(
            "Add a reply",
        ) as HTMLInputElement;
        expect(inputElement).toBeInTheDocument();
        expect(inputElement.value).toBe("@amyrobson ");
        fireEvent.change(inputElement, {
            target: { value: "@amyrobson New Reply" },
        });
        expect(inputElement.value).toBe("@amyrobson New Reply");
    });
});
