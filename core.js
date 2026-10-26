/* Shared source policy, also exercised by node --test. */
(function(root){
'use strict';
const STATUS={playable:'已验证可播放',unverified:'官方入口存在，但播放未验证',region:'地区限制',login:'需要登录或订阅',ended:'直播已结束',invalid:'链接失效'};
const TTL=72*60*60*1000;
function fresh(date,now=Date.now()){const n=Date.parse(date);return Number.isFinite(n)&&n<=now&&now-n<TTL}
function status(source,now=Date.now()){if(source.status==='playable'&&!fresh(source.playbackVerifiedAt,now))return 'unverified';return source.status||'unverified'}
function rank(s,now=Date.now()){if(['ended','invalid'].includes(status(s,now))||['ended','scheduled'].includes(s.liveState))return 99;if(s.type==='youtube'&&s.liveState==='live'&&fresh(s.checkedAt,now))return status(s,now)==='playable'?0:1;if(s.type==='youtube')return 2;if(s.type==='website')return status(s,now)==='playable'?3:4;return 5}
function ordered(channel,now=Date.now()){return (channel.sources||[]).map((s,i)=>({s,i})).sort((a,b)=>rank(a.s,now)-rank(b.s,now)||a.i-b.i).map(x=>x.s)}
function primary(channel,now=Date.now()){return ordered(channel,now).find(s=>rank(s,now)<99)||null}
function stateLabel(s,now=Date.now()){if(s.liveState==='live')return fresh(s.checkedAt,now)?'核对时正在直播':'上次为直播，当前待复核';return {ended:'直播已结束',scheduled:'尚未开播',unknown:'当前直播状态未确认'}[s.liveState]||'当前直播状态未确认'}
function https(url){try{return new URL(url).protocol==='https:'}catch{return false}}
function validate(data){if(data.schemaVersion!==2||!Array.isArray(data.channels)||!data.channels.length)throw Error('频道数据版本或内容错误');const ids=new Set();for(const c of data.channels){if(!c.id||ids.has(c.id)||!c.name||!c.country||!c.language||!c.category||!https(c.website)||!Array.isArray(c.sources)||!c.sources.length)throw Error('频道字段错误：'+c.id);ids.add(c.id);const sourceIds=new Set();for(const s of c.sources){if(!s.id||sourceIds.has(s.id)||!['youtube','website'].includes(s.type)||!https(s.url)||!STATUS[s.status]||!['live','unknown','scheduled','ended'].includes(s.liveState)||!s.verification||!s.officialEvidence?.length||!s.officialEvidence.every(https))throw Error('来源字段错误：'+c.id);sourceIds.add(s.id);if(s.type==='youtube'){const u=new URL(s.url);if(!['www.youtube.com','youtube.com'].includes(u.hostname))throw Error('YouTube 域名错误');if(!/^\/(?:watch|@[^/]+\/live|channel\/[^/]+\/live)$/.test(u.pathname))throw Error('不能使用频道主页冒充直播入口')}if(s.status==='playable'&&(!s.playbackVerifiedAt||s.liveState!=='live'||!s.playbackEvidence))throw Error('缺少播放证据：'+c.id)}}return data}
function issueUrl(c,s,kind,note){const body=['## 频道故障反馈','频道：'+c.name+' ('+c.id+')','线路：'+s.label,'入口：'+s.url,'故障类型：'+kind,'','用户补充：',note.trim()||'无','','说明：这是用户反馈，不是自动播放验证结果。'].join('\n');return 'https://github.com/songshangsheng040-web/global-tv/issues/new?'+new URLSearchParams({title:'[频道故障] '+c.name+'：'+kind,body})}
const api={STATUS,TTL,fresh,status,rank,ordered,primary,stateLabel,validate,issueUrl};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.TV=api;
})(typeof globalThis!=='undefined'?globalThis:this);
