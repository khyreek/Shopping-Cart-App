import { createStore } from "redux";
import { ShoppingStore } from "../assets/types";

export enum REDUCER_ACTIONS {
    for_debugging, // ignore this
    SET_SHOPPING_STORE,
}

const store = createStore(reducer);

// type generics for useSelector
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export interface ReducerState {
    shoppingStore: ShoppingStore;
}

export type ReducerActions =
    | { type: REDUCER_ACTIONS.for_debugging; payload: {} }
    //
    | {
          type: REDUCER_ACTIONS.SET_SHOPPING_STORE;
          payload: { shoppingStore: ShoppingStore };
      };

function reducer(
    state: ReducerState = {
        shoppingStore: {},
    },
    { type, payload }: ReducerActions
): ReducerState {
    switch (type) {
        case REDUCER_ACTIONS.SET_SHOPPING_STORE:
            return { ...state, shoppingStore: payload.shoppingStore };

        default:
            // @ts-ignore: redux will pass in this type on initial render
            if (type.startsWith("@@redux/INIT")) return state;

            throw new Error(
                `default [${type} ${payload}] was not caught in reducer`
            );
    }
}

export default store;
