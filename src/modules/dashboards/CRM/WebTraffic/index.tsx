import React from 'react';
import WebTrafficGraph from './WebTrafficGraph';
import {blue, grey, red} from '@ant-design/colors';
import {useIntl} from 'react-intl';
import IntlMessages from '@crema/helpers/IntlMessages';
import {
  StyledWebTrafficCard,
  StyledWebTrafficContent,
  StyledWebTrafficItem,
} from './index.styled';
import type {WebsiteTrafficDataType} from '@crema/types/models/dashboards/Metrics';

type WebTrafficProps = {
  websiteTrafficData: WebsiteTrafficDataType[];
};

const WebTraffic: React.FC<WebTrafficProps> = ({websiteTrafficData}) => {
  const {messages} = useIntl();
  return (
    <StyledWebTrafficCard
      title={messages['dashboard.websiteTraffic'] as string}
    >
      <WebTrafficGraph websiteTrafficData={websiteTrafficData} />
      <StyledWebTrafficContent>
        <StyledWebTrafficItem>
          <h4 style={{color: red[5]}}>1,265</h4>
          <p className='mb-0'>
            <IntlMessages id='common.subscribers' />
          </p>
        </StyledWebTrafficItem>
        <StyledWebTrafficItem>
          <h4 style={{color: grey[4]}}>2021</h4>
        </StyledWebTrafficItem>
        <StyledWebTrafficItem>
          <h4 style={{color: blue[4]}}>12,432</h4>
          <p className='mb-0'>
            <IntlMessages id='common.newUsers' />
          </p>
        </StyledWebTrafficItem>
      </StyledWebTrafficContent>
    </StyledWebTrafficCard>
  );
};

export default WebTraffic;
