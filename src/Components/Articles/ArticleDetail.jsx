import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchArticles } from "../../slice/authSlice";
const ArticleDetail = () => {
    const {id} =useParams();
    const {articles} = useSelector((state)=>state.auth);
    const[article,setArticle]=useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticleById = async (id) => {
          try {
            const response = await fetchArticles.get(`/api/articles/${id}`); 
            setArticle(response.data);
          } catch (err) {
            setError("Failed to load the article.");
          } finally {
            setLoading(false);
          }
        };
    
        fetchArticleById();
      }, [id]);
    
      if (loading) return <div>Loading article...</div>;
      if (error) return <div>{error}</div>;
    

    return (
        <div>
            <h1 className="text-2xl font-bold text-[#00818d]">{article.title}</h1>
            <img 
            src={article.imageUrl}
            alt={article.title}
            className="my-4 rounded-lg w-full" />
            <p className="text-gray-700">{article.body}</p>
        </div>
    )
}
export default  ArticleDetail;