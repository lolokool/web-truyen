import React, { useState, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineNotificationsActive } from "react-icons/md";
import "../../../styles/body/coming.scss";
import "../../../styles/body/body.scss";
import axios from "axios";
import { Button, Col, Row } from "antd";
import { ENV_BE } from "../../../constants";
import { Link } from "react-router-dom";

type comingData = {
  id: number;
  title: string;
  genre: string;
  releaseDate: string;
  country: string;
  imageBig: string;
  author: string;
  selected: boolean;
};

const ComingSoon = () => {
  const [coming, setComing] = useState<comingData[]>([]);
  useEffect(() => {
    getComming();
  }, []);
  const getComming = async () => {
    try {
      const response = await axios.get(`${ENV_BE}/comingsoon`);
      setComing(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSelectReminder = (id: number) => {
    const updatedComing = coming.map((item) =>
      item.id === id ? { ...item, selected: !item.selected } : item
    );
    setComing(updatedComing);
  };
  return (
    <div className="container">
      <div className="top-title">
        <div className="left">
          <h2>Coming Soon</h2>
        </div>
        <Link to="/comic/coming-soon">
          <div className="right">
            Show More
            <span className="icons">
              <IoIosArrowForward />
            </span>
          </div>
        </Link>
      </div>
      <div className="data">
        <Row gutter={10}>
          {coming.slice(0, 3).map((coming, index) => (
            <Col
              xs={{ span: 5, offset: 1 }}
              lg={{ span: 6, offset: 2 }}
              key={index}
              className="col-col"
            >
              <div className="coming">
                <div className="coming-top">
                  <div className="coming-top-img">
                    <img src={coming.imageBig} className="anh" />
                    <p>Coming soon</p>
                  </div>
                  <div className="coming-top-detail">
                    <div className="Release">
                      ReleaseDate: {coming.releaseDate}
                    </div>
                    <div className="Catagory"> {coming.country}</div>
                  </div>
                </div>
                <div className="coming-bottom">
                  <div className="detail-coming-bottom">
                    <h5 className="name-detail">{coming.title}</h5>
                    <div className="author-detail">Author: {coming.author}</div>
                    <div className="genre-detail">Genre: {coming.genre}</div>
                  </div>
                  <div className="rimender">
                    <Button
                      className={`${
                        coming.selected ? "set-yellow" : "set-rimender"
                      }`}
                      onClick={() => handleSelectReminder(coming.id)}
                    >
                      <MdOutlineNotificationsActive className="MdOutlineNotificationsActive" />
                      <span>Set rimender now</span>
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};
export default ComingSoon;
