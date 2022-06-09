import React, { useEffect, useState } from "react";
import './App.css';
import styled from "styled-components";
import { BiImages } from "react-icons/bi"
import { FiFilePluss } from "react-icons/fi"
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updatePostFB, deletePostFB } from "./redux/modules/post";
import { loadAccountFB } from "./redux/modules/user";
import { ref, uploadBytes, getDownloadURL, connectStorageEmulator } from "firebase/storage";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { auth, db, storage } from "./shared/firebase";
import moment from 'moment';  // 시간계산 라이브러리
import { issuedAtTime } from "@firebase/util";
import { FaFileExcel } from "react-icons/fa";

const Editor = () => {

    const fileInput = React.useRef("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // useParams() 훅 사용, 해당 post 카드의 index 에 해당되는 id 가져오기 !! 
    const params = useParams();
    const post_index = params.index;
    // console.log(index); // 해당 post index 번호 확인하기 (router hook)
    const post_list = useSelector(state => state.post.list);
    console.log(post_list); // 리덕스에서 data 전부 가져오기
    console.log(post_list[post_index]); // 해당포스트의 "정보" 가져오기
    console.log(post_list[post_index].id); // 해당 포스트의 id 값 !!! (3-11,28:21강)

    // 사진 업로드 파일 선택 
    const selectFile = (e) => {
        // console.log(e); // 이벤트 객체
        // console.dir(e);
        // // console.log(e.target.files);
        // console.log(e.target.files[0]);
        // console.log(fileInput.current.files[0]); // e.target.files 와 동일하다 // 
    };

    // default checked (카테고리 선택)
    const layout = [
        { id: 0, data: "왼쪽: Text, 오른쪽: 이미지" },
        { id: 1, data: "왼쪽: 이미지, 오른쪽: Text" },
        { id: 2, data: "상단: Text, 하단: 이미지" }
    ];
    const [checkedList, setCheckedList] = useState([])
    const onCheckedElement = (checked, item) => {
        // console.log(checked, item);
        if (checked) {
            setCheckedList([checkedList, item]);
        } else if (!checked) {
            setCheckedList(checkedList.filter(el => el !== item));
        }
    }
    // console.log(checkedList[1])

    // 글쓰기 
    const input_ref = React.useRef("");



    const updateFB = async (e) => {
        /// 이미지 파일 storage 저장 후  url 받아오기 /// 
        let image = fileInput.current?.files[0];
        const upload_file = await uploadBytes(ref(storage, `images/${image.name}`), image);
        // images 라는 폴더 안에, 이미지 하위 속성인 name 값에, image 파일을 넣겠어 !! 
        // console.log(upload_file.ref);
        // upload_file.then((snapshot) => {
        //     console.log(snapshot)
        // });
        // url 받아오기 
        const file_url = await getDownloadURL(upload_file.ref);

        

        dispatch(updatePostFB({
            id: post_list[post_index].id,
            image: file_url,
            layout: checkedList[1],
            write: input_ref.current.value
            }
            ));
        navigate('/');
    }

    const deleteFB = () => {
        dispatch(deletePostFB(post_list[post_index].id))
        navigate('/');
    }

    return (
        <div>
            <h1 style={{ textDecoration: "underline", textAlign: "left", marginLeft: "70px" }}>게시글 수정 / 삭제</h1>
            <div>
                <Image><p>📂이미지찾기 : <input type="file" ref={fileInput} onChange={selectFile} /></p></Image>
                <Container styled={{ display: "flex" }}>
                    {layout.map((item) => {
                        return (
                            <div key={item.id}>
                                <CheckBox>
                                    <input type="checkbox" value={item.data} defaultchecked={false} onChange={(e) =>
                                        onCheckedElement(e.target.checked, e.target.value)}
                                        checked={checkedList.includes(item.data) ? true : false} />
                                    <div>{item.data}</div>
                                </CheckBox>
                                <Layout> {item.id === 2 ?
                                    <CheckItemTOP><TextTop>text</TextTop><BiImages size="50" /></CheckItemTOP>
                                    : (item.id === 1 ?
                                        <CheckItemLR><BiImages size="50" /><TextLR>text</TextLR></CheckItemLR>
                                        : <CheckItemLR><TextLR>text</TextLR><BiImages size="50" /></CheckItemLR>)
                                }</Layout>
                            </div>
                        )
                    })}
                    <Wrap>
                        <TextArea ref={input_ref} />
                        <div>
                            <Button onClick={() => {updateFB(post_index)}} >게시글수정</Button>
                            <Button2 onClick={() => {deleteFB(post_index)}}> 게시글삭제 </Button2>
                        </div>
                    </Wrap>
                </Container>
            </div>
        </div>
    )
}
/// --- 레이아웃 모양 종류 ---------
const CheckItemLR = styled.p`
    display : flex;
    flex-direction : row;
    justify-content: center;
    justify-content : space-around;
    align-items: center;   
    border : 2px solid gray;
    background :white;
    max-width: 800px;
    width : 150px;
    height:80px;
    margin-top:8px;
    margin-right : 70%;
    padding : 5px;
`;

const TextLR = styled.div`
    font-size : 30px;
    width : 50%
    height : 50%
    text-align : center;
`;
const CheckItemTOP = styled.p`
    flex-direction : row;
    justify-content: right;
    justify-content : space-around;
    align-items: center;    
    border : 2px solid gray;
    background :white;
    max-width: 400px;
    width : 150px;
    height : 100px;
    margin-top:8px;
    margin-right : 70%;
    padding : 5px;
`;

const TextTop = styled.div`
    border : 1px dotted lightgray;
    font-size : 30px;
    text-align : center;
    width : 50%
    height : 50%
`;
/// --- ---------

const CheckBox = styled.div`
    display : flex;
    flex-direction : row;
    justify-content: left;
    align-items: center;
    margin :10px;
    font-size : 23px;
`;

const Container = styled.div`
    display : inline-block;
    position : relative;
    align-items: center;
    justify-content : center;
    height : 84vh;
    width : 70vw;
    margin-top : 50px;
    background : #F5F5F5;
    border-radius : 15px;
    font-size : 20px;
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

const Layout = styled.div`
    display : flex;
    flex-direction : row;
    justify-content: right;
    align-items: center;
`;
const Wrap = styled.div`
    display : flex;
    flex-direction : column;
    justify-content: right;
    align-items: center;
`;

const TextArea = styled.textarea`
    margin-top : 10px;
    width: 90%;
    height: 100px;
`;

const Button = styled.button`
  margin : 30px 8px 0px 8px;
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

const Button2 = styled.button`
  margin : 30px 8px 0px 8px;
  height : 40px;
  width : 200px;
  background : #F5F5F5;
  border : 3px solid #CE0E2D;
  border-radius : 8px;
  font-family : PoorStory;
  font-size : 20px;
  cursor : pointer;
  &:hover{
    box-shadow : 1px 1px 1px gray;
  }
`;
export default Editor;