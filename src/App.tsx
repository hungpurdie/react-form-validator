import React from 'react';
import { GlobalStyles } from '~/styles/GlobalStyles';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import Login from '~/pages/Login/Login';
import LoginFormik from '~/pages/LoginFormik/Login';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
const ContainerBS = styled(Container)`
  padding-top: 5rem;
`;

function App() {
  return (
    <ContainerBS>
      <GlobalStyles />
      <Row>
        <Col>
          <Login />
        </Col>
        <Col>
          <LoginFormik />
        </Col>
      </Row>
    </ContainerBS>
  );
}

export default App;
