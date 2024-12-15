import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../../slice/authSlice";

const ArticleDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { articles, loading } = useSelector((state) => state.auth); // Add loading state from Redux
  const [article, setArticle] = useState(null);

  useEffect(() => {
    if (!articles.length) {
      dispatch(fetchArticles()); // Fetch articles if they’re not loaded
    } else {
      // Find the article by ID in the Redux state
      const selectedArticle = articles.map((article) => ({
          value:article._id,
          label:article.imageUrl        
      })

      
    
    );

      setArticle(selectedArticle);
    }
  }, [dispatch, id, articles]);
  // Show a loading message if Redux is still fetching articles
  if (loading) return <div className="loading">در حال بارگزاری...</div>;

  // Show a message if the article is not found
  if (!article) return <div className="not-found">مقاله‌ای یافت نشد.</div>;

  console.log("Redux articles:", articles);
  console.log("Article ID from URL:", id);

  return (
    <div className="article-detail">
      <h1 className="text-2xl font-bold text-[#00818d]">{article.title}</h1>
      <img
        src={article.imageUrl}
        alt={article.title}
        className="my-4 rounded-lg w-full"
      />
      <p className="text-gray-700">{article.body}</p>
    </div>
  );
};

export default ArticleDetail;
