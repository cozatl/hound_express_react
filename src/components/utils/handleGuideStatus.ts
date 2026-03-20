import { GuideItems } from "../../interfaces/guideParameters";

const handleGuideStatus = (guideNr: string | null, newStatus: string, 
                           setGuides: React.Dispatch<React.SetStateAction<GuideItems[]>>, keyGuides: string) => {
    try {
        //Define variables to get results
        let updatedList: GuideItems[] = [];

        //Update main Guide list
        setGuides(prevGuides => {//console.log('here',prevGuides)
            const updated = prevGuides.map(guide =>
                guide.guideNr === guideNr ? {...guide, status:newStatus}:guide
            );// console.log(updated);
            updatedList = updated;
            localStorage.setItem(keyGuides,JSON.stringify(updatedList));
            return updatedList;
        });
                
        return {
            success: true,
            updatedList,
        };
        
    } catch (error) {
        return {
            success: false,
            updatedList: [] as GuideItems[],
            error
        };
    }
};

export {
    handleGuideStatus
}