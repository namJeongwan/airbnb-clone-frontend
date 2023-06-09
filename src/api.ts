import Cookie from "js-cookie";
import axios from "axios";
import { QueryFunctionContext } from "@tanstack/react-query";
import { queryKey } from "@tanstack/react-query/build/lib/__tests__/utils";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
  withCredentials: true,
});

export const getRooms = () =>
  instance.get("rooms/").then((response) => response.data);

export const getRoom = ({ queryKey }: QueryFunctionContext) => {
  const [_, roomPk] = queryKey;
  return instance.get(`rooms/${roomPk}`).then((response) => response.data);
};

export const getRoomReviews = ({ queryKey }: QueryFunctionContext) => {
  const [_, roomPk] = queryKey;
  return instance
    .get(`rooms/${roomPk}/reviews`)
    .then((response) => response.data);
};

export const commonLogIn =
  () =>
  ({ queryKey }: QueryFunctionContext) => {
    const [_, username, password] = queryKey;
    return instance
      .post(`users/log-in`, { username: username, password: password })
      .then((response) => response.data);
  };

export const getMe = () =>
  instance.get(`users/me`).then((response) => response.data);

export const logOut = () =>
  instance
    .post(`users/log-out`, null, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export const loginGithub = (code: string) =>
  instance
    .post(
      `/users/github`,
      { code: code },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.status);

export const loginKakao = (code: string) =>
  instance
    .post(
      `/users/kakao`,
      { code: code },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.status);
