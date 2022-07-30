import { resolve } from "path";
import { readFileSync } from "fs";
import { minify } from "html-minifier-terser";
import { render } from "@lit-labs/ssr/lib/render-with-global-dom-shim.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import { html } from "lit";
import url from "url";
import { Buffer } from "buffer";
import { Readable } from "stream";
import { routes } from "./../../../client/dist/index.js";

const clientPath = (filename) => {
    console.log("pasok");
    if(filename != "undefined.js") {
        console.log(`${filename} : ${process.cwd()}`);
        return resolve(`${process.cwd()}../../client/dist/${filename}`);
    }
    return;
};
const stylePath = (filename) => {
    return resolve(`${process.cwd()}../../style/dist/${filename}`);
};

const readClientFile = (filename) => {
    return readFileSync(clientPath(filename)).toString();
};

const readStyleFile = (filename) => {
    return readFileSync(stylePath(filename)).toString();
};

const htmlTemplates = await minify(readClientFile("template.html"), {
    minifyCSS: true,
    removeComments: true,
    collapseWhitespace: true
});

const styles = await minify(readStyleFile("style.css"), {
    minifyCSS: true,
    removeComments: true,
    collapseWhitespace: true
});


export const sanitizeTemplate = async (template) => {
    return html`${unsafeHTML(template)}`;
}

function* renderApp(route,template) {
    yield `
        <!doctype html>
        <html>
            <head>
                <title>${route.title}</title>
                <style rel="stylesheet" type="text/css">${styles}</style>
                
            </head>
            <body>
                <div id="root">`;
            yield* render(template);
            yield `</div>
            </body>
        </html>
    `;
}

async function streamToString(stream) {
    const chunks = [];
    for await (let chunk of stream) {
        chunks.push(Buffer.from(chunk));
    }
    return Buffer.concat(chunks).toString("utf-8");
}

async function renderStream(stream) {
    return await streamToString(Readable.from(stream));
}

export default async (req, res, next) => {

    const route = routes.find((rt) => rt.path === url.parse(req.url).pathname);

    if(route == undefined) {
        res.redirect(301, "/404");
        return;
    }

    const template = await sanitizeTemplate(route.template());

    const ssrResult = renderApp(route, template);

    let stream = await renderStream(ssrResult);

    stream = stream.replace(/<template shadowroot="open"><\/template>/g, '');

    res.status(200).send(stream);
};


