import './index.css'; // import css

import HorsesPage from './horses/HorsesPage';


import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById('root'))
root.render(
  <App />
);

function App() {
  return (
    <HorsesPage />
  );
}

