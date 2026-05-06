import { Outlet, useLocation } from "react-router-dom";
import Header from "./navigation/Header.jsx";
import Footer from "./footer/Footer.jsx";
import { useEffect } from "react";

function Layout() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <>
            <Header />
            <main className="page-content">
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

export default Layout;