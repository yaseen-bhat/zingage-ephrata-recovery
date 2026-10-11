import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { Workbook, SpreadsheetFile, FileBlob } from '@oai/artifact-tool';
import { people, dates, dailyCaps, actions, deferred } from './plan.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const previewDir=path.join(root,'build','previews');
await fs.mkdir(previewDir,{recursive:true});
const wb=Workbook.create();
const cap=wb.worksheets.add('Capacity');
const day=wb.worksheets.add('Daily plan');
const log=wb.worksheets.add('Work log');
const input=wb.worksheets.add('Inputs');
const navy='#26364A', amber='#FFF2CD', pale='#EFF3F7', red='#FCE4E4';
const date=v=>new Date(`${v}T00:00:00Z`);
const header=(s,r)=>{s.getRange(r).format={fill:navy,font:{name:'Arial',size:10,bold:true,color:'#FFFFFF'},horizontalAlignment:'center',verticalAlignment:'center',wrapText:true,rowHeight:32};};
const put=(s,addr,v)=>s.getRange(addr).values=[[v]];
const formula=(s,addr,v)=>s.getRange(addr).formulas=[[v]];
const base=(s,range,widths)=>{s.showGridLines=false;s.getRange(range).format={font:{name:'Arial',size:10,color:'#243244'},verticalAlignment:'center',rowHeight:25};widths.forEach((w,i)=>s.getRangeByIndexes(0,i,range.match(/\d+$/)[0]*1,1).format.columnWidth=w);};
const warn=(s,r)=>{s.getRange(r).conditionalFormats.add('notContainsText',{text:'OK',format:{fill:red,font:{color:'#A4262C',bold:true}}});};

base(input,'A1:H53',[39,17,14,15,15,17,16,17]);
put(input,'A2','Inputs and assumptions');input.getRange('A2').format.font={size:14,bold:true};
put(input,'A3','Amber cells are editable assumptions. Source limits and approval boundaries remain controlling.');
input.getRange('A5:D10').values=[['Person','Window hours','Coverage min','Ephrata cap'],...people.map(p=>p.slice(0,4))];header(input,'A5:D5');
input.getRange('B6:D10').setNumberFormat('0.00');input.getRange('B6:B10').format.fill=amber;
input.getRange('B7:B8').format.fill=amber;put(input,'F6','Sourced 7.5h ceiling');put(input,'F7','36h proposed split');put(input,'F8','25h proposed split');put(input,'F9','34h total; 14h protected');put(input,'F10','24h wider book; 9h Ephrata');
put(input,'A12','Strategists combined ceiling');put(input,'B12',61);
put(input,'A14','Planning start');put(input,'B14',date(dates[0]));
put(input,'A15','Planning end');put(input,'B15',date(dates.at(-1)));
put(input,'A16','Durant export target');put(input,'B16',date('2026-09-11'));
put(input,'A17','Durant final service day');put(input,'B17',date('2026-09-18'));
put(input,'A18','Medford board review');put(input,'B18',date('2026-09-22'));input.getRange('B14:B18').setNumberFormat('mmm d, yyyy');
input.getRange('A20:H30').values=[['Day','Date','Head h','Priya h','Jordan h','CSM project h','Queue h','Nate Ephrata h'],...dates.map((d,i)=>[i+1,date(d),...dailyCaps[i]])];header(input,'A20:H20');
input.getRange('B21:B30').setNumberFormat('ddd, mmm d');input.getRange('C21:H30').setNumberFormat('0.00');input.getRange('C21:H30').format.fill=amber;
put(input,'A31','Daily profiles and the individual strategist split require Day 1 calendar confirmation.');
input.getRange('A33:F40').values=[
 ['Action','Low h','High h','Role','Source','Base budget'],
 ['Root-cause triage',2,3,'Strategist','Capacity §3',2],
 ['WellSky permission/config audit',6,10,'Engineer','Capacity §3',6],
 ['Routing / on-call config review',3,6,'Engineer','Capacity §3',3],
 ['Verification call + follow-up',1.5,3,'Strategist','Capacity §3',3],
 ['Adoption pull + outreach',2,4,'Strategist/CSM','Capacity §3',2],
 ['Durant offboarding',5,9,'Strategist/CSM','Capacity §3',9],
 ['Medford scoping + proposal',2,4,'Strategist','Capacity §3',4],
 ];header(input,'A33:F33');input.getRange('B34:C40').setNumberFormat('0.00');input.getRange('F34:F40').setNumberFormat('0.00');input.getRange('D34:E40').format.wrapText=true;input.getRange('A34:F40').format.rowHeight=36;
