import React from "react";
import { useSelector } from "react-redux";
import useRefreshToken from "../hook/useRefreshToken";
import useSignOut from "../hook/useSignOut";
import { RootState } from "../store/root";
import Navlink from "./Navlink";

interface Props {}

interface MusicList {
    title: string;
    href: string;
    icon?: JSX.Element;
}

const music_list: MusicList[] = [
    {
        title: "Last Month",
        href: "/music/last-month",
    },
    {
        title: "Last 6 Month",
        href: "/music/last-6-month",
    },
    {
        title: "All Time",
        href: "/music/all-time",
    },
    {
        title: "Recently Played",
        href: "/music/recently-played",
    },
];

const Navbar: React.FC<Props> = () => {
    const isLive = useSelector(
        (state: RootState) => state.checkTokenSlice.data.isLive
    );
    const { refresh, loading } = useRefreshToken();
    const { signout } = useSignOut();

    return (
        <>
            {isLive !== null ? (
                <>
                    {isLive ? (
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <div className="container">
                                <div className="navbar-brand">
                                    <i className="fa-brands fa-spotify"></i>{" "}
                                    Holify
                                </div>
                                <button
                                    className="navbar-toggler"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#navbarSupportedContent"
                                    aria-controls="navbarSupportedContent"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation"
                                >
                                    <span className="navbar-toggler-icon" />
                                </button>
                                <div
                                    className="collapse navbar-collapse"
                                    id="navbarSupportedContent"
                                >
                                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                        <li className="nav-item">
                                            <Navlink
                                                className="nav-link"
                                                href="/"
                                            >
                                                <i className="fa-solid fa-house"></i>{" "}
                                                Home
                                            </Navlink>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a
                                                className="nav-link dropdown-toggle"
                                                href="#"
                                                id="navbarDropdown"
                                                role="button"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                <i className="fa-solid fa-music"></i>{" "}
                                                Music
                                            </a>
                                            <ul
                                                className="dropdown-menu"
                                                aria-labelledby="navbarDropdown"
                                            >
                                                {music_list.map((item, idx) => (
                                                    <li key={idx}>
                                                        <Navlink
                                                            className="dropdown-item"
                                                            href={item.href}
                                                        >
                                                            {item.icon}{" "}{item.title}
                                                        </Navlink>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    </ul>
                                    <div className="flex flex-col md:flex-row gap-2">
                                        <div
                                            onClick={() => refresh()}
                                            className="btn btn-secondary btn-sm"
                                        >
                                            {loading ? (
                                                <i className="fas fa-spinner fa-spin"></i>
                                            ) : (
                                                <i className="fa-solid fa-refresh"></i>
                                            )}{" "}
                                            Refresh Token
                                        </div>
                                        <div
                                            onClick={() => signout()}
                                            className="btn btn-danger btn-sm"
                                        >
                                            <i className="fa-solid fa-right-from-bracket"></i>{" "}
                                            SignOut
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    ) : (
                        ""
                    )}
                </>
            ) : (
                ""
            )}
        </>
    );
};

export default Navbar;
