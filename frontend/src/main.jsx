import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from "@/components/ui/provider"
import { Toaster } from 'sonner'
import App from './App.jsx'
import Modal from 'react-modal'

// ⚠️ Nécessaire pour l'accessibilité de react-modal
Modal.setAppElement('#root')

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider>
            <BrowserRouter>
                <App />
                <Toaster />
            </BrowserRouter>
        </Provider>
    </StrictMode>,
)
