import TaskSideBar from "./TaskSideBar/index";
import TasksList from "./TasksList";
import TaskDetail from "./TaskDetail";
import { useIntl } from "react-intl";
import AppsContainer from "@crema/components/AppsContainer";
import AppPageMeta from "@crema/components/AppPageMeta";
import { useParams } from "react-router-dom";
import { useGetDataApi } from "@crema/hooks/APIHooks";
import { TodoObjType } from "@crema/types/models/apps/Todo";

const ToDo = () => {
  const [
    { apiData: taskLists, loading },
    { setQueryParams, setData, reCallAPI },
  ] = useGetDataApi<{ data: TodoObjType[]; count: number }>(
    "/api/todo/task/list",
    undefined,
    {},
    false,
  );

  const paramas = useParams();
  const { id } = paramas;
  console.log("id", paramas);

  const onGetMainComponent = () => {
    if (id) {
      return <TaskDetail />;
    } else {
      return (
        <TasksList
          taskLists={taskLists}
          loading={loading}
          setQueryParams={setQueryParams}
          setData={setData}
        />
      );
    }
  };

  const { messages } = useIntl();
  return (
    <AppsContainer
      title={messages["todo.todoApp"] as string}
      sidebarContent={<TaskSideBar reCallAPI={reCallAPI} />}
    >
      <AppPageMeta title="Todo App" />
      {onGetMainComponent()}
    </AppsContainer>
  );
};

export default ToDo;
