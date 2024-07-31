import React from 'react';
import { Button, Card, Col, Row, Typography } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { useWebSocket } from '@contexts/WebSocketContext';
import { TradingSubType } from '@contexts/trading';

const CardSummary = ({ item }) => {
  const { wsSendMessage } = useWebSocket();

  const handleAdjustRise = () => {
    wsSendMessage(
      JSON.stringify({
        event: 'admin@adjust_chart',
        data: {
          d: item.d,
          sub: TradingSubType.Rise,
          v: item.maxSellEntry + 0.5,
        },
      }),
    );
  };

  const handleAdjustFall = () => {
    wsSendMessage(
      JSON.stringify({
        event: 'admin@adjust_chart',
        data: {
          d: item.d,
          sub: TradingSubType.Fall,
          v: item.minBuyEntry - 0.5,
        },
      }),
    );
  };
  return (
    <Card
      title={`Khung ${item.d}s`}
      classNames={{
        body: 'test',
      }}
      styles={{
        body: {
          padding: 5,
        },
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: 10 }}>
        <Typography.Text type="success" style={{ fontSize: 25 }}>
          {item.total}
        </Typography.Text>
        <br />
        <Typography.Text>đang giao dịch</Typography.Text>
      </div>
      {/* <Space size={20} direction="vertical" /> */}
      <Row gutter={16} style={{ marginBottom: 15 }}>
        <Col span={12}>
          <div style={{ textAlign: 'center' }}>
            <Typography.Text>Buy</Typography.Text>
            <br />
            <Typography.Text type="success" style={{ fontSize: 20 }}>
              {item.totalBuy} lệnh
            </Typography.Text>
            <br />
            <Typography.Text type="success" style={{ fontSize: 15 }}>
              ${item.totalBuyValue}{' '}
              <Typography.Text type="success" style={{ fontSize: 10 }}>
                USDT
              </Typography.Text>
            </Typography.Text>
            <br />
            <Typography.Text type="success" style={{ fontSize: 15 }}>
              Giá cược thấp nhất: ${item.minBuyEntry}{' '}
              <Typography.Text type="success" style={{ fontSize: 10 }}>
                USDT
              </Typography.Text>
            </Typography.Text>
          </div>
        </Col>
        <Col span={12}>
          <div style={{ textAlign: 'center' }}>
            <Typography.Text>Sell</Typography.Text>
            <br />
            <Typography.Text type="danger" style={{ fontSize: 20 }}>
              {item.totalSell} lệnh
            </Typography.Text>
            <br />
            <Typography.Text type="danger" style={{ fontSize: 15 }}>
              ${item.totalSellValue}{' '}
              <Typography.Text type="danger" style={{ fontSize: 10 }}>
                USDT
              </Typography.Text>
            </Typography.Text>
            <br />
            <Typography.Text type="danger" style={{ fontSize: 15 }}>
              Giá cược cao nhất ${item.maxSellEntry}{' '}
              <Typography.Text type="danger" style={{ fontSize: 10 }}>
                USDT
              </Typography.Text>
            </Typography.Text>
          </div>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <div
            style={{
              textAlign: 'center',
            }}
          >
            <Typography.Text type="danger" style={{ fontSize: 15 }}>
              {item.buyProfit < 0 ? '' : '+'} {item.buyProfit}
            </Typography.Text>{' '}
            <Typography.Text type="danger" style={{ fontSize: 10 }}>
              USDT
            </Typography.Text>
          </div>
          <Button
            style={{
              width: '100%',
            }}
            onClick={handleAdjustFall}
          >
            <ArrowDownOutlined /> Điều chỉnh xuống
          </Button>
          <Typography.Text
            type="danger"
            style={{ fontSize: 10, textAlign: 'center', display: 'block' }}
          >
            Điều chỉnh lên sẽ lấy giá cược thấp nhất - 0.5
          </Typography.Text>
        </Col>
        <Col span={12}>
          <div
            style={{
              textAlign: 'center',
            }}
          >
            <Typography.Text type="danger" style={{ fontSize: 15 }}>
              {item.sellProfit < 0 ? '' : '+'} {item.sellProfit}
            </Typography.Text>{' '}
            <Typography.Text type="danger" style={{ fontSize: 10 }}>
              USDT
            </Typography.Text>
          </div>
          <Button
            style={{
              width: '100%',
            }}
            onClick={handleAdjustRise}
          >
            <ArrowUpOutlined /> Điều chỉnh lên
          </Button>
          <Typography.Text
            type="danger"
            style={{ fontSize: 10, textAlign: 'center', display: 'block' }}
          >
            Điều chỉnh lên sẽ lấy giá cược cao nhất + 0.5
          </Typography.Text>
        </Col>
      </Row>
    </Card>
  );
};

export default CardSummary;
