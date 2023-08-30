import React, { useEffect, useState } from "react";
import { Button, Col, Input } from "antd";
import "../../../styles/comic/detail-comic.scss";
import "../../../styles/body/body.scss";
import { FaStar, FaRegCommentDots } from "react-icons/fa";
import { AiOutlineSend } from "react-icons/ai";
import { ImEye } from "react-icons/im";
import { IoMdClose } from "react-icons/io";
import { FiFolderMinus } from "react-icons/fi";
import { AiFillProfile } from "react-icons/ai";
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import { GiSheikahEye } from "react-icons/gi";
import ComicLayout from "../../../components/Layout/Default layout";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ENV_BE } from "../../../constants";
import { Book, DetailChapter } from "../../../typeBook";

const DetailComic: React.FC = () => {
  const { id } = useParams<{
    id: string;
  }>();
  const [showSinopsis, setShowSinopsis] = useState(true);
  const [showChapter, setShowChapter] = useState(false);
  const handleShowSinopsis = () => {
    setShowSinopsis(true);
    setShowChapter(false);
  };

  const handleShowChapter = () => {
    setShowSinopsis(false);
    setShowChapter(true);
  };
  const [showFollow, setShowFollow] = useState(true);
  const [showUnfollow, setShowUnfollow] = useState(false);
  const handleshowFollow = () => {
    setShowFollow(false);
    setShowUnfollow(true);
  };

  const handleshowUnfollow = () => {
    setShowFollow(true);
    setShowUnfollow(false);
  };

  const [storyDetail, setStoryDetail] = useState<Book | null>(null);
  const [detailChapter, setDetailChapter] = useState<DetailChapter[]>([]);

  const [newComment, setNewComment] = useState<string>("");
  const [comments, setComments] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getStoryDetail();
  }, [id]);

  const getStoryDetail = async () => {
    try {
      const response = await axios.get(`${ENV_BE}/MangaList`);
      const data = response.data;

      setLoading(false);

      const matchedStory = data.find((story: Book) => story.id === id);

      if (matchedStory) {
        setStoryDetail(matchedStory);
        setDetailChapter(matchedStory.detailChapter);
      } else {
        setStoryDetail(null);
      }
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  if (!storyDetail) {
    return <div>Loading...</div>;
  }

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = () => {
    if (newComment.trim() !== "") {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };
  const getFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase();
  };
  return (
    <div>
      <ComicLayout>
        <Col className="Comiclist">
          <div className="detailListComic">
            <div className="topDetail">
              <div className="imgTop">
                <img src={storyDetail.image} />
              </div>
              <div className="detailTop">
                <h2 className="nameComic">{storyDetail.title}</h2>
                <div className="rating-comic">
                  <div className="star-comic">
                    <FaStar className="icon-star" />
                    <span className="number-star">{storyDetail.rating}</span>
                  </div>
                  <div className="genre-comic">
                    <h3>Genre: </h3>
                    <div className="detail-genre">
                      {storyDetail.genre.join(" - ")}
                    </div>
                  </div>
                </div>
                <div className="status">
                  <h3>Status </h3>
                  <h4>:</h4>
                  <div className="detail-status">{storyDetail.status}</div>
                </div>
                <div className="author-type">
                  <h3>Author </h3>
                  <h4>:</h4>
                  <div className="detail-status">{storyDetail.author}</div>
                </div>
                <div className="type-author">
                  <h3>Type </h3>
                  <h4>:</h4>
                  <div className="detail-status">{storyDetail.type}</div>
                </div>
                <div className="action">
                  <div className="follow">
                    {showFollow && (
                      <Button
                        className={showFollow ? "add active" : "unfollow"}
                        onClick={handleshowFollow}
                      >
                        <BiSolidMessageSquareAdd />
                        Follow
                      </Button>
                    )}
                    {showUnfollow && (
                      <Button
                        className={showUnfollow ? "unfollow active" : "add"}
                        onClick={handleshowUnfollow}
                      >
                        <IoMdClose />
                        Unfollow
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="bottomDetail">
              <div className="leftBottom">
                <div className="title-leftBottom">
                  <Button
                    className={showSinopsis ? "Sinopsis active" : "Sinopsis"}
                    onClick={handleShowSinopsis}
                  >
                    <AiFillProfile className="AiFillProfile" />
                    Sinopsis
                  </Button>
                  <Button
                    className={showChapter ? "Chapter active" : "Chapter"}
                    onClick={handleShowChapter}
                  >
                    <FiFolderMinus className="FiFolderMinus" />
                    Chapter
                  </Button>
                </div>
                <div className="detail-leftBottom">
                  {showSinopsis && (
                    <p className="comic-detail">{storyDetail.decriptions}</p>
                  )}
                  {showChapter && (
                    <div className="comic-chapter">
                      <div className="wrappper">
                        {detailChapter.map((chapter, index) => {
                          return (
                            <div className="list-chapter" key={index}>
                              <Link
                                to={`/comic/${storyDetail.id}/${chapter.chapterId}`}
                              >
                                <div className="list-chapter-number">
                                  {chapter.chapter}
                                </div>
                              </Link>
                              <div className="list-chapter-date">
                                {chapter.date}
                              </div>
                              <div className="list-chapter-view">
                                <ImEye className="ImEye" />
                                {chapter.view}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <Link to={`/comic/${storyDetail.title}`}>
                        <Button className="read-first-chapter">
                          <GiSheikahEye className="GiSheikahEye" />
                          <p>Read first chapter</p>
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
              <div className="rightBottom">
                <div className="review-title">
                  <FaRegCommentDots className="FaRegCommentDots" />
                  Review
                </div>
                <div className="review-detail">
                  <div className="comment">
                    <div className="cmd-img">
                      {storyDetail && storyDetail.author && (
                        <div className="avatar">
                          {getFirstLetter(storyDetail.author)}
                        </div>
                      )}
                    </div>
                    <div className="cmd-right">
                      <div className="cmd-name">
                        <h3> {storyDetail && storyDetail.author}</h3>
                      </div>
                      <div className="cmd-content">
                        {comments.map((comment, index) => (
                          <div key={index}>{comment}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="addd-comment">
                    <Input
                      type="text"
                      placeholder="Write a comment..."
                      value={newComment}
                      onChange={handleCommentChange}
                    />
                    <div className="btn-cmd">
                      <div onClick={handleCommentSubmit}>
                        <AiOutlineSend className="MdAddBox" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </ComicLayout>
    </div>
  );
};

export default DetailComic;
