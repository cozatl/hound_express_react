import React from "react";
import { StyledMainDiv, StyledWaybillHistSection } from "./styles";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import getImages from "../utils/getImages";
import SEO from "../SEO";
import { useLocation } from "react-router-dom";

declare const require: any;

// const WaybillHistory = ({history}: Props) => {
const WaybillHistory = () => {
    const images:Record<string,string> = getImages((require as any).context('../../assets/img',false,/\.(png|jpe?g|svg)$/)); //Required in production
    //Next lines required only for TESTING
    // const images = typeof require.context === 'function'
    //     ? getImages((require as any).context('../../assets/img',false,/\.(png|jpe?g|svg)$/))
    //     : {};
    // const localStgHistory = 'historicalTable';
    // const saved = JSON.parse(localStorage.getItem(localStgHistory) || '[]');
    const history = useSelector((state:RootState) => state.guides.history);console.log('hist',history);
    const location = useLocation();
    const selectedNr = new URLSearchParams(location.search).get('guide');
    const filteredData = history.filter((item: any) =>
    item.guideNr === selectedNr);console.log(filteredData)
    return (
        <StyledMainDiv className="main__section">
            <SEO
                title="Hound Express deliveries"  // Title for web and social networks
                description="Add new guides and review the status." // Description for web and social networks
                keywords="guide, delivery" // Set specific keyworkds rules
                image= {images['logo.png']} // Image for Open Graph and social networks
                robots="noindex, nofollow"  // Set specific robots rules
                lang='es'
            />
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