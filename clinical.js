(function(root){'use strict';
const names={gad:'廣泛性焦慮症（GAD）',panic:'恐慌症',ocd:'強迫症（OCD）'};
function assess(d){
 if(['acute','unsafe'].includes(d.risk))return {status:'urgent',reasons:[d.risk==='acute'?'急性胸痛、昏厥或嚴重呼吸困難：先急診評估，勿先認定為恐慌。':'有立即傷害風險或無法維持安全：立即尋求急診協助，並由可信任者陪同。'],conditions:[],details:[]};
 const required=['risk','function','medical','mood','pregnancy','liver','kidney','qtc','interaction','other','preference'];
 if(!Number.isInteger(d.age)||d.age<1||d.age>120||required.some(k=>!d[k])||!['gad','panic','ocd'].some(k=>d[k]))return {status:'incomplete',reasons:['請填寫有效年齡與所有基本／鑑別資料，並至少選一個症狀領域；未填不視為正常。'],conditions:[],details:[]};
 if(d.age<18)return {status:'refer',reasons:['本工具限成人；請轉兒童青少年精神專科，採用年齡適切的評估與家庭參與。'],conditions:[],details:[]};
 if(!d.interview||!d.differential)return {status:'incomplete',reasons:['請完成症狀訪談及鑑別診斷確認。'],conditions:[],details:[]};
 if((d.gad&&(!Number.isFinite(d.months)||d.months<0))||(d.panic&&(!Number.isFinite(d.afterMonths)||d.afterMonths<0))||(d.ocd&&(!Number.isFinite(d.minutes)||d.minutes<0||d.minutes>1440)))return {status:'incomplete',reasons:['請填有效的病程與強迫症狀每日耗時。'],conditions:[],details:[]};
 const impaired=d.function!=='none',details=[];
 if(d.gad)details.push({code:'gad',match:d.months>=6&&d.mostDays&&d.uncontrolled&&(d.gadSymptoms||[]).length>=3&&impaired,criterion:'多數日子多領域過度擔心≥6個月、難以控制；6項伴隨症狀中≥3項，並有明顯痛苦或功能影響。'});
 if(d.panic)details.push({code:'panic',match:d.peak&&(d.panicSymptoms||[]).length>=4&&d.recurrent&&d.unexpected&&d.concern&&d.afterMonths>=1,criterion:'突發且數分鐘內達高峰，13項症狀中≥4項；反覆非預期發作，其後≥1個月擔心或不適應行為改變。'});
 if(d.ocd)details.push({code:'ocd',match:(d.obsession||d.compulsion)&&(d.minutes>60||impaired),criterion:'侵入且不想要的意念，或強迫行為／心理儀式；每日耗時>1小時，或造成明顯痛苦／功能影響。洞察力差不排除OCD。'});
 const reasons=[];
 if(d.risk!=='no')reasons.push('安全風險尚未確認：先由醫療人員評估。');
 if(d.medical!=='cleared')reasons.push('身體病因、藥物／物質或戒斷因素尚未排除或可能有影響。');
 if(d.mood!=='no')reasons.push('躁期、輕躁期、精神病或重度共病需釐清；勿直接以抗憂鬱藥單用。');
 if(d.pregnancy!=='no')reasons.push('懷孕、備孕、哺乳或狀態未明：需周產期共同決策。');
 if(d.interaction!=='no')reasons.push('尚未完成藥物整合或有MAOI、linezolid、靜脈methylene blue等風險。');
 if(['moderate','unknown'].includes(d.liver))reasons.push('中重度肝病或肝功能未確認：先個別評估藥物。');
 if(d.kidney==='unknown'||d.qtc==='unknown')reasons.push('腎功能或QT風險未確認：暫停個別藥物劑量建議。');
 if(d.other!=='none')reasons.push('另有社交焦慮、創傷、憂鬱或其他主導症狀，需完成鑑別。');
 const conditions=details.filter(x=>x.match).map(x=>x.code);
 return {status:reasons.length?'refer':conditions.length?'ready':'below',reasons,conditions,details};
}
function plan(d,r){if(r.status!=='ready')return null;
 const ocd=r.conditions.includes('ocd'),panic=r.conditions.includes('panic'),gad=r.conditions.includes('gad'),severe=d.function==='severe',mild=['none','mild'].includes(d.function),combined=ocd&&severe;
 const therapy=[];
 if(gad)therapy.push(mild?'GAD：衛教與主動追蹤、有指導的自助；仍持續困擾時，討論CBT／應用放鬆或藥物。':'GAD：結構化CBT／應用放鬆或SSRI，依偏好共同選擇；CBT常見12–15次。');
 if(panic)therapy.push('恐慌症：以恐慌為焦點的CBT，包含認知重建、內感受暴露及情境暴露；由合格治療師確認身體安全並規劃。');
 if(ocd)therapy.push(severe?'OCD嚴重功能影響：優先SSRI合併CBT／ERP，並轉精神專科。':mild?'OCD輕度功能影響：先低強度CBT／ERP；無法參與或效果不足時，選SSRI或較密集ERP。':'OCD中度功能影響：選較密集CBT／ERP或SSRI；部分反應時討論合併。');
 const sertraline=ocd||panic||d.qtc==='yes',med=combined||['med','both'].includes(d.preference);
 let dose=sertraline?(panic?'恐慌症：25 mg每日一次，通常1週後評估增至50 mg。':ocd?'OCD成人仿單起始50 mg每日一次。':'GAD屬仿單外用途，無此適應症的標準仿單劑量；請由醫師個別訂定，不套用OCD或恐慌症的起始量。'):'GAD成人仿單起始10 mg每日一次；視反應及耐受，至少間隔1週後才考慮調整，最高20 mg/日。';
 if(sertraline&&(panic||ocd))dose+=' 每次可增加25–50 mg，間隔至少1週；最高200 mg/日，非自動加量。';
 if(d.age>=65)dose+=sertraline?' 高齡／虛弱者由醫師考慮更低起始量與更慢調整。':' 高齡一般建議10 mg/日，勿直接套用20 mg上限。';
 if(d.liver==='mild')dose+=sertraline?' 輕度肝損傷：起始及最高劑量均為一般建議一半。':' 肝損傷一般建議10 mg/日。';
 const cautions=['用藥前核對目前處方、過去反應、雙相病史與安全風險；已服用抗憂鬱藥者不可直接疊加此範例。','常見不適：噁心、腹瀉、睡眠改變、初期焦躁與性功能影響；留意低血鈉、出血及血清素症候群。新發嚴重躁動或傷害意圖應立即就醫。'];
 if(d.kidney==='severe')cautions.push(sertraline?'Sertraline通常不需因腎功能調整；重度CKD／透析者仍需個別評估鈉、出血、跌倒及其他用藥。':'重度腎功能不全：Escitalopram需謹慎，由腎臟科與精神科確認後訂劑量。');
 if(d.qtc==='yes')cautions.push('QT風險下避開Escitalopram作此範例；Sertraline亦非零風險，需ECG、鉀鎂與交互作用評估。');
 if(sertraline&&gad)cautions.push('Sertraline用於GAD在部分地區屬仿單外使用；NICE列為可考慮選項。台灣適應症／給付按品項另查，需完成告知。');
 return {therapy,med,combined,drug:sertraline?'Sertraline':'Escitalopram',dose,cautions,days:med&&d.age<30?7:14,maintenance:ocd?'OCD：緩解後通常持續至少12個月，再依復發風險共同評估。':panic?'恐慌症：有改善時，達最佳劑量後通常至少持續6個月。':'GAD：有效藥物通常持續至少1年，定期檢視復發風險。'};
}
function gad7(a){return Array.isArray(a)&&a.length===7&&a.every(x=>Number.isInteger(x)&&x>=0&&x<=3)?a.reduce((s,n)=>s+n,0):null;}
const severity=s=>s<5?'極少':s<10?'輕度':s<15?'中度':'重度';
function addDays(s,n){const [y,m,d]=s.split('-').map(Number);return new Date(Date.UTC(y,m-1,d+n)).toISOString().slice(0,10);}
function compare(a,b){if(!a||!b||a.id!==b.id||a.scale!==b.scale)return null;return {change:b.score-a.score,percent:a.score===0?null:Math.round((a.score-b.score)/a.score*100)};}
const api={assess,plan,gad7,severity,addDays,compare,names};if(typeof module!=='undefined')module.exports=api;else root.Clinical=api;
})(typeof window!=='undefined'?window:this);
