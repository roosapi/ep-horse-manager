

import { useState } from 'react';
import { createRoot } from "react-dom/client";

import './index.css'; // import css

import {AddHorsePage, HorsesPage} from './components/HorsesPage';




const root = createRoot(document.getElementById('root'))
root.render(
  <App />
);

// TODO: change state based on button click 
// and show appropriate page
function App() {
  const [activePage,setActivePage] = useState();
  let use_page;
  if (activePage === "horses") {
    use_page=<HorsesPage />;
   } else if (activePage === "add-horse") {
    use_page=<AddHorsePage />;
   }

   return (
    <>
    <div><button>Horses</button>
    <button>Add New Horse</button></div>
    {use_page}
    </>
   );
    
}