put(input,'A42','References');input.getRange('A42').format.font.bold=true;
put(input,'A43','Deployment team capacity and decision boundaries for the ten-business-day window.md');
put(input,'A44','Sections 1–4: ceilings, protected coverage, engineering cap, estimates and authority.');
put(input,'A46','Senior Helpers Ephrata — Account History.md');
put(input,'A47','Kickoff; Aug 3–25 tickets/tests/adoption; Sep 8 recurrence and HS-48251.');
put(input,'A49',"Visiting Angels Durant and Affordable at Home Care Medford's account histories.md");
put(input,'A50','Durant Aug 26 / Sep 2 commitments; Sep 8 pending export. Medford Aug 26–Sep 8.');
put(input,'A52','All case inputs are the September 8 snapshot. No live staffing or customer result is inferred.');
input.freezePanes.freezeRows(5);input.tabColor='#60758D';

const end=5+actions.length;
base(log,`A1:M${end}`,[10,7,15,35,15,10,49,45,47,17,44,43,15]);
put(log,'A2','Execution work log');log.getRange('A2').format.font={size:14,bold:true};
put(log,'A3','Planned actions only. Enter actual evidence before marking Done; blocked work needs a next step.');
log.getRange(`A5:M${end}`).values=[['ID','Day','Date','Owner','Account','Hours','Action','Prerequisite','Expected evidence','Status','Actual evidence','Next step','Row check'],...actions.map(a=>[a[0],a[1],null,a[2],a[3],a[4],a[5],a[6],a[7],'Planned',null,null,null])];header(log,'A5:M5');
log.getRange(`B6:B${end}`).format.fill=amber;log.getRange(`F6:F${end}`).format.fill=amber;log.getRange(`J6:L${end}`).format.fill=amber;
log.getRange(`C6:C${end}`).setNumberFormat('mmm d, yyyy');log.getRange(`C6:C${end}`).format.horizontalAlignment='center';log.getRange(`F6:F${end}`).setNumberFormat('0.00');
log.getRange(`D6:M${end}`).format.wrapText=true;log.getRange(`A6:M${end}`).format.rowHeight=58;
log.getRange(`G6:L${end}`).format.verticalAlignment='top';
log.getRange(`D6:D${end}`).dataValidation={rule:{type:'list',values:people.map(p=>p[0])}};
log.getRange(`E6:E${end}`).dataValidation={rule:{type:'list',values:['Ephrata','Durant','Medford','Portfolio','Coverage']}};
log.getRange(`J6:J${end}`).dataValidation={rule:{type:'list',values:['Planned','In progress','Blocked','Done']}};
log.dataValidations.add({range:`B6:B${end}`,rule:{type:'whole',operator:'between',formula1:1,formula2:10}});
for(let r=6;r<=end;r++){
 formula(log,`C${r}`,`=IF(AND(ISNUMBER(B${r}),B${r}>=1,B${r}<=10,MOD(B${r},1)=0),INDEX('Inputs'!$B$21:$B$30,B${r}),"")`);
 formula(log,`M${r}`,`=IF(OR(COUNTBLANK(B${r}:F${r})>0,NOT(ISNUMBER(F${r})),F${r}<0),"INPUT",IF(COUNTIFS('Inputs'!$A$6:$A$10,D${r})<>1,"OWNER",IF(NOT(OR(E${r}="Ephrata",E${r}="Durant",E${r}="Medford",E${r}="Portfolio",E${r}="Coverage")),"ACCOUNT",IF(OR(C${r}<'Inputs'!$B$14,C${r}>'Inputs'!$B$15,WEEKDAY(C${r},2)>5,C${r}<>WORKDAY('Inputs'!$B$14,B${r}-1)),"DATE",IF(AND(J${r}="Done",K${r}=""),"EVIDENCE",IF(AND(J${r}="Blocked",L${r}=""),"NEXT STEP","OK"))))))`);
}
warn(log,`M6:M${end}`);log.freezePanes.freezeRows(5);log.freezePanes.freezeColumns(4);
const rowFor=id=>actions.findIndex(a=>a[0]===id)+6;
const hrs=`'Work log'!$F$6:$F$${end}`, owners=`'Work log'!$D$6:$D$${end}`, accts=`'Work log'!$E$6:$E$${end}`, days=`'Work log'!$B$6:$B$${end}`;

