import { fireEvent, render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom';
import React from 'react';
import Guides from '../Guides';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import Theme from '../../Theme';
import { configureStore } from '@reduxjs/toolkit';
import guideReducer, { updateGuideStatus } from '../../store/guideSlice';
import {GuideState} from '../../interfaces/guideParameters';
import { IDLE } from '../../store/status';
import { HelmetProvider } from 'react-helmet-async';


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
})

const mockGuide = {
    "guideNr": "1",
    "source": "Puebla",
    "destination": "Mexico",
    "addressee": "Privada flores",
    "creationDate": "27-08-2026",
    "status": "Pending"
};

const createMockStore = (preloadedState = {}) => {
    return configureStore({
        reducer: {
            guides: guideReducer,
        },
        preloadedState,
    });
};
    
const initialState: GuideState = {
    guides: [{guideNr: '1', source: 'Puebla', destination: 'Durango', addressee: 'Privada', creationDate: '8/10/2026', status: '0'}],
    history: [],
    status: IDLE,
    errors: {},
};

describe('Guides component', () => {
    it('should render Guides and add new guide when clicking Send button', async () => {
        
        const mockRes = {guide: mockGuide};
        
        const dispatchSpy = jest.spyOn(mockStore, 'dispatch');
        // const alertSpy = (jest.spyOn(window, 'alert').mockImplementation(() => {}))
        //Render the song in the search results
        render( 
                <ThemeProvider theme={Theme}>
                    <Provider store={mockStore}>
                        <HelmetProvider>
                            <MemoryRouter>
                                <Guides/>
                            </MemoryRouter>
                        </HelmetProvider>
                    </Provider>
                </ThemeProvider>);

        const guideNr = screen.getByRole('link', {name:`${mockRes.guide.guideNr}`});
        expect(guideNr).toBeInTheDocument();
        
        // 1. Target the form element by its accessible role/name
        const form = screen.getByRole('form', { name: /Guide Form/i });

        const button = within(form).getByRole('button', {name:/Enviar/i}); //Get button to add song to the library
        fireEvent.click(button);
        
        // Validate that dispatch was executed
        expect(dispatchSpy).toHaveBeenCalled();
        
        // Validate if alert is displayed
        // expect(alertSpy).toHaveBeenCalledWith('¡La guía se ha agregado correctamente!');
    });

    it('should render Guides and validate Send button while clicking an element in the table', async () => {
        
        const mockRes = {guide: mockGuide};
        
        const dispatchSpy = jest.spyOn(mockStore, 'dispatch');
        //Render the song in the search results
        render( 
                <ThemeProvider theme={Theme}>
                    <Provider store={mockStore}>
                        <HelmetProvider>
                            <MemoryRouter>
                                <Guides/>
                            </MemoryRouter>
                        </HelmetProvider>
                    </Provider>
                </ThemeProvider>);

        const guideNr = screen.getByRole('link', {name:`${mockRes.guide.guideNr}`});
        expect(guideNr).toBeInTheDocument();
        
        // 1. Find the specific row that contains your target guide's name
        const targetRow = screen.getByRole('row', { name: /1/i });

        const button = within(targetRow).getByRole('button', {name:/Enviar/i}); //Get button to add song to the library
        fireEvent.click(button);
        
        // Validate that dispatch was executed
        expect(dispatchSpy).toHaveBeenCalled();
    });

    it('should click button prevSlide from banner', async () => {        
        const mockRes = {guide: mockGuide};
        //Render the song in the search results
        render( 
                <ThemeProvider theme={Theme}>
                    <Provider store={mockStore}>
                        <HelmetProvider>
                            <MemoryRouter>
                                <Guides/>
                            </MemoryRouter>
                        </HelmetProvider>
                    </Provider>
                </ThemeProvider>);

        const guideNr = screen.getByRole('link', {name:`${mockRes.guide.guideNr}`});
        expect(guideNr).toBeInTheDocument();
        
        // 1. Find the specific row that contains your target guide's name
        const prevButton = screen.getByRole('button', { name: /❮/i });
        
        fireEvent.click(prevButton);

        // 1. Find the specific row that contains your target guide's name
        const nextButton = screen.getByRole('button', { name: /❯/i });
        
        fireEvent.click(nextButton);
    }); 

    it('show error message while the form is being submitted.', async () => {
        const store = createMockStore();
                
        // const dispatchSpy = jest.spyOn(mockStore, 'dispatch');
        //Render the song in the search results
        render( 
                <ThemeProvider theme={Theme}>
                    <Provider store={store}>
                        <HelmetProvider>
                            <MemoryRouter>
                                <Guides/>
                            </MemoryRouter>
                        </HelmetProvider>
                    </Provider>
                </ThemeProvider>);

        // const guideNr = screen.getByRole('link', {name:`${mockRes.guide.guideNr}`});
        // expect(guideNr).toBeInTheDocument();
        
        // 1. Target the form element by its accessible role/name
        const form = screen.getByRole('form', { name: /Guide Form/i });

        const button = within(form).getByRole('button', {name:/Enviar/i}); //Get button to add song to the library
        
        fireEvent.click(button);

        // 1. Target the form element by its accessible role/name
        const guideError = screen.getByRole('status', { name: /Guide Nr Error/i });
        expect(within(guideError).getByText('The field can\'t be empty.')).toBeInTheDocument();
    });

    it('should validate updateGuideStatus function', async () => {    
        // Define global state which will be read by useSelector
        let newGuide ={ guideNr: '1', source: 'Puebla', destination: 'Durango', addressee: 'Privada', creationDate: '8/10/2026', status: '0' };

        let nextState = guideReducer(initialState, updateGuideStatus({ guideNr: '1', newStatus: '0' }));

        // Validate if alert is displayed
        expect(nextState.guides).toHaveLength(1);
        expect(nextState.guides[0]).toEqual(newGuide);
        
        nextState = guideReducer(initialState, updateGuideStatus({ guideNr: '1111', newStatus: '1' }));
        expect(nextState.errors.statusError).toBe('Guide not found');
        
        nextState = guideReducer(initialState, updateGuideStatus({ guideNr: '1', newStatus: '1' }));
        newGuide.status = '1';
        expect(nextState.guides[0]).toEqual(newGuide);
        
        nextState = guideReducer(initialState, updateGuideStatus({ guideNr: '1', newStatus: '2' }));
        newGuide.status = '2';
        expect(nextState.guides[0]).toEqual(newGuide);

        nextState = guideReducer(initialState, updateGuideStatus({ guideNr: '1', newStatus: '3' }));
        newGuide.status = '3';
        expect(nextState.guides[0]).toEqual(newGuide);
    });

    it('should validate addGuide function', async () => {
        const store = createMockStore();

        const alertSpy = (jest.spyOn(window, 'alert').mockImplementation(() => {}))
                
        // const dispatchSpy = jest.spyOn(mockStore, 'dispatch');
        //Render the song in the search results
        render( 
            <ThemeProvider theme={Theme}>
                <Provider store={store}>
                    <HelmetProvider>
                        <MemoryRouter>
                            <Guides/>
                        </MemoryRouter>
                    </HelmetProvider>
                </Provider>
            </ThemeProvider>);

        let guideNrInput = screen.getByRole('spinbutton', {name:'Guide Nr Form'}); // Get form guideNr field
        fireEvent.change(guideNrInput, { target: {value: '2'}});

        const sourceInput = screen.getByLabelText('Source Form'); // Get form surce field
        fireEvent.change(sourceInput, { target: {value: 'Puebla'}});

        const destinationInput = screen.getByLabelText('Destination Form'); // Get form destination field
        fireEvent.change(destinationInput, { target: {value: 'Durango'}});

        const addresseeInput = screen.getByLabelText('Addressee Form'); // Get form addressee field
        fireEvent.change(addresseeInput, { target: {value: 'Jose Perez'}});

        const creationDateInput = screen.getByLabelText('Creation Date Form'); // Get form creation Date field
        fireEvent.change(creationDateInput, { target: {value: '2026-08-10'}});

        let statusInput = screen.getByLabelText('StatusForm'); // Get form status field
        fireEvent.change(statusInput, { target: {value: '0'}});

        // 1. Target the form element by its accessible role/name
        const form = screen.getByRole('form', { name: /Guide Form/i });

        const button = within(form).getByRole('button', {name:/Enviar/i}); //Get button to add guide to the library
        fireEvent.click(button);
        
        fireEvent.change(guideNrInput, { target: {value: '3'}});
        fireEvent.change(sourceInput, { target: {value: 'Puebla'}});
        fireEvent.change(destinationInput, { target: {value: 'Durango'}});
        fireEvent.change(addresseeInput, { target: {value: 'Jose Perez'}});
         fireEvent.change(creationDateInput, { target: {value: '2026-08-10'}});
        fireEvent.change(statusInput, { target: {value: '1'}});
        fireEvent.click(button);
        expect(alertSpy).toHaveBeenCalledWith('¡La guía se ha agregado correctamente!');

        fireEvent.change(guideNrInput, { target: {value: '4'}});
        fireEvent.change(sourceInput, { target: {value: 'Puebla'}});
        fireEvent.change(destinationInput, { target: {value: 'Durango'}});
        fireEvent.change(addresseeInput, { target: {value: 'Jose Perez'}});
         fireEvent.change(creationDateInput, { target: {value: '2026-08-10'}});
        fireEvent.change(statusInput, { target: {value: '2'}});
        fireEvent.click(button);

        fireEvent.change(guideNrInput, { target: {value: '5'}});
        fireEvent.change(sourceInput, { target: {value: 'Puebla'}});
        fireEvent.change(destinationInput, { target: {value: 'Durango'}});
        fireEvent.change(addresseeInput, { target: {value: 'Jose Perez'}});
         fireEvent.change(creationDateInput, { target: {value: '2026-08-10'}});
        fireEvent.change(statusInput, { target: {value: '3'}});
        fireEvent.click(button);        

        // By double clicking, simulate the guide was previously added
        fireEvent.change(guideNrInput, { target: {value: '5'}});
        fireEvent.change(sourceInput, { target: {value: 'Puebla'}});
        fireEvent.change(destinationInput, { target: {value: 'Durango'}});
        fireEvent.change(addresseeInput, { target: {value: 'Jose Perez'}});
         fireEvent.change(creationDateInput, { target: {value: '2026-08-10'}});
        fireEvent.change(statusInput, { target: {value: '3'}});
        fireEvent.click(button);

        fireEvent.change(guideNrInput, { target: {value: '6'}});
        fireEvent.change(sourceInput, { target: {value: 'Puebla'}});
        fireEvent.change(destinationInput, { target: {value: 'Durango'}});
        fireEvent.change(addresseeInput, { target: {value: 'Jose Perez'}});
         fireEvent.change(creationDateInput, { target: {value: '2026-08-10'}});
        fireEvent.change(statusInput, { target: {value: '-1'}});
        fireEvent.click(button);
    });
});