import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import PostReducer from "./reducer_posts";
import categoriesReducer from "./categoryReducer"
const rootReducer = combineReducers({
  posts: PostReducer,
  form: formReducer,
  categories:categoriesReducer
});

export default rootReducer;
