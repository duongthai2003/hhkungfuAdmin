import React from 'react';
import AppCard from '@crema/components/AppCard';
import AppSelect from '@crema/components/AppSelect';
import {useIntl} from 'react-intl';
import ActivityGraph from './ActivityGraph';
import type {YourActivityDataType} from '@crema/types/models/dashboards/HealthCare';

type YourActivityProps = {
  data: YourActivityDataType[];
};

const YourActivity: React.FC<YourActivityProps> = ({data}) => {
  const handleChange = (value: YourActivityDataType[]) => {
    console.log('value', value);
  };
  const {messages} = useIntl();
  return (
    <AppCard
      heightFull
      title={messages['healthCare.yourActivity'] as string}
      extra={
        <AppSelect
          menus={['This Week', 'Last Week', 'This Month']}
          defaultValue='This Week'
          onChange={handleChange}
        />
      }
    >
      <ActivityGraph data={data} />
    </AppCard>
  );
};

export default YourActivity;
