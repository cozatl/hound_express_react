import { SetStateAction } from "react";
import { GuideHistory, GuideItems } from "../../interfaces/guideParameters";


export const saveLocalStgHistory = (guide: GuideItems, newStatusValue: string, setHistory: React.Dispatch<SetStateAction<GuideHistory[]>>, key: string) => {
    const status: Record<string,string> = {
        '0': 'Not Delivered', //Status envio
        '1': 'Guide is pending to be sent.', //Pendiente
        '2': 'Guide has been sent, please keep tracking it.', //En transito
        '3': 'Guide was delivered successfully.'  //Entregado
    }
    const newEntry:GuideHistory = {
        creationDate: new Date().toLocaleDateString(),
        guideNr: guide.guideNr || 'N/A',
        status: status[newStatusValue] || 'Unknown'
    };
    setHistory(prevHistory => {//console.log('here')
        const safePrev = prevHistory? prevHistory : [];
            const isDuplicate = safePrev.some(item => item.guideNr === guide.guideNr &&
                                              item.status === newEntry.status);
            //console.log(guide.guideNr,newEntry.status)
            if (isDuplicate) return safePrev;
        const updatedHistory = [...safePrev, newEntry];//console.log('save history')
        localStorage.setItem(key, JSON.stringify(updatedHistory));
        return updatedHistory;
    });
};