import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import axios from "axios";
import { useRouter } from 'next/router';
import _ from "lodash";

function useManageAccessToken(): void {
    const rounter = useRouter();

    const [AccessToken, setAccessToken] = useLocalStorage("AccessToken", "");
    const [RefreshToken, setRefreshToken] = useLocalStorage("RefreshToken", "");

    useMemo(() => {
        if (
            _.has(rounter.query, "refresh_token") &&
            _.has(rounter.query, "access_token")
        ) {
            const { refresh_token, access_token } = rounter.query;
            setAccessToken(access_token as string);
            setRefreshToken(refresh_token as string);
            rounter.replace("/");
        }
    }, [rounter]);
}

export default useManageAccessToken