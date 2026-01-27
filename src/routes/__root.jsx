import { Outlet,Link,createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
        <>
        <div>
            <Link to="/horses">Horses</Link> | 
            <Link to="/horses/add">Add New Horse</Link>
        </div>
        <div>
            <Outlet/>
        </div>
        </>
    ),
})

