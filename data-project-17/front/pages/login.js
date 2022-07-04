import React, { useState } from "react";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Router from "next/router";
import styled from "styled-components";
import { useUserState, useUserDispatch } from "../lib/userContext";

import * as Api from "../lib/api";

const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 200px;
`;

const Input = styled.input`
  height: 32px;
  width: 200px;
`;

const Button = styled.button`
  display: inline-block;
  outline: 0;
  cursor: pointer;
  padding: 5px 16px;
  margin-top: 15px;
  width: 100%;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  vertical-align: middle;
  border: 1px solid;
  border-radius: 6px;
  color: #59a592;
  background-color: #fafbfc;
  border-color: #1b1f2326;
  box-shadow: rgba(27, 31, 35, 0.04) 0px 1px 0px 0px,
    rgba(255, 255, 255, 0.25) 0px 1px 0px 0px inset;
  transition: 0.2s cubic-bezier(0.3, 0, 0.5, 1);
  transition-property: color, background-color, border-color;
  :hover {
    color: #ffffff;
    background-color: #59a592;
    border-color: #1b1f2326;
    box-shadow: rgba(27, 31, 35, 0.1) 0px 1px 0px 0px,
      rgba(255, 255, 255, 0.03) 0px 1px 0px 0px inset;
    transition-duration: 0.1s;
  }
`;

export default function Login() {
  const { userList } = useUserState();
  const dispatch = useUserDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await Api.post("/login", {
        email,
        password,
      });
      const user = res.data;
      dispatch({
        // 요 부분 데이터를 바꿨어요
        type: "LOGIN",
        userId: user.id,
        userEmail: user.email,
        userNickname: user.nickname,
        userProfile: user.profile_url,
      });
      Router.push("/");
    } catch (error) {
      console.log("로그인에 실패하였습니다!\n", error);
      alert("로그인에 실패하였습니다!\n", error);
    }
  };

  return (
    <div>
      <Header />
			<Nav />
      <Container onSubmit={onSubmit}>
        <div>
          <h2>LOGIN</h2>
        </div>
        <div style={{ marginBottom: "5px" }}>
          <Input
            type="email"
            name="email"
            placeholder="EMAIL"
            value={email}
            onChange={onEmailHandler}
          />
        </div>
        <InputBox>
          <Input
            type="password"
            name="password"
            placeholder="PASSWORD"
            value={password}
            onChange={onPasswordHandler}
          />
          <Button type="submit">LOGIN</Button>
        </InputBox>
      </Container>
    </div>
  );
}
