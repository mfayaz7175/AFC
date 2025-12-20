import React from "react";
import { Link } from "@inertiajs/inertia-react";
import { usePage } from "@inertiajs/react";

import "./style/style.css";

const Blogs = ({ news = [], openLoginModal }) => {
  const { auth } = usePage().props;

  return (
    <section className="blog-section spad">
      <div className="container">
        <div className="section-title text-center">
          <h2>Latest News</h2>
          <p>AfCoin is the simplest way to exchange money at very low cost.</p>
        </div>
        <div className="row">
          {news.map((item, index) => (
            <div key={index} className="col-md-4">
              <div className="blog-item">
                <figure className="blog-thumb">
                  <img
                    src={item.image ? `/storage/${item.image}` : "img/blog/1.jpg"}
                    alt={item.title ? item.title : "Default Title"}
                    style={{ height: "200px", objectFit: "cover", width: "100%" }}
                  />
                </figure>
                <div className="blog-text">
                  <div className="post-date">
                    {item.created_at
                      ? new Date(item.created_at).toLocaleDateString()
                      : "03 jan 2018"}
                  </div>
                  <h4 className="blog-title">
                    {/* If user is not logged in, open login modal and pass redirect URL */}
                    {!auth?.user ? (
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          openLoginModal(route("news.index"));
                        }}
                      >
                        {item.title
                          ? item.title
                          : "Coinbase to Reopen the GDAX Bitcoin Cash-Euro Order Book"}
                      </a>
                    ) : (
                      <Link href={route("news.index")}>
                        {item.title
                          ? item.title
                          : "Coinbase to Reopen the GDAX Bitcoin Cash-Euro Order Book"}
                      </Link>
                    )}
                  </h4>
                  <div className="post-meta">
                    <a href="#">
                      <span>by</span> {item.source ? item.source : "Admin"}
                    </a>
                    <a href="#">
                      <i className="fa fa-heart-o"></i> 234 Likes
                    </a>
                    <a href="#">
                      <i className="fa fa-comments-o"></i> 8 comments
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
