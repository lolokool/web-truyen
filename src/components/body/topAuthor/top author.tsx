import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import "../../../styles/body/topAuthor.scss";
import "../../../styles/body/body.scss";
import { Col, Row } from "antd";
import axios from "axios";
import { ENV_BE } from "../../../constants";

const handleShowMore = () => {};

type authorDetail = {
  img?: string;
  nameAuthor: string;
  types: string;
  numberOfBooks?: string;
  genre: string;
  country: string;
};
const TopAuthor = () => {
  const [author, setauthor] = useState<authorDetail[]>([]);
  useEffect(() => {
    getauthorData();
  }, []);
  const getauthorData = async () => {
    try {
      const response = await axios.get(`${ENV_BE}/topAuthor`);
      setauthor(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="abs">
      <div className="block"></div>
      <div className="top-title author">
        <div className="left">
          <h2>Top Author</h2>
        </div>
        <div className="right" onClick={() => handleShowMore()}>
          Show More
          <span className="icons">
            {" "}
            <IoIosArrowForward />
          </span>
        </div>
      </div>
      <div className="data topAuthor">
        <Row>
          {author.slice(0, 3).map((author, index) => (
            <Col
              xs={{ span: 5, offset: 1 }}
              lg={{ span: 6, offset: 2 }}
              className="topAuthor-detail"
              key={index}
            >
              <div className="auThor-block">
                <div className="author-img">
                  <img src={author.img} />
                </div>
                <h3>{author.nameAuthor}</h3>
                <div className="types">
                  <div className="author-type">{author.types}</div>
                  <div className="author-country">{author.country}</div>
                </div>
                <div className="product">{author.numberOfBooks}</div>
                <div className="author-genre">
                  <h4>Genre:</h4>
                  <span>{author.genre}</span>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};
export default TopAuthor;
