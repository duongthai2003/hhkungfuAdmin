import TaskSideBar from "./TaskSideBar/index";
import TasksList from "./TasksList";
import TaskDetail from "./TaskDetail";
import { useIntl } from "react-intl";
import AppsContainer from "@crema/components/AppsContainer";
import { useParams } from "react-router-dom";
import CalendarContextProvider from "../context/CalendarContextProvider";
import AppPageMeta from "@crema/components/AppPageMeta";

const ToDo = () => {
  const { id } = useParams();

  const { messages } = useIntl();

  const onGetMainComponent = () => {
    if (id) {
      return <TaskDetail />;
    } else {
      return <TasksList />;
    }
  };

  return (
    <CalendarContextProvider>
      <AppsContainer
        title={messages["todo.todoApp"] as string}
        sidebarContent={<TaskSideBar />}
      >
        <AppPageMeta title="Calendar App" />
        {onGetMainComponent()}
      </AppsContainer>
    </CalendarContextProvider>
  );
};

export default ToDo;
