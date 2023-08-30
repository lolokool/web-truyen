import { useEffect, useState } from "react";
import { Table, Button, Form, Modal, Input, Upload, Row, Col } from "antd";
import AdminLayout from "../../../components/Layout/admin/layout";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../../stores";
import { getMangas } from "../../../stores/actions";
import { Book, DetailChapter } from "../../../typeBook";
import { UploadFile } from "antd/lib/upload/interface";

import { UploadChangeParam as AntdUploadChangeParam } from "antd/lib/upload/interface";

type CustomUploadChangeParam = AntdUploadChangeParam<UploadFile<any>>;

enum STATUS {
  CREATE,
  EDIT,
}

const DetailManga = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: ThunkDispatch<RootState, null, AnyAction> = useDispatch();
  const books = useSelector((state: RootState) => state.bookReducer.books);
  const [status, setStatus] = useState<STATUS>(STATUS.CREATE);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentChapter, setCurrentChapter] = useState<DetailChapter | null>(
    null
  );
  const [storyDetail, setStoryDetail] = useState<Book | undefined>(undefined);
  const [detailChapter, setDetailChapter] = useState<DetailChapter[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getMangas());
  }, [id]);

  useEffect(() => {
    const matchedStory = books.find((story: Book) => story.id === id);
    if (matchedStory) {
      setStoryDetail(matchedStory);
      setDetailChapter(matchedStory.detailChapter || []);
      console.log(detailChapter);
    }
  }, [id, books]);

  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);

  const handleChange = (info: CustomUploadChangeParam) => {
    // Handle the file change here
    setFileList(info.fileList);
  };

  const handleAdd = () => {
    setStatus(STATUS.CREATE);
    setCurrentChapter(null);
    setIsModalVisible(true);
  };

  const handleEdit = (chapter: DetailChapter) => {
    setStatus(STATUS.EDIT);
    setCurrentChapter(chapter);
    setIsModalVisible(true);
  };

  const handleSave = () => {
    const formData = form.getFieldsValue();
    const newChapter: DetailChapter = {
      chapterId: currentChapter?.chapterId || "",
      images: fileList.map((file) => ({
        id: Date.now(),
        url: file.url || "",
        caption: "",
      })),
      ...formData,
    };

    if (status === STATUS.CREATE) {
      setDetailChapter([...detailChapter, newChapter]);
    } else if (status === STATUS.EDIT && currentChapter) {
      const updatedChapters = detailChapter.map((chapter) =>
        chapter.chapterId === currentChapter.chapterId ? newChapter : chapter
      );
      setDetailChapter(updatedChapters);
    }

    setIsModalVisible(false);
    form.resetFields();
    setFileList([]); // Xóa fileList sau khi lưu chương
  };

  const handleDelete = (chapterId: string) => {
    // Xóa chương
    const updatedChapters = detailChapter.filter(
      (chapter) => chapter.chapterId !== chapterId
    );
    setDetailChapter(updatedChapters);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentChapter(null);
  };

  const columns = [
    {
      title: "Chapter",
      dataIndex: "chapter",
      key: "chapter",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "View",
      dataIndex: "View",
      key: "View",
    },
    {
      title: "Images",
      key: "images",
      render: (text: any, record: DetailChapter) => (
        <div>
          <Row>
            {record?.images?.map((image, index) => (
              <Col span={4.5} key={index}>
                <img
                  src={image.url}
                  alt={`Image ${index + 1}`}
                  style={{ width: "100px", height: "100px" }}
                />
              </Col>
            ))}
          </Row>
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: DetailChapter) => (
        <div>
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => handleDelete(record.chapterId)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];
  return (
    <AdminLayout>
      <h1>{storyDetail?.title}</h1>
      <Button type="primary" onClick={handleAdd}>
        Add Book
      </Button>
      <Table dataSource={detailChapter} columns={columns} />

      <Modal
        title={status === STATUS.CREATE ? "Add Chapter" : "Edit Chapter"}
        open={isModalVisible}
        onOk={handleSave}
        onCancel={handleCancel}
      >
        <Form form={form}>
          <Form.Item label="Chapter" name="chapter">
            <Input />
          </Form.Item>
          <Form.Item label="Date" name="date">
            <Input />
          </Form.Item>
          <Form.Item label="Views" name="view">
            <Input />
          </Form.Item>
          <Form.Item label="Image">
            <Upload
              fileList={fileList}
              onChange={handleChange}
              beforeUpload={() => false}
            >
              <Button>Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </AdminLayout>
  );
};

export default DetailManga;
