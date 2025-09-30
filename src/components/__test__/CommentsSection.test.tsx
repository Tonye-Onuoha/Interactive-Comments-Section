import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import CommentsSection from "../CommentsSection";
import { mockedData } from "./mockedData";
import { vi } from "vitest";

describe("CommentsSection component tests", () => {
    beforeEach(async () => {
        global.fetch = vi.fn(
            () => {
                const data = {...mockedData}
                console.log(data.comments[0].replies);
                return (
                    Promise.resolve({
                    json: () => Promise.resolve(data)
                    }) as any
                )
            }
        );
        console.log("RUN AGAIN...")
        render(<CommentsSection />);
        const loadingScreen = screen.getByText("Loading comments...");
        expect(loadingScreen).toBeInTheDocument();
        await waitFor(() => {
            const commentList = screen.getByTestId("comments-list");
            const commentForm = screen.getByTestId("comment-form");
            expect(commentList).toBeInTheDocument();
            expect(commentForm).toBeInTheDocument();
            expect(global.fetch).toHaveBeenCalledTimes(1);
            expect(global.fetch).toHaveBeenCalledWith(
                "http://localhost:5173/data.json",
            );
        });
    });

    test("user can read/view all comments", () => {
        const commentsArray = screen.getAllByTestId("comment");
        expect(commentsArray.length).toBe(4);
    });

    test("user can create new comments", () => {
        const formInput = screen.getByPlaceholderText("Add a comment");
        const submitButon = screen.getByTestId("form-submit");
        expect(formInput).toBeInTheDocument();
        expect(submitButon).toBeInTheDocument();
        // Add a new comment.
        fireEvent.change(formInput, {
            target: { value: "A brand new comment" },
        });
        // Click submit button.
        fireEvent.click(submitButon);
        // Assert new comment has been created.
        const commentsArray = screen.getAllByTestId("comment");
        expect(commentsArray.length).toBe(5);
        const paragraph = screen.getByText("A brand new comment");
        expect(paragraph).toBeInTheDocument();
    });

    test("user can delete comments", () => {
        const formInput = screen.getByPlaceholderText("Add a comment");
        const submitButon = screen.getByTestId("form-submit");
        expect(formInput).toBeInTheDocument();
        expect(submitButon).toBeInTheDocument();
        // Add a new comment.
        fireEvent.change(formInput, {
            target: { value: "Another brand new comment" },
        });
        // Click submit button.
        fireEvent.click(submitButon);
        // Assert new comment has been created.
        let commentsArray = screen.getAllByTestId("comment");
        expect(commentsArray.length).toBe(5);
        let modal = screen.queryByTestId("modal");
        expect(modal).not.toBeInTheDocument();
        // Click delete button.
        const deleteButtons = screen.getAllByText("Delete");
        const deleteButton = deleteButtons[deleteButtons.length - 1];
        fireEvent.click(deleteButton);
        // Assert modal pops up.
        modal = screen.queryByTestId("modal");
        expect(modal).toBeInTheDocument();
        // Confirm delete comment.
        const deleteConfirmed = screen.getByTestId("confirm-delete");
        fireEvent.click(deleteConfirmed);
        commentsArray = screen.getAllByTestId("comment");
        expect(commentsArray.length).toBe(4);
    });

    test("user can edit comments", () => {
        const formInput = screen.getByPlaceholderText("Add a comment");
        const submitButon = screen.getByTestId("form-submit");
        expect(formInput).toBeInTheDocument();
        expect(submitButon).toBeInTheDocument();
        // Add a new comment.
        fireEvent.change(formInput, {
            target: { value: "A brand new comment" },
        });
        // Click submit button.
        fireEvent.click(submitButon);
        // Assert new comment has been created.
        let commentsArray = screen.getAllByTestId("comment");
        expect(commentsArray.length).toBe(5);
        // Click edit button.
        const editButtons = screen.getAllByText("Edit");
        const commentEditButton = editButtons[editButtons.length - 1];
        fireEvent.click(commentEditButton);
        // Assert that the edit form is in the document.
        const editFormInput = screen.getByPlaceholderText(
            "Edit a comment",
        ) as HTMLInputElement;
        expect(editFormInput).toBeInTheDocument();
        expect(editFormInput.value).toBe("A brand new comment");
        // Edit the comment.
        fireEvent.change(editFormInput, {
            target: { value: "An edited comment" },
        });
        expect(editFormInput.value).toBe("An edited comment");
        const updateButton = screen.getByTestId("update-button");
        fireEvent.click(updateButton);
        // Assert comment has been edited.
        commentsArray = screen.getAllByTestId("comment");
        expect(commentsArray.length).toBe(5);
        let paragraph = screen.queryByText("A brand new comment");
        expect(paragraph).not.toBeInTheDocument();
        paragraph = screen.getByText("An edited comment");
        expect(paragraph).toBeInTheDocument();
    });

    test("user can reply comments", () => {
        // Assert that four comments already exist.
        let commentsArray = screen.getAllByTestId("comment");
        expect(commentsArray.length).toBe(4);
        // Click reply button.
        const replyIcons = screen.getAllByTestId("reply-icon");
        const commentReplyButton = replyIcons[0];
        fireEvent.click(commentReplyButton);
        // Assert that the reply form is in the document.
        const replyFormInput = screen.getByPlaceholderText(
            "Add a reply",
        ) as HTMLInputElement;
        expect(replyFormInput).toBeInTheDocument();
        expect(replyFormInput.value).toBe("@amyrobson ");
        // Reply the comment.
        fireEvent.change(replyFormInput, {
            target: { value: "@amyrobson A new reply" },
        });
        expect(replyFormInput.value).toBe("@amyrobson A new reply");
        const replyButton = screen.getByTestId("reply-button");
        fireEvent.click(replyButton);
        // Assert comment has been edited.
        commentsArray = screen.getAllByTestId("comment");
        expect(commentsArray.length).toBe(5);
        const paragraph = screen.getByText("A new reply");
        expect(paragraph).toBeInTheDocument();
    });

    test("user can reply another reply", () => {
        // Assert that five comments already exist.
        let commentsArray = screen.getAllByTestId("comment");
        expect(commentsArray.length).toBe(5);
        // Click reply button.
        const replyIcons = screen.getAllByTestId("reply-icon");
        const commentReplyButton = replyIcons[2];
        fireEvent.click(commentReplyButton);
        // Assert that the reply form is in the document.
        const replyFormInput = screen.getByPlaceholderText(
            "Add a reply",
        ) as HTMLInputElement;
        expect(replyFormInput).toBeInTheDocument();
        expect(replyFormInput.value).toBe("@ramsesmiron ");
        // Reply the comment.
        fireEvent.change(replyFormInput, {
            target: { value: "@ramsesmiron I love this reply" },
        });
        expect(replyFormInput.value).toBe("@ramsesmiron I love this reply");
        const replyButton = screen.getByTestId("reply-button");
        fireEvent.click(replyButton);
        // Assert comment has been replied.
        commentsArray = screen.getAllByTestId("comment");
        expect(commentsArray.length).toBe(6);
        const paragraph = screen.getByText("I love this reply");
        expect(paragraph).toBeInTheDocument();
    });
});
