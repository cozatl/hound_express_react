// import { DefaultTheme } from "styled-components/dist/types"; // Not needed for the creation of file styled.d.ts
// Changed name to index.ts instead of index.js (to import DefaultTheme correctly)

const Theme = {
    colors: {
        blackColor:            '#000',
		whiteColor:            '#fff',
		btnHover:              '#ebd3d3',
		btnPlayHover:          '#6fe76f',
		headerColor:           '#ebd3d3',
		avatarColor:           '#ffa500',
		avatarShadow:          '#352f2f',
		btnColor:              '#352f2f',
		btnDisabledColor:      '#444444',
		bgBtnDisabledColor:    '#806868',
		bgBodyColor:           '#1b1b1b',
		bgMainDivColor:        'linear-gradient(rgba(61, 69, 85, 0.938), rgba(31, 30, 44, 0.938),rgba(78, 72, 139, 0.938))',
		bgHeaderColor:         'linear-gradient(rgba(9, 30, 63, 1), rgba(31, 30, 44, 0.938)),rgba(21, 20, 31, 0.938)',
		bgListColor:           'linear-gradient(to bottom, rgb(32, 50, 109), 20%, rgb(33, 32, 39))',
		bgTableColor:          'linear-gradient(to left top,#052029,#91c2d3)',
		bgMenuColor:           '#203d6d'
    },
    fonts: {
        family:					'Montserrat, Helvetica, sans-serif',
		familyFixed:			'Montserrat,Courier New, monospace',
		familyHeading:			'"HelveticaNeue", Helvetica Neue, Helvetica, Arial, sans-serif',
		familyBtn:				'Orbitron,Montserrat, Helvetica, sans-serif',
		weight:					300,
		weightBold:			    600,
		weightExtrabold:		700,
		weightHeading:			800,
		weightHeadingLight:	    600,
		kerning:				'0.0375em',
		kerningHeading:		    '0.175em',
		kerningHeadingAlt:	    '-0.05em'
    },
}

export default Theme;