import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import axios from "axios";
import { UserDateInterface } from '../interfaces/UserDataInterface';

interface ReturnType {
    isLive: boolean | undefined | null
    loading: boolean | undefined | null
    data: UserDateInterface | undefined | null
}


function useCheckToken(): ReturnType {
    const [AccessToken, setAccessToken] = useLocalStorage("AccessToken", "");
    const [isLive, setIsLive] = useState<boolean | undefined | null>(null)
    const [loading, setLoading] = useState<boolean | undefined | null>(null)
    const [data, setData] = useState<UserDateInterface | undefined | null>(null)

    useEffect(() => {
        (async () => {
            if (AccessToken.length === 0) {
                setLoading(false)
                setData(null)
                return setIsLive(false)
            }
            if (AccessToken.length !== 0) {
                try {
                    setLoading(true)

                    let res1 = await axios.get<UserDateInterface>("https://api.spotify.com/v1/me", {
                        headers: {
                            Authorization: "Bearer " + AccessToken,
                        }
                    })

                    setData(res1.data)

                    setLoading(false)
                    return setIsLive(true)
                } catch (error) {
                    setData(null)
                    return setIsLive(false)
                }
            }
        })();
    }, [AccessToken]);

    return { isLive, loading, data };

}

export default useCheckToken