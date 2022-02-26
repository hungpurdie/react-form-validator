import React from 'react';
import JoinForm from '~/components/JoinForm/JoinForm';
import { GlobalStyles } from '~/styles/GlobalStyles';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

function App() {
  return (
    <div className="main-container d-table position-absolute m-auto">
      <JoinForm />
    </div>
  );
}

export default App;
