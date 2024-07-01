import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RootLayout from "../components/layouts/RootLayout";
import Support from "../components/pages/Support";



const Router = createBrowserRouter([
    {
        path: '/',
        element : <RootLayout />, 
        children: [
            {
                path: '/',
                element: <App/>,
            },
            {
                path: '/support',
                element: <Support/>,
            },
           
        ],
    },
]);

export default Router