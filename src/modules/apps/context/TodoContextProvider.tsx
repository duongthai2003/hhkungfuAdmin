import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useGetDataApi } from "@crema/hooks/APIHooks";
import { useLocation, useParams } from "react-router-dom";
import {
  FolderObjType,
  LabelObjType,
  PriorityObjType,
  StaffObjType,
  StatusObjType,
  TodoObjType,
} from "@crema/types/models/apps/Todo";
import { APIDataProps } from "@crema/types/models/APIDataProps";

export const ViewMode = {
  List: "list",
  Calendar: "calendar",
};

export type TodoContextType = {
  labelList: LabelObjType[];
  folderList: FolderObjType[];
  priorityList: PriorityObjType[];
  staffList: StaffObjType[];
  statusList: StatusObjType[];
  taskLists: APIDataProps<TodoObjType[]>;
  loading: boolean;
  page: number;
  viewMode: string;
};

export type TodoActionContextType = {
  setTodoData: (data: APIDataProps<TodoObjType[]>) => void;
  setQueryParams: (data: object) => void;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    data: number,
  ) => void;
  reCallAPI: () => void;
  setPage: (data: number) => void;
  setViewMode: (data: string) => void;
};

const ContextState: TodoContextType = {
  labelList: [],
  folderList: [],
  priorityList: [],
  staffList: [],
  statusList: [],
  taskLists: {} as APIDataProps<TodoObjType[]>,

  loading: false,
  page: 0,
  viewMode: "list",
};

const TodoContext = createContext<TodoContextType>(ContextState);
const TodoActionsContext = createContext<TodoActionContextType>({
  setTodoData: (data: APIDataProps<TodoObjType[]>) => {
    console.log(data);
  },
  setQueryParams: (data: object) => {
    console.log(data);
  },
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    data: number,
  ) => {
    console.log(data);
    console.log(event);
  },
  reCallAPI: () => {},
  setPage: (data: number) => {
    console.log(data);
  },
  setViewMode: (data: string) => {
    console.log(data);
  },
});

export const useTodoContext = () => useContext(TodoContext);

export const useTodoActionsContext = () => useContext(TodoActionsContext);

type Props = {
  children: ReactNode;
};
export const TodoContextProvider = ({ children }: Props) => {
  const params = useParams();
  const [viewMode, setViewMode] = useState(ViewMode.List);
  const { pathname } = useLocation();
  const [{ apiData: labelList }] = useGetDataApi<LabelObjType[]>(
    "/api/todo/labels/list",
  );
  const [{ apiData: priorityList }] = useGetDataApi<PriorityObjType[]>(
    "/api/todo/priority/list",
  );
  const [{ apiData: staffList }] = useGetDataApi<StaffObjType[]>(
    "/api/todo/staff/list",
  );
  const [{ apiData: folderList }] = useGetDataApi<FolderObjType[]>(
    "/api/todo/folders/list",
    [],
  );
  const [{ apiData: statusList }] = useGetDataApi<StatusObjType[]>(
    "/api/todo/status/list",
    [],
  );
  const [page, setPage] = useState(0);

  const [
    { apiData: taskLists, loading },
    { setQueryParams, setData: setTodoData, reCallAPI },
  ] = useGetDataApi<APIDataProps<TodoObjType[]>>(
    "/api/todo/task/list",
    undefined,
    {},
    false,
  );

  useEffect(() => {
    setPage(0);
  }, [pathname]);

  useEffect(() => {
    setQueryParams({
      type: params?.folder ? "folder" : "label",
      name: params?.folder || params?.label,
      page: page,
    });
  }, [page, pathname]);

  const onPageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    value: number,
  ) => {
    console.log(event);
    setPage(value);
  };

  return (
    <TodoContext.Provider
      value={{
        labelList,
        priorityList,
        staffList,
        statusList,
        folderList,
        taskLists,
        loading,
        page,
        viewMode,
      }}
    >
      <TodoActionsContext.Provider
        value={{
          setTodoData,
          onPageChange,
          setQueryParams,
          reCallAPI,
          setPage,
          setViewMode,
        }}
      >
        {children}
      </TodoActionsContext.Provider>
    </TodoContext.Provider>
  );
};
export default TodoContextProvider;
