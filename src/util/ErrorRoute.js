
import React from "react";

import { Link } from 'react-router-dom';

const ErrorRoute = () => (
  <div className="notFound">
    <h1>404 - Not Found!</h1>
        <Link to="/" className="goHome">
            Go Home
        </Link>
  </div>
);


export default ErrorRoute;