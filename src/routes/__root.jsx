import { Outlet,Link,createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
        <>
        <div>
            <Link to="/horses">Horses</Link> | 
            <Link to="/addhorse">Add New Horse</Link>
        </div>
        <div>
            <Outlet/>
        </div>
        </>
    ),
})

