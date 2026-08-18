import styled from "styled-components";
import { Grid } from "./Theme/mixins"

const StyledMain = styled.main`
    ${Grid()};
    text-align: center;
    grid-template-rows: auto auto auto auto auto;
    grid-template-areas:
    'banner'
    'waybill'
    'status'
    'waybill-list'
    'waybill-history'
    'footer';
`;

export {
    StyledMain,
};