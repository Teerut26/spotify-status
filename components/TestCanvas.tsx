import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { Item, TopTracks } from "../interfaces/TopTracks";

interface Props {
    data: TopTracks;
    scale: number;
}

// let scale: number = 20;
let width: number = 384;
let height: number = 490;

const TestCanvas: React.FC<Props> = ({ data,scale }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [context, setContext] = useState<CanvasRenderingContext2D | null>();

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
    }, [context]);

    const darwFooter = () => {
        if (context) {
            context.font = `bold ${10 * scale}px Arial`;
            context.textAlign = `center`;
            context.fillStyle = `#E78338`;
            context.fillText(
                "Generate By Spotify Status",
                192 * scale,
                475 * scale
            );
        }
    };

    const darwHearder = () => {
        if (context) {
            let count_ms: number = 0;

            data.items.map((item, idx) => (count_ms += item.duration_ms));

            context.fillStyle = "#2F2F2F";
            context.fillRect(0, 0, width * scale, height * scale);

            context.font = `bold ${15 * scale}px Arial`;
            context.textAlign = `left`;
            context.fillStyle = `#E78338`;
            context.fillText("#", 10 * scale, 25 * scale);

            context.font = `bold ${15 * scale}px Arial`;
            context.textAlign = `right`;
            context.fillStyle = `#E78338`;
            context.fillText(
                moment.utc(count_ms).format("HH:mm:ss"),
                375 * scale,
                25 * scale
            );
        }
    };

    const darwBody = (row: number, dataItem: Item) => {
        if (context) {
            context.font = `bold ${15 * scale}px Arial`;
            context.textAlign = `left`;
            context.fillStyle = `#B5B7B5`;
            context.fillText(
                limitString(
                    `${row + 1}. ${dataItem.name} - ${dataItem.artists[0].name}`
                ),
                10 * scale,
                50 * scale + 42.5 * scale * row
            );

            context.font = `bold ${12.5 * scale}px Arial`;
            context.textAlign = `left`;
            context.fillStyle = `#858D8D`;
            context.fillText(
                "MP3 :: 44 kHz, 320 kbps",
                10 * scale,
                67.5 * scale + 42.5 * scale * row
            );

            context.font = `bold ${15 * scale}px Arial`;
            context.textAlign = `right`;
            context.fillStyle = `#B5B7B5`;
            context.fillText(
                moment.utc(dataItem.duration_ms).format("mm:ss"),
                375 * scale,
                50 * scale + 42.5 * scale * row
            );

            context.font = `bold ${12.5 * scale}px Arial`;
            context.textAlign = `right`;
            context.fillStyle = `#858D8D`;
            context.fillText(
                "⭐⭐⭐⭐⭐",
                375 * scale,
                67.5 * scale + 42.5 * scale * row
            );
        }
    };

    const limitString = (string: string) => {
        const limit: number = 30;
        let point = string.length > limit ? "..." : "";
        return string.substring(0, limit) + point;
    };

    const download = () => {
        darwFooter();
        const canvas = canvasRef.current;
        let url = canvas?.toDataURL("image/png");
        let link = document.createElement("a");
        link.download = "filename.png";
        link.href = url as string;
        link.click();
    };

    return (
        <div className="max-w-md mx-auto">
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
