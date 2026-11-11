import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
const root=resolve('public');
const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.jpg':'image/jpeg','.xml':'application/xml','.txt':'text/plain'};
createServer(async(req,res)=>{try{let pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);let file=resolve(root,'.'+pathname);if(file!==root&&!file.startsWith(root+sep))throw Error('Invalid path');if(!extname(file))file=resolve(file,'index.html');const bytes=await readFile(file);res.writeHead(200,{'content-type':types[extname(file)]||'application/octet-stream'});res.end(bytes);}catch{res.writeHead(404,{'content-type':'text/html'});res.end(await readFile(resolve(root,'404.html')));}}).listen(4173,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4173'));
