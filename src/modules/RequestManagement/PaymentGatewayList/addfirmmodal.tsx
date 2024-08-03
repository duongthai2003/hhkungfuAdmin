import { Col, Modal, ModalProps, Row, Form, Input, Select, Button } from "antd";
import React, { useEffect, useState } from "react";

import {
  patchDataApi,
  uploadDataApi,
  uploadPatchDataApi,
  uploadPostFileApi,
  useGetDataApi,
} from "@crema/hooks/APIHooks";
import TextArea from "antd/es/input/TextArea";
import { useInfoViewActionsContext } from "@crema/context/AppContextProvider/InfoViewContextProvider";
import Axios from "axios";

export type AddEpisodeModalProps = ModalProps & {
  row?: any;
  items?: any;
  start?: number;
  limit?: number;
  reCallAPI?: any;
  setOpen?: any;
};

const AddEpisodeModal = ({
  open,
  row,
  onCancel,
  reCallAPI,
  setOpen,
}: AddEpisodeModalProps) => {
  const [form] = Form.useForm();
  const inforViewContext = useInfoViewActionsContext();

  const [{ apiData: moviesList }] =
    useGetDataApi<AddEpisodeModalProps>("/movies");

  const optionsmovies = (data: any) => {
    return (
      data &&
      data.map((item: any, index: any) => {
        return {
          key: item._id, // pj=hải đẻ nhu này thì ms đúng
          label: item.namefirm,
          value: item._id,
          searchName: item.namefirm,
        };
      })
    );
  };

  const onFinish = async (values: any) => {
    try {
      row
        ? await uploadPatchDataApi(`/episode/${row._id}`, inforViewContext, {
            ...values,
            file: fileUpload,
          })
        : await uploadPostFileApi("/episode", inforViewContext, {
            ...values,
            file: fileUpload,
          });
      setOpen(false);

      reCallAPI && reCallAPI();
    } finally {
      // setTimeout(() => {
      //   setIsloading(false);
      // }, 1000);
    }
  };

  const [fileUpload, setFileUpload] = useState<Blob>();
  const handleChangeFile = (e: any) => {
    console.log(e.target.files[0]);
    setFileUpload(e.target.files[0]);
    Axios.post("", {});
  };
  console.log("kkkkkkkkk", moviesList?.items);

  return (
    <Modal
      title={row ? "Thay đổi" : "Thêm"}
      open={open}
      cancelText="Đóng"
      okText={row ? "Thay đổi" : "Thêm"}
      onCancel={onCancel}
      width={1000}
      footer={false}
    >
      <Form
        form={form}
        onFinish={onFinish}
        name="basic"
        autoComplete="off"
        initialValues={
          row && {
            nameEpisodes: row.nameEpisodes,
            episodesNum: row.episodesNum,
            movieId: row.movieId,
          }
        }
        layout="vertical"
      >
        <Row gutter={[24, 24]}>
          <Col span={12} className="gutter-row">
            <Form.Item
              name="nameEpisodes"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên tập phim",
                },
              ]}
              label={"Tên tập phim"}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12} className="gutter-row">
            <Form.Item
              name="episodesNum"
              rules={[
                {
                  required: true,
                  message: "tập phim",
                },
              ]}
              label={"tập phim"}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[24, 24]}>
          <Col span={12} className="gutter-row">
            <Form.Item
              name="movieId"
              label={"Phim"}
              rules={[
                {
                  required: row ? false : true,
                  message: "Phim",
                },
              ]}
            >
              <Select
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select"
                options={optionsmovies(moviesList && moviesList?.items)}
                optionFilterProp="searchName"
              />
            </Form.Item>
          </Col>
          <Col span={12} className="gutter-row">
            <Form.Item
              name="file"
              label={"ảnh bìa"}
              rules={[
                {
                  required: row ? false : true,
                  message: "Chọn video",
                },
              ]}
            >
              <Input
                type="file"
                onChange={(e) => {
                  handleChangeFile(e);
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item style={{ textAlign: "end" }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              padding: "0 35px",
              fontSize: "17px",
              marginTop: "11px",
            }}
            // loading={isloading}
          >
            {row ? "Thay đổi" : "Thêm"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default AddEpisodeModal;
