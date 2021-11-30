import React from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Image, Button, Space, Divider, Tooltip } from "antd";
import {
  DownloadOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";

import { BASE_URL, API_URL } from "../../actions/urls";

function ProjectImage({ image }) {
  const history = useHistory();
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <div className="horizontal-center">
          <Image width={200} src={`${BASE_URL}${image.image}`} />
        </div>
      </Col>
      <Col span={24}>
        <div className="horizontal-center">
          <Space split={<Divider type="vertical" />}>
            <Tooltip placement="bottom" title="Annotate image">
              <Button
                onClick={() => history.push(`/project/image/${image.id}`)}
                block
                type="primary"
                shape="round"
                icon={<EditOutlined />}
              />
            </Tooltip>
            <Tooltip placement="bottom" title="Download Annotations">
              <a
                href={`${API_URL}project/image/coordinate?image_id=${image.id}`}
                download
              >
                <Button
                  block
                  type="primary"
                  shape="round"
                  ghost
                  icon={<DownloadOutlined />}
                />
              </a>
            </Tooltip>
            <Tooltip placement="bottom" title="Delete image">
              <Button
                onClick={() =>
                  alert(
                    "deleting the image functioanlity (extra feature and not completed)"
                  )
                }
                block
                type="danger"
                shape="round"
                ghost
                icon={<DeleteOutlined />}
              />
            </Tooltip>
          </Space>
        </div>
      </Col>
    </Row>
  );
}

export default React.memo(ProjectImage);
