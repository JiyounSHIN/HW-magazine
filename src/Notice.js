import React from "react";
import styled, { StyledComponent } from "styled-components";
import { Navigate } from "react-router-dom"; 

const Notice = () => {

    return (
        <div onClick={() => Navigate("/")}><h1 style={{ textDecoration: "underline", textAlign: "left", marginLeft: "70px" }}> 공지페이지</h1></div>
    )
}

const Text = styled.div`
    display : block;
    background : #F5F5F5;
    background-size : cover;
    background-position : center;
    margin-left : 70px;
    margin-top : 20px;
    padding : 20px;
    min-width : 700px;
    height : 30px;
`;

const Image = styled.div`
    display : inline-block;
    height : 50px;
    width : 68vw;
    background : #F5F5F5;
    border-radius : 10px;
    border : 2px solid white;
    font-size : 30px;
    margin-top : 70px;
    margin-bottom : -20px;
    padding : 10px;
    & > p {
        float : left;
        margin-top : 3px;
    }
`;


export default Notice;