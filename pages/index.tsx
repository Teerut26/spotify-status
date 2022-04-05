import React, { useEffect } from "react";
import _ from "lodash";
import useManageAccessToken from "../hook/useManageAccessToken";
import WithNavbar from "../layout/WithNavbar";
import UserView from "../components/UserView";
import { UserDateInterface } from "../interfaces/UserDataInterface";
import { useSelector } from "react-redux";
import { RootState } from "../store/root";

const Index: React.FC = () => {
    useManageAccessToken();

    const data = useSelector(
        (state: RootState) => state.checkTokenSlice.data.data
    );

    return (
        <WithNavbar>
            <div className="flex flex-col justify-center h-[80%] items-center">
                <UserView {...(data as UserDateInterface)} />
            </div>
        </WithNavbar>
    );
};

export default Index;
