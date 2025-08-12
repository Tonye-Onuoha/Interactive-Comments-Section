import { useState } from "react";
import decrementIcon from "../assets/images/icon-minus.svg";
import incrementIcon from "../assets/images/icon-plus.svg";

function UpvoteButton(props: { userScore: number }) {
    const [score, setScore] = useState(props.userScore);

    const incrementScore: Function = () =>
        setScore((prevScore) => prevScore + 1);

    const decrementScore: Function = () =>
        setScore((prevScore) => {
            if (prevScore === 0) return 0;
            else {
                return prevScore - 1;
            }
        });

    return (
        <div className="upvote-button">
            <img
                src={incrementIcon}
                alt="plus-icon"
                onClick={incrementScore}
                onMouseEnter={(e) => {
                    e.currentTarget.style.cursor = "pointer";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.cursor = "default";
                }}
            ></img>
            <span className="upvote-score">{score}</span>
            <img
                src={decrementIcon}
                alt="minus-icon"
                onClick={decrementScore}
                onMouseEnter={(e) => {
                    e.currentTarget.style.cursor = "pointer";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.cursor = "default";
                }}
            ></img>
        </div>
    );
}

export default UpvoteButton;
