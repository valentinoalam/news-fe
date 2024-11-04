import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment } from '@/store/features/commentSlice';
import { CommentState } from '@/types/comment';
import CommentsComponent from './comment';

const CommentList = () => {
  const [commentText, setCommentText] = useState('');
  const comments = useSelector((state: CommentState) => state.comments);
  const dispatch = useDispatch();

  const handleAddComment = () => {
    if (commentText.trim()) {
      dispatch(
        addComment({
          id: Date.now(),
          text: commentText,
          replies: [],
        })
      );
      setCommentText('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="border px-2 py-1 text-sm rounded-md w-64"
          placeholder="Add a comment..."
        />
        <button onClick={handleAddComment} className="text-blue-500 text-sm">
          Comment
        </button>
      </div>
      <div>
        {/* Existing Comments */}
        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map(comment => (
            <CommentsComponent key={comment.id} comment={comment} />
          ))
        )}
      </div>
    </div>
  );
};

export default CommentList;
