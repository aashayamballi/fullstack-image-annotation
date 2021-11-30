import {
  SET_IMAGE_ANNOTATION_DETAIL,
  SET_IMAGE_ANNOTATION_DETAIL_FETCHING,
  SET_VEHICLE_TYPE,
} from "../../actions/image_annotation/types";

const initialState = {
  imageDetail: {
    id: 0,
    project: "",
    image: "",
    annotations: [],
  },
  vehicleTypes: [],
  fetching: false,
};

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case SET_IMAGE_ANNOTATION_DETAIL:
      return {
        ...state,
        imageDetail: {
          ...state.imageDetail,
          ...action.payload,
        },
      };
    case SET_IMAGE_ANNOTATION_DETAIL_FETCHING:
      return {
        ...state,
        fetching: action.payload,
      };
    case SET_VEHICLE_TYPE:
      return {
        ...state,
        vehicleTypes: action.payload,
      };
    default:
      return state;
  }
}
