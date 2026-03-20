import { createGlobalStyle } from "styled-components";
import reset from "styled-reset"; //installed through npm install styled-reset
import { Fonts } from "./mixins";

// Create file ./src/styled.d.ts for the variables to be recognized in the project

const GlobalStyle = createGlobalStyle`
    ${reset}

    html {
        /* Approximately 1.3rem=16px *** 1.7vw=16px *** 1rem = 16px */
        ${Fonts({weight: 300, minSize: '1rem', prefValue: '1.7vw', maxSize: '1rem'})}
        font-family: ${props => props.theme.fonts.family};
    }

    html, body {
        background-color: #000;
        color: #fff;
        scrollbar-color: hsla(0, 0%, 100%, 0.3) transparent;
        scrollbar-width: 16px;
        height: 100%;
    }
    body {
        font-family: ${props => props.theme.fonts.family};
        margin: 0;
    }

    h1 {
        /* Approximately 2.6=41.6px *** 2.3vw=41.5px-32.1px *** 2rem=32px */
        ${Fonts({weight: 600, minSize: '2rem', prefValue: '2.3vw', maxSize: '2.6rem'})}
    }

    h2 {
        /* Approximately 1.3rem=25.6px *** 1.7vw=25.9px-20.9px *** 1rem = 20.8px */
        ${Fonts({weight: 600, minSize: '1.3rem', prefValue: '1.7vw', maxSize: '1.6rem'})}
    }

    h3, table thead, caption, fieldset {
        /* Approximately 1.15rem=18.4px *** 1.7vw=18.3px-17.7px *** 1.1rem = 17.6px */
        ${Fonts({weight: 600, minSize: '1.1rem', prefValue: '1.7vw', maxSize: '1.15rem'})}
    }

    h4, td, ul {
        /* Approximately 1rem = 16px *** 1.7vw=16px *** 1rem = 16px */
        ${Fonts({weight: 500, minSize: '1rem', prefValue: '1.7vw', maxSize: '1rem'})}
    }

    h5 {
        /* Approximately .9rem=14.4px *** 1.7vw=16px *** .9rem=14.4px */
        ${Fonts({weight: 500, minSize: '.9rem', prefValue: '1.7vw', maxSize: '.9rem'})}
    }

    h6 {
        /* Approximately .9rem=14.4px *** 1.7vw=16px *** .9rem=14.4px */
        ${Fonts({weight: 300, minSize: '1rem', prefValue: '1.7vw', maxSize: '1rem'})}
    }

    input {
        font-family: inherit;
        line-height: inherit;
        color: #2e3750;
        min-width: 10em;
        /* the border gradient */
        -o-border-image: linear-gradient(to right, #3acfd5 0%, #3a4ed5 100%) 1;
            border-image: linear-gradient(to right, #3acfd5 0%, #3a4ed5 100%) 1;
    }

    a {
        /* text-decoration: none; */
        color: ${props => props.theme.colors.whiteColor};
    }

    button {
        cursor: pointer;
    }

    footer {
        background-color: ${props => props.theme.colors.blackColor};
    }
`

export default GlobalStyle;