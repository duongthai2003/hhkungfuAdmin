import React, {useEffect, useState} from 'react';
import TaskContentHeader from './TaskContentHeader';
import {useLocation} from 'react-router-dom';
import AddNewTask from '../AddNewTask';
import AppsPagination from '@crema/components/AppsPagination';
import AppsHeader from '@crema/components/AppsContainer/AppsHeader';
import AppsContent from '@crema/components/AppsContainer/AppsContent';
import ListEmptyResult from '@crema/components/AppList/ListEmptyResult';
import TodoListSkeleton from '@crema/components/AppSkeleton/TodoListSkeleton';
import AppList from '@crema/components/AppList';
import {
  StyledTodoFooter,
  StyledTodoListDesktop,
  StyledTodoListMobile,
} from './index.styled';
import {putDataApi} from '@crema/hooks/APIHooks';
import {useInfoViewActionsContext} from '@crema/context/AppContextProvider/InfoViewContextProvider';
import TaskListItemMobile from './TaskListItemMobile';
import TaskListItem from './TaskListItem';

import {TodoObjType} from '@crema/types/models/apps/Todo';

type TasksListProps = {
  taskLists: {data: TodoObjType[]; count: number};
  loading?: boolean;
  setQueryParams?: any;
  setData?: any;
};
const TasksList: React.FC<TasksListProps> = ({
  taskLists,
  loading,
  setQueryParams,
  setData,
}) => {
  const infoViewActionsContext = useInfoViewActionsContext();

  const {pathname} = useLocation();
  const [page, setPage] = useState(0);

  const [filterText, onSetFilterText] = useState<string>('');
  const [checkedTasks, setCheckedTasks] = useState<number[]>([]);
  const [isAddTaskOpen, setAddTaskOpen] = useState<boolean>(false);

  const [pageView, setPageView] = useState('list');

  useEffect(() => {
    setPage(0);
  }, [pathname]);

  useEffect(() => {
    const path = pathname.split('/');
    setQueryParams({
      type: path[path.length - 2],
      name: path[path.length - 1],
      page: page,
    });
  }, [page, pageView, pathname]);

  const onOpenAddTask = () => {
    setAddTaskOpen(true);
  };

  const onCloseAddTask = () => {
    setAddTaskOpen(false);
  };

  const onChange = (page: number) => {
    setPage(page - 1);
  };

  const onChangeCheckedTasks = (checked: boolean, id: number) => {
    if (checked) {
      setCheckedTasks(checkedTasks.concat(id));
    } else {
      setCheckedTasks(checkedTasks.filter((taskId) => taskId !== id));
    }
  };

  const onChangeStarred = (checked: boolean, task: TodoObjType) => {
    putDataApi<TodoObjType[]>(
      '/api/todo/update/starred',
      infoViewActionsContext,
      {
        taskIds: [task.id],
        status: checked,
      },
    )
      .then((data) => {
        onUpdateSelectedTask(data[0]);
        infoViewActionsContext.showMessage(
          data[0].isStarred
            ? 'Todo Marked as Starred Successfully'
            : 'Todo Marked as Unstarred Successfully',
        );
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const onUpdateSelectedTask = (task: TodoObjType) => {
    setData({
      data: taskLists?.data.map((item) => {
        if (item.id === task.id) {
          return task;
        }
        return item;
      }),
      count: taskLists?.count,
    });
  };

  const onDeleteSelectedTask = (task: TodoObjType) => {
    task.folderValue = 126;
    putDataApi('/api/todoApp/task/', infoViewActionsContext, {
      task,
    })
      .then(() => {
        setData({
          data: taskLists?.data.filter((item) => item.id !== task.id),
          count: taskLists?.count - 1,
        });
        infoViewActionsContext.showMessage('Task Deleted Successfully');
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const onGetFilteredItems = () => {
    if (filterText === '') {
      return taskLists?.data;
    } else {
      return taskLists?.data.filter((task) =>
        task.title.toUpperCase().includes(filterText.toUpperCase()),
      );
    }
  };

  const onChangePageView = (view: string) => {
    setPageView(view);
  };
  const onUpdateTasks = (tasks: TodoObjType[]) => {
    setData({
      data: taskLists?.data.map((item) => {
        const contact = tasks.find((contact) => contact.id === item.id);
        if (contact) {
          return contact;
        }
        return item;
      }),
      count: taskLists?.count,
    });
  };

  const list = onGetFilteredItems();
  return (
    <>
      <AppsHeader>
        <TaskContentHeader
          taskLists={taskLists?.data}
          count={taskLists?.count}
          checkedTasks={checkedTasks}
          setCheckedTasks={setCheckedTasks}
          filterText={filterText}
          onSetFilterText={onSetFilterText}
          onUpdateTasks={onUpdateTasks}
          setData={setData}
          onChange={onChange}
          page={page}
          onChangePageView={onChangePageView}
          pageView={pageView}
        />
      </AppsHeader>
      <AppsContent>
        <>
          <StyledTodoListDesktop>
            <AppList
              data={list}
              renderItem={(task) => (
                <TaskListItem
                  key={task.id}
                  task={task}
                  onChangeCheckedTasks={onChangeCheckedTasks}
                  checkedTasks={checkedTasks}
                  onChangeStarred={onChangeStarred}
                  onUpdateSelectedTask={onDeleteSelectedTask}
                />
              )}
              ListEmptyComponent={
                <ListEmptyResult
                  loading={loading}
                  actionTitle='Add Task'
                  onClick={onOpenAddTask}
                  placeholder={<TodoListSkeleton />}
                />
              }
            />
          </StyledTodoListDesktop>
          <StyledTodoListMobile>
            <AppList
              data={list}
              renderItem={(task) => (
                <TaskListItemMobile
                  key={task.id}
                  task={task}
                  checkedTasks={checkedTasks}
                  onChangeStarred={onChangeStarred}
                  onChangeCheckedTasks={onChangeCheckedTasks}
                />
              )}
              ListEmptyComponent={
                <ListEmptyResult
                  loading={loading}
                  actionTitle='Add Task'
                  onClick={onOpenAddTask}
                  placeholder={<TodoListSkeleton />}
                />
              }
            />
          </StyledTodoListMobile>
        </>
      </AppsContent>

      {taskLists?.data?.length > 0 ? (
        <StyledTodoFooter>
          <AppsPagination
            count={taskLists?.count}
            page={page}
            onChange={onChange}
          />
        </StyledTodoFooter>
      ) : null}

      {isAddTaskOpen ? (
        <AddNewTask
          isAddTaskOpen={isAddTaskOpen}
          onCloseAddTask={onCloseAddTask}
        />
      ) : null}
    </>
  );
};
export default TasksList;
