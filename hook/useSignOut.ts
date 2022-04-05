import { useLocalStorage } from 'usehooks-ts';

interface ReturnType {
    signout(): void
}

function useSignOut(): ReturnType {
    const [AccessToken, setAccessToken] = useLocalStorage("AccessToken", "");
    const [RefreshToken, setRefreshToken] = useLocalStorage("RefreshToken", "");

    const signout = async () => {
        setAccessToken("")
        setRefreshToken("")
    }

    return { signout };

}

export default useSignOut