base(day,'A1:I65',[8,15,35,22,12,12,12,15,52]);put(day,'A2','Daily capacity');day.getRange('A2').format.font={size:14,bold:true};
put(day,'A3','Dates are the simulation window. Proposed availability is not proof of a confirmed calendar.');
day.getRange('A5:I5').values=[['Day','Date','Person','Scope','Cap h','Booked h','Free h','Check','Focus']];header(day,'A5:I5');
const scopes=['All projects','All projects','All projects','Project only','Protected coverage','Ephrata only'];
for(let i=0;i<10;i++)for(let j=0;j<6;j++){
 const r=6+i*6+j, who=people[j<3?j:j<5?3:4][0], inputRow=i+21, inputCol=String.fromCharCode(67+j);
 const focus=actions.filter(a=>a[1]===i+1&&a[2]===who&&(j===4?a[3]==='Coverage':a[3]!=='Coverage')).map(a=>a[0]).join(', ') || 'No booked project work';
 day.getRange(`A${r}:D${r}`).values=[[i+1,null,who,scopes[j]]];put(day,`I${r}`,focus);
 formula(day,`B${r}`,`='Inputs'!B${inputRow}`);
 formula(day,`E${r}`,`=IF(COUNTBLANK('Inputs'!${inputCol}${inputRow})>0,"",'Inputs'!${inputCol}${inputRow})`);
 formula(day,`F${r}`,`=SUMIFS(${hrs},${owners},C${r},${days},A${r},${accts},"${j===4?'Coverage':'<>Coverage'}")`);
 formula(day,`G${r}`,`=IF(ISNUMBER(E${r}),E${r}-F${r},"")`);
 formula(day,`H${r}`,`=IF(NOT(ISNUMBER(E${r})),"MISSING",IF(E${r}<0,"INVALID",IF(OR(B${r}<'Inputs'!$B$14,B${r}>'Inputs'!$B$15,WEEKDAY(B${r},2)>5,B${r}<>WORKDAY('Inputs'!$B$14,A${r}-1)),"DATE",IF(G${r}<0,"OVER","OK"))))`);
 if(i%2===1)day.getRange(`A${r}:I${r}`).format.fill=pale;
}
day.getRange('B6:B65').setNumberFormat('ddd, mmm d');day.getRange('B6:B65').format.horizontalAlignment='center';day.getRange('E6:G65').setNumberFormat('0.00');day.getRange('C6:D65').format.wrapText=true;day.getRange('A6:I65').format.rowHeight=38;
warn(day,'H6:H65');day.freezePanes.freezeRows(5);day.freezePanes.freezeColumns(4);

