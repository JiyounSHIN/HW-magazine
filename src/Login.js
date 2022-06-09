import React from "react";
import { useNavigate } from "react-router-dom";
import './App.css';
import styled from "styled-components";
import { auth, db } from "./shared/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDocs, where, query, collection } from "firebase/firestore";

const Login = () => {
    const navigate = useNavigate();
    const id_ref = React.useRef("");
    const password_ref = React.useRef("");

    const loginFB = async () => {
        // console.log(id_ref.current.value,password_ref.current.value)
        const user = await signInWithEmailAndPassword(
            auth,
            id_ref.current.value,
            password_ref.current.value);

        console.log(user);  // ** 해결!! ** 패스워드 오류 !!! --> createUserWithEmailAndPassword() 안에 이메일과 pw 만 들어가야한다.

        // 유저정보 가지고 오기 !!!!! 
        const user_docs = await getDocs(
            query(collection(db, "users"), where("user_id", "==", user.user.email))
        );
        user_docs.forEach((u) => {
            console.log(u.data());
        });
        navigate("/");
    };

    return (
        <Container>
            <Title>로그인</Title>
            <Wrap><p>아이디(이메일) : </p><input ref={id_ref} /></Wrap>
            <Wrap><p>비밀번호 : </p><input type="password" ref={password_ref} /></Wrap>
            <Button onClick={loginFB}> 로그인하기 </Button>
        </Container>

    )
}

const Container = styled.div`
    display : inline-block;
    height : 70vh;
    width : calc(70% - 30px);
    margin-top : 50px;
    background : #F5F5F5;
    border-radius : 15px;
`;

const Title = styled.h2`
    display : inline-block;    
    padding : 15px;
    margin-bottom : -5px;
`;

const Wrap = styled.div`
    display : flex;
    flex-direction : row;
    justify-content: right;
    align-items: center;
    height : auto;
    width :96%;
    margin-bottom : -20px;
    gap: 20px;
    font-size : 20px;
    &>input {
        height : 20px;
        width : 200px;
    }
`;

const Button = styled.button`
  margin : 126px 8px 0px 8px;
  height : 40px;
  width : 200px;
  background : #CE0E2D;
  color : white;
  border : 1px solid #F5F5F5;
  border-radius : 8px;
  font-family : PoorStory;
  font-size : 20px;
  cursor : pointer;
  &:hover{
    box-shadow : 1px 1px 1px gray;
  }
`;


export default Login;