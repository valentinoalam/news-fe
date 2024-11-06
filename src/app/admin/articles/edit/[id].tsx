import { Article } from '@/types/article';
import React from 'react';
import CreateorEditArticles from '@/components/articles/admin/createOrEdit';

export default function EditArticlePage(articleData: Article) {
  return (
    <CreateorEditArticles articleData={articleData} />
  );
}
