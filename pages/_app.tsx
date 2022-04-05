import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { wrapper } from "../store";
import React, { useEffect } from "react";
import Script from "next/script";
import useCheckToken from "../hook/useCheckToken";
import { useDispatch } from "react-redux";
import { checkTokenActions } from "../store/slice/checkTokenSlice";

const MyAppRoot: React.FC<AppProps> = (props) => {
    return <MyApp {...props} />;
};

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    const { isLive, data } = useCheckToken();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            checkTokenActions.setDate({
                data,
                isLive,
            })
        );
    }, [isLive]);
    return (
        <>
            <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" />
            <Head>
                <title>Create Next App</title>
                <meta name="nextjs-typescript-tailwind-redux-graphql" />
                <link rel="icon" href="/favicon.ico" />
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
                />
            </Head>
            <Component {...pageProps} />
        </>
    );
};

export default wrapper.withRedux(MyAppRoot);
