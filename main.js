
// ─────────────────────────────────────────────
// HERO CANVAS  — blueprint particle network
// ─────────────────────────────────────────────
(function(){
  const cv=document.getElementById('heroCanvas'),ctx=cv.getContext('2d');
  let W,H,nodes=[];
  function resize(){
    W=cv.width=cv.offsetWidth;H=cv.height=cv.offsetHeight;
    nodes=[];const n=Math.floor(W*H/16000);
    for(let i=0;i<n;i++)nodes.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.25,vy:(Math.random()-.5)*.25});
  }
  let t=0;
  function draw(){
    ctx.clearRect(0,0,W,H);t+=.008;
    nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>W)n.vx*=-1;if(n.y<0||n.y>H)n.vy*=-1;});
    for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++){
      const dx=nodes[i].x-nodes[j].x,dy=nodes[i].y-nodes[j].y,d=Math.hypot(dx,dy);
      if(d<130){ctx.strokeStyle=`rgba(0,212,255,${.06*(1-d/130)})`;ctx.lineWidth=.5;ctx.beginPath();ctx.moveTo(nodes[i].x,nodes[i].y);ctx.lineTo(nodes[j].x,nodes[j].y);ctx.stroke();}
    }
    nodes.forEach(n=>{ctx.fillStyle='rgba(0,212,255,.25)';ctx.beginPath();ctx.arc(n.x,n.y,1.2,0,Math.PI*2);ctx.fill();});
    const sy=(H*((t*.08)%1));
    const g=ctx.createLinearGradient(0,sy-35,0,sy+35);g.addColorStop(0,'transparent');g.addColorStop(.5,'rgba(0,212,255,.035)');g.addColorStop(1,'transparent');
    ctx.fillStyle=g;ctx.fillRect(0,sy-35,W,70);
    requestAnimationFrame(draw);
  }
  resize();window.addEventListener('resize',resize);draw();
})();

// ─────────────────────────────────────────────
// PHENOMENON MINI-VISUALISATIONS (static)
// ─────────────────────────────────────────────
function initPhenomViz(){
  // Helper: resize canvas to its CSS display width
  function prep(id){const c=document.getElementById(id);c.width=c.offsetWidth||300;c.height=52;return [c,c.getContext('2d'),c.width,52];}

  // v1 – harmonic
  {const[c,x,W,H]=prep('v1');x.strokeStyle='#00d4ff';x.lineWidth=1.5;x.beginPath();
  for(let i=0;i<W;i++){const y=H/2+21*Math.sin(i/W*5*Math.PI);i?x.lineTo(i,y):x.moveTo(i,y);}x.stroke();}

  // v2 – heat gradient
  {const[c,x,W,H]=prep('v2');const g=x.createLinearGradient(0,0,W,0);
  g.addColorStop(0,'#ff2200');g.addColorStop(.4,'#ff8800');g.addColorStop(1,'#0044cc');
  x.fillStyle=g;x.fillRect(0,12,W,28);
  x.strokeStyle='rgba(255,255,255,.12)';x.lineWidth=.5;
  for(let i=1;i<9;i++){x.beginPath();x.moveTo(W*i/9,8);x.lineTo(W*i/9,44);x.stroke();}}

  // v3 – EM wave
  {const[c,x,W,H]=prep('v3');
  x.strokeStyle='rgba(0,212,255,.85)';x.lineWidth=1.5;x.beginPath();
  for(let i=0;i<W;i++){const y=H/2+20*Math.sin(i/W*4*Math.PI);i?x.lineTo(i,y):x.moveTo(i,y);}x.stroke();
  x.strokeStyle='rgba(255,140,0,.65)';x.lineWidth=1.2;x.setLineDash([3,3]);x.beginPath();
  for(let i=0;i<W;i++){const y=H/2+20*Math.cos(i/W*4*Math.PI);i?x.lineTo(i,y):x.moveTo(i,y);}x.stroke();x.setLineDash([]);}

  // v4 – refraction
  {const[c,x,W,H]=prep('v4');
  x.strokeStyle='rgba(0,212,255,.18)';x.lineWidth=1;x.setLineDash([4,4]);
  x.beginPath();x.moveTo(0,H/2);x.lineTo(W,H/2);x.stroke();x.setLineDash([]);
  x.strokeStyle='#00d4ff';x.lineWidth=2;
  x.beginPath();x.moveTo(W*.08,4);x.lineTo(W*.5,H/2);x.stroke();
  x.strokeStyle='#ff8c00';x.lineWidth=2;
  x.beginPath();x.moveTo(W*.5,H/2);x.lineTo(W*.72,H-4);x.stroke();
  x.strokeStyle='rgba(100,150,190,.3)';x.lineWidth=.5;x.setLineDash([2,3]);
  x.beginPath();x.moveTo(W*.5,0);x.lineTo(W*.5,H);x.stroke();x.setLineDash([]);}

  // v5 – wavepacket / quantum
  {const[c,x,W,H]=prep('v5');
  x.strokeStyle='rgba(0,212,255,.7)';x.lineWidth=1.5;x.beginPath();
  for(let i=0;i<W;i++){const env=Math.exp(-.5*((i/W-.5)/.18)**2);const y=H/2+22*env*Math.sin(i/W*12*Math.PI);i?x.lineTo(i,y):x.moveTo(i,y);}x.stroke();
  x.strokeStyle='rgba(255,140,0,.4)';x.lineWidth=1;x.beginPath();
  for(let i=0;i<W;i++){const env=Math.exp(-.5*((i/W-.5)/.18)**2);const y=H-6-14*env*env;i?x.lineTo(i,y):x.moveTo(i,y);}x.stroke();}

  // v6 – standing waves
  {const[c,x,W,H]=prep('v6');
  [[1,'rgba(0,212,255,.6)',22],[2,'rgba(255,140,0,.55)',16],[3,'rgba(0,255,136,.45)',11]].forEach(([n,col,A])=>{
    x.strokeStyle=col;x.lineWidth=1.2;x.beginPath();
    for(let i=0;i<W;i++){const y=H/2+A*Math.sin(i/W*n*Math.PI);i?x.lineTo(i,y):x.moveTo(i,y);}x.stroke();
  });}
}
setTimeout(initPhenomViz,120);
window.addEventListener('resize',()=>setTimeout(initPhenomViz,60));

