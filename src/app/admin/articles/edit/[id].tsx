import { Article } from '@/types/article';
import React from 'react';
import CreateorEditArticles from '@/components/articles/createOrEdit';

export default function EditArticlePage(articleData: Article) {
  return (
    <CreateorEditArticles articleData={articleData} />
  );
}
