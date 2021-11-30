import React from "react";
import { useSelector } from "react-redux";
import { message } from "antd";
import { useParams } from "react-router-dom";

import ReactImageAnnotate from "react-image-annotate";

import { setCoordinateOnImage } from "../../actions/image_annotation/image-annotation-api";
import { BASE_URL } from "../../actions/urls";

export default function ImageAnnotation() {
  const { imgId } = useParams();
  const { imageDetail, vehicleTypes } = useSelector(
    (state) => state.imageAnnotationReducer
  );

  const onExit = async (layoutState) => {
    // console.log("on exit", layoutState);
    const response = await setCoordinateOnImage(
      imgId,
      layoutState.images[0].regions
    );
    message.info("updated");
  };

  return (
    <div>
      <ReactImageAnnotate
        labelImages
        regionClsList={vehicleTypes}
        enabledTools={["select", "create-box"]}
        images={[
          {
            src: `${BASE_URL}${imageDetail.image}`,
            name: imageDetail.image.split("/")[3],
            regions: imageDetail.annotations,
          },
        ]}
        onExit={(layoutState) => onExit(layoutState)}
      />
    </div>
  );
}
