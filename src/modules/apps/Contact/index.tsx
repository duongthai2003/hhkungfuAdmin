import ContactListing from "./ContactListing";
import { useIntl } from "react-intl";
import AppsContainer from "@crema/components/AppsContainer";
import SideBarContent from "./ContactSideBar";
import AppPageMeta from "@crema/components/AppPageMeta";
import { useGetDataApi } from "@crema/hooks/APIHooks";
import type { ContactObjType } from "@crema/types/models/apps/Contact";

export type DataType = {
  data: ContactObjType[];
  count: number;
};
const Contact = () => {
  const [{ apiData, loading }, { setQueryParams, setData, reCallAPI }] =
    useGetDataApi<DataType>(
      "/api/contactApp/contact/List",
      undefined,
      {},
      false,
    );

  const { messages } = useIntl();
  return (
    <AppsContainer
      title={messages["contactApp.contact"] as string}
      sidebarContent={<SideBarContent reCallAPI={reCallAPI} />}
    >
      <AppPageMeta title="Contact App" />
      <ContactListing
        apiData={apiData}
        loading={loading}
        setQueryParams={setQueryParams}
        setData={setData}
        reCallAPI={reCallAPI}
      />
    </AppsContainer>
  );
};

export default Contact;
