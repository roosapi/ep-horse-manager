

import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from '@tanstack/react-router'

import { routeTree } from './routeTree.gen'

import './index.css'; // import css


// Create a new router instance
const router = createRouter({ routeTree })


const root = createRoot(document.getElementById('root'))
root.render(
  <RouterProvider router={router} />
);
