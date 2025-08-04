import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./router/routes";
import Chatbot from './components/chatboot/chatboot';
import { FaturaProvider } from "./contexts/FaturaContext";

function App() {
  return (
    <BrowserRouter>
      <FaturaProvider>
        <AppRoutes />
        <Chatbot />
      </FaturaProvider>
    </BrowserRouter>
  );
}

export default App;
