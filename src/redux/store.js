import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import user from "./modules/user";
import post from "./modules/post";

// 모듈 만들어 놓은 것이 없기 떄문에 
const rootReducer = combineReducers({user, post});


// 적용할 미들웨어 묶음 ("배열로" 표시)
const middlewares = [thunk];
// 미들웨어 묶어서 인핸서 생성
const enhancer = applyMiddleware(...middlewares);

//미들웨어(인핸서)와 루트리듀서 묶어주는 과정
const store = createStore(rootReducer, enhancer);


export default store;