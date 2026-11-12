import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {pages} from '../src/pages.mjs';

class Element {
 constructor(id,attributes={}) {this.id=id;this.attributes={...attributes};this.dataset={};this.events={};this.children=[];this.hidden=false;this.textContent='';}
 getAttribute(name){return this.attributes[name]??null;}
 setAttribute(name,value){this.attributes[name]=value;}
 addEventListener(name,fn){this.events[name]=fn;}
 focus(){focused=this;}
 appendChild(child){this.children.push(child);}
 replaceChildren(){this.children=[];}
 click(){this.events.click?.({});}
 key(key){let prevented=false;this.events.keydown?.({key,preventDefault(){prevented=true;}});return prevented;}
}
let focused=null;
const ids=['face','profile','lips','start'];
const topics=['Full face rejuvenation','Profile balancing and contouring','Lip treatments','A free consultation'];
const tabs=ids.map(id=>new Element('tab-'+id,{'aria-controls':'panel-'+id}));
const panels=ids.map((id,index)=>{const node=new Element('panel-'+id);node.hidden=index!==0;return node;});
const buttons=topics.map(topic=>{const node=new Element();node.dataset.interest=topic;return node;});
const plan=new Element('consultation-plan');plan.hidden=true;
const list=new Element('consultation-interests'),status=new Element('interest-status'),whatsapp=new Element('consultation-whatsapp');
const nodes=new Map([...panels,plan,list,status,whatsapp].map(node=>[node.id,node]));
const document={
 querySelectorAll(selector){if(selector==='.explorer-tabs [role="tab"]')return tabs;if(selector==='[data-interest]')return buttons;return [];},
 getElementById(id){return nodes.get(id)??null;},
 createElement(){return new Element();}
};
const source=await readFile(new URL('../src/app.js',import.meta.url),'utf8');
const marker=source.indexOf('/* Accessible treatment browsing');
assert.ok(marker>=0);
vm.runInNewContext(source.slice(marker),{document,Set,encodeURIComponent});

tabs[2].click();
assert.equal(tabs[2].attributes['aria-selected'],'true');
assert.equal(panels[2].hidden,false);
assert.equal(panels.filter(panel=>!panel.hidden).length,1);
assert.equal(tabs.filter(tab=>tab.tabIndex===0).length,1);
assert.equal(tabs[2].key('ArrowRight'),true);
assert.equal(focused,tabs[3]);
tabs[3].key('ArrowRight');assert.equal(focused,tabs[0]);
tabs[0].key('ArrowLeft');assert.equal(focused,tabs[3]);
tabs[3].key('Home');assert.equal(focused,tabs[0]);
tabs[0].key('End');assert.equal(focused,tabs[3]);
assert.equal(tabs[0].key('Tab'),false);

buttons[0].click();buttons[2].click();
assert.equal(plan.hidden,false);
assert.equal(list.children.length,2);
assert.equal(buttons[0].attributes['aria-pressed'],'true');
const url=new URL(whatsapp.href);
assert.equal(url.origin+url.pathname,'https://wa.me/447496080844');
assert.ok(url.searchParams.get('text').includes(topics[0]));
assert.ok(url.searchParams.get('text').includes(topics[2]));
assert.ok(!url.searchParams.get('text').includes(topics[1]));
list.children[0].children[0].click();
assert.equal(focused,buttons[0]);
assert.equal(buttons[0].attributes['aria-pressed'],'false');
assert.equal(list.children.length,1);
buttons[2].click();assert.equal(plan.hidden,true);assert.equal(list.children.length,0);
assert.equal(status.textContent,'0 consultation topics selected.');
for(const id of ids){
 assert.ok(pages.home.html.includes('id="tab-'+id+'"'));
 assert.ok(pages.home.html.includes('id="panel-'+id+'"'));
}
assert.ok(!Object.values(pages).some(page=>/<em>|KB \/|THE PERSONAL APPROACH|THE SIGNATURE FOCUS/.test(page.html)));
console.log('PASS: explorer selection, keyboard navigation, consultation shortlist, removal, WhatsApp content and simplified headings.');
