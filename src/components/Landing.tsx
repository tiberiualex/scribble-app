import { PropsWithChildren, ReactNode } from "react";
import styled from "styled-components";
import { defaultShadow } from "./generic/Styles";

const LandingContainer = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 20px;

  ${defaultShadow}
`;

const Title = styled.h1`
  text-align: center;
  margin: 0 0 20px;
`;

const Landing = (props: PropsWithChildren<ReactNode>) => {
  return (
    <LandingContainer>
      <Title>Scribble</Title>
      {props.children}
    </LandingContainer>
  );
};

export default Landing;
