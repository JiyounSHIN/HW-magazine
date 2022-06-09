import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signupFB } from "./redux/modules/user"
import './App.css';
import styled from "styled-components";
import { auth, db } from "./shared/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { BiWindows } from "react-icons/bi";

const Account = () => {
    const navigate = useNavigate();

    const id_ref = React.useRef("");
    const name_ref = React.useRef("");
    const password_ref = React.useRef("");
    const confirmpassword_ref = React.useRef("");

    const dispatch = useDispatch();


    const signup = async () => {

        const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        if(!regExp.test(id_ref.current.value)||id_ref.current.value===null) {
            window.alert("유효하지 않은 아이디입니다.")
            return (navigate("/account"))
        }

        const password1RegExp=/^[a-z0-9]{6,12}$/;
        if(!password1RegExp.test(password_ref.current.value)||password_ref.current.value===null){
            window.alert("비밀번호는 영문, 숫자 포함한 6~12자리로 입력해주세요")
            return (navigate("/account"))
        }

        if(password_ref.current.value !== confirmpassword_ref.current.value){
            window.alert("비밀번호가 일치하지 않습니다.")
            return (navigate("/account"))
        }

        const user = await createUserWithEmailAndPassword(
            auth,
            id_ref.current.value,
            password_ref.current.value,
        );

        dispatch(signupFB({
            user_id: user.user.email,
            nickname: name_ref.current.value,
        }))
        navigate("/")
    };

    return (
        <Container>
            <Title>회원가입</Title>
            <Wrap><p>아이디(이메일) : </p><input type="email" placeholder="이메일로 입력하세요" ref={id_ref}/></Wrap>
            <Wrap><p>닉네임 : </p><input type="text" placeholder="닉네임을 입력하세요" ref={name_ref} /></Wrap>
            <Wrap><p>비밀번호 : </p><input type="password" placeholder="6자리 이상 입력하세요" ref={password_ref} /></Wrap>
            <Wrap><p>비밀번호 확인 : </p><input type="password" placeholder="비밀번호! 한번 더 확인하세요" ref={confirmpassword_ref}/></Wrap>
            <Button onClick={signup}>회원가입하기</Button>
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
    height : auto;
    width : 100%;
`;

const Wrap = styled.div`
    display : flex;
    flex-direction : row;
    justify-content: right;
    align-items: center;
    margin-bottom : -20px;
    gap: 20px;
    font-size : 20px;
    height : auto;
    width :96%;
    &>input {
        height : 20px;
        width : 200px;
    }
`;

const Button = styled.button`
  margin : 35px 8px 0px 8px;
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

export default Account;