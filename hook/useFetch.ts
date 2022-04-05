import axios, { ResponseType } from 'axios'
import { useEffect, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts';

type Method = "get" | "post"

interface Props {
    url: string
    method: Method
    initFetch: boolean
    responseType?: ResponseType
}

function useFetch<T extends any>({ url, method, initFetch, responseType }: Props): [T | undefined | null, (body: any) => void] {
    const [resutl, setResutl] = useState<T | undefined | null>()
    const [AccessToken, setAccessToken] = useLocalStorage("AccessToken", "");

    const callApi = async (body?: any) => {
        try {
            let res = await axios({
                method,
                url,
                headers: {
                    Authorization: "Bearer " + AccessToken,
                },
                responseType: responseType,
                data: body
            })
            setResutl(res.data)
        } catch (error) {
            setResutl(null)
            throw error
        }
    }

    useEffect(() => {
        if (initFetch) {
            callApi()
        }
    }, [])


    return [resutl, callApi];

}

export default useFetch