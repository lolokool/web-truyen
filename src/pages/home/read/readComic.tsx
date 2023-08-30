import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout/Default layout/layout";
import "../../../styles/comic/readComic.scss";
import { FaHome } from "react-icons/fa";
import { FiList } from "react-icons/fi";
import { Breadcrumb, Select } from "antd";
import {
  BsFillArrowLeftCircleFill,
  BsArrowRightCircleFill,
} from "react-icons/bs";
import axios from "axios";
import { useParams } from "react-router";
import { ENV_BE } from "../../../constants";
import { Link } from "react-router-dom";

interface DetailChapter {
  chapterId: string;
  images: Images[];
  chapter: string;
  date: string;
  view: string;
}

interface Images {
  id: number;
  url: string;
  caption: string;
}

const ReadComic: React.FC = () => {
  const { id, chapterId } = useParams<{
    id: string;
    chapterId: string;
  }>();

  const [mangaTitle, setMangaTitle] = useState("");
  const [chapterData, setChapterData] = useState<DetailChapter[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<DetailChapter | null>(
    null
  );
  const [detailImage, setDetailImage] = useState<Images[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getChapterData();
  }, [id, chapterId]);

  const getChapterData = async () => {
    try {
      const response = await axios.get(`${ENV_BE}/MangaList/${id}`);

      setMangaTitle(response.data.title);
      const detailChapterData: DetailChapter[] = response.data.detailChapter;
      setChapterData(detailChapterData);

      const newChapterData = detailChapterData.find(
        (el: DetailChapter) => el.chapterId === chapterId
      );

      if (newChapterData) {
        setSelectedChapter(newChapterData);
        setDetailImage(newChapterData.images);
      } else {
        console.log("Chapter not found.");
      }

      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };
  const handleChapterSelect = (value: string) => {
    const selected = chapterData.find((chapter) => chapter.chapterId === value);
    if (selected) {
      setSelectedChapter(selected);
      setDetailImage(selected.images);
    } else {
      console.log("Selected chapter not found.");
    }
  };
  const handleNextChapter = () => {
    const currentIndex = chapterData.findIndex(
      (chapter) => chapter.chapterId === selectedChapter?.chapterId
    );

    if (currentIndex >= 0 && currentIndex < chapterData.length - 1) {
      const nextChapter = chapterData[currentIndex + 1];
      setSelectedChapter(nextChapter);
      setDetailImage(nextChapter.images);
      window.scrollTo(0, 0);
    } else {
      console.log("Next chapter not found.");
    }
  };
  const handlePreviousChapter = () => {
    const currentIndex = chapterData.findIndex(
      (chapter) => chapter.chapterId === selectedChapter?.chapterId
    );

    if (currentIndex > 0) {
      const previousChapter = chapterData[currentIndex - 1];
      setSelectedChapter(previousChapter);
      setDetailImage(previousChapter.images);
      window.scrollTo(0, 0);
    } else {
      console.log("Previous chapter not found.");
    }
  };
  if (loading) {
    return <p>Loading...</p>;
  }

  if (!chapterData) {
    return <div>Chapter not found.</div>;
  }

  return (
    <Layout>
      <div className="read">
        <div className="top-read">
          <div className="list-title">
            <Breadcrumb className="Breadcrumb">
              <Breadcrumb.Item>
                <Link to="/">Home</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to="/comic">Comic</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to={`/comic/${id}`}>{mangaTitle}</Link>
              </Breadcrumb.Item>
              {selectedChapter && (
                <Breadcrumb.Item>{selectedChapter.chapter}</Breadcrumb.Item>
              )}
            </Breadcrumb>
            <div className="title-chapter">
              <span>
                <h2> {mangaTitle} </h2>{" "}
              </span>
              <span>
                <h2> -{selectedChapter?.chapter}</h2>
              </span>
            </div>
          </div>
          <h1 className="name-read"></h1>
          <div className="option-read">
            <Link to="/">
              <FaHome className="button-read" />
            </Link>
            <Link to={`/comic/${id}`}>
              <FiList className="button-read" />
            </Link>
            <BsFillArrowLeftCircleFill
              className="button-read"
              onClick={handlePreviousChapter}
            />
            <Select
              className="select"
              value={selectedChapter?.chapterId || undefined}
              onChange={(value) => handleChapterSelect(value.toString())}
            >
              {chapterData.map((chapter) => (
                <Select.Option
                  key={chapter.chapterId}
                  value={chapter.chapterId}
                >
                  {chapter.chapter}
                </Select.Option>
              ))}
            </Select>
            <BsArrowRightCircleFill
              className="button-read"
              onClick={handleNextChapter}
            />
          </div>
        </div>
        <div className="content-read">
          {detailImage.map((img, index) => (
            <img key={index} src={img.url} alt={img.caption} />
          ))}
        </div>
        <div className="bottom-read">
          <div className="#">
            <BsFillArrowLeftCircleFill
              className="button-read"
              onClick={handlePreviousChapter}
            />
            <BsArrowRightCircleFill
              className="button-read"
              onClick={handleNextChapter}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReadComic;
