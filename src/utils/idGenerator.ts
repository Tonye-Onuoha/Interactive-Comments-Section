let commentID = 5;
let replyID = 4;

const commentIdGenerator = () => ++commentID;
const replyIdGenerator = () => ++replyID;

export { commentIdGenerator, replyIdGenerator };
