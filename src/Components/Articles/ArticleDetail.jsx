import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../../slice/authSlice";

const ArticleDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { articles, loading } = useSelector((state) => state.auth);
  const [article, setArticle] = useState(null);

  useEffect(() => {
    if (!articles.length) {
      dispatch(fetchArticles());
    } else {
      const selectedArticle = articles.find((article) => article.id === id);
      setArticle(selectedArticle || null);
    }
  }, [dispatch, id, articles]);

  if (loading) return <div className="loading">در حال بارگزاری...</div>;

  if (!article) return <div className="not-found">مقاله‌ای یافت نشد.</div>;

  console.log("Redux articles:", articles);

  return (
    <div className="article-detail p-10" dir="rtl">
      <h1 className="text-2xl font-bold text-[#00818d] text-right pb-10 ">
        {article.title}
      </h1>
      <img
        src={article.imageUrl}
        alt={article.title}
        className="w-[870px] h-[470px] mx-auto my-4 rounded-lg"
      />
      <div dangerouslySetInnerHTML={{ __html: article.body }}></div>
    </div>
  );
};

export default ArticleDetail;
