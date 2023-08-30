import './index.css'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import ErrorPage from './ErrorPage';
import { New } from './New';
//import { Publish } from 'publish';
//import { Submit } from 'submit';

export const routes = [
  {
    path: "/",
    element: <Hello/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/new",
    element: <New/>,
  },
 /*
  {
    path: "/publish",
    element: <Publish/>,
  },
  {
    path: "/submit",
    element: <Submit/>,
  }
*/
];
const router = createBrowserRouter(routes);

function Hello() {
  return <div>
    What would you like to do?
    <ul>
     <li><Link to="/new">Start a new project using our <b>Form generator</b></Link></li>
     <li><Link to="/publish">Set project settings and <b>publish</b> a form</Link></li>
     <li><Link to="/submit"><b>Submit</b> a dataset from a shared form</Link></li>
     <li><Link to="/edit">Process received datasets with our <b>collaborative editor</b></Link></li>
    </ul>
  </div>
}

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)
root.render(<RouterProvider router={router} />)
