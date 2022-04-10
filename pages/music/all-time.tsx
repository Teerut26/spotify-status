import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { TopTracks } from "../../interfaces/TopTracks";
import TopTracksCanvas from "../../components/TopTracksCanvas";
import useFetch from "../../hook/useFetch";
import WithNavbar from "../../layout/WithNavbar";

const LastMonth: React.FC = () => {
    const [sunSec, setsunSec] = useState<number>(0);

    const [resutl] = useFetch<TopTracks>({
        initFetch: true,
        method: "get",
        url: "https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=long_term",
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
                setsunSec((pre) => pre + item.duration_ms);
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
                    <TopTracksCanvas
                        title="All Time"
                        scale={10}
                        data={resutl as TopTracks}
                    />
                ) : (
                    ""
                )}
            </div>
        </WithNavbar>
    );
};

export default LastMonth;
