import { styled, css } from "styled-components";
import { BoxSizing, BreakPoint1, BreakPoint2, BreakPoint3 } from "../../Theme/mixins";

const StyledMainDiv = styled.div`
    width: 90%;
    min-height: 80vh;
    background: ${props => props.theme.colors.bgMainDivColor};
    justify-self: center;
    ${BoxSizing()};
    box-shadow: 0px 5px 19px 4px rgba(235, 205, 205, 0.726);
    border-radius: 30px;
`;

const StyledWaybillHistSection = styled.section`
    grid-area: waybill-history;
    display: grid;
    margin-bottom: 50px;
    margin-top: 10px;
    table{
            ${BreakPoint2(css`
                background: linear-gradient(to left top,#052029,#91c2d3);
                padding: 2px 2px;
                border: 2px inset #7ab1d6dc;        
                width: 80%;
                text-align: justify;
                margin: auto;
                color: #023a4d;
                overflow:auto;
            `)};
            ${BreakPoint1(css`
                background: linear-gradient(to left top,#052029,#91c2d3);
                padding: 2px 2px;
                border: 2px inset #7ab1d6dc;
                height: 40px;
                text-align: justify;
                margin: auto;
                width: 80%;
                color: #023a4d;
                /* Set all table size for the columns */
                display: inline-table;
            `)};
            thead, caption{
                height: 40px;
                color: #023a4d;
            }
            caption {
                color: #158cb4;
                text-align: justify;
            }
            th {
                &:nth-child(1) {
                    width: 150px;
                }
                &:nth-child(2) {
                    width: 150px;
                }
            }
            tbody{
                background: linear-gradient(to left top,#07607e,#91c2d3);    
                padding: 50px;
            }
            td {
                ${BreakPoint3(css`
                    padding: 10px;
                `)};
            }
        }
`;

export {
    StyledMainDiv,
    StyledWaybillHistSection,
}