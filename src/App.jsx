

import { useState } from 'react';
import { createRoot } from "react-dom/client";

import './index.css'; // import css

import {AddHorsePage, HorsesPage} from './components/HorsesPage';




const root = createRoot(document.getElementById('root'))
root.render(
  <App />
);

// TODO: actual routing instead of using buttons for navigation
function App() {
  const [activePage,setActivePage] = useState();

  let use_page;

  const handlePageChange = (new_active_page) => {
    setActivePage(new_active_page)
  }
  if (activePage === "horses") {
    use_page=<HorsesPage />;
   } else if (activePage === "add-horse") {
    use_page=<AddHorsePage />;
   }

   return (
    <>
    <div>
      <button onClick={()=>handlePageChange('horses')}>Horses</button>
     <button onClick={()=>handlePageChange('add-horse')}>Add New Horse</button></div>
    {use_page}
    </>
   );
    
}

