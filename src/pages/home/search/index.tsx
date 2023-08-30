import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ComicLayout from "../../../components/Layout/Default layout";
import { Row, Col } from "antd";
import { FaHeart, FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getMangas } from "../../../stores/actions";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../../stores";
import "../../../styles/comic/comic.scss";
import { Book } from "../../../typeBook";
import { selectBooks } from "../../../selector";

const Search: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, null, AnyAction> = useDispatch();
  const books = useSelector(selectBooks);
  const location = useLocation();
  const searchValue = location.state && location.state.searchValue;

  useEffect(() => {
    dispatch(getMangas());
  }, []);

  const filteredComics = books.filter((comic: Book) =>
    comic.title.toLowerCase().includes(searchValue.toLowerCase())
  );
  return (
    <ComicLayout>
      <Col flex={3} className="Comiclist">
        <div className="detail-listComic">
          <div className="bottom-detail">
            <h2>Kết quả tìm kiếm: {searchValue}</h2>

            <Row>
              {filteredComics.map((comics: Book, index: any) => (
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
                        <div>
                          <div>Status: {comics.status}</div>
                          <div>
                            <div>
                              Genre:{" "}
                              {comics.genre.map((genre, index) => (
                                <span key={index}>
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

export default Search;
