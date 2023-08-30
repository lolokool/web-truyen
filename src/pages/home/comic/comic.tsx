import React, { useEffect, useState } from "react";
import { Col, Pagination, Row } from "antd";
import "../../../styles/comic/comic.scss";
import "../../../styles/body/body.scss";
import { Link } from "react-router-dom";
import { FaStar, FaHeart } from "react-icons/fa";
import ComicLayout from "../../../components/Layout/Default layout";
import { getMangas } from "../../../stores/actions";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../stores";
import { Book } from "../../../typeBook";
import TopDetailComic from "../../../components/Layout/Default layout/topDetailComic";
import ScrollToTop from "../../../utils/scroll to top";

const Comic: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, null, AnyAction> = useDispatch();
  const books = useSelector((state: RootState) => state.bookReducer.books);
  const [comics, setComics] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  useEffect(() => {
    dispatch(getMangas());
  }, []);

  useEffect(() => {
    setComics(books);
  }, [books]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = comics.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <ComicLayout
      pagination={
        <Pagination
          current={currentPage}
          total={comics.length}
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
            <Row>
              {currentItems.map((comics, index) => (
                <Col
                  xs={{ span: 5, offset: 1 }}
                  lg={{ span: 8, offset: 2 }}
                  key={index}
                  className="col-col"
                >
                  <div className="abc">
                    <div className="ima-detail">
                      <div className="ima">
                        <Link to={`/comic/${comics.id}`}>
                          <img src={comics.image} alt={comics.title} />
                        </Link>
                      </div>
                      <div className="I-detail">
                        <div className="detail-name">
                          <Link to={`/comic/${comics.id}`}>
                            <h2> {comics.title}</h2>
                          </Link>
                        </div>
                        <div className="child-name">
                          <div>Status: {comics.status}</div>
                          <div>
                            <div>
                              Genre:{" "}
                              {comics &&
                                comics.genre &&
                                comics.genre.map((genre, index) => (
                                  <span key={index} className="genre">
                                    <Link to={`/genre/${genre}`}>{genre}</Link>
                                    {index < comics.genre.length - 1 && " - "}
                                  </span>
                                ))}
                            </div>
                          </div>
                          <div>Chapter: {comics.chapters}</div>
                        </div>
                      </div>
                    </div>
                    <div className="text">
                      <p className="decriptions">{comics.decriptions}</p>
                    </div>
                    <div className="rating">
                      <div className="review">
                        <p>Review</p>
                        <FaHeart className="faHeart" /> {comics.view}
                      </div>
                      <div className="star">
                        <FaStar className="FaStar" /> <p>{comics.rating}</p>
                      </div>
                      <div className="cata">{comics.type}</div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </Col>
    </ComicLayout>
  );
};

export default Comic;
