import { useNavigate, useParams } from "react-router-dom";
import { useInfoViewActionsContext } from "@crema/context/AppContextProvider/InfoViewContextProvider";
import AddClient from "./AddClient";
import { putDataApi, useGetDataApi } from "@crema/hooks/APIHooks";
import { isEmptyObject } from "@crema/helpers/ApiHelper";
import { StyledTypographyWrapper } from "../index.styled";
import { ClientType } from "@crema/types/models/invoice";

const EditClients = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const infoViewActionsContext = useInfoViewActionsContext();

  const [{ apiData: selectedClient }] = useGetDataApi<ClientType>(
    "/api/clients/detail",
    {} as ClientType,
    { id },
    true,
  );
  const onSave = (client: ClientType) => {
    putDataApi("/api/invoice/clients/update", infoViewActionsContext, {
      client,
    })
      .then(() => {
        infoViewActionsContext.showMessage(
          "Client has been updated successfully!",
        );
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });

    navigate("/invoice/clients");
  };

  return !isEmptyObject(selectedClient) ? (
    <StyledTypographyWrapper>
      <AddClient selectedClient={selectedClient} onSave={onSave} />
    </StyledTypographyWrapper>
  ) : null;
};

export default EditClients;
