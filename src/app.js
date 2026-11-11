const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('#main-navigation');
function closeMenu(){document.body.classList.remove('menu-open');menuButton?.setAttribute('aria-expanded','false');menuButton?.setAttribute('aria-label','Open menu');}
menuButton?.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';document.body.classList.toggle('menu-open',open);menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close menu':'Open menu');});
nav?.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.body.classList.contains('menu-open')){closeMenu();menuButton.focus();}});
window.matchMedia('(min-width: 801px)').addEventListener('change',e=>{if(e.matches)closeMenu();});
const filters=[...document.querySelectorAll('[data-filter]')];
filters.forEach(button=>button.addEventListener('click',()=>{const filter=button.dataset.filter;filters.forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});let count=0;document.querySelectorAll('.gallery-item[data-category]').forEach(item=>{item.hidden=filter!=='all'&&item.dataset.category!==filter;if(!item.hidden)count++;});const status=document.getElementById('gallery-count');if(status)status.textContent=count+' photograph'+(count===1?'':'s');const empty=document.querySelector('.gallery-empty');if(empty)empty.hidden=count!==0;}));
let returnFocus=null;
const photoDialog=document.getElementById('photo-dialog');
let photoIndex=0;
const photoButtons=()=>[...document.querySelectorAll('.gallery-open')].filter(b=>!b.closest('[hidden]'));
function displayPhoto(index){const buttons=photoButtons();if(!buttons.length)return;photoIndex=(index+buttons.length)%buttons.length;const button=buttons[photoIndex];photoDialog.querySelector('img').src=button.dataset.image;photoDialog.querySelector('img').alt=button.querySelector('img').alt;document.getElementById('photo-caption').textContent=button.dataset.caption;}
function openDialog(dialog,trigger){returnFocus=trigger;dialog.showModal();document.body.classList.add('dialog-open');dialog.querySelector('[data-close]')?.focus();}
document.querySelectorAll('.gallery-open').forEach(button=>button.addEventListener('click',()=>{displayPhoto(photoButtons().indexOf(button));openDialog(photoDialog,button);}));
photoDialog?.querySelector('.photo-prev').addEventListener('click',()=>displayPhoto(photoIndex-1));
photoDialog?.querySelector('.photo-next').addEventListener('click',()=>displayPhoto(photoIndex+1));
photoDialog?.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();displayPhoto(photoIndex-1);}if(e.key==='ArrowRight'){e.preventDefault();displayPhoto(photoIndex+1);}});
document.querySelectorAll('dialog').forEach(dialog=>{dialog.querySelector('[data-close]')?.addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});dialog.addEventListener('close',()=>{document.body.classList.remove('dialog-open');returnFocus?.focus();});});
document.querySelector('.privacy-open')?.addEventListener('click',e=>openDialog(document.getElementById('privacy-dialog'),e.currentTarget));
document.getElementById('whatsapp-form')?.addEventListener('submit',e=>{e.preventDefault();const form=e.currentTarget;if(!form.reportValidity())return;const name=form.elements.name.value.trim();if(!name){form.elements.name.setCustomValidity('Please enter your name.');form.elements.name.reportValidity();return;}const message=form.elements.message.value.trim();const text='Hi Kelly, my name is '+name+'. I’m interested in '+form.elements.interest.value.toLowerCase()+'.'+(message?'\n\n'+message:'');const url='https://wa.me/447496080844?text='+encodeURIComponent(text);const opened=window.open(url,'_blank','noopener,noreferrer');document.getElementById('whatsapp-status').textContent='Your message is ready. Please review and send it in WhatsApp.';const status=document.getElementById('whatsapp-status');const fallback=document.createElement('a');fallback.href=url;fallback.target='_blank';fallback.rel='noopener noreferrer';fallback.textContent=' Open WhatsApp';status.appendChild(fallback);});
document.getElementById('enquiry-name')?.addEventListener('input',e=>e.target.setCustomValidity(''));
