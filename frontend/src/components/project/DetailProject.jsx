import React, { useEffect } from "react";

import { useParams } from "react-router-dom";
import { Row, Col } from "antd";
import { useSelector, useDispatch } from "react-redux";

import ProjectImageUpload from "./ProjectImageUpload";
import ProjectInfo from "./ProjectInfo";
import NoData from "../general/NoData";
import ProjectImage from "./ProjectImage";

import { dispatchDetailedProjectInfo } from "../../actions/project/project-action-creator";

function DetailProject() {
  const { projectSlug } = useParams();
  const dispatch = useDispatch();
  const { images } = useSelector((state) => state.projectReducer.detail);

  useEffect(() => {
    dispatch(dispatchDetailedProjectInfo(projectSlug));
  }, []);

  const generateImage = () => {
    return images.map((image) => {
      return (
        <Col span={8} key={image.id}>
          <div className="container">
            <ProjectImage image={image} />
          </div>
        </Col>
      );
    });
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={5}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <div className="container">
                <ProjectInfo />
              </div>
            </Col>
            <Col span={24}>
              <div className="container">
                <ProjectImageUpload />
              </div>
            </Col>
          </Row>
        </Col>
        <Col span={19}>
          <Row gutter={[16, 16]} align="middle">
            {images.length > 0 ? (
              generateImage()
            ) : (
              <Col span={24}>
                <div className="container">
                  <NoData
                    title="NO IMAGES IN THE PROJECT"
                    description="Upload the images from the left hand side of your project"
                  />
                </div>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default React.memo(DetailProject);
