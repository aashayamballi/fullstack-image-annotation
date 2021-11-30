import React from "react";
import { Row, Col } from "antd";

import ProjectCard from "./ProjectCard";

function DisplayProjects({ projects = [] }) {
  if (projects.length === 0) {
    return <h2>NO RESULTS!</h2>;
  } else {
    return (
      <>
        <Row gutter={[16, 16]}>
          {projects.map((project) => {
            return (
              <Col span={8} key={project.id}>
                <ProjectCard project={project} />
              </Col>
            );
          })}
        </Row>
      </>
    );
  }
}

export default React.memo(DisplayProjects);
