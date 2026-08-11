import React from "react";
import { StyledDivBanner, StyledDivErrorMsg, StyledImgSlides, StyledMainDiv, StyledSectionStatus, StyledSectionWaybill, StyledSectionWaybillList } from "./styles";
import { StyledButton, StyledInputSelect, StyledInputSpan } from "../UI/styles";
import getImages from "../utils/getImages";
import { PlusDivs } from "../utils/slideImages";
import { GuideItems, StatusOrder } from "../../interfaces/guideParameters";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { addGuide, updateGuideStatus } from "../../store/guideSlice";

declare const require: any;

const Guides = () => {
    //const images:Record<string,string> = getImages((require as any).context('../../assets/img',false,/\.(png|jpe?g|svg)$/)); //Required in production
    //Next lines required only for TESTING
    const images = typeof require.context === 'function'
        ? getImages((require as any).context('../../assets/img',false,/\.(png|jpe?g|svg)$/))
        : {};
    
    // Create dispatch to work with the store
    const dispatch = useDispatch<AppDispatch>();

    // Get data from store
    const guides = useSelector((state:RootState) => state.guides.guides);//console.log(guides);
    const guideErrors = useSelector((state:RootState) => state.guides.errors);//console.log(guideErrors)
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const newItem: GuideItems = {
                guideNr: formData.get('guideNr') as string,
                source: formData.get('source') as string,
                destination: formData.get('destination') as string,
                addressee: formData.get('addressee') as string,
                creationDate: formData.get('creationDate') as string,
                status: formData.get('status') as string
            }

        dispatch(addGuide(newItem));
        
    };
    // console.log(guides)
    const statusOrder: StatusOrder = {
        '0': 0, //Status envio
        '1': 1, //Pendiente
        '2': 2, //En transito
        '3': 3  //Entregado
    };

    const handleSetGuides = (guide: GuideItems) => {
        const selectElement = document.getElementById(`select-${guide.guideNr}`) as HTMLSelectElement;
        const selectedValue = selectElement.value;console.log(selectedValue)

        // Update guide status from table button
        dispatch(updateGuideStatus({guideNr: guide.guideNr, newStatus: selectedValue}));
        
    };
    
    const counts = guides.reduce<Record<string,number>>((acc, guide) => {
        acc[guide.status!] = (acc[guide.status!] || 0) +1;
        return acc;
    }, {} as Record<string,number>);//console.log(counts);
    return (
        <StyledMainDiv>          
            <StyledDivBanner>
                <h1>Hound Express</h1>
                <h2>Para entregas rápidas, tu mejor aliado</h2>
                <StyledImgSlides className="slides" src={images['plane.jpg']} style={{display: 'block'}}/>
                <StyledImgSlides className="slides" src={images['andreas.jpg']} style={{display: 'none'}}/>
                <StyledImgSlides className="slides" src={images['everest.jpg']} style={{display: 'none'}}/>
              
                <StyledButton id="slideMinus" onClick={() =>PlusDivs(-1)}>&#10094;</StyledButton>
                <StyledButton id="slidePlus" onClick={() =>PlusDivs(+1)}>&#10095;</StyledButton>
            </StyledDivBanner>
            {/* <!-- Waybill insert section --> */}
            <StyledSectionWaybill id="waybill">
                <form id="newGuide" aria-label="Guide Form" onSubmit={handleSubmit}> {/*<!-- Form creation --> */}
                    <fieldset> {/*<!-- First organized section --> */}
                        <legend><b>Informacio&#769;n del envi&#769;o</b></legend>
                        <div>
                            <label htmlFor="guideNr">Nu&#769;mero de gui&#769;a:</label>
                            <StyledInputSpan>
                                <input type="number" id="guideNr" name="guideNr" 
                                placeholder="Nu&#769;mero de gui&#769;a"
                                title="Nu&#769;mero de gui&#769;a"
                                aria-label="GuideNrForm"/>
                            <StyledDivErrorMsg
                                aria-label="GuideNrError"
                                id="guideError"
                                role="status">{guideErrors.guideNrError ? guideErrors.guideNrError:''}</StyledDivErrorMsg>
                            <span></span></StyledInputSpan>
                        </div>
                        <div>
                            <label htmlFor="source">Origen: </label>
                            <StyledInputSpan>
                                <input type="text" id="source" name="source"
                                placeholder="Origen"
                                title="Origen"
                                aria-label="SourceForm"/>
                                <StyledDivErrorMsg id="sourceError">{guideErrors.sourceError ? guideErrors.sourceError:''}</StyledDivErrorMsg>
                            <span></span></StyledInputSpan>
                        </div>
                        <div>
                            <label htmlFor="destination">Destino: </label>
                            <StyledInputSpan>
                                <input type="text" id="destination" name="destination"
                                placeholder="Destino"
                                title="Destino"
                                aria-label="DestinationForm"/>
                                <StyledDivErrorMsg id="destError">{guideErrors.destinationError ? guideErrors.destinationError:''}</StyledDivErrorMsg>
                            <span></span></StyledInputSpan>
                        </div>
                        <div>                        
                            <label htmlFor="addressee">Destinatario: </label>
                            <StyledInputSpan>
                                <input type="text" id="addressee" name="addressee"
                                placeholder="Destinatario"
                                title="Destinatario"
                                aria-label="AddresseeForm"/>
                                <StyledDivErrorMsg id="addresseeError">{guideErrors.addresseeError ? guideErrors.addresseeError:''}</StyledDivErrorMsg>
                            <span></span></StyledInputSpan>
                        </div>
                        <div>
                            <label htmlFor="creation-date">Fecha de creacio&#769;n: </label>
                            <StyledInputSpan>
                                <input type="date" id="creationDate" name="creationDate"
                                placeholder="Fecha de creacio&#769;n"
                                title="Fecha de creacio&#769;n"
                                aria-label="CreationDateForm"/>
                                <StyledDivErrorMsg id="cDateError">{guideErrors.creationDateError ? guideErrors.creationDateError:''}</StyledDivErrorMsg>
                            <span></span></StyledInputSpan>
                        </div>
                        <label>Estado del servicio</label>
                        <StyledInputSelect name="status" id="newStatus"
                            aria-label="StatusForm">
                            <option value="0">-- Status Envi&#769;o --</option>
                            <option value="1">Pendiente</option>
                            <option value="2">En tra&#769;nsito</option>
                            <option value="3">Entregado</option>
                        </StyledInputSelect>
                        <StyledDivErrorMsg id="statusError">{guideErrors.statusError ? guideErrors.statusError:''}</StyledDivErrorMsg>
                    </fieldset>
                    <StyledButton id="addRecord" name='addRecord'>Enviar</StyledButton>
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