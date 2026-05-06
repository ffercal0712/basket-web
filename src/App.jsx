import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./components/Home.jsx";
import Teams from "./components/teams/Teams.jsx";
import TeamDetail from "./components/teams/TeamDetail.jsx";
import Matches from "./components/matches/Matches.jsx";
import MatchDetail from "./components/matches/MatchDetail.jsx";
import AvisoLegal from "./components/legal/AvisoLegal.jsx";
import Privacidad from "./components/legal/Privacidad.jsx";
import AdminAccess from "./components/admin/AdminAccess.jsx";
import { AdminSessionProvider } from "./context/AdminSessionProvider.jsx";

function App() {
    return (
        <AdminSessionProvider>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/equipos" element={<Teams />} />
                    <Route path="/equipos/:equipo" element={<TeamDetail />} />
                    <Route path="/partidos" element={<Matches />} />
                    <Route path="/partidos/:partido" element={<MatchDetail />} />
                    <Route path="/admin" element={<AdminAccess />} />
                    <Route path="/aviso-legal" element={<AvisoLegal />} />
                    <Route path="/privacidad" element={<Privacidad />} />
                </Route>
            </Routes>
        </AdminSessionProvider>
    );
}

export default App;
