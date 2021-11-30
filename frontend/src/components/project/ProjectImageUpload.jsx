import React, { useState, useEffect } from "react";
import { Upload, Button, message } from "antd";
import { useParams } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";

import { dispatchImageUpload } from "../../actions/project/project-action-creator";

export default function ProjectImageUpload() {
  const { projectSlug } = useParams();
  const dispatch = useDispatch();
  const { fetchingDetail, detail } = useSelector(
    (state) => state.projectReducer
  );
  const { imageCount } = detail;
  const [imageFiles, setImageFiles] = useState([]);

  // reset the selected images to empty array
  useEffect(() => {
    setImageFiles([]);
  }, [imageCount]);

  const props = {
    onRemove: (file) => {
      setImageFiles((prevState) => {
        const index = prevState.indexOf(file);
        const newFileList = prevState.slice();
        newFileList.splice(index, 1);
        return newFileList;
      });
    },
    beforeUpload: (file) => {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error(`${file.name} is not a JPG/PNG file`);
      } else {
        setImageFiles((prevFiles) => [...prevFiles, file]);
      }
      return false;
    },
    fileList: imageFiles,
  };

  const handleUpload = async () => {
    dispatch(dispatchImageUpload(projectSlug, imageFiles));
  };

  return (
    <>
      <Upload {...props} maxCount={10} disabled={fetchingDetail} multiple>
        <Button block icon={<UploadOutlined />}>
          Upload images only
        </Button>
      </Upload>
      <Button
        block
        type="primary"
        onClick={handleUpload}
        disabled={imageFiles.length === 0 || fetchingDetail}
        loading={fetchingDetail}
        style={{ marginTop: 16 }}
      >
        {fetchingDetail ? "Uploading" : "Start Upload"}
      </Button>
    </>
  );
}