// ─────────────────────────────────────────────
// GEARS
// ─────────────────────────────────────────────
let gA1=0,gA2=0,gRatio=2;
const gSvg=document.getElementById('gearSvg');
const gns=gSvg.namespaceURI;

function makeGearPath(cx,cy,teeth,r,ri){
  const step=2*Math.PI/teeth,pts=[];
  for(let i=0;i<teeth;i++){
    const a0=i*step-step*.32,a1=i*step+step*.32;
    pts.push([ri*Math.cos(a0),ri*Math.sin(a0)],[r*Math.cos(a0),r*Math.sin(a0)],[r*Math.cos(a1),r*Math.sin(a1)],[ri*Math.cos(a1),ri*Math.sin(a1)]);
  }
  return 'M'+pts.map(p=>`${(p[0]+cx).toFixed(2)},${(p[1]+cy).toFixed(2)}`).join('L')+'Z';
}

function buildGearSVG(){
  gSvg.innerHTML='';
  const ratio=gRatio;
  const r1=42,ri1=33,t1=14;
  const r2=r1*ratio,ri2=ri1*ratio,t2=Math.round(t1*ratio);
  const gap=4;
  const cx1=80,cy1=100;
  const cx2=cx1+r1+r2+gap;

  function el(tag,attrs){const e=document.createElementNS(gns,tag);Object.entries(attrs).forEach(([k,v])=>e.setAttribute(k,v));gSvg.appendChild(e);return e;}
  // adjust viewBox
  const vw=cx2+r2+30;gSvg.setAttribute('viewBox',`0 0 ${vw} 200`);

  // gear 1
  const g1=document.createElementNS(gns,'g');g1.setAttribute('id','gg1');gSvg.appendChild(g1);
  const p1=document.createElementNS(gns,'path');p1.setAttribute('d',makeGearPath(0,0,t1,r1,ri1));p1.setAttribute('fill','none');p1.setAttribute('stroke','#00d4ff');p1.setAttribute('stroke-width','1.5');g1.appendChild(p1);
  const c1=document.createElementNS(gns,'circle');c1.setAttribute('r','10');c1.setAttribute('fill','none');c1.setAttribute('stroke','#00d4ff');c1.setAttribute('stroke-width','1');g1.appendChild(c1);
  const s1=document.createElementNS(gns,'circle');s1.setAttribute('r','3');s1.setAttribute('fill','#00d4ff');g1.appendChild(s1);

  // gear 2
  const g2=document.createElementNS(gns,'g');g2.setAttribute('id','gg2');gSvg.appendChild(g2);
  const p2=document.createElementNS(gns,'path');p2.setAttribute('d',makeGearPath(0,0,t2,r2,ri2));p2.setAttribute('fill','none');p2.setAttribute('stroke','#ff8c00');p2.setAttribute('stroke-width','1.5');g2.appendChild(p2);
  const c2=document.createElementNS(gns,'circle');c2.setAttribute('r','14');c2.setAttribute('fill','none');c2.setAttribute('stroke','#ff8c00');c2.setAttribute('stroke-width','1');g2.appendChild(c2);
  const s2=document.createElementNS(gns,'circle');s2.setAttribute('r','4');s2.setAttribute('fill','#ff8c00');g2.appendChild(s2);

  // labels
  function lbl(x,y,txt,col){const t=document.createElementNS(gns,'text');t.setAttribute('x',x);t.setAttribute('y',y);t.setAttribute('text-anchor','middle');t.setAttribute('fill',col);t.setAttribute('font-size','10');t.setAttribute('font-family','monospace');t.textContent=txt;gSvg.appendChild(t);}
  lbl(cx1,cy1+r1+16,'z₁='+t1,'#00d4ff');
  lbl(cx2,cy1+r2+16,'z₂='+t2,'#ff8c00');
  lbl((cx1+cx2)/2,18,'i = '+ratio.toFixed(2),'rgba(96,128,160,.7)');

  function animGears(){
    gA1+=.55;gA2-=.55/ratio;
    document.getElementById('gg1').setAttribute('transform',`translate(${cx1},${cy1}) rotate(${gA1})`);
    document.getElementById('gg2').setAttribute('transform',`translate(${cx2},${cy1}) rotate(${gA2})`);
    requestAnimationFrame(animGears);
  }
  animGears();
}

