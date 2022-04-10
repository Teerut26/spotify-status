import React, { useState } from "react";
import WithNavbar from "../../layout/WithNavbar";

type Page = "Last Month" | "Last 6 Months" | "All Time" | "RecentlyPlayed";

export default function music() {
    const [Page, setPage] = useState<Page | undefined>();

    return (
        <WithNavbar>
            <div className="container">
               fgdfg
                    
            </div>
        </WithNavbar>
    );
}
