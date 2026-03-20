import { useEffect, useState } from "react"
import { GuideHistory, GuideItems } from "../../interfaces/guideParameters";

export const useFetchLocalStgGuides = (key: string) => {
    const [guides, setGuides] = useState<GuideItems[]>([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem(key) || '[]');
        setGuides(saved);
    },[key]);
    return { guides, setGuides };
};
export const useFetchLocalStgHistory = (key: string) => {
    const [history, setHistory] = useState<GuideHistory[]>([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem(key) || '[]');
        setHistory(saved);
    },[key]);
    return { history, setHistory };
};

// export {
//     useFetchLocalStgGuides,
//     useSetLocalStgHistory
// }