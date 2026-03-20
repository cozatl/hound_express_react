import './App.ts';
import Theme from "./Theme/index.ts";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./Theme/GlobalStyles.js";
import Header from './components/Header/index.tsx';
import { Navigate, Route, Routes } from 'react-router-dom';
import Guides from './components/Guides/index.tsx';
import { StyledMain } from './App.ts';
import WaybillHistory from './components/WaybillHistory/index.tsx';

function App() {
  return (
    <>
      <ThemeProvider theme={Theme}>
        <GlobalStyle />
        <Header className="App-header" appName='Artist Songs'/>
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
