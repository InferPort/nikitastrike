import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AppLayout } from './components/AppLayout';
import Home from './pages/Home';
import RoomieDemo from './pages/RoomieDemo';

const App: React.FC = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        document.documentElement.classList.add('dark');
        // Scroll to top on route change
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <AppLayout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/roomie" element={<RoomieDemo />} />
            </Routes>
        </AppLayout>
    );
};

export default App;

