import React, { useState } from "react";
import { ShoppingStoreMainPage } from "./components/shopping_page/ShoppingStoreMainPage";


export default function App(): JSX.Element {
    return (
        <div className="main">
            {/* <h1>uhhhhhhhhhhh</h1>
            <hr /> */}
            {/* <Testing /> */}
            
            <ShoppingStoreMainPage />
        </div>
    );
}

function Testing(): JSX.Element {
    // const [state, cartDispatch] = useReducer(testred, {
    //     some: "stuf",
    //     other: 1,
    // });

    const [foo, setFoo] = useState(0);

    return (
        <div>
            <div>asd</div>
        </div>
    );
}

function testred(state: any, { type, payload }: any) {
    switch (type) {
        case "a":
            return { ...state, some: payload.updated };
    }
}
