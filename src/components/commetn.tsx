
// Comment Component
const CommentComponent: React.FC<{ comment: Comment }> = ({ comment }) => {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md mb-4">
        <div className="flex items-center mb-2">
          <Image 
            src={comment.author.avatar || '/default-avatar.png'} 
            alt={comment.author.name}
            width={40} 
            height={40} 
            className="rounded-full mr-3"
          />
          <div>
            <p className="font-semibold text-gray-800">{comment.author.name}</p>
            <p className="text-gray-500 text-sm">
              {formatDate(comment.createdAt)}
            </p>
          </div>
        </div>
        <p className="text-gray-700">{comment.content}</p>
        
        {comment.replies && comment.replies.length > 0 && (
          <div className="ml-8 mt-4 border-l-2 border-gray-200 pl-4">
            {comment.replies.map(reply => (
              <CommentComponent key={reply.id} comment={reply} />
            ))}
          </div>
        )}
      </div>
    );
  };
  
  // Comments Section Component
  const CommentsSection: React.FC<{ comments: Comment[] }> = ({ comments }) => {
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
            <CommentComponent key={comment.id} comment={comment} />
          ))
        )}
      </div>
    );
  };