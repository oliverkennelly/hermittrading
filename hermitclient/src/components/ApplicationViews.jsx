import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Authorized } from "./Authorized"
import { Login } from "../pages/Login.jsx"
import { Register } from '../pages/Register.jsx'
import { Instructions } from "../pages/Instructions.jsx"
import { Shop } from "../pages/Shop.jsx"
import { EndResult } from "../pages/EndResult.jsx"
import { HermitMap } from "../pages/Map.jsx"
import { Restart } from "../pages/Restart.jsx"
import { Profile } from "../pages/Profile.jsx"


export const ApplicationViews = () => {

    let authToken = `Token ${JSON.parse(localStorage.getItem("game_token"))}`

    return <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/" element={<HermitMap authToken={authToken}/>} />
                <Route path="/instructions" element={<Instructions authToken={authToken}/>} />
                <Route path="/restart" element={<Restart authToken={authToken}/>} />
                <Route path="/profile" element={<Profile authToken={authToken}/>} />
                <Route path="/shop">
                    <Route path=":townId" element={<Shop authToken={authToken}/>}/>
                </Route>
                <Route path="/end">
                <Route path=":win" element={<EndResult authToken={authToken}/>}/>
                </Route>
            </Route>
        </Routes>
    </BrowserRouter>
}