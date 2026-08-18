// import './App.ts';
import Theme from "./Theme/index";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./Theme/GlobalStyles";
import Header from './components/Header/index';
import { Navigate, Route, Routes } from 'react-router-dom';
import Guides from './components/Guides/index';
import { StyledMain } from './styles';
import WaybillHistory from './components/WaybillHistory/index';

function App() {
  return (
    <>
      <ThemeProvider theme={Theme}>
        <GlobalStyle />
        <Header appName='Hound Express'/>
        <StyledMain>
          <Routes>
            <Route path= '/' element={<Navigate to = '/home' />} />
            <Route path='/home' element={<Guides/>} />
            <Route path='/waybill-history' element={<WaybillHistory/>} />
          </Routes>          
        </StyledMain> 
      </ThemeProvider>
    </>
  );
}

export default App;
