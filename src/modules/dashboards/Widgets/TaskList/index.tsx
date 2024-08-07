import React from 'react';
import TaskItem from './TaskItem';
import AppCard from '@crema/components/AppCard';
import {useIntl} from 'react-intl';
import {List, Button} from 'antd';
import {CloseOutlined} from '@ant-design/icons';
import {StyledTaskListScrollbar} from './index.styled';
import type {TaskListDataType} from '@crema/types/models/dashboards/Widgets';

type TaskListProps = {
  data: TaskListDataType[];
};

const TaskList: React.FC<TaskListProps> = ({data}) => {
  const {messages} = useIntl();
  return (
    <AppCard
      heightFull
      className='no-card-space-ltr-rtl'
      title={messages['dashboard.taskList'] as string}
      extra={
        <Button className='close-btn'>
          <CloseOutlined />
        </Button>
      }
    >
      <StyledTaskListScrollbar>
        <List
          dataSource={data}
          renderItem={(item) => {
            return <TaskItem key={item.id} item={item} />;
          }}
        />
      </StyledTaskListScrollbar>
    </AppCard>
  );
};

export default TaskList;
