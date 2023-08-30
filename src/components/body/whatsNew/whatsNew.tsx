import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import "../../../styles/body/whatsNew.scss";
import "../../../styles/body/body.scss";
import { Col, Row } from "antd";
import { FaStar, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Book } from "../../../typeBook";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../../stores";
import { getMangas } from "../../../stores/actions";
import { selectWhatsNew } from "../../../selector";

const WhatsNew = () => {
  const [comic, setComic] = useState<Book[]>([]);
  const getWhatsNew = useSelector(selectWhatsNew);
  const dispatch: ThunkDispatch<RootState, null, AnyAction> = useDispatch();

  useEffect(() => {
    dispatch(getMangas());
  }, []);
  useEffect(() => {
    setComic(getWhatsNew);
  }, [getWhatsNew]);

  return (
    <div className="container">
      <div className="top-title">
        <div className="left">
          <h2>What's New</h2>
        </div>
        <Link to="/comic/whats-new">
          <div className="right">
            Show More
            <span className="icons">
              <IoIosArrowForward />
            </span>
          </div>
        </Link>
      </div>
      <div className="data">
        <Row>
          {comic.slice(0, 3).map((Comic, index) => (
            <Col
              xs={{ span: 5, offset: 1 }}
              lg={{ span: 6, offset: 2 }}
              key={index}
              className="col-col"
            >
              <div className="abc">
                <div className="ima-detail">
                  <Link to={`/comic/${Comic.id}`}>
                    <div className="ima">
                      <img src={Comic.image} />
                    </div>
                  </Link>
                  <div className="I-detail">
                    <div className="detail-name">
                      <Link to={`/comic/${Comic.id}`}>
                        <h4 className="child-name">{Comic.title}</h4>
                      </Link>
                    </div>
                    <div>
                      <div>Status: {Comic.status}</div>
                      <div>Genre: {Comic.genre.join(" , ")}</div>
                      <div>Chapter: {Comic.chapters}</div>
                    </div>
                  </div>
                </div>
                <div className="text">
                  <p className="decriptions">{Comic.decriptions}</p>
                </div>
                <div className="rating">
                  <div className="review">
                    <p>Review</p>
                    <FaHeart className="faHeart" /> {Comic.view}
                  </div>
                  <div className="star">
                    <FaStar className="FaStar" /> <p>{Comic.rating}</p>
                  </div>
                  <div className="cata">{Comic.type}</div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};
export default WhatsNew;
