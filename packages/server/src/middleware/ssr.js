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
// const clientPath = (filename) => {
//     return resolve(`${process.cwd()}../../client/dist/${filename}`);
// };

// const stylePath = (filename) => {
//     return resolve(`${process.cwd()}../../style/dist/${filename}`);
// };

// const readClientFile = (filename) => {
//     return readFileSync(clientPath(filename)).toString();
// };

// const readStyleFile = (filename) => {
//     return readFileSync(stylePath(filename)).toString();
// };

// const htmlTemplates = await minify(readStyleFile("template.html"), {
//     minifyCSS: true,
//     removeComments: true,
//     collapseWhitespace: true
// });

// const styles = await minify(readStyleFile("style.css"), {
//     minifyCSS: true,
//     removeComments: true,
//     collapseWhitespace: true
// });


// export const sanitizeTemplate = async (template) => {
//     return html`${unsafeHTML(template)}`;
// }

// function* renderApp(route,template) {
//     yield `
//         <!doctype html>
//         <html>
//             <head></head>
//             <body>
//                 <div id="root">`;
//             yield* render(template);
//             yield `</div>
//             </body>
//         </html>
//     `;
// }

// async function streamToString(stream) {
//     const chunks = [];
//     for await (let chunk of stream) {
//         chunks.push(Buffer.from(chunk));
//     }
//     return Buffer.concat(chunks).toString("utf-8");
// }

// async function renderStream(stream) {
//     return await streamToString(Readable.from(stream));
// }

export default async (req, res, next) => {

    // const route = routes.find((rt) => rt.path === url.parse(req.url).pathname);

    // if(route == undefined) {
    //     res.redirect(301, "/404");
    //     return;
    // }

    console.log("pasok");

    // const template = await sanitizeTemplate(route.template());

    // console.log(route);
    // console.log(template);

    // const ssrResult = await renderApp(route, template);

    // let stream = await renderStream(ssrResult);

    // res.status(200).send(stream);
};


