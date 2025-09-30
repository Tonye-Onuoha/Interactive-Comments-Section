import { render, screen, fireEvent } from "@testing-library/react";
import CommentForm from "../CommentForm";

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

describe("CommentForm component tests", () => {
    test("render comment-form correctly", () => {
        render(<CommentForm onSubmit={() => {}} user={commentData.user} />);
        const inputElement = screen.getByPlaceholderText("Add a comment");
        expect(inputElement).toBeInTheDocument();
    });

    test("change comment-form value", () => {
        render(<CommentForm onSubmit={() => {}} user={commentData.user} />);
        const inputElement = screen.getByPlaceholderText(
            "Add a comment",
        ) as HTMLInputElement;
        expect(inputElement).toBeInTheDocument();
        fireEvent.change(inputElement, { target: { value: "New Post" } });
        expect(inputElement.value).toBe("New Post");
    });
});
