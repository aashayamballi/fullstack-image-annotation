import React from "react";

import { Card } from "antd";
import { useHistory } from "react-router-dom";

export default function ProjectCard({ project }) {
  const history = useHistory();
  return (
    <Card
      onClick={() => history.push(`project/${project.slug}`)}
      hoverable={true}
    >
      <h3>{project.name}</h3>
      <p>
        <b>Created at</b>: {project.createdAt}
      </p>
      <p>
        <b>Image count</b>: {project.imageCount}
      </p>
    </Card>
  );
}
