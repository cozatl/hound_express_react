import React from "react";
import { StyledMainDiv, StyledWaybillHistSection } from "./styles";
import { GuideHistory as GuideHistoryType } from "../../interfaces/guideParameters";

interface Props {
    history: GuideHistoryType[];
}

const WaybillHistory = ({history}: Props) => {
    const localStgHistory = 'historicalTable';
    const saved = JSON.parse(localStorage.getItem(localStgHistory) || '[]');
    const selectedNr = new URLSearchParams(window.location.search).get('guide');
    const filteredData = saved.filter((item: any) =>
    item.guideNr === selectedNr);
    return (
        <StyledMainDiv className="main__section">
            <div>
                <StyledWaybillHistSection id="waybillHistory" className="waybill__history">
                    <table id="historyList">
                        <caption><b></b>Tracking Record</caption>
                            <thead>
                                <tr>
                                    <th>Guide Number</th>
                                    <th>Update Date</th>
                                    <th>Activity Record</th>
                                </tr>
                            </thead>
                                <tbody>
                                    {filteredData.map((record: any, index: number)=>
                                        <tr key={index}>
                                            <td>{record.creationDate}</td>
                                            <td>{record.guideNr}</td>
                                            <td>{record.status}</td>
                                        </tr>
                                    )}                                    
                                </tbody>
                    </table>
                </StyledWaybillHistSection>
            </div>
        </StyledMainDiv>
    )
};

export default WaybillHistory;