import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import App from '../../App';

// 1. Mockear los subcomponentes para aislar App y asegurar que se rendericen en sus respectivas rutas
jest.mock('../Guides/index.tsx', () => () => <div data-testid="guides-page">Guides Component</div>);
jest.mock('../WaybillHistory/index.tsx', () => () => <div data-testid="history-page">WaybillHistory Component</div>);
jest.mock('../Header/index.tsx', () => ({ appName }: { appName: string }) => (
  <header data-testid="header-component">{appName}</header>
));

describe('App Component', () => {
  
  test('debe redirigir de "/" a "/home" y renderizar Guides', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // Verifica que el Header siempre se renderice con el prop correcto
    expect(screen.getByTestId('header-component')).toHaveTextContent('Hound Express');
    
    // Verifica la redirección automática a la página de Guides
    expect(screen.getByTestId('guides-page')).toBeInTheDocument();
  });

  test('debe renderizar la ruta /waybill-history correctamente', () => {
    render(
      <MemoryRouter initialEntries={['/waybill-history']}>
        <App />
      </MemoryRouter>
    );

    // Verifica que el componente de historial se renderice en su ruta
    expect(screen.getByTestId('history-page')).toBeInTheDocument();
    expect(screen.queryByTestId('guides-page')).not.toBeInTheDocument();
  });

});