function updGears(){
  gRatio=parseFloat(document.getElementById('sGR').value);
  document.getElementById('lGR').textContent=gRatio.toFixed(2);
  gA1=0;gA2=0;
  buildGearSVG();
}
buildGearSVG();

// ─────────────────────────────────────────────
// LEVER
// ─────────────────────────────────────────────
function updLever(){
  const fp=parseFloat(document.getElementById('sFulc').value);
  document.getElementById('lFulc').textContent=fp+'%';
  drawLever(fp);
}
function drawLever(fp){
  const cv=document.getElementById('cLever'),ctx=cv.getContext('2d');
  const W=cv.width,H=cv.height;ctx.clearRect(0,0,W,H);
  const pad=28,beamY=H*.5,bL=pad,bR=W-pad,bLen=bR-bL;
  const fx=bL+bLen*fp/100;
  const d1=fx-bL,d2=bR-fx;
  const ratio=d1>0?d2/d1:0;
  const F1=80,F2=d1>0?F1*d1/d2:0;

  // beam
  ctx.strokeStyle='rgba(0,212,255,.75)';ctx.lineWidth=5;ctx.lineCap='round';
  ctx.beginPath();ctx.moveTo(bL,beamY);ctx.lineTo(bR,beamY);ctx.stroke();

  // fulcrum triangle
  ctx.fillStyle='rgba(0,212,255,.2)';ctx.strokeStyle='#00d4ff';ctx.lineWidth=1.5;
  ctx.beginPath();ctx.moveTo(fx,beamY);ctx.lineTo(fx-15,beamY+26);ctx.lineTo(fx+15,beamY+26);ctx.closePath();ctx.fill();ctx.stroke();

  // ground line
  ctx.strokeStyle='rgba(0,212,255,.15)';ctx.lineWidth=1;
  ctx.beginPath();ctx.moveTo(fx-22,beamY+27);ctx.lineTo(fx+22,beamY+27);ctx.stroke();

  // load box left
  const bh=Math.min(52,16+F1*.35);
  ctx.fillStyle='rgba(0,212,255,.12)';ctx.strokeStyle='#00d4ff';ctx.lineWidth=1.5;
  ctx.beginPath();ctx.rect(bL-18,beamY-10-bh,36,bh);ctx.fill();ctx.stroke();
  ctx.fillStyle='#00d4ff';ctx.font='10px monospace';ctx.textAlign='center';
  ctx.fillText(Math.round(F1)+'N',bL,beamY-14-bh);

  // effort arrow right
  const aLen=Math.min(52,12+ratio*10);
  ctx.strokeStyle='#ff8c00';ctx.lineWidth=2;
  ctx.beginPath();ctx.moveTo(bR,beamY-5);ctx.lineTo(bR,beamY-5-aLen);ctx.stroke();
  ctx.fillStyle='#ff8c00';ctx.beginPath();ctx.moveTo(bR,beamY-5-aLen);ctx.lineTo(bR-5,beamY+5-aLen);ctx.lineTo(bR+5,beamY+5-aLen);ctx.closePath();ctx.fill();
  ctx.fillStyle='#ff8c00';ctx.textAlign='center';
  ctx.fillText(Math.abs(F2).toFixed(1)+'N',bR,beamY-aLen-14);

  // dimension labels
  ctx.fillStyle='rgba(80,112,144,.8)';ctx.font='9px monospace';ctx.textAlign='center';
  ctx.fillText('d₁='+d1.toFixed(0),bL+d1/2,beamY+46);
  ctx.fillText('d₂='+d2.toFixed(0),fx+d2/2,beamY+46);
  ctx.fillStyle='#00d4ff';
  ctx.fillText('Выигрыш ×'+ratio.toFixed(2),W/2,H-4);
  ctx.textAlign='left';
}
drawLever(50);

