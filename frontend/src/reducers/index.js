import { combineReducers } from "redux";

import projectReducer from "./project";
import imageAnnotationReducer from "./image-annotation";

// project imports

export default combineReducers({
  projectReducer,
  imageAnnotationReducer,
});
