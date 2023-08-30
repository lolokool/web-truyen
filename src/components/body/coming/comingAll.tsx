import React, { useEffect, useState } from "react";
import "../../../styles/comic/comic.scss";
import "../../../styles/body/coming.scss";
import "../../../styles/body/body.scss";
import { Button, Col, Pagination, Row } from "antd";
import ComicLayout from "../../Layout/Default layout";
import TopDetailComic from "../../Layout/Default layout/topDetailComic";
import ScrollToTop from "../../../utils/scroll to top";
import axios from "axios";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { ENV_BE } from "../../../constants";
import "../../../styles/body/whatsNew.scss";
import "../../../styles/body/body.scss";

type comingData = {
  id: number;
  title: string;
  genre: string;
  releaseDate: string;
  country: string;
  image: string;
  imageBig: string;
  author: string;
  selected: boolean;
};

const ComingALl = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [coming, setComing] = useState<comingData[]>([]);
  const currentItems = coming.slice(indexOfFirstItem, indexOfLastItem);

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
    <ComicLayout
      pagination={
        <Pagination
          current={currentPage}
          total={coming.length}
          pageSize={itemsPerPage}
          onChange={(page) => setCurrentPage(page)}
        />
      }
      scrollToTop={currentPage > 0 && <ScrollToTop />}
    >
      <Col flex={3} className="Comiclist">
        <div className="detail-listComic">
          <TopDetailComic />
          <div className="bottom-detail">
            <div className="data">
              <Row gutter={10}>
                {currentItems.map((coming, index) => (
                  <Col
                    xs={{ span: 5, offset: 1 }}
                    lg={{ span: 6, offset: 2 }}
                    key={index}
                    className="col-col"
                  >
                    <div className="coming">
                      <div className="coming-top">
                        <div className="coming-top-img">
                          <img src={coming.image} className="anh" />
                        </div>
                        <h5 className="name-detail">{coming.title}</h5>
                        <div className="coming-top-detail">
                          <div className="Release">
                            ReleaseDate: {coming.releaseDate}
                          </div>
                          <div className="Catagory"> {coming.country}</div>
                        </div>
                      </div>
                      <div className="coming-bottom">
                        <div className="detail-coming-bottom">
                          <div className="author-detail">
                            Author: {coming.author}
                          </div>
                          <div className="genre-detail">
                            Genre: {coming.genre}
                          </div>
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
        </div>
      </Col>
    </ComicLayout>
  );
};
export default ComingALl;
