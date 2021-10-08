import LoginForm from "./LoginForm";
import styled from "styled-components";

const LandingContainer = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 20px;

  box-shadow: 0.1px 0.6px 2.3px rgba(0, 0, 0, 0.026),
    0.3px 1.3px 5.5px rgba(0, 0, 0, 0.038),
    0.6px 2.5px 10.4px rgba(0, 0, 0, 0.046),
    1.1px 4.5px 18.5px rgba(0, 0, 0, 0.054),
    2.1px 8.4px 34.7px rgba(0, 0, 0, 0.065), 5px 20px 83px rgba(0, 0, 0, 0.09);
`;

const Landing = () => {
  return (
    <LandingContainer>
      <LoginForm />
    </LandingContainer>
  );
};

export default Landing;
