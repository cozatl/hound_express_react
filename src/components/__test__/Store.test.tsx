import store from "../../store/store";

describe('Redux store', () => {
    it('should initialized the store correctly', async () => {    
        const state = store.getState();

        expect(state).toBeDefined();
        expect(state.guides).toBeDefined();
    });

    it('should execute middleware configuration by ignoring redux-persist actions', async () => {
        store.dispatch({ type: 'persiste/PERSIST' });
        const state = store.getState();

        expect(state).toBeDefined();
    });
});