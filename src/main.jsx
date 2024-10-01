import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { Login, ListPage, ChartPage, AddPage } from "./pages/index.js";
import { Provider } from "react-redux";
import { store } from "./store/store.js";

const route = createBrowserRouter([
  {
    path: "/",
    element: <App />, 
    children: [
      {
        path: "", 
        element: <Login />,
      },
      {
        path: "dashboard",
        element: <AddPage />,
      },
      {
        path: "list",
        element: <ListPage />,
      },
      {
        path: "chart",
        element: <ChartPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={route} />
    </Provider>
  </StrictMode>
);
