import axios from "axios";
import humps from "humps";

import { API_URL } from "../urls";

export const fetchProjects = async () => {
  try {
    const result = await axios({
      method: "get",
      url: API_URL + "project",
    });
    return humps.camelizeKeys(result.data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createProject = async (data) => {
  try {
    const result = await axios({
      method: "post",
      url: API_URL + "project/",
      data: {
        data,
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getDetailedProjectInfo = async (slug) => {
  try {
    const result = await axios({
      method: "get",
      url: API_URL + "project/detail/",
      params: {
        slug,
      },
    });
    return humps.camelizeKeys(result.data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
