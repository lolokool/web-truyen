import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Select,
  Upload,
  Form,
  Input,
  message,
} from "antd";
import { ColumnType } from "antd/lib/table";
import AdminLayout from "../../../components/Layout/admin/layout";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addMangas,
  editMangas,
  deleteMangas,
  getMangas,
} from "../../../stores/actions";
import { Book } from "../../../typeBook";
import { ENV_BE } from "../../../constants";
import { Link } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { RootState } from "../../../stores";

const { Option } = Select;

enum STATUS {
  EDIT,
  CREATE,
}
const BookManagement: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, null, AnyAction> = useDispatch();
  const books = useSelector((state: RootState) => state.bookReducer.books);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [currentBook, setCurrentBook] = useState<Book>({
    id: "",
    title: "",
    author: "",
    country: "",
    genre: [],
    status: "",
    image: "",
    featured: false,
    whatsNew: false,
    chapters: 0,
    imageBig: "",
    type: "",
    rating: 0,
    view: 0,
    detailChapter: [],
    decriptions: "",
  });

  const [form] = Form.useForm();

  const [genreOptions, setGenreOptions] = useState<string[]>([]);
  const [status, setStatus] = useState<STATUS>(STATUS.CREATE);
  const [deleteBookId, setDeleteBookId] = useState<string | null>(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<boolean>(false);

  useEffect(() => {
    dispatch(getMangas());
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const response = await axios.get(`${ENV_BE}/genres`);
      setGenreOptions(response.data);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  const handleAdd = () => {
    setStatus(STATUS.CREATE);
    form.resetFields();
    setIsModalVisible(true);
  };
  const handleEdit = (book: Book) => {
    setStatus(STATUS.EDIT);
    setCurrentBook(book);
    setIsModalVisible(true);
  };

  const handleSave = () => {
    const formData = form.getFieldsValue();
    const editBook = { ...currentBook, ...formData };

    if (status === STATUS.CREATE) {
      dispatch(addMangas(editBook));
    } else if (status === STATUS.EDIT) {
      dispatch(editMangas(editBook));
    }

    // Reset form fields
    form.resetFields();
    setCurrentBook({
      id: "",
      title: "",
      author: "",
      country: "",
      genre: [],
      status: "",
      image: "",
      chapters: 0,
      featured: false,
      whatsNew: false,
      imageBig: "",
      type: "",
      rating: 0,
      view: 0,
      detailChapter: [],
      decriptions: "",
    });

    setIsModalVisible(false);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteMangas(id));
    setDeleteBookId(id);
    setIsDeleteModalVisible(true);
  };
  const handleConfirmDelete = () => {
    if (deleteBookId) {
      dispatch(deleteMangas(deleteBookId));
      message.success("Book deleted successfully");
      setDeleteBookId(null);
      setIsDeleteModalVisible(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState<Book[]>([]);

  const handleSearch = () => {
    const filteredBooks = books.filter((book: any) =>
      book.title.toLowerCase().includes(searchInput.toLowerCase())
    );
    setSearchResults(filteredBooks);
    setSearchInput("");
  };

  const columns: ColumnType<Book>[] = [
    {
      title: "Name",
      dataIndex: "title",
      key: "title",
      render: (text: string, record: Book) => (
        <Link to={`/admin/comic/${record.id}`}>{text}</Link>
      ),
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Decriptions",
      dataIndex: "decriptions",
      key: "decriptions",
      render: (text: string) => (
        <div style={{ height: "120px", overflow: "hidden" }}>
          <p>{text}</p>
        </div>
      ),
    },
    {
      title: "Genre",
      dataIndex: "genre",
      key: "genre",
      render: (genre: string[]) => genre.join("- "),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image: string) => (
        <img
          src={image}
          alt="Comic Online"
          style={{ width: "100px", height: "100px" }}
        />
      ),
    },
    {
      title: "Chapter",
      dataIndex: "chapters",
      key: "chapters",
    },
    {
      title: "View",
      dataIndex: "view",
      key: "views",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div>
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];
  const convertToBookId = (title: any) => {
    const id = title.replace(/\s+/g, "-");
    return id;
  };
  return (
    <AdminLayout>
      <div
        className="search"
        style={{ position: "absolute", top: "13px", left: "270px" }}
      >
        <input
          placeholder="Search"
          style={{
            border: "none",
            backgroundColor: "#e1f0f0",
            height: "34px",
            outline: "none",
            width: "500px",
            marginRight: "15px",
            padding: "10px",
            borderRadius: "8px",
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <span>
          <Button onClick={handleSearch}>Search</Button>
        </span>
      </div>
      <div>
        <h1>Book Management</h1>
        <Button type="primary" onClick={handleAdd}>
          Add Book
        </Button>
        {searchResults.length > 0 ? (
          <Table dataSource={searchResults} columns={columns} />
        ) : (
          <Table dataSource={books} columns={columns} />
        )}
        <Modal
          title={status === STATUS.CREATE ? "Add Book" : "Edit Book"}
          open={isModalVisible}
          onOk={handleSave}
          onCancel={handleCancel}
        >
          <Form form={form} layout="vertical">
            <label>Tên truyện</label>
            <Form.Item>
              <Input
                placeholder="Tên truyện"
                value={currentBook?.title}
                onChange={(e) => {
                  const title = e.target.value;
                  setCurrentBook({
                    ...currentBook,
                    title: title,
                    id: convertToBookId(title),
                  });
                }}
              />
            </Form.Item>
            <label>Tác giả</label>
            <Form.Item>
              <Input
                placeholder="Tác giả"
                value={currentBook?.author}
                onChange={(e) =>
                  setCurrentBook({
                    ...currentBook,
                    author: e.target.value,
                  })
                }
              />
            </Form.Item>
            <label>Rating</label>
            <Form.Item>
              <Input
                placeholder="Rating"
                type="number"
                value={currentBook?.rating || 0}
                onChange={(e) =>
                  setCurrentBook({
                    ...currentBook,
                    rating: parseInt(e.target.value),
                  })
                }
              />
            </Form.Item>
            <label>Status</label>
            <Form.Item>
              <Select
                placeholder="Status"
                value={currentBook?.status}
                onChange={(value) =>
                  setCurrentBook({
                    ...currentBook,
                    status: value,
                  })
                }
              >
                <Option value="ongoing">Ongoing</Option>
                <Option value="completed">Completed</Option>
              </Select>
            </Form.Item>
            <label>Type</label>
            <Form.Item>
              <Input
                placeholder="Type"
                value={currentBook?.type}
                onChange={(e) =>
                  setCurrentBook({
                    ...currentBook,
                    type: e.target.value,
                  })
                }
              />
            </Form.Item>
            <label>Country</label>
            <Form.Item>
              <Input
                placeholder="Country"
                value={currentBook?.country}
                onChange={(e) =>
                  setCurrentBook({
                    ...currentBook,
                    country: e.target.value,
                  })
                }
              />
            </Form.Item>

            <label>Decriptions</label>

            <Form.Item>
              <Input
                placeholder="Decriptions"
                value={currentBook?.decriptions}
                onChange={(e) =>
                  setCurrentBook({
                    ...currentBook,
                    decriptions: e.target.value,
                  })
                }
              />
            </Form.Item>
            <label>Thể loại</label>
            <Form.Item name="select-multiple">
              <Select
                mode="multiple"
                value={currentBook.genre}
                onChange={(values) =>
                  setCurrentBook({ ...currentBook, genre: values })
                }
                placeholder="Chọn thể loại"
                style={{ width: "100%" }}
              >
                {genreOptions.map((genre) => (
                  <Option key={genre} value={genre}>
                    {genre}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <label>Image</label>
            <Form.Item>
              <Upload
                name="image"
                action={`${ENV_BE}/uploadfile`}
                listType="picture"
                showUploadList={false}
                onChange={(info) => {
                  console.log("abc", info);
                  if (
                    info.file.status === "done" ||
                    info.file.status === "success"
                  ) {
                    const imageUrl =
                      info.file.response?.url || info.file.thumbUrl;
                    setCurrentBook({
                      ...currentBook,
                      image: imageUrl,
                    });
                    console.log(currentBook.image);
                  }
                }}
              >
                <Button>Upload</Button>
              </Upload>
              {currentBook.image && (
                <img
                  src={currentBook.image}
                  alt="Comic Online"
                  style={{ width: "100px", height: "100px" }}
                />
              )}
            </Form.Item>
            <label>Chapter</label>

            <Form.Item>
              <Input
                type="number"
                placeholder="Số chapter"
                value={currentBook?.chapters || 0}
                onChange={(e) =>
                  setCurrentBook({
                    ...currentBook,
                    chapters: parseInt(e.target.value),
                  })
                }
              />
            </Form.Item>
            <label>View</label>
            <Form.Item>
              <Input
                type="number"
                placeholder="view"
                value={currentBook?.view || 0}
                onChange={(e) =>
                  setCurrentBook({
                    ...currentBook,
                    view: parseInt(e.target.value),
                  })
                }
              />
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title="Confirm Delete"
          open={isDeleteModalVisible}
          onOk={handleConfirmDelete}
          onCancel={handleCancel}
        >
          Are you sure you want to delete this comic?
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default BookManagement;
