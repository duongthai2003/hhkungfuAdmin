import React from 'react';
import IntlMessages from '@crema/helpers/IntlMessages';
import AppsDeleteIcon from '@crema/components/AppsDeleteIcon';
import {useLocation} from 'react-router-dom';
import {Button, Dropdown} from 'antd';
import {MdLabelOutline} from 'react-icons/md';
import {StyledTodoHeaderCheckedAction} from '../index.styled';
import {putDataApi, useGetDataApi} from '@crema/hooks/APIHooks';
import {useInfoViewActionsContext} from '@crema/context/AppContextProvider/InfoViewContextProvider';

import {LabelObjType, TodoObjType} from '@crema/types/models/apps/Todo';

type CheckedTasksActionsProps = {
  checkedTasks: number[];
  setCheckedTasks: (tasks: number[]) => void;
  page: number;
  onUpdateTasks: (tasks: TodoObjType[]) => void;
  setData: any;
};

const CheckedTasksActions: React.FC<CheckedTasksActionsProps> = ({
  checkedTasks,
  setCheckedTasks,
  onUpdateTasks,
  setData,
  page,
}) => {
  const {pathname} = useLocation();
  const path = pathname.split('/');
  const infoViewActionsContext = useInfoViewActionsContext();

  const [{apiData: labelList}] = useGetDataApi('/api/todo/labels/list', []);

  const onDeleteTasks = () => {
    putDataApi('/api/todo/update/folder', infoViewActionsContext, {
      taskIds: checkedTasks,
      type: path[path.length - 2],
      name: path[path.length - 1],
      page,
    })
      .then((data) => {
        setData(data);
        infoViewActionsContext.showMessage('Task Deleted Successfully');
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });

    setCheckedTasks([]);
  };

  const onSelectLabel = (key: number) => {
    putDataApi('/api/todo/update/label', infoViewActionsContext, {
      taskIds: checkedTasks,
      type: +key,
    })
      .then((data) => {
        onUpdateTasks(data as TodoObjType[]);
        infoViewActionsContext.showMessage('Task Updated Successfully');
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
    setCheckedTasks([]);
  };

  const menuLabel = labelList.map((label: LabelObjType, index: number) => {
    return {
      key: index,
      label: <span onClick={() => onSelectLabel(label.id)}> {label.name}</span>,
    };
  });

  return (
    <StyledTodoHeaderCheckedAction>
      <AppsDeleteIcon
        deleteAction={onDeleteTasks}
        deleteTitle={<IntlMessages id='todo.deleteMessage' />}
      />

      <Dropdown menu={{items: menuLabel}} trigger={['click']}>
        <Button shape='circle'>
          <MdLabelOutline />
        </Button>
      </Dropdown>
    </StyledTodoHeaderCheckedAction>
  );
};
export default CheckedTasksActions;
