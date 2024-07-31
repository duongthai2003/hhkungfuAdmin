import { MoreOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";

import { useNavigate } from "react-router-dom";
import { InvoiceType } from "@crema/types/models/invoice";

type StatusType = {
  status: number;
  label: string;
};

type OrderActionsProps = {
  id: number;
  data: InvoiceType;
  status: number;
  onChangeStatus: (invoice: InvoiceType, status: number) => void;
};

const OrderActions = ({
  id,
  data,
  status,
  onChangeStatus,
}: OrderActionsProps) => {
  const navigate = useNavigate();

  let orderList: StatusType[] = [];

  switch (status) {
    case 120: {
      orderList = [
        { status: 121, label: "Mark as Paid" },
        { status: 122, label: "Mark as Declined" },
        { status: 123, label: "Mark as Cancelled" },
      ];
      break;
    }
    case 121: {
      orderList = [
        { status: 123, label: "Mark as Cancelled" },
        { status: 122, label: "Mark as Declined" },
      ];
      break;
    }
    case 122: {
      orderList = [
        {
          status: 121,
          label: "Mark as Paid",
        },
        {
          status: 123,
          label: "Mark as Cancelled",
        },
      ];
      break;
    }
    case 123: {
      orderList = [
        {
          status: 121,
          label: "Mark as Paid",
        },
        {
          status: 122,
          label: "Mark as Declined",
        },
      ];
      break;
    }
  }

  const items: MenuProps["items"] = [
    {
      key: 120,
      label: "View Invoice",
      onClick: () => navigate(`/invoice/pdf/${id}`),
    },
  ];

  orderList?.forEach((item) => {
    items.push({
      key: item.status,
      label: item.label,
      onClick: () => onChangeStatus(data, item.status),
    });
  });

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <Button shape="circle">
        <MoreOutlined />
      </Button>
    </Dropdown>
  );
};
export default OrderActions;
