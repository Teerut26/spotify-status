import type { NextApiRequest, NextApiResponse } from 'next'
import { Canvas, createCanvas } from 'canvas';
import { Item, TopTracks } from '../../interfaces/TopTracks';
import moment from 'moment';
import _ from "lodash"

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    class Report {
        public scale: number = 10
        private width: number = 384
        private height: number = 490

        private canvas: Canvas
        private context

        private dataTracks: TopTracks

        constructor(scale: number, dataTracks: TopTracks) {

            this.scale = scale

            this.dataTracks = dataTracks

            this.width = this.width * scale
            this.height = this.height * scale

            this.canvas = createCanvas(this.width, this.height)
            this.context = this.canvas.getContext('2d')

            this.drawHeader()

            this.dataTracks.items.map((item, idx) => (
                this.drawBody(idx, item)
            ))

            this.drawFooter()

        }

        private drawFooter(){
            this.context.font = `bold ${10 * this.scale}px Menlo`
            this.context.textAlign = `center`
            this.context.fillStyle = `#E78338`
            this.context.fillText("Generate By Spotify Status", 192 * this.scale, 475 * this.scale)
        }

        private drawHeader() {

            let count_ms: number = 0

            this.dataTracks.items.map((item, idx) => (
                count_ms += item.duration_ms
            ))

            this.context.fillStyle = '#2F2F2F'
            this.context.fillRect(0, 0, this.width, this.height)

            this.context.font = `bold ${15 * this.scale}px Menlo`
            this.context.textAlign = `left`
            this.context.fillStyle = `#E78338`
            this.context.fillText("#", 10 * this.scale, 25 * this.scale)

            this.context.font = `bold ${15 * this.scale}px Menlo`
            this.context.textAlign = `right`
            this.context.fillStyle = `#E78338`
            this.context.fillText(moment.utc(count_ms).format("HH:mm:ss"), 375 * this.scale, 25 * this.scale)
        }

        private drawBody(row: number, data: Item) {
            this.context.font = `bold ${15 * this.scale}px Menlo`
            this.context.textAlign = `left`
            this.context.fillStyle = `#B5B7B5`
            this.context.fillText(this.limitString(`${row + 1}. ${data.name} - ${data.artists[0].name}`), 10 * this.scale, 50 * this.scale + ((42.5 * this.scale) * row))

            this.context.font = `bold ${12.5 * this.scale}px Menlo`
            this.context.textAlign = `left`
            this.context.fillStyle = `#858D8D`
            this.context.fillText("MP3 :: 44 kHz, 320 kbps", 10 * this.scale, 67.5 * this.scale + ((42.5 * this.scale) * row))

            this.context.font = `bold ${15 * this.scale}px Menlo`
            this.context.textAlign = `right`
            this.context.fillStyle = `#B5B7B5`
            this.context.fillText(moment.utc(data.duration_ms).format("mm:ss"), 375 * this.scale, 50 * this.scale + ((42.5 * this.scale) * row))

            this.context.font = `bold ${12.5 * this.scale}px Menlo`
            this.context.textAlign = `right`
            this.context.fillStyle = `#858D8D`
            this.context.fillText("⭐⭐⭐⭐⭐", 375 * this.scale, 67.5 * this.scale + ((42.5 * this.scale) * row))
        }

        private limitString(string: string) {
            const limit: number = 30
            let point = string.length > limit ? "..." : ""
            return string.substring(0, limit) + point
        }

        public toBuffer(): Buffer {
            return this.canvas.toBuffer('image/png')
        }
    }

    if (!_.has(req.body, "items")) return res.status(404).send("no body")

    let report = new Report(2, req.body)
    let buffer = report.toBuffer()

    res.writeHead(200, {
        "Content-Type": "image/png",
        "Content-Length": buffer.length,
    });
    res.end(buffer);
}

export const config = {
    api: {
        bodyParser: true,
    },
};
