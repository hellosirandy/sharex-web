import React from 'react';
import { Container } from 'react-bootstrap';
import NavBar from '../../components/NavBar';
import TotalPieSection from '../../components/TotalPieSection';

class HomePage extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Container style={{ margin: 0, padding: 15, maxWidth: 'unset' }}>
          <TotalPieSection />
        </Container>
      </React.Fragment>
    );
  }
}

export default HomePage;
