import React, { useState } from "react";
import Header from "../components/Header";
import Nav from "../components/Nav";
import * as Api from "../lib/api";
import styled from "styled-components";
import Router from "next/router";
import { useUserDispatch } from "../lib/userContext";

const Button = styled.button`
  display: inline-block;
  outline: 0;
  cursor: pointer;
  padding: 5px 16px;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  width: 100%;
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

const Container = styled.div`
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
  width: 230px;
  margin-bottom: 5px;
`;

const Text = styled.span`
  font-size: 12px;
	font-weight: 800;
	font-family: 'NanumSquare';
  color: #d31616;
`;

export default function Signup() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useUserDispatch();

  const onEmailHandler = (event) => {
    setEmail(event.target.value);
  };
  const onNicknameHandler = (event) => {
    setNickname(event.target.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.target.value);
  };
  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.target.value);
  };

  //???????????? abc@example.com ???????????? regex??? ????????? ?????????.
  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  //??? validateEmail ????????? ?????? ????????? ?????? ?????? ????????? ?????????.
  const isEmailValid = validateEmail(email);
  // ??????????????? 4?????? ???????????? ????????? ?????????.
  const isPasswordValid = password.length >= 4;
  // ??????????????? ????????? ??????????????? ??????????????? ????????? ?????????.
  const isPasswordSame = password === confirmPassword;

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      await Api.post("/users", {
        email,
        nickname,
        password,
      });
      dispatch({
        type: "CREATE_USER",
        user: {
          email,
          nickname,
          password,
        },
      });
      Router.push("/");
    } catch (error) {
      console.log("??????????????? ?????????????????????.", error);
      alert("??????????????? ?????????????????????.", error);
    }
  };

  return (
    <div>
      <Header />
			<Nav />
      <Container>
        <div>
          <h2>SIGN UP</h2>
        </div>

        <InputBox>
          <form onSubmit={onSubmit}>
            <div>
              <Input
                type="email"
                name="email"
                placeholder="EMAIL"
                value={email}
                onChange={onEmailHandler}
              />
              {!isEmailValid && <Text>????????? ????????? ???????????? ????????????.</Text>}
            </div>
            <div>
              <Input
                name="nickname"
                placeholder="NICKNAME"
                value={nickname}
                onChange={onNicknameHandler}
              />
            </div>
            <div>
              <Input
                type="password"
                name="password"
                placeholder="PASSWORD"
                value={password}
                onChange={onPasswordHandler}
              />
              {!isPasswordValid && <Text>??????????????? 4?????? ???????????? ??????????????????.</Text>}
            </div>
            <div>
              <Input
                type="password"
                name="confirm-password"
                placeholder="CONFIRM PASSWORD"
                value={confirmPassword}
                onChange={onConfirmPasswordHandler}
              />
              {!isPasswordSame && (
                <div>
                  <span>??????????????? ???????????? ????????????.</span>
                </div>
              )}
              <Button type="submit">CREATE ACCOUNT</Button>
            </div>
          </form>
        </InputBox>
      </Container>
    </div>
  );
}
