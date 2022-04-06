import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Item, TopTracks } from "../interfaces/TopTracks";
import { RootState } from "../store/root";

interface Props {
    data: TopTracks;
    scale: number;
    title: string;
}

// let scale: number = 20;
let width: number = 384;
let height: number = 590;

const TestCanvas: React.FC<Props> = ({ data, title }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [scale, setScale] = useState(4);
    const [context, setContext] = useState<CanvasRenderingContext2D | null>();
    const useData = useSelector(
        (state: RootState) => state.checkTokenSlice.data
    );

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            setContext(canvas.getContext("2d"));
        }
    }, [data]);

    useEffect(() => {
        darwHearder();
        data.items.map((item, idx) => {
            darwBody(idx, item as Item);
        });
        darwFooter();
    }, [context, scale]);

    const darwFooter = () => {
        let y: number = 110;
        let x: number = 0;
        if (context) {
            context.font = `bold ${10 * scale}px Arial`;
            context.textAlign = `center`;
            context.fillStyle = `#E78338`;
            context.fillText(
                "Generate By Holify",
                (192 + x) * scale,
                (465 + y) * scale
            );
        }
    };

    const darwHearder = () => {
        let y: number = 110;
        let x: number = 0;

        if (context) {
            let count_ms: number = 0;

            data.items.map((item, idx) => (count_ms += item.duration_ms));

            context.fillStyle = "#2F2F2F";
            context.fillRect(0, 0, width * scale, height * scale);

            context.font = `bold ${40 * scale}px Arial`;
            context.textAlign = `left`;
            context.fillStyle = `#E78338`;
            context.fillText(title, (10 + x) * scale, (-65 + y) * scale);

            context.font = `bold ${20 * scale}px Arial`;
            context.textAlign = `left`;
            context.fillStyle = `#E78338`;
            context.fillText(
                useData.data?.display_name as string,
                (10 + x) * scale,
                (-40 + y) * scale
            );

            let img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = function () {
                context.drawImage(
                    img,
                    (355 + x) * scale,
                    (-95 + y) * scale,
                    20 * scale,
                    20 * scale
                );
            };
            img.src = "/spotify.svg";

            context.font = `bold ${15 * scale}px Arial`;
            context.textAlign = `left`;
            context.fillStyle = `#E78338`;
            context.fillText(
                "Spotify Stats Generator",
                (10 + x) * scale,
                (-20 + y) * scale
            );

            context.font = `bold ${15 * scale}px Arial`;
            context.textAlign = `left`;
            context.fillStyle = `#E78338`;
            context.fillText(
                `# ${data.items.length}`,
                (10 + x) * scale,
                (10 + y) * scale
            );

            context.font = `bold ${15 * scale}px Arial`;
            context.textAlign = `right`;
            context.fillStyle = `#E78338`;
            context.fillText(
                moment.utc(count_ms).format("HH:mm:ss"),
                (375 + x) * scale,
                (10 + y) * scale
            );
        }
    };

    const darwBody = (row: number, dataItem: Item) => {
        let y: number = 100;
        let x: number = 0;

        if (context) {
            let img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = function () {
                context.drawImage(
                    img,
                    (10 + x) * scale,
                    (35 + y) * scale + 42.5 * scale * row,
                    36 * scale,
                    36 * scale
                );
            };
            img.src = dataItem.album.images.filter(
                (url) => url.width === 300
            )[0].url;

            context.font = `bold ${15 * scale}px Arial`;
            context.textAlign = `left`;
            context.fillStyle = `#B5B7B5`;
            context.fillText(
                limitString(
                    `${row + 1}. ${dataItem.name} - ${dataItem.artists[0].name}`
                ),
                (50 + x) * scale,
                (50 + y) * scale + 42.5 * scale * row
            );

            context.font = `bold ${12.5 * scale}px Arial`;
            context.textAlign = `left`;
            context.fillStyle = `#858D8D`;
            context.fillText(
                "MP3 :: 44 kHz, 320 kbps",
                (50 + x) * scale,
                (67.5 + y) * scale + 42.5 * scale * row
            );

            context.font = `bold ${15 * scale}px Arial`;
            context.textAlign = `right`;
            context.fillStyle = `#B5B7B5`;
            context.fillText(
                moment.utc(dataItem.duration_ms).format("mm:ss"),
                (375 + x) * scale,
                (50 + y) * scale + 42.5 * scale * row
            );

            context.font = `bold ${12.5 * scale}px Arial`;
            context.textAlign = `right`;
            context.fillStyle = `#858D8D`;
            context.fillText(
                starCalculator(dataItem.popularity),
                (375 + x) * scale,
                (67.5 + y) * scale + 42.5 * scale * row
            );
        }
    };

    const starCalculator = (popularity: number) => {
        let star: string = "";
        let rate = Math.floor((popularity * 5) / 100);

        for (let index = 0; index < rate; index++) {
            star += "⭐";
        }
        return star;
    };

    const limitString = (string: string) => {
        const limit: number = 33;
        let point = string.length > limit ? "..." : "";
        return string.substring(0, limit) + point;
    };

    const download = () => {
        const canvas = canvasRef.current;
        let url = canvas?.toDataURL("image/png");
        let link = document.createElement("a");
        link.download = `${title}-${useData.data?.display_name}.png`;
        link.href = url as string;
        link.click();
    };

    return (
        <div className="max-w-md mx-auto">
            <div className="flex justify-center gap-3 mb-3">
                <div
                    onClick={() => setScale((pre) => (pre > 1 ? pre - 1 : 1))}
                    className="btn btn-primary"
                >
                    -
                </div>
                <div
                    onClick={() =>
                        setScale((pre) => (pre <= 16 ? pre + 1 : 17))
                    }
                    className="btn btn-primary"
                >
                    +
                </div>
            </div>
            <div className="text-center">
                {height * scale}x{width * scale}
            </div>
            <canvas
                style={{ width: "100%" }}
                ref={canvasRef}
                height={height * scale}
                width={width * scale}
            ></canvas>
            <div className="flex justify-center py-3">
                <div onClick={() => download()} className="btn btn-primary">
                    Download
                </div>
            </div>
        </div>
    );
};

export default TestCanvas;
