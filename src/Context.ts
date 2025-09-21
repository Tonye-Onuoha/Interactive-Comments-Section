import { createContext } from "react";

type User = {
    image: {
        png: string;
        webp: string;
    };
    username: string;
};

type Context = {
    user: User | undefined;
    deleteComment: (id: number) => void;
    updateComment: (id: number, newComment: any) => void;
    replyComment: (id: number, newReply: any) => void;
};

export const CommentsContext = createContext<null | Context>(null);
