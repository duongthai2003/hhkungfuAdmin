import { Avatar, Table } from "antd";
import {
  CloseCircleOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  StyledCartIncDec,
  StyledCartTable,
  StyledCartUser,
  StyledCartUserInfo,
} from "../index.styled";
import type { CartItemsType } from "@crema/types/models/ecommerce/EcommerceApp";

type Props = {
  cartItems: CartItemsType[];
  loading: boolean;
  onRemoveItem: (product: CartItemsType) => void;
  onIncrement: (product: CartItemsType) => void;
  onDecrement: (product: CartItemsType) => void;
};

const CartTable = ({
  cartItems,
  loading,
  onIncrement,
  onDecrement,
  onRemoveItem,
}: Props) => {
  const { Column, ColumnGroup } = Table;

  console.log("cartItems", cartItems);
  return (
    <StyledCartTable
      loading={loading}
      dataSource={cartItems}
      pagination={false}
    >
      <ColumnGroup>
        <Column
          title="Product"
          dataIndex="product"
          key="product"
          render={(product) => {
            return (
              <StyledCartUser>
                <Avatar src={product.image} />
                <StyledCartUserInfo>
                  <h3>{product.title}</h3>
                  <p>Brand: {product.brand}</p>
                </StyledCartUserInfo>
              </StyledCartUser>
            );
          }}
        />
        <Column
          title="Unit Price"
          dataIndex="price"
          key="price"
          render={(price) => <>${+price.mrp - +price.discount}</>}
        />
        <Column
          title="QTY"
          dataIndex="count"
          key="count"
          render={(count, record: CartItemsType) => (
            <StyledCartIncDec>
              <PlusOutlined
                className="pointer"
                onClick={() => onIncrement(record)}
              />
              <span>{count}</span>
              <MinusOutlined
                className="pointer"
                onClick={() => onDecrement(record)}
              />
            </StyledCartIncDec>
          )}
        />
        <Column
          title="Total"
          dataIndex="total"
          key="total"
          render={(total, record: any) => (
            <span>${(+total.mrp - +total.discount) * +record.count}</span>
          )}
        />
        <Column
          title=""
          dataIndex="close"
          key="close"
          render={(_, record: CartItemsType) => (
            <span onClick={() => onRemoveItem(record)}>
              <CloseCircleOutlined
                style={{ fontSize: 18, cursor: "pointer" }}
              />
            </span>
          )}
        />
      </ColumnGroup>
    </StyledCartTable>
  );
};

export default CartTable;
