import type { NextApiRequest, NextApiResponse } from 'next'
import request from "request"
import querystring from "querystring"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    let refresh_token = req.query.refresh_token;

    let redirect_uri = process.env.redirect_uri
    let client_id = process.env.client_id; // Your client id
    let client_secret = process.env.client_secret; // Your secret

    let authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        },
        json: true
    };

    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          var access_token = body.access_token;
          res.send({
            'access_token': access_token
          });
        }
      });
}
