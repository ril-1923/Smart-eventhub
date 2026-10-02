import {Ev} from './types'
const rows:[string,string,string,number,number][]=[
['AI Innovation Summit','Technology','Chennai',999,3],['Future Web Conference','Technology','Bengaluru',1499,12],['Cybersecurity Connect','Technology','Chennai',799,6],['Startup Tech Expo','Technology','Hyderabad',500,20],
['Chennai Music Nights','Music','Chennai',1200,2],['Indie Waves Festival','Music','Mumbai',2500,25],['Sunset Beats','Music','Goa',1800,9],
['Chennai Marathon','Sports','Chennai',400,5],['City Cricket Championship','Sports','Delhi',600,15],['Football Fan Fest','Sports','Kolkata',350,8],
['Startup Growth Summit','Business','Chennai',1500,4],['Digital Business Forum','Business','Pune',2000,18],['Entrepreneur Meetup','Business','Chennai',0,1],
['Chennai Food Festival','Food & Drink','Chennai',300,6],['Street Food Carnival','Food & Drink','Mumbai',250,11],['South Indian Food Expo','Food & Drink','Coimbatore',450,14],
['Career Development Workshop','Education','Chennai',200,7],['Coding Bootcamp','Education','Bengaluru',3000,22],['Design Thinking Workshop','Workshops','Chennai',900,10],['Pottery Weekend Workshop','Workshops','Pune',700,13],
['Cultural Heritage Festival','Festivals','Madurai',150,16],['Summer Festival','Festivals','Chennai',500,4],['City Arts Festival','Festivals','Delhi',400,19]]
const orgs=['Nimbus Events','BlueOrbit Live','Coastline Collective','Apex Gatherings']
export const CATEGORIES=[['Technology','cpu'],['Music','music-note-beamed'],['Sports','trophy'],['Business','briefcase'],['Food & Drink','cup-hot'],['Education','book'],['Workshops','tools'],['Festivals','balloon']]
export const events:Ev[]=rows.map((r,i)=>({id:i+1,title:r[0],category:r[1],location:r[2],price:r[3],
 description:`${r[0]} is a flagship ${r[1].toLowerCase()} experience in ${r[2]} with expert speakers, hands-on sessions and great networking.`,
 date:new Date(Date.now()+r[4]*864e5).toISOString().slice(0,10),time:`${9+(i%4)*2}:00`,venue:`${r[2]} Convention Centre`,address:`12 Central Avenue, ${r[2]}`,
 capacity:300+i*20,registered:120+((i*53)%160),rating:+(4+((i*7)%10)/10).toFixed(1),organizer:orgs[i%4],
 image:`https://picsum.photos/seed/eventhub${i}/800/500`,tags:[r[1].toLowerCase(),r[2].toLowerCase()],featured:i%4===0,trending:i%3===0}))
export const TICKETS:Record<string,number>={General:1,VIP:2,Premium:3.5}
export const inr=(n:number)=>n===0?'Free':'₹'+n.toLocaleString('en-IN')
export function aiFind(q:string){
 const s=q.toLowerCase();const cat=CATEGORIES.map(c=>c[0]).find(c=>s.includes(c.toLowerCase().split(' ')[0]))||(s.includes('food')?'Food & Drink':undefined)
 const city=[...new Set(events.map(e=>e.location))].find(c=>s.includes(c.toLowerCase()))
 const m=s.match(/under\s*₹?\s*(\d+)/);const max=m?+m[1]:undefined;const wk=/weekend|soon|this week/.test(s)
 return events.map(e=>{const why:string[]=[];let sc=0
  if(cat&&e.category===cat){sc++;why.push(`your ${cat.toLowerCase()} preference`)}
  if(city&&e.location===city){sc++;why.push(`${city} location`)}
  if(max!==undefined&&e.price<=max){sc++;why.push(`budget under ₹${max}`)}
  if(wk&&(+new Date(e.date)-Date.now())<7*864e5){sc++;why.push('happening this week')}
  return {e,sc,why}}).filter(r=>r.sc>0&&r.sc>=[cat,city,max,wk||undefined].filter(x=>x!==undefined).length).sort((a,b)=>b.sc-a.sc).map(r=>({e:r.e,why:'Matches '+r.why.join(', ')+'.'}))}
export const saveEvents=()=>localStorage.setItem('seh-events',JSON.stringify(events))
try{const s=localStorage.getItem('seh-events');if(s)events.splice(0,events.length,...JSON.parse(s))}catch{}
