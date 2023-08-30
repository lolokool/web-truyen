import axios from "axios";
import { ACCESS_TOKEN, ENV_BE, REFRESH_TOKEN } from "../constants/index";

// Set base URL and authorization header
axios.defaults.baseURL = ENV_BE;

// GET
export const getAPI = async ({
  path,
  params,
  query,
}: {
  path: string;
  params?: string;
  query?: string;
}) => {
  const getToken = localStorage.getItem(ACCESS_TOKEN);
  try {
    const response = await axios.get(`${path}`, {
      params,
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    });
    return response;
  } catch (error: any) {
    return error;
  }
};
// POST
export const postAPI = ({ path, body }: { path: string; body: any }) => {
  const getToken = localStorage.getItem(ACCESS_TOKEN);
  return axios.post(path, body, {
    headers: {
      Authorization: `Bearer ${getToken}`,
    },
  });
};

export const putAPI = ({
  path,
  body,
  params,
}: {
  path: string;
  params: string;
  body: any;
}) => {
  return axios.put(`${path}/${params}`, body).then((response) => {
    return response.status;
  });
};

// DELETE

export const deleteAPI = ({ path, id }: { path: string; id: string }) => {
  return axios.delete(`${path}/${id}`);
};
