import React, {useState} from "react";
import { StyledDivBanner, StyledDivErrorMsg, StyledImgSlides, StyledMainDiv, StyledSectionStatus, StyledSectionWaybill, StyledSectionWaybillList } from "./styles";
import { StyledButton, StyledInputSelect, StyledInputSpan } from "../UI/styles";
import getImages from "../utils/getImages";
import { PlusDivs, SlideImages } from "../utils/slideImages";
import { useFetchLocalStgGuides, useFetchLocalStgHistory } from "../Hooks/useFetchLocalStorage";
import getFormItems from "../utils/getFormItems";
import { ErrorMsg, GuideItems, StatusOrder } from "../../interfaces/guideParameters";
import { handleGuideStatus } from "../utils/handleGuideStatus";
import { saveLocalStgHistory } from "../utils/saveToLocalStorage";
import { Link } from "react-router-dom";
const Guides = () => {
    const images:Record<string,string> = getImages((require as any).context('../../assets/img',false,/\.(png|jpe?g|svg)$/));
    
    const localStgGuides = 'guidesTable';
    const localStgHistory = 'historicalTable';
    const { guides, setGuides} = useFetchLocalStgGuides(localStgGuides);//console.log(guides);
    const { history, setHistory} = useFetchLocalStgHistory(localStgHistory);
    const guideErrors: ErrorMsg = {
        guideNrError: '' as string,
        sourceError: '' as string,
        destinationError: '' as string,
        addresseeError: '' as string,
        creationDateError: '' as string,
        statusError: '' as string,
    };
    const[errorMessage, setErrorMessage] = useState<ErrorMsg>(guideErrors);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const result = getFormItems(e.currentTarget, guides, setGuides, setHistory, localStgGuides, localStgHistory);

        if (result.errors) {
            // console.log(result.errors);
            setErrorMessage(result.errors);
        } else {
            e.currentTarget.reset();
            // console.log(guideErrors);
            setErrorMessage(guideErrors);
        }
    };

    const statusOrder: StatusOrder = {
        '0': 0, //Status envio
        '1': 1, //Pendiente
        '2': 2, //En transito
        '3': 3  //Entregado
    };

    const handleSetGuides = (guide: GuideItems) => {
        const selectElement = document.getElementById(`select-${guide.guideNr}`) as HTMLSelectElement;
        const selectedValue = selectElement.value;

        const result = handleGuideStatus(guide.guideNr, selectedValue, setGuides, localStgGuides);//console.log(result)
        if(result.success && result.updatedList){
            saveLocalStgHistory(guide,selectedValue, setHistory, localStgHistory);//console.log(history);
        };
    };
    var slideIndex = 1;
    SlideImages(slideIndex);
    //console.log(guides);
    const counts = guides.reduce<Record<string,number>>((acc, guide) => {
        acc[guide.status!] = (acc[guide.status!] || 0) +1;
        return acc;
    }, {} as Record<string,number>);//console.log(counts);
    return (
        <StyledMainDiv>          
            <StyledDivBanner>
                <h1>Hound Express</h1>
                <h2>Para entregas rápidas, tu mejor aliado</h2>
                <StyledImgSlides className="slides" src={images['plane.jpg']}/>
                <StyledImgSlides className="slides" src={images['andreas.jpg']}/>
                <StyledImgSlides className="slides" src={images['everest.jpg']}/>
              
                <StyledButton id="slideMinus" onClick={() =>PlusDivs(-1)}>&#10094;</StyledButton>
                <StyledButton id="slidePlus" onClick={() =>PlusDivs(+1)}>&#10095;</StyledButton>
            </StyledDivBanner>
            {/* <!-- Waybill insert section --> */}
            <StyledSectionWaybill id="waybill">
                <form id="newGuide" onSubmit={handleSubmit}> {/*<!-- Form creation --> */}
                    <fieldset> {/*<!-- First organized section --> */}
                        <legend><b>Informacio&#769;n del envi&#769;o</b></legend>
                        <div>
                            <label htmlFor="guideNr">Nu&#769;mero de gui&#769;a:</label>
                            <StyledInputSpan>
                                <input type="number" id="guideNr" name="guideNr" 
                                placeholder="Nu&#769;mero de gui&#769;a"
                                title="Nu&#769;mero de gui&#769;a"/>
                            <StyledDivErrorMsg id="guideError">{errorMessage.guideNrError ? errorMessage.guideNrError:''}</StyledDivErrorMsg>
                            <span></span></StyledInputSpan>
                        </div>
                        <div>
                            <label htmlFor="source">Origen: </label>
                            <StyledInputSpan>
                                <input type="text" id="source" name="source" placeholder="Origen"
                                title="Origen"/>
                                <StyledDivErrorMsg id="sourceError">{errorMessage.sourceError ? errorMessage.sourceError:''}</StyledDivErrorMsg>
                            <span></span></StyledInputSpan>
                        </div>
                        <div>
                            <label htmlFor="destination">Destino: </label>
                            <StyledInputSpan>
                                <input type="text" id="destination" name="destination" placeholder="Destino"
                                title="Destino"/>
                                <StyledDivErrorMsg id="destError">{errorMessage.destinationError ? errorMessage.destinationError:''}</StyledDivErrorMsg>
                            <span></span></StyledInputSpan>
                        </div>
                        <div>                        
                            <label htmlFor="addressee">Destinatario: </label>
                            <StyledInputSpan>
                                <input type="text" id="addressee" name="addressee" placeholder="Destinatario"
                                title="Destinatario"/>
                                <StyledDivErrorMsg id="addresseeError">{errorMessage.addresseeError ? errorMessage.addresseeError:''}</StyledDivErrorMsg>
                            <span></span></StyledInputSpan>
                        </div>
                        <div>
                            <label htmlFor="creation-date">Fecha de creacio&#769;n: </label>
                            <StyledInputSpan>
                                <input type="date" id="creationDate" name="creationDate" placeholder="Fecha de creacio&#769;n"
                                title="Fecha de creacio&#769;n"/>
                                <StyledDivErrorMsg id="cDateError">{errorMessage.creationDateError ? errorMessage.creationDateError:''}</StyledDivErrorMsg>
                            <span></span></StyledInputSpan>
                        </div>
                        <label>Estado del servicio</label>
                        <StyledInputSelect name="status" id="newStatus">
                            <option value="0">-- Status Envi&#769;o --</option>
                            <option value="1">Pendiente</option>
                            <option value="2">En tra&#769;nsito</option>
                            <option value="3">Entregado</option>
                        </StyledInputSelect>
                        <StyledDivErrorMsg id="statusError">{errorMessage.statusError ? errorMessage.statusError:''}</StyledDivErrorMsg>
                    </fieldset>
                    <StyledButton id="addRecord">Enviar</StyledButton>
                </form>
            </StyledSectionWaybill>
            <hr></hr>
            {/* <!-- Waybill status section --> */}
            <StyledSectionStatus id="status">
                <table id="statusList">
                    <caption><b></b>Estado general de gui&#769;as</caption>
                        <thead>
                            <tr>
                                <th>Gui&#769;as activas</th>
                                <th>Gui&#769;as en tra&#769;nsito</th>
                                <th>Gui&#769;as entregadas</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{counts['1'] ? counts['1'] : 0}</td>
                                <td>{counts['2'] ? counts['2'] : 0}</td>
                                <td>{counts['3'] ? counts['3'] : 0}</td>
                            </tr>
                        </tbody>
                </table>
            </StyledSectionStatus>
            {/* <!-- Waybill table section --> */}
            <StyledSectionWaybillList id="waybillList">
                <h2>Lista de gui&#769;as</h2>
                <form> {/* <!-- Form creation --> */}
                    <fieldset> {/* <!-- First organized section --> */}
                        <div>
                            <label htmlFor="totalGuideNr">Gui&#769;a:</label>
                            <StyledInputSpan>
                                <input type="number" id="totalGuideNr" name="totalGuideNr" 
                                required placeholder="Nu&#769;mero de gui&#769;a"
                            title="Nu&#769;mero de gui&#769;a"/>
                            <span></span></StyledInputSpan>
                        </div>
                        <StyledButton id="searchGuide">Buscar</StyledButton>
                    </fieldset>
                </form>                
                <table id="guideList">
                        <thead>
                            <tr>
                                <th>Nu&#769;mero de Gui&#769;a</th>
                                <th>Origen</th>
                                <th>Destino</th>
                                <th>Destinatario</th>
                                <th>Fecha de creacio&#769;n</th>
                                <th>Estado Actual</th>
                                <th>Actualizar estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                guides.map(guide => {
                                    return (
                                        <tr key={guide.guideNr}>
                                            <td key={guide.guideNr}><Link to={`/waybill-history?guide=${guide.guideNr}`}>{guide.guideNr}</Link></td>
                                            <td className="text">{guide.source}</td>
                                            <td className="text">{guide.destination}</td>
                                            <td className="text">{guide.addressee}</td>
                                            <td className="text">{guide.creationDate}</td>
                                            <td><select id={`select-${guide.guideNr}`} className="input" defaultValue={guide.status || '0'}>
                                                <option value="0" disabled={statusOrder[guide.status as keyof typeof statusOrder]>0} >-- Status envio --</option>
                                                <option value="1" disabled={statusOrder[guide.status as keyof typeof statusOrder]>1} >Pendiente</option>
                                                <option value="2" disabled={statusOrder[guide.status as keyof typeof statusOrder]>2} >En transito</option>
                                                <option value="3" >Entregado</option>
                                            </select></td>
                                            <td><StyledButton onClick={() => handleSetGuides(guide)}
                                            disabled={guide.status === '3'}>Enviar</StyledButton></td>                                        
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                </table>
            </StyledSectionWaybillList>            
        </StyledMainDiv>
    )
}
export default Guides;