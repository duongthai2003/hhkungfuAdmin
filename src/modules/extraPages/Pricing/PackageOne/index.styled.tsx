import AppRowContainer from "@crema/components/AppRowContainer";
import AppCard from "@crema/components/AppCard";
import styled from "styled-components";

export const StyledPackageOneCard = styled(AppCard)`
  background-color: ${({ theme }) => theme.palette.background.paper};
  color: ${({ theme }) => theme.palette.text.primary} !important;
  align-items: center;
`;
export const StyledPackageOneRow = styled(AppRowContainer)`
  max-width: 1000px;
  justify-content: center;
`;
