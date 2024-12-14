import React, { forwardRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import feshar from "../../Assets/2.jpg";
import nozad from "../../Assets/1.jpg";
import ghafase from "../../Assets/4.jpg";
import rie from "../../Assets/3.jpg";
import { fetchArticles } from "../../slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
 const Article = forwardRef((props,articleRef) => {


  const dispatch = useDispatch();
  const {articles, error, loading } = useSelector((state) => state.auth);

  const [currentSlide, setCurrentSlide] = useState(0);

  const navigate = useNavigate();

  


  useEffect(() => {
    if (!articles.length ) {
      dispatch(fetchArticles());
    }
  }, [dispatch, articles.length]);
  if (error) {
    return <div>خطا در بارگزاری مقالات</div>;
  }
  if (loading) {
    return <div>در حال بارگزاری</div>
  }

  const handleNavigateArticle = (id)=>{
    navigate(`/article/${id}`)
  }
  

  // const nextSlide = () => {
  //   setCurrentSlide((prev) => (prev + 2) % articles.length);
  // };

  // const prevSlide = () => {
  //   setCurrentSlide((prev) => (prev - 2 + articles.length) % articles.length);
  // };
  // const nextSlide = () => {
  //   setCurrentSlide((prev) => (prev + 2 < articles.length ? prev + 2 : 0));
  // };

  // const prevSlide = () => {
  //   setCurrentSlide((prev) => (prev - 2 >= 0 ? prev - 2 : articles.length - 2));
  // };
  // const handleNextPage = ()=>{
  //   if (nextPage){
  //     dispatch(fetchArticles(nextPage));
  //     setCurrentSlide(0)
  //   }
  // }
  // const handlePrevPage = ()=>{
  //   if (nextPage){
  //     dispatch(fetchArticles(prevPage));
  //     setCurrentSlide(0)
  //   }
  // }

  // const nextSlide= ()=>{
    
  //   if(currentSlide +2 <articles.length){
  //     setCurrentSlide((prev)=>prev+2)
  //   }else if (nextPage && !loading){
  //     dispatch(fetchArticles(nextPage)).then(() => setCurrentSlide(0));

  //   }
  // }
  // const prevSlide= ()=>{
    
  //   if(currentSlide -2 >=0){
  //     setCurrentSlide((prev)=>prev-2)
  //   }else if (prevPage && !loading){
  //     dispatch(fetchArticles(prevPage)).then(() => setCurrentSlide(articles.length -2));

  //   }
  // }


  return (
    <div className="relative   flex justify-center items-center overflow-hidden mb-10 mt-20 pt-20">
      <div className="absolute top-0 right-0 z-10 p-4">
        <h1
        ref={articleRef}
          className="text-xl font-bold text-[#00818d]"
          style={{ marginRight: "60px" }}
        >
          {" "}
          مجله وی کر{" "}
        </h1>
      </div>
      <div className="w-[1000px] h-[350px] relative flex space-x-8">
        <AnimatePresence mode="wait">
          {articles
            .slice(currentSlide, currentSlide + 2)
            .map((article, index) => (
              <motion.div
                key={article.id}
                onClick={()=>handleNavigateArticle(article.id)}
                initial={{ opacity: 0, x: index === 0 ? 100 : -100 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.5,
                    ease: "easeInOut",
                  },
                }}
                exit={{
                  opacity: 0,
                  x: index === 0 ? -100 : 100,
                  transition: {
                    duration: 0.5,
                  },
                }}
                className="w-1/2  h-full relative flex-shrink-0 rounded-lg "
                style={{
                  backgroundImage: `url(${article.imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  cursor:"pointer"
                }}

                // onClick={handleNavigateArticle(article.id)}
              >
                <div className="absolute bottom-[-50px] w-full bg-white/100 text[#00818d] p-4 rounded-full">
                  
                  <h2 className="text-lg font-bold truncate text-[#00818d] text-center mb-10">
                    {article.title}
                  </h2>
                </div>
              </motion.div>
            ))}
        </AnimatePresence>

        {/* <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/50 rounded-full p-2 z-10 hover:bg-white/70 transition-all duration-300"
          disabled={!prevPage && currentSlide === 0}
        >
          ←
        </button> */}
        {/* <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/50 rounded-full p-2 z-10 hover:bg-white/70 transition-all duration-300"
          disabled={!nextPage && currentSlide + 2 >= articles.length}
        >
          →
        </button> */}
      </div>
    </div>
  );
});

export default Article;
