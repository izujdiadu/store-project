import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import Navbar from './comp/Navbar.jsx';
import {Box} from "@chakra-ui/react";
import {useColorModeValue} from "@/components/ui/color-mode.jsx";

const App = () => {
    return (
        <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
            <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/create" element={<CreatePage />} />
                </Routes>
        </Box>
    );
}

export default App;