base(cap,'A1:G49',[39,14,14,14,14,14,39]);cap.tabColor=navy;
put(cap,'A2','Ten-day capacity plan');cap.getRange('A2').format.font={size:14,bold:true};
put(cap,'A3','September 8–21, 2026. Hours reflect a proposed operating plan, with recovery still unverified.');
cap.getRange('A5:G5').values=[['Person','Ceiling h','Project h','Queue h','Used h','Free h','Capacity check']];header(cap,'A5:G5');
for(let i=0;i<5;i++){
 const r=i+6;put(cap,`A${r}`,people[i][0]);formula(cap,`B${r}`,`='Inputs'!B${r}`);
 formula(cap,`C${r}`,`=SUMIFS(${hrs},${owners},A${r},${accts},"<>Coverage")`);
 formula(cap,`D${r}`,`=SUMIFS(${hrs},${owners},A${r},${accts},"Coverage")`);
 formula(cap,`E${r}`,`=SUM(C${r}:D${r})`);formula(cap,`F${r}`,`=B${r}-E${r}`);
 formula(cap,`G${r}`,`=IF(COUNTBLANK('Inputs'!B${r})>0,"MISSING INPUT",IF(B${r}<0,"INVALID INPUT",IF(F${r}<0,"OVER CAPACITY","OK")))`);
}
put(cap,'A11','Total stated ceiling');for(const c of ['B','C','D','E','F'])formula(cap,`${c}11`,`=SUM(${c}6:${c}10)`);cap.getRange('A11:G11').format.font.bold=true;
cap.getRange('B6:F11').setNumberFormat('0.00');cap.getRange('A6:A10').format.wrapText=true;cap.getRange('A6:G10').format.rowHeight=38;warn(cap,'G6:G10');
put(cap,'A13',"Nate's 15h free balance is preserved for the wider account book, not Ephrata reserve.");
put(cap,'A14','Priya/Jordan ceilings are a proposed 36h/25h split of the sourced 61h combined ceiling.');
cap.getRange('A16:C16').values=[['Rule','Measured','Limit']];header(cap,'A16:C16');put(cap,'G16','Decision');header(cap,'G16');
const checks=[
 ['Ephrata engineering hours',`=SUMIFS(${hrs},${owners},'Inputs'!A10,${accts},"Ephrata")`,`='Inputs'!D10`,'=IF(B17>C17,"ESCALATE: engineering cap","OK")'],
 ['Protected queue hours',`=SUMIFS(${hrs},${owners},'Inputs'!A9,${accts},"Coverage")`,`='Inputs'!C9`,'=IF(B18<C18,"GAP: protect queue hours","OK")'],
 ['Strategist split hours',"=SUM('Inputs'!B7:B8)","='Inputs'!B12",'=IF(B19<>C19,"REVIEW: individual split","OK")'],
 ['Daily capacity flags','=COUNTIFS(\'Daily plan\'!H6:H65,"<>OK")',0,'=IF(B20>0,"REVIEW: daily conflicts","OK")'],
 ['Daily profiles vs ceilings (h)',"=ABS(SUM('Inputs'!C21:C30)-'Inputs'!B6)+ABS(SUM('Inputs'!D21:D30)-'Inputs'!B7)+ABS(SUM('Inputs'!E21:E30)-'Inputs'!B8)+ABS(SUM('Inputs'!F21:F30)-('Inputs'!B9-'Inputs'!C9))+ABS(SUM('Inputs'!G21:G30)-'Inputs'!C9)+ABS(SUM('Inputs'!H21:H30)-'Inputs'!D10)",0,'=IF(B21>0,"REVIEW: daily profiles","OK")'],
 ['Missing capacity inputs',"=COUNTBLANK('Inputs'!B6:B10)+COUNTBLANK('Inputs'!B12)+COUNTBLANK('Inputs'!C9)+COUNTBLANK('Inputs'!D10)+COUNTBLANK('Inputs'!B14:B18)+COUNTBLANK('Inputs'!B21:H30)",0,'=IF(B22>0,"MISSING: capacity input","OK")'],
 ['Work log row flags',`=COUNTIFS('Work log'!M6:M${end},"<>OK")`,0,'=IF(B23>0,"REVIEW: work log row","OK")'],
 ['Fixed source boundaries retained',"=IF(AND('Inputs'!B6<=7.5,'Inputs'!B9<=34,'Inputs'!B10<=24,'Inputs'!C9=14,'Inputs'!D10=9,'Inputs'!B12=61,'Inputs'!B14=DATE(2026,9,8),'Inputs'!B15=DATE(2026,9,21),'Inputs'!B16=DATE(2026,9,11),'Inputs'!B17=DATE(2026,9,18),'Inputs'!B18=DATE(2026,9,22)),1,0)",1,'=IF(B24<>C24,"REVIEW: source boundary","OK")'],
 ['Durant export planned by target',`='Work log'!C${rowFor('J08')}`,"='Inputs'!B16",'=IF(NOT(ISNUMBER(B25)),"MISSING: export date",IF(B25>C25,"RISK: export target","OK"))'],
 ['Durant deactivation on final day',`='Work log'!C${rowFor('D14')}`,"='Inputs'!B17",'=IF(NOT(ISNUMBER(B26)),"MISSING: exit date",IF(B26<>C26,"ESCALATE: exit date","OK"))'],
 ['Medford proposal before review',`='Work log'!C${rowFor('J16')}`,"='Inputs'!B18",'=IF(NOT(ISNUMBER(B27)),"MISSING: proposal date",IF(B27>=C27,"RISK: board proposal","OK"))'],
];
checks.forEach((v,i)=>{const r=17+i;put(cap,`A${r}`,v[0]);formula(cap,`B${r}`,v[1]);typeof v[2]==='string'?formula(cap,`C${r}`,v[2]):put(cap,`C${r}`,v[2]);formula(cap,`G${r}`,v[3]);});
cap.getRange('B17:C23').setNumberFormat('0.00');cap.getRange('B25:C27').setNumberFormat('mmm d');warn(cap,'G17:G27');
put(cap,'A29','Checks show allocation feasibility. They do not imply any task is completed or any repair is verified.');
cap.getRange('A32:B32').values=[['Account / activity','Hours']];header(cap,'A32:B32');put(cap,'G32','Funded outcome / boundary');header(cap,'G32');
const outcomes=['Investigation and conditional verification; 9h engineering cap','Validated export, invoice and agreed September 18 exit','Scoping and proposal; restart not committed','Allocation review and dependency coordination','Standing queue coverage across all active accounts'];
['Ephrata','Durant','Medford','Portfolio','Coverage'].forEach((a,i)=>{const r=33+i;put(cap,`A${r}`,a);formula(cap,`B${r}`,`=SUMIFS(${hrs},${accts},A${r})`);put(cap,`G${r}`,outcomes[i]);});
cap.getRange('B33:B37').setNumberFormat('0.00');cap.getRange('G33:G37').format.wrapText=true;cap.getRange('A33:G37').format.rowHeight=48;
put(cap,'A39','Unallocated nonengineering hours');formula(cap,'B39','=SUM(F6:F9)');cap.getRange('B39').setNumberFormat('0.00');
put(cap,'A40','Reserves must be reassigned by owner and date; spare strategist hours cannot substitute for engineering.');
cap.getRange('A43:B43').values=[['Deferred work','Owner']];header(cap,'A43:B43');put(cap,'G43','Trigger and consequence');header(cap,'G43');
deferred.forEach((v,i)=>{const r=44+i;put(cap,`A${r}`,v[0]);put(cap,`B${r}`,v[1]);put(cap,`G${r}`,`${v[2]}. ${v[3]}.`);});
cap.getRange('A44:A47').format.wrapText=true;cap.getRange('G44:G47').format.wrapText=true;cap.getRange('A44:G47').format.rowHeight=78;

