import React from "react";
import styled from "styled-components";

const Comment = () => {

    return (
        <div>
            <h1 style={{ textDecoration: "underline", textAlign: "left", marginLeft: "70px" }}> 상세페이지</h1>
        </div>
    )
}

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

export default Comment;