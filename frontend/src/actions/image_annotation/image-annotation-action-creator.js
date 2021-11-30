import { message } from "antd";

import {
  SET_IMAGE_ANNOTATION_DETAIL,
  SET_IMAGE_ANNOTATION_DETAIL_FETCHING,
  SET_VEHICLE_TYPE,
} from "./types";
import { getImageForAnnotation, getVehicleTypes } from "./image-annotation-api";

export const dispatchImageAnnotation = (imageId) => async (dispatch) => {
  try {
    dispatch({ type: SET_IMAGE_ANNOTATION_DETAIL_FETCHING, payload: true });
    const [vehicleTypes, imageAnnotation] = await Promise.all([
      getVehicleTypes(),
      getImageForAnnotation(imageId),
    ]);

    const vehicleTypeNames = vehicleTypes.map((type) => type.name);
    dispatch({ type: SET_VEHICLE_TYPE, payload: vehicleTypeNames });

    const regions = imageAnnotation.annotations.map((ele) => {
      const { vehicleType, color, h, w, x, y, type, annotationId } = ele;
      return {
        cls: vehicleType,
        color,
        h,
        id: annotationId,
        type,
        w,
        x,
        y,
      };
    });
    const modifiedImgAnnotation = { ...imageAnnotation, annotations: regions };
    dispatch({
      type: SET_IMAGE_ANNOTATION_DETAIL,
      payload: modifiedImgAnnotation,
    });

    dispatch({ type: SET_IMAGE_ANNOTATION_DETAIL_FETCHING, payload: false });
  } catch (error) {
    console.error(error);
    message.error("something went wrong while fetching image annotation data");
  }
};