// ─────────────────────────────────────────────
// CRANK-SLIDER
// ─────────────────────────────────────────────
let crA=0;
function drawCrank(){
  const cv=document.getElementById('cCrank'),ctx=cv.getContext('2d');
  const W=cv.width,H=cv.height;ctx.clearRect(0,0,W,H);
  crA+=.028;
  const cx=80,cy=H/2,r=38,L=90;
  const px=cx+r*Math.cos(crA),py=cy+r*Math.sin(crA);
  const slX=cx+r*Math.cos(crA)+Math.sqrt(Math.max(0,L*L-r*r*Math.sin(crA)*Math.sin(crA))),slY=cy;

  // rail
  ctx.strokeStyle='rgba(0,212,255,.15)';ctx.lineWidth=10;ctx.lineCap='round';
  ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(W-12,cy);ctx.stroke();
  // crank circle guide
  ctx.strokeStyle='rgba(0,212,255,.08)';ctx.lineWidth=1;ctx.setLineDash([3,3]);
  ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.stroke();ctx.setLineDash([]);
  // rod
  ctx.strokeStyle='#ff8c00';ctx.lineWidth=3;ctx.lineCap='round';
  ctx.beginPath();ctx.moveTo(px,py);ctx.lineTo(slX,slY);ctx.stroke();
  // crank arm
  ctx.strokeStyle='#00d4ff';ctx.lineWidth=4;
  ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(px,py);ctx.stroke();
  // pivot
  ctx.fillStyle='#00d4ff';ctx.beginPath();ctx.arc(cx,cy,7,0,Math.PI*2);ctx.fill();
  // pin
  ctx.fillStyle='#ff8c00';ctx.beginPath();ctx.arc(px,py,5,0,Math.PI*2);ctx.fill();
  // piston
  ctx.fillStyle='rgba(0,212,255,.15)';ctx.strokeStyle='#00d4ff';ctx.lineWidth=1.5;
  ctx.beginPath();ctx.rect(slX-4,slY-16,28,32);ctx.fill();ctx.stroke();
  ctx.fillStyle='#00d4ff';ctx.beginPath();ctx.arc(slX,slY,4,0,Math.PI*2);ctx.fill();
  // labels
  ctx.fillStyle='rgba(80,112,144,.7)';ctx.font='9px monospace';
  ctx.fillText('кривошип',cx-16,cy-r-6);
  ctx.fillText('шатун',(px+slX)/2-16,Math.min(py,slY)-10);
  ctx.fillText('поршень',slX+2,slY+28);
  requestAnimationFrame(drawCrank);
}
drawCrank();

// ─────────────────────────────────────────────
// PULLEY
// ─────────────────────────────────────────────
let pulleyBlocks=2,pulOffset=0;
function updPulley(){
  pulleyBlocks=parseInt(document.getElementById('sPulley').value);
  document.getElementById('lPulley').textContent=pulleyBlocks;
}
function drawPulley(){
  pulOffset=(pulOffset+.4)%120;
  const cv=document.getElementById('cPulley'),ctx=cv.getContext('2d');
  const W=cv.width,H=cv.height;ctx.clearRect(0,0,W,H);
  const n=pulleyBlocks;
  const cx=W/2,topY=20,rowH=48,loadH=50;
  const advantage=2*n;

  // Fixed blocks at top
  for(let i=0;i<n;i++){
    const bx=cx+(i-(n-1)/2)*34;
    ctx.strokeStyle='#00d4ff';ctx.lineWidth=1.5;
    ctx.beginPath();ctx.arc(bx,topY+12,13,0,Math.PI*2);ctx.stroke();
    ctx.fillStyle='rgba(0,212,255,.2)';ctx.fill();
    ctx.fillStyle='#00d4ff';ctx.beginPath();ctx.arc(bx,topY+12,4,0,Math.PI*2);ctx.fill();
  }
  // ceiling line
  ctx.strokeStyle='rgba(0,212,255,.35)';ctx.lineWidth=2;
  ctx.beginPath();ctx.moveTo(cx-n*20-10,topY);ctx.lineTo(cx+n*20+10,topY);ctx.stroke();

  // Moving blocks
  const movY=topY+rowH*n*0.5+20;
  for(let i=0;i<n-1;i++){
    const bx=cx+(i-(n-2)/2)*34;
    ctx.strokeStyle='#ff8c00';ctx.lineWidth=1.5;
    ctx.beginPath();ctx.arc(bx,movY,11,0,Math.PI*2);ctx.stroke();
    ctx.fillStyle='rgba(255,140,0,.2)';ctx.fill();
    ctx.fillStyle='#ff8c00';ctx.beginPath();ctx.arc(bx,movY,3,0,Math.PI*2);ctx.fill();
  }

  // Ropes (simplified dashed lines animated)
  ctx.strokeStyle='rgba(0,212,255,.5)';ctx.lineWidth=1;ctx.setLineDash([4,4]);
  ctx.lineDashOffset=-pulOffset;
  const rope_y1=topY+25,rope_y2=movY>0?movY:topY+40;
  for(let i=0;i<=n;i++){
    const rx=cx+(i-n/2)*30;
    ctx.beginPath();ctx.moveTo(rx,rope_y1);ctx.lineTo(rx,rope_y2+10);ctx.stroke();
  }
  ctx.setLineDash([]);ctx.lineDashOffset=0;

  // Load
  ctx.fillStyle='rgba(255,140,0,.15)';ctx.strokeStyle='#ff8c00';ctx.lineWidth=1.5;
  ctx.beginPath();ctx.rect(cx-28,Math.min(movY+15,H-loadH-10),56,loadH);ctx.fill();ctx.stroke();
  ctx.fillStyle='#ff8c00';ctx.font='11px monospace';ctx.textAlign='center';
  ctx.fillText('W',cx,Math.min(movY+15,H-loadH-10)+loadH/2+4);

  // Force arrow
  const fax=18;
  ctx.strokeStyle='#00d4ff';ctx.lineWidth=1.5;
  ctx.beginPath();ctx.moveTo(fax,H-20);ctx.lineTo(fax,H-50);ctx.stroke();
  ctx.fillStyle='#00d4ff';ctx.beginPath();ctx.moveTo(fax,H-50);ctx.lineTo(fax-5,H-40);ctx.lineTo(fax+5,H-40);ctx.closePath();ctx.fill();
  ctx.font='9px monospace';ctx.textAlign='center';
  ctx.fillText('F=W/'+advantage,fax,H-5);
  ctx.textAlign='left';

  requestAnimationFrame(drawPulley);
}
drawPulley();

