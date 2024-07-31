import ClientLogo from "./ClientLogo";
import { useIntl } from "react-intl";
import {
  StyledAppCard,
  StyledClient,
  StyledClientWrapper,
} from "./index.styled";
import { AboutUsClientsData } from "@crema/mockapi/fakedb/extraPages";

type ClientsProps = {
  clients: AboutUsClientsData[];
};

const Clients = ({ clients }: ClientsProps) => {
  const { messages } = useIntl();
  return (
    <StyledAppCard title={messages["extraPages.client"] as string}>
      <div
        style={{
          overflow: "hidden",
        }}
      >
        <StyledClientWrapper>
          {clients.map((client, index) => (
            <StyledClient key={index}>
              <ClientLogo client={client} />
            </StyledClient>
          ))}
        </StyledClientWrapper>
      </div>
    </StyledAppCard>
  );
};

export default Clients;
