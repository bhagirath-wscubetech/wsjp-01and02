const fs = require('fs');
const http = require("http");
const url = require('url');

const server = http.createServer(
    (req, res) => {
        const reqUrl = url.parse(req.url, true);
        if (reqUrl.pathname == "/create" && req.method == "GET") {
            const fileName = reqUrl.query.filename;
            fs.access(
                `files/${fileName}`,
                (err) => {
                    if (err) {
                        fs.writeFile(
                            `files/${fileName}`,
                            "",
                            (err) => {
                                if (err) res.end("Unable to create the file");
                                else res.end("File created successfully");
                            }
                        )
                    } else {
                        res.end("File named already exits");
                    }
                }
            )
        } else if (reqUrl.pathname == "/write" && req.method == "POST") {
            const fileName = reqUrl.query.filename;
            res.end("Writing mode");
        } else if (reqUrl.pathname == "/delete" && req.method == "DELETE") {

        } else {
            res.end("Not found");
        }
    }
)

server.listen(
    5500,
    () => console.log('Server started!')
)
