import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Homepage from './home'; // Import your Homepage component
import EpisodeDetail from './EpisodeDetail'; // Import the EpisodeDetail component
import CastsPage from './CastsPage';
// Define your routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />, // Render the Homepage component at the root path
  },
  {
    path: "/episode/:episodeNumber",
    element: <EpisodeDetail />, // Render the EpisodeDetail component at the /episode/:episodeNumber path
  },
  {
    path: "/casts",
    element: <CastsPage />, // Render the CastsPage component at the /casts path
  },
]);

// Render the app with RouterProvider
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
