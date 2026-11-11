import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {pages,layout} from '../src/pages.mjs';
import {business,treatments,gallery} from '../src/config.mjs';
const assets=JSON.parse(await readFile(new URL('../src/asset-manifest.json',import.meta.url),'utf8'));
assert.equal(Object.keys(pages).length,5);
assert.equal(business.booking,'https://that-time.co.uk/kelly-buxton-aesthetics');
assert.equal(business.whatsapp,'https://wa.me/447496080844');
assert.equal(new Set(assets).size,14);
for(const [key,page]of Object.entries(pages)){
 const html=layout(page,key,'https://kelly-buxton-aesthetics.vercel.app');
 assert.equal((html.match(/<h1[ >]/g)||[]).length,1,key+' must have one h1');
 assert.ok(html.includes('aria-current="page"'),key+' current navigation');
 assert.ok(html.includes('rel="canonical"'),key+' canonical');
 assert.ok(!/undefined|NaN|TODO|lorem ipsum/i.test(html),key+' no placeholders');
 for(const [,image]of html.matchAll(/src="\/assets\/([^"]+)"/g))assert.ok(assets.includes(image),'Unknown photo '+image);
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);
 assert.equal(ids.length,new Set(ids).size,key+' duplicate ids');
 for(const match of html.matchAll(/<a[^>]*href="(\/[^"#?]*)(?:#([^"]+))?"/g)){
  const target=Object.values(pages).find(p=>'/'+(p.path?p.path+'/':'')===match[1]);
  assert.ok(target,'Unknown internal page '+match[1]);
  if(match[2])assert.ok(layout(target,'target','https://example.com').includes('id="'+match[2]+'"'),'Missing fragment '+match[2]);
 }
 const schema=JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
 assert.equal(schema.address.postalCode,'DE3 9GH');
}
assert.ok(gallery.every(g=>assets.includes(g.image)));
assert.ok(treatments.every(t=>!t.image||assets.includes(t.image)));
console.log('PASS: 5 pages, navigation, treatment anchors, unique IDs, 14 photo references, booking links and structured data.');
