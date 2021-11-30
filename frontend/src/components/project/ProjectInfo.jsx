import React from "react";
import { Typography } from "antd";
import { useSelector } from "react-redux";

const { Paragraph } = Typography;

export default function ProjectInfo() {
  const { name, createdAt, imageCount } = useSelector(
    (state) => state.projectReducer.detail
  );
  return (
    <>
      <Paragraph style={{ maxWidth: "100%" }} ellipsis={true}>
        <b>Project:</b> {name}
      </Paragraph>
      <Paragraph style={{ maxWidth: "100%" }} ellipsis={true}>
        <b>Created:</b> {createdAt}
      </Paragraph>
      <Paragraph style={{ maxWidth: "100%" }} ellipsis={true}>
        <b>Images:</b> {imageCount} {imageCount > 1 ? "Images" : "Image"}
      </Paragraph>
    </>
  );
}
