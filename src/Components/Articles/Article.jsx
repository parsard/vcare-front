import React from "react";
import { Link } from "react-router-dom";
import rie from "../../Assets/rie.jpg";
import nozad from "../../Assets/nozad.jpg";
import ghafase from "../../Assets/ghafase.jpg";
import feshar from "../../Assets/feshar.jpg";

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
      summary: "علل و علائم یرقان نوزادان.",
      imageUrl: nozad,
    },
    {
      id: 3,
      title: "علت درد قفسه سینه سمت راست چیست؟",
      summary: "بررسی علل ممکن درد قفسه سینه.",
      imageUrl: ghafase,
    },
    {
      id: 4,
      title: "آمفیزم ریه و هر آنچه باید درباره آن بدانید.",
      summary: "همه چیز درباره آمفیزم ریه.",
      imageUrl: rie,
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-center text-2xl mb-8">مجله وی‌کِر</h1>
      <div className="grid grid-cols-2 gap-x-30 gap-y-12">
        {articles.map((article) => (
          <div
            className="bg-white rounded-lg shadow-md overflow-hidden text-center"
            key={article.id}
          >
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <Link to={`/article/${article.id}`}>
                <h2 className="text-xl mb-2">{article.title}</h2>
              </Link>
              <p className="text-gray-600">{article.summary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Article;
