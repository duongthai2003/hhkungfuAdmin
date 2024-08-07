import React from 'react';
import CoinsInfo from './CoinsInfo';
import {Button} from 'antd';
import IntlMessages from '@crema/helpers/IntlMessages';
import {
  StyledTotalBalanceCard,
  StyledTotalBalanceFooter,
  StyledTotalBalanceHeader,
  StyledTotalBalanceMiddlePara,
  StyledTotalBalanceTitle,
  StyledTotalBalanceTitleSm,
  StyledTotalContentBalanceView,
} from './index.styled';
import type {TotalBalanceDataType} from '@crema/types/models/dashboards/Crypto';

type TotalBalanceProps = {
  totalBalanceData: TotalBalanceDataType;
};

const TotalBalance: React.FC<TotalBalanceProps> = ({totalBalanceData}) => {
  return (
    <>
      <h2 className='card-outer-title text-uppercase'>
        <IntlMessages id='dashboard.totalBalance' />
      </h2>
      <StyledTotalBalanceCard>
        <StyledTotalBalanceHeader>
          <div className='ant-column'>
            <StyledTotalBalanceTitle>
              ${totalBalanceData.balance}
            </StyledTotalBalanceTitle>
            <StyledTotalBalanceTitleSm>
              <IntlMessages id='dashboard.avlBalance' />
            </StyledTotalBalanceTitleSm>
          </div>
          <StyledTotalContentBalanceView>
            <Button ghost type='primary' className='btn'>
              <IntlMessages id='common.send' />
            </Button>
            <Button type='primary' className='btn'>
              <IntlMessages id='common.receive' />
            </Button>
          </StyledTotalContentBalanceView>
        </StyledTotalBalanceHeader>
        <StyledTotalBalanceMiddlePara>
          <IntlMessages id='dashboard.buyCurrency' />
        </StyledTotalBalanceMiddlePara>
        <StyledTotalBalanceFooter>
          <CoinsInfo coins={totalBalanceData.coins} />
        </StyledTotalBalanceFooter>
      </StyledTotalBalanceCard>
    </>
  );
};

export default TotalBalance;
