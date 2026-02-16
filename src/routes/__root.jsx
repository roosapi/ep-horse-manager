import { Outlet,Link,createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
        <>
        <div id="topbar">
            <Link to="/horses">Horses</Link>  
            <Link to="/horses/add">Add New Horse</Link>
        </div>
        <div id="mainbody">
            <Outlet/>
        </div>
        </>
    ),
})

