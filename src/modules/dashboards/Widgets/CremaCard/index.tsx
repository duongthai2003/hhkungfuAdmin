import React from "react";
import {
  StyledCremaCardHeader,
  StyledCremaLogo,
  StyledCremaPara,
  StyledCremaTitle,
  StyledCremaUserInfoContent,
  StyledSocialLink,
  StyledUserInfo,
} from "./index.styled";
import type { SocialInfoType } from "@crema/types/models/dashboards/Widgets";
import { Card } from "antd";

type CremaCardProps = {
  data: SocialInfoType;
  bgColor: string;
  icon: any;
};

const CremaCard: React.FC<CremaCardProps> = ({ data, bgColor, icon }) => {
  return (
    <Card style={{ backgroundColor: bgColor, border: "none" }}>
      <StyledCremaCardHeader>
        <StyledUserInfo>
          <StyledCremaLogo>
            <img alt="logo" src={data.image} />
          </StyledCremaLogo>
          <StyledCremaUserInfoContent>
            <StyledCremaTitle className="text-truncate text-uppercase">
              {data.name}
            </StyledCremaTitle>
            <p className="text-truncate">{data.id}</p>
          </StyledCremaUserInfoContent>
        </StyledUserInfo>
        <StyledSocialLink>{icon}</StyledSocialLink>
      </StyledCremaCardHeader>

      <StyledCremaPara>{data.desc}</StyledCremaPara>
    </Card>
  );
};

export default CremaCard;
