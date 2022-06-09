import React from "react";
import {useSelector, useDispatch} from "react-redux";
import { changeName } from "./redux/modules/cat";
import {useParams, useNavigate} from "react-router-dom"


const Detail = () => {
    const cat = useSelector(state => state.cat)
    console.log(cat);

    const dispatch = useDispatch();

    return (
        <div>
            <h1> 상세페이지입니다..</h1>
            <p> 리뷰 남기기 </p> 
            <p> name ::: {cat.name}</p>
            <button onClick={() => {
                dispatch(changeName("alice"))
            }}>이름바꾸기</button> 
        </div>
    )
}

export default Detail;