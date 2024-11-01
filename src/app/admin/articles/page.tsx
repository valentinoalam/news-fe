// pages/article.js
import { useState } from 'react';
import PlateEditor from '@/components/plateEditor';
import axios from 'axios';
import { Article } from '@/types/article';

export default function ArticlePage( articleData: Article ) {
  const [title, setTitle] = useState(articleData?.title || '');
  const [content, setContent] = useState(articleData?.content || '');
  const [category, setCategory] = useState(articleData?.categoryId || '');
  const [mediaFiles, setMediaFiles] = useState([]); // For media files

  // Handle article creation
  const handleCreateArticle = async () => {
    try {
      const formData = new FormData();
      mediaFiles.forEach((file) => formData.append('mediaFiles', file));

      formData.append('title', title);
      formData.append('content', JSON.stringify(content)); // Convert content to JSON
      formData.append('category', category);

      const response = await axios.post('/api/articles', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log(response.data.message);
    } catch (error) {
      console.error('Error creating article:', error);
    }
  };

  // Handle article saving/updating
  const handleSaveArticle = async (articleId: string) => {
    try {
      const formData = new FormData();
      mediaFiles.forEach((file) => formData.append('mediaFiles', file));

      formData.append('title', title);
      formData.append('content', JSON.stringify(content));
      formData.append('category', category);

      const response = await axios.put(`/api/articles/${articleId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log(response.data.message);
    } catch (error) {
      console.error('Error saving article:', error);
    }
  };

  return (
    <div>
      <h1>{articleData ? 'Edit Article' : 'Create New Article'}</h1>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Article Title"
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select Category</option>
        <option value="news">News</option>
        <option value="tutorial">Tutorial</option>
      </select>

      <PlateEditor value={content} setValue={setContent} />

      <input
        type="file"
        multiple
        onChange={(e) => setMediaFiles(Array.from(e.target.files))}
      />

      <button onClick={articleData ? () => handleSaveArticle(articleData.id) : handleCreateArticle}>
        {articleData ? 'Save Article' : 'Create Article'}
      </button>
    </div>
  );
}
