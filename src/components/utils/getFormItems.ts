import React from "react";
import { ErrorMsg, GuideHistory, GuideItems } from "../../interfaces/guideParameters";
import { saveLocalStgHistory } from "./saveToLocalStorage";

const GetFormItems = (form: HTMLFormElement, guides: GuideItems[], setGuides: React.Dispatch<React.SetStateAction<GuideItems[]>>,
                      setHistory: React.Dispatch<React.SetStateAction<GuideHistory[]>>, keyGuides: string, keyHistory: string) => {
    const formData = new FormData(form);

    const newItem: GuideItems = {
        guideNr: formData.get('guideNr') as string,
        source: formData.get('source') as string,
        destination: formData.get('destination') as string,
        addressee: formData.get('addressee') as string,
        creationDate: formData.get('creationDate') as string,
        status: formData.get('status') as string
    }
    const guideErrors: ErrorMsg = {
        guideNrError: '' as string,
        sourceError: '' as string,
        destinationError: '' as string,
        addresseeError: '' as string,
        creationDateError: '' as string,
        statusError: '' as string,
    };
    let error: boolean = false;
    const alreadyExists = guides.some(item => item.guideNr === newItem.guideNr);
    if (!newItem.guideNr) {
        guideErrors.guideNrError = 'The field can\'t be empty.';
        error = true;
    }else if (alreadyExists){
        guideErrors.guideNrError = 'Guide number already exists.';
        error = true;
    };
    if (!newItem.source) {
        guideErrors.sourceError = 'The field can\'t be empty.';
        error = true;
    };
    if (!newItem.destination) {
        guideErrors.destinationError = 'The field can\'t be empty.';
        error = true;
    };
    if (!newItem.addressee) {
        guideErrors.addresseeError = 'The field can\'t be empty.';
        error = true;
    };
    if (!newItem.creationDate) {
        guideErrors.creationDateError = 'The field can\'t be empty.';
        error = true;
    };
    if (!newItem.status || newItem.status === '0') {
        guideErrors.statusError = 'The field can\'t be empty.';
        error = true;
    };
    if (error) return { errors: guideErrors };

    const updatedGuides = [...guides, newItem];
    setGuides(updatedGuides);

    // localStorage.setItem(keyGuides,JSON.stringify(updatedGuides));
    // saveLocalStgHistory(newItem,newItem.status!, setHistory, keyHistory);

    return { errors: null };
}

export default GetFormItems;