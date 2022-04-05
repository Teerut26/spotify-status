import React from "react";
import Navbar from "../components/Navbar";
import CheckLogin from "./CheckLogin";

interface Props {}

const WithNavbar: React.FC<Props> = ({ children }) => {
    return (
        <div className="flex flex-col">
            <style jsx>{`
                div.flex.flex-col {
                    height: 100vh;
                }
            `}</style>
            <div className="flex-grow-1">
                <Navbar />
                <CheckLogin>{children}</CheckLogin>
            </div>
        </div>
    );
};

export default WithNavbar;
