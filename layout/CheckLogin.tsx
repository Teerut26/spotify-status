import React from "react";
import { useSelector } from "react-redux";
import Login from "../components/Login";
import { RootState } from "../store/root";
const CheckLogin: React.FC = ({ children }) => {
    const isLive = useSelector(
        (state: RootState) => state.checkTokenSlice.data.isLive
    );
    return (
        <>
            {isLive !== null ? (
                <>
                    {!isLive ? (
                        <div className="flex flex-col justify-center h-[80%] items-center">
                            <Login />
                        </div>
                    ) : (
                        children
                    )}
                </>
            ) : (
                ""
            )}
        </>
    );
};

export default CheckLogin;
