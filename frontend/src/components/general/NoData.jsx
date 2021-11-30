import React from "react";
import { Empty } from "antd";

export default function NoData({ title, description }) {
  return (
    <Empty
      description={
        <>
          <b>{title}</b>
          <p>{description}</p>
        </>
      }
    />
  );
}
