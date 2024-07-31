import MailsList from "./MailsList";
import MailDetail from "./MailDetail";
import AppsContainer from "@crema/components/AppsContainer";
import MailSidebar from "./MailSideBar";
import { useIntl } from "react-intl";
import AppPageMeta from "@crema/components/AppPageMeta";
import { useParams } from "react-router-dom";

const Mail = () => {
  const { id } = useParams();

  const onGetMainComponent = () => {
    if (id) {
      return <MailDetail />;
    } else {
      return <MailsList />;
    }
  };

  const { messages } = useIntl();
  return (
    <AppsContainer
      title={messages["mailApp.mail"] as string}
      sidebarContent={<MailSidebar />}
    >
      <AppPageMeta title="Mail App" />
      {onGetMainComponent()}
    </AppsContainer>
  );
};

export default Mail;
