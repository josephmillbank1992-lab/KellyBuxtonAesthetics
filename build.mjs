import { mkdir, writeFile, readFile, copyFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { pages, layout } from './src/pages.mjs';
const root=resolve('public');
await mkdir(root,{recursive:true});
const origin=(process.env.SITE_URL || 'https://kelly-buxton-aesthetics.vercel.app').replace(/\/$/,'');
for(const [key,page] of Object.entries(pages)){
 const dir=resolve(root,page.path);await mkdir(dir,{recursive:true});
 await writeFile(resolve(dir,'index.html'),layout(page,key,origin));
}
for(const file of ['styles.css','app.js','favicon.svg'])await copyFile('src/'+file,resolve(root,file));
await writeFile(resolve(root,'404.html'),`<!doctype html><html lang="en-GB"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Page not found | Kelly Buxton Aesthetics</title><link rel="stylesheet" href="/styles.css"><main class="section"><p class="eyebrow">Kelly Buxton Aesthetics</p><h1>A little<br><em>off course.</em></h1><p style="margin-top:30px">We couldn’t find that page. Let’s take you back.</p><a class="button" href="/">Back to the homepage ↗</a></main></html>`);
await writeFile(resolve(root,'robots.txt'),'User-agent: *\nAllow: /\nSitemap: '+origin+'/sitemap.xml\n');
await writeFile(resolve(root,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+Object.values(pages).map(p=>'<url><loc>'+origin+'/'+(p.path?p.path+'/':'')+'</loc></url>').join('')+'</urlset>');
const manifest=JSON.parse(await readFile('src/asset-manifest.json','utf8'));
await mkdir(resolve(root,'assets'),{recursive:true});
if(process.env.KELLY_LIBRARY_TRANSFERS){
 const imports=JSON.parse(process.env.KELLY_LIBRARY_TRANSFERS);
 if(imports.length!==manifest.length)throw Error('Incomplete client photo import');
 for(const [i,transfer] of imports.entries()){
  const result=spawnSync('python3',['scripts/library_file_transfer.py','materialize',resolve(root,'assets',manifest[i])],{input:JSON.stringify(transfer),encoding:'utf8'});
  if(result.status!==0)throw Error('Client photo import failed: '+manifest[i]+' '+result.stderr);
 }
 console.log('Imported all 14 original client photos.');
}else if(process.env.KELLY_ASSET_ORIGIN){
 const assetOrigin=new URL(process.env.KELLY_ASSET_ORIGIN);
 if(assetOrigin.protocol!=='https:')throw Error('Photo origin must use HTTPS');
 await Promise.all(manifest.map(async name=>{
  const response=await fetch(new URL('/assets/'+name,assetOrigin),{signal:AbortSignal.timeout(30000)});
  if(!response.ok||!response.headers.get('content-type')?.startsWith('image/'))throw Error('Photo download failed: '+name);
  await writeFile(resolve(root,'assets',name),new Uint8Array(await response.arrayBuffer()));
 }));
}else if(process.env.SKIP_ASSETS!=='1'){
 for(const name of manifest)await copyFile(resolve('assets',name),resolve(root,'assets',name));
}
console.log('Built five pages, metadata, sitemap, 404 and static assets.');
