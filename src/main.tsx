import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

createRoot(document.getElementById("root")!).render(
    <TonConnectUIProvider manifestUrl="https://ho3einwave.github.io/ton-smartcontract-frontend/manifest.json">
        <App />
    </TonConnectUIProvider>
);
