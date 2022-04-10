import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    let client_id = process.env.client_id;
    let redirect_uri = process.env.redirect_uri;
    var scope = 'user-read-private user-read-email user-top-read user-read-recently-played user-read-playback-state';

    res.redirect(`https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=${scope}&redirect_uri=${redirect_uri}&state=${uuidv4()}`)
}