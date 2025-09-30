import { render, screen, fireEvent } from "@testing-library/react";
import UpvoteButton from "../UpvoteButton";
import { CommentsContext } from "../../Context";

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
    value: number;
};

const MockedUpvoteButton = (prop: Prop) => {
    return (
        <CommentsContext
            value={{
                user: {
                    image: {
                        png: "./src/assets/images/avatars/image-amyrobson.png",
                        webp: "./src/assets/images/avatars/image-amyrobson.webp",
                    },
                    username: "amyrobson",
                },
                deleteComment: () => {},
                updateComment: () => {},
                replyComment: () => {},
            }}
        >
            <UpvoteButton comment={commentData} userScore={prop.value} />
        </CommentsContext>
    );
};

describe("UpvoteButton component tests", () => {
    test("render upvote score correctly", () => {
        render(<UpvoteButton comment={commentData} userScore={17} />);
        const spanElement = screen.getByTestId("score");
        expect(spanElement).toBeInTheDocument();
        expect(spanElement.textContent).toBe("17");
    });

    test("render upvote score increases correctly", () => {
        render(<MockedUpvoteButton value={0} />);
        const spanElement = screen.getByTestId("score");
        expect(spanElement).toBeInTheDocument();
        expect(spanElement.textContent).toBe("0");
        const plusImage = screen.getByAltText("plus-icon");
        fireEvent.click(plusImage);
        expect(spanElement.textContent).toBe("1");
    });

    test("render upvote score decreases correctly", () => {
        render(<MockedUpvoteButton value={10} />);
        const spanElement = screen.getByTestId("score");
        expect(spanElement).toBeInTheDocument();
        expect(spanElement.textContent).toBe("10");
        const minusImage = screen.getByAltText("minus-icon");
        fireEvent.click(minusImage);
        expect(spanElement.textContent).toBe("9");
    });
});
