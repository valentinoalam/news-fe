import { Comment, CommentState } from '@/types/comment';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState: CommentState = {
  comments: [], // Each comment could have a structure with an id, text, author, and replies
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action) => {
      state.comments.push(action.payload);
    },
    addReply: (state, action: PayloadAction<{ parentId: string; reply: Comment }>) => {
      const { parentId, reply } = action.payload;
    
      const addReplyRecursive = (comments: Comment[]): Comment[] => {
        return comments.map((comment) => {
          if (comment.id === parentId) {
            return {
              ...comment,
              replies: comment.replies ? [...comment.replies, reply] : [reply],
            };
          } else if (comment.replies) {
            return {
              ...comment,
              replies: addReplyRecursive(comment.replies),
            };
          }
          return comment;
        });
      };
    
      state.comments = addReplyRecursive(state.comments);
    },    
  },
});

export const { addComment, addReply } = commentsSlice.actions;

export default commentsSlice.reducer;
