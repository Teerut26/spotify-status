import React, { useEffect, useState } from "react";
import RecentlyPlayedCanvas from "../../components/RecentlyPlayedCanvas";
import useFetch from "../../hook/useFetch";
import { RecentlyPlayedRoot } from "../../interfaces/RecentlyPlayed";
import WithNavbar from "../../layout/WithNavbar";

const RecentlyPlayed: React.FC = () => {
    const [sunSec, setsunSec] = useState<number>(0);

    const [resutl] = useFetch<RecentlyPlayedRoot>({
        initFetch: true,
        method: "get",
        url: "https://api.spotify.com/v1/me/player/recently-played?limit=10",
    });

    const [result_image, callApi] = useFetch({
        initFetch: false,
        method: "post",
        responseType: "arraybuffer",
        url: "/api/image",
    });

    useEffect(() => {
        if (resutl) {
            setsunSec(0);
            resutl.items.map((item) => {
                setsunSec((pre) => pre + item.track.duration_ms);
            });
        }
    }, [resutl]);

    useEffect(() => {
        if (result_image) {
            downloadBase64File(
                "data:image/png;base64," +
                    Buffer.from(result_image as any, "binary").toString(
                        "base64"
                    ),
                "image.png"
            );
        }
    }, [result_image]);

    const cap = () => {
        callApi(resutl);
    };

    function downloadBase64File(base64Data: string, fileName: string) {
        const linkSource = `${base64Data}`;
        const downloadLink = document.createElement("a");
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
    }

    return (
        <WithNavbar>
            <div className="max-w-4xl mx-auto py-3">
                {resutl ? (
                    <RecentlyPlayedCanvas
                        title="Recently Played"
                        scale={10}
                        data={resutl as RecentlyPlayedRoot}
                    />
                ) : (
                    ""
                )}
            </div>
        </WithNavbar>
    );
};

export default RecentlyPlayed;
