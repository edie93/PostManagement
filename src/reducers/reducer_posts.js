import { FETCH_POSTS, FETCH_POST, DELETE_POST, SEARCH_POSTS } from "../actions";
import _ from "lodash";
export default function(state = {}, action) {
  switch (action.type) {
    case DELETE_POST:
      return action.payload;
    case FETCH_POST:
      const post = action.payload;
      const newState = { ...state };
      newState[post.id] = post;
      return newState;
    case SEARCH_POSTS:
      return action.payload;
    case FETCH_POSTS:
      return action.payload;
    default:
      return state;
  }
}