// Independent reconciliation from original plan rows, followed by actual formula mutations.
const totals={};const personTotals={};for(const a of actions){totals[a[3]]=(totals[a[3]]||0)+a[4];personTotals[a[2]]=(personTotals[a[2]]||0)+a[4];}
assert.deepEqual(totals,{Ephrata:47,Portfolio:5.5,Durant:10,Medford:5,Coverage:14});
assert.equal(actions.filter(a=>a[2]===people[4][0]).reduce((s,a)=>s+a[4],0),9);
for(let i=0;i<10;i++)for(let j=0;j<6;j++){
 const who=people[j<3?j:j<5?3:4][0];const used=actions.filter(a=>a[1]===i+1&&a[2]===who&&(j===4?a[3]==='Coverage':a[3]!=='Coverage')).reduce((s,a)=>s+a[4],0);
 assert(used<=dailyCaps[i][j],`Day ${i+1}, ${who} exceeds cap`);
}
wb.recalculate();
const value=(s,c)=>s.getRange(c).values[0][0];
assert.deepEqual(cap.getRange('B33:B37').values.flat(),[47,10,5,5.5,14]);
assert.equal(value(cap,'B39'),30);assert.equal(value(cap,'C11'),67.5);assert.equal(value(cap,'D11'),14);
const report={checkedAt:new Date().toISOString(),engine:'@oai/artifact-tool',sourceTotals:totals,personTotals,baseChecks:cap.getRange('G17:G27').values.flat(),tests:[]};
const mutate=(name,s,c,newValue,check)=>{const old=value(s,c);put(s,c,newValue);wb.recalculate();const observed=check();report.tests.push({name,observed});assert(observed.pass,name);put(s,c,old);wb.recalculate();};
mutate('Engineering 10h triggers escalation and daily overage',log,`F${rowFor('N01')}`,4,()=>({pass:value(cap,'G17').startsWith('ESCALATE')&&value(cap,'B20')>0,capStatus:value(cap,'G17'),dailyFlags:value(cap,'B20')}));
mutate('Queue coverage 13h triggers gap',log,`F${rowFor('Q01')}`,1,()=>({pass:value(cap,'G18').startsWith('GAP'),status:value(cap,'G18'),coverage:value(cap,'B18')}));
mutate('Head capacity decrease triggers window conflict',input,'B6',1,()=>({pass:value(cap,'G6')==='OVER CAPACITY',status:value(cap,'G6')}));
mutate('Priya Day 1 cap decreased triggers daily conflict',input,'D21',3,()=>({pass:value(day,'H7')==='OVER',status:value(day,'H7')}));
mutate('Done without actual evidence remains flagged',log,'J6','Done',()=>({pass:value(log,'M6')==='EVIDENCE',status:value(log,'M6')}));
mutate('Blocked without a next step remains flagged',log,'J6','Blocked',()=>({pass:value(log,'M6')==='NEXT STEP',status:value(log,'M6')}));
mutate('Blank capacity is not treated as valid zero',input,'B7',null,()=>({pass:value(cap,'G7')==='MISSING INPUT'&&value(cap,'B22')>0,status:value(cap,'G7')}));
mutate('Task outside ten-day window is flagged',log,`B${rowFor('J16')}`,11,()=>({pass:value(log,`M${rowFor('J16')}`)==='INPUT'&&value(cap,'G27').startsWith('MISSING'),rowStatus:value(log,`M${rowFor('J16')}`),milestoneStatus:value(cap,'G27')}));
mutate('Unauthorized final-service-date change is exposed',input,'B17',date('2026-09-19'),()=>({pass:value(cap,'G24').startsWith('REVIEW')&&value(cap,'G26').startsWith('ESCALATE'),sourceStatus:value(cap,'G24'),exitStatus:value(cap,'G26')}));
mutate('Zero coverage is distinct from a missing value',log,`F${rowFor('Q01')}`,0,()=>({pass:value(cap,'G18').startsWith('GAP')&&value(log,`M${rowFor('Q01')}`)==='OK',gapStatus:value(cap,'G18'),rowStatus:value(log,`M${rowFor('Q01')}`)}));
mutate('Duplicate calendar date cannot create hidden capacity',input,'B22',date('2026-09-08'),()=>({pass:value(day,'H12')==='DATE'&&value(cap,'B23')>0,status:value(day,'H12'),workLogFlags:value(cap,'B23')}));
mutate('Extra Head capacity beyond the source is flagged',input,'B6',8,()=>({pass:value(cap,'G24').startsWith('REVIEW'),status:value(cap,'G24')}));
wb.recalculate();assert(cap.getRange('G17:G27').values.flat().every(x=>x==='OK'));
const inspection=await wb.inspect({kind:'table',range:'Capacity!A5:G27',include:'values,formulas',tableMaxRows:24,tableMaxCols:7,maxChars:16000});
await fs.writeFile(path.join(root,'verification','capacity_inspection.ndjson'),inspection.ndjson);
const errors=await wb.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!',options:{useRegex:true,maxResults:100},summary:'final formula error scan'});
await fs.writeFile(path.join(root,'verification','formula_error_scan.ndjson'),errors.ndjson);
await fs.writeFile(path.join(root,'verification','calculation_tests.json'),JSON.stringify(report,null,2));
const xlsx=await SpreadsheetFile.exportXlsx(wb);const output=path.join(root,'ten_day_operating_plan.xlsx');await xlsx.save(output);
const round=await SpreadsheetFile.importXlsx(await FileBlob.load(output));round.recalculate();
assert.deepEqual(round.worksheets.getItem('Capacity').getRange('B33:B37').values.flat(),[47,10,5,5.5,14]);
assert(round.worksheets.getItem('Capacity').getRange('G17:G27').values.flat().every(x=>x==='OK'));
report.roundTrip='Exported XLSX reimported; totals and base checks passed. Excel desktop was not opened.';
await fs.writeFile(path.join(root,'verification','calculation_tests.json'),JSON.stringify(report,null,2));
for(const [sheetName,range,file] of [
 ['Capacity','A1:G30','capacity_top'],['Capacity','A32:G47','capacity_decisions'],
 ['Daily plan','A1:I17','daily_start'],['Daily plan','A54:I65','daily_end'],
 ['Work log','A1:G15','work_log_start'],['Work log','H5:M15','work_log_evidence'],
 ['Work log',`A${end-9}:G${end}`,'work_log_end'],
 ['Inputs','A1:H31','inputs_capacity'],['Inputs','A33:H53','inputs_sources'],
]){
 const blob=await wb.render({sheetName,range,scale:1.5,format:'png'});await fs.writeFile(path.join(previewDir,`${file}.png`),new Uint8Array(await blob.arrayBuffer()));
}
console.log(JSON.stringify({output,actionRows:actions.length,totals,nonengineeringReserve:30,mutationTests:report.tests.length,roundTrip:report.roundTrip,formulaErrors:errors.ndjson},null,2));
