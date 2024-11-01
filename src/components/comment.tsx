import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addReply } from '../store/commentsSlice';

const Comment = ({ comment }) => {
  const [replyText, setReplyText] = useState('');
  const dispatch = useDispatch();

  const handleReply = () => {
    if (replyText.trim()) {
      dispatch(
        addReply({
          parentId: comment.id,
          reply: { id: Date.now(), text: replyText, replies: [] },
        })
      );
      setReplyText('');
    }
  };

  return (
    <div className="ml-4 my-2 border-l pl-4 border-gray-300">
      <p>{comment.text}</p>
      <div className="flex items-center space-x-2 mt-2">
        <input
          type="text"
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          className="border px-2 py-1 text-sm rounded-md w-64"
          placeholder="Reply..."
        />
        <button onClick={handleReply} className="text-blue-500 text-sm">
          Reply
        </button>
      </div>
      <div className="mt-2">
        {comment.replies && comment.replies.map((reply) => (
          <Comment key={reply.id} comment={reply} />
        ))}
      </div>
    </div>
  );
};

export default Comment;
