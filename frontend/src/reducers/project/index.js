import {
  SET_PROJECTS,
  SET_PROJECTS_FETCHING,
  SET_PROJECT_DETAIL_INFO,
  SET_FETCHING_PROJECT_DETAIL,
  UPDATE_PROJECT_IMAGES,
} from "../../actions/project/types";

const initialState = {
  projects: [],
  projectsFetching: false,
  detail: {
    id: 0,
    createdAt: "",
    imageCount: 0,
    images: [],
    name: "",
    slug: "",
  },
  fetchingDetail: false,
};

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case SET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
      };
    case SET_PROJECTS_FETCHING:
      return {
        ...state,
        projectsFetching: action.payload,
      };
    case SET_PROJECT_DETAIL_INFO:
      const { id, name, imageCount, images, createdAt, slug } = action.payload;
      return {
        ...state,
        detail: {
          ...state.detail,
          id,
          createdAt,
          imageCount,
          images,
          name,
          slug,
        },
      };
    case SET_FETCHING_PROJECT_DETAIL:
      return {
        ...state,
        fetchingDetail: action.payload,
      };
    case UPDATE_PROJECT_IMAGES:
      return {
        ...state,
        detail: {
          ...state.detail,
          images: [...state.detail.images, ...action.payload],
          imageCount: state.detail.imageCount + action.payload.length,
        },
      };
    default:
      return state;
  }
}
