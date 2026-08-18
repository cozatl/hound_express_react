import React from 'react';
import { render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom';
import { HelmetProvider } from 'react-helmet-async';
import SEO, { getOgLocale } from '../SEO';

describe('Guides component', () => {
    it('should test language in SEO component', async () => {

        expect(getOgLocale('fr-FR')).toBe('fr_FR');
        expect(getOgLocale('es-MX')).toBe('es_MX');

        expect(getOgLocale('en')).toBe('en_US');
        expect(getOgLocale('ja')).toBe('ja_JP');
        expect(getOgLocale('zh')).toBe('zh_CN');
        expect(getOgLocale('ko')).toBe('ko_KR');        
    });

    it('should render SEO options', async () => {
        //Render the song in the search results
        render( 
            <HelmetProvider>
                <SEO
                    title='Main Page'
                    description='Description for Main Page'
                    type='article'
                    lang='fr-FR'
                    image='../../assets/img/logo.png'
                    robots = 'index, follow'
                />
            </HelmetProvider>
        );

        await waitFor (() => {        
            // eslint-disable-next-line testing-library/no-node-access
            const metaOgLocale = document.head.querySelector('meta[property="og:locale"]');

            expect(metaOgLocale).toHaveAttribute('content', 'fr_FR');
        });
        await waitFor (() => {        
            // eslint-disable-next-line testing-library/no-node-access
            const metaRobots = document.head.querySelector('meta[name="robots"]');

            expect(metaRobots).toHaveAttribute('content', 'index, follow');
        });
    }); 
});