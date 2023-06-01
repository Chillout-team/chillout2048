import {
    PreloadedState,
    combineReducers,
    configureStore,
} from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import leaderboardReducer from "./leaderboardSlice";
import { ISignIn, IUserData } from "@/types/types";
import { ApiService } from "@/services/apiService";
/*
export interface IServices {
    user: {
      user(): Promise<IUserData>
      signIn(signInData: ISignIn): Promise<IUserData>
      logout(): Promise<null>
    }
  }
*/
const rootReducer = combineReducers({
    user: userReducer,
    leaderboard: leaderboardReducer,
});

export const createStore = ( service: any, preloadedState?: PreloadedState<RootState>) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
        middleware: getDefaultMiddleWare => {
            return getDefaultMiddleWare({
                thunk: {
                    extraArgument: service,
                },
            })
        },
    });
};
/*
export const store = createStore(
    ApiService(),
    typeof window !== "undefined" ? window.__PRELOADED_STATE__ : undefined,
);
*/
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ReturnType<typeof createStore>['dispatch'];//typeof store.dispatch;
