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

export type UpdateModallProps = ModalProps & {
  row?: any;
  items?: any;
  start?: number;
  limit?: number;
  reCallAPI?: any;
  setOpen?: any;
};

const UpdateModal = ({
  open,
  row,
  onCancel,
  reCallAPI,
  setOpen,
}: UpdateModallProps) => {
  const [form] = Form.useForm();
  const inforViewContext = useInfoViewActionsContext();
  // const [optionsCategory,setOptionsCategory] = useState()

  const [{ apiData: categorys }] =
    useGetDataApi<UpdateModallProps>("/category");

  const optionsCategory = (data: any) => {
    return (
      data &&
      data.map((item: any, index: any) => {
        return {
          key: item._ids, // pj=hải đẻ nhu này thì ms đúng
          label: item.categoryName,
          value: item._id,
          searchName: item.categoryName,
        };
      })
    );
  };

  const showdate = [
    {
      value: 2,
      label: "thứ 2",
    },
    {
      value: 3,
      label: "thứ 3",
    },
    {
      value: 4,
      label: "thứ 4",
    },
    {
      value: 5,
      label: "thứ 5",
    },
    {
      value: 6,
      label: "thứ 6",
    },
    {
      value: 7,
      label: "thứ 7",
    },
    {
      value: 8,
      label: "chủ nhật",
    },
  ];
  const onFinish = async (values: any) => {
    try {
      // const res = await MdUploadFile(file)
      row
        ? await uploadPatchDataApi(`/movies/${row._id}`, inforViewContext, {
            ...values,
            file: fileUpload,
          })
        : await uploadPostFileApi("/movies", inforViewContext, {
            ...values,
            file: fileUpload,
          });
      setOpen(false);
      console.log({ ...values, file: fileUpload });

      reCallAPI();
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
    // form.setFieldValue("poster", "duong thai"));
  };
  // useEffect(() => {
  //   form.setFieldValue("poster", fileUpload);
  // }, [fileUpload]);

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
            namefirm: row.namefirm,
            description: row.description,
            Showtimes: row.Showtimes,
            categorys: row.categorys.map((item: any) => {
              return item._id;
            }),
          }
        }
        layout="vertical"
      >
        <Row gutter={[24, 24]}>
          <Col span={12} className="gutter-row">
            <Form.Item
              name="namefirm"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên phim",
                },
              ]}
              label={"Tên phim"}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12} className="gutter-row">
            <Form.Item
              name="categorys"
              rules={[
                {
                  required: true,
                  message: "Thể loại",
                },
              ]}
              label={"Thể loại"}
            >
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select"
                options={optionsCategory(categorys?.items)}
                optionFilterProp="searchName"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[24, 24]}>
          <Col span={8} className="gutter-row">
            <Form.Item
              name="Showtimes"
              label={"thời gian chiếu"}
              rules={[
                {
                  required: row ? false : true,
                  message: "thời gian chiếu",
                },
              ]}
            >
              <Select
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select"
                options={showdate}
              />
            </Form.Item>

            <Form.Item
              name="file"
              label={"ảnh bìa"}
              rules={[
                {
                  required: row ? false : true,
                  message: "ảnh bìa",
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
          <Col span={16} className="gutter-row">
            <Form.Item name="description" label={"mô tả"}>
              <TextArea
                placeholder="Mô tả"
                allowClear
                rows={10}
                spellCheck={false}
                style={{
                  outline: "none",
                  resize: "none",
                }}
              ></TextArea>
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
export default UpdateModal;
