import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Authorized } from "./Authorized"
import { Login } from "../pages/Login.jsx"
import Map from "../pages/Map"
import { Register } from '../pages/Register.jsx'
import { Instructions } from "./Instructions.jsx"
import { Shop } from "./Shop.jsx"
import { EndResult } from "./EndResult.jsx"


export const ApplicationViews = () => {

    let authToken = `Token ${JSON.parse(localStorage.getItem("game_token"))}`

    return <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/" element={<Map />} />
                <Route path="/instructions" element={<Instructions authToken={authToken}/>} />
                <Route path="/shop">
                    <Route path=":cityId" element={<Shop authToken={authToken}/>}/>
                </Route>
                <Route path="/end" element={<EndResult authToken={authToken}/>} />
            </Route>
        </Routes>
    </BrowserRouter>
}