import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faMusic } from "@fortawesome/free-solid-svg-icons";

const Login: React.FC = () => {
    return (
        <div className="flex flex-col gap-10">
                <FontAwesomeIcon icon={faMusic} size={"6x"} />
            <a href="/api/login" className="btn btn-primary">
                Log in with Spotify
            </a>
        </div>
    );
};

export default Login;
