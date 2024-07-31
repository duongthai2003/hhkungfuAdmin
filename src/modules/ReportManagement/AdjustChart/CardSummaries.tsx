import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Typography } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { useWebSocket } from '@contexts/WebSocketContext';
import CardSummary from './CardSummary';

const CardSummaries = () => {
  const { wsAddListener } = useWebSocket();
  const [items, setItems] = useState([]);

  const onMsg = (event) => setItems(event.data?.data || []);

  useEffect(() => {
    wsAddListener(onMsg, 'admin@trade_summaries');
  }, []);
  return (
    <Row gutter={16}>
      {items.map((item) => {
        return (
          <Col span={6}>
            <CardSummary key={item.d} item={item} />
          </Col>
        );
      })}
    </Row>
  );
};

export default CardSummaries;
