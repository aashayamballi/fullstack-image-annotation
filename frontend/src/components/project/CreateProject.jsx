import React, { useState } from "react";

import { Input, Row, Col, Form, Button } from "antd";
import { useHistory } from "react-router-dom";

import { createProject } from "../../actions/project/project-api";

function CreateProject() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    await createProject(values);
    setLoading(true);
    history.push("/");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row justify="space-around">
      <Col span={10}>
        <div className="container">
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Project Name"
              name="name"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Please input your project name!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button loading={loading} type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
}

export default React.memo(CreateProject);
