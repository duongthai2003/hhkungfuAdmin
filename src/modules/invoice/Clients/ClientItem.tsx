import { AiOutlineMail } from "react-icons/ai";
import { BsLink45Deg } from "react-icons/bs";
import { FiPhone } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import AppCard from "@crema/components/AppCard";
import { Button, Dropdown, MenuProps, Typography } from "antd";
import { StyledAvatar, StyledSecondaryText } from "./index.styled";
import { MoreOutlined } from "@ant-design/icons";
import { ClientType } from "@crema/types/models/invoice";

type Props = {
  client: ClientType;
};

const ClientItem = ({ client }: Props) => {
  const navigate = useNavigate();

  const menuItems: MenuProps["items"] = [
    {
      key: 312,
      label: "Edit Client",
      onClick: () => navigate(`/invoice/client/edit/${client.id}`),
    },
  ];
  return (
    <AppCard
      extra={
        <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
          <Button shape="circle">
            <MoreOutlined />
          </Button>
        </Dropdown>
      }
    >
      {client?.logo ? (
        <StyledAvatar src={client.logo} size={60} shape="square" />
      ) : (
        <StyledAvatar size={60} shape="square">
          {client.name[0].toUpperCase()}
        </StyledAvatar>
      )}

      <Typography.Title
        level={4}
        style={{ marginTop: 16, marginBottom: 16, textAlign: "center" }}
      >
        {client.name}
      </Typography.Title>
      <div style={{ display: "flex", marginBottom: 16 }}>
        <AiOutlineMail size={20} />
        <StyledSecondaryText>{client.mail}</StyledSecondaryText>
      </div>
      <div style={{ display: "flex", marginBottom: 16 }}>
        <GoLocation size={20} />
        <StyledSecondaryText>
          {client.steetName} {client.steetName.length > 0 && " , "}
          {client.city} {client.city.length > 0 && " , "}
          {client.zipCode} {client.zipCode.length > 0 && " , "}
          {client.state} {client.state.length > 0 && " , "}
          {client.country}
        </StyledSecondaryText>
      </div>
      <div style={{ display: "flex", marginBottom: 16 }}>
        {client.phone ? <FiPhone size={20} /> : <BsLink45Deg size={20} />}
        <StyledSecondaryText>
          {client.phone ? (
            client.phone
          ) : (
            <Typography.Link href={client.link}>{client.link}</Typography.Link>
          )}
        </StyledSecondaryText>
      </div>
    </AppCard>
  );
};

export default ClientItem;
