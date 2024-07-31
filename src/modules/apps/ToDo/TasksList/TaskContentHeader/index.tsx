import React from 'react';
import {useIntl} from 'react-intl';
import SelectTasksDropdown from './SelectTasksDropdown';
import CheckedTasksActions from './CheckedTasksActions';
import ViewSelectButtons from './ViewSelectButtons';
import {Checkbox} from 'antd';
import {
  StyledContentHeader,
  StyledTodoHeaderCheckboxView,
  StyledTodoHeaderPagination,
  StyledTodoSearch,
} from '../index.styled';

import {TodoObjType} from '@crema/types/models/apps/Todo';

type TaskContentHeaderProps = {
  taskLists: TodoObjType[];
  checkedTasks: number[];
  setCheckedTasks: (checkedTasks: number[]) => void;
  onChange: (checkedTasks: number) => void;
  filterText: string;
  onSetFilterText: (text: string) => void;
  onUpdateTasks: (tasks: TodoObjType[]) => void;
  onChangePageView: (view: string) => void;
  onViewModeSelect?: (mode: string) => void;
  pageView: string;
  page: number;
  setData: any;
  count: number;
};

const TaskContentHeader: React.FC<TaskContentHeaderProps> = ({
  taskLists,
  checkedTasks,
  setCheckedTasks,
  filterText,
  pageView,
  onSetFilterText,
  onChange,
  onChangePageView,
  onUpdateTasks,
  setData,
  page,
  count,
}) => {
  const onHandleMasterCheckbox = (event: any) => {
    if (event.target.checked) {
      const taskIds = taskLists?.map((task) => task.id);
      setCheckedTasks(taskIds);
    } else {
      setCheckedTasks([]);
    }
  };

  const onSelectTasks = (value: number) => {
    switch (value) {
      case 0:
        setCheckedTasks(taskLists?.map((task) => task.id));
        break;
      case 1:
        setCheckedTasks([]);
        break;

      case 2:
        setCheckedTasks(
          taskLists?.filter((task) => task.isStarred).map((task) => task.id),
        );
        break;

      case 3:
        setCheckedTasks(
          taskLists?.filter((task) => task.isAttachment).map((task) => task.id),
        );
        break;

      default:
        setCheckedTasks([]);
    }
  };

  const {messages} = useIntl();

  return (
    <>
      <StyledContentHeader>
        <StyledTodoHeaderCheckboxView>
          <Checkbox
            indeterminate={
              checkedTasks?.length > 0 &&
              checkedTasks?.length < taskLists?.length
            }
            checked={
              taskLists?.length > 0 && checkedTasks.length === taskLists?.length
            }
            onChange={onHandleMasterCheckbox}
          />
        </StyledTodoHeaderCheckboxView>

        <SelectTasksDropdown onSelectTasks={onSelectTasks} />

        <StyledTodoHeaderCheckboxView>
          {checkedTasks.length > 0 ? (
            <CheckedTasksActions
              checkedTasks={checkedTasks}
              setCheckedTasks={setCheckedTasks}
              onUpdateTasks={onUpdateTasks}
              setData={setData}
              page={page}
            />
          ) : null}
        </StyledTodoHeaderCheckboxView>

        <StyledTodoSearch
          placeholder={messages['common.searchHere'] as string}
          value={filterText}
          onChange={(event) => onSetFilterText(event.target.value)}
        />
        <ViewSelectButtons
          pageView={pageView}
          onChangePageView={onChangePageView}
        />
      </StyledContentHeader>
      {pageView === 'list' && taskLists?.length > 0 ? (
        <StyledTodoHeaderPagination
          count={count}
          page={page}
          onChange={onChange}
        />
      ) : null}
    </>
  );
};

export default TaskContentHeader;
