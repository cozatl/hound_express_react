import { configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer
} from "redux-persist";
import storage from "redux-persist/lib/storage";     // npm install redux-persist (Correct way to set localStorage up in redux)
import guideReducer from "./guideSlice";

const persistConfig = {
    key:'guides',
    storage,
    whitelist:['guides','history'],
}

// Configure persisted Reducer to set data in localStorage
const persistedReducer = persistReducer(
    persistConfig,
    guideReducer
)

export const store = configureStore ({
    reducer: {
        guides: persistedReducer,
    },

// Skip errors for redux localStorage
middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [
                'persist/PERSIST',
                'persist/REHYDRATE',
                'persist/PAUSE',
                'persist/FLUSH',
                'persist/PURGE',
                'persist/REGISTER',
            ],
        },
    })
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;