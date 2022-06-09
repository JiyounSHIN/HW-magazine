//user.js
import { db } from "../../shared/firebase";
import { collection, addDoc, doc, getDoc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import { connectStorageEmulator } from "firebase/storage";

//action type
const POSTING = "post/CREATEPOST"
const LOAD = "post/LOADMAIN"
const EDITOR = "post/UPDATEPOST"
const DELETE = "post/DELETEPOST"

//초기값
const initialState = {
    list: [{
        user_id : "",
        nickname : "",
        date : "",
        image : "",
        layout : "",
        write : ""
    }]
};

// action 생성함수
export function createPost(post) {
    return {type : POSTING, post}
}
export function loadmain(post_list) {
    return {type : LOAD, post_list}
}
export function updatePost(post_index) {
    return {type : EDITOR, post_index}
}
export function deletePost(post_index) {
    return {type : DELETE, post_index}
}

// 미들웨어 (posting 페이지)
export const createPostFB = (post) => {
    return async function (dispatch) {
        const docRef = await addDoc(collection(db,"posts"), post);
        // document id값과, type : "doc 레퍼런스(참조)" 값 내, 실제 data 값 추출하기 
        console.log(docRef.id, (await getDoc(docRef)).data()); 
        const _post = await getDoc(docRef)
        const post_list = {id: post.id, ... _post.data()};
        dispatch(createPost(post));
    }
}

// 미들웨어 (loading 메인페이지)
export const loadmainFB = (post) => {
    //리덕스 thunk (함수로 반환)
    return async function (dispatch) {
        const post_card = await getDocs(collection(db,"posts"), post);
        // console.log(post_card);
        //가져온 data를 배열로 변환
        let post_list = [];
        //배열에 값 넣기
        post_card.forEach((doc) => {
            // console.log(doc);
            // console.log(doc.data());
            post_list.push({id:doc.id, ...doc.data()});  //id 추가.
        })
        // console.log(post_list); // 배열로 잘 들어왔는지 확인중
        dispatch(loadmain(post_list));
    }
}

// 미들웨어 (editor 메인페이지)
export const updatePostFB = (post_ud) => {
    return async function (dispatch, getState) {
        console.log(post_ud.id, post_ud); // id  + data 잘 가지고 오는지 확인 중 
        const docRef = doc(db, "posts", post_ud.id); // doc 하나 찍기위한 선언 !! 
        await updateDoc(docRef, {
            image : post_ud.image,
            layout : post_ud.layout,
            write : post_ud.write
        });
        // post 모듈에 있는 모든  값 가져오기
        console.log(getState().post);
        const _post_list = getState().post.list;
        // 업데이트 된 post 액션에 index 넣어주기 위해 (index 찾는 내장함수)
        const post_index = _post_list.findIndex((x)=> {
            return x.id === post_ud.id;
        })
        console.log(post_index); // index = 0 잘 나옴
        // 액션 일으킬 때, index 넣기 !!! 
        dispatch(updatePost(post_index)); 
    }
} 
// 미들웨어 (editor 메인페이지 : 삭제기능)
export const deletePostFB = (post_id) => {
    return async function (dispatch, getState) {
        const docRef = doc(db, "posts", post_id);
        await deleteDoc(docRef);
        const _post_list = getState().post.list;
        const post_index = _post_list.findIndex((x) => {
            return x.id === post_id.id;
        })
        // console.log(post_index);
        dispatch(deletePost(post_index));
    }
}

// 리듀서 !!! 
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case "post/CREATEPOST": {
            const new_post_list = [...state.list, action.post];
            console.log(new_post_list);
            return {list: new_post_list };
        }
        case "post/LOADMAIN": {
            return {list : action.post_list}
        }
        case "post/UPDATEPOST": {
            return {list : action.post_index}
        }
        case "post/DELETEPOST": {
            return {list : action.post_index}
        }
        default:
            return state;
    } 
}


