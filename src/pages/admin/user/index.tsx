import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Space,
  Modal,
  Input,
  Switch,
  Form,
  message,
} from "antd";
import AdminLayout from "../../../components/Layout/admin/layout";
import { User } from "./user";
import { RootState } from "../../../stores";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import {
  fetchUsers,
  editUser,
  deleteUser,
  addUser,
} from "../../../stores/actions";
import { AnyAction } from "redux";

enum ModalType {
  AddUser = "add_user",
  EditUser = "edit_user",
}

const ManagementUsers: React.FC = () => {
  const users = useSelector((state: RootState) => state.userReducer.users);

  const dispatch: ThunkDispatch<RootState, null, AnyAction> = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newUser, setNewUser] = useState<User>({
    id: 0,
    email: "",
    following: 0,
    readed: 0,
    isActive: false,
  });
  const [modalType, setModalType] = useState<ModalType | null>(null);
  const [form] = Form.useForm();
  const [deleteBookId, setDeleteBookId] = useState<number | null>(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAdd = () => {
    setIsModalVisible(true);
    setModalType(ModalType.AddUser);
    form.resetFields();
  };

  const handleEdit = (user: User) => {
    form.setFieldsValue(user);
    setModalType(ModalType.EditUser);
    setIsModalVisible(true);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteUser(id));
    setDeleteBookId(id);
    setIsDeleteModalVisible(true);
  };

  const handleConfirmDelete = () => {
    if (deleteBookId) {
      dispatch(deleteUser(deleteBookId));
      message.success("Book deleted successfully");
      setDeleteBookId(null);
      setIsDeleteModalVisible(false);
    }
  };

  const handleSave = () => {
    const formData = form.getFieldsValue();
    const updatedUser = { ...newUser, ...formData };

    if (modalType === ModalType.AddUser) {
      dispatch(addUser(updatedUser));
    } else if (modalType === ModalType.EditUser) {
      dispatch(editUser(updatedUser));
    }
    form.resetFields();
    setNewUser({
      id: 0,
      email: "",
      following: 0,
      readed: 0,
      isActive: false,
    });
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleChangeStatus = (id: number, isActive: boolean) => {
    const userToUpdate = users.find((user: { id: number }) => user.id === id);
    if (userToUpdate) {
      const updatedUser = { ...userToUpdate, isActive };
      dispatch(editUser(updatedUser));
    }
  };

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Following",
      dataIndex: "following",
      key: "following",
    },
    {
      title: "Readed",
      dataIndex: "readed",
      key: "readed",
    },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: User) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>

          <Button type="primary" danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive: boolean, record: User) => (
        <Switch
          checked={isActive}
          onChange={() => handleChangeStatus(record.id, !isActive)}
        />
      ),
    },
  ];

  return (
    <AdminLayout>
      <div>
        <h1>Management Users</h1>
        <Button type="primary" onClick={handleAdd}>
          Add User
        </Button>
        <Table dataSource={users} columns={columns} />

        <Modal
          title={modalType === ModalType.AddUser ? "Add User" : "Edit User"}
          open={isModalVisible}
          onOk={() => handleSave()}
          onCancel={handleCancel}
        >
          <Form form={form}>
            <Form.Item label="Email" name="email" initialValue={newUser.email}>
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
              label="Following"
              name="following"
              initialValue={newUser.following}
            >
              <Input placeholder="Following" />
            </Form.Item>
            <Form.Item
              label="Readed"
              name="readed"
              initialValue={newUser.readed}
            >
              <Input placeholder="Readed" />
            </Form.Item>
            <Form.Item label="Status" name="isActive">
              <Switch />
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title="Confirm Delete"
          open={isDeleteModalVisible}
          onOk={handleConfirmDelete}
          onCancel={handleCancel}
        >
          Are you sure you want to delete this user?
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default ManagementUsers;
