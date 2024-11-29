import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// تصاویر را ایمپورت کنید
import feshar from "../../Assets/2.jpg";
import nozad from "../../Assets/1.jpg";
import ghafase from "../../Assets/4.jpg";
import rie from "../../Assets/3.jpg";
import { fetchArticles } from "../../slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
const Article = () => {
  const articles = [
    {
      id: 1,
      title: "اکسیژن خون نرمال چند است؟",
      summary: "سطح طبیعی اکسیژن خون و اهمیت آن.",
      imageUrl: feshar,
    },
    {
      id: 2,
      title: "زردی یا یرقان نوزاد",
      summary: "علل و علائم یرقان نوزادان",
      imageUrl: nozad,
    },
    {
      id: 3,
      title: "علت درد قفسه سینه سمت راست چیست؟",
      summary: "بررسی علل ممکن درد قفسه سینه",
      imageUrl: ghafase,
    },
    {
      id: 4,
      title: "آمفیزم ریه و هر آنچه باید درباره آن بدانید",
      summary: "همه چیز درباره آمفیزم ریه",
      imageUrl: rie,
    },
  ];

  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.auth);

  const [currentSlide, setCurrentSlide] = useState(0);
  // useEffect(() => {
  //   dispatch(fetchArticles());
  // }, [dispatch]);
  // if (error) {
  //   return <div>خطا در بارگزاری مقالات</div>;
  // }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 2) % articles.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 2 + articles.length) % articles.length);
  };

  return (
    <div className="relative   flex justify-center items-center overflow-hidden mb-10 mt-20 pt-20">
      <div className="absolute top-0 right-0 z-10 p-4">
        <h1 className="text-xl font-bold text-[#00818d]"> مجله وی کر </h1>
      </div>
      <div className="w-[1000px] h-[350px] relative flex space-x-8">
        <AnimatePresence mode="wait">
          {articles
            .slice(currentSlide, currentSlide + 2)
            .map((article, index) => (
              <motion.div
                key={article.id}
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
                }}
              >
                <div className="absolute bottom-[-50px] w-full bg-white/100 text[#00818d] p-4 rounded-full">
                  <h2 className="text-lg font-bold truncate text-[#00818d] text-center mb-10">
                    {article.title}
                  </h2>
                </div>
              </motion.div>
            ))}
        </AnimatePresence>

        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/50 rounded-full p-2 z-10 hover:bg-white/70 transition-all duration-300"
        >
          ←
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/50 rounded-full p-2 z-10 hover:bg-white/70 transition-all duration-300"
        >
          →
        </button>
      </div>
    </div>
  );
};

export default Article;
