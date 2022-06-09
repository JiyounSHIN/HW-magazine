//user.js
import { db } from "../../shared/firebase";
import { collection, addDoc, doc, getDoc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";

//action type
const CREATE = "user/SIGNUP"
const LOAD = "user/LOADACCOUNT"

//초기값
const initialState = {
    list: [{
        user_id : "",
        nickname : "",
    }]
};

// action 생성함수
export function signup(user) {
    return {type : CREATE, user}
}
export function loadAccount(user_list) {
    return {type : LOAD, user_list}
}


// 미들웨어 (계정 업로드)
export const signupFB = (user) => {
    return async function (dispatch) {
        const docRef = await addDoc(collection(db,"users"), user);
        // document id값과, type : "doc 레퍼런스(참조)" 값 내, 실제 data 값 추출하기 
        // console.log(docRef.id, (await getDoc(docRef)).data()); 
        
        const _user = await getDoc(docRef);
        const user_list = {id:_user.id, ..._user.data()};
        
        dispatch(signup(user));
    }
}

// 미들웨어 (user 정보를 위한 load)
export const loadAccountFB = () => {
    //리덕스 thunk (함수로 반환)
    return async function (dispatch) {
        const users = await getDocs(collection(db,"users"));
        // console.log(post_card);
        //가져온 data를 배열로 변환
        let user_list = [];
        //배열에 값 넣기
        user_list.forEach((doc) => {
            // console.log(doc);
            // console.log(doc.data());
            user_list.push({id:doc.id, ...doc.data()});  //id 추가.
        })
        // console.log(post_list); // 배열로 잘 들어왔는지 확인중
        dispatch(loadAccount(user_list));
    }
}


// 리듀서 !!! 
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case "user/SIGNUP": {
            const new_user_list = [...state.list, action.user];
            console.log(new_user_list);
            return {list: new_user_list };
        }
        case "user/LOADMAIN": {
            return {list : action.user_list}
        }
        default:
            return state;
    } 
}


