import React from "react";
import { Card, Row, Col } from "antd";

export default function LoadingCard({ numberOfCards = 6 }) {
  const sampleCardArray = [...Array(numberOfCards).keys()];

  const loadingCards = sampleCardArray.map((data) => {
    return (
      <Col span={8} key={data}>
        <Card size="small" loading={true} />
      </Col>
    );
  });

  return (
    <>
      <Row gutter={[16, 16]}>{loadingCards}</Row>
    </>
  );
}
