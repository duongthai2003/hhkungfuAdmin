import React from "react";
import { Slider } from "antd";
import { StyledProductSidebarPriceSelector } from "./index.styled";

const PriceSelector = () => {
  const [value, setValue] = React.useState<[number, number]>([50, 400]);

  const handleChange = (value: any) => {
    setValue(value);
  };
  return (
    <>
      <Slider range defaultValue={value} onChange={handleChange} />

      <StyledProductSidebarPriceSelector>
        <span>$ {value[0]}</span>
        <span>$ {value[1]}</span>
      </StyledProductSidebarPriceSelector>
    </>
  );
};

export default PriceSelector;
