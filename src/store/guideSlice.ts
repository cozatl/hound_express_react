import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ErrorMsg, GuideHistory, GuideItems } from "../interfaces/guideParameters";
import { FAILED, IDLE, SUCCEEDED } from "./status";

interface GuideState {
    guides: GuideItems[],
    history: GuideHistory[],
    status: string,
    errors: ErrorMsg,
}

const initialState: GuideState = {
    guides: [],
    history: [],
    status: IDLE,
    errors: {},
};

// npm install @reduxjs/toolkit
const guideSlice = createSlice({
    name: 'library',
    initialState,
    // This will replace actions and then passed it to reducers
    reducers: {
        addGuide: (state, action) => {
            const newGuide = action.payload;
            const guideErrors: ErrorMsg = {};

            if(!newGuide.guideNr) {
                guideErrors.guideNrError = 'The field can\'t be empty.';
            };
            if(!newGuide.source) {
                guideErrors.sourceError = 'The field can\'t be empty.';
            };
            if(!newGuide.destination) {
                guideErrors.destinationError = 'The field can\'t be empty.';
            };
            if(!newGuide.addressee) {
                guideErrors.addresseeError = 'The field can\'t be empty.';
            };
            if(!newGuide.creationDate) {
                guideErrors.creationDateError = 'The field can\'t be empty.';
            };
            if(!newGuide.status || newGuide.status < 0) {
                guideErrors.statusError = 'The field can\'t be empty.';
            };
            const exists = state.guides.some(
                guide => guide.guideNr === action.payload.guideNr
            );
            if(exists){
                console.log('Guide was previously added!');
                guideErrors.guideNrError = 'Guide was previously added!';
                
            };
            if(Object.keys(guideErrors).length > 0) {
                state.errors = guideErrors;
                state.status = FAILED;
                return;
            };
            // Create new guide and send it to local storage
            state.guides.push(action.payload);

            let currentStatus = '';
            switch(newGuide.status) {
                case '0': 
                    currentStatus = 'Not Delivered';
                    break;
                case '1': 
                    currentStatus = 'Guide is pending to be sent.';
                    break;
                case '2': 
                    currentStatus = 'Guide has been sent, please keep tracking it.';
                    break;
                case '3': 
                    currentStatus = 'Guide was delivered successfully.';
                    break;
            };
            // Store new guide status in history state
            state.history.push({
                guideNr: newGuide.guideNr,
                status: currentStatus,
                creationDate: new Date().toISOString(),
            });
            state.errors = {};
            state.status = SUCCEEDED;            
        },
        updateGuideStatus: (
            state,
            action: PayloadAction<{
                guideNr: string | null;
                newStatus: string | null;
            }>
        ) => {
            const { guideNr, newStatus } = action.payload;

            const guide = state.guides.find(
                guide => guide.guideNr === guideNr
            );

            if(!guide) {
                state.errors.statusError = 'Guide not found';
                return;
            }
            let currentStatus = '';

            // Update guide status
            guide.status = newStatus;
            switch(newStatus) {
                case '0': 
                    currentStatus = 'Not Delivered';
                    break;
                case '1': 
                    currentStatus = 'Guide is pending to be sent.';
                    break;
                case '2': 
                    currentStatus = 'Guide has been sent, please keep tracking it.';
                    break;
                case '3': 
                    currentStatus = 'Guide was delivered successfully.';
                    break;
            };

            // Send changes to history
            state.history.push({
                guideNr,
                status: currentStatus,
                creationDate: new Date().toISOString(),
            });
            state.status = SUCCEEDED;
        }
    },
});

// Export actions and reducer
export const { addGuide, updateGuideStatus } = guideSlice.actions;

const { reducer: guideReducer } = guideSlice;
export default guideReducer;