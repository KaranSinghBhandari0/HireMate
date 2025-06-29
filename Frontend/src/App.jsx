import { useContext, useEffect } from 'react';
import AllRoutes from './routes/AllRoutes';
import { Toaster } from 'react-hot-toast';
import {AuthContext} from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './utils/ScrollToTop';
import Loader from './components/common/Loader';

export default function App() {
    const { user, checkingAuth, checkAuth } = useContext(AuthContext);

    useEffect(() => {
        checkAuth();
    }, [])

    if(checkingAuth) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader />
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <ScrollToTop />

            <AllRoutes user={user} />

            <Footer />
            <Toaster />
        </>
    )
}
