import LoginForm from "./LoginForm";
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

const Landing = () => {
  return (
    <LandingContainer>
      <Title>Scribble</Title>
      <LoginForm />
    </LandingContainer>
  );
};

export default Landing;
