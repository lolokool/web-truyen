import React, { useEffect, useState } from "react";
import "../../../styles/comic/comic.scss";
import "../../../styles/body/body.scss";
import { Col, Pagination, Row } from "antd";
import { FaStar, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../../stores";
import { getMangas } from "../../../stores/actions";
import { Book } from "../../../typeBook";
import ComicLayout from "../../Layout/Default layout";
import TopDetailComic from "../../Layout/Default layout/topDetailComic";
import { selectWhatsNew } from "../../../selector";
import ScrollToTop from "../../../utils/scroll to top";

const WhatsNewAll = () => {
  const [comic, setComic] = useState<Book[]>([]);
  const getWhatsNew = useSelector(selectWhatsNew);
  const dispatch: ThunkDispatch<RootState, null, AnyAction> = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = getWhatsNew.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    dispatch(getMangas());
  }, []);

  useEffect(() => {
    setComic(getWhatsNew);
  }, [getWhatsNew]);

  return (
    <ComicLayout
      pagination={
        <Pagination
          current={currentPage}
          total={comic.length}
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
              {currentItems.map((comics: any, index: any) => (
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
                              {comics.genre.map((genre: any, index: any) => (
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
export default WhatsNewAll;
function selectWhatsNewBooks(state: unknown): unknown {
  throw new Error("Function not implemented.");
}
