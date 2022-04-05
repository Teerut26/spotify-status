import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import useFetch from "../hook/useFetch";
import { TopTracks } from "../interfaces/TopTracks";
import TestCanvas from "./TestCanvas";

const LastSixMonths: React.FC = () => {
    const [sunSec, setsunSec] = useState<number>(0);

    const [resutl] = useFetch<TopTracks>({
        initFetch: true,
        method: "get",
        url: "https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=medium_term",
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
        <div className="max-w-[24rem] mx-auto py-3">
            {resutl ? <TestCanvas scale={10} data={resutl as TopTracks} /> : ""}
            {/* <div className="flex flex-col bg-[#2F2F2F] p-2">
                <div className="flex flex-col mb-2">
                    <div className="flex justify-between">
                        <div className="text-[#E78338] font-bold">#</div>
                        <div className="font-bold text-[#E78338]">
                            {moment.utc(sunSec).format("HH:mm:ss")}
                        </div>
                    </div>
                </div>
                {resutl?.items.map((item, idx) => (
                    <div key={idx} className="flex flex-col">
                        <div className="flex justify-between">
                            <div className="flex items-center gap-1">
                                <img
                                    src={
                                        item.album.images.filter(
                                            (item) => item.height === 64
                                        )[0].url
                                    }
                                    className="w-[35px] h-[35px]"
                                    alt={item.name}
                                />{" "}
                                <div className="flex flex-col">
                                    <div className="text-[#B5B7B5] font-bold truncate max-w-[15rem]">
                                        {idx + 1}. {item.name} -{" "}
                                        {item.artists[0].name}
                                    </div>
                                    <div className="text-xs text-[#858D8D] font-bold">
                                        MP3 :: 44 kHz, 320 kbps
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <div className="font-bold text-[#B5B7B5]">
                                    {moment
                                        .utc(item.duration_ms)
                                        .format("mm:ss")}
                                </div>
                                <div className="flex justify-end">
                                    <i className="fa-solid text-xs fa-star font-bold text-[#858D8D]"></i>
                                    <i className="fa-solid text-xs fa-star font-bold text-[#858D8D]"></i>
                                    <i className="fa-solid text-xs fa-star font-bold text-[#858D8D]"></i>
                                    <i className="fa-solid text-xs fa-star font-bold text-[#858D8D]"></i>
                                    <i className="fa-solid text-xs fa-star font-bold text-[#858D8D]"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div> */}
            {/* <div className="flex justify-center py-3">
                <div onClick={() => cap()} className="btn btn-primary">
                    Download
                </div>
            </div> */}
        </div>
    );
};

export default LastSixMonths;
