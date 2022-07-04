import React, { createContext, useContext, useReducer, useEffect } from "react";
import * as Api from "../lib/api";

const initialState = {
  userList: [],
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE_USER":
      return {
        ...state,
        userList: state.userList.concat(action.user),
      };
    case "LOGIN":
      return {
        ...state,
        user: {
          // 요 부분 데이터를 바꿨어요
          userId: action.userId,
          userEmail: action.userEmail,
          userNickname: action.userNickname,
          userProfile: action.userProfile,
        },
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

const UserStateContext = createContext(null);
const UserDispatchContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    Api.get("/me")
      .then((res) => {
        const {
          id: userId,
          email: userEmail,
          nickname: userNickname,
          profile_url: userProfile,
        } = res.data;
        dispatch({
          type: "LOGIN",
          userId,
          userEmail,
          userNickname,
          userProfile,
        });
      })
      .catch(() => {});
  }, []);

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>{children}</UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};

export const useUserState = () => {
  const state = useContext(UserStateContext);
  if (!state) throw new Error("Cannot find UserProvider");
  return state;
};

export const useUserDispatch = () => {
  const dispatch = useContext(UserDispatchContext);
  if (!dispatch) throw new Error("Cannot find UserProvider");
  return dispatch;
};
