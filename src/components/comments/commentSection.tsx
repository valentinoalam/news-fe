import { Comments } from '@/types/comment';
import CommentsComponent from './comment';
import React from 'react';

const CommentsSection: React.FC<{ comments: Comments[] }> = ({ comments }) => {
    const [newComment, setNewComment] = React.useState('');
  
    const handleSubmitComment = (e: React.FormEvent) => {
      e.preventDefault();
      // TODO: Implement comment submission logic
      console.log('Submitting comment:', newComment);
      setNewComment('');
    };
  
    return (
      <div className="mt-8 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        
        {/* Comment Submission Form */}
        <form onSubmit={handleSubmitComment} className="mb-6">
          <textarea 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full p-3 border rounded-lg mb-2"
            rows={4}
          />
          <button 
            type="submit" 
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Submit Comment
          </button>
        </form>
  
        {/* Existing Comments */}
        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map(comment => (
            <CommentsComponent key={comment.id} comment={comment} />
          ))
        )}
      </div>
    );
};

export default CommentsSection;