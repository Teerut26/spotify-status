import axios from 'axios'
import { useState } from 'react'
import { useLocalStorage } from 'usehooks-ts';

interface ReturnType {
    refresh(): void
    loading: boolean
}

function useRefreshToken(): ReturnType {
    const [AccessToken, setAccessToken] = useLocalStorage("AccessToken", "");
    const [RefreshToken, setRefreshToken] = useLocalStorage("RefreshToken", "");

    const [loading, setloading] = useState<boolean>(false)

    const refresh = async () => {
        setloading(true)
        let { data } = await axios.get("/api/refresh_token?refresh_token=" + RefreshToken)
        setAccessToken(data.access_token)
        setloading(false)
    }

    return { refresh, loading };

}

export default useRefreshToken