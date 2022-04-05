import type { NextApiRequest, NextApiResponse } from 'next'
import request from "request"
import querystring from "querystring"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    let code = req.query.code || null;
    let state = req.query.state || null;

    let redirect_uri = process.env.redirect_uri
    let client_id = process.env.client_id; // Your client id
    let client_secret = process.env.client_secret; // Your secret

    if (state === null) {
        res.redirect('/#error=state_mismatch');
    } else {
        let authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
            },
            json: true
        }
        request.post(authOptions, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                const access_token = body.access_token
                const refresh_token = body.refresh_token;

                res.redirect('/?' +
                    querystring.stringify({
                        access_token: access_token,
                        refresh_token: refresh_token
                    }));
            } else {
                res.redirect('/#' +
                    querystring.stringify({
                        error: 'invalid_token'
                    }));
            }
        })

    }
}
