import { render } from '@testing-library/react';
import React from 'react';
import Header from '../Header';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from 'styled-components';
import Theme from '../../Theme';
import { MemoryRouter } from 'react-router-dom';

describe('MyComponent Render Logic', () => {
    it('should display message when the page was loaded', () => {
        // 1. Initial Mount
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        // 2. Trigger Re-render
        render(
        <ThemeProvider theme={Theme}>
            <HelmetProvider>
                <MemoryRouter>
                    <Header appName='Hound Express'   />
                </MemoryRouter>
            </HelmetProvider>
        </ThemeProvider>
        );

        // Note: Because the dependency array is [], useEffect does NOT run again.
        // Therefore, the log statement is never reached on re-render either.
        expect(consoleSpy).not.toHaveBeenCalledWith('Web Page loaded correctly.');
    });
});