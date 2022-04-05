import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AllTime from "../components/AllTime";
import LastMonth from "../components/LastMonth";
import LastSixMonths from "../components/LastSixMonths";
import Login from "../components/Login";
import CheckLogin from "../layout/CheckLogin";
import WithNavbar from "../layout/WithNavbar";
import { RootState } from "../store/root";

type Page = "Last Month" | "Last 6 Months" | "All Time";

export default function music() {
    const [Page, setPage] = useState<Page | undefined>();

    return (
        <WithNavbar>
            <div className="container">
                <div className="flex justify-center py-3 gap-3">
                    <button
                        onClick={() => setPage("Last Month")}
                        className="btn btn-primary btn-sm"
                    >
                        Last Month
                    </button>
                    <button
                        onClick={() => setPage("Last 6 Months")}
                        className="btn btn-primary btn-sm"
                    >
                        Last 6 Months
                    </button>
                    <button
                        onClick={() => setPage("All Time")}
                        className="btn btn-primary btn-sm"
                    >
                        All Time
                    </button>
                </div>
                {Page ? (
                    <>
                        {Page === "All Time" ? (
                            <AllTime />
                        ) : Page === "Last 6 Months" ? (
                            <LastSixMonths />
                        ) : (
                            <LastMonth />
                        )}
                    </>
                ) : (
                    ""
                )}
            </div>
        </WithNavbar>
    );
}
