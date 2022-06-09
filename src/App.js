import Main from "./Main";
import Posting from "./Posting";
import Editor from "./Editor";
import Comment from "./Comment";
import Notice from "./Notice";
import Account from "./Account";
import Login from "./Login";
import './App.css';
import styled from "styled-components";
import { FaHome } from "react-icons/fa"
import React from "react";
import { auth, db } from "./shared/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { Link, Routes, Route } from "react-router-dom";

function App() {

  // 로그인 정보 확인 후 !! alert !! 
  const [is_login, setIslogin] = React.useState(false);
  // console.log(auth.currentUser.email);

  const loginCheck = async (user) => {
    if (user) {
      setIslogin(true);
    } else {
      setIslogin(false);
    }
  };
  React.useEffect(() => {
    onAuthStateChanged(auth, loginCheck);
  }, []);

  return (
    <div className="App">
      <Header>
        <Topleft>
          <Link to="/">
            <FaHome size="40" color="#CE0E2D" />
          </Link>
        </Topleft>
        <Topright>
          {is_login ? (
            <div>
              <Link to="/Notice/">
                <Button>알림</Button>
              </Link>
              <Link to="/">
                <Button onClick={()=> {
                  signOut(auth);
                }}>로그아웃</Button>
              </Link>
            </div>
          ) : (
            <div>
              <Link to="/account/">
                <Button>회원가입</Button>
              </Link>
              <Link to="/login/">
                <Button>로그인</Button>
              </Link>
            </div>
          )}
        </Topright>
      </Header>
      <main>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/posting" element={<Posting />} />
          <Route path="/Editor/:index" element={<Editor />} />
          <Route path="/Comment" element={<Comment />} />
          <Route path="/Notice" element={<Notice />} />
          <Route path="/account" element={<Account />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </div >
  );
}

const Header = styled.header`
  position : relative;
  height : 70px;
  background :;
`;

const Topleft = styled.div`
  position : absolute;
  top : 12px;
  left : 22px;
`;

const Topright = styled.div`
  position : Relative;
  top : 15px;
  right : 20px;
  float : right;
`;

const Button = styled.button`
  margin : -2px 8px 0px 8px;
  height : 40px;
  width : 100px;
  border : 1px solid #F5F5F5;
  border-radius : 8px;
  font-family : PoorStory;
  font-size : 20px;
  cursor : pointer;
  &:hover{
    box-shadow : 1px 1px 1px gray;
  }
`;


export default App;
