/* main */
body {
    margin: 0px;
    background-color: gray;
    color: white;
}
.page-container {
    display: flex;
}
* {
    box-sizing: border-box;
}
/* ------------------------------------------ */

/* dashboard ---------------------------- */
.dashboard {
    display: flex;
    flex-direction: column;

    background-color: lightskyblue;
    padding: 1.5%;
    min-height: 100vh;
    width: 20%;
}
.dashboard > * {
    display: flex;
    flex-direction: column;

    margin-bottom: 20%;
}
.dashboard > * > * {
    all: initial;
    padding: 7%;
    color: white;
    font-weight: bold;
    font-size: 1.5em;
}
.dashboard > * > *:not(.dashboard-logo)::before {
    background-image: url("./images/alert.svg");
    float: left;
    content: "";
    border: 1px solid black;

    background-repeat: no-repeat;
    background-size: 30px;
    border: 1px solid black;
    background-position: center;
    width: 13%;
    height: 100%;
}
.dashboard-logo::before {
    content: "";
    background-image: url("./images/home.svg");

    float: left;
    width: 20%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 50px;
}
.dashboard > * > *:not(.dashboard-logo)::before,
.dashboard-logo::before {
    margin-right: 10px;
}
.dashboard > * > *:hover {
    cursor: pointer;
}
.dashboard > * > *:hover {
    background-color: lightblue;
}
.dashboard-logo {
    font-size: 2em;
}

/* ------------------------------------ */
// --------------------------------------------------------------------------
import React, {
    useState,
    useEffect,
    useReducer,
    useRef,
    useCallback,
    useMemo,
    createContext,
    useContext,
} from "react";
import "./App.css";
import useDebugInformation from "./tink/useDebugInformation";

export default function App(): JSX.Element {
    return (
        <div>
            {/* <h1>uhhhhhhhhhhh</h1>
            <hr /> */}
            {/* <Testing /> */}
            <MyReactFC />
        </div>
    );
}

export function MyReactFC(): JSX.Element {
    return (
        <div className="page-container">
            <div className="dashboard">
                <div>
                    <button className="dashboard-logo">Dashboard</button>
                </div>

                <div>
                    <button>Profile</button>
                    <button>Messages</button>
                    <button>History</button>
                    <button>Tasks</button>
                    <button>Communities</button>
                </div>

                <div>
                    <button>Settings</button>
                    <button>Support</button>
                    <button>Privacy</button>
                </div>
            </div>

            <div className="main-content">
                <header>
                    <input type="text" />
                    <button>Bell</button>
                    <button>Logo</button>
                </header>
                <div></div>
            </div>
        </div>
    );
}

function Testing(): JSX.Element {
    // const [state, dispatch] = useReducer(testred, {
    //     some: "stuf",
    //     other: 1,
    // });

    const [foo, setFoo] = useState(0);

    return <div></div>;
}
function testred(state: any, { type, payload }: any) {
    switch (type) {
        case "a":
            return { ...state, some: payload.updated };
    }
}