// ─────────────────────────────────────────────
// PENDULUM
// ─────────────────────────────────────────────
let pL=1,pG=9.81,pA0=30,pT0=null;

function updPend(){
  pL=parseFloat(document.getElementById('sL').value);
  pG=parseFloat(document.getElementById('sg').value);
  pA0=parseFloat(document.getElementById('sa').value);
  document.getElementById('lL').textContent=pL.toFixed(2)+' м';
  document.getElementById('lg').textContent=pG.toFixed(2)+' м/с²';
  document.getElementById('la').textContent=pA0+'°';
  const T=2*Math.PI*Math.sqrt(pL/pG);
  const vmax=Math.sqrt(2*pG*pL*(1-Math.cos(pA0*Math.PI/180)));
  document.getElementById('rT').textContent=T.toFixed(3);
  document.getElementById('rV').textContent=vmax.toFixed(3);
  document.getElementById('rF').textContent=(1/T).toFixed(3);
  pT0=null;
}

function drawPendulum(ts){
  if(!pT0)pT0=ts;
  const t=(ts-pT0)/1000;
  const cv=document.getElementById('cPend'),ctx=cv.getContext('2d');
  if(!cv.isConnected){requestAnimationFrame(drawPendulum);return;}
  const W=cv.width,H=cv.height;ctx.clearRect(0,0,W,H);
  // grid
  ctx.strokeStyle='rgba(0,212,255,.03)';ctx.lineWidth=.5;
  for(let x=0;x<W;x+=40){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
  for(let y=0;y<H;y+=40){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}

  const omega=Math.sqrt(pG/pL);
  const theta=pA0*(Math.PI/180)*Math.cos(omega*t);
  const pvx=W/2,pvy=42;
  const scale=Math.min(H-90,W/2-30)/pL;
  const bx=pvx+pL*scale*Math.sin(theta),by=pvy+pL*scale*Math.cos(theta);

  // equilibrium arc
  ctx.strokeStyle='rgba(0,212,255,.06)';ctx.lineWidth=1;
  ctx.beginPath();ctx.arc(pvx,pvy,pL*scale,-Math.PI/2-pA0*Math.PI/180,-Math.PI/2+pA0*Math.PI/180);ctx.stroke();

  // trail
  for(let dt=0;dt<.6;dt+=.018){
    const th1=pA0*(Math.PI/180)*Math.cos(omega*(t-dt));
    const th2=pA0*(Math.PI/180)*Math.cos(omega*(t-dt-.018));
    const x1=pvx+pL*scale*Math.sin(th1),y1=pvy+pL*scale*Math.cos(th1);
    const x2=pvx+pL*scale*Math.sin(th2),y2=pvy+pL*scale*Math.cos(th2);
    ctx.globalAlpha=Math.max(0,(1-dt*1.8)*.25);
    ctx.strokeStyle='#00d4ff';ctx.lineWidth=1;
    ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();
  }
  ctx.globalAlpha=1;

  // pivot mount
  ctx.fillStyle='rgba(0,212,255,.25)';ctx.fillRect(pvx-32,pvy-10,64,10);
  // string
  ctx.strokeStyle='rgba(190,220,255,.55)';ctx.lineWidth=1.5;
  ctx.beginPath();ctx.moveTo(pvx,pvy);ctx.lineTo(bx,by);ctx.stroke();
  // bob glow
  ctx.fillStyle='rgba(0,212,255,.12)';ctx.beginPath();ctx.arc(bx,by,20,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='rgba(0,212,255,.2)';ctx.beginPath();ctx.arc(bx,by,15,0,Math.PI*2);ctx.fill();
  // bob
  ctx.fillStyle='#00aed4';ctx.strokeStyle='#00d4ff';ctx.lineWidth=1.5;
  ctx.beginPath();ctx.arc(bx,by,11,0,Math.PI*2);ctx.fill();ctx.stroke();
  // pivot
  ctx.fillStyle='#00d4ff';ctx.beginPath();ctx.arc(pvx,pvy,4,0,Math.PI*2);ctx.fill();

  // labels
  ctx.fillStyle='rgba(80,112,144,.8)';ctx.font='10px monospace';
  ctx.fillText('L = '+pL.toFixed(2)+' м',10,20);
  ctx.fillText('g = '+pG.toFixed(2)+' м/с²',10,34);
  ctx.fillStyle='#00d4ff';
  ctx.fillText('θ = '+(theta*180/Math.PI).toFixed(1)+'°',10,48);
  // angle indicator
  if(Math.abs(theta)>.01){
    ctx.strokeStyle='rgba(0,212,255,.25)';ctx.lineWidth=.5;
    ctx.beginPath();ctx.moveTo(pvx,pvy);ctx.lineTo(pvx,pvy+pL*scale*.35);ctx.stroke();
  }
  requestAnimationFrame(drawPendulum);
}
updPend();requestAnimationFrame(drawPendulum);

// ─────────────────────────────────────────────
// PROJECTILE
// ─────────────────────────────────────────────
let prV0=50,prAng=45,prH0=0;
function updProj(){
  prV0=parseFloat(document.getElementById('sv0').value);
  prAng=parseFloat(document.getElementById('sang').value);
  prH0=parseFloat(document.getElementById('sh0').value);
  document.getElementById('lv0').textContent=prV0+' м/с';
  document.getElementById('lang').textContent=prAng+'°';
  document.getElementById('lh0').textContent=prH0+' м';
  const g=9.81,rad=prAng*Math.PI/180,vx=prV0*Math.cos(rad),vy=prV0*Math.sin(rad);
  const disc=vy*vy+2*g*prH0,tf=(vy+Math.sqrt(disc))/g;
  const range=vx*tf,hmax=prH0+vy*vy/(2*g);
  document.getElementById('rR').textContent=range.toFixed(1);
  document.getElementById('rH').textContent=hmax.toFixed(1);
  document.getElementById('rTf').textContent=tf.toFixed(2);
  drawProjectile();
}
function drawProjectile(){
  const cv=document.getElementById('cProj'),ctx=cv.getContext('2d');
  const W=cv.width,H=cv.height;ctx.clearRect(0,0,W,H);
  const g=9.81,rad=prAng*Math.PI/180,vx=prV0*Math.cos(rad),vy=prV0*Math.sin(rad);
  const disc=vy*vy+2*g*prH0,tf=(vy+Math.sqrt(disc))/g;
  const range=vx*tf,hmax=prH0+vy*vy/(2*g);
  // grid
  ctx.strokeStyle='rgba(0,212,255,.03)';ctx.lineWidth=.5;
  for(let x=0;x<W;x+=40){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
  for(let y=0;y<H;y+=40){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
  const pad=44;
  const sx=pad,sy=H-pad;
  const scX=(W-2*pad)/Math.max(range,1),scY=(H-2*pad)/Math.max(hmax,prH0+1);
  // ground
  ctx.strokeStyle='rgba(0,212,255,.3)';ctx.lineWidth=1.5;
  ctx.beginPath();ctx.moveTo(sx,sy);ctx.lineTo(W-pad,sy);ctx.stroke();
  // launch height
  if(prH0>0){ctx.strokeStyle='rgba(0,212,255,.15)';ctx.lineWidth=.5;ctx.setLineDash([4,4]);ctx.beginPath();ctx.moveTo(sx,sy-prH0*scY);ctx.lineTo(sx+40,sy-prH0*scY);ctx.stroke();ctx.setLineDash([]);}
  // trajectory gradient stroke
  const steps=300;
  for(let i=0;i<steps;i++){
    const t1=tf*i/steps,t2=tf*(i+1)/steps;
    const x1=sx+vx*t1*scX,y1=sy-(prH0+vy*t1-.5*g*t1*t1)*scY;
    const x2=sx+vx*t2*scX,y2=sy-(prH0+vy*t2-.5*g*t2*t2)*scY;
    const prog=i/steps;
    ctx.strokeStyle=`rgba(0,${Math.round(140+115*prog)},${Math.round(255-100*prog)},.8)`;
    ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();
  }
  // velocity vector
  const vs=Math.min(55/prV0,1)*1.8;
  ctx.strokeStyle='#ff8c00';ctx.lineWidth=2;
  ctx.beginPath();ctx.moveTo(sx,sy-prH0*scY);ctx.lineTo(sx+vx*vs*2,sy-prH0*scY-vy*vs*2);ctx.stroke();
  // angle arc
  ctx.strokeStyle='rgba(255,140,0,.4)';ctx.lineWidth=1;
  ctx.beginPath();ctx.arc(sx,sy-prH0*scY,22,-rad,0);ctx.stroke();
  // apex
  const tApex=vy/g,xApex=sx+vx*tApex*scX,yApex=sy-hmax*scY;
  ctx.strokeStyle='rgba(0,212,255,.2)';ctx.lineWidth=.5;ctx.setLineDash([3,3]);
  ctx.beginPath();ctx.moveTo(xApex,yApex);ctx.lineTo(xApex,sy);ctx.stroke();ctx.setLineDash([]);
  // labels
  ctx.fillStyle='rgba(80,112,144,.8)';ctx.font='10px monospace';
  ctx.fillText('R = '+range.toFixed(1)+' м',W-155,18);
  ctx.fillText('H = '+hmax.toFixed(1)+' м',W-115,32);
  ctx.fillStyle='#ff8c00';ctx.fillText('v₀='+prV0+'м/с',sx+4,sy-prH0*scY-14);
  ctx.fillText('θ='+prAng+'°',sx+30,sy-prH0*scY+14);
  // dots
  ctx.fillStyle='#00d4ff';ctx.beginPath();ctx.arc(sx,sy-prH0*scY,5,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#ff4455';ctx.beginPath();ctx.arc(sx+range*scX,sy,5,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='rgba(0,212,255,.8)';ctx.beginPath();ctx.arc(xApex,yApex,4,0,Math.PI*2);ctx.fill();
}
updProj();

// ─────────────────────────────────────────────
// OHM'S LAW
// ─────────────────────────────────────────────
let oU=12,oR=100,oT0=null;
function updOhm(){
  oU=parseFloat(document.getElementById('sU').value);
  oR=parseFloat(document.getElementById('sR').value);
  document.getElementById('lU').textContent=oU+' В';
  document.getElementById('lR').textContent=oR+' Ом';
  const I=oU/oR,P=oU*I;
  document.getElementById('rI').textContent=I.toFixed(4);
  document.getElementById('rP').textContent=P.toFixed(3);
  document.getElementById('rW').textContent=(P*3.6).toFixed(3);
}
function drawOhm(ts){
  if(!oT0)oT0=ts;
  const t=(ts-oT0)/1000;
  const cv=document.getElementById('cOhm'),ctx=cv.getContext('2d');
  if(!cv.isConnected){requestAnimationFrame(drawOhm);return;}
  const W=cv.width,H=cv.height;ctx.clearRect(0,0,W,H);
  const I=oU/oR,speed=Math.max(.15,Math.min(4,I*15));
  // grid
  ctx.strokeStyle='rgba(0,212,255,.03)';ctx.lineWidth=.5;
  for(let x=0;x<W;x+=40){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
  for(let y=0;y<H;y+=40){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
  // circuit frame
  const cx=W/2,cy=H/2,lw=210,lh=130;
  const L=cx-lw/2,R=cx+lw/2,T=cy-lh/2,B=cy+lh/2;
  ctx.strokeStyle='rgba(0,212,255,.45)';ctx.lineWidth=2;
  ctx.beginPath();ctx.moveTo(L,T);ctx.lineTo(R,T);ctx.lineTo(R,B);ctx.lineTo(L,B);ctx.lineTo(L,T);ctx.stroke();
  // battery left side
  const bcy=cy,bx=L;
  ctx.strokeStyle='#00d4ff';ctx.lineWidth=2;
  [[bx-9,bx+9,bcy-16],[bx-5,bx+5,bcy-9],[bx-9,bx+9,bcy],[bx-5,bx+5,bcy+7]].forEach(([x1,x2,y],i)=>{
    ctx.lineWidth=i%2===0?2:1;ctx.beginPath();ctx.moveTo(x1,y);ctx.lineTo(x2,y);ctx.stroke();
  });
  ctx.fillStyle='#00d4ff';ctx.font='10px monospace';ctx.textAlign='center';
  ctx.fillText('+',bx-1,bcy-20);ctx.fillText('−',bx-1,bcy+19);
  ctx.fillStyle='rgba(80,112,144,.7)';ctx.fillText(oU+'В',bx,bcy+34);
  // resistor top
  const rx=cx,ry=T;
  ctx.strokeStyle='#ff8c00';ctx.lineWidth=1.5;
  ctx.beginPath();ctx.rect(rx-32,ry-10,64,20);ctx.stroke();
  ctx.fillStyle='rgba(255,140,0,.08)';ctx.fill();
  ctx.strokeStyle='rgba(255,140,0,.5)';ctx.lineWidth=1;ctx.beginPath();
  const zs=6,zw=64/zs;for(let i=0;i<zs;i++){const zx=rx-32+i*zw;const zy=ry+(i%2===0?-6:6);i===0?ctx.moveTo(zx,ry):ctx.lineTo(zx,zy);}
  ctx.lineTo(rx+32,ry);ctx.stroke();
  ctx.fillStyle='#ff8c00';ctx.textAlign='center';ctx.fillText(oR+'Ω',rx,T-14);
  // current arrows on wires
  const arrowPts=[[cx+80,T],[R,cy],[cx-80,B],[L,cy+40]];
  arrowPts.forEach(([ax,ay])=>{
    ctx.fillStyle='rgba(0,212,255,.4)';ctx.save();ctx.translate(ax,ay);
    const isHoriz=Math.abs(ax-cx)>Math.abs(ay-cy);
    ctx.rotate(isHoriz?(ax>cx?0:Math.PI):(ay>cy?Math.PI/2:-Math.PI/2));
    ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(-6,4);ctx.lineTo(-6,-4);ctx.closePath();ctx.fill();ctx.restore();
  });
  // animated electrons
  const n=Math.max(4,Math.min(18,Math.floor(I*100)));
  const perim=2*(lw+lh);
  for(let i=0;i<n;i++){
    const phase=(t*speed*60+i*(perim/n))%perim;
    let ex,ey;
    if(phase<lw){ex=L+phase;ey=T;}
    else if(phase<lw+lh){ex=R;ey=T+(phase-lw);}
    else if(phase<2*lw+lh){ex=R-(phase-lw-lh);ey=B;}
    else{ex=L;ey=B-(phase-2*lw-lh);}
    const a=.4+.5*Math.sin(i*1.3+t*2);
    ctx.fillStyle=`rgba(0,212,255,${a})`;
    ctx.beginPath();ctx.arc(ex,ey,2.5,0,Math.PI*2);ctx.fill();
  }
  // labels
  ctx.fillStyle='rgba(0,212,255,.7)';ctx.font='11px monospace';ctx.textAlign='center';
  ctx.fillText('I = '+I.toFixed(4)+' А',cx,B+22);
  ctx.textAlign='left';
  requestAnimationFrame(drawOhm);
}
updOhm();requestAnimationFrame(drawOhm);

// ─────────────────────────────────────────────
// TAB SWITCHING
// ─────────────────────────────────────────────
function showTab(name,btn){
  document.querySelectorAll('.calc-panel').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.ct').forEach(t=>t.classList.remove('active'));
  document.getElementById('pnl-'+name).classList.add('active');
  btn.classList.add('active');
  if(name==='projectile')drawProjectile();
}

// ─────────────────────────────────────────────
// OCTAHEDRON (Canvas 2D)
// ─────────────────────────────────────────────
let octA=0;
function drawOcta(){
  const cv=document.getElementById('cOcta'),ctx=cv.getContext('2d');
  const W=cv.width,H=cv.height;ctx.clearRect(0,0,W,H);
  octA+=.009;
  const r=52;
  const verts=[[0,r,0],[0,-r,0],[r,0,0],[-r,0,0],[0,0,r],[0,0,-r]];
  function ry(v,a){return[v[0]*Math.cos(a)+v[2]*Math.sin(a),v[1],-v[0]*Math.sin(a)+v[2]*Math.cos(a)];}
  function rx(v,a){return[v[0],v[1]*Math.cos(a)-v[2]*Math.sin(a),v[1]*Math.sin(a)+v[2]*Math.cos(a)];}
  function proj(v){const z=v[2]+280,s=220/z;return[W/2+v[0]*s,H/2+v[1]*s,v[2]];}
  const rot=verts.map(v=>rx(ry(v,octA),octA*.38));
  const p=rot.map(proj);
  const faces=[[0,2,4],[0,2,5],[0,3,4],[0,3,5],[1,2,4],[1,2,5],[1,3,4],[1,3,5]];
  faces.map(f=>({f,z:(rot[f[0]][2]+rot[f[1]][2]+rot[f[2]][2])/3})).sort((a,b)=>a.z-b.z).forEach(({f})=>{
    const [a,b,c]=f.map(i=>p[i]);
    ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(b[0],b[1]);ctx.lineTo(c[0],c[1]);ctx.closePath();
    ctx.fillStyle='rgba(0,212,255,.04)';ctx.fill();ctx.strokeStyle='rgba(0,212,255,.5)';ctx.lineWidth=1;ctx.stroke();
  });
  requestAnimationFrame(drawOcta);
}
drawOcta();

// ─────────────────────────────────────────────
// WIREFRAME SPHERE
// ─────────────────────────────────────────────
let sphA=0;
function drawSphere(){
  const cv=document.getElementById('cSphere'),ctx=cv.getContext('2d');
  const W=cv.width,H=cv.height;ctx.clearRect(0,0,W,H);
  sphA+=.007;
  const r=52;
  function pt(lat,lon){
    const x0=r*Math.cos(lat)*Math.cos(lon+sphA),y0=r*Math.sin(lat),z0=r*Math.cos(lat)*Math.sin(lon+sphA);
    const s=220/(z0+280);return[W/2+x0*s,H/2+y0*s,z0];}
  const lats=8,lons=12;
  for(let i=0;i<=lats;i++){
    const lat=-Math.PI/2+Math.PI*i/lats;
    ctx.beginPath();let f=true;
    for(let j=0;j<=60;j++){const p=pt(lat,j/60*Math.PI*2);f?(ctx.moveTo(p[0],p[1]),f=false):ctx.lineTo(p[0],p[1]);}
    const vis=(Math.sin(lat)+1)/2;ctx.strokeStyle=`rgba(0,212,255,${.08+.25*vis})`;ctx.lineWidth=.8;ctx.stroke();
  }
  for(let i=0;i<lons;i++){
    const lon=i/lons*Math.PI*2;
    ctx.beginPath();let f=true;
    for(let j=0;j<=40;j++){const p=pt(-Math.PI/2+Math.PI*j/40,lon);f?(ctx.moveTo(p[0],p[1]),f=false):ctx.lineTo(p[0],p[1]);}
    const vis=(Math.cos(lon+sphA)+1)/2;ctx.strokeStyle=`rgba(0,212,255,${.1+.3*vis})`;ctx.lineWidth=.8;ctx.stroke();
  }
  requestAnimationFrame(drawSphere);
}
drawSphere();

// ─────────────────────────────────────────────
// SCROLL FADE-IN
// ─────────────────────────────────────────────
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('vis');});
},{threshold:.08});
document.querySelectorAll('.fi').forEach(el=>obs.observe(el));
