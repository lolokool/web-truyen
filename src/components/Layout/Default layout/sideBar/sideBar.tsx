import { Button, Checkbox, Col } from "antd";
import { CiSearch } from "react-icons/ci";
import "../../../../styles/sideBar/sideBar.scss";
import axios from "axios";
import { ENV_BE } from "../../../../constants";
import { useEffect, useState, useRef } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { Book } from "../../../../typeBook";
import { Link, useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();
  const [genre, setGenre] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState<Book[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const searchResults = async () => {
      try {
        const response = await axios.get(`${ENV_BE}/MangaList`);
        setSearchResult(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    searchResults();
  }, [searchValue]);

  useEffect(() => {
    getGenre();
  }, []);

  useEffect(() => {
    if (searchValue && searchResult.length > 0) {
      setIsModalVisible(true);
    } else {
      setIsModalVisible(false);
    }
  }, [searchValue, searchResult]);

  const getGenre = async () => {
    try {
      const response = await axios.get(`${ENV_BE}/genres`);
      setGenre(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchFocus = () => {
    setIsModalVisible(true);
  };

  const handleSearchBlur = () => {
    // Không cần thiết phải xử lý onBlur ở đây.
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleGenreChange = (checkedGenres: string[]) => {
    setSelectedGenres(checkedGenres);
  };

  const handleTypeChange = (checkedTypes: string[]) => {
    setSelectedType(checkedTypes);
  };

  const handleStatusChange = (checkedStatus: string[]) => {
    setSelectedStatus(checkedStatus);
  };

  const handleFilter = () => {
    setIsFilterApplied(true);
    // Gọi hàm handleSearch để tìm kiếm và lọc kết quả dựa trên truy vấn và các bộ lọc đã chọn.
    handleSearch();
  };

  const handleSearch = () => {
    // Kiểm tra xem có truy vấn tìm kiếm hoặc bộ lọc nào đang được áp dụng
    if (searchValue || isFilterApplied) {
      // Lọc kết quả tìm kiếm dựa trên truy vấn tìm kiếm, thể loại, loại và trạng thái đã chọn
      const matchedResults = searchResult.filter((item) => {
        const titleMatch = searchValue
          ? item.title.toLowerCase().includes(searchValue.toLowerCase())
          : true;
        const genreMatch =
          selectedGenres.length === 0 ||
          selectedGenres.some((genre) => item.genre.includes(genre));
        const typeMatch =
          selectedType.length === 0 || selectedType.includes(item.type);
        const statusMatch =
          selectedStatus.length === 0 || selectedStatus.includes(item.status);

        return titleMatch && genreMatch && typeMatch && statusMatch;
      });

      // Chuyển hướng đến trang kết quả tìm kiếm với kết quả đã lọc
      navigate(`/comic/search-results/${searchValue}`, {
        state: { searchValue: searchValue, searchResults: matchedResults },
      });
    } else {
      // Nếu không có truy vấn tìm kiếm và bộ lọc đang được áp dụng, chuyển hướng đến trang kết quả tìm kiếm với tất cả các truyện tranh
      navigate(`/comic/search-results/all`, {
        state: { searchValue: "", searchResults: searchResult },
      });
    }
  };

  return (
    <div className="side-bar">
      <Col flex={2} className="filter">
        <div className="applyFilter">
          <div className="Search">
            <span onClick={handleSearch}>
              <CiSearch style={{ color: "#9e9eb9" }} />
            </span>
            <input
              ref={inputRef}
              value={searchValue}
              placeholder="Tìm kiếm truyện của bạn ở đây"
              onChange={handleSearchChange}
              onFocus={handleSearchFocus}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            {!!searchValue && (
              <IoIosCloseCircle
                style={{ color: "#9e9eb9" }}
                onClick={() => {
                  setSearchValue("");
                  if (inputRef.current) {
                    inputRef.current.focus();
                  }
                }}
              />
            )}
          </div>

          {isModalVisible && searchValue && (
            <div
              className="popper"
              style={{ maxHeight: `${searchResult.length * 60}px` }}
            >
              {searchResult.length > 0 ? (
                <ul>
                  {searchResult
                    .filter((item) =>
                      item.title
                        .toLowerCase()
                        .includes(searchValue.toLowerCase())
                    )
                    .map((item, index) => (
                      <li key={index}>
                        <Link
                          to={`/comic/${item.id}`}
                          onClick={() => {
                            setSearchValue("");
                          }}
                        >
                          <div style={{ display: "flex" }}>
                            <img
                              src={item.image}
                              style={{ width: 50, height: 60, marginRight: 20 }}
                              alt={item.title}
                            />
                            <div>
                              <div className="">
                                <h5 style={{ margin: 0, marginBottom: 5 }}>
                                  {item.title}
                                </h5>
                              </div>
                              <div className="">{item.author}</div>
                              <div className="">{item.genre.join(", ")}</div>
                            </div>
                          </div>
                        </Link>
                        <br />
                      </li>
                    ))}
                </ul>
              ) : (
                <p>Không tìm thấy kết quả phù hợp</p>
              )}
            </div>
          )}

          <div className="genres">
            <h3>Genre</h3>
            <div className="scroll-container">
              {genre.map((item) => (
                <Checkbox
                  key={item}
                  value={item}
                  onChange={(e) => {
                    handleGenreChange(
                      e.target.checked
                        ? [...selectedGenres, item]
                        : selectedGenres.filter((genre) => genre !== item)
                    );
                  }}
                >
                  {item}
                </Checkbox>
              ))}
            </div>
          </div>
          <div className="type-status-format">
            <div className="typeComic">
              <h3>Type</h3>
              <Checkbox
                className="check-box"
                value="All"
                onChange={(e) => {
                  setSelectedType(
                    e.target.checked ? [] : ["Manhua", "Manhwa", "Komiik"]
                  );
                }}
              >
                All
              </Checkbox>
              <Checkbox
                className="check-box"
                value="Manhua"
                onChange={(e) => {
                  handleTypeChange(
                    e.target.checked
                      ? [...selectedType, "Manhua"]
                      : selectedType.filter((type) => type !== "Manhua")
                  );
                }}
              >
                Manhua
              </Checkbox>
              <Checkbox
                className="check-box"
                value="Manhwa"
                onChange={(e) => {
                  handleTypeChange(
                    e.target.checked
                      ? [...selectedType, "Manhwa"]
                      : selectedType.filter((type) => type !== "Manhwa")
                  );
                }}
              >
                Manhwa
              </Checkbox>
              <Checkbox
                className="check-box"
                value="Komiik"
                onChange={(e) => {
                  handleTypeChange(
                    e.target.checked
                      ? [...selectedType, "Komiik"]
                      : selectedType.filter((type) => type !== "Komiik")
                  );
                }}
              >
                Komiik
              </Checkbox>
            </div>

            {/* Trạng thái */}
            <div className="status">
              <h3>Status</h3>
              <Checkbox
                className="check-box"
                value="All"
                onChange={(e) => {
                  setSelectedStatus(
                    e.target.checked ? [] : ["Ongoing", "Complete"]
                  );
                }}
              >
                All
              </Checkbox>
              <Checkbox
                className="check-box"
                value="Ongoing"
                onChange={(e) => {
                  handleStatusChange(
                    e.target.checked
                      ? [...selectedStatus, "Ongoing"]
                      : selectedStatus.filter((status) => status !== "Ongoing")
                  );
                }}
              >
                Ongoing
              </Checkbox>
              <Checkbox
                className="check-box"
                value="Complete"
                onChange={(e) => {
                  handleStatusChange(
                    e.target.checked
                      ? [...selectedStatus, "Complete"]
                      : selectedStatus.filter((status) => status !== "Complete")
                  );
                }}
              >
                Completed
              </Checkbox>
            </div>
          </div>
          <div className="apply-filter">
            <Button onClick={handleFilter}>Filter</Button>
          </div>
        </div>
      </Col>
    </div>
  );
};

export default SideBar;
