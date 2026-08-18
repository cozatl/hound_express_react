import { styled, css } from "styled-components";
import { BoxSizing, BreakPoint1, BreakPoint2, BreakPoint3, Grid } from "../../Theme/mixins";

const StyledMainDiv = styled.div`
    width: 90%;
    min-height: 80vh;
    background: ${props => props.theme.colors.bgMainDivColor};
    justify-self: center;
    ${BoxSizing()};
    box-shadow: 0px 5px 19px 4px rgba(235, 205, 205, 0.726);
    border-radius: 30px;
`;

const StyledDivBanner = styled.div`
    width: 100%;
    box-sizing: border-box;
    h1 {
        position: absolute;
        margin: 20px 30px;
        color: rgb(7, 24, 73);
        text-shadow: 2px 4px 2px rgba(73, 70, 70, 0.75);
    }
    h2 {
        position: absolute;
        margin: 80px 30px;
        text-shadow: 2px 4px 2px rgba(73, 70, 70, 0.75);
    }
`;

const StyledImgSlides = styled.img`
    width: 100%;
    height: 300px;
    object-fit: cover;    /* Get full image size but considering container size */
    object-position: 80% 30%; /* Move img x-y position */
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
`;

const StyledSectionWaybill = styled.section`
    grid-area: waybill;
    padding: 30px 0;
    text-align: left;
    justify-items: center;
    form {
        width: 60%;
        color: rgb(189, 186, 186);
        /* .waybill__error__msg {
            color: red;background-color: rgb(218, 105, 0);
            font-size: 0.9em;
            margin-top: 5px;
    } */
    /* .invalid {
        border: 1px solid red;
    } */
    }
    fieldset {
        border-width: 2px;border-style: groove;padding: 10px;
        color: rgb(189, 186, 186);border-color: threedface;
    }
    label,
    input,select {
        width: 30%;
        display: inline-block;
        /* padding: 10px 0; */
        height: 35px;
        font-size: 20px;
    }
    input, select {
        ${BreakPoint1(css`
            color:#2e3750;
            min-width:17em;
            /* the border gradient */
            border-image: linear-gradient(to right, #3acfd5 0%, #3a4ed5 100%) 1;
        `)};
    }
`;

const StyledDivErrorMsg = styled.div`
    color: rgb(30 2 2);
    background-color: rgb(235 144 59);
    font-size: 0.9em;
    margin-top: 5px;
`;
// const StyledDivErrorMsg = styled.div`
//     color: red;background-color: rgb(218, 105, 0);
//     font-size: 0.9em;
//     margin-top: 5px;
// `;

const StyledSectionStatus = styled.section`
    grid-area: status;
    padding: 30px 0;
    table{
        background: ${props => props.theme.colors.bgTableColor};
        padding: 2px 2px;
        border: 2px inset #7ab1d6dc;
        height: 40px;
        width: 60%;
        text-align: center;
        margin: auto;color: #023a4d;
        thead, caption{
            height: 40px;
            color: #023a4d;
        }
        caption{
            color: #1beabd;
        }
    }
    tbody{
        background: linear-gradient(to left top,#07607e,#91c2d3);    
        padding: 150px;
    }
    td{   
        padding: 15px;
    }    
`;

const StyledSectionWaybillList = styled.section`
    grid-area: waybill-list;
    ${Grid()};
    margin-bottom: 50px;
    table {
        ${BreakPoint2(css`
            background: linear-gradient(to left top,#052029,#91c2d3);
            padding: 2px 2px;
            border: 2px inset #7ab1d6dc;
            
            width: 80%;
            text-align: center;
            margin: auto;
            height: 500px;
            color: #023a4d;
            overflow:auto;
            display: inline-block;
        `)};
        ${BreakPoint1(css`
            background: linear-gradient(to left top,#052029,#91c2d3);
            padding: 2px 2px;
            border: 2px inset #7ab1d6dc;
            height: 40px;
            text-align: center;
            margin: auto;
            width: 80%;
            height: 500px;
            color: #023a4d;
            /* Set scroll by setting specific height/width */
            overflow:auto;
            display: inline-block;
        `)};
        thead, caption{
            height: 40px;
            color: #023a4d;
        }
        button {  
            ${BreakPoint2(css`
                position: relative;
                padding: 4px 7px;
                margin: 8px 2px;
            `)};
            ${BreakPoint1(css`
                position: relative;
                padding: 4px 7px;
                font-size: 12px;
                margin: 8px 2px; 
            `)};
        }
        tbody{
        background: linear-gradient(to left top,#07607e,#91c2d3);    
        padding: 150px;
        }
        td {
            padding: 5px;//font-size: 15px;
            ${BreakPoint3(css`
                padding: 20px;
            `)};
            label {
                /* display: none; */
                color: #0a4058;
            }
            a {
                color: #1b6c8b;
                -webkit-text-stroke: 0.5px #1b6c8b;
            }
            a:hover {
                text-shadow: 
                0 0 5px #324f86,
                0 0 10px #324f86,
                0 0 20px #607db1,
                0 0 40px #607db1;
            }
        }
        tr {
            padding: 35px;//font-size: 15px;
        }
        fieldset {
            text-align: left;
            color: #318caf;
            width: 50%;
            border: none;
            display: contents;
        }
    }
    input,select {
        width: 30%;
        display: inline-block;
        /* padding: 10px 0; */
        height: 35px;
        font-size: 20px;
        min-width: 14em;
        border-radius: 9999em;
        color: #2e3750;
    }
    label, legend {
        color: #1beabd;
    }
    h2{
        color: #1beabd;padding: 10px;
        text-align: left;
    }
    
    div {  
        display: inline-block;
    }
    
`;

export {
    StyledMainDiv,
    StyledDivBanner,
    StyledImgSlides,
    StyledSectionStatus,
    StyledSectionWaybill,
    StyledSectionWaybillList,
    StyledDivErrorMsg,    
};