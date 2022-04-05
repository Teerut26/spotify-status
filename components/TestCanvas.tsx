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

const TestCanvas: React.FC<Props> = ({ data, scale, title }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
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
    }, [context]);

    const darwFooter = () => {
        let y: number = 110;
        let x: number = 0;
        if (context) {
            context.font = `bold ${10 * scale}px Arial`;
            context.textAlign = `center`;
            context.fillStyle = `#E78338`;
            context.fillText(
                "Generate By Spotify Status",
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

            context.font = `bold ${15 * scale}px Arial`;
            context.textAlign = `left`;
            context.fillStyle = `#E78338`;
            context.fillText(
                moment().format("LLLL"),
                (10 + x) * scale,
                (-20 + y) * scale
            );

            context.font = `bold ${15 * scale}px Arial`;
            context.textAlign = `left`;
            context.fillStyle = `#E78338`;
            context.fillText("#", (10 + x) * scale, (10 + y) * scale);

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
            context.font = `bold ${15 * scale}px Arial`;
            context.textAlign = `left`;
            context.fillStyle = `#B5B7B5`;
            context.fillText(
                limitString(
                    `${row + 1}. ${dataItem.name} - ${dataItem.artists[0].name}`
                ),
                (10 + x) * scale,
                (50 + y) * scale + 42.5 * scale * row
            );

            context.font = `bold ${12.5 * scale}px Arial`;
            context.textAlign = `left`;
            context.fillStyle = `#858D8D`;
            context.fillText(
                "MP3 :: 44 kHz, 320 kbps",
                (10 + x) * scale,
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
                "⭐⭐⭐⭐⭐",
                (375 + x) * scale,
                (67.5 + y) * scale + 42.5 * scale * row
            );
        }
    };

    const limitString = (string: string) => {
        const limit: number = 33;
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
