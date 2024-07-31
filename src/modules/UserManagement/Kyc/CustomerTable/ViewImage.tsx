import { ModalProps } from 'antd';
import styled from 'styled-components';

export type ViewImageProps = ModalProps & {
  src: string;
};
const CustomDiv = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  background: rgba(0, 0, 0);
  z-index: 1;
`;
export const ViewImage = ({ src }: ViewImageProps) => {
  return (
    <CustomDiv>
      <img src={src} />
    </CustomDiv>
  );
};
