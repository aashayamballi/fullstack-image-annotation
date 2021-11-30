import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Annotation from "./ImageAnnotation";
import LoadingCard from "../general/LoadingCard";
import { dispatchImageAnnotation } from "../../actions/image_annotation/image-annotation-action-creator";

export default function AnnotationContainer() {
  const dispatch = useDispatch();
  const { imgId } = useParams();

  useEffect(() => {
    dispatch(dispatchImageAnnotation(imgId));
  }, []);

  const { fetching } = useSelector((state) => state.imageAnnotationReducer);

  if (fetching) {
    return <LoadingCard />;
  } else {
    return (
      <>
        <Annotation />
      </>
    );
  }
}
