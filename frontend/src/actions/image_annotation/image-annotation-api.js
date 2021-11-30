import axios from "axios";
import humps from "humps";
import { API_URL } from "../urls";

export const uploadImageToProject = async (projectSlug, images) => {
  try {
    let fd = new FormData();
    images.forEach((image) => fd.append("image", image));
    fd.append("project", projectSlug);

    const response = await axios({
      method: "post",
      url: `${API_URL}project/image/`,
      data: fd,
    });

    return humps.camelizeKeys(response.data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getImageForAnnotation = async (id) => {
  try {
    const response = await axios({
      method: "get",
      url: `${API_URL}project/image/`,
      params: {
        id,
      },
    });
    return humps.camelizeKeys(response.data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getVehicleTypes = async () => {
  try {
    const response = await axios({
      method: "get",
      url: `${API_URL}project/image/vehicle-type`,
    });
    return humps.camelizeKeys(response.data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const setCoordinateOnImage = async (imageId, annotatedData) => {
  try {
    const regions = annotatedData.map((region) => {
      const { cls, color, id, type, h, w, x, y } = region;
      return {
        image: imageId,
        x,
        y,
        h,
        w,
        annotation_id: id,
        type,
        color,
        vehicle_type: cls,
      };
    });
    const response = await axios({
      method: "post",
      url: `${API_URL}project/image/coordinate`,
      data: {
        regions,
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
