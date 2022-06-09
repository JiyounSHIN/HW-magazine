import React from "react";
import styled from "styled-components";
import { BiEditAlt } from "react-icons/bi"
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadmainFB } from "./redux/modules/post";
import { auth } from "./shared/firebase";
import { FaFileExcel } from "react-icons/fa";
import Posting from "./Posting";


const Main = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const post_cards = useSelector((state) => state.post.list);
    // console.log(post_cards);
    // console.log(auth.currentUser.email, post_cards.user_id);

    // 페이지가 첫 렌더링 된 후 무조건 한 번 실행되는 hook !! 
    React.useEffect(() => {
        dispatch(loadmainFB());  // 미들웨어 콘솔 값 확인용 ! 
    }, []);

    const user = auth.currentUser;
    // console.log(user)
    return (
        <div>
            <h1 style={{textDecoration: "underline",textAlign: "left", marginLeft: "70px" }}> HOME : </h1>
            <div>
                {post_cards.map((post, index) => {
                    // console.log(post);
                    return (
                        <div styled={{ display: "flex", position: "relative" }}>
                            <PostCard onClick={() => {navigate("/Comment")}} key={index.value}>
                                <WrapTop>
                                    <p style={{ display: "inline-block", textAlign: "left", fontSize: "30px" }}>{post.nickname}</p>
                                    <p style={{ display: "inline-block", textAlign: "right", paddingRight: "100px", paddingTop: "20px" }}>{post.date}</p>
                                        {(user && post.user_id === user.email)? <Button onClick={(event)=> {event.stopPropagation(); navigate('/Editor/'+index);} }>수정하기</Button> : null}
                                </WrapTop>
                                <div>
                                    {(post.layout === "왼쪽: 이미지, 오른쪽: Text") ?
                                        <RightText onClick={navigate("/")}>
                                            <img src={post.image} alt="preview-img" />
                                            <div> {post.write}</div>
                                        </RightText>
                                        : ((post.layout === "왼쪽: Text, 오른쪽: 이미지") ?
                                            <LeftText>
                                                <div> {post.write}</div>
                                                <img src={post.image} alt="preview-img" />
                                            </LeftText>
                                            : <TopText>
                                                <div> {post.write}</div>
                                                <img src={post.image} alt="preview-img" />
                                            </TopText>)}
                                </div>
                                <WrapBTM>
                                    <p style={{ display: "inline-block", width: "100px", textAlign: "left" }}>좋아요</p>
                                    <p style={{ display: "inline-block", textAlign: "left" }}>댓글</p>
                                    <p style={{ display: "inline-block", textAlign: "right", marginRight: "70px" }}>하트</p>
                                </WrapBTM>
                            </PostCard>
                        </div>
                    )
                })}
            </div>
            <PostingBtn onClick={() => {
                navigate("/posting")
            }}><BiEditAlt size="60px"/></PostingBtn>
        </div>
    )
}

// vh, vw 는 window 를 따라가는 영역 
// % 는 부모요소를 따라가는 영역 
// min 보다는 max-width 에 값을 주고 , width 를 % 로 변환해서 값을 넣으면 좋다. 
// postcard 전체 감싸는 영역
const PostCard = styled.div`
    display : block;
    background-size : cover;
    background-position : center;
    margin-left : 70px;
    margin-top : 20px;
    padding : 20px;
`;

// 상단 Wrap 영역 
const WrapTop = styled.div`
    display : flex;
    & > p {
        font-size : 20px;
        margin-bottom : 5px;
        width : 50%;
    }
`;

// 하단 Wrap 영역 
const WrapBTM = styled.div`
    display : flex;
    & > p {
        font-size : 20px;
        margin-top : 7px;
        width : 50%;
    }
`;

// 반응형 : 웹페이지 width :100%, height : auto;
// 이미지 : 부모 크기에 맞게 원본크기 조정
const LeftText = styled.div`
    display : table;
    position : relative;
    align-items: center;
    justify-content : center;
    height : 200px;
    width : calc(95% - 20px);
    background : #F5F5F5;
    border-radius : 10px;
    box-shadow : 1px 1px 2px gray;
    &>img {
        background : transparent;
        height : 250px;
        width : auto;
        padding : 10px;
        background-size : cover;
        background-position : center;
        display: block;
        margin : auto;
    }
    &>div {
        background : transparent;
        position : left;
        padding : 30px;
        width : 50vw;
        height :200px;
        display : table-cell;
        text-align : right ;
        vertical-align : top;  
    }
`;

const RightText = styled.div`
    display : table;
    position : relative;
    align-items: center;
    justify-content : center;
    height : 200px;
    width : calc(95% - 20px);
    background : #F5F5F5;
    border-radius : 10px;
    box-shadow : 1px 1px 2px gray;
    &>img {
        background : transparent;
        height : 250px;
        width : auto;
        padding : 10px;
        background-size : cover;
        background-position : center;
        display: block;
        margin : auto;
    }
    &>div {
        background : transparent;
        position : right;
        padding : 30px;
        width :50vw;
        height :200px;
        display : table-cell;
        text-align : left ;
        vertical-align : top;  
    }
`;

const TopText = styled.div`
    position : static;
    align-items: center;
    justify-content : center;
    height : auto;
    width : calc(95% - 20px);
    background : #F5F5F5;
    border-radius : 10px;
    box-shadow : 1px 1px 2px gray;
    &>img {
        background : transparent;
        height : 250px;
        width : auto;
        padding : 10px;
        background-size : cover;
        background-position : center;
        display: block;
        margin : auto;
    }
    &>div {
        background : transparent;
        position : top;
        padding : 30px;
        width :calc(52%);
        height :10px;
        display : inline-block;
        text-align : center;
        vertical-align : top;  
    }
`;

const Button = styled.button`
  position : relative;
  right : 70px;
  top : 22px;
  height : 40px;
  width : 20vw;
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

const PostingBtn = styled.button`
    position : fixed;
    bottom : 25px;
    right : 25px;
    background : transparent;
    border :transparent;
    cursor : pointer;
`;

export default Main;
