import { useState } from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addReply } from '@/store/features/commentSlice';
import { Comments } from '@/types/comment';
import { formatRelativeTime } from '@/utils/dateFormat.util';

const CommentsComponent: React.FC<{ comment: Comments }> = ({ comment }) => {
  const [replyText, setReplyText] = useState('');
  const dispatch = useDispatch();

  const handleReply = () => {
    if (replyText.trim()) {
      dispatch(
        addReply({
          parentId: comment.id,
          reply: {
            content: replyText, replies: [],
            id: '',
            articleId: '',
            parentId: '',
            author: {
              name: '',
              avatar: ''
            }
          },
        })
      );
      setReplyText('');
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4 ml-4 border-l border-gray-300">
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
            {formatRelativeTime(comment.createdAt)}
          </p>
        </div>
      </div>
      <p className="text-gray-700">{comment.content}</p>
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

      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-8 mt-4 border-l-2 border-gray-200 pl-4">
          {comment.replies.map(reply => (
            <CommentsComponent key={reply.id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentsComponent;
