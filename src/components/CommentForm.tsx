function CommentForm() {
    return (
        <form className="comment-form">
            <textarea placeholder="Add a comment" rows={7}></textarea>
            <div className="comment-form__footer">
                <img src="#" alt="user-image" />
                <button type="submit">SEND</button>
            </div>
        </form>
    );
}

export default CommentForm;
