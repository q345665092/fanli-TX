/*

20210409  tom

微信小程序：keep早起打卡
能量可以兑换话费，一天将近500能量，10天可兑换5元话费。

比脚本为早起打卡与偷取好友能量。
浇水需要添加浇水js

ck获取：打开小程序点击能量，点击浇水一次即可。

随便邀请一个好友，然后就可以偷能量了。

[MITM]
hostname = www.xiaeke.com

[task_local]
0 6 * * * https://raw.githubusercontent.com/xl2101200/-/main/keepdk.js, tag=keep打卡偷能量, enabled=true

[rewrite_local] 
https://www.xiaeke.com/benmao/index.php/Home/MorningTree/gainEnergy? url script-request-header https://raw.githubusercontent.com/xl2101200/-/main/keepdk.js

多账号添加boxjs订阅，可通过微信切换账号的方式来获取，具体自测
boxjs订阅:https://raw.githubusercontent.com/xl2101200/-/main/tom.box.json 

task订阅: https://raw.githubusercontent.com/xl2101200/-/main/Tom_task.josn

*/

const $ = new Env('keep早起打卡');
let status;
status = (status = ($.getval("keepstatus") || "1") ) > 1 ? `${status}` : ""; // 账号扩展字符
const keepurlArr = ['https://www.xiaeke.com/benmao/index.php/Home/MorningTree/gainEnergy?user_id=83386&energy_type=0&energy=10'], keephdArr = ['{"Accept":"*/*","Accept-Encoding":"gzip, deflate, br","Connection":"keep-alive","Referer":"https://servicewechat.com/wx78f529e29468199b/19/page-frame.html","Content-Type":"application/json","Host":"www.xiaeke.com","User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 14_4_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.4(0x18000424) NetType/WIFI Language/zh_CN","Accept-Language":"zh-cn"}'],keepcount = ''
let time = Math.round(Date.now() / 1000)
let keepurl = $.getdata('keepurl')
let keephd = $.getdata('keephd')
let keepkey = '',uid=''
!(async () => {
  if (typeof $request !== "undefined") {
    await keepck()
   
  } else {keepurlArr.push($.getdata('keepurl'))
    keephdArr.push($.getdata('keephd'))
    let keepcount = ($.getval('keepcount') || '1');
  for (let i = 2; i <= keepcount; i++) {
    keepurlArr.push($.getdata(`keepurl${i}`))
    keephdArr.push($.getdata(`keephd${i}`))
  }
    console.log(`------------- 共${keephdArr.length}个账号-------------\n`)
      for (let i = 0; i < keephdArr.length; i++) {
        if (keephdArr[i]) {
         
          keepurl = keepurlArr[i];
          keephd = keephdArr[i];
          $.index = i + 1;
          console.log(`\n开始【keep早起打卡${$.index}】`)
          
        await keepdk()
    
}
     for (let x = 0; x < 30; x++) {
      $.index = x + 1
      console.log(`\n第${x+1}次执行任务！\n等待3秒开始偷能量`)
    await keeptnl();
    await $.wait(3000);


  }
}}
})()
  .catch((e) => $.logErr(e))
  .finally(() => $.done())

function keepck() {
   if ($request.url.indexOf("MorningTree/gainEnergy?") > -1) {
 const keepurl = $request.url
  if(keepurl)     $.setdata(keepurl,`keepurl${status}`)
    $.log(keepurl)
  const keephd = JSON.stringify($request.headers)
        if(keephd)    $.setdata(keephd,`keephd${status}`)
$.log(keephd)
 $.msg($.name,"",`keep${status}数据获取成功`)
  }
}

function keeptnl(timeout = 0) {
  return new Promise((resolve) => {
uid=keepurl.match(/user_id=(.*?)&/)[1]
let url = {
        url : `https://www.xiaeke.com/benmao/index.php/Home/MorningTree/gainEnergy?user_id=${uid}&energy_type=4&energy=10`,
        headers : JSON.parse(keephd),
}
      $.get(url, async (err, resp, data) => {
        try {
    const result = JSON.parse(data)
        if(result.status == 13000){  
} else {
       console.log('\nkeep偷能量: '+result.info+'\n偷到能量：'+result.data+'个')
}
        } catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}

function keepdk(timeout = 0) {
  return new Promise((resolve) => {
uid=keepurl.match(/user_id=(.*?)&/)[1]
let url = {
        url : `https://www.xiaeke.com/benmao/index.php/Home/MorningNote/addNote?user_id=${uid}`,
        headers : JSON.parse(keephd),
}
      $.get(url, async (err, resp, data) => {
        try {
    const result = JSON.parse(data)
        if(result.status == 13000){
} else {
       
}
        console.log('\n早起打卡'+result.info)
        } catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}


function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}