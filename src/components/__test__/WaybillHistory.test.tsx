
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from 'styled-components';
import Theme from '../../Theme';
import { MemoryRouter } from 'react-router-dom';
// import WaybillHistory from '../WaybillHistory';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

jest.mock('../../components/utils/getImages.ts', () => ({
    __esModule: true,
    default: jest.fn().mockReturnValue({
        'logo.png': 'mocked-logo-path.png',
    }),
}));
// beforeAll(() => {
//     (require as any).context = () => (() => 'mocked-image');
// })
const WaybillHistory = require('../WaybillHistory/index.tsx').default;
const mockStore = configureStore({
    reducer:{
        guides: () => ({
            guides: [
            {
                guideNr:'1',
                source:'Puebla',
                destination:'Durango',
                addressee:'281306',
                creationDate:'8/12/2026',
                status: 'In Progress'
            }            
        ],
            history: [
            {
                creationDate:'8/12/2026',
                guideNr:'1',
                status:'In Progress',
            }
        ],
        status:'SUCCEEDED',
        errors: {}
        })
    }
});

const mockGuideHistory = {
    "guideNr": "1",
    "creationDate": "27-08-2026",
    "status": "In Progress"
};

describe('MyComponent Render Logic', () => {
    it('should validate if element was added to historical table', async () => {
        // 2. Trigger Re-render
        render(
        <ThemeProvider theme={Theme}>
            <HelmetProvider>
                <Provider store={mockStore}>
                    <MemoryRouter
                        initialEntries={['/history?guide=1']}>
                        <WaybillHistory />
                    </MemoryRouter>
                </Provider>
            </HelmetProvider>
        </ThemeProvider>
        );

        // 1. Target the form element by its accessible role/name
        const guideCell = await screen.findByRole('cell', { name: '1' });
        expect(guideCell).toBeInTheDocument();
    });
});