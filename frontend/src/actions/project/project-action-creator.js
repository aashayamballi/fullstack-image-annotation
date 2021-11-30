import { message } from "antd";

import {
  SET_PROJECTS,
  SET_PROJECTS_FETCHING,
  SET_FETCHING_PROJECT_DETAIL,
  SET_PROJECT_DETAIL_INFO,
  UPDATE_PROJECT_IMAGES,
} from "./types";
import { fetchProjects, getDetailedProjectInfo } from "./project-api";
import { uploadImageToProject } from "../image_annotation/image-annotation-api";

export const dispatchProjects = () => async (dispatch) => {
  try {
    dispatch({ type: SET_PROJECTS_FETCHING, payload: true });
    const response = await fetchProjects();
    dispatch({ type: SET_PROJECTS, payload: response });
  } catch (error) {
    console.error(error);
    message.error("something went wrong while fetching timeline data");
  } finally {
    dispatch({ type: SET_PROJECTS_FETCHING, payload: false });
  }
};

export const dispatchDetailedProjectInfo = (slug) => async (dispatch) => {
  try {
    dispatch({ type: SET_FETCHING_PROJECT_DETAIL, payload: true });
    const response = await getDetailedProjectInfo(slug);
    dispatch({ type: SET_PROJECT_DETAIL_INFO, payload: response });
  } catch (error) {
    console.log(error);
    if (error.response.status === 404) {
      message.warning("No project found", 5);
    } else {
      message.error("something went wrong");
    }
  } finally {
    dispatch({ type: SET_FETCHING_PROJECT_DETAIL, payload: false });
  }
};

export const dispatchImageUpload =
  (projectSlug, images) => async (dispatch) => {
    try {
      dispatch({ type: SET_FETCHING_PROJECT_DETAIL, payload: true });
      const response = await uploadImageToProject(projectSlug, images);
      dispatch({ type: UPDATE_PROJECT_IMAGES, payload: response });
    } catch (error) {
      console.error("something went wrong");
      message.error("Something went wrong while uploading the images");
    } finally {
      dispatch({ type: SET_FETCHING_PROJECT_DETAIL, payload: false });
    }
  };
