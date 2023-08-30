import React, { useState, useEffect } from "react";
import { Carousel, Card } from "antd";
import "../../../styles/body/Featured.scss";
import "../../../styles/body/body.scss";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Book } from "../../../typeBook";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../../stores";
import { getMangas } from "../../../stores/actions";
import { selectBooks } from "../../../selector";

const settings = {
  slidesToShow: 2,
  slidesToScroll: 2,
};

const Featured = () => {
  const [DetailFeatured, setDetailFeatured] = useState<Book[]>([]);
  const dispatch: ThunkDispatch<RootState, null, AnyAction> = useDispatch();
  const getFeatured = useSelector(selectBooks);

  useEffect(() => {
    dispatch(getMangas());
  }, []);
  useEffect(() => {
    setDetailFeatured(getFeatured);
  }, [getFeatured]);

  return (
    <div className="container">
      <div className="top-title">
        <div className="left">
          <h2>Featured</h2>
        </div>
      </div>
      <Carousel {...settings} autoplay autoplaySpeed={5000}>
        {DetailFeatured.map((DetailFeatured, index) => (
          <Card key={index}>
            <Link to={`/comic/${DetailFeatured.id}`}>
              <div className="card-content">
                <div className="image">
                  <img src={DetailFeatured.imageBig} />
                </div>
                <div className="detail">
                  <h2 className="carousel-title">{DetailFeatured.title}</h2>
                  <div className="carousel-info-row">
                    <div className="carousel-info-row-left">
                      <div className="rating">
                        <FaStar className="star-icon" />
                        <span className="rating-value">
                          {DetailFeatured.rating}
                        </span>
                      </div>
                      <div className="genre">
                        Genre: {DetailFeatured.genre.join(" , ")}
                      </div>
                    </div>
                    <div className="carousel-info-row-right">
                      <div className="category">{DetailFeatured.type}</div>
                      <div className="author">
                        Author : {DetailFeatured.author}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </Card>
        ))}
      </Carousel>
    </div>
  );
};

export default Featured;
