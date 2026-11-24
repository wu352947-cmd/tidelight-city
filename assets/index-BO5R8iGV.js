(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function e(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(i){if(i.ep)return;i.ep=!0;const o=e(i);fetch(i.href,o)}})();const cn=1920,qe=cn/2,ee=193,za=cn/(ee-1),Ui=128,Ba=cn/Ui,En=0,gr=8,la=["small_2lane","tree_2lane","oneway_2lane","avenue_4lane","highway"],An={small_2lane:{type:"small_2lane",labelZh:"双车道小路",labelEn:"Small Road",width:10,sidewalkWidth:1.6,medianWidth:0,forwardLanes:1,backwardLanes:1,speedLimit:11.5,costPerMeter:12,upkeepPerMeterPerDay:.12,noiseBase:14,landValueBonus:0,zoneable:!0,hasTrees:!1,milestoneTier:0},tree_2lane:{type:"tree_2lane",labelZh:"林荫小道",labelEn:"Tree Road",width:14,sidewalkWidth:3.4,medianWidth:0,forwardLanes:1,backwardLanes:1,speedLimit:11.5,costPerMeter:18,upkeepPerMeterPerDay:.16,noiseBase:7,landValueBonus:8,zoneable:!0,hasTrees:!0,milestoneTier:1},oneway_2lane:{type:"oneway_2lane",labelZh:"单向双车道",labelEn:"One-Way Road",width:10,sidewalkWidth:1.6,medianWidth:0,forwardLanes:2,backwardLanes:0,speedLimit:14,costPerMeter:14,upkeepPerMeterPerDay:.14,noiseBase:16,landValueBonus:0,zoneable:!0,hasTrees:!1,milestoneTier:1},avenue_4lane:{type:"avenue_4lane",labelZh:"四车道大道",labelEn:"4-Lane Avenue",width:20,sidewalkWidth:2,medianWidth:2.4,forwardLanes:2,backwardLanes:2,speedLimit:17.5,costPerMeter:26,upkeepPerMeterPerDay:.28,noiseBase:28,landValueBonus:4,zoneable:!0,hasTrees:!0,milestoneTier:2},highway:{type:"highway",labelZh:"城市高速",labelEn:"Highway",width:16,sidewalkWidth:.8,medianWidth:1.6,forwardLanes:2,backwardLanes:2,speedLimit:28,costPerMeter:45,upkeepPerMeterPerDay:.42,noiseBase:48,landValueBonus:-10,zoneable:!1,hasTrees:!1,milestoneTier:4}},Ao=["res_low","res_high","com_low","com_high","ind","office"],fo=["none","res_low","res_high","com_low","com_high","ind","office"],zi={res_low:{zone:"res_low",labelZh:"低密居住",labelEn:"Low Res",maxLevel:5,baseHouseholdsPerCell:.65,baseJobsPerCell:0,powerPerCell:.04,waterPerCell:.55,pollutionPerCell:0,noisePerCell:1,taxBasePerUnit:2.2,milestoneTier:0},res_high:{zone:"res_high",labelZh:"高密居住",labelEn:"High Res",maxLevel:5,baseHouseholdsPerCell:2.6,baseJobsPerCell:0,powerPerCell:.12,waterPerCell:1.7,pollutionPerCell:0,noisePerCell:6,taxBasePerUnit:2,milestoneTier:4},com_low:{zone:"com_low",labelZh:"低密商业",labelEn:"Low Com",maxLevel:3,baseHouseholdsPerCell:0,baseJobsPerCell:1.2,powerPerCell:.07,waterPerCell:.7,pollutionPerCell:1,noisePerCell:9,taxBasePerUnit:3.1,milestoneTier:0},com_high:{zone:"com_high",labelZh:"高密商业",labelEn:"High Com",maxLevel:3,baseHouseholdsPerCell:0,baseJobsPerCell:3.2,powerPerCell:.18,waterPerCell:1.9,pollutionPerCell:2,noisePerCell:22,taxBasePerUnit:3.5,milestoneTier:4},ind:{zone:"ind",labelZh:"通用工业",labelEn:"Industry",maxLevel:3,baseHouseholdsPerCell:0,baseJobsPerCell:2,powerPerCell:.16,waterPerCell:1.5,pollutionPerCell:16,noisePerCell:18,taxBasePerUnit:3.3,milestoneTier:0},office:{zone:"office",labelZh:"现代办公",labelEn:"Office",maxLevel:3,baseHouseholdsPerCell:0,baseJobsPerCell:2.4,powerPerCell:.13,waterPerCell:1.1,pollutionPerCell:0,noisePerCell:4,taxBasePerUnit:3.8,milestoneTier:3}},xc={coal_plant:10,wind_turbine:11,solar_plant:12,water_pump:13,water_tower:14,sewage_outlet:15,police_station:16,fire_station:17,clinic:18,hospital:19,elementary_school:20,high_school:21,park_small:22,park_plaza:23,landfill:24},Ue={coal_plant:{kind:"coal_plant",labelZh:"燃煤电厂",labelEn:"Coal Power",category:"power",cost:6e3,upkeepPerDay:95,width:32,depth:28,height:18,powerMW:45,waterM3:-10,sewageM3:-4,jobs:24,coverageRadius:110,serviceStrength:1,pollution:70,noise:45,landValueBoost:-20,needsWaterEdge:!1,milestoneTier:0},wind_turbine:{kind:"wind_turbine",labelZh:"风力发电机",labelEn:"Wind Turbine",category:"power",cost:2400,upkeepPerDay:24,width:12,depth:12,height:36,powerMW:12,waterM3:0,sewageM3:0,jobs:2,coverageRadius:95,serviceStrength:1,pollution:0,noise:28,landValueBoost:-4,needsWaterEdge:!1,milestoneTier:0},solar_plant:{kind:"solar_plant",labelZh:"太阳能电站",labelEn:"Solar Plant",category:"power",cost:9e3,upkeepPerDay:65,width:32,depth:24,height:7,powerMW:36,waterM3:-2,sewageM3:0,jobs:10,coverageRadius:100,serviceStrength:1,pollution:0,noise:6,landValueBoost:2,needsWaterEdge:!1,milestoneTier:2},water_pump:{kind:"water_pump",labelZh:"抽水站",labelEn:"Water Pump",category:"water",cost:2500,upkeepPerDay:45,width:16,depth:16,height:9,powerMW:-2,waterM3:450,sewageM3:0,jobs:6,coverageRadius:120,serviceStrength:1,pollution:0,noise:16,landValueBoost:0,needsWaterEdge:!0,milestoneTier:0},water_tower:{kind:"water_tower",labelZh:"水塔",labelEn:"Water Tower",category:"water",cost:3200,upkeepPerDay:55,width:14,depth:14,height:22,powerMW:-1.5,waterM3:240,sewageM3:0,jobs:4,coverageRadius:110,serviceStrength:1,pollution:0,noise:10,landValueBoost:-2,needsWaterEdge:!1,milestoneTier:0},sewage_outlet:{kind:"sewage_outlet",labelZh:"排污口",labelEn:"Sewage Outlet",category:"water",cost:2200,upkeepPerDay:40,width:16,depth:14,height:6,powerMW:-1.5,waterM3:0,sewageM3:450,jobs:4,coverageRadius:110,serviceStrength:1,pollution:20,noise:18,landValueBoost:-18,needsWaterEdge:!0,milestoneTier:0},police_station:{kind:"police_station",labelZh:"警察局",labelEn:"Police",category:"police",cost:5e3,upkeepPerDay:70,width:22,depth:18,height:12,powerMW:-1.2,waterM3:-6,sewageM3:-6,jobs:18,coverageRadius:280,serviceStrength:1,pollution:0,noise:10,landValueBoost:14,needsWaterEdge:!1,milestoneTier:2},fire_station:{kind:"fire_station",labelZh:"消防站",labelEn:"Fire Station",category:"fire",cost:5e3,upkeepPerDay:70,width:22,depth:18,height:11,powerMW:-1.2,waterM3:-8,sewageM3:-6,jobs:18,coverageRadius:280,serviceStrength:1,pollution:0,noise:12,landValueBoost:12,needsWaterEdge:!1,milestoneTier:2},clinic:{kind:"clinic",labelZh:"社区诊所",labelEn:"Clinic",category:"health",cost:4200,upkeepPerDay:60,width:20,depth:16,height:10,powerMW:-1,waterM3:-8,sewageM3:-8,jobs:16,coverageRadius:260,serviceStrength:.85,pollution:0,noise:6,landValueBoost:15,needsWaterEdge:!1,milestoneTier:1},hospital:{kind:"hospital",labelZh:"中心医院",labelEn:"Hospital",category:"health",cost:14e3,upkeepPerDay:160,width:34,depth:26,height:24,powerMW:-3,waterM3:-20,sewageM3:-20,jobs:60,coverageRadius:440,serviceStrength:1.4,pollution:0,noise:10,landValueBoost:24,needsWaterEdge:!1,milestoneTier:4},elementary_school:{kind:"elementary_school",labelZh:"小学",labelEn:"Elementary",category:"education",cost:4500,upkeepPerDay:62,width:26,depth:20,height:11,powerMW:-1.2,waterM3:-10,sewageM3:-10,jobs:20,coverageRadius:290,serviceStrength:.9,pollution:0,noise:8,landValueBoost:16,needsWaterEdge:!1,milestoneTier:1},high_school:{kind:"high_school",labelZh:"高级中学",labelEn:"High School",category:"education",cost:8500,upkeepPerDay:105,width:32,depth:24,height:14,powerMW:-2,waterM3:-14,sewageM3:-14,jobs:36,coverageRadius:380,serviceStrength:1.2,pollution:0,noise:9,landValueBoost:20,needsWaterEdge:!1,milestoneTier:3},park_small:{kind:"park_small",labelZh:"街心公园",labelEn:"Small Park",category:"parks",cost:1200,upkeepPerDay:12,width:16,depth:16,height:4,powerMW:-.2,waterM3:-2,sewageM3:0,jobs:2,coverageRadius:190,serviceStrength:.75,pollution:-6,noise:-10,landValueBoost:24,needsWaterEdge:!1,milestoneTier:0},park_plaza:{kind:"park_plaza",labelZh:"海湾广场",labelEn:"Bay Plaza",category:"parks",cost:3600,upkeepPerDay:30,width:28,depth:24,height:6,powerMW:-.6,waterM3:-5,sewageM3:0,jobs:6,coverageRadius:290,serviceStrength:1.15,pollution:-10,noise:-12,landValueBoost:36,needsWaterEdge:!1,milestoneTier:3},landfill:{kind:"landfill",labelZh:"垃圾填埋场",labelEn:"Landfill",category:"garbage",cost:2800,upkeepPerDay:40,width:32,depth:28,height:5,powerMW:-.6,waterM3:-2,sewageM3:0,jobs:10,coverageRadius:420,serviceStrength:1,pollution:60,noise:20,landValueBoost:-25,needsWaterEdge:!1,milestoneTier:1}},dn={NO_POWER:1,NO_WATER:2,NO_SEWAGE:4,HIGH_TAX:32,HIGH_POLLUTION:64,POLLUTED_WATER:128,GARBAGE:256,CRIME:512,ABANDONED:1024},ca=[{tier:0,populationRequired:0,nameZh:"初建港湾",nameEn:"Starter Cove",bonusMoney:0},{tier:1,populationRequired:250,nameZh:"海风村落",nameEn:"Coastal Hamlet",bonusMoney:15e3},{tier:2,populationRequired:600,nameZh:"汐光小镇",nameEn:"Tidelight Town",bonusMoney:25e3},{tier:3,populationRequired:1200,nameZh:"繁荣海湾",nameEn:"Bustling Bay",bonusMoney:4e4},{tier:4,populationRequired:2500,nameZh:"滨海新城",nameEn:"Harbor City",bonusMoney:6e4}];/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ha="170",ch=0,Oa=1,hh=2,_c=1,Mc=2,wn=3,Xn=0,Ce=1,Ke=2,Vn=0,Bi=1,vr=2,ka=3,Ha=4,uh=5,ni=100,dh=101,fh=102,ph=103,mh=104,gh=200,vh=201,xh=202,_h=203,xr=204,_r=205,Mh=206,yh=207,Sh=208,bh=209,Eh=210,wh=211,Th=212,Ah=213,Ch=214,Mr=0,yr=1,Sr=2,Gi=3,br=4,Er=5,wr=6,Tr=7,yc=0,Rh=1,Ph=2,Rn=0,Dh=1,Lh=2,Ih=3,Sc=4,Fh=5,Uh=6,Nh=7,bc=300,Vi=301,Wi=302,Ar=303,Cr=304,yo=306,fi=1e3,hn=1001,Rr=1002,Xe=1003,zh=1004,Es=1005,Ae=1006,Co=1007,oi=1008,ze=1009,Ec=1010,wc=1011,gs=1012,ua=1013,pi=1014,pn=1015,Wn=1016,da=1017,fa=1018,Xi=1020,Tc=35902,Ac=1021,Cc=1022,We=1023,Rc=1024,Pc=1025,Oi=1026,$i=1027,pa=1028,ma=1029,Dc=1030,ga=1031,va=1033,so=33776,oo=33777,ro=33778,ao=33779,Pr=35840,Dr=35841,Lr=35842,Ir=35843,Fr=36196,Ur=37492,Nr=37496,zr=37808,Br=37809,Or=37810,kr=37811,Hr=37812,Gr=37813,Vr=37814,Wr=37815,Xr=37816,$r=37817,qr=37818,Yr=37819,Zr=37820,jr=37821,lo=36492,Kr=36494,Jr=36495,Lc=36283,Qr=36284,ta=36285,ea=36286,Bh=3200,Oh=3201,Ic=0,kh=1,Gn="",De="srgb",mi="srgb-linear",So="linear",ie="srgb",xi=7680,Ga=519,Hh=512,Gh=513,Vh=514,Fc=515,Wh=516,Xh=517,$h=518,qh=519,Va=35044,Wa="300 es",Cn=2e3,po=2001;class Zi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const o=i.indexOf(e);o!==-1&&i.splice(o,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let o=0,r=i.length;o<r;o++)i[o].call(this,t);t.target=null}}}const Ee=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],co=Math.PI/180,na=180/Math.PI;function xs(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ee[s&255]+Ee[s>>8&255]+Ee[s>>16&255]+Ee[s>>24&255]+"-"+Ee[t&255]+Ee[t>>8&255]+"-"+Ee[t>>16&15|64]+Ee[t>>24&255]+"-"+Ee[e&63|128]+Ee[e>>8&255]+"-"+Ee[e>>16&255]+Ee[e>>24&255]+Ee[n&255]+Ee[n>>8&255]+Ee[n>>16&255]+Ee[n>>24&255]).toLowerCase()}function Ne(s,t,e){return Math.max(t,Math.min(e,s))}function Yh(s,t){return(s%t+t)%t}function Ro(s,t,e){return(1-e)*s+e*t}function es(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Ie(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}class Xt{constructor(t=0,e=0){Xt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ne(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),o=this.x-t.x,r=this.y-t.y;return this.x=o*n-r*i+t.x,this.y=o*i+r*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Gt{constructor(t,e,n,i,o,r,a,l,c){Gt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,o,r,a,l,c)}set(t,e,n,i,o,r,a,l,c){const h=this.elements;return h[0]=t,h[1]=i,h[2]=a,h[3]=e,h[4]=o,h[5]=l,h[6]=n,h[7]=r,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,o=this.elements,r=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],f=n[2],p=n[5],g=n[8],v=i[0],m=i[3],d=i[6],x=i[1],y=i[4],M=i[7],D=i[2],C=i[5],E=i[8];return o[0]=r*v+a*x+l*D,o[3]=r*m+a*y+l*C,o[6]=r*d+a*M+l*E,o[1]=c*v+h*x+u*D,o[4]=c*m+h*y+u*C,o[7]=c*d+h*M+u*E,o[2]=f*v+p*x+g*D,o[5]=f*m+p*y+g*C,o[8]=f*d+p*M+g*E,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],o=t[3],r=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*r*h-e*a*c-n*o*h+n*a*l+i*o*c-i*r*l}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],o=t[3],r=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*r-a*c,f=a*l-h*o,p=c*o-r*l,g=e*u+n*f+i*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return t[0]=u*v,t[1]=(i*c-h*n)*v,t[2]=(a*n-i*r)*v,t[3]=f*v,t[4]=(h*e-i*l)*v,t[5]=(i*o-a*e)*v,t[6]=p*v,t[7]=(n*l-c*e)*v,t[8]=(r*e-n*o)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,o,r,a){const l=Math.cos(o),c=Math.sin(o);return this.set(n*l,n*c,-n*(l*r+c*a)+r+t,-i*c,i*l,-i*(-c*r+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Po.makeScale(t,e)),this}rotate(t){return this.premultiply(Po.makeRotation(-t)),this}translate(t,e){return this.premultiply(Po.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Po=new Gt;function Uc(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function mo(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Zh(){const s=mo("canvas");return s.style.display="block",s}const Xa={};function us(s){s in Xa||(Xa[s]=!0,console.warn(s))}function jh(s,t,e){return new Promise(function(n,i){function o(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(o,e);break;default:n()}}setTimeout(o,e)})}function Kh(s){const t=s.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Jh(s){const t=s.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const jt={enabled:!0,workingColorSpace:mi,spaces:{},convert:function(s,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===ie&&(s.r=Pn(s.r),s.g=Pn(s.g),s.b=Pn(s.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(s.applyMatrix3(this.spaces[t].toXYZ),s.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===ie&&(s.r=ki(s.r),s.g=ki(s.g),s.b=ki(s.b))),s},fromWorkingColorSpace:function(s,t){return this.convert(s,this.workingColorSpace,t)},toWorkingColorSpace:function(s,t){return this.convert(s,t,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Gn?So:this.spaces[s].transfer},getLuminanceCoefficients:function(s,t=this.workingColorSpace){return s.fromArray(this.spaces[t].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,t,e){return s.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}};function Pn(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function ki(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}const $a=[.64,.33,.3,.6,.15,.06],qa=[.2126,.7152,.0722],Ya=[.3127,.329],Za=new Gt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ja=new Gt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);jt.define({[mi]:{primaries:$a,whitePoint:Ya,transfer:So,toXYZ:Za,fromXYZ:ja,luminanceCoefficients:qa,workingColorSpaceConfig:{unpackColorSpace:De},outputColorSpaceConfig:{drawingBufferColorSpace:De}},[De]:{primaries:$a,whitePoint:Ya,transfer:ie,toXYZ:Za,fromXYZ:ja,luminanceCoefficients:qa,outputColorSpaceConfig:{drawingBufferColorSpace:De}}});let _i;class Qh{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{_i===void 0&&(_i=mo("canvas")),_i.width=t.width,_i.height=t.height;const n=_i.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=_i}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=mo("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),o=i.data;for(let r=0;r<o.length;r++)o[r]=Pn(o[r]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Pn(e[n]/255)*255):e[n]=Pn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let tu=0;class Nc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:tu++}),this.uuid=xs(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let o;if(Array.isArray(i)){o=[];for(let r=0,a=i.length;r<a;r++)i[r].isDataTexture?o.push(Do(i[r].image)):o.push(Do(i[r]))}else o=Do(i);n.url=o}return e||(t.images[this.uuid]=n),n}}function Do(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Qh.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let eu=0;class Re extends Zi{constructor(t=Re.DEFAULT_IMAGE,e=Re.DEFAULT_MAPPING,n=hn,i=hn,o=Ae,r=oi,a=We,l=ze,c=Re.DEFAULT_ANISOTROPY,h=Gn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:eu++}),this.uuid=xs(),this.name="",this.source=new Nc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=o,this.minFilter=r,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Xt(0,0),this.repeat=new Xt(1,1),this.center=new Xt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Gt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==bc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case fi:t.x=t.x-Math.floor(t.x);break;case hn:t.x=t.x<0?0:1;break;case Rr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case fi:t.y=t.y-Math.floor(t.y);break;case hn:t.y=t.y<0?0:1;break;case Rr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Re.DEFAULT_IMAGE=null;Re.DEFAULT_MAPPING=bc;Re.DEFAULT_ANISOTROPY=1;class de{constructor(t=0,e=0,n=0,i=1){de.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,o=this.w,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i+r[12]*o,this.y=r[1]*e+r[5]*n+r[9]*i+r[13]*o,this.z=r[2]*e+r[6]*n+r[10]*i+r[14]*o,this.w=r[3]*e+r[7]*n+r[11]*i+r[15]*o,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,o;const l=t.elements,c=l[0],h=l[4],u=l[8],f=l[1],p=l[5],g=l[9],v=l[2],m=l[6],d=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const y=(c+1)/2,M=(p+1)/2,D=(d+1)/2,C=(h+f)/4,E=(u+v)/4,L=(g+m)/4;return y>M&&y>D?y<.01?(n=0,i=.707106781,o=.707106781):(n=Math.sqrt(y),i=C/n,o=E/n):M>D?M<.01?(n=.707106781,i=0,o=.707106781):(i=Math.sqrt(M),n=C/i,o=L/i):D<.01?(n=.707106781,i=.707106781,o=0):(o=Math.sqrt(D),n=E/o,i=L/o),this.set(n,i,o,e),this}let x=Math.sqrt((m-g)*(m-g)+(u-v)*(u-v)+(f-h)*(f-h));return Math.abs(x)<.001&&(x=1),this.x=(m-g)/x,this.y=(u-v)/x,this.z=(f-h)/x,this.w=Math.acos((c+p+d-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class nu extends Zi{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new de(0,0,t,e),this.scissorTest=!1,this.viewport=new de(0,0,t,e);const i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ae,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const o=new Re(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);o.flipY=!1,o.generateMipmaps=n.generateMipmaps,o.internalFormat=n.internalFormat,this.textures=[];const r=n.count;for(let a=0;a<r;a++)this.textures[a]=o.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,o=this.textures.length;i<o;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Nc(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ve extends nu{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class zc extends Re{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Xe,this.minFilter=Xe,this.wrapR=hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class iu extends Re{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Xe,this.minFilter=Xe,this.wrapR=hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class _s{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,o,r,a){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3];const f=o[r+0],p=o[r+1],g=o[r+2],v=o[r+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=f,t[e+1]=p,t[e+2]=g,t[e+3]=v;return}if(u!==v||l!==f||c!==p||h!==g){let m=1-a;const d=l*f+c*p+h*g+u*v,x=d>=0?1:-1,y=1-d*d;if(y>Number.EPSILON){const D=Math.sqrt(y),C=Math.atan2(D,d*x);m=Math.sin(m*C)/D,a=Math.sin(a*C)/D}const M=a*x;if(l=l*m+f*M,c=c*m+p*M,h=h*m+g*M,u=u*m+v*M,m===1-a){const D=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=D,c*=D,h*=D,u*=D}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,o,r){const a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=o[r],f=o[r+1],p=o[r+2],g=o[r+3];return t[e]=a*g+h*u+l*p-c*f,t[e+1]=l*g+h*f+c*u-a*p,t[e+2]=c*g+h*p+a*f-l*u,t[e+3]=h*g-a*u-l*f-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,o=t._z,r=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),u=a(o/2),f=l(n/2),p=l(i/2),g=l(o/2);switch(r){case"XYZ":this._x=f*h*u+c*p*g,this._y=c*p*u-f*h*g,this._z=c*h*g+f*p*u,this._w=c*h*u-f*p*g;break;case"YXZ":this._x=f*h*u+c*p*g,this._y=c*p*u-f*h*g,this._z=c*h*g-f*p*u,this._w=c*h*u+f*p*g;break;case"ZXY":this._x=f*h*u-c*p*g,this._y=c*p*u+f*h*g,this._z=c*h*g+f*p*u,this._w=c*h*u-f*p*g;break;case"ZYX":this._x=f*h*u-c*p*g,this._y=c*p*u+f*h*g,this._z=c*h*g-f*p*u,this._w=c*h*u+f*p*g;break;case"YZX":this._x=f*h*u+c*p*g,this._y=c*p*u+f*h*g,this._z=c*h*g-f*p*u,this._w=c*h*u-f*p*g;break;case"XZY":this._x=f*h*u-c*p*g,this._y=c*p*u-f*h*g,this._z=c*h*g+f*p*u,this._w=c*h*u+f*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],o=e[8],r=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],f=n+a+u;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(h-l)*p,this._y=(o-c)*p,this._z=(r-i)*p}else if(n>a&&n>u){const p=2*Math.sqrt(1+n-a-u);this._w=(h-l)/p,this._x=.25*p,this._y=(i+r)/p,this._z=(o+c)/p}else if(a>u){const p=2*Math.sqrt(1+a-n-u);this._w=(o-c)/p,this._x=(i+r)/p,this._y=.25*p,this._z=(l+h)/p}else{const p=2*Math.sqrt(1+u-n-a);this._w=(r-i)/p,this._x=(o+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ne(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,o=t._z,r=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+r*a+i*c-o*l,this._y=i*h+r*l+o*a-n*c,this._z=o*h+r*c+n*l-i*a,this._w=r*h-n*a-i*l-o*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,o=this._z,r=this._w;let a=r*t._w+n*t._x+i*t._y+o*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=r,this._x=n,this._y=i,this._z=o,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-e;return this._w=p*r+e*this._w,this._x=p*n+e*this._x,this._y=p*i+e*this._y,this._z=p*o+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,f=Math.sin(e*h)/c;return this._w=r*u+this._w*f,this._x=n*u+this._x*f,this._y=i*u+this._y*f,this._z=o*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),o=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),o*Math.sin(e),o*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class O{constructor(t=0,e=0,n=0){O.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Ka.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Ka.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,o=t.elements;return this.x=o[0]*e+o[3]*n+o[6]*i,this.y=o[1]*e+o[4]*n+o[7]*i,this.z=o[2]*e+o[5]*n+o[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,o=t.elements,r=1/(o[3]*e+o[7]*n+o[11]*i+o[15]);return this.x=(o[0]*e+o[4]*n+o[8]*i+o[12])*r,this.y=(o[1]*e+o[5]*n+o[9]*i+o[13])*r,this.z=(o[2]*e+o[6]*n+o[10]*i+o[14])*r,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,o=t.x,r=t.y,a=t.z,l=t.w,c=2*(r*i-a*n),h=2*(a*e-o*i),u=2*(o*n-r*e);return this.x=e+l*c+r*u-a*h,this.y=n+l*h+a*c-o*u,this.z=i+l*u+o*h-r*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i,this.y=o[1]*e+o[5]*n+o[9]*i,this.z=o[2]*e+o[6]*n+o[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,o=t.z,r=e.x,a=e.y,l=e.z;return this.x=i*l-o*a,this.y=o*r-n*l,this.z=n*a-i*r,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Lo.copy(this).projectOnVector(t),this.sub(Lo)}reflect(t){return this.sub(Lo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ne(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Lo=new O,Ka=new _s;class gi{constructor(t=new O(1/0,1/0,1/0),e=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(on.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(on.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=on.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const o=n.getAttribute("position");if(e===!0&&o!==void 0&&t.isInstancedMesh!==!0)for(let r=0,a=o.count;r<a;r++)t.isMesh===!0?t.getVertexPosition(r,on):on.fromBufferAttribute(o,r),on.applyMatrix4(t.matrixWorld),this.expandByPoint(on);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ws.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ws.copy(n.boundingBox)),ws.applyMatrix4(t.matrixWorld),this.union(ws)}const i=t.children;for(let o=0,r=i.length;o<r;o++)this.expandByObject(i[o],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,on),on.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ns),Ts.subVectors(this.max,ns),Mi.subVectors(t.a,ns),yi.subVectors(t.b,ns),Si.subVectors(t.c,ns),Fn.subVectors(yi,Mi),Un.subVectors(Si,yi),qn.subVectors(Mi,Si);let e=[0,-Fn.z,Fn.y,0,-Un.z,Un.y,0,-qn.z,qn.y,Fn.z,0,-Fn.x,Un.z,0,-Un.x,qn.z,0,-qn.x,-Fn.y,Fn.x,0,-Un.y,Un.x,0,-qn.y,qn.x,0];return!Io(e,Mi,yi,Si,Ts)||(e=[1,0,0,0,1,0,0,0,1],!Io(e,Mi,yi,Si,Ts))?!1:(As.crossVectors(Fn,Un),e=[As.x,As.y,As.z],Io(e,Mi,yi,Si,Ts))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,on).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(on).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(_n[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),_n[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),_n[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),_n[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),_n[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),_n[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),_n[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),_n[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(_n),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const _n=[new O,new O,new O,new O,new O,new O,new O,new O],on=new O,ws=new gi,Mi=new O,yi=new O,Si=new O,Fn=new O,Un=new O,qn=new O,ns=new O,Ts=new O,As=new O,Yn=new O;function Io(s,t,e,n,i){for(let o=0,r=s.length-3;o<=r;o+=3){Yn.fromArray(s,o);const a=i.x*Math.abs(Yn.x)+i.y*Math.abs(Yn.y)+i.z*Math.abs(Yn.z),l=t.dot(Yn),c=e.dot(Yn),h=n.dot(Yn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const su=new gi,is=new O,Fo=new O;class ji{constructor(t=new O,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):su.setFromPoints(t).getCenter(n);let i=0;for(let o=0,r=t.length;o<r;o++)i=Math.max(i,n.distanceToSquared(t[o]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;is.subVectors(t,this.center);const e=is.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(is,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Fo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(is.copy(t.center).add(Fo)),this.expandByPoint(is.copy(t.center).sub(Fo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Mn=new O,Uo=new O,Cs=new O,Nn=new O,No=new O,Rs=new O,zo=new O;class xa{constructor(t=new O,e=new O(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Mn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Mn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Mn.copy(this.origin).addScaledVector(this.direction,e),Mn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Uo.copy(t).add(e).multiplyScalar(.5),Cs.copy(e).sub(t).normalize(),Nn.copy(this.origin).sub(Uo);const o=t.distanceTo(e)*.5,r=-this.direction.dot(Cs),a=Nn.dot(this.direction),l=-Nn.dot(Cs),c=Nn.lengthSq(),h=Math.abs(1-r*r);let u,f,p,g;if(h>0)if(u=r*l-a,f=r*a-l,g=o*h,u>=0)if(f>=-g)if(f<=g){const v=1/h;u*=v,f*=v,p=u*(u+r*f+2*a)+f*(r*u+f+2*l)+c}else f=o,u=Math.max(0,-(r*f+a)),p=-u*u+f*(f+2*l)+c;else f=-o,u=Math.max(0,-(r*f+a)),p=-u*u+f*(f+2*l)+c;else f<=-g?(u=Math.max(0,-(-r*o+a)),f=u>0?-o:Math.min(Math.max(-o,-l),o),p=-u*u+f*(f+2*l)+c):f<=g?(u=0,f=Math.min(Math.max(-o,-l),o),p=f*(f+2*l)+c):(u=Math.max(0,-(r*o+a)),f=u>0?o:Math.min(Math.max(-o,-l),o),p=-u*u+f*(f+2*l)+c);else f=r>0?-o:o,u=Math.max(0,-(r*f+a)),p=-u*u+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Uo).addScaledVector(Cs,f),p}intersectSphere(t,e){Mn.subVectors(t.center,this.origin);const n=Mn.dot(this.direction),i=Mn.dot(Mn)-n*n,o=t.radius*t.radius;if(i>o)return null;const r=Math.sqrt(o-i),a=n-r,l=n+r;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,o,r,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(n=(t.min.x-f.x)*c,i=(t.max.x-f.x)*c):(n=(t.max.x-f.x)*c,i=(t.min.x-f.x)*c),h>=0?(o=(t.min.y-f.y)*h,r=(t.max.y-f.y)*h):(o=(t.max.y-f.y)*h,r=(t.min.y-f.y)*h),n>r||o>i||((o>n||isNaN(n))&&(n=o),(r<i||isNaN(i))&&(i=r),u>=0?(a=(t.min.z-f.z)*u,l=(t.max.z-f.z)*u):(a=(t.max.z-f.z)*u,l=(t.min.z-f.z)*u),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Mn)!==null}intersectTriangle(t,e,n,i,o){No.subVectors(e,t),Rs.subVectors(n,t),zo.crossVectors(No,Rs);let r=this.direction.dot(zo),a;if(r>0){if(i)return null;a=1}else if(r<0)a=-1,r=-r;else return null;Nn.subVectors(this.origin,t);const l=a*this.direction.dot(Rs.crossVectors(Nn,Rs));if(l<0)return null;const c=a*this.direction.dot(No.cross(Nn));if(c<0||l+c>r)return null;const h=-a*Nn.dot(zo);return h<0?null:this.at(h/r,o)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class oe{constructor(t,e,n,i,o,r,a,l,c,h,u,f,p,g,v,m){oe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,o,r,a,l,c,h,u,f,p,g,v,m)}set(t,e,n,i,o,r,a,l,c,h,u,f,p,g,v,m){const d=this.elements;return d[0]=t,d[4]=e,d[8]=n,d[12]=i,d[1]=o,d[5]=r,d[9]=a,d[13]=l,d[2]=c,d[6]=h,d[10]=u,d[14]=f,d[3]=p,d[7]=g,d[11]=v,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new oe().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/bi.setFromMatrixColumn(t,0).length(),o=1/bi.setFromMatrixColumn(t,1).length(),r=1/bi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*o,e[5]=n[5]*o,e[6]=n[6]*o,e[7]=0,e[8]=n[8]*r,e[9]=n[9]*r,e[10]=n[10]*r,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,o=t.z,r=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(o),u=Math.sin(o);if(t.order==="XYZ"){const f=r*h,p=r*u,g=a*h,v=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=p+g*c,e[5]=f-v*c,e[9]=-a*l,e[2]=v-f*c,e[6]=g+p*c,e[10]=r*l}else if(t.order==="YXZ"){const f=l*h,p=l*u,g=c*h,v=c*u;e[0]=f+v*a,e[4]=g*a-p,e[8]=r*c,e[1]=r*u,e[5]=r*h,e[9]=-a,e[2]=p*a-g,e[6]=v+f*a,e[10]=r*l}else if(t.order==="ZXY"){const f=l*h,p=l*u,g=c*h,v=c*u;e[0]=f-v*a,e[4]=-r*u,e[8]=g+p*a,e[1]=p+g*a,e[5]=r*h,e[9]=v-f*a,e[2]=-r*c,e[6]=a,e[10]=r*l}else if(t.order==="ZYX"){const f=r*h,p=r*u,g=a*h,v=a*u;e[0]=l*h,e[4]=g*c-p,e[8]=f*c+v,e[1]=l*u,e[5]=v*c+f,e[9]=p*c-g,e[2]=-c,e[6]=a*l,e[10]=r*l}else if(t.order==="YZX"){const f=r*l,p=r*c,g=a*l,v=a*c;e[0]=l*h,e[4]=v-f*u,e[8]=g*u+p,e[1]=u,e[5]=r*h,e[9]=-a*h,e[2]=-c*h,e[6]=p*u+g,e[10]=f-v*u}else if(t.order==="XZY"){const f=r*l,p=r*c,g=a*l,v=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=f*u+v,e[5]=r*h,e[9]=p*u-g,e[2]=g*u-p,e[6]=a*h,e[10]=v*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(ou,t,ru)}lookAt(t,e,n){const i=this.elements;return He.subVectors(t,e),He.lengthSq()===0&&(He.z=1),He.normalize(),zn.crossVectors(n,He),zn.lengthSq()===0&&(Math.abs(n.z)===1?He.x+=1e-4:He.z+=1e-4,He.normalize(),zn.crossVectors(n,He)),zn.normalize(),Ps.crossVectors(He,zn),i[0]=zn.x,i[4]=Ps.x,i[8]=He.x,i[1]=zn.y,i[5]=Ps.y,i[9]=He.y,i[2]=zn.z,i[6]=Ps.z,i[10]=He.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,o=this.elements,r=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],f=n[9],p=n[13],g=n[2],v=n[6],m=n[10],d=n[14],x=n[3],y=n[7],M=n[11],D=n[15],C=i[0],E=i[4],L=i[8],S=i[12],_=i[1],w=i[5],R=i[9],A=i[13],I=i[2],z=i[6],W=i[10],Q=i[14],k=i[3],K=i[7],q=i[11],ct=i[15];return o[0]=r*C+a*_+l*I+c*k,o[4]=r*E+a*w+l*z+c*K,o[8]=r*L+a*R+l*W+c*q,o[12]=r*S+a*A+l*Q+c*ct,o[1]=h*C+u*_+f*I+p*k,o[5]=h*E+u*w+f*z+p*K,o[9]=h*L+u*R+f*W+p*q,o[13]=h*S+u*A+f*Q+p*ct,o[2]=g*C+v*_+m*I+d*k,o[6]=g*E+v*w+m*z+d*K,o[10]=g*L+v*R+m*W+d*q,o[14]=g*S+v*A+m*Q+d*ct,o[3]=x*C+y*_+M*I+D*k,o[7]=x*E+y*w+M*z+D*K,o[11]=x*L+y*R+M*W+D*q,o[15]=x*S+y*A+M*Q+D*ct,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],o=t[12],r=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],f=t[10],p=t[14],g=t[3],v=t[7],m=t[11],d=t[15];return g*(+o*l*u-i*c*u-o*a*f+n*c*f+i*a*p-n*l*p)+v*(+e*l*p-e*c*f+o*r*f-i*r*p+i*c*h-o*l*h)+m*(+e*c*u-e*a*p-o*r*u+n*r*p+o*a*h-n*c*h)+d*(-i*a*h-e*l*u+e*a*f+i*r*u-n*r*f+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],o=t[3],r=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],f=t[10],p=t[11],g=t[12],v=t[13],m=t[14],d=t[15],x=u*m*c-v*f*c+v*l*p-a*m*p-u*l*d+a*f*d,y=g*f*c-h*m*c-g*l*p+r*m*p+h*l*d-r*f*d,M=h*v*c-g*u*c+g*a*p-r*v*p-h*a*d+r*u*d,D=g*u*l-h*v*l-g*a*f+r*v*f+h*a*m-r*u*m,C=e*x+n*y+i*M+o*D;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const E=1/C;return t[0]=x*E,t[1]=(v*f*o-u*m*o-v*i*p+n*m*p+u*i*d-n*f*d)*E,t[2]=(a*m*o-v*l*o+v*i*c-n*m*c-a*i*d+n*l*d)*E,t[3]=(u*l*o-a*f*o-u*i*c+n*f*c+a*i*p-n*l*p)*E,t[4]=y*E,t[5]=(h*m*o-g*f*o+g*i*p-e*m*p-h*i*d+e*f*d)*E,t[6]=(g*l*o-r*m*o-g*i*c+e*m*c+r*i*d-e*l*d)*E,t[7]=(r*f*o-h*l*o+h*i*c-e*f*c-r*i*p+e*l*p)*E,t[8]=M*E,t[9]=(g*u*o-h*v*o-g*n*p+e*v*p+h*n*d-e*u*d)*E,t[10]=(r*v*o-g*a*o+g*n*c-e*v*c-r*n*d+e*a*d)*E,t[11]=(h*a*o-r*u*o-h*n*c+e*u*c+r*n*p-e*a*p)*E,t[12]=D*E,t[13]=(h*v*i-g*u*i+g*n*f-e*v*f-h*n*m+e*u*m)*E,t[14]=(g*a*i-r*v*i-g*n*l+e*v*l+r*n*m-e*a*m)*E,t[15]=(r*u*i-h*a*i+h*n*l-e*u*l-r*n*f+e*a*f)*E,this}scale(t){const e=this.elements,n=t.x,i=t.y,o=t.z;return e[0]*=n,e[4]*=i,e[8]*=o,e[1]*=n,e[5]*=i,e[9]*=o,e[2]*=n,e[6]*=i,e[10]*=o,e[3]*=n,e[7]*=i,e[11]*=o,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),o=1-n,r=t.x,a=t.y,l=t.z,c=o*r,h=o*a;return this.set(c*r+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*r,0,c*l-i*a,h*l+i*r,o*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,o,r){return this.set(1,n,o,0,t,1,r,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,o=e._x,r=e._y,a=e._z,l=e._w,c=o+o,h=r+r,u=a+a,f=o*c,p=o*h,g=o*u,v=r*h,m=r*u,d=a*u,x=l*c,y=l*h,M=l*u,D=n.x,C=n.y,E=n.z;return i[0]=(1-(v+d))*D,i[1]=(p+M)*D,i[2]=(g-y)*D,i[3]=0,i[4]=(p-M)*C,i[5]=(1-(f+d))*C,i[6]=(m+x)*C,i[7]=0,i[8]=(g+y)*E,i[9]=(m-x)*E,i[10]=(1-(f+v))*E,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let o=bi.set(i[0],i[1],i[2]).length();const r=bi.set(i[4],i[5],i[6]).length(),a=bi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(o=-o),t.x=i[12],t.y=i[13],t.z=i[14],rn.copy(this);const c=1/o,h=1/r,u=1/a;return rn.elements[0]*=c,rn.elements[1]*=c,rn.elements[2]*=c,rn.elements[4]*=h,rn.elements[5]*=h,rn.elements[6]*=h,rn.elements[8]*=u,rn.elements[9]*=u,rn.elements[10]*=u,e.setFromRotationMatrix(rn),n.x=o,n.y=r,n.z=a,this}makePerspective(t,e,n,i,o,r,a=Cn){const l=this.elements,c=2*o/(e-t),h=2*o/(n-i),u=(e+t)/(e-t),f=(n+i)/(n-i);let p,g;if(a===Cn)p=-(r+o)/(r-o),g=-2*r*o/(r-o);else if(a===po)p=-r/(r-o),g=-r*o/(r-o);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,o,r,a=Cn){const l=this.elements,c=1/(e-t),h=1/(n-i),u=1/(r-o),f=(e+t)*c,p=(n+i)*h;let g,v;if(a===Cn)g=(r+o)*u,v=-2*u;else if(a===po)g=o*u,v=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=v,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const bi=new O,rn=new oe,ou=new O(0,0,0),ru=new O(1,1,1),zn=new O,Ps=new O,He=new O,Ja=new oe,Qa=new _s;class mn{constructor(t=0,e=0,n=0,i=mn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,o=i[0],r=i[4],a=i[8],l=i[1],c=i[5],h=i[9],u=i[2],f=i[6],p=i[10];switch(e){case"XYZ":this._y=Math.asin(Ne(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-r,o)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ne(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,o),this._z=0);break;case"ZXY":this._x=Math.asin(Ne(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,o));break;case"ZYX":this._y=Math.asin(-Ne(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,o)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(Ne(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,o)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Ne(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,o)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Ja.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Ja,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Qa.setFromEuler(this),this.setFromQuaternion(Qa,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}mn.DEFAULT_ORDER="XYZ";class _a{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let au=0;const tl=new O,Ei=new _s,yn=new oe,Ds=new O,ss=new O,lu=new O,cu=new _s,el=new O(1,0,0),nl=new O(0,1,0),il=new O(0,0,1),sl={type:"added"},hu={type:"removed"},wi={type:"childadded",child:null},Bo={type:"childremoved",child:null};class qt extends Zi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:au++}),this.uuid=xs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=qt.DEFAULT_UP.clone();const t=new O,e=new mn,n=new _s,i=new O(1,1,1);function o(){n.setFromEuler(e,!1)}function r(){e.setFromQuaternion(n,void 0,!1)}e._onChange(o),n._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new oe},normalMatrix:{value:new Gt}}),this.matrix=new oe,this.matrixWorld=new oe,this.matrixAutoUpdate=qt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=qt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new _a,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ei.setFromAxisAngle(t,e),this.quaternion.multiply(Ei),this}rotateOnWorldAxis(t,e){return Ei.setFromAxisAngle(t,e),this.quaternion.premultiply(Ei),this}rotateX(t){return this.rotateOnAxis(el,t)}rotateY(t){return this.rotateOnAxis(nl,t)}rotateZ(t){return this.rotateOnAxis(il,t)}translateOnAxis(t,e){return tl.copy(t).applyQuaternion(this.quaternion),this.position.add(tl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(el,t)}translateY(t){return this.translateOnAxis(nl,t)}translateZ(t){return this.translateOnAxis(il,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(yn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Ds.copy(t):Ds.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),ss.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?yn.lookAt(ss,Ds,this.up):yn.lookAt(Ds,ss,this.up),this.quaternion.setFromRotationMatrix(yn),i&&(yn.extractRotation(i.matrixWorld),Ei.setFromRotationMatrix(yn),this.quaternion.premultiply(Ei.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(sl),wi.child=t,this.dispatchEvent(wi),wi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(hu),Bo.child=t,this.dispatchEvent(Bo),Bo.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),yn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),yn.multiply(t.parent.matrixWorld)),t.applyMatrix4(yn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(sl),wi.child=t,this.dispatchEvent(wi),wi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const r=this.children[n].getObjectByProperty(t,e);if(r!==void 0)return r}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let o=0,r=i.length;o<r;o++)i[o].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ss,t,lu),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ss,cu,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let o=0,r=i.length;o<r;o++)i[o].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function o(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=o(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];o(t.shapes,u)}else o(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(o(t.materials,this.material[l]));i.material=a}else i.material=o(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(o(t.animations,l))}}if(e){const a=r(t.geometries),l=r(t.materials),c=r(t.textures),h=r(t.images),u=r(t.shapes),f=r(t.skeletons),p=r(t.animations),g=r(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=i,n;function r(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}qt.DEFAULT_UP=new O(0,1,0);qt.DEFAULT_MATRIX_AUTO_UPDATE=!0;qt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const an=new O,Sn=new O,Oo=new O,bn=new O,Ti=new O,Ai=new O,ol=new O,ko=new O,Ho=new O,Go=new O,Vo=new de,Wo=new de,Xo=new de;class Je{constructor(t=new O,e=new O,n=new O){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),an.subVectors(t,e),i.cross(an);const o=i.lengthSq();return o>0?i.multiplyScalar(1/Math.sqrt(o)):i.set(0,0,0)}static getBarycoord(t,e,n,i,o){an.subVectors(i,e),Sn.subVectors(n,e),Oo.subVectors(t,e);const r=an.dot(an),a=an.dot(Sn),l=an.dot(Oo),c=Sn.dot(Sn),h=Sn.dot(Oo),u=r*c-a*a;if(u===0)return o.set(0,0,0),null;const f=1/u,p=(c*l-a*h)*f,g=(r*h-a*l)*f;return o.set(1-p-g,g,p)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,bn)===null?!1:bn.x>=0&&bn.y>=0&&bn.x+bn.y<=1}static getInterpolation(t,e,n,i,o,r,a,l){return this.getBarycoord(t,e,n,i,bn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(o,bn.x),l.addScaledVector(r,bn.y),l.addScaledVector(a,bn.z),l)}static getInterpolatedAttribute(t,e,n,i,o,r){return Vo.setScalar(0),Wo.setScalar(0),Xo.setScalar(0),Vo.fromBufferAttribute(t,e),Wo.fromBufferAttribute(t,n),Xo.fromBufferAttribute(t,i),r.setScalar(0),r.addScaledVector(Vo,o.x),r.addScaledVector(Wo,o.y),r.addScaledVector(Xo,o.z),r}static isFrontFacing(t,e,n,i){return an.subVectors(n,e),Sn.subVectors(t,e),an.cross(Sn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return an.subVectors(this.c,this.b),Sn.subVectors(this.a,this.b),an.cross(Sn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Je.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Je.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,o){return Je.getInterpolation(t,this.a,this.b,this.c,e,n,i,o)}containsPoint(t){return Je.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Je.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,o=this.c;let r,a;Ti.subVectors(i,n),Ai.subVectors(o,n),ko.subVectors(t,n);const l=Ti.dot(ko),c=Ai.dot(ko);if(l<=0&&c<=0)return e.copy(n);Ho.subVectors(t,i);const h=Ti.dot(Ho),u=Ai.dot(Ho);if(h>=0&&u<=h)return e.copy(i);const f=l*u-h*c;if(f<=0&&l>=0&&h<=0)return r=l/(l-h),e.copy(n).addScaledVector(Ti,r);Go.subVectors(t,o);const p=Ti.dot(Go),g=Ai.dot(Go);if(g>=0&&p<=g)return e.copy(o);const v=p*c-l*g;if(v<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(n).addScaledVector(Ai,a);const m=h*g-p*u;if(m<=0&&u-h>=0&&p-g>=0)return ol.subVectors(o,i),a=(u-h)/(u-h+(p-g)),e.copy(i).addScaledVector(ol,a);const d=1/(m+v+f);return r=v*d,a=f*d,e.copy(n).addScaledVector(Ti,r).addScaledVector(Ai,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Bc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Bn={h:0,s:0,l:0},Ls={h:0,s:0,l:0};function $o(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class J{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=De){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,jt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=jt.workingColorSpace){return this.r=t,this.g=e,this.b=n,jt.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=jt.workingColorSpace){if(t=Yh(t,1),e=Ne(e,0,1),n=Ne(n,0,1),e===0)this.r=this.g=this.b=n;else{const o=n<=.5?n*(1+e):n+e-n*e,r=2*n-o;this.r=$o(r,o,t+1/3),this.g=$o(r,o,t),this.b=$o(r,o,t-1/3)}return jt.toWorkingColorSpace(this,i),this}setStyle(t,e=De){function n(o){o!==void 0&&parseFloat(o)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let o;const r=i[1],a=i[2];switch(r){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,e);if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setRGB(Math.min(100,parseInt(o[1],10))/100,Math.min(100,parseInt(o[2],10))/100,Math.min(100,parseInt(o[3],10))/100,e);break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const o=i[1],r=o.length;if(r===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,e);if(r===6)return this.setHex(parseInt(o,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=De){const n=Bc[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Pn(t.r),this.g=Pn(t.g),this.b=Pn(t.b),this}copyLinearToSRGB(t){return this.r=ki(t.r),this.g=ki(t.g),this.b=ki(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=De){return jt.fromWorkingColorSpace(we.copy(this),t),Math.round(Ne(we.r*255,0,255))*65536+Math.round(Ne(we.g*255,0,255))*256+Math.round(Ne(we.b*255,0,255))}getHexString(t=De){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=jt.workingColorSpace){jt.fromWorkingColorSpace(we.copy(this),e);const n=we.r,i=we.g,o=we.b,r=Math.max(n,i,o),a=Math.min(n,i,o);let l,c;const h=(a+r)/2;if(a===r)l=0,c=0;else{const u=r-a;switch(c=h<=.5?u/(r+a):u/(2-r-a),r){case n:l=(i-o)/u+(i<o?6:0);break;case i:l=(o-n)/u+2;break;case o:l=(n-i)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=jt.workingColorSpace){return jt.fromWorkingColorSpace(we.copy(this),e),t.r=we.r,t.g=we.g,t.b=we.b,t}getStyle(t=De){jt.fromWorkingColorSpace(we.copy(this),t);const e=we.r,n=we.g,i=we.b;return t!==De?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Bn),this.setHSL(Bn.h+t,Bn.s+e,Bn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Bn),t.getHSL(Ls);const n=Ro(Bn.h,Ls.h,e),i=Ro(Bn.s,Ls.s,e),o=Ro(Bn.l,Ls.l,e);return this.setHSL(n,i,o),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,o=t.elements;return this.r=o[0]*e+o[3]*n+o[6]*i,this.g=o[1]*e+o[4]*n+o[7]*i,this.b=o[2]*e+o[5]*n+o[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const we=new J;J.NAMES=Bc;let uu=0;class Ki extends Zi{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:uu++}),this.uuid=xs(),this.name="",this.blending=Bi,this.side=Xn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=xr,this.blendDst=_r,this.blendEquation=ni,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new J(0,0,0),this.blendAlpha=0,this.depthFunc=Gi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ga,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=xi,this.stencilZFail=xi,this.stencilZPass=xi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Bi&&(n.blending=this.blending),this.side!==Xn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==xr&&(n.blendSrc=this.blendSrc),this.blendDst!==_r&&(n.blendDst=this.blendDst),this.blendEquation!==ni&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Gi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ga&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==xi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==xi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==xi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(o){const r=[];for(const a in o){const l=o[a];delete l.metadata,r.push(l)}return r}if(e){const o=i(t.textures),r=i(t.images);o.length>0&&(n.textures=o),r.length>0&&(n.images=r)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let o=0;o!==i;++o)n[o]=e[o].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Me extends Ki{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new J(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new mn,this.combine=yc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const me=new O,Is=new Xt;class pe{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Va,this.updateRanges=[],this.gpuType=pn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,o=this.itemSize;i<o;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Is.fromBufferAttribute(this,e),Is.applyMatrix3(t),this.setXY(e,Is.x,Is.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)me.fromBufferAttribute(this,e),me.applyMatrix3(t),this.setXYZ(e,me.x,me.y,me.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)me.fromBufferAttribute(this,e),me.applyMatrix4(t),this.setXYZ(e,me.x,me.y,me.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)me.fromBufferAttribute(this,e),me.applyNormalMatrix(t),this.setXYZ(e,me.x,me.y,me.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)me.fromBufferAttribute(this,e),me.transformDirection(t),this.setXYZ(e,me.x,me.y,me.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=es(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Ie(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=es(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ie(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=es(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ie(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=es(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ie(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=es(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ie(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Ie(e,this.array),n=Ie(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=Ie(e,this.array),n=Ie(n,this.array),i=Ie(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,o){return t*=this.itemSize,this.normalized&&(e=Ie(e,this.array),n=Ie(n,this.array),i=Ie(i,this.array),o=Ie(o,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=o,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Va&&(t.usage=this.usage),t}}class Oc extends pe{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class kc extends pe{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Yt extends pe{constructor(t,e,n){super(new Float32Array(t),e,n)}}let du=0;const Ye=new oe,qo=new qt,Ci=new O,Ge=new gi,os=new gi,xe=new O;class fe extends Zi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:du++}),this.uuid=xs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Uc(t)?kc:Oc)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const o=new Gt().getNormalMatrix(t);n.applyNormalMatrix(o),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ye.makeRotationFromQuaternion(t),this.applyMatrix4(Ye),this}rotateX(t){return Ye.makeRotationX(t),this.applyMatrix4(Ye),this}rotateY(t){return Ye.makeRotationY(t),this.applyMatrix4(Ye),this}rotateZ(t){return Ye.makeRotationZ(t),this.applyMatrix4(Ye),this}translate(t,e,n){return Ye.makeTranslation(t,e,n),this.applyMatrix4(Ye),this}scale(t,e,n){return Ye.makeScale(t,e,n),this.applyMatrix4(Ye),this}lookAt(t){return qo.lookAt(t),qo.updateMatrix(),this.applyMatrix4(qo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ci).negate(),this.translate(Ci.x,Ci.y,Ci.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let i=0,o=t.length;i<o;i++){const r=t[i];n.push(r.x,r.y,r.z||0)}this.setAttribute("position",new Yt(n,3))}else{for(let n=0,i=e.count;n<i;n++){const o=t[n];e.setXYZ(n,o.x,o.y,o.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new gi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const o=e[n];Ge.setFromBufferAttribute(o),this.morphTargetsRelative?(xe.addVectors(this.boundingBox.min,Ge.min),this.boundingBox.expandByPoint(xe),xe.addVectors(this.boundingBox.max,Ge.max),this.boundingBox.expandByPoint(xe)):(this.boundingBox.expandByPoint(Ge.min),this.boundingBox.expandByPoint(Ge.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ji);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new O,1/0);return}if(t){const n=this.boundingSphere.center;if(Ge.setFromBufferAttribute(t),e)for(let o=0,r=e.length;o<r;o++){const a=e[o];os.setFromBufferAttribute(a),this.morphTargetsRelative?(xe.addVectors(Ge.min,os.min),Ge.expandByPoint(xe),xe.addVectors(Ge.max,os.max),Ge.expandByPoint(xe)):(Ge.expandByPoint(os.min),Ge.expandByPoint(os.max))}Ge.getCenter(n);let i=0;for(let o=0,r=t.count;o<r;o++)xe.fromBufferAttribute(t,o),i=Math.max(i,n.distanceToSquared(xe));if(e)for(let o=0,r=e.length;o<r;o++){const a=e[o],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)xe.fromBufferAttribute(a,c),l&&(Ci.fromBufferAttribute(t,c),xe.add(Ci)),i=Math.max(i,n.distanceToSquared(xe))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,o=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new pe(new Float32Array(4*n.count),4));const r=this.getAttribute("tangent"),a=[],l=[];for(let L=0;L<n.count;L++)a[L]=new O,l[L]=new O;const c=new O,h=new O,u=new O,f=new Xt,p=new Xt,g=new Xt,v=new O,m=new O;function d(L,S,_){c.fromBufferAttribute(n,L),h.fromBufferAttribute(n,S),u.fromBufferAttribute(n,_),f.fromBufferAttribute(o,L),p.fromBufferAttribute(o,S),g.fromBufferAttribute(o,_),h.sub(c),u.sub(c),p.sub(f),g.sub(f);const w=1/(p.x*g.y-g.x*p.y);isFinite(w)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(u,-p.y).multiplyScalar(w),m.copy(u).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(w),a[L].add(v),a[S].add(v),a[_].add(v),l[L].add(m),l[S].add(m),l[_].add(m))}let x=this.groups;x.length===0&&(x=[{start:0,count:t.count}]);for(let L=0,S=x.length;L<S;++L){const _=x[L],w=_.start,R=_.count;for(let A=w,I=w+R;A<I;A+=3)d(t.getX(A+0),t.getX(A+1),t.getX(A+2))}const y=new O,M=new O,D=new O,C=new O;function E(L){D.fromBufferAttribute(i,L),C.copy(D);const S=a[L];y.copy(S),y.sub(D.multiplyScalar(D.dot(S))).normalize(),M.crossVectors(C,S);const w=M.dot(l[L])<0?-1:1;r.setXYZW(L,y.x,y.y,y.z,w)}for(let L=0,S=x.length;L<S;++L){const _=x[L],w=_.start,R=_.count;for(let A=w,I=w+R;A<I;A+=3)E(t.getX(A+0)),E(t.getX(A+1)),E(t.getX(A+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new pe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,p=n.count;f<p;f++)n.setXYZ(f,0,0,0);const i=new O,o=new O,r=new O,a=new O,l=new O,c=new O,h=new O,u=new O;if(t)for(let f=0,p=t.count;f<p;f+=3){const g=t.getX(f+0),v=t.getX(f+1),m=t.getX(f+2);i.fromBufferAttribute(e,g),o.fromBufferAttribute(e,v),r.fromBufferAttribute(e,m),h.subVectors(r,o),u.subVectors(i,o),h.cross(u),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,p=e.count;f<p;f+=3)i.fromBufferAttribute(e,f+0),o.fromBufferAttribute(e,f+1),r.fromBufferAttribute(e,f+2),h.subVectors(r,o),u.subVectors(i,o),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)xe.fromBufferAttribute(t,e),xe.normalize(),t.setXYZ(e,xe.x,xe.y,xe.z)}toNonIndexed(){function t(a,l){const c=a.array,h=a.itemSize,u=a.normalized,f=new c.constructor(l.length*h);let p=0,g=0;for(let v=0,m=l.length;v<m;v++){a.isInterleavedBufferAttribute?p=l[v]*a.data.stride+a.offset:p=l[v]*h;for(let d=0;d<h;d++)f[g++]=c[p++]}return new pe(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new fe,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=t(l,n);e.setAttribute(a,c)}const o=this.morphAttributes;for(const a in o){const l=[],c=o[a];for(let h=0,u=c.length;h<u;h++){const f=c[h],p=t(f,n);l.push(p)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let a=0,l=r.length;a<l;a++){const c=r[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const i={};let o=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){const p=c[u];h.push(p.toJSON(t.data))}h.length>0&&(i[l]=h,o=!0)}o&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(t.data.groups=JSON.parse(JSON.stringify(r)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(e))}const o=t.morphAttributes;for(const c in o){const h=[],u=o[c];for(let f=0,p=u.length;f<p;f++)h.push(u[f].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const r=t.groups;for(let c=0,h=r.length;c<h;c++){const u=r[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const rl=new oe,Zn=new xa,Fs=new ji,al=new O,Us=new O,Ns=new O,zs=new O,Yo=new O,Bs=new O,ll=new O,Os=new O;class Kt extends qt{constructor(t=new fe,e=new Me){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,r=i.length;o<r;o++){const a=i[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,o=n.morphAttributes.position,r=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const a=this.morphTargetInfluences;if(o&&a){Bs.set(0,0,0);for(let l=0,c=o.length;l<c;l++){const h=a[l],u=o[l];h!==0&&(Yo.fromBufferAttribute(u,t),r?Bs.addScaledVector(Yo,h):Bs.addScaledVector(Yo.sub(e),h))}e.add(Bs)}return e}raycast(t,e){const n=this.geometry,i=this.material,o=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Fs.copy(n.boundingSphere),Fs.applyMatrix4(o),Zn.copy(t.ray).recast(t.near),!(Fs.containsPoint(Zn.origin)===!1&&(Zn.intersectSphere(Fs,al)===null||Zn.origin.distanceToSquared(al)>(t.far-t.near)**2))&&(rl.copy(o).invert(),Zn.copy(t.ray).applyMatrix4(rl),!(n.boundingBox!==null&&Zn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Zn)))}_computeIntersections(t,e,n){let i;const o=this.geometry,r=this.material,a=o.index,l=o.attributes.position,c=o.attributes.uv,h=o.attributes.uv1,u=o.attributes.normal,f=o.groups,p=o.drawRange;if(a!==null)if(Array.isArray(r))for(let g=0,v=f.length;g<v;g++){const m=f[g],d=r[m.materialIndex],x=Math.max(m.start,p.start),y=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let M=x,D=y;M<D;M+=3){const C=a.getX(M),E=a.getX(M+1),L=a.getX(M+2);i=ks(this,d,t,n,c,h,u,C,E,L),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,p.start),v=Math.min(a.count,p.start+p.count);for(let m=g,d=v;m<d;m+=3){const x=a.getX(m),y=a.getX(m+1),M=a.getX(m+2);i=ks(this,r,t,n,c,h,u,x,y,M),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(r))for(let g=0,v=f.length;g<v;g++){const m=f[g],d=r[m.materialIndex],x=Math.max(m.start,p.start),y=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let M=x,D=y;M<D;M+=3){const C=M,E=M+1,L=M+2;i=ks(this,d,t,n,c,h,u,C,E,L),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,p.start),v=Math.min(l.count,p.start+p.count);for(let m=g,d=v;m<d;m+=3){const x=m,y=m+1,M=m+2;i=ks(this,r,t,n,c,h,u,x,y,M),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}}}function fu(s,t,e,n,i,o,r,a){let l;if(t.side===Ce?l=n.intersectTriangle(r,o,i,!0,a):l=n.intersectTriangle(i,o,r,t.side===Xn,a),l===null)return null;Os.copy(a),Os.applyMatrix4(s.matrixWorld);const c=e.ray.origin.distanceTo(Os);return c<e.near||c>e.far?null:{distance:c,point:Os.clone(),object:s}}function ks(s,t,e,n,i,o,r,a,l,c){s.getVertexPosition(a,Us),s.getVertexPosition(l,Ns),s.getVertexPosition(c,zs);const h=fu(s,t,e,n,Us,Ns,zs,ll);if(h){const u=new O;Je.getBarycoord(ll,Us,Ns,zs,u),i&&(h.uv=Je.getInterpolatedAttribute(i,a,l,c,u,new Xt)),o&&(h.uv1=Je.getInterpolatedAttribute(o,a,l,c,u,new Xt)),r&&(h.normal=Je.getInterpolatedAttribute(r,a,l,c,u,new O),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new O,materialIndex:0};Je.getNormal(Us,Ns,zs,f.normal),h.face=f,h.barycoord=u}return h}class Te extends fe{constructor(t=1,e=1,n=1,i=1,o=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:o,depthSegments:r};const a=this;i=Math.floor(i),o=Math.floor(o),r=Math.floor(r);const l=[],c=[],h=[],u=[];let f=0,p=0;g("z","y","x",-1,-1,n,e,t,r,o,0),g("z","y","x",1,-1,n,e,-t,r,o,1),g("x","z","y",1,1,t,n,e,i,r,2),g("x","z","y",1,-1,t,n,-e,i,r,3),g("x","y","z",1,-1,t,e,n,i,o,4),g("x","y","z",-1,-1,t,e,-n,i,o,5),this.setIndex(l),this.setAttribute("position",new Yt(c,3)),this.setAttribute("normal",new Yt(h,3)),this.setAttribute("uv",new Yt(u,2));function g(v,m,d,x,y,M,D,C,E,L,S){const _=M/E,w=D/L,R=M/2,A=D/2,I=C/2,z=E+1,W=L+1;let Q=0,k=0;const K=new O;for(let q=0;q<W;q++){const ct=q*w-A;for(let xt=0;xt<z;xt++){const Y=xt*_-R;K[v]=Y*x,K[m]=ct*y,K[d]=I,c.push(K.x,K.y,K.z),K[v]=0,K[m]=0,K[d]=C>0?1:-1,h.push(K.x,K.y,K.z),u.push(xt/E),u.push(1-q/L),Q+=1}}for(let q=0;q<L;q++)for(let ct=0;ct<E;ct++){const xt=f+ct+z*q,Y=f+ct+z*(q+1),U=f+(ct+1)+z*(q+1),X=f+(ct+1)+z*q;l.push(xt,Y,X),l.push(Y,U,X),k+=6}a.addGroup(p,k,S),p+=k,f+=Q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Te(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function qi(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function Pe(s){const t={};for(let e=0;e<s.length;e++){const n=qi(s[e]);for(const i in n)t[i]=n[i]}return t}function pu(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function Hc(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:jt.workingColorSpace}const mu={clone:qi,merge:Pe};var gu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,vu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Be extends Ki{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=gu,this.fragmentShader=vu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=qi(t.uniforms),this.uniformsGroups=pu(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const r=this.uniforms[i].value;r&&r.isTexture?e.uniforms[i]={type:"t",value:r.toJSON(t).uuid}:r&&r.isColor?e.uniforms[i]={type:"c",value:r.getHex()}:r&&r.isVector2?e.uniforms[i]={type:"v2",value:r.toArray()}:r&&r.isVector3?e.uniforms[i]={type:"v3",value:r.toArray()}:r&&r.isVector4?e.uniforms[i]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?e.uniforms[i]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?e.uniforms[i]={type:"m4",value:r.toArray()}:e.uniforms[i]={value:r}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Gc extends qt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new oe,this.projectionMatrix=new oe,this.projectionMatrixInverse=new oe,this.coordinateSystem=Cn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const On=new O,cl=new Xt,hl=new Xt;class je extends Gc{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=na*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(co*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return na*2*Math.atan(Math.tan(co*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){On.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(On.x,On.y).multiplyScalar(-t/On.z),On.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(On.x,On.y).multiplyScalar(-t/On.z)}getViewSize(t,e){return this.getViewBounds(t,cl,hl),e.subVectors(hl,cl)}setViewOffset(t,e,n,i,o,r){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=o,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(co*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,o=-.5*i;const r=this.view;if(this.view!==null&&this.view.enabled){const l=r.fullWidth,c=r.fullHeight;o+=r.offsetX*i/l,e-=r.offsetY*n/c,i*=r.width/l,n*=r.height/c}const a=this.filmOffset;a!==0&&(o+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ri=-90,Pi=1;class xu extends qt{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new je(Ri,Pi,t,e);i.layers=this.layers,this.add(i);const o=new je(Ri,Pi,t,e);o.layers=this.layers,this.add(o);const r=new je(Ri,Pi,t,e);r.layers=this.layers,this.add(r);const a=new je(Ri,Pi,t,e);a.layers=this.layers,this.add(a);const l=new je(Ri,Pi,t,e);l.layers=this.layers,this.add(l);const c=new je(Ri,Pi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,o,r,a,l]=e;for(const c of e)this.remove(c);if(t===Cn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),o.up.set(0,0,-1),o.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===po)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),o.up.set(0,0,1),o.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[o,r,a,l,c,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,o),t.setRenderTarget(n,1,i),t.render(e,r),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(u,f,p),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Vc extends Re{constructor(t,e,n,i,o,r,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:Vi,super(t,e,n,i,o,r,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class _u extends Ve{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new Vc(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Ae}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Te(5,5,5),o=new Be({name:"CubemapFromEquirect",uniforms:qi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ce,blending:Vn});o.uniforms.tEquirect.value=e;const r=new Kt(i,o),a=e.minFilter;return e.minFilter===oi&&(e.minFilter=Ae),new xu(1,10,this).update(t,r),e.minFilter=a,r.geometry.dispose(),r.material.dispose(),this}clear(t,e,n,i){const o=t.getRenderTarget();for(let r=0;r<6;r++)t.setRenderTarget(this,r),t.clear(e,n,i);t.setRenderTarget(o)}}const Zo=new O,Mu=new O,yu=new Gt;class Tn{constructor(t=new O(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=Zo.subVectors(n,e).cross(Mu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Zo),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const o=-(t.start.dot(this.normal)+this.constant)/i;return o<0||o>1?null:e.copy(t.start).addScaledVector(n,o)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||yu.getNormalMatrix(t),i=this.coplanarPoint(Zo).applyMatrix4(t),o=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(o),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const jn=new ji,Hs=new O;class Ma{constructor(t=new Tn,e=new Tn,n=new Tn,i=new Tn,o=new Tn,r=new Tn){this.planes=[t,e,n,i,o,r]}set(t,e,n,i,o,r){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(o),a[5].copy(r),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Cn){const n=this.planes,i=t.elements,o=i[0],r=i[1],a=i[2],l=i[3],c=i[4],h=i[5],u=i[6],f=i[7],p=i[8],g=i[9],v=i[10],m=i[11],d=i[12],x=i[13],y=i[14],M=i[15];if(n[0].setComponents(l-o,f-c,m-p,M-d).normalize(),n[1].setComponents(l+o,f+c,m+p,M+d).normalize(),n[2].setComponents(l+r,f+h,m+g,M+x).normalize(),n[3].setComponents(l-r,f-h,m-g,M-x).normalize(),n[4].setComponents(l-a,f-u,m-v,M-y).normalize(),e===Cn)n[5].setComponents(l+a,f+u,m+v,M+y).normalize();else if(e===po)n[5].setComponents(a,u,v,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),jn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),jn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(jn)}intersectsSprite(t){return jn.center.set(0,0,0),jn.radius=.7071067811865476,jn.applyMatrix4(t.matrixWorld),this.intersectsSphere(jn)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let o=0;o<6;o++)if(e[o].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(Hs.x=i.normal.x>0?t.max.x:t.min.x,Hs.y=i.normal.y>0?t.max.y:t.min.y,Hs.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Hs)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Wc(){let s=null,t=!1,e=null,n=null;function i(o,r){e(o,r),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(o){e=o},setContext:function(o){s=o}}}function Su(s){const t=new WeakMap;function e(a,l){const c=a.array,h=a.usage,u=c.byteLength,f=s.createBuffer();s.bindBuffer(l,f),s.bufferData(l,c,h),a.onUploadCallback();let p;if(c instanceof Float32Array)p=s.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=s.HALF_FLOAT:p=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=s.SHORT;else if(c instanceof Uint32Array)p=s.UNSIGNED_INT;else if(c instanceof Int32Array)p=s.INT;else if(c instanceof Int8Array)p=s.BYTE;else if(c instanceof Uint8Array)p=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){const h=l.array,u=l.updateRanges;if(s.bindBuffer(c,a),u.length===0)s.bufferSubData(c,0,h);else{u.sort((p,g)=>p.start-g.start);let f=0;for(let p=1;p<u.length;p++){const g=u[f],v=u[p];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++f,u[f]=v)}u.length=f+1;for(let p=0,g=u.length;p<g;p++){const v=u[p];s.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function o(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(s.deleteBuffer(l.buffer),t.delete(a))}function r(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:o,update:r}}class en extends fe{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const o=t/2,r=e/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,u=t/a,f=e/l,p=[],g=[],v=[],m=[];for(let d=0;d<h;d++){const x=d*f-r;for(let y=0;y<c;y++){const M=y*u-o;g.push(M,-x,0),v.push(0,0,1),m.push(y/a),m.push(1-d/l)}}for(let d=0;d<l;d++)for(let x=0;x<a;x++){const y=x+c*d,M=x+c*(d+1),D=x+1+c*(d+1),C=x+1+c*d;p.push(y,M,C),p.push(M,D,C)}this.setIndex(p),this.setAttribute("position",new Yt(g,3)),this.setAttribute("normal",new Yt(v,3)),this.setAttribute("uv",new Yt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new en(t.width,t.height,t.widthSegments,t.heightSegments)}}var bu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Eu=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,wu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Tu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Au=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Cu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ru=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Pu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Du=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Lu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Iu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Fu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Uu=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Nu=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,zu=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Bu=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Ou=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ku=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Hu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Gu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Vu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Wu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Xu=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,$u=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,qu=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Yu=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Zu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ju=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ku=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ju=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Qu="gl_FragColor = linearToOutputTexel( gl_FragColor );",td=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ed=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,nd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,id=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,sd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,od=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,rd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ad=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ld=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,cd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,hd=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,ud=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,dd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,fd=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,pd=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,md=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,gd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,vd=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,xd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,_d=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Md=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,yd=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Sd=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,bd=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Ed=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,wd=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Td=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ad=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Cd=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Rd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Pd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Dd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Ld=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Id=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Fd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ud=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Nd=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,zd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Bd=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Od=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,kd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Hd=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Gd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Vd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Wd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Xd=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,$d=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,qd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Yd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Zd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,jd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Kd=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Jd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Qd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,tf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ef=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,nf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,sf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,of=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,rf=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,af=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,lf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,cf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,hf=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,uf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,df=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,ff=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,pf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,mf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,gf=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,vf=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,xf=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,_f=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Mf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,yf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Sf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const bf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ef=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Tf=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Af=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Cf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Pf=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Df=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Lf=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,If=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ff=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Uf=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Nf=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,zf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Bf=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Of=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,kf=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hf=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Gf=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vf=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Wf=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Xf=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$f=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qf=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Yf=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Zf=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,jf=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Kf=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Jf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Qf=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,tp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ep=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,np=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Wt={alphahash_fragment:bu,alphahash_pars_fragment:Eu,alphamap_fragment:wu,alphamap_pars_fragment:Tu,alphatest_fragment:Au,alphatest_pars_fragment:Cu,aomap_fragment:Ru,aomap_pars_fragment:Pu,batching_pars_vertex:Du,batching_vertex:Lu,begin_vertex:Iu,beginnormal_vertex:Fu,bsdfs:Uu,iridescence_fragment:Nu,bumpmap_pars_fragment:zu,clipping_planes_fragment:Bu,clipping_planes_pars_fragment:Ou,clipping_planes_pars_vertex:ku,clipping_planes_vertex:Hu,color_fragment:Gu,color_pars_fragment:Vu,color_pars_vertex:Wu,color_vertex:Xu,common:$u,cube_uv_reflection_fragment:qu,defaultnormal_vertex:Yu,displacementmap_pars_vertex:Zu,displacementmap_vertex:ju,emissivemap_fragment:Ku,emissivemap_pars_fragment:Ju,colorspace_fragment:Qu,colorspace_pars_fragment:td,envmap_fragment:ed,envmap_common_pars_fragment:nd,envmap_pars_fragment:id,envmap_pars_vertex:sd,envmap_physical_pars_fragment:md,envmap_vertex:od,fog_vertex:rd,fog_pars_vertex:ad,fog_fragment:ld,fog_pars_fragment:cd,gradientmap_pars_fragment:hd,lightmap_pars_fragment:ud,lights_lambert_fragment:dd,lights_lambert_pars_fragment:fd,lights_pars_begin:pd,lights_toon_fragment:gd,lights_toon_pars_fragment:vd,lights_phong_fragment:xd,lights_phong_pars_fragment:_d,lights_physical_fragment:Md,lights_physical_pars_fragment:yd,lights_fragment_begin:Sd,lights_fragment_maps:bd,lights_fragment_end:Ed,logdepthbuf_fragment:wd,logdepthbuf_pars_fragment:Td,logdepthbuf_pars_vertex:Ad,logdepthbuf_vertex:Cd,map_fragment:Rd,map_pars_fragment:Pd,map_particle_fragment:Dd,map_particle_pars_fragment:Ld,metalnessmap_fragment:Id,metalnessmap_pars_fragment:Fd,morphinstance_vertex:Ud,morphcolor_vertex:Nd,morphnormal_vertex:zd,morphtarget_pars_vertex:Bd,morphtarget_vertex:Od,normal_fragment_begin:kd,normal_fragment_maps:Hd,normal_pars_fragment:Gd,normal_pars_vertex:Vd,normal_vertex:Wd,normalmap_pars_fragment:Xd,clearcoat_normal_fragment_begin:$d,clearcoat_normal_fragment_maps:qd,clearcoat_pars_fragment:Yd,iridescence_pars_fragment:Zd,opaque_fragment:jd,packing:Kd,premultiplied_alpha_fragment:Jd,project_vertex:Qd,dithering_fragment:tf,dithering_pars_fragment:ef,roughnessmap_fragment:nf,roughnessmap_pars_fragment:sf,shadowmap_pars_fragment:of,shadowmap_pars_vertex:rf,shadowmap_vertex:af,shadowmask_pars_fragment:lf,skinbase_vertex:cf,skinning_pars_vertex:hf,skinning_vertex:uf,skinnormal_vertex:df,specularmap_fragment:ff,specularmap_pars_fragment:pf,tonemapping_fragment:mf,tonemapping_pars_fragment:gf,transmission_fragment:vf,transmission_pars_fragment:xf,uv_pars_fragment:_f,uv_pars_vertex:Mf,uv_vertex:yf,worldpos_vertex:Sf,background_vert:bf,background_frag:Ef,backgroundCube_vert:wf,backgroundCube_frag:Tf,cube_vert:Af,cube_frag:Cf,depth_vert:Rf,depth_frag:Pf,distanceRGBA_vert:Df,distanceRGBA_frag:Lf,equirect_vert:If,equirect_frag:Ff,linedashed_vert:Uf,linedashed_frag:Nf,meshbasic_vert:zf,meshbasic_frag:Bf,meshlambert_vert:Of,meshlambert_frag:kf,meshmatcap_vert:Hf,meshmatcap_frag:Gf,meshnormal_vert:Vf,meshnormal_frag:Wf,meshphong_vert:Xf,meshphong_frag:$f,meshphysical_vert:qf,meshphysical_frag:Yf,meshtoon_vert:Zf,meshtoon_frag:jf,points_vert:Kf,points_frag:Jf,shadow_vert:Qf,shadow_frag:tp,sprite_vert:ep,sprite_frag:np},vt={common:{diffuse:{value:new J(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Gt},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Gt}},envmap:{envMap:{value:null},envMapRotation:{value:new Gt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Gt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Gt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Gt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Gt},normalScale:{value:new Xt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Gt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Gt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Gt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Gt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new J(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new J(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0},uvTransform:{value:new Gt}},sprite:{diffuse:{value:new J(16777215)},opacity:{value:1},center:{value:new Xt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Gt},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0}}},fn={basic:{uniforms:Pe([vt.common,vt.specularmap,vt.envmap,vt.aomap,vt.lightmap,vt.fog]),vertexShader:Wt.meshbasic_vert,fragmentShader:Wt.meshbasic_frag},lambert:{uniforms:Pe([vt.common,vt.specularmap,vt.envmap,vt.aomap,vt.lightmap,vt.emissivemap,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.fog,vt.lights,{emissive:{value:new J(0)}}]),vertexShader:Wt.meshlambert_vert,fragmentShader:Wt.meshlambert_frag},phong:{uniforms:Pe([vt.common,vt.specularmap,vt.envmap,vt.aomap,vt.lightmap,vt.emissivemap,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.fog,vt.lights,{emissive:{value:new J(0)},specular:{value:new J(1118481)},shininess:{value:30}}]),vertexShader:Wt.meshphong_vert,fragmentShader:Wt.meshphong_frag},standard:{uniforms:Pe([vt.common,vt.envmap,vt.aomap,vt.lightmap,vt.emissivemap,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.roughnessmap,vt.metalnessmap,vt.fog,vt.lights,{emissive:{value:new J(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Wt.meshphysical_vert,fragmentShader:Wt.meshphysical_frag},toon:{uniforms:Pe([vt.common,vt.aomap,vt.lightmap,vt.emissivemap,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.gradientmap,vt.fog,vt.lights,{emissive:{value:new J(0)}}]),vertexShader:Wt.meshtoon_vert,fragmentShader:Wt.meshtoon_frag},matcap:{uniforms:Pe([vt.common,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.fog,{matcap:{value:null}}]),vertexShader:Wt.meshmatcap_vert,fragmentShader:Wt.meshmatcap_frag},points:{uniforms:Pe([vt.points,vt.fog]),vertexShader:Wt.points_vert,fragmentShader:Wt.points_frag},dashed:{uniforms:Pe([vt.common,vt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Wt.linedashed_vert,fragmentShader:Wt.linedashed_frag},depth:{uniforms:Pe([vt.common,vt.displacementmap]),vertexShader:Wt.depth_vert,fragmentShader:Wt.depth_frag},normal:{uniforms:Pe([vt.common,vt.bumpmap,vt.normalmap,vt.displacementmap,{opacity:{value:1}}]),vertexShader:Wt.meshnormal_vert,fragmentShader:Wt.meshnormal_frag},sprite:{uniforms:Pe([vt.sprite,vt.fog]),vertexShader:Wt.sprite_vert,fragmentShader:Wt.sprite_frag},background:{uniforms:{uvTransform:{value:new Gt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Wt.background_vert,fragmentShader:Wt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Gt}},vertexShader:Wt.backgroundCube_vert,fragmentShader:Wt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Wt.cube_vert,fragmentShader:Wt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Wt.equirect_vert,fragmentShader:Wt.equirect_frag},distanceRGBA:{uniforms:Pe([vt.common,vt.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Wt.distanceRGBA_vert,fragmentShader:Wt.distanceRGBA_frag},shadow:{uniforms:Pe([vt.lights,vt.fog,{color:{value:new J(0)},opacity:{value:1}}]),vertexShader:Wt.shadow_vert,fragmentShader:Wt.shadow_frag}};fn.physical={uniforms:Pe([fn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Gt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Gt},clearcoatNormalScale:{value:new Xt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Gt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Gt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Gt},sheen:{value:0},sheenColor:{value:new J(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Gt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Gt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Gt},transmissionSamplerSize:{value:new Xt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Gt},attenuationDistance:{value:0},attenuationColor:{value:new J(0)},specularColor:{value:new J(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Gt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Gt},anisotropyVector:{value:new Xt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Gt}}]),vertexShader:Wt.meshphysical_vert,fragmentShader:Wt.meshphysical_frag};const Gs={r:0,b:0,g:0},Kn=new mn,ip=new oe;function sp(s,t,e,n,i,o,r){const a=new J(0);let l=o===!0?0:1,c,h,u=null,f=0,p=null;function g(x){let y=x.isScene===!0?x.background:null;return y&&y.isTexture&&(y=(x.backgroundBlurriness>0?e:t).get(y)),y}function v(x){let y=!1;const M=g(x);M===null?d(a,l):M&&M.isColor&&(d(M,1),y=!0);const D=s.xr.getEnvironmentBlendMode();D==="additive"?n.buffers.color.setClear(0,0,0,1,r):D==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,r),(s.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function m(x,y){const M=g(y);M&&(M.isCubeTexture||M.mapping===yo)?(h===void 0&&(h=new Kt(new Te(1,1,1),new Be({name:"BackgroundCubeMaterial",uniforms:qi(fn.backgroundCube.uniforms),vertexShader:fn.backgroundCube.vertexShader,fragmentShader:fn.backgroundCube.fragmentShader,side:Ce,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(D,C,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),Kn.copy(y.backgroundRotation),Kn.x*=-1,Kn.y*=-1,Kn.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Kn.y*=-1,Kn.z*=-1),h.material.uniforms.envMap.value=M,h.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(ip.makeRotationFromEuler(Kn)),h.material.toneMapped=jt.getTransfer(M.colorSpace)!==ie,(u!==M||f!==M.version||p!==s.toneMapping)&&(h.material.needsUpdate=!0,u=M,f=M.version,p=s.toneMapping),h.layers.enableAll(),x.unshift(h,h.geometry,h.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new Kt(new en(2,2),new Be({name:"BackgroundMaterial",uniforms:qi(fn.background.uniforms),vertexShader:fn.background.vertexShader,fragmentShader:fn.background.fragmentShader,side:Xn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=jt.getTransfer(M.colorSpace)!==ie,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(u!==M||f!==M.version||p!==s.toneMapping)&&(c.material.needsUpdate=!0,u=M,f=M.version,p=s.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function d(x,y){x.getRGB(Gs,Hc(s)),n.buffers.color.setClear(Gs.r,Gs.g,Gs.b,y,r)}return{getClearColor:function(){return a},setClearColor:function(x,y=1){a.set(x),l=y,d(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(x){l=x,d(a,l)},render:v,addToRenderList:m}}function op(s,t){const e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=f(null);let o=i,r=!1;function a(_,w,R,A,I){let z=!1;const W=u(A,R,w);o!==W&&(o=W,c(o.object)),z=p(_,A,R,I),z&&g(_,A,R,I),I!==null&&t.update(I,s.ELEMENT_ARRAY_BUFFER),(z||r)&&(r=!1,M(_,w,R,A),I!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(I).buffer))}function l(){return s.createVertexArray()}function c(_){return s.bindVertexArray(_)}function h(_){return s.deleteVertexArray(_)}function u(_,w,R){const A=R.wireframe===!0;let I=n[_.id];I===void 0&&(I={},n[_.id]=I);let z=I[w.id];z===void 0&&(z={},I[w.id]=z);let W=z[A];return W===void 0&&(W=f(l()),z[A]=W),W}function f(_){const w=[],R=[],A=[];for(let I=0;I<e;I++)w[I]=0,R[I]=0,A[I]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:w,enabledAttributes:R,attributeDivisors:A,object:_,attributes:{},index:null}}function p(_,w,R,A){const I=o.attributes,z=w.attributes;let W=0;const Q=R.getAttributes();for(const k in Q)if(Q[k].location>=0){const q=I[k];let ct=z[k];if(ct===void 0&&(k==="instanceMatrix"&&_.instanceMatrix&&(ct=_.instanceMatrix),k==="instanceColor"&&_.instanceColor&&(ct=_.instanceColor)),q===void 0||q.attribute!==ct||ct&&q.data!==ct.data)return!0;W++}return o.attributesNum!==W||o.index!==A}function g(_,w,R,A){const I={},z=w.attributes;let W=0;const Q=R.getAttributes();for(const k in Q)if(Q[k].location>=0){let q=z[k];q===void 0&&(k==="instanceMatrix"&&_.instanceMatrix&&(q=_.instanceMatrix),k==="instanceColor"&&_.instanceColor&&(q=_.instanceColor));const ct={};ct.attribute=q,q&&q.data&&(ct.data=q.data),I[k]=ct,W++}o.attributes=I,o.attributesNum=W,o.index=A}function v(){const _=o.newAttributes;for(let w=0,R=_.length;w<R;w++)_[w]=0}function m(_){d(_,0)}function d(_,w){const R=o.newAttributes,A=o.enabledAttributes,I=o.attributeDivisors;R[_]=1,A[_]===0&&(s.enableVertexAttribArray(_),A[_]=1),I[_]!==w&&(s.vertexAttribDivisor(_,w),I[_]=w)}function x(){const _=o.newAttributes,w=o.enabledAttributes;for(let R=0,A=w.length;R<A;R++)w[R]!==_[R]&&(s.disableVertexAttribArray(R),w[R]=0)}function y(_,w,R,A,I,z,W){W===!0?s.vertexAttribIPointer(_,w,R,I,z):s.vertexAttribPointer(_,w,R,A,I,z)}function M(_,w,R,A){v();const I=A.attributes,z=R.getAttributes(),W=w.defaultAttributeValues;for(const Q in z){const k=z[Q];if(k.location>=0){let K=I[Q];if(K===void 0&&(Q==="instanceMatrix"&&_.instanceMatrix&&(K=_.instanceMatrix),Q==="instanceColor"&&_.instanceColor&&(K=_.instanceColor)),K!==void 0){const q=K.normalized,ct=K.itemSize,xt=t.get(K);if(xt===void 0)continue;const Y=xt.buffer,U=xt.type,X=xt.bytesPerElement,$=U===s.INT||U===s.UNSIGNED_INT||K.gpuType===ua;if(K.isInterleavedBufferAttribute){const N=K.data,st=N.stride,rt=K.offset;if(N.isInstancedInterleavedBuffer){for(let ft=0;ft<k.locationSize;ft++)d(k.location+ft,N.meshPerAttribute);_.isInstancedMesh!==!0&&A._maxInstanceCount===void 0&&(A._maxInstanceCount=N.meshPerAttribute*N.count)}else for(let ft=0;ft<k.locationSize;ft++)m(k.location+ft);s.bindBuffer(s.ARRAY_BUFFER,Y);for(let ft=0;ft<k.locationSize;ft++)y(k.location+ft,ct/k.locationSize,U,q,st*X,(rt+ct/k.locationSize*ft)*X,$)}else{if(K.isInstancedBufferAttribute){for(let N=0;N<k.locationSize;N++)d(k.location+N,K.meshPerAttribute);_.isInstancedMesh!==!0&&A._maxInstanceCount===void 0&&(A._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let N=0;N<k.locationSize;N++)m(k.location+N);s.bindBuffer(s.ARRAY_BUFFER,Y);for(let N=0;N<k.locationSize;N++)y(k.location+N,ct/k.locationSize,U,q,ct*X,ct/k.locationSize*N*X,$)}}else if(W!==void 0){const q=W[Q];if(q!==void 0)switch(q.length){case 2:s.vertexAttrib2fv(k.location,q);break;case 3:s.vertexAttrib3fv(k.location,q);break;case 4:s.vertexAttrib4fv(k.location,q);break;default:s.vertexAttrib1fv(k.location,q)}}}}x()}function D(){L();for(const _ in n){const w=n[_];for(const R in w){const A=w[R];for(const I in A)h(A[I].object),delete A[I];delete w[R]}delete n[_]}}function C(_){if(n[_.id]===void 0)return;const w=n[_.id];for(const R in w){const A=w[R];for(const I in A)h(A[I].object),delete A[I];delete w[R]}delete n[_.id]}function E(_){for(const w in n){const R=n[w];if(R[_.id]===void 0)continue;const A=R[_.id];for(const I in A)h(A[I].object),delete A[I];delete R[_.id]}}function L(){S(),r=!0,o!==i&&(o=i,c(o.object))}function S(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:L,resetDefaultState:S,dispose:D,releaseStatesOfGeometry:C,releaseStatesOfProgram:E,initAttributes:v,enableAttribute:m,disableUnusedAttributes:x}}function rp(s,t,e){let n;function i(c){n=c}function o(c,h){s.drawArrays(n,c,h),e.update(h,n,1)}function r(c,h,u){u!==0&&(s.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function a(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let p=0;for(let g=0;g<u;g++)p+=h[g];e.update(p,n,1)}function l(c,h,u,f){if(u===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)r(c[g],h[g],f[g]);else{p.multiDrawArraysInstancedWEBGL(n,c,0,h,0,f,0,u);let g=0;for(let v=0;v<u;v++)g+=h[v]*f[v];e.update(g,n,1)}}this.setMode=i,this.render=o,this.renderInstances=r,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function ap(s,t,e,n){let i;function o(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const E=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function r(E){return!(E!==We&&n.convert(E)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(E){const L=E===Wn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(E!==ze&&n.convert(E)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==pn&&!L)}function l(E){if(E==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),p=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),d=s.getParameter(s.MAX_VERTEX_ATTRIBS),x=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),y=s.getParameter(s.MAX_VARYING_VECTORS),M=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),D=g>0,C=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:o,getMaxPrecision:l,textureFormatReadable:r,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:p,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:x,maxVaryings:y,maxFragmentUniforms:M,vertexTextures:D,maxSamples:C}}function lp(s){const t=this;let e=null,n=0,i=!1,o=!1;const r=new Tn,a=new Gt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const p=u.length!==0||f||n!==0||i;return i=f,n=u.length,p},this.beginShadows=function(){o=!0,h(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,p){const g=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,d=s.get(u);if(!i||g===null||g.length===0||o&&!m)o?h(null):c();else{const x=o?0:n,y=x*4;let M=d.clippingState||null;l.value=M,M=h(g,f,y,p);for(let D=0;D!==y;++D)M[D]=e[D];d.clippingState=M,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,f,p,g){const v=u!==null?u.length:0;let m=null;if(v!==0){if(m=l.value,g!==!0||m===null){const d=p+v*4,x=f.matrixWorldInverse;a.getNormalMatrix(x),(m===null||m.length<d)&&(m=new Float32Array(d));for(let y=0,M=p;y!==v;++y,M+=4)r.copy(u[y]).applyMatrix4(x,a),r.normal.toArray(m,M),m[M+3]=r.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}function cp(s){let t=new WeakMap;function e(r,a){return a===Ar?r.mapping=Vi:a===Cr&&(r.mapping=Wi),r}function n(r){if(r&&r.isTexture){const a=r.mapping;if(a===Ar||a===Cr)if(t.has(r)){const l=t.get(r).texture;return e(l,r.mapping)}else{const l=r.image;if(l&&l.height>0){const c=new _u(l.height);return c.fromEquirectangularTexture(s,r),t.set(r,c),r.addEventListener("dispose",i),e(c.texture,r.mapping)}else return null}}return r}function i(r){const a=r.target;a.removeEventListener("dispose",i);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function o(){t=new WeakMap}return{get:n,dispose:o}}class ya extends Gc{constructor(t=-1,e=1,n=1,i=-1,o=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=o,this.far=r,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,o,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=o,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let o=n-t,r=n+t,a=i+e,l=i-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=c*this.view.offsetX,r=o+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(o,r,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Ni=4,ul=[.125,.215,.35,.446,.526,.582],ii=20,jo=new ya,dl=new J;let Ko=null,Jo=0,Qo=0,tr=!1;const ti=(1+Math.sqrt(5))/2,Di=1/ti,fl=[new O(-ti,Di,0),new O(ti,Di,0),new O(-Di,0,ti),new O(Di,0,ti),new O(0,ti,-Di),new O(0,ti,Di),new O(-1,1,-1),new O(1,1,-1),new O(-1,1,1),new O(1,1,1)];class ia{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){Ko=this._renderer.getRenderTarget(),Jo=this._renderer.getActiveCubeFace(),Qo=this._renderer.getActiveMipmapLevel(),tr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(t,n,i,o),e>0&&this._blur(o,0,0,e),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=gl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ml(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Ko,Jo,Qo),this._renderer.xr.enabled=tr,t.scissorTest=!1,Vs(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Vi||t.mapping===Wi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ko=this._renderer.getRenderTarget(),Jo=this._renderer.getActiveCubeFace(),Qo=this._renderer.getActiveMipmapLevel(),tr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Ae,minFilter:Ae,generateMipmaps:!1,type:Wn,format:We,colorSpace:mi,depthBuffer:!1},i=pl(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=pl(t,e,n);const{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=hp(o)),this._blurMaterial=up(o,t,e)}return i}_compileMaterial(t){const e=new Kt(this._lodPlanes[0],t);this._renderer.compile(e,jo)}_sceneToCubeUV(t,e,n,i){const a=new je(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(dl),h.toneMapping=Rn,h.autoClear=!1;const p=new Me({name:"PMREM.Background",side:Ce,depthWrite:!1,depthTest:!1}),g=new Kt(new Te,p);let v=!1;const m=t.background;m?m.isColor&&(p.color.copy(m),t.background=null,v=!0):(p.color.copy(dl),v=!0);for(let d=0;d<6;d++){const x=d%3;x===0?(a.up.set(0,l[d],0),a.lookAt(c[d],0,0)):x===1?(a.up.set(0,0,l[d]),a.lookAt(0,c[d],0)):(a.up.set(0,l[d],0),a.lookAt(0,0,c[d]));const y=this._cubeSize;Vs(i,x*y,d>2?y:0,y,y),h.setRenderTarget(i),v&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===Vi||t.mapping===Wi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=gl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ml());const o=i?this._cubemapMaterial:this._equirectMaterial,r=new Kt(this._lodPlanes[0],o),a=o.uniforms;a.envMap.value=t;const l=this._cubeSize;Vs(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(r,jo)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let o=1;o<i;o++){const r=Math.sqrt(this._sigmas[o]*this._sigmas[o]-this._sigmas[o-1]*this._sigmas[o-1]),a=fl[(i-o-1)%fl.length];this._blur(t,o-1,o,r,a)}e.autoClear=n}_blur(t,e,n,i,o){const r=this._pingPongRenderTarget;this._halfBlur(t,r,e,n,i,"latitudinal",o),this._halfBlur(r,t,n,n,i,"longitudinal",o)}_halfBlur(t,e,n,i,o,r,a){const l=this._renderer,c=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Kt(this._lodPlanes[i],c),f=c.uniforms,p=this._sizeLods[n]-1,g=isFinite(o)?Math.PI/(2*p):2*Math.PI/(2*ii-1),v=o/g,m=isFinite(o)?1+Math.floor(h*v):ii;m>ii&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ii}`);const d=[];let x=0;for(let E=0;E<ii;++E){const L=E/v,S=Math.exp(-L*L/2);d.push(S),E===0?x+=S:E<m&&(x+=2*S)}for(let E=0;E<d.length;E++)d[E]=d[E]/x;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=d,f.latitudinal.value=r==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:y}=this;f.dTheta.value=g,f.mipInt.value=y-n;const M=this._sizeLods[i],D=3*M*(i>y-Ni?i-y+Ni:0),C=4*(this._cubeSize-M);Vs(e,D,C,3*M,2*M),l.setRenderTarget(e),l.render(u,jo)}}function hp(s){const t=[],e=[],n=[];let i=s;const o=s-Ni+1+ul.length;for(let r=0;r<o;r++){const a=Math.pow(2,i);e.push(a);let l=1/a;r>s-Ni?l=ul[r-s+Ni-1]:r===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,f=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,g=6,v=3,m=2,d=1,x=new Float32Array(v*g*p),y=new Float32Array(m*g*p),M=new Float32Array(d*g*p);for(let C=0;C<p;C++){const E=C%3*2/3-1,L=C>2?0:-1,S=[E,L,0,E+2/3,L,0,E+2/3,L+1,0,E,L,0,E+2/3,L+1,0,E,L+1,0];x.set(S,v*g*C),y.set(f,m*g*C);const _=[C,C,C,C,C,C];M.set(_,d*g*C)}const D=new fe;D.setAttribute("position",new pe(x,v)),D.setAttribute("uv",new pe(y,m)),D.setAttribute("faceIndex",new pe(M,d)),t.push(D),i>Ni&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function pl(s,t,e){const n=new Ve(s,t,e);return n.texture.mapping=yo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Vs(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function up(s,t,e){const n=new Float32Array(ii),i=new O(0,1,0);return new Be({name:"SphericalGaussianBlur",defines:{n:ii,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Sa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function ml(){return new Be({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Sa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function gl(){return new Be({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Sa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function Sa(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function dp(s){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===Ar||l===Cr,h=l===Vi||l===Wi;if(c||h){let u=t.get(a);const f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new ia(s)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const p=a.image;return c&&p&&p.height>0||h&&p&&i(p)?(e===null&&(e=new ia(s)),u=c?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",o),u.texture):null}}}return a}function i(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function o(a){const l=a.target;l.removeEventListener("dispose",o);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function r(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:r}}function fp(s){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&us("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function pp(s,t,e,n){const i={},o=new WeakMap;function r(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);for(const g in f.morphAttributes){const v=f.morphAttributes[g];for(let m=0,d=v.length;m<d;m++)t.remove(v[m])}f.removeEventListener("dispose",r),delete i[f.id];const p=o.get(f);p&&(t.remove(p),o.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(u,f){return i[f.id]===!0||(f.addEventListener("dispose",r),i[f.id]=!0,e.memory.geometries++),f}function l(u){const f=u.attributes;for(const g in f)t.update(f[g],s.ARRAY_BUFFER);const p=u.morphAttributes;for(const g in p){const v=p[g];for(let m=0,d=v.length;m<d;m++)t.update(v[m],s.ARRAY_BUFFER)}}function c(u){const f=[],p=u.index,g=u.attributes.position;let v=0;if(p!==null){const x=p.array;v=p.version;for(let y=0,M=x.length;y<M;y+=3){const D=x[y+0],C=x[y+1],E=x[y+2];f.push(D,C,C,E,E,D)}}else if(g!==void 0){const x=g.array;v=g.version;for(let y=0,M=x.length/3-1;y<M;y+=3){const D=y+0,C=y+1,E=y+2;f.push(D,C,C,E,E,D)}}else return;const m=new(Uc(f)?kc:Oc)(f,1);m.version=v;const d=o.get(u);d&&t.remove(d),o.set(u,m)}function h(u){const f=o.get(u);if(f){const p=u.index;p!==null&&f.version<p.version&&c(u)}else c(u);return o.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function mp(s,t,e){let n;function i(f){n=f}let o,r;function a(f){o=f.type,r=f.bytesPerElement}function l(f,p){s.drawElements(n,p,o,f*r),e.update(p,n,1)}function c(f,p,g){g!==0&&(s.drawElementsInstanced(n,p,o,f*r,g),e.update(p,n,g))}function h(f,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,o,f,0,g);let m=0;for(let d=0;d<g;d++)m+=p[d];e.update(m,n,1)}function u(f,p,g,v){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<f.length;d++)c(f[d]/r,p[d],v[d]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,o,f,0,v,0,g);let d=0;for(let x=0;x<g;x++)d+=p[x]*v[x];e.update(d,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function gp(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(o,r,a){switch(e.calls++,r){case s.TRIANGLES:e.triangles+=a*(o/3);break;case s.LINES:e.lines+=a*(o/2);break;case s.LINE_STRIP:e.lines+=a*(o-1);break;case s.LINE_LOOP:e.lines+=a*o;break;case s.POINTS:e.points+=a*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",r);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function vp(s,t,e){const n=new WeakMap,i=new de;function o(r,a,l){const c=r.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let f=n.get(a);if(f===void 0||f.count!==u){let S=function(){E.dispose(),n.delete(a),a.removeEventListener("dispose",S)};f!==void 0&&f.texture.dispose();const p=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,v=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],d=a.morphAttributes.normal||[],x=a.morphAttributes.color||[];let y=0;p===!0&&(y=1),g===!0&&(y=2),v===!0&&(y=3);let M=a.attributes.position.count*y,D=1;M>t.maxTextureSize&&(D=Math.ceil(M/t.maxTextureSize),M=t.maxTextureSize);const C=new Float32Array(M*D*4*u),E=new zc(C,M,D,u);E.type=pn,E.needsUpdate=!0;const L=y*4;for(let _=0;_<u;_++){const w=m[_],R=d[_],A=x[_],I=M*D*4*_;for(let z=0;z<w.count;z++){const W=z*L;p===!0&&(i.fromBufferAttribute(w,z),C[I+W+0]=i.x,C[I+W+1]=i.y,C[I+W+2]=i.z,C[I+W+3]=0),g===!0&&(i.fromBufferAttribute(R,z),C[I+W+4]=i.x,C[I+W+5]=i.y,C[I+W+6]=i.z,C[I+W+7]=0),v===!0&&(i.fromBufferAttribute(A,z),C[I+W+8]=i.x,C[I+W+9]=i.y,C[I+W+10]=i.z,C[I+W+11]=A.itemSize===4?i.w:1)}}f={count:u,texture:E,size:new Xt(M,D)},n.set(a,f),a.addEventListener("dispose",S)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",r.morphTexture,e);else{let p=0;for(let v=0;v<c.length;v++)p+=c[v];const g=a.morphTargetsRelative?1:1-p;l.getUniforms().setValue(s,"morphTargetBaseInfluence",g),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",f.size)}return{update:o}}function xp(s,t,e,n){let i=new WeakMap;function o(l){const c=n.render.frame,h=l.geometry,u=t.get(l,h);if(i.get(u)!==c&&(t.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(e.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;i.get(f)!==c&&(f.update(),i.set(f,c))}return u}function r(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:o,dispose:r}}class Xc extends Re{constructor(t,e,n,i,o,r,a,l,c,h=Oi){if(h!==Oi&&h!==$i)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Oi&&(n=pi),n===void 0&&h===$i&&(n=Xi),super(null,i,o,r,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Xe,this.minFilter=l!==void 0?l:Xe,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const $c=new Re,vl=new Xc(1,1),qc=new zc,Yc=new iu,Zc=new Vc,xl=[],_l=[],Ml=new Float32Array(16),yl=new Float32Array(9),Sl=new Float32Array(4);function Ji(s,t,e){const n=s[0];if(n<=0||n>0)return s;const i=t*e;let o=xl[i];if(o===void 0&&(o=new Float32Array(i),xl[i]=o),t!==0){n.toArray(o,0);for(let r=1,a=0;r!==t;++r)a+=e,s[r].toArray(o,a)}return o}function ge(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function ve(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function bo(s,t){let e=_l[t];e===void 0&&(e=new Int32Array(t),_l[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function _p(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function Mp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ge(e,t))return;s.uniform2fv(this.addr,t),ve(e,t)}}function yp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ge(e,t))return;s.uniform3fv(this.addr,t),ve(e,t)}}function Sp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ge(e,t))return;s.uniform4fv(this.addr,t),ve(e,t)}}function bp(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(ge(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),ve(e,t)}else{if(ge(e,n))return;Sl.set(n),s.uniformMatrix2fv(this.addr,!1,Sl),ve(e,n)}}function Ep(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(ge(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),ve(e,t)}else{if(ge(e,n))return;yl.set(n),s.uniformMatrix3fv(this.addr,!1,yl),ve(e,n)}}function wp(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(ge(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),ve(e,t)}else{if(ge(e,n))return;Ml.set(n),s.uniformMatrix4fv(this.addr,!1,Ml),ve(e,n)}}function Tp(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function Ap(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ge(e,t))return;s.uniform2iv(this.addr,t),ve(e,t)}}function Cp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ge(e,t))return;s.uniform3iv(this.addr,t),ve(e,t)}}function Rp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ge(e,t))return;s.uniform4iv(this.addr,t),ve(e,t)}}function Pp(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function Dp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ge(e,t))return;s.uniform2uiv(this.addr,t),ve(e,t)}}function Lp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ge(e,t))return;s.uniform3uiv(this.addr,t),ve(e,t)}}function Ip(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ge(e,t))return;s.uniform4uiv(this.addr,t),ve(e,t)}}function Fp(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let o;this.type===s.SAMPLER_2D_SHADOW?(vl.compareFunction=Fc,o=vl):o=$c,e.setTexture2D(t||o,i)}function Up(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||Yc,i)}function Np(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||Zc,i)}function zp(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||qc,i)}function Bp(s){switch(s){case 5126:return _p;case 35664:return Mp;case 35665:return yp;case 35666:return Sp;case 35674:return bp;case 35675:return Ep;case 35676:return wp;case 5124:case 35670:return Tp;case 35667:case 35671:return Ap;case 35668:case 35672:return Cp;case 35669:case 35673:return Rp;case 5125:return Pp;case 36294:return Dp;case 36295:return Lp;case 36296:return Ip;case 35678:case 36198:case 36298:case 36306:case 35682:return Fp;case 35679:case 36299:case 36307:return Up;case 35680:case 36300:case 36308:case 36293:return Np;case 36289:case 36303:case 36311:case 36292:return zp}}function Op(s,t){s.uniform1fv(this.addr,t)}function kp(s,t){const e=Ji(t,this.size,2);s.uniform2fv(this.addr,e)}function Hp(s,t){const e=Ji(t,this.size,3);s.uniform3fv(this.addr,e)}function Gp(s,t){const e=Ji(t,this.size,4);s.uniform4fv(this.addr,e)}function Vp(s,t){const e=Ji(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function Wp(s,t){const e=Ji(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function Xp(s,t){const e=Ji(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function $p(s,t){s.uniform1iv(this.addr,t)}function qp(s,t){s.uniform2iv(this.addr,t)}function Yp(s,t){s.uniform3iv(this.addr,t)}function Zp(s,t){s.uniform4iv(this.addr,t)}function jp(s,t){s.uniform1uiv(this.addr,t)}function Kp(s,t){s.uniform2uiv(this.addr,t)}function Jp(s,t){s.uniform3uiv(this.addr,t)}function Qp(s,t){s.uniform4uiv(this.addr,t)}function tm(s,t,e){const n=this.cache,i=t.length,o=bo(e,i);ge(n,o)||(s.uniform1iv(this.addr,o),ve(n,o));for(let r=0;r!==i;++r)e.setTexture2D(t[r]||$c,o[r])}function em(s,t,e){const n=this.cache,i=t.length,o=bo(e,i);ge(n,o)||(s.uniform1iv(this.addr,o),ve(n,o));for(let r=0;r!==i;++r)e.setTexture3D(t[r]||Yc,o[r])}function nm(s,t,e){const n=this.cache,i=t.length,o=bo(e,i);ge(n,o)||(s.uniform1iv(this.addr,o),ve(n,o));for(let r=0;r!==i;++r)e.setTextureCube(t[r]||Zc,o[r])}function im(s,t,e){const n=this.cache,i=t.length,o=bo(e,i);ge(n,o)||(s.uniform1iv(this.addr,o),ve(n,o));for(let r=0;r!==i;++r)e.setTexture2DArray(t[r]||qc,o[r])}function sm(s){switch(s){case 5126:return Op;case 35664:return kp;case 35665:return Hp;case 35666:return Gp;case 35674:return Vp;case 35675:return Wp;case 35676:return Xp;case 5124:case 35670:return $p;case 35667:case 35671:return qp;case 35668:case 35672:return Yp;case 35669:case 35673:return Zp;case 5125:return jp;case 36294:return Kp;case 36295:return Jp;case 36296:return Qp;case 35678:case 36198:case 36298:case 36306:case 35682:return tm;case 35679:case 36299:case 36307:return em;case 35680:case 36300:case 36308:case 36293:return nm;case 36289:case 36303:case 36311:case 36292:return im}}class om{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Bp(e.type)}}class rm{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=sm(e.type)}}class am{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let o=0,r=i.length;o!==r;++o){const a=i[o];a.setValue(t,e[a.id],n)}}}const er=/(\w+)(\])?(\[|\.)?/g;function bl(s,t){s.seq.push(t),s.map[t.id]=t}function lm(s,t,e){const n=s.name,i=n.length;for(er.lastIndex=0;;){const o=er.exec(n),r=er.lastIndex;let a=o[1];const l=o[2]==="]",c=o[3];if(l&&(a=a|0),c===void 0||c==="["&&r+2===i){bl(e,c===void 0?new om(a,s,t):new rm(a,s,t));break}else{let u=e.map[a];u===void 0&&(u=new am(a),bl(e,u)),e=u}}}class ho{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const o=t.getActiveUniform(e,i),r=t.getUniformLocation(e,o.name);lm(o,r,this)}}setValue(t,e,n,i){const o=this.map[e];o!==void 0&&o.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let o=0,r=e.length;o!==r;++o){const a=e[o],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,o=t.length;i!==o;++i){const r=t[i];r.id in e&&n.push(r)}return n}}function El(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}const cm=37297;let hm=0;function um(s,t){const e=s.split(`
`),n=[],i=Math.max(t-6,0),o=Math.min(t+6,e.length);for(let r=i;r<o;r++){const a=r+1;n.push(`${a===t?">":" "} ${a}: ${e[r]}`)}return n.join(`
`)}const wl=new Gt;function dm(s){jt._getMatrix(wl,jt.workingColorSpace,s);const t=`mat3( ${wl.elements.map(e=>e.toFixed(4))} )`;switch(jt.getTransfer(s)){case So:return[t,"LinearTransferOETF"];case ie:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function Tl(s,t,e){const n=s.getShaderParameter(t,s.COMPILE_STATUS),i=s.getShaderInfoLog(t).trim();if(n&&i==="")return"";const o=/ERROR: 0:(\d+)/.exec(i);if(o){const r=parseInt(o[1]);return e.toUpperCase()+`

`+i+`

`+um(s.getShaderSource(t),r)}else return i}function fm(s,t){const e=dm(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function pm(s,t){let e;switch(t){case Dh:e="Linear";break;case Lh:e="Reinhard";break;case Ih:e="Cineon";break;case Sc:e="ACESFilmic";break;case Uh:e="AgX";break;case Nh:e="Neutral";break;case Fh:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Ws=new O;function mm(){jt.getLuminanceCoefficients(Ws);const s=Ws.x.toFixed(4),t=Ws.y.toFixed(4),e=Ws.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function gm(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ds).join(`
`)}function vm(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function xm(s,t){const e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const o=s.getActiveAttrib(t,i),r=o.name;let a=1;o.type===s.FLOAT_MAT2&&(a=2),o.type===s.FLOAT_MAT3&&(a=3),o.type===s.FLOAT_MAT4&&(a=4),e[r]={type:o.type,location:s.getAttribLocation(t,r),locationSize:a}}return e}function ds(s){return s!==""}function Al(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Cl(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const _m=/^[ \t]*#include +<([\w\d./]+)>/gm;function sa(s){return s.replace(_m,ym)}const Mm=new Map;function ym(s,t){let e=Wt[t];if(e===void 0){const n=Mm.get(t);if(n!==void 0)e=Wt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return sa(e)}const Sm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Rl(s){return s.replace(Sm,bm)}function bm(s,t,e,n){let i="";for(let o=parseInt(t);o<parseInt(e);o++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return i}function Pl(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Em(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===_c?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===Mc?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===wn&&(t="SHADOWMAP_TYPE_VSM"),t}function wm(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Vi:case Wi:t="ENVMAP_TYPE_CUBE";break;case yo:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Tm(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Wi:t="ENVMAP_MODE_REFRACTION";break}return t}function Am(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case yc:t="ENVMAP_BLENDING_MULTIPLY";break;case Rh:t="ENVMAP_BLENDING_MIX";break;case Ph:t="ENVMAP_BLENDING_ADD";break}return t}function Cm(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Rm(s,t,e,n){const i=s.getContext(),o=e.defines;let r=e.vertexShader,a=e.fragmentShader;const l=Em(e),c=wm(e),h=Tm(e),u=Am(e),f=Cm(e),p=gm(e),g=vm(o),v=i.createProgram();let m,d,x=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ds).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ds).join(`
`),d.length>0&&(d+=`
`)):(m=[Pl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ds).join(`
`),d=[Pl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Rn?"#define TONE_MAPPING":"",e.toneMapping!==Rn?Wt.tonemapping_pars_fragment:"",e.toneMapping!==Rn?pm("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Wt.colorspace_pars_fragment,fm("linearToOutputTexel",e.outputColorSpace),mm(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ds).join(`
`)),r=sa(r),r=Al(r,e),r=Cl(r,e),a=sa(a),a=Al(a,e),a=Cl(a,e),r=Rl(r),a=Rl(a),e.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",e.glslVersion===Wa?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Wa?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const y=x+m+r,M=x+d+a,D=El(i,i.VERTEX_SHADER,y),C=El(i,i.FRAGMENT_SHADER,M);i.attachShader(v,D),i.attachShader(v,C),e.index0AttributeName!==void 0?i.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(v,0,"position"),i.linkProgram(v);function E(w){if(s.debug.checkShaderErrors){const R=i.getProgramInfoLog(v).trim(),A=i.getShaderInfoLog(D).trim(),I=i.getShaderInfoLog(C).trim();let z=!0,W=!0;if(i.getProgramParameter(v,i.LINK_STATUS)===!1)if(z=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,v,D,C);else{const Q=Tl(i,D,"vertex"),k=Tl(i,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(v,i.VALIDATE_STATUS)+`

Material Name: `+w.name+`
Material Type: `+w.type+`

Program Info Log: `+R+`
`+Q+`
`+k)}else R!==""?console.warn("THREE.WebGLProgram: Program Info Log:",R):(A===""||I==="")&&(W=!1);W&&(w.diagnostics={runnable:z,programLog:R,vertexShader:{log:A,prefix:m},fragmentShader:{log:I,prefix:d}})}i.deleteShader(D),i.deleteShader(C),L=new ho(i,v),S=xm(i,v)}let L;this.getUniforms=function(){return L===void 0&&E(this),L};let S;this.getAttributes=function(){return S===void 0&&E(this),S};let _=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return _===!1&&(_=i.getProgramParameter(v,cm)),_},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=hm++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=D,this.fragmentShader=C,this}let Pm=0;class Dm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),o=this._getShaderStage(n),r=this._getShaderCacheForMaterial(t);return r.has(i)===!1&&(r.add(i),i.usedTimes++),r.has(o)===!1&&(r.add(o),o.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Lm(t),e.set(t,n)),n}}class Lm{constructor(t){this.id=Pm++,this.code=t,this.usedTimes=0}}function Im(s,t,e,n,i,o,r){const a=new _a,l=new Dm,c=new Set,h=[],u=i.logarithmicDepthBuffer,f=i.vertexTextures;let p=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(S){return c.add(S),S===0?"uv":`uv${S}`}function m(S,_,w,R,A){const I=R.fog,z=A.geometry,W=S.isMeshStandardMaterial?R.environment:null,Q=(S.isMeshStandardMaterial?e:t).get(S.envMap||W),k=Q&&Q.mapping===yo?Q.image.height:null,K=g[S.type];S.precision!==null&&(p=i.getMaxPrecision(S.precision),p!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",p,"instead."));const q=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,ct=q!==void 0?q.length:0;let xt=0;z.morphAttributes.position!==void 0&&(xt=1),z.morphAttributes.normal!==void 0&&(xt=2),z.morphAttributes.color!==void 0&&(xt=3);let Y,U,X,$;if(K){const ne=fn[K];Y=ne.vertexShader,U=ne.fragmentShader}else Y=S.vertexShader,U=S.fragmentShader,l.update(S),X=l.getVertexShaderID(S),$=l.getFragmentShaderID(S);const N=s.getRenderTarget(),st=s.state.buffers.depth.getReversed(),rt=A.isInstancedMesh===!0,ft=A.isBatchedMesh===!0,ht=!!S.map,at=!!S.matcap,lt=!!Q,F=!!S.aoMap,wt=!!S.lightMap,pt=!!S.bumpMap,yt=!!S.normalMap,mt=!!S.displacementMap,Ut=!!S.emissiveMap,gt=!!S.metalnessMap,P=!!S.roughnessMap,b=S.anisotropy>0,V=S.clearcoat>0,nt=S.dispersion>0,it=S.iridescence>0,et=S.sheen>0,Rt=S.transmission>0,_t=b&&!!S.anisotropyMap,Tt=V&&!!S.clearcoatMap,Zt=V&&!!S.clearcoatNormalMap,ut=V&&!!S.clearcoatRoughnessMap,At=it&&!!S.iridescenceMap,Nt=it&&!!S.iridescenceThicknessMap,zt=et&&!!S.sheenColorMap,Ct=et&&!!S.sheenRoughnessMap,$t=!!S.specularMap,Vt=!!S.specularColorMap,re=!!S.specularIntensityMap,B=Rt&&!!S.transmissionMap,Mt=Rt&&!!S.thicknessMap,tt=!!S.gradientMap,ot=!!S.alphaMap,Et=S.alphaTest>0,St=!!S.alphaHash,kt=!!S.extensions;let ue=Rn;S.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(ue=s.toneMapping);const be={shaderID:K,shaderType:S.type,shaderName:S.name,vertexShader:Y,fragmentShader:U,defines:S.defines,customVertexShaderID:X,customFragmentShaderID:$,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:p,batching:ft,batchingColor:ft&&A._colorsTexture!==null,instancing:rt,instancingColor:rt&&A.instanceColor!==null,instancingMorph:rt&&A.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:N===null?s.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:mi,alphaToCoverage:!!S.alphaToCoverage,map:ht,matcap:at,envMap:lt,envMapMode:lt&&Q.mapping,envMapCubeUVHeight:k,aoMap:F,lightMap:wt,bumpMap:pt,normalMap:yt,displacementMap:f&&mt,emissiveMap:Ut,normalMapObjectSpace:yt&&S.normalMapType===kh,normalMapTangentSpace:yt&&S.normalMapType===Ic,metalnessMap:gt,roughnessMap:P,anisotropy:b,anisotropyMap:_t,clearcoat:V,clearcoatMap:Tt,clearcoatNormalMap:Zt,clearcoatRoughnessMap:ut,dispersion:nt,iridescence:it,iridescenceMap:At,iridescenceThicknessMap:Nt,sheen:et,sheenColorMap:zt,sheenRoughnessMap:Ct,specularMap:$t,specularColorMap:Vt,specularIntensityMap:re,transmission:Rt,transmissionMap:B,thicknessMap:Mt,gradientMap:tt,opaque:S.transparent===!1&&S.blending===Bi&&S.alphaToCoverage===!1,alphaMap:ot,alphaTest:Et,alphaHash:St,combine:S.combine,mapUv:ht&&v(S.map.channel),aoMapUv:F&&v(S.aoMap.channel),lightMapUv:wt&&v(S.lightMap.channel),bumpMapUv:pt&&v(S.bumpMap.channel),normalMapUv:yt&&v(S.normalMap.channel),displacementMapUv:mt&&v(S.displacementMap.channel),emissiveMapUv:Ut&&v(S.emissiveMap.channel),metalnessMapUv:gt&&v(S.metalnessMap.channel),roughnessMapUv:P&&v(S.roughnessMap.channel),anisotropyMapUv:_t&&v(S.anisotropyMap.channel),clearcoatMapUv:Tt&&v(S.clearcoatMap.channel),clearcoatNormalMapUv:Zt&&v(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ut&&v(S.clearcoatRoughnessMap.channel),iridescenceMapUv:At&&v(S.iridescenceMap.channel),iridescenceThicknessMapUv:Nt&&v(S.iridescenceThicknessMap.channel),sheenColorMapUv:zt&&v(S.sheenColorMap.channel),sheenRoughnessMapUv:Ct&&v(S.sheenRoughnessMap.channel),specularMapUv:$t&&v(S.specularMap.channel),specularColorMapUv:Vt&&v(S.specularColorMap.channel),specularIntensityMapUv:re&&v(S.specularIntensityMap.channel),transmissionMapUv:B&&v(S.transmissionMap.channel),thicknessMapUv:Mt&&v(S.thicknessMap.channel),alphaMapUv:ot&&v(S.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(yt||b),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,pointsUvs:A.isPoints===!0&&!!z.attributes.uv&&(ht||ot),fog:!!I,useFog:S.fog===!0,fogExp2:!!I&&I.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:st,skinning:A.isSkinnedMesh===!0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:ct,morphTextureStride:xt,numDirLights:_.directional.length,numPointLights:_.point.length,numSpotLights:_.spot.length,numSpotLightMaps:_.spotLightMap.length,numRectAreaLights:_.rectArea.length,numHemiLights:_.hemi.length,numDirLightShadows:_.directionalShadowMap.length,numPointLightShadows:_.pointShadowMap.length,numSpotLightShadows:_.spotShadowMap.length,numSpotLightShadowsWithMaps:_.numSpotLightShadowsWithMaps,numLightProbes:_.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:S.dithering,shadowMapEnabled:s.shadowMap.enabled&&w.length>0,shadowMapType:s.shadowMap.type,toneMapping:ue,decodeVideoTexture:ht&&S.map.isVideoTexture===!0&&jt.getTransfer(S.map.colorSpace)===ie,decodeVideoTextureEmissive:Ut&&S.emissiveMap.isVideoTexture===!0&&jt.getTransfer(S.emissiveMap.colorSpace)===ie,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Ke,flipSided:S.side===Ce,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:kt&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(kt&&S.extensions.multiDraw===!0||ft)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return be.vertexUv1s=c.has(1),be.vertexUv2s=c.has(2),be.vertexUv3s=c.has(3),c.clear(),be}function d(S){const _=[];if(S.shaderID?_.push(S.shaderID):(_.push(S.customVertexShaderID),_.push(S.customFragmentShaderID)),S.defines!==void 0)for(const w in S.defines)_.push(w),_.push(S.defines[w]);return S.isRawShaderMaterial===!1&&(x(_,S),y(_,S),_.push(s.outputColorSpace)),_.push(S.customProgramCacheKey),_.join()}function x(S,_){S.push(_.precision),S.push(_.outputColorSpace),S.push(_.envMapMode),S.push(_.envMapCubeUVHeight),S.push(_.mapUv),S.push(_.alphaMapUv),S.push(_.lightMapUv),S.push(_.aoMapUv),S.push(_.bumpMapUv),S.push(_.normalMapUv),S.push(_.displacementMapUv),S.push(_.emissiveMapUv),S.push(_.metalnessMapUv),S.push(_.roughnessMapUv),S.push(_.anisotropyMapUv),S.push(_.clearcoatMapUv),S.push(_.clearcoatNormalMapUv),S.push(_.clearcoatRoughnessMapUv),S.push(_.iridescenceMapUv),S.push(_.iridescenceThicknessMapUv),S.push(_.sheenColorMapUv),S.push(_.sheenRoughnessMapUv),S.push(_.specularMapUv),S.push(_.specularColorMapUv),S.push(_.specularIntensityMapUv),S.push(_.transmissionMapUv),S.push(_.thicknessMapUv),S.push(_.combine),S.push(_.fogExp2),S.push(_.sizeAttenuation),S.push(_.morphTargetsCount),S.push(_.morphAttributeCount),S.push(_.numDirLights),S.push(_.numPointLights),S.push(_.numSpotLights),S.push(_.numSpotLightMaps),S.push(_.numHemiLights),S.push(_.numRectAreaLights),S.push(_.numDirLightShadows),S.push(_.numPointLightShadows),S.push(_.numSpotLightShadows),S.push(_.numSpotLightShadowsWithMaps),S.push(_.numLightProbes),S.push(_.shadowMapType),S.push(_.toneMapping),S.push(_.numClippingPlanes),S.push(_.numClipIntersection),S.push(_.depthPacking)}function y(S,_){a.disableAll(),_.supportsVertexTextures&&a.enable(0),_.instancing&&a.enable(1),_.instancingColor&&a.enable(2),_.instancingMorph&&a.enable(3),_.matcap&&a.enable(4),_.envMap&&a.enable(5),_.normalMapObjectSpace&&a.enable(6),_.normalMapTangentSpace&&a.enable(7),_.clearcoat&&a.enable(8),_.iridescence&&a.enable(9),_.alphaTest&&a.enable(10),_.vertexColors&&a.enable(11),_.vertexAlphas&&a.enable(12),_.vertexUv1s&&a.enable(13),_.vertexUv2s&&a.enable(14),_.vertexUv3s&&a.enable(15),_.vertexTangents&&a.enable(16),_.anisotropy&&a.enable(17),_.alphaHash&&a.enable(18),_.batching&&a.enable(19),_.dispersion&&a.enable(20),_.batchingColor&&a.enable(21),S.push(a.mask),a.disableAll(),_.fog&&a.enable(0),_.useFog&&a.enable(1),_.flatShading&&a.enable(2),_.logarithmicDepthBuffer&&a.enable(3),_.reverseDepthBuffer&&a.enable(4),_.skinning&&a.enable(5),_.morphTargets&&a.enable(6),_.morphNormals&&a.enable(7),_.morphColors&&a.enable(8),_.premultipliedAlpha&&a.enable(9),_.shadowMapEnabled&&a.enable(10),_.doubleSided&&a.enable(11),_.flipSided&&a.enable(12),_.useDepthPacking&&a.enable(13),_.dithering&&a.enable(14),_.transmission&&a.enable(15),_.sheen&&a.enable(16),_.opaque&&a.enable(17),_.pointsUvs&&a.enable(18),_.decodeVideoTexture&&a.enable(19),_.decodeVideoTextureEmissive&&a.enable(20),_.alphaToCoverage&&a.enable(21),S.push(a.mask)}function M(S){const _=g[S.type];let w;if(_){const R=fn[_];w=mu.clone(R.uniforms)}else w=S.uniforms;return w}function D(S,_){let w;for(let R=0,A=h.length;R<A;R++){const I=h[R];if(I.cacheKey===_){w=I,++w.usedTimes;break}}return w===void 0&&(w=new Rm(s,_,S,o),h.push(w)),w}function C(S){if(--S.usedTimes===0){const _=h.indexOf(S);h[_]=h[h.length-1],h.pop(),S.destroy()}}function E(S){l.remove(S)}function L(){l.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:M,acquireProgram:D,releaseProgram:C,releaseShaderCache:E,programs:h,dispose:L}}function Fm(){let s=new WeakMap;function t(r){return s.has(r)}function e(r){let a=s.get(r);return a===void 0&&(a={},s.set(r,a)),a}function n(r){s.delete(r)}function i(r,a,l){s.get(r)[a]=l}function o(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:o}}function Um(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function Dl(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function Ll(){const s=[];let t=0;const e=[],n=[],i=[];function o(){t=0,e.length=0,n.length=0,i.length=0}function r(u,f,p,g,v,m){let d=s[t];return d===void 0?(d={id:u.id,object:u,geometry:f,material:p,groupOrder:g,renderOrder:u.renderOrder,z:v,group:m},s[t]=d):(d.id=u.id,d.object=u,d.geometry=f,d.material=p,d.groupOrder=g,d.renderOrder=u.renderOrder,d.z=v,d.group=m),t++,d}function a(u,f,p,g,v,m){const d=r(u,f,p,g,v,m);p.transmission>0?n.push(d):p.transparent===!0?i.push(d):e.push(d)}function l(u,f,p,g,v,m){const d=r(u,f,p,g,v,m);p.transmission>0?n.unshift(d):p.transparent===!0?i.unshift(d):e.unshift(d)}function c(u,f){e.length>1&&e.sort(u||Um),n.length>1&&n.sort(f||Dl),i.length>1&&i.sort(f||Dl)}function h(){for(let u=t,f=s.length;u<f;u++){const p=s[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:i,init:o,push:a,unshift:l,finish:h,sort:c}}function Nm(){let s=new WeakMap;function t(n,i){const o=s.get(n);let r;return o===void 0?(r=new Ll,s.set(n,[r])):i>=o.length?(r=new Ll,o.push(r)):r=o[i],r}function e(){s=new WeakMap}return{get:t,dispose:e}}function zm(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new O,color:new J};break;case"SpotLight":e={position:new O,direction:new O,color:new J,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new O,color:new J,distance:0,decay:0};break;case"HemisphereLight":e={direction:new O,skyColor:new J,groundColor:new J};break;case"RectAreaLight":e={color:new J,position:new O,halfWidth:new O,halfHeight:new O};break}return s[t.id]=e,e}}}function Bm(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let Om=0;function km(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function Hm(s){const t=new zm,e=Bm(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new O);const i=new O,o=new oe,r=new oe;function a(c){let h=0,u=0,f=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let p=0,g=0,v=0,m=0,d=0,x=0,y=0,M=0,D=0,C=0,E=0;c.sort(km);for(let S=0,_=c.length;S<_;S++){const w=c[S],R=w.color,A=w.intensity,I=w.distance,z=w.shadow&&w.shadow.map?w.shadow.map.texture:null;if(w.isAmbientLight)h+=R.r*A,u+=R.g*A,f+=R.b*A;else if(w.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(w.sh.coefficients[W],A);E++}else if(w.isDirectionalLight){const W=t.get(w);if(W.color.copy(w.color).multiplyScalar(w.intensity),w.castShadow){const Q=w.shadow,k=e.get(w);k.shadowIntensity=Q.intensity,k.shadowBias=Q.bias,k.shadowNormalBias=Q.normalBias,k.shadowRadius=Q.radius,k.shadowMapSize=Q.mapSize,n.directionalShadow[p]=k,n.directionalShadowMap[p]=z,n.directionalShadowMatrix[p]=w.shadow.matrix,x++}n.directional[p]=W,p++}else if(w.isSpotLight){const W=t.get(w);W.position.setFromMatrixPosition(w.matrixWorld),W.color.copy(R).multiplyScalar(A),W.distance=I,W.coneCos=Math.cos(w.angle),W.penumbraCos=Math.cos(w.angle*(1-w.penumbra)),W.decay=w.decay,n.spot[v]=W;const Q=w.shadow;if(w.map&&(n.spotLightMap[D]=w.map,D++,Q.updateMatrices(w),w.castShadow&&C++),n.spotLightMatrix[v]=Q.matrix,w.castShadow){const k=e.get(w);k.shadowIntensity=Q.intensity,k.shadowBias=Q.bias,k.shadowNormalBias=Q.normalBias,k.shadowRadius=Q.radius,k.shadowMapSize=Q.mapSize,n.spotShadow[v]=k,n.spotShadowMap[v]=z,M++}v++}else if(w.isRectAreaLight){const W=t.get(w);W.color.copy(R).multiplyScalar(A),W.halfWidth.set(w.width*.5,0,0),W.halfHeight.set(0,w.height*.5,0),n.rectArea[m]=W,m++}else if(w.isPointLight){const W=t.get(w);if(W.color.copy(w.color).multiplyScalar(w.intensity),W.distance=w.distance,W.decay=w.decay,w.castShadow){const Q=w.shadow,k=e.get(w);k.shadowIntensity=Q.intensity,k.shadowBias=Q.bias,k.shadowNormalBias=Q.normalBias,k.shadowRadius=Q.radius,k.shadowMapSize=Q.mapSize,k.shadowCameraNear=Q.camera.near,k.shadowCameraFar=Q.camera.far,n.pointShadow[g]=k,n.pointShadowMap[g]=z,n.pointShadowMatrix[g]=w.shadow.matrix,y++}n.point[g]=W,g++}else if(w.isHemisphereLight){const W=t.get(w);W.skyColor.copy(w.color).multiplyScalar(A),W.groundColor.copy(w.groundColor).multiplyScalar(A),n.hemi[d]=W,d++}}m>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=vt.LTC_FLOAT_1,n.rectAreaLTC2=vt.LTC_FLOAT_2):(n.rectAreaLTC1=vt.LTC_HALF_1,n.rectAreaLTC2=vt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;const L=n.hash;(L.directionalLength!==p||L.pointLength!==g||L.spotLength!==v||L.rectAreaLength!==m||L.hemiLength!==d||L.numDirectionalShadows!==x||L.numPointShadows!==y||L.numSpotShadows!==M||L.numSpotMaps!==D||L.numLightProbes!==E)&&(n.directional.length=p,n.spot.length=v,n.rectArea.length=m,n.point.length=g,n.hemi.length=d,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=M+D-C,n.spotLightMap.length=D,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=E,L.directionalLength=p,L.pointLength=g,L.spotLength=v,L.rectAreaLength=m,L.hemiLength=d,L.numDirectionalShadows=x,L.numPointShadows=y,L.numSpotShadows=M,L.numSpotMaps=D,L.numLightProbes=E,n.version=Om++)}function l(c,h){let u=0,f=0,p=0,g=0,v=0;const m=h.matrixWorldInverse;for(let d=0,x=c.length;d<x;d++){const y=c[d];if(y.isDirectionalLight){const M=n.directional[u];M.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),M.direction.sub(i),M.direction.transformDirection(m),u++}else if(y.isSpotLight){const M=n.spot[p];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),M.direction.sub(i),M.direction.transformDirection(m),p++}else if(y.isRectAreaLight){const M=n.rectArea[g];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(m),r.identity(),o.copy(y.matrixWorld),o.premultiply(m),r.extractRotation(o),M.halfWidth.set(y.width*.5,0,0),M.halfHeight.set(0,y.height*.5,0),M.halfWidth.applyMatrix4(r),M.halfHeight.applyMatrix4(r),g++}else if(y.isPointLight){const M=n.point[f];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(m),f++}else if(y.isHemisphereLight){const M=n.hemi[v];M.direction.setFromMatrixPosition(y.matrixWorld),M.direction.transformDirection(m),v++}}}return{setup:a,setupView:l,state:n}}function Il(s){const t=new Hm(s),e=[],n=[];function i(h){c.camera=h,e.length=0,n.length=0}function o(h){e.push(h)}function r(h){n.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:o,pushShadow:r}}function Gm(s){let t=new WeakMap;function e(i,o=0){const r=t.get(i);let a;return r===void 0?(a=new Il(s),t.set(i,[a])):o>=r.length?(a=new Il(s),r.push(a)):a=r[o],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class Vm extends Ki{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Bh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Wm extends Ki{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Xm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,$m=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function qm(s,t,e){let n=new Ma;const i=new Xt,o=new Xt,r=new de,a=new Vm({depthPacking:Oh}),l=new Wm,c={},h=e.maxTextureSize,u={[Xn]:Ce,[Ce]:Xn,[Ke]:Ke},f=new Be({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Xt},radius:{value:4}},vertexShader:Xm,fragmentShader:$m}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const g=new fe;g.setAttribute("position",new pe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Kt(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=_c;let d=this.type;this.render=function(C,E,L){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;const S=s.getRenderTarget(),_=s.getActiveCubeFace(),w=s.getActiveMipmapLevel(),R=s.state;R.setBlending(Vn),R.buffers.color.setClear(1,1,1,1),R.buffers.depth.setTest(!0),R.setScissorTest(!1);const A=d!==wn&&this.type===wn,I=d===wn&&this.type!==wn;for(let z=0,W=C.length;z<W;z++){const Q=C[z],k=Q.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;i.copy(k.mapSize);const K=k.getFrameExtents();if(i.multiply(K),o.copy(k.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(o.x=Math.floor(h/K.x),i.x=o.x*K.x,k.mapSize.x=o.x),i.y>h&&(o.y=Math.floor(h/K.y),i.y=o.y*K.y,k.mapSize.y=o.y)),k.map===null||A===!0||I===!0){const ct=this.type!==wn?{minFilter:Xe,magFilter:Xe}:{};k.map!==null&&k.map.dispose(),k.map=new Ve(i.x,i.y,ct),k.map.texture.name=Q.name+".shadowMap",k.camera.updateProjectionMatrix()}s.setRenderTarget(k.map),s.clear();const q=k.getViewportCount();for(let ct=0;ct<q;ct++){const xt=k.getViewport(ct);r.set(o.x*xt.x,o.y*xt.y,o.x*xt.z,o.y*xt.w),R.viewport(r),k.updateMatrices(Q,ct),n=k.getFrustum(),M(E,L,k.camera,Q,this.type)}k.isPointLightShadow!==!0&&this.type===wn&&x(k,L),k.needsUpdate=!1}d=this.type,m.needsUpdate=!1,s.setRenderTarget(S,_,w)};function x(C,E){const L=t.update(v);f.defines.VSM_SAMPLES!==C.blurSamples&&(f.defines.VSM_SAMPLES=C.blurSamples,p.defines.VSM_SAMPLES=C.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new Ve(i.x,i.y)),f.uniforms.shadow_pass.value=C.map.texture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,s.setRenderTarget(C.mapPass),s.clear(),s.renderBufferDirect(E,null,L,f,v,null),p.uniforms.shadow_pass.value=C.mapPass.texture,p.uniforms.resolution.value=C.mapSize,p.uniforms.radius.value=C.radius,s.setRenderTarget(C.map),s.clear(),s.renderBufferDirect(E,null,L,p,v,null)}function y(C,E,L,S){let _=null;const w=L.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(w!==void 0)_=w;else if(_=L.isPointLight===!0?l:a,s.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0){const R=_.uuid,A=E.uuid;let I=c[R];I===void 0&&(I={},c[R]=I);let z=I[A];z===void 0&&(z=_.clone(),I[A]=z,E.addEventListener("dispose",D)),_=z}if(_.visible=E.visible,_.wireframe=E.wireframe,S===wn?_.side=E.shadowSide!==null?E.shadowSide:E.side:_.side=E.shadowSide!==null?E.shadowSide:u[E.side],_.alphaMap=E.alphaMap,_.alphaTest=E.alphaTest,_.map=E.map,_.clipShadows=E.clipShadows,_.clippingPlanes=E.clippingPlanes,_.clipIntersection=E.clipIntersection,_.displacementMap=E.displacementMap,_.displacementScale=E.displacementScale,_.displacementBias=E.displacementBias,_.wireframeLinewidth=E.wireframeLinewidth,_.linewidth=E.linewidth,L.isPointLight===!0&&_.isMeshDistanceMaterial===!0){const R=s.properties.get(_);R.light=L}return _}function M(C,E,L,S,_){if(C.visible===!1)return;if(C.layers.test(E.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&_===wn)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,C.matrixWorld);const A=t.update(C),I=C.material;if(Array.isArray(I)){const z=A.groups;for(let W=0,Q=z.length;W<Q;W++){const k=z[W],K=I[k.materialIndex];if(K&&K.visible){const q=y(C,K,S,_);C.onBeforeShadow(s,C,E,L,A,q,k),s.renderBufferDirect(L,null,A,q,C,k),C.onAfterShadow(s,C,E,L,A,q,k)}}}else if(I.visible){const z=y(C,I,S,_);C.onBeforeShadow(s,C,E,L,A,z,null),s.renderBufferDirect(L,null,A,z,C,null),C.onAfterShadow(s,C,E,L,A,z,null)}}const R=C.children;for(let A=0,I=R.length;A<I;A++)M(R[A],E,L,S,_)}function D(C){C.target.removeEventListener("dispose",D);for(const L in c){const S=c[L],_=C.target.uuid;_ in S&&(S[_].dispose(),delete S[_])}}}const Ym={[Mr]:yr,[Sr]:wr,[br]:Tr,[Gi]:Er,[yr]:Mr,[wr]:Sr,[Tr]:br,[Er]:Gi};function Zm(s,t){function e(){let B=!1;const Mt=new de;let tt=null;const ot=new de(0,0,0,0);return{setMask:function(Et){tt!==Et&&!B&&(s.colorMask(Et,Et,Et,Et),tt=Et)},setLocked:function(Et){B=Et},setClear:function(Et,St,kt,ue,be){be===!0&&(Et*=ue,St*=ue,kt*=ue),Mt.set(Et,St,kt,ue),ot.equals(Mt)===!1&&(s.clearColor(Et,St,kt,ue),ot.copy(Mt))},reset:function(){B=!1,tt=null,ot.set(-1,0,0,0)}}}function n(){let B=!1,Mt=!1,tt=null,ot=null,Et=null;return{setReversed:function(St){if(Mt!==St){const kt=t.get("EXT_clip_control");Mt?kt.clipControlEXT(kt.LOWER_LEFT_EXT,kt.ZERO_TO_ONE_EXT):kt.clipControlEXT(kt.LOWER_LEFT_EXT,kt.NEGATIVE_ONE_TO_ONE_EXT);const ue=Et;Et=null,this.setClear(ue)}Mt=St},getReversed:function(){return Mt},setTest:function(St){St?N(s.DEPTH_TEST):st(s.DEPTH_TEST)},setMask:function(St){tt!==St&&!B&&(s.depthMask(St),tt=St)},setFunc:function(St){if(Mt&&(St=Ym[St]),ot!==St){switch(St){case Mr:s.depthFunc(s.NEVER);break;case yr:s.depthFunc(s.ALWAYS);break;case Sr:s.depthFunc(s.LESS);break;case Gi:s.depthFunc(s.LEQUAL);break;case br:s.depthFunc(s.EQUAL);break;case Er:s.depthFunc(s.GEQUAL);break;case wr:s.depthFunc(s.GREATER);break;case Tr:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}ot=St}},setLocked:function(St){B=St},setClear:function(St){Et!==St&&(Mt&&(St=1-St),s.clearDepth(St),Et=St)},reset:function(){B=!1,tt=null,ot=null,Et=null,Mt=!1}}}function i(){let B=!1,Mt=null,tt=null,ot=null,Et=null,St=null,kt=null,ue=null,be=null;return{setTest:function(ne){B||(ne?N(s.STENCIL_TEST):st(s.STENCIL_TEST))},setMask:function(ne){Mt!==ne&&!B&&(s.stencilMask(ne),Mt=ne)},setFunc:function(ne,nn,vn){(tt!==ne||ot!==nn||Et!==vn)&&(s.stencilFunc(ne,nn,vn),tt=ne,ot=nn,Et=vn)},setOp:function(ne,nn,vn){(St!==ne||kt!==nn||ue!==vn)&&(s.stencilOp(ne,nn,vn),St=ne,kt=nn,ue=vn)},setLocked:function(ne){B=ne},setClear:function(ne){be!==ne&&(s.clearStencil(ne),be=ne)},reset:function(){B=!1,Mt=null,tt=null,ot=null,Et=null,St=null,kt=null,ue=null,be=null}}}const o=new e,r=new n,a=new i,l=new WeakMap,c=new WeakMap;let h={},u={},f=new WeakMap,p=[],g=null,v=!1,m=null,d=null,x=null,y=null,M=null,D=null,C=null,E=new J(0,0,0),L=0,S=!1,_=null,w=null,R=null,A=null,I=null;const z=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,Q=0;const k=s.getParameter(s.VERSION);k.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(k)[1]),W=Q>=1):k.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(k)[1]),W=Q>=2);let K=null,q={};const ct=s.getParameter(s.SCISSOR_BOX),xt=s.getParameter(s.VIEWPORT),Y=new de().fromArray(ct),U=new de().fromArray(xt);function X(B,Mt,tt,ot){const Et=new Uint8Array(4),St=s.createTexture();s.bindTexture(B,St),s.texParameteri(B,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(B,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let kt=0;kt<tt;kt++)B===s.TEXTURE_3D||B===s.TEXTURE_2D_ARRAY?s.texImage3D(Mt,0,s.RGBA,1,1,ot,0,s.RGBA,s.UNSIGNED_BYTE,Et):s.texImage2D(Mt+kt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Et);return St}const $={};$[s.TEXTURE_2D]=X(s.TEXTURE_2D,s.TEXTURE_2D,1),$[s.TEXTURE_CUBE_MAP]=X(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),$[s.TEXTURE_2D_ARRAY]=X(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),$[s.TEXTURE_3D]=X(s.TEXTURE_3D,s.TEXTURE_3D,1,1),o.setClear(0,0,0,1),r.setClear(1),a.setClear(0),N(s.DEPTH_TEST),r.setFunc(Gi),pt(!1),yt(Oa),N(s.CULL_FACE),F(Vn);function N(B){h[B]!==!0&&(s.enable(B),h[B]=!0)}function st(B){h[B]!==!1&&(s.disable(B),h[B]=!1)}function rt(B,Mt){return u[B]!==Mt?(s.bindFramebuffer(B,Mt),u[B]=Mt,B===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=Mt),B===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=Mt),!0):!1}function ft(B,Mt){let tt=p,ot=!1;if(B){tt=f.get(Mt),tt===void 0&&(tt=[],f.set(Mt,tt));const Et=B.textures;if(tt.length!==Et.length||tt[0]!==s.COLOR_ATTACHMENT0){for(let St=0,kt=Et.length;St<kt;St++)tt[St]=s.COLOR_ATTACHMENT0+St;tt.length=Et.length,ot=!0}}else tt[0]!==s.BACK&&(tt[0]=s.BACK,ot=!0);ot&&s.drawBuffers(tt)}function ht(B){return g!==B?(s.useProgram(B),g=B,!0):!1}const at={[ni]:s.FUNC_ADD,[dh]:s.FUNC_SUBTRACT,[fh]:s.FUNC_REVERSE_SUBTRACT};at[ph]=s.MIN,at[mh]=s.MAX;const lt={[gh]:s.ZERO,[vh]:s.ONE,[xh]:s.SRC_COLOR,[xr]:s.SRC_ALPHA,[Eh]:s.SRC_ALPHA_SATURATE,[Sh]:s.DST_COLOR,[Mh]:s.DST_ALPHA,[_h]:s.ONE_MINUS_SRC_COLOR,[_r]:s.ONE_MINUS_SRC_ALPHA,[bh]:s.ONE_MINUS_DST_COLOR,[yh]:s.ONE_MINUS_DST_ALPHA,[wh]:s.CONSTANT_COLOR,[Th]:s.ONE_MINUS_CONSTANT_COLOR,[Ah]:s.CONSTANT_ALPHA,[Ch]:s.ONE_MINUS_CONSTANT_ALPHA};function F(B,Mt,tt,ot,Et,St,kt,ue,be,ne){if(B===Vn){v===!0&&(st(s.BLEND),v=!1);return}if(v===!1&&(N(s.BLEND),v=!0),B!==uh){if(B!==m||ne!==S){if((d!==ni||M!==ni)&&(s.blendEquation(s.FUNC_ADD),d=ni,M=ni),ne)switch(B){case Bi:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case vr:s.blendFunc(s.ONE,s.ONE);break;case ka:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Ha:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}else switch(B){case Bi:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case vr:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case ka:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Ha:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}x=null,y=null,D=null,C=null,E.set(0,0,0),L=0,m=B,S=ne}return}Et=Et||Mt,St=St||tt,kt=kt||ot,(Mt!==d||Et!==M)&&(s.blendEquationSeparate(at[Mt],at[Et]),d=Mt,M=Et),(tt!==x||ot!==y||St!==D||kt!==C)&&(s.blendFuncSeparate(lt[tt],lt[ot],lt[St],lt[kt]),x=tt,y=ot,D=St,C=kt),(ue.equals(E)===!1||be!==L)&&(s.blendColor(ue.r,ue.g,ue.b,be),E.copy(ue),L=be),m=B,S=!1}function wt(B,Mt){B.side===Ke?st(s.CULL_FACE):N(s.CULL_FACE);let tt=B.side===Ce;Mt&&(tt=!tt),pt(tt),B.blending===Bi&&B.transparent===!1?F(Vn):F(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.blendColor,B.blendAlpha,B.premultipliedAlpha),r.setFunc(B.depthFunc),r.setTest(B.depthTest),r.setMask(B.depthWrite),o.setMask(B.colorWrite);const ot=B.stencilWrite;a.setTest(ot),ot&&(a.setMask(B.stencilWriteMask),a.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),a.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),Ut(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?N(s.SAMPLE_ALPHA_TO_COVERAGE):st(s.SAMPLE_ALPHA_TO_COVERAGE)}function pt(B){_!==B&&(B?s.frontFace(s.CW):s.frontFace(s.CCW),_=B)}function yt(B){B!==ch?(N(s.CULL_FACE),B!==w&&(B===Oa?s.cullFace(s.BACK):B===hh?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):st(s.CULL_FACE),w=B}function mt(B){B!==R&&(W&&s.lineWidth(B),R=B)}function Ut(B,Mt,tt){B?(N(s.POLYGON_OFFSET_FILL),(A!==Mt||I!==tt)&&(s.polygonOffset(Mt,tt),A=Mt,I=tt)):st(s.POLYGON_OFFSET_FILL)}function gt(B){B?N(s.SCISSOR_TEST):st(s.SCISSOR_TEST)}function P(B){B===void 0&&(B=s.TEXTURE0+z-1),K!==B&&(s.activeTexture(B),K=B)}function b(B,Mt,tt){tt===void 0&&(K===null?tt=s.TEXTURE0+z-1:tt=K);let ot=q[tt];ot===void 0&&(ot={type:void 0,texture:void 0},q[tt]=ot),(ot.type!==B||ot.texture!==Mt)&&(K!==tt&&(s.activeTexture(tt),K=tt),s.bindTexture(B,Mt||$[B]),ot.type=B,ot.texture=Mt)}function V(){const B=q[K];B!==void 0&&B.type!==void 0&&(s.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function nt(){try{s.compressedTexImage2D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function it(){try{s.compressedTexImage3D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function et(){try{s.texSubImage2D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Rt(){try{s.texSubImage3D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function _t(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Tt(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Zt(){try{s.texStorage2D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ut(){try{s.texStorage3D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function At(){try{s.texImage2D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Nt(){try{s.texImage3D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function zt(B){Y.equals(B)===!1&&(s.scissor(B.x,B.y,B.z,B.w),Y.copy(B))}function Ct(B){U.equals(B)===!1&&(s.viewport(B.x,B.y,B.z,B.w),U.copy(B))}function $t(B,Mt){let tt=c.get(Mt);tt===void 0&&(tt=new WeakMap,c.set(Mt,tt));let ot=tt.get(B);ot===void 0&&(ot=s.getUniformBlockIndex(Mt,B.name),tt.set(B,ot))}function Vt(B,Mt){const ot=c.get(Mt).get(B);l.get(Mt)!==ot&&(s.uniformBlockBinding(Mt,ot,B.__bindingPointIndex),l.set(Mt,ot))}function re(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),r.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},K=null,q={},u={},f=new WeakMap,p=[],g=null,v=!1,m=null,d=null,x=null,y=null,M=null,D=null,C=null,E=new J(0,0,0),L=0,S=!1,_=null,w=null,R=null,A=null,I=null,Y.set(0,0,s.canvas.width,s.canvas.height),U.set(0,0,s.canvas.width,s.canvas.height),o.reset(),r.reset(),a.reset()}return{buffers:{color:o,depth:r,stencil:a},enable:N,disable:st,bindFramebuffer:rt,drawBuffers:ft,useProgram:ht,setBlending:F,setMaterial:wt,setFlipSided:pt,setCullFace:yt,setLineWidth:mt,setPolygonOffset:Ut,setScissorTest:gt,activeTexture:P,bindTexture:b,unbindTexture:V,compressedTexImage2D:nt,compressedTexImage3D:it,texImage2D:At,texImage3D:Nt,updateUBOMapping:$t,uniformBlockBinding:Vt,texStorage2D:Zt,texStorage3D:ut,texSubImage2D:et,texSubImage3D:Rt,compressedTexSubImage2D:_t,compressedTexSubImage3D:Tt,scissor:zt,viewport:Ct,reset:re}}function Fl(s,t,e,n){const i=jm(n);switch(e){case Ac:return s*t;case Rc:return s*t;case Pc:return s*t*2;case pa:return s*t/i.components*i.byteLength;case ma:return s*t/i.components*i.byteLength;case Dc:return s*t*2/i.components*i.byteLength;case ga:return s*t*2/i.components*i.byteLength;case Cc:return s*t*3/i.components*i.byteLength;case We:return s*t*4/i.components*i.byteLength;case va:return s*t*4/i.components*i.byteLength;case so:case oo:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case ro:case ao:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Dr:case Ir:return Math.max(s,16)*Math.max(t,8)/4;case Pr:case Lr:return Math.max(s,8)*Math.max(t,8)/2;case Fr:case Ur:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Nr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case zr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Br:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case Or:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case kr:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case Hr:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case Gr:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case Vr:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case Wr:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case Xr:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case $r:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case qr:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case Yr:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case Zr:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case jr:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case lo:case Kr:case Jr:return Math.ceil(s/4)*Math.ceil(t/4)*16;case Lc:case Qr:return Math.ceil(s/4)*Math.ceil(t/4)*8;case ta:case ea:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function jm(s){switch(s){case ze:case Ec:return{byteLength:1,components:1};case gs:case wc:case Wn:return{byteLength:2,components:1};case da:case fa:return{byteLength:2,components:4};case pi:case ua:case pn:return{byteLength:4,components:1};case Tc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}function Km(s,t,e,n,i,o,r){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Xt,h=new WeakMap;let u;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(P,b){return p?new OffscreenCanvas(P,b):mo("canvas")}function v(P,b,V){let nt=1;const it=gt(P);if((it.width>V||it.height>V)&&(nt=V/Math.max(it.width,it.height)),nt<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const et=Math.floor(nt*it.width),Rt=Math.floor(nt*it.height);u===void 0&&(u=g(et,Rt));const _t=b?g(et,Rt):u;return _t.width=et,_t.height=Rt,_t.getContext("2d").drawImage(P,0,0,et,Rt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+it.width+"x"+it.height+") to ("+et+"x"+Rt+")."),_t}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+it.width+"x"+it.height+")."),P;return P}function m(P){return P.generateMipmaps}function d(P){s.generateMipmap(P)}function x(P){return P.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?s.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function y(P,b,V,nt,it=!1){if(P!==null){if(s[P]!==void 0)return s[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let et=b;if(b===s.RED&&(V===s.FLOAT&&(et=s.R32F),V===s.HALF_FLOAT&&(et=s.R16F),V===s.UNSIGNED_BYTE&&(et=s.R8)),b===s.RED_INTEGER&&(V===s.UNSIGNED_BYTE&&(et=s.R8UI),V===s.UNSIGNED_SHORT&&(et=s.R16UI),V===s.UNSIGNED_INT&&(et=s.R32UI),V===s.BYTE&&(et=s.R8I),V===s.SHORT&&(et=s.R16I),V===s.INT&&(et=s.R32I)),b===s.RG&&(V===s.FLOAT&&(et=s.RG32F),V===s.HALF_FLOAT&&(et=s.RG16F),V===s.UNSIGNED_BYTE&&(et=s.RG8)),b===s.RG_INTEGER&&(V===s.UNSIGNED_BYTE&&(et=s.RG8UI),V===s.UNSIGNED_SHORT&&(et=s.RG16UI),V===s.UNSIGNED_INT&&(et=s.RG32UI),V===s.BYTE&&(et=s.RG8I),V===s.SHORT&&(et=s.RG16I),V===s.INT&&(et=s.RG32I)),b===s.RGB_INTEGER&&(V===s.UNSIGNED_BYTE&&(et=s.RGB8UI),V===s.UNSIGNED_SHORT&&(et=s.RGB16UI),V===s.UNSIGNED_INT&&(et=s.RGB32UI),V===s.BYTE&&(et=s.RGB8I),V===s.SHORT&&(et=s.RGB16I),V===s.INT&&(et=s.RGB32I)),b===s.RGBA_INTEGER&&(V===s.UNSIGNED_BYTE&&(et=s.RGBA8UI),V===s.UNSIGNED_SHORT&&(et=s.RGBA16UI),V===s.UNSIGNED_INT&&(et=s.RGBA32UI),V===s.BYTE&&(et=s.RGBA8I),V===s.SHORT&&(et=s.RGBA16I),V===s.INT&&(et=s.RGBA32I)),b===s.RGB&&V===s.UNSIGNED_INT_5_9_9_9_REV&&(et=s.RGB9_E5),b===s.RGBA){const Rt=it?So:jt.getTransfer(nt);V===s.FLOAT&&(et=s.RGBA32F),V===s.HALF_FLOAT&&(et=s.RGBA16F),V===s.UNSIGNED_BYTE&&(et=Rt===ie?s.SRGB8_ALPHA8:s.RGBA8),V===s.UNSIGNED_SHORT_4_4_4_4&&(et=s.RGBA4),V===s.UNSIGNED_SHORT_5_5_5_1&&(et=s.RGB5_A1)}return(et===s.R16F||et===s.R32F||et===s.RG16F||et===s.RG32F||et===s.RGBA16F||et===s.RGBA32F)&&t.get("EXT_color_buffer_float"),et}function M(P,b){let V;return P?b===null||b===pi||b===Xi?V=s.DEPTH24_STENCIL8:b===pn?V=s.DEPTH32F_STENCIL8:b===gs&&(V=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===pi||b===Xi?V=s.DEPTH_COMPONENT24:b===pn?V=s.DEPTH_COMPONENT32F:b===gs&&(V=s.DEPTH_COMPONENT16),V}function D(P,b){return m(P)===!0||P.isFramebufferTexture&&P.minFilter!==Xe&&P.minFilter!==Ae?Math.log2(Math.max(b.width,b.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?b.mipmaps.length:1}function C(P){const b=P.target;b.removeEventListener("dispose",C),L(b),b.isVideoTexture&&h.delete(b)}function E(P){const b=P.target;b.removeEventListener("dispose",E),_(b)}function L(P){const b=n.get(P);if(b.__webglInit===void 0)return;const V=P.source,nt=f.get(V);if(nt){const it=nt[b.__cacheKey];it.usedTimes--,it.usedTimes===0&&S(P),Object.keys(nt).length===0&&f.delete(V)}n.remove(P)}function S(P){const b=n.get(P);s.deleteTexture(b.__webglTexture);const V=P.source,nt=f.get(V);delete nt[b.__cacheKey],r.memory.textures--}function _(P){const b=n.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),n.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let nt=0;nt<6;nt++){if(Array.isArray(b.__webglFramebuffer[nt]))for(let it=0;it<b.__webglFramebuffer[nt].length;it++)s.deleteFramebuffer(b.__webglFramebuffer[nt][it]);else s.deleteFramebuffer(b.__webglFramebuffer[nt]);b.__webglDepthbuffer&&s.deleteRenderbuffer(b.__webglDepthbuffer[nt])}else{if(Array.isArray(b.__webglFramebuffer))for(let nt=0;nt<b.__webglFramebuffer.length;nt++)s.deleteFramebuffer(b.__webglFramebuffer[nt]);else s.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&s.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&s.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let nt=0;nt<b.__webglColorRenderbuffer.length;nt++)b.__webglColorRenderbuffer[nt]&&s.deleteRenderbuffer(b.__webglColorRenderbuffer[nt]);b.__webglDepthRenderbuffer&&s.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const V=P.textures;for(let nt=0,it=V.length;nt<it;nt++){const et=n.get(V[nt]);et.__webglTexture&&(s.deleteTexture(et.__webglTexture),r.memory.textures--),n.remove(V[nt])}n.remove(P)}let w=0;function R(){w=0}function A(){const P=w;return P>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+i.maxTextures),w+=1,P}function I(P){const b=[];return b.push(P.wrapS),b.push(P.wrapT),b.push(P.wrapR||0),b.push(P.magFilter),b.push(P.minFilter),b.push(P.anisotropy),b.push(P.internalFormat),b.push(P.format),b.push(P.type),b.push(P.generateMipmaps),b.push(P.premultiplyAlpha),b.push(P.flipY),b.push(P.unpackAlignment),b.push(P.colorSpace),b.join()}function z(P,b){const V=n.get(P);if(P.isVideoTexture&&mt(P),P.isRenderTargetTexture===!1&&P.version>0&&V.__version!==P.version){const nt=P.image;if(nt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(nt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{U(V,P,b);return}}e.bindTexture(s.TEXTURE_2D,V.__webglTexture,s.TEXTURE0+b)}function W(P,b){const V=n.get(P);if(P.version>0&&V.__version!==P.version){U(V,P,b);return}e.bindTexture(s.TEXTURE_2D_ARRAY,V.__webglTexture,s.TEXTURE0+b)}function Q(P,b){const V=n.get(P);if(P.version>0&&V.__version!==P.version){U(V,P,b);return}e.bindTexture(s.TEXTURE_3D,V.__webglTexture,s.TEXTURE0+b)}function k(P,b){const V=n.get(P);if(P.version>0&&V.__version!==P.version){X(V,P,b);return}e.bindTexture(s.TEXTURE_CUBE_MAP,V.__webglTexture,s.TEXTURE0+b)}const K={[fi]:s.REPEAT,[hn]:s.CLAMP_TO_EDGE,[Rr]:s.MIRRORED_REPEAT},q={[Xe]:s.NEAREST,[zh]:s.NEAREST_MIPMAP_NEAREST,[Es]:s.NEAREST_MIPMAP_LINEAR,[Ae]:s.LINEAR,[Co]:s.LINEAR_MIPMAP_NEAREST,[oi]:s.LINEAR_MIPMAP_LINEAR},ct={[Hh]:s.NEVER,[qh]:s.ALWAYS,[Gh]:s.LESS,[Fc]:s.LEQUAL,[Vh]:s.EQUAL,[$h]:s.GEQUAL,[Wh]:s.GREATER,[Xh]:s.NOTEQUAL};function xt(P,b){if(b.type===pn&&t.has("OES_texture_float_linear")===!1&&(b.magFilter===Ae||b.magFilter===Co||b.magFilter===Es||b.magFilter===oi||b.minFilter===Ae||b.minFilter===Co||b.minFilter===Es||b.minFilter===oi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(P,s.TEXTURE_WRAP_S,K[b.wrapS]),s.texParameteri(P,s.TEXTURE_WRAP_T,K[b.wrapT]),(P===s.TEXTURE_3D||P===s.TEXTURE_2D_ARRAY)&&s.texParameteri(P,s.TEXTURE_WRAP_R,K[b.wrapR]),s.texParameteri(P,s.TEXTURE_MAG_FILTER,q[b.magFilter]),s.texParameteri(P,s.TEXTURE_MIN_FILTER,q[b.minFilter]),b.compareFunction&&(s.texParameteri(P,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(P,s.TEXTURE_COMPARE_FUNC,ct[b.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===Xe||b.minFilter!==Es&&b.minFilter!==oi||b.type===pn&&t.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){const V=t.get("EXT_texture_filter_anisotropic");s.texParameterf(P,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,i.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function Y(P,b){let V=!1;P.__webglInit===void 0&&(P.__webglInit=!0,b.addEventListener("dispose",C));const nt=b.source;let it=f.get(nt);it===void 0&&(it={},f.set(nt,it));const et=I(b);if(et!==P.__cacheKey){it[et]===void 0&&(it[et]={texture:s.createTexture(),usedTimes:0},r.memory.textures++,V=!0),it[et].usedTimes++;const Rt=it[P.__cacheKey];Rt!==void 0&&(it[P.__cacheKey].usedTimes--,Rt.usedTimes===0&&S(b)),P.__cacheKey=et,P.__webglTexture=it[et].texture}return V}function U(P,b,V){let nt=s.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(nt=s.TEXTURE_2D_ARRAY),b.isData3DTexture&&(nt=s.TEXTURE_3D);const it=Y(P,b),et=b.source;e.bindTexture(nt,P.__webglTexture,s.TEXTURE0+V);const Rt=n.get(et);if(et.version!==Rt.__version||it===!0){e.activeTexture(s.TEXTURE0+V);const _t=jt.getPrimaries(jt.workingColorSpace),Tt=b.colorSpace===Gn?null:jt.getPrimaries(b.colorSpace),Zt=b.colorSpace===Gn||_t===Tt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,b.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,b.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Zt);let ut=v(b.image,!1,i.maxTextureSize);ut=Ut(b,ut);const At=o.convert(b.format,b.colorSpace),Nt=o.convert(b.type);let zt=y(b.internalFormat,At,Nt,b.colorSpace,b.isVideoTexture);xt(nt,b);let Ct;const $t=b.mipmaps,Vt=b.isVideoTexture!==!0,re=Rt.__version===void 0||it===!0,B=et.dataReady,Mt=D(b,ut);if(b.isDepthTexture)zt=M(b.format===$i,b.type),re&&(Vt?e.texStorage2D(s.TEXTURE_2D,1,zt,ut.width,ut.height):e.texImage2D(s.TEXTURE_2D,0,zt,ut.width,ut.height,0,At,Nt,null));else if(b.isDataTexture)if($t.length>0){Vt&&re&&e.texStorage2D(s.TEXTURE_2D,Mt,zt,$t[0].width,$t[0].height);for(let tt=0,ot=$t.length;tt<ot;tt++)Ct=$t[tt],Vt?B&&e.texSubImage2D(s.TEXTURE_2D,tt,0,0,Ct.width,Ct.height,At,Nt,Ct.data):e.texImage2D(s.TEXTURE_2D,tt,zt,Ct.width,Ct.height,0,At,Nt,Ct.data);b.generateMipmaps=!1}else Vt?(re&&e.texStorage2D(s.TEXTURE_2D,Mt,zt,ut.width,ut.height),B&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,ut.width,ut.height,At,Nt,ut.data)):e.texImage2D(s.TEXTURE_2D,0,zt,ut.width,ut.height,0,At,Nt,ut.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){Vt&&re&&e.texStorage3D(s.TEXTURE_2D_ARRAY,Mt,zt,$t[0].width,$t[0].height,ut.depth);for(let tt=0,ot=$t.length;tt<ot;tt++)if(Ct=$t[tt],b.format!==We)if(At!==null)if(Vt){if(B)if(b.layerUpdates.size>0){const Et=Fl(Ct.width,Ct.height,b.format,b.type);for(const St of b.layerUpdates){const kt=Ct.data.subarray(St*Et/Ct.data.BYTES_PER_ELEMENT,(St+1)*Et/Ct.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,tt,0,0,St,Ct.width,Ct.height,1,At,kt)}b.clearLayerUpdates()}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,tt,0,0,0,Ct.width,Ct.height,ut.depth,At,Ct.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,tt,zt,Ct.width,Ct.height,ut.depth,0,Ct.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Vt?B&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,tt,0,0,0,Ct.width,Ct.height,ut.depth,At,Nt,Ct.data):e.texImage3D(s.TEXTURE_2D_ARRAY,tt,zt,Ct.width,Ct.height,ut.depth,0,At,Nt,Ct.data)}else{Vt&&re&&e.texStorage2D(s.TEXTURE_2D,Mt,zt,$t[0].width,$t[0].height);for(let tt=0,ot=$t.length;tt<ot;tt++)Ct=$t[tt],b.format!==We?At!==null?Vt?B&&e.compressedTexSubImage2D(s.TEXTURE_2D,tt,0,0,Ct.width,Ct.height,At,Ct.data):e.compressedTexImage2D(s.TEXTURE_2D,tt,zt,Ct.width,Ct.height,0,Ct.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Vt?B&&e.texSubImage2D(s.TEXTURE_2D,tt,0,0,Ct.width,Ct.height,At,Nt,Ct.data):e.texImage2D(s.TEXTURE_2D,tt,zt,Ct.width,Ct.height,0,At,Nt,Ct.data)}else if(b.isDataArrayTexture)if(Vt){if(re&&e.texStorage3D(s.TEXTURE_2D_ARRAY,Mt,zt,ut.width,ut.height,ut.depth),B)if(b.layerUpdates.size>0){const tt=Fl(ut.width,ut.height,b.format,b.type);for(const ot of b.layerUpdates){const Et=ut.data.subarray(ot*tt/ut.data.BYTES_PER_ELEMENT,(ot+1)*tt/ut.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,ot,ut.width,ut.height,1,At,Nt,Et)}b.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,ut.width,ut.height,ut.depth,At,Nt,ut.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,zt,ut.width,ut.height,ut.depth,0,At,Nt,ut.data);else if(b.isData3DTexture)Vt?(re&&e.texStorage3D(s.TEXTURE_3D,Mt,zt,ut.width,ut.height,ut.depth),B&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,ut.width,ut.height,ut.depth,At,Nt,ut.data)):e.texImage3D(s.TEXTURE_3D,0,zt,ut.width,ut.height,ut.depth,0,At,Nt,ut.data);else if(b.isFramebufferTexture){if(re)if(Vt)e.texStorage2D(s.TEXTURE_2D,Mt,zt,ut.width,ut.height);else{let tt=ut.width,ot=ut.height;for(let Et=0;Et<Mt;Et++)e.texImage2D(s.TEXTURE_2D,Et,zt,tt,ot,0,At,Nt,null),tt>>=1,ot>>=1}}else if($t.length>0){if(Vt&&re){const tt=gt($t[0]);e.texStorage2D(s.TEXTURE_2D,Mt,zt,tt.width,tt.height)}for(let tt=0,ot=$t.length;tt<ot;tt++)Ct=$t[tt],Vt?B&&e.texSubImage2D(s.TEXTURE_2D,tt,0,0,At,Nt,Ct):e.texImage2D(s.TEXTURE_2D,tt,zt,At,Nt,Ct);b.generateMipmaps=!1}else if(Vt){if(re){const tt=gt(ut);e.texStorage2D(s.TEXTURE_2D,Mt,zt,tt.width,tt.height)}B&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,At,Nt,ut)}else e.texImage2D(s.TEXTURE_2D,0,zt,At,Nt,ut);m(b)&&d(nt),Rt.__version=et.version,b.onUpdate&&b.onUpdate(b)}P.__version=b.version}function X(P,b,V){if(b.image.length!==6)return;const nt=Y(P,b),it=b.source;e.bindTexture(s.TEXTURE_CUBE_MAP,P.__webglTexture,s.TEXTURE0+V);const et=n.get(it);if(it.version!==et.__version||nt===!0){e.activeTexture(s.TEXTURE0+V);const Rt=jt.getPrimaries(jt.workingColorSpace),_t=b.colorSpace===Gn?null:jt.getPrimaries(b.colorSpace),Tt=b.colorSpace===Gn||Rt===_t?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,b.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,b.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Tt);const Zt=b.isCompressedTexture||b.image[0].isCompressedTexture,ut=b.image[0]&&b.image[0].isDataTexture,At=[];for(let ot=0;ot<6;ot++)!Zt&&!ut?At[ot]=v(b.image[ot],!0,i.maxCubemapSize):At[ot]=ut?b.image[ot].image:b.image[ot],At[ot]=Ut(b,At[ot]);const Nt=At[0],zt=o.convert(b.format,b.colorSpace),Ct=o.convert(b.type),$t=y(b.internalFormat,zt,Ct,b.colorSpace),Vt=b.isVideoTexture!==!0,re=et.__version===void 0||nt===!0,B=it.dataReady;let Mt=D(b,Nt);xt(s.TEXTURE_CUBE_MAP,b);let tt;if(Zt){Vt&&re&&e.texStorage2D(s.TEXTURE_CUBE_MAP,Mt,$t,Nt.width,Nt.height);for(let ot=0;ot<6;ot++){tt=At[ot].mipmaps;for(let Et=0;Et<tt.length;Et++){const St=tt[Et];b.format!==We?zt!==null?Vt?B&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Et,0,0,St.width,St.height,zt,St.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Et,$t,St.width,St.height,0,St.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Vt?B&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Et,0,0,St.width,St.height,zt,Ct,St.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Et,$t,St.width,St.height,0,zt,Ct,St.data)}}}else{if(tt=b.mipmaps,Vt&&re){tt.length>0&&Mt++;const ot=gt(At[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,Mt,$t,ot.width,ot.height)}for(let ot=0;ot<6;ot++)if(ut){Vt?B&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,0,0,At[ot].width,At[ot].height,zt,Ct,At[ot].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,$t,At[ot].width,At[ot].height,0,zt,Ct,At[ot].data);for(let Et=0;Et<tt.length;Et++){const kt=tt[Et].image[ot].image;Vt?B&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Et+1,0,0,kt.width,kt.height,zt,Ct,kt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Et+1,$t,kt.width,kt.height,0,zt,Ct,kt.data)}}else{Vt?B&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,0,0,zt,Ct,At[ot]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,$t,zt,Ct,At[ot]);for(let Et=0;Et<tt.length;Et++){const St=tt[Et];Vt?B&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Et+1,0,0,zt,Ct,St.image[ot]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Et+1,$t,zt,Ct,St.image[ot])}}}m(b)&&d(s.TEXTURE_CUBE_MAP),et.__version=it.version,b.onUpdate&&b.onUpdate(b)}P.__version=b.version}function $(P,b,V,nt,it,et){const Rt=o.convert(V.format,V.colorSpace),_t=o.convert(V.type),Tt=y(V.internalFormat,Rt,_t,V.colorSpace),Zt=n.get(b),ut=n.get(V);if(ut.__renderTarget=b,!Zt.__hasExternalTextures){const At=Math.max(1,b.width>>et),Nt=Math.max(1,b.height>>et);it===s.TEXTURE_3D||it===s.TEXTURE_2D_ARRAY?e.texImage3D(it,et,Tt,At,Nt,b.depth,0,Rt,_t,null):e.texImage2D(it,et,Tt,At,Nt,0,Rt,_t,null)}e.bindFramebuffer(s.FRAMEBUFFER,P),yt(b)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,nt,it,ut.__webglTexture,0,pt(b)):(it===s.TEXTURE_2D||it>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&it<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,nt,it,ut.__webglTexture,et),e.bindFramebuffer(s.FRAMEBUFFER,null)}function N(P,b,V){if(s.bindRenderbuffer(s.RENDERBUFFER,P),b.depthBuffer){const nt=b.depthTexture,it=nt&&nt.isDepthTexture?nt.type:null,et=M(b.stencilBuffer,it),Rt=b.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,_t=pt(b);yt(b)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,_t,et,b.width,b.height):V?s.renderbufferStorageMultisample(s.RENDERBUFFER,_t,et,b.width,b.height):s.renderbufferStorage(s.RENDERBUFFER,et,b.width,b.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Rt,s.RENDERBUFFER,P)}else{const nt=b.textures;for(let it=0;it<nt.length;it++){const et=nt[it],Rt=o.convert(et.format,et.colorSpace),_t=o.convert(et.type),Tt=y(et.internalFormat,Rt,_t,et.colorSpace),Zt=pt(b);V&&yt(b)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Zt,Tt,b.width,b.height):yt(b)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Zt,Tt,b.width,b.height):s.renderbufferStorage(s.RENDERBUFFER,Tt,b.width,b.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function st(P,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,P),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const nt=n.get(b.depthTexture);nt.__renderTarget=b,(!nt.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),z(b.depthTexture,0);const it=nt.__webglTexture,et=pt(b);if(b.depthTexture.format===Oi)yt(b)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,it,0,et):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,it,0);else if(b.depthTexture.format===$i)yt(b)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,it,0,et):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,it,0);else throw new Error("Unknown depthTexture format")}function rt(P){const b=n.get(P),V=P.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==P.depthTexture){const nt=P.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),nt){const it=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,nt.removeEventListener("dispose",it)};nt.addEventListener("dispose",it),b.__depthDisposeCallback=it}b.__boundDepthTexture=nt}if(P.depthTexture&&!b.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");st(b.__webglFramebuffer,P)}else if(V){b.__webglDepthbuffer=[];for(let nt=0;nt<6;nt++)if(e.bindFramebuffer(s.FRAMEBUFFER,b.__webglFramebuffer[nt]),b.__webglDepthbuffer[nt]===void 0)b.__webglDepthbuffer[nt]=s.createRenderbuffer(),N(b.__webglDepthbuffer[nt],P,!1);else{const it=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,et=b.__webglDepthbuffer[nt];s.bindRenderbuffer(s.RENDERBUFFER,et),s.framebufferRenderbuffer(s.FRAMEBUFFER,it,s.RENDERBUFFER,et)}}else if(e.bindFramebuffer(s.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=s.createRenderbuffer(),N(b.__webglDepthbuffer,P,!1);else{const nt=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,it=b.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,it),s.framebufferRenderbuffer(s.FRAMEBUFFER,nt,s.RENDERBUFFER,it)}e.bindFramebuffer(s.FRAMEBUFFER,null)}function ft(P,b,V){const nt=n.get(P);b!==void 0&&$(nt.__webglFramebuffer,P,P.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),V!==void 0&&rt(P)}function ht(P){const b=P.texture,V=n.get(P),nt=n.get(b);P.addEventListener("dispose",E);const it=P.textures,et=P.isWebGLCubeRenderTarget===!0,Rt=it.length>1;if(Rt||(nt.__webglTexture===void 0&&(nt.__webglTexture=s.createTexture()),nt.__version=b.version,r.memory.textures++),et){V.__webglFramebuffer=[];for(let _t=0;_t<6;_t++)if(b.mipmaps&&b.mipmaps.length>0){V.__webglFramebuffer[_t]=[];for(let Tt=0;Tt<b.mipmaps.length;Tt++)V.__webglFramebuffer[_t][Tt]=s.createFramebuffer()}else V.__webglFramebuffer[_t]=s.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){V.__webglFramebuffer=[];for(let _t=0;_t<b.mipmaps.length;_t++)V.__webglFramebuffer[_t]=s.createFramebuffer()}else V.__webglFramebuffer=s.createFramebuffer();if(Rt)for(let _t=0,Tt=it.length;_t<Tt;_t++){const Zt=n.get(it[_t]);Zt.__webglTexture===void 0&&(Zt.__webglTexture=s.createTexture(),r.memory.textures++)}if(P.samples>0&&yt(P)===!1){V.__webglMultisampledFramebuffer=s.createFramebuffer(),V.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let _t=0;_t<it.length;_t++){const Tt=it[_t];V.__webglColorRenderbuffer[_t]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,V.__webglColorRenderbuffer[_t]);const Zt=o.convert(Tt.format,Tt.colorSpace),ut=o.convert(Tt.type),At=y(Tt.internalFormat,Zt,ut,Tt.colorSpace,P.isXRRenderTarget===!0),Nt=pt(P);s.renderbufferStorageMultisample(s.RENDERBUFFER,Nt,At,P.width,P.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+_t,s.RENDERBUFFER,V.__webglColorRenderbuffer[_t])}s.bindRenderbuffer(s.RENDERBUFFER,null),P.depthBuffer&&(V.__webglDepthRenderbuffer=s.createRenderbuffer(),N(V.__webglDepthRenderbuffer,P,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(et){e.bindTexture(s.TEXTURE_CUBE_MAP,nt.__webglTexture),xt(s.TEXTURE_CUBE_MAP,b);for(let _t=0;_t<6;_t++)if(b.mipmaps&&b.mipmaps.length>0)for(let Tt=0;Tt<b.mipmaps.length;Tt++)$(V.__webglFramebuffer[_t][Tt],P,b,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Tt);else $(V.__webglFramebuffer[_t],P,b,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0);m(b)&&d(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Rt){for(let _t=0,Tt=it.length;_t<Tt;_t++){const Zt=it[_t],ut=n.get(Zt);e.bindTexture(s.TEXTURE_2D,ut.__webglTexture),xt(s.TEXTURE_2D,Zt),$(V.__webglFramebuffer,P,Zt,s.COLOR_ATTACHMENT0+_t,s.TEXTURE_2D,0),m(Zt)&&d(s.TEXTURE_2D)}e.unbindTexture()}else{let _t=s.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(_t=P.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(_t,nt.__webglTexture),xt(_t,b),b.mipmaps&&b.mipmaps.length>0)for(let Tt=0;Tt<b.mipmaps.length;Tt++)$(V.__webglFramebuffer[Tt],P,b,s.COLOR_ATTACHMENT0,_t,Tt);else $(V.__webglFramebuffer,P,b,s.COLOR_ATTACHMENT0,_t,0);m(b)&&d(_t),e.unbindTexture()}P.depthBuffer&&rt(P)}function at(P){const b=P.textures;for(let V=0,nt=b.length;V<nt;V++){const it=b[V];if(m(it)){const et=x(P),Rt=n.get(it).__webglTexture;e.bindTexture(et,Rt),d(et),e.unbindTexture()}}}const lt=[],F=[];function wt(P){if(P.samples>0){if(yt(P)===!1){const b=P.textures,V=P.width,nt=P.height;let it=s.COLOR_BUFFER_BIT;const et=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Rt=n.get(P),_t=b.length>1;if(_t)for(let Tt=0;Tt<b.length;Tt++)e.bindFramebuffer(s.FRAMEBUFFER,Rt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Tt,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,Rt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Tt,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,Rt.__webglMultisampledFramebuffer),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Rt.__webglFramebuffer);for(let Tt=0;Tt<b.length;Tt++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(it|=s.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(it|=s.STENCIL_BUFFER_BIT)),_t){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Rt.__webglColorRenderbuffer[Tt]);const Zt=n.get(b[Tt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Zt,0)}s.blitFramebuffer(0,0,V,nt,0,0,V,nt,it,s.NEAREST),l===!0&&(lt.length=0,F.length=0,lt.push(s.COLOR_ATTACHMENT0+Tt),P.depthBuffer&&P.resolveDepthBuffer===!1&&(lt.push(et),F.push(et),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,F)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,lt))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),_t)for(let Tt=0;Tt<b.length;Tt++){e.bindFramebuffer(s.FRAMEBUFFER,Rt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Tt,s.RENDERBUFFER,Rt.__webglColorRenderbuffer[Tt]);const Zt=n.get(b[Tt]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,Rt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Tt,s.TEXTURE_2D,Zt,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Rt.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&l){const b=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[b])}}}function pt(P){return Math.min(i.maxSamples,P.samples)}function yt(P){const b=n.get(P);return P.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function mt(P){const b=r.render.frame;h.get(P)!==b&&(h.set(P,b),P.update())}function Ut(P,b){const V=P.colorSpace,nt=P.format,it=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||V!==mi&&V!==Gn&&(jt.getTransfer(V)===ie?(nt!==We||it!==ze)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",V)),b}function gt(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=A,this.resetTextureUnits=R,this.setTexture2D=z,this.setTexture2DArray=W,this.setTexture3D=Q,this.setTextureCube=k,this.rebindTextures=ft,this.setupRenderTarget=ht,this.updateRenderTargetMipmap=at,this.updateMultisampleRenderTarget=wt,this.setupDepthRenderbuffer=rt,this.setupFrameBufferTexture=$,this.useMultisampledRTT=yt}function Jm(s,t){function e(n,i=Gn){let o;const r=jt.getTransfer(i);if(n===ze)return s.UNSIGNED_BYTE;if(n===da)return s.UNSIGNED_SHORT_4_4_4_4;if(n===fa)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Tc)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Ec)return s.BYTE;if(n===wc)return s.SHORT;if(n===gs)return s.UNSIGNED_SHORT;if(n===ua)return s.INT;if(n===pi)return s.UNSIGNED_INT;if(n===pn)return s.FLOAT;if(n===Wn)return s.HALF_FLOAT;if(n===Ac)return s.ALPHA;if(n===Cc)return s.RGB;if(n===We)return s.RGBA;if(n===Rc)return s.LUMINANCE;if(n===Pc)return s.LUMINANCE_ALPHA;if(n===Oi)return s.DEPTH_COMPONENT;if(n===$i)return s.DEPTH_STENCIL;if(n===pa)return s.RED;if(n===ma)return s.RED_INTEGER;if(n===Dc)return s.RG;if(n===ga)return s.RG_INTEGER;if(n===va)return s.RGBA_INTEGER;if(n===so||n===oo||n===ro||n===ao)if(r===ie)if(o=t.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(n===so)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===oo)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ro)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ao)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=t.get("WEBGL_compressed_texture_s3tc"),o!==null){if(n===so)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===oo)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ro)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ao)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Pr||n===Dr||n===Lr||n===Ir)if(o=t.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(n===Pr)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Dr)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Lr)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ir)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Fr||n===Ur||n===Nr)if(o=t.get("WEBGL_compressed_texture_etc"),o!==null){if(n===Fr||n===Ur)return r===ie?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(n===Nr)return r===ie?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===zr||n===Br||n===Or||n===kr||n===Hr||n===Gr||n===Vr||n===Wr||n===Xr||n===$r||n===qr||n===Yr||n===Zr||n===jr)if(o=t.get("WEBGL_compressed_texture_astc"),o!==null){if(n===zr)return r===ie?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Br)return r===ie?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Or)return r===ie?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===kr)return r===ie?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Hr)return r===ie?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Gr)return r===ie?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Vr)return r===ie?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Wr)return r===ie?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Xr)return r===ie?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===$r)return r===ie?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===qr)return r===ie?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Yr)return r===ie?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Zr)return r===ie?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===jr)return r===ie?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===lo||n===Kr||n===Jr)if(o=t.get("EXT_texture_compression_bptc"),o!==null){if(n===lo)return r===ie?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Kr)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Jr)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Lc||n===Qr||n===ta||n===ea)if(o=t.get("EXT_texture_compression_rgtc"),o!==null){if(n===lo)return o.COMPRESSED_RED_RGTC1_EXT;if(n===Qr)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ta)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ea)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Xi?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}class Qm extends je{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class ye extends qt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const t0={type:"move"};class nr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ye,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ye,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ye,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,o=null,r=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){r=!0;for(const v of t.hand.values()){const m=e.getJointPose(v,n),d=this._getHandJoint(c,v);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),p=.02,g=.005;c.inputState.pinching&&f>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(o=e.getPose(t.gripSpace,n),o!==null&&(l.matrix.fromArray(o.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,o.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(o.linearVelocity)):l.hasLinearVelocity=!1,o.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(o.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&o!==null&&(i=o),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(t0)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=o!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new ye;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const e0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,n0=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class i0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const i=new Re,o=t.properties.get(i);o.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Be({vertexShader:e0,fragmentShader:n0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Kt(new en(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class s0 extends Zi{constructor(t,e){super();const n=this;let i=null,o=1,r=null,a="local-floor",l=1,c=null,h=null,u=null,f=null,p=null,g=null;const v=new i0,m=e.getContextAttributes();let d=null,x=null;const y=[],M=[],D=new Xt;let C=null;const E=new je;E.viewport=new de;const L=new je;L.viewport=new de;const S=[E,L],_=new Qm;let w=null,R=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(U){let X=y[U];return X===void 0&&(X=new nr,y[U]=X),X.getTargetRaySpace()},this.getControllerGrip=function(U){let X=y[U];return X===void 0&&(X=new nr,y[U]=X),X.getGripSpace()},this.getHand=function(U){let X=y[U];return X===void 0&&(X=new nr,y[U]=X),X.getHandSpace()};function A(U){const X=M.indexOf(U.inputSource);if(X===-1)return;const $=y[X];$!==void 0&&($.update(U.inputSource,U.frame,c||r),$.dispatchEvent({type:U.type,data:U.inputSource}))}function I(){i.removeEventListener("select",A),i.removeEventListener("selectstart",A),i.removeEventListener("selectend",A),i.removeEventListener("squeeze",A),i.removeEventListener("squeezestart",A),i.removeEventListener("squeezeend",A),i.removeEventListener("end",I),i.removeEventListener("inputsourceschange",z);for(let U=0;U<y.length;U++){const X=M[U];X!==null&&(M[U]=null,y[U].disconnect(X))}w=null,R=null,v.reset(),t.setRenderTarget(d),p=null,f=null,u=null,i=null,x=null,Y.stop(),n.isPresenting=!1,t.setPixelRatio(C),t.setSize(D.width,D.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(U){o=U,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(U){a=U,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(U){c=U},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(U){if(i=U,i!==null){if(d=t.getRenderTarget(),i.addEventListener("select",A),i.addEventListener("selectstart",A),i.addEventListener("selectend",A),i.addEventListener("squeeze",A),i.addEventListener("squeezestart",A),i.addEventListener("squeezeend",A),i.addEventListener("end",I),i.addEventListener("inputsourceschange",z),m.xrCompatible!==!0&&await e.makeXRCompatible(),C=t.getPixelRatio(),t.getSize(D),i.renderState.layers===void 0){const X={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:o};p=new XRWebGLLayer(i,e,X),i.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),x=new Ve(p.framebufferWidth,p.framebufferHeight,{format:We,type:ze,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let X=null,$=null,N=null;m.depth&&(N=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,X=m.stencil?$i:Oi,$=m.stencil?Xi:pi);const st={colorFormat:e.RGBA8,depthFormat:N,scaleFactor:o};u=new XRWebGLBinding(i,e),f=u.createProjectionLayer(st),i.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),x=new Ve(f.textureWidth,f.textureHeight,{format:We,type:ze,depthTexture:new Xc(f.textureWidth,f.textureHeight,$,void 0,void 0,void 0,void 0,void 0,void 0,X),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,r=await i.requestReferenceSpace(a),Y.setContext(i),Y.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function z(U){for(let X=0;X<U.removed.length;X++){const $=U.removed[X],N=M.indexOf($);N>=0&&(M[N]=null,y[N].disconnect($))}for(let X=0;X<U.added.length;X++){const $=U.added[X];let N=M.indexOf($);if(N===-1){for(let rt=0;rt<y.length;rt++)if(rt>=M.length){M.push($),N=rt;break}else if(M[rt]===null){M[rt]=$,N=rt;break}if(N===-1)break}const st=y[N];st&&st.connect($)}}const W=new O,Q=new O;function k(U,X,$){W.setFromMatrixPosition(X.matrixWorld),Q.setFromMatrixPosition($.matrixWorld);const N=W.distanceTo(Q),st=X.projectionMatrix.elements,rt=$.projectionMatrix.elements,ft=st[14]/(st[10]-1),ht=st[14]/(st[10]+1),at=(st[9]+1)/st[5],lt=(st[9]-1)/st[5],F=(st[8]-1)/st[0],wt=(rt[8]+1)/rt[0],pt=ft*F,yt=ft*wt,mt=N/(-F+wt),Ut=mt*-F;if(X.matrixWorld.decompose(U.position,U.quaternion,U.scale),U.translateX(Ut),U.translateZ(mt),U.matrixWorld.compose(U.position,U.quaternion,U.scale),U.matrixWorldInverse.copy(U.matrixWorld).invert(),st[10]===-1)U.projectionMatrix.copy(X.projectionMatrix),U.projectionMatrixInverse.copy(X.projectionMatrixInverse);else{const gt=ft+mt,P=ht+mt,b=pt-Ut,V=yt+(N-Ut),nt=at*ht/P*gt,it=lt*ht/P*gt;U.projectionMatrix.makePerspective(b,V,nt,it,gt,P),U.projectionMatrixInverse.copy(U.projectionMatrix).invert()}}function K(U,X){X===null?U.matrixWorld.copy(U.matrix):U.matrixWorld.multiplyMatrices(X.matrixWorld,U.matrix),U.matrixWorldInverse.copy(U.matrixWorld).invert()}this.updateCamera=function(U){if(i===null)return;let X=U.near,$=U.far;v.texture!==null&&(v.depthNear>0&&(X=v.depthNear),v.depthFar>0&&($=v.depthFar)),_.near=L.near=E.near=X,_.far=L.far=E.far=$,(w!==_.near||R!==_.far)&&(i.updateRenderState({depthNear:_.near,depthFar:_.far}),w=_.near,R=_.far),E.layers.mask=U.layers.mask|2,L.layers.mask=U.layers.mask|4,_.layers.mask=E.layers.mask|L.layers.mask;const N=U.parent,st=_.cameras;K(_,N);for(let rt=0;rt<st.length;rt++)K(st[rt],N);st.length===2?k(_,E,L):_.projectionMatrix.copy(E.projectionMatrix),q(U,_,N)};function q(U,X,$){$===null?U.matrix.copy(X.matrixWorld):(U.matrix.copy($.matrixWorld),U.matrix.invert(),U.matrix.multiply(X.matrixWorld)),U.matrix.decompose(U.position,U.quaternion,U.scale),U.updateMatrixWorld(!0),U.projectionMatrix.copy(X.projectionMatrix),U.projectionMatrixInverse.copy(X.projectionMatrixInverse),U.isPerspectiveCamera&&(U.fov=na*2*Math.atan(1/U.projectionMatrix.elements[5]),U.zoom=1)}this.getCamera=function(){return _},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(U){l=U,f!==null&&(f.fixedFoveation=U),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=U)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(_)};let ct=null;function xt(U,X){if(h=X.getViewerPose(c||r),g=X,h!==null){const $=h.views;p!==null&&(t.setRenderTargetFramebuffer(x,p.framebuffer),t.setRenderTarget(x));let N=!1;$.length!==_.cameras.length&&(_.cameras.length=0,N=!0);for(let rt=0;rt<$.length;rt++){const ft=$[rt];let ht=null;if(p!==null)ht=p.getViewport(ft);else{const lt=u.getViewSubImage(f,ft);ht=lt.viewport,rt===0&&(t.setRenderTargetTextures(x,lt.colorTexture,f.ignoreDepthValues?void 0:lt.depthStencilTexture),t.setRenderTarget(x))}let at=S[rt];at===void 0&&(at=new je,at.layers.enable(rt),at.viewport=new de,S[rt]=at),at.matrix.fromArray(ft.transform.matrix),at.matrix.decompose(at.position,at.quaternion,at.scale),at.projectionMatrix.fromArray(ft.projectionMatrix),at.projectionMatrixInverse.copy(at.projectionMatrix).invert(),at.viewport.set(ht.x,ht.y,ht.width,ht.height),rt===0&&(_.matrix.copy(at.matrix),_.matrix.decompose(_.position,_.quaternion,_.scale)),N===!0&&_.cameras.push(at)}const st=i.enabledFeatures;if(st&&st.includes("depth-sensing")){const rt=u.getDepthInformation($[0]);rt&&rt.isValid&&rt.texture&&v.init(t,rt,i.renderState)}}for(let $=0;$<y.length;$++){const N=M[$],st=y[$];N!==null&&st!==void 0&&st.update(N,X,c||r)}ct&&ct(U,X),X.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:X}),g=null}const Y=new Wc;Y.setAnimationLoop(xt),this.setAnimationLoop=function(U){ct=U},this.dispose=function(){}}}const Jn=new mn,o0=new oe;function r0(s,t){function e(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function n(m,d){d.color.getRGB(m.fogColor.value,Hc(s)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function i(m,d,x,y,M){d.isMeshBasicMaterial||d.isMeshLambertMaterial?o(m,d):d.isMeshToonMaterial?(o(m,d),u(m,d)):d.isMeshPhongMaterial?(o(m,d),h(m,d)):d.isMeshStandardMaterial?(o(m,d),f(m,d),d.isMeshPhysicalMaterial&&p(m,d,M)):d.isMeshMatcapMaterial?(o(m,d),g(m,d)):d.isMeshDepthMaterial?o(m,d):d.isMeshDistanceMaterial?(o(m,d),v(m,d)):d.isMeshNormalMaterial?o(m,d):d.isLineBasicMaterial?(r(m,d),d.isLineDashedMaterial&&a(m,d)):d.isPointsMaterial?l(m,d,x,y):d.isSpriteMaterial?c(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function o(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,e(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===Ce&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,e(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===Ce&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,e(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,e(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const x=t.get(d),y=x.envMap,M=x.envMapRotation;y&&(m.envMap.value=y,Jn.copy(M),Jn.x*=-1,Jn.y*=-1,Jn.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Jn.y*=-1,Jn.z*=-1),m.envMapRotation.value.setFromMatrix4(o0.makeRotationFromEuler(Jn)),m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,e(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,m.aoMapTransform))}function r(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform))}function a(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function l(m,d,x,y){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*x,m.scale.value=y*.5,d.map&&(m.map.value=d.map,e(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function c(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function h(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function u(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function f(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,x){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Ce&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=x.texture,m.transmissionSamplerSize.value.set(x.width,x.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,e(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,d){d.matcap&&(m.matcap.value=d.matcap)}function v(m,d){const x=t.get(d).light;m.referencePosition.value.setFromMatrixPosition(x.matrixWorld),m.nearDistance.value=x.shadow.camera.near,m.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function a0(s,t,e,n){let i={},o={},r=[];const a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,y){const M=y.program;n.uniformBlockBinding(x,M)}function c(x,y){let M=i[x.id];M===void 0&&(g(x),M=h(x),i[x.id]=M,x.addEventListener("dispose",m));const D=y.program;n.updateUBOMapping(x,D);const C=t.render.frame;o[x.id]!==C&&(f(x),o[x.id]=C)}function h(x){const y=u();x.__bindingPointIndex=y;const M=s.createBuffer(),D=x.__size,C=x.usage;return s.bindBuffer(s.UNIFORM_BUFFER,M),s.bufferData(s.UNIFORM_BUFFER,D,C),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,y,M),M}function u(){for(let x=0;x<a;x++)if(r.indexOf(x)===-1)return r.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(x){const y=i[x.id],M=x.uniforms,D=x.__cache;s.bindBuffer(s.UNIFORM_BUFFER,y);for(let C=0,E=M.length;C<E;C++){const L=Array.isArray(M[C])?M[C]:[M[C]];for(let S=0,_=L.length;S<_;S++){const w=L[S];if(p(w,C,S,D)===!0){const R=w.__offset,A=Array.isArray(w.value)?w.value:[w.value];let I=0;for(let z=0;z<A.length;z++){const W=A[z],Q=v(W);typeof W=="number"||typeof W=="boolean"?(w.__data[0]=W,s.bufferSubData(s.UNIFORM_BUFFER,R+I,w.__data)):W.isMatrix3?(w.__data[0]=W.elements[0],w.__data[1]=W.elements[1],w.__data[2]=W.elements[2],w.__data[3]=0,w.__data[4]=W.elements[3],w.__data[5]=W.elements[4],w.__data[6]=W.elements[5],w.__data[7]=0,w.__data[8]=W.elements[6],w.__data[9]=W.elements[7],w.__data[10]=W.elements[8],w.__data[11]=0):(W.toArray(w.__data,I),I+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,R,w.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function p(x,y,M,D){const C=x.value,E=y+"_"+M;if(D[E]===void 0)return typeof C=="number"||typeof C=="boolean"?D[E]=C:D[E]=C.clone(),!0;{const L=D[E];if(typeof C=="number"||typeof C=="boolean"){if(L!==C)return D[E]=C,!0}else if(L.equals(C)===!1)return L.copy(C),!0}return!1}function g(x){const y=x.uniforms;let M=0;const D=16;for(let E=0,L=y.length;E<L;E++){const S=Array.isArray(y[E])?y[E]:[y[E]];for(let _=0,w=S.length;_<w;_++){const R=S[_],A=Array.isArray(R.value)?R.value:[R.value];for(let I=0,z=A.length;I<z;I++){const W=A[I],Q=v(W),k=M%D,K=k%Q.boundary,q=k+K;M+=K,q!==0&&D-q<Q.storage&&(M+=D-q),R.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),R.__offset=M,M+=Q.storage}}}const C=M%D;return C>0&&(M+=D-C),x.__size=M,x.__cache={},this}function v(x){const y={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(y.boundary=4,y.storage=4):x.isVector2?(y.boundary=8,y.storage=8):x.isVector3||x.isColor?(y.boundary=16,y.storage=12):x.isVector4?(y.boundary=16,y.storage=16):x.isMatrix3?(y.boundary=48,y.storage=48):x.isMatrix4?(y.boundary=64,y.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),y}function m(x){const y=x.target;y.removeEventListener("dispose",m);const M=r.indexOf(y.__bindingPointIndex);r.splice(M,1),s.deleteBuffer(i[y.id]),delete i[y.id],delete o[y.id]}function d(){for(const x in i)s.deleteBuffer(i[x]);r=[],i={},o={}}return{bind:l,update:c,dispose:d}}class l0{constructor(t={}){const{canvas:e=Zh(),context:n=null,depth:i=!0,stencil:o=!1,alpha:r=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=r;const g=new Uint32Array(4),v=new Int32Array(4);let m=null,d=null;const x=[],y=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=De,this.toneMapping=Rn,this.toneMappingExposure=1;const M=this;let D=!1,C=0,E=0,L=null,S=-1,_=null;const w=new de,R=new de;let A=null;const I=new J(0);let z=0,W=e.width,Q=e.height,k=1,K=null,q=null;const ct=new de(0,0,W,Q),xt=new de(0,0,W,Q);let Y=!1;const U=new Ma;let X=!1,$=!1;const N=new oe,st=new oe,rt=new O,ft=new de,ht={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let at=!1;function lt(){return L===null?k:1}let F=n;function wt(T,H){return e.getContext(T,H)}try{const T={alpha:!0,depth:i,stencil:o,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${ha}`),e.addEventListener("webglcontextlost",ot,!1),e.addEventListener("webglcontextrestored",Et,!1),e.addEventListener("webglcontextcreationerror",St,!1),F===null){const H="webgl2";if(F=wt(H,T),F===null)throw wt(H)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let pt,yt,mt,Ut,gt,P,b,V,nt,it,et,Rt,_t,Tt,Zt,ut,At,Nt,zt,Ct,$t,Vt,re,B;function Mt(){pt=new fp(F),pt.init(),Vt=new Jm(F,pt),yt=new ap(F,pt,t,Vt),mt=new Zm(F,pt),yt.reverseDepthBuffer&&f&&mt.buffers.depth.setReversed(!0),Ut=new gp(F),gt=new Fm,P=new Km(F,pt,mt,gt,yt,Vt,Ut),b=new cp(M),V=new dp(M),nt=new Su(F),re=new op(F,nt),it=new pp(F,nt,Ut,re),et=new xp(F,it,nt,Ut),zt=new vp(F,yt,P),ut=new lp(gt),Rt=new Im(M,b,V,pt,yt,re,ut),_t=new r0(M,gt),Tt=new Nm,Zt=new Gm(pt),Nt=new sp(M,b,V,mt,et,p,l),At=new qm(M,et,yt),B=new a0(F,Ut,yt,mt),Ct=new rp(F,pt,Ut),$t=new mp(F,pt,Ut),Ut.programs=Rt.programs,M.capabilities=yt,M.extensions=pt,M.properties=gt,M.renderLists=Tt,M.shadowMap=At,M.state=mt,M.info=Ut}Mt();const tt=new s0(M,F);this.xr=tt,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const T=pt.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=pt.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return k},this.setPixelRatio=function(T){T!==void 0&&(k=T,this.setSize(W,Q,!1))},this.getSize=function(T){return T.set(W,Q)},this.setSize=function(T,H,Z=!0){if(tt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=T,Q=H,e.width=Math.floor(T*k),e.height=Math.floor(H*k),Z===!0&&(e.style.width=T+"px",e.style.height=H+"px"),this.setViewport(0,0,T,H)},this.getDrawingBufferSize=function(T){return T.set(W*k,Q*k).floor()},this.setDrawingBufferSize=function(T,H,Z){W=T,Q=H,k=Z,e.width=Math.floor(T*Z),e.height=Math.floor(H*Z),this.setViewport(0,0,T,H)},this.getCurrentViewport=function(T){return T.copy(w)},this.getViewport=function(T){return T.copy(ct)},this.setViewport=function(T,H,Z,j){T.isVector4?ct.set(T.x,T.y,T.z,T.w):ct.set(T,H,Z,j),mt.viewport(w.copy(ct).multiplyScalar(k).round())},this.getScissor=function(T){return T.copy(xt)},this.setScissor=function(T,H,Z,j){T.isVector4?xt.set(T.x,T.y,T.z,T.w):xt.set(T,H,Z,j),mt.scissor(R.copy(xt).multiplyScalar(k).round())},this.getScissorTest=function(){return Y},this.setScissorTest=function(T){mt.setScissorTest(Y=T)},this.setOpaqueSort=function(T){K=T},this.setTransparentSort=function(T){q=T},this.getClearColor=function(T){return T.copy(Nt.getClearColor())},this.setClearColor=function(){Nt.setClearColor.apply(Nt,arguments)},this.getClearAlpha=function(){return Nt.getClearAlpha()},this.setClearAlpha=function(){Nt.setClearAlpha.apply(Nt,arguments)},this.clear=function(T=!0,H=!0,Z=!0){let j=0;if(T){let G=!1;if(L!==null){const dt=L.texture.format;G=dt===va||dt===ga||dt===ma}if(G){const dt=L.texture.type,bt=dt===ze||dt===pi||dt===gs||dt===Xi||dt===da||dt===fa,Pt=Nt.getClearColor(),Dt=Nt.getClearAlpha(),Bt=Pt.r,Ht=Pt.g,Lt=Pt.b;bt?(g[0]=Bt,g[1]=Ht,g[2]=Lt,g[3]=Dt,F.clearBufferuiv(F.COLOR,0,g)):(v[0]=Bt,v[1]=Ht,v[2]=Lt,v[3]=Dt,F.clearBufferiv(F.COLOR,0,v))}else j|=F.COLOR_BUFFER_BIT}H&&(j|=F.DEPTH_BUFFER_BIT),Z&&(j|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(j)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",ot,!1),e.removeEventListener("webglcontextrestored",Et,!1),e.removeEventListener("webglcontextcreationerror",St,!1),Tt.dispose(),Zt.dispose(),gt.dispose(),b.dispose(),V.dispose(),et.dispose(),re.dispose(),B.dispose(),Rt.dispose(),tt.dispose(),tt.removeEventListener("sessionstart",Ra),tt.removeEventListener("sessionend",Pa),$n.stop()};function ot(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),D=!0}function Et(){console.log("THREE.WebGLRenderer: Context Restored."),D=!1;const T=Ut.autoReset,H=At.enabled,Z=At.autoUpdate,j=At.needsUpdate,G=At.type;Mt(),Ut.autoReset=T,At.enabled=H,At.autoUpdate=Z,At.needsUpdate=j,At.type=G}function St(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function kt(T){const H=T.target;H.removeEventListener("dispose",kt),ue(H)}function ue(T){be(T),gt.remove(T)}function be(T){const H=gt.get(T).programs;H!==void 0&&(H.forEach(function(Z){Rt.releaseProgram(Z)}),T.isShaderMaterial&&Rt.releaseShaderCache(T))}this.renderBufferDirect=function(T,H,Z,j,G,dt){H===null&&(H=ht);const bt=G.isMesh&&G.matrixWorld.determinant()<0,Pt=rh(T,H,Z,j,G);mt.setMaterial(j,bt);let Dt=Z.index,Bt=1;if(j.wireframe===!0){if(Dt=it.getWireframeAttribute(Z),Dt===void 0)return;Bt=2}const Ht=Z.drawRange,Lt=Z.attributes.position;let Jt=Ht.start*Bt,ae=(Ht.start+Ht.count)*Bt;dt!==null&&(Jt=Math.max(Jt,dt.start*Bt),ae=Math.min(ae,(dt.start+dt.count)*Bt)),Dt!==null?(Jt=Math.max(Jt,0),ae=Math.min(ae,Dt.count)):Lt!=null&&(Jt=Math.max(Jt,0),ae=Math.min(ae,Lt.count));const le=ae-Jt;if(le<0||le===1/0)return;re.setup(G,j,Pt,Z,Dt);let Le,Qt=Ct;if(Dt!==null&&(Le=nt.get(Dt),Qt=$t,Qt.setIndex(Le)),G.isMesh)j.wireframe===!0?(mt.setLineWidth(j.wireframeLinewidth*lt()),Qt.setMode(F.LINES)):Qt.setMode(F.TRIANGLES);else if(G.isLine){let It=j.linewidth;It===void 0&&(It=1),mt.setLineWidth(It*lt()),G.isLineSegments?Qt.setMode(F.LINES):G.isLineLoop?Qt.setMode(F.LINE_LOOP):Qt.setMode(F.LINE_STRIP)}else G.isPoints?Qt.setMode(F.POINTS):G.isSprite&&Qt.setMode(F.TRIANGLES);if(G.isBatchedMesh)if(G._multiDrawInstances!==null)Qt.renderMultiDrawInstances(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount,G._multiDrawInstances);else if(pt.get("WEBGL_multi_draw"))Qt.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{const It=G._multiDrawStarts,xn=G._multiDrawCounts,te=G._multiDrawCount,sn=Dt?nt.get(Dt).bytesPerElement:1,vi=gt.get(j).currentProgram.getUniforms();for(let ke=0;ke<te;ke++)vi.setValue(F,"_gl_DrawID",ke),Qt.render(It[ke]/sn,xn[ke])}else if(G.isInstancedMesh)Qt.renderInstances(Jt,le,G.count);else if(Z.isInstancedBufferGeometry){const It=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,xn=Math.min(Z.instanceCount,It);Qt.renderInstances(Jt,le,xn)}else Qt.render(Jt,le)};function ne(T,H,Z){T.transparent===!0&&T.side===Ke&&T.forceSinglePass===!1?(T.side=Ce,T.needsUpdate=!0,bs(T,H,Z),T.side=Xn,T.needsUpdate=!0,bs(T,H,Z),T.side=Ke):bs(T,H,Z)}this.compile=function(T,H,Z=null){Z===null&&(Z=T),d=Zt.get(Z),d.init(H),y.push(d),Z.traverseVisible(function(G){G.isLight&&G.layers.test(H.layers)&&(d.pushLight(G),G.castShadow&&d.pushShadow(G))}),T!==Z&&T.traverseVisible(function(G){G.isLight&&G.layers.test(H.layers)&&(d.pushLight(G),G.castShadow&&d.pushShadow(G))}),d.setupLights();const j=new Set;return T.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;const dt=G.material;if(dt)if(Array.isArray(dt))for(let bt=0;bt<dt.length;bt++){const Pt=dt[bt];ne(Pt,Z,G),j.add(Pt)}else ne(dt,Z,G),j.add(dt)}),y.pop(),d=null,j},this.compileAsync=function(T,H,Z=null){const j=this.compile(T,H,Z);return new Promise(G=>{function dt(){if(j.forEach(function(bt){gt.get(bt).currentProgram.isReady()&&j.delete(bt)}),j.size===0){G(T);return}setTimeout(dt,10)}pt.get("KHR_parallel_shader_compile")!==null?dt():setTimeout(dt,10)})};let nn=null;function vn(T){nn&&nn(T)}function Ra(){$n.stop()}function Pa(){$n.start()}const $n=new Wc;$n.setAnimationLoop(vn),typeof self<"u"&&$n.setContext(self),this.setAnimationLoop=function(T){nn=T,tt.setAnimationLoop(T),T===null?$n.stop():$n.start()},tt.addEventListener("sessionstart",Ra),tt.addEventListener("sessionend",Pa),this.render=function(T,H){if(H!==void 0&&H.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),tt.enabled===!0&&tt.isPresenting===!0&&(tt.cameraAutoUpdate===!0&&tt.updateCamera(H),H=tt.getCamera()),T.isScene===!0&&T.onBeforeRender(M,T,H,L),d=Zt.get(T,y.length),d.init(H),y.push(d),st.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),U.setFromProjectionMatrix(st),$=this.localClippingEnabled,X=ut.init(this.clippingPlanes,$),m=Tt.get(T,x.length),m.init(),x.push(m),tt.enabled===!0&&tt.isPresenting===!0){const dt=M.xr.getDepthSensingMesh();dt!==null&&To(dt,H,-1/0,M.sortObjects)}To(T,H,0,M.sortObjects),m.finish(),M.sortObjects===!0&&m.sort(K,q),at=tt.enabled===!1||tt.isPresenting===!1||tt.hasDepthSensing()===!1,at&&Nt.addToRenderList(m,T),this.info.render.frame++,X===!0&&ut.beginShadows();const Z=d.state.shadowsArray;At.render(Z,T,H),X===!0&&ut.endShadows(),this.info.autoReset===!0&&this.info.reset();const j=m.opaque,G=m.transmissive;if(d.setupLights(),H.isArrayCamera){const dt=H.cameras;if(G.length>0)for(let bt=0,Pt=dt.length;bt<Pt;bt++){const Dt=dt[bt];La(j,G,T,Dt)}at&&Nt.render(T);for(let bt=0,Pt=dt.length;bt<Pt;bt++){const Dt=dt[bt];Da(m,T,Dt,Dt.viewport)}}else G.length>0&&La(j,G,T,H),at&&Nt.render(T),Da(m,T,H);L!==null&&(P.updateMultisampleRenderTarget(L),P.updateRenderTargetMipmap(L)),T.isScene===!0&&T.onAfterRender(M,T,H),re.resetDefaultState(),S=-1,_=null,y.pop(),y.length>0?(d=y[y.length-1],X===!0&&ut.setGlobalState(M.clippingPlanes,d.state.camera)):d=null,x.pop(),x.length>0?m=x[x.length-1]:m=null};function To(T,H,Z,j){if(T.visible===!1)return;if(T.layers.test(H.layers)){if(T.isGroup)Z=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(H);else if(T.isLight)d.pushLight(T),T.castShadow&&d.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||U.intersectsSprite(T)){j&&ft.setFromMatrixPosition(T.matrixWorld).applyMatrix4(st);const bt=et.update(T),Pt=T.material;Pt.visible&&m.push(T,bt,Pt,Z,ft.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||U.intersectsObject(T))){const bt=et.update(T),Pt=T.material;if(j&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),ft.copy(T.boundingSphere.center)):(bt.boundingSphere===null&&bt.computeBoundingSphere(),ft.copy(bt.boundingSphere.center)),ft.applyMatrix4(T.matrixWorld).applyMatrix4(st)),Array.isArray(Pt)){const Dt=bt.groups;for(let Bt=0,Ht=Dt.length;Bt<Ht;Bt++){const Lt=Dt[Bt],Jt=Pt[Lt.materialIndex];Jt&&Jt.visible&&m.push(T,bt,Jt,Z,ft.z,Lt)}}else Pt.visible&&m.push(T,bt,Pt,Z,ft.z,null)}}const dt=T.children;for(let bt=0,Pt=dt.length;bt<Pt;bt++)To(dt[bt],H,Z,j)}function Da(T,H,Z,j){const G=T.opaque,dt=T.transmissive,bt=T.transparent;d.setupLightsView(Z),X===!0&&ut.setGlobalState(M.clippingPlanes,Z),j&&mt.viewport(w.copy(j)),G.length>0&&Ss(G,H,Z),dt.length>0&&Ss(dt,H,Z),bt.length>0&&Ss(bt,H,Z),mt.buffers.depth.setTest(!0),mt.buffers.depth.setMask(!0),mt.buffers.color.setMask(!0),mt.setPolygonOffset(!1)}function La(T,H,Z,j){if((Z.isScene===!0?Z.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[j.id]===void 0&&(d.state.transmissionRenderTarget[j.id]=new Ve(1,1,{generateMipmaps:!0,type:pt.has("EXT_color_buffer_half_float")||pt.has("EXT_color_buffer_float")?Wn:ze,minFilter:oi,samples:4,stencilBuffer:o,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:jt.workingColorSpace}));const dt=d.state.transmissionRenderTarget[j.id],bt=j.viewport||w;dt.setSize(bt.z,bt.w);const Pt=M.getRenderTarget();M.setRenderTarget(dt),M.getClearColor(I),z=M.getClearAlpha(),z<1&&M.setClearColor(16777215,.5),M.clear(),at&&Nt.render(Z);const Dt=M.toneMapping;M.toneMapping=Rn;const Bt=j.viewport;if(j.viewport!==void 0&&(j.viewport=void 0),d.setupLightsView(j),X===!0&&ut.setGlobalState(M.clippingPlanes,j),Ss(T,Z,j),P.updateMultisampleRenderTarget(dt),P.updateRenderTargetMipmap(dt),pt.has("WEBGL_multisampled_render_to_texture")===!1){let Ht=!1;for(let Lt=0,Jt=H.length;Lt<Jt;Lt++){const ae=H[Lt],le=ae.object,Le=ae.geometry,Qt=ae.material,It=ae.group;if(Qt.side===Ke&&le.layers.test(j.layers)){const xn=Qt.side;Qt.side=Ce,Qt.needsUpdate=!0,Ia(le,Z,j,Le,Qt,It),Qt.side=xn,Qt.needsUpdate=!0,Ht=!0}}Ht===!0&&(P.updateMultisampleRenderTarget(dt),P.updateRenderTargetMipmap(dt))}M.setRenderTarget(Pt),M.setClearColor(I,z),Bt!==void 0&&(j.viewport=Bt),M.toneMapping=Dt}function Ss(T,H,Z){const j=H.isScene===!0?H.overrideMaterial:null;for(let G=0,dt=T.length;G<dt;G++){const bt=T[G],Pt=bt.object,Dt=bt.geometry,Bt=j===null?bt.material:j,Ht=bt.group;Pt.layers.test(Z.layers)&&Ia(Pt,H,Z,Dt,Bt,Ht)}}function Ia(T,H,Z,j,G,dt){T.onBeforeRender(M,H,Z,j,G,dt),T.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),G.onBeforeRender(M,H,Z,j,T,dt),G.transparent===!0&&G.side===Ke&&G.forceSinglePass===!1?(G.side=Ce,G.needsUpdate=!0,M.renderBufferDirect(Z,H,j,G,T,dt),G.side=Xn,G.needsUpdate=!0,M.renderBufferDirect(Z,H,j,G,T,dt),G.side=Ke):M.renderBufferDirect(Z,H,j,G,T,dt),T.onAfterRender(M,H,Z,j,G,dt)}function bs(T,H,Z){H.isScene!==!0&&(H=ht);const j=gt.get(T),G=d.state.lights,dt=d.state.shadowsArray,bt=G.state.version,Pt=Rt.getParameters(T,G.state,dt,H,Z),Dt=Rt.getProgramCacheKey(Pt);let Bt=j.programs;j.environment=T.isMeshStandardMaterial?H.environment:null,j.fog=H.fog,j.envMap=(T.isMeshStandardMaterial?V:b).get(T.envMap||j.environment),j.envMapRotation=j.environment!==null&&T.envMap===null?H.environmentRotation:T.envMapRotation,Bt===void 0&&(T.addEventListener("dispose",kt),Bt=new Map,j.programs=Bt);let Ht=Bt.get(Dt);if(Ht!==void 0){if(j.currentProgram===Ht&&j.lightsStateVersion===bt)return Ua(T,Pt),Ht}else Pt.uniforms=Rt.getUniforms(T),T.onBeforeCompile(Pt,M),Ht=Rt.acquireProgram(Pt,Dt),Bt.set(Dt,Ht),j.uniforms=Pt.uniforms;const Lt=j.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Lt.clippingPlanes=ut.uniform),Ua(T,Pt),j.needsLights=lh(T),j.lightsStateVersion=bt,j.needsLights&&(Lt.ambientLightColor.value=G.state.ambient,Lt.lightProbe.value=G.state.probe,Lt.directionalLights.value=G.state.directional,Lt.directionalLightShadows.value=G.state.directionalShadow,Lt.spotLights.value=G.state.spot,Lt.spotLightShadows.value=G.state.spotShadow,Lt.rectAreaLights.value=G.state.rectArea,Lt.ltc_1.value=G.state.rectAreaLTC1,Lt.ltc_2.value=G.state.rectAreaLTC2,Lt.pointLights.value=G.state.point,Lt.pointLightShadows.value=G.state.pointShadow,Lt.hemisphereLights.value=G.state.hemi,Lt.directionalShadowMap.value=G.state.directionalShadowMap,Lt.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Lt.spotShadowMap.value=G.state.spotShadowMap,Lt.spotLightMatrix.value=G.state.spotLightMatrix,Lt.spotLightMap.value=G.state.spotLightMap,Lt.pointShadowMap.value=G.state.pointShadowMap,Lt.pointShadowMatrix.value=G.state.pointShadowMatrix),j.currentProgram=Ht,j.uniformsList=null,Ht}function Fa(T){if(T.uniformsList===null){const H=T.currentProgram.getUniforms();T.uniformsList=ho.seqWithValue(H.seq,T.uniforms)}return T.uniformsList}function Ua(T,H){const Z=gt.get(T);Z.outputColorSpace=H.outputColorSpace,Z.batching=H.batching,Z.batchingColor=H.batchingColor,Z.instancing=H.instancing,Z.instancingColor=H.instancingColor,Z.instancingMorph=H.instancingMorph,Z.skinning=H.skinning,Z.morphTargets=H.morphTargets,Z.morphNormals=H.morphNormals,Z.morphColors=H.morphColors,Z.morphTargetsCount=H.morphTargetsCount,Z.numClippingPlanes=H.numClippingPlanes,Z.numIntersection=H.numClipIntersection,Z.vertexAlphas=H.vertexAlphas,Z.vertexTangents=H.vertexTangents,Z.toneMapping=H.toneMapping}function rh(T,H,Z,j,G){H.isScene!==!0&&(H=ht),P.resetTextureUnits();const dt=H.fog,bt=j.isMeshStandardMaterial?H.environment:null,Pt=L===null?M.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:mi,Dt=(j.isMeshStandardMaterial?V:b).get(j.envMap||bt),Bt=j.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,Ht=!!Z.attributes.tangent&&(!!j.normalMap||j.anisotropy>0),Lt=!!Z.morphAttributes.position,Jt=!!Z.morphAttributes.normal,ae=!!Z.morphAttributes.color;let le=Rn;j.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(le=M.toneMapping);const Le=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,Qt=Le!==void 0?Le.length:0,It=gt.get(j),xn=d.state.lights;if(X===!0&&($===!0||T!==_)){const $e=T===_&&j.id===S;ut.setState(j,T,$e)}let te=!1;j.version===It.__version?(It.needsLights&&It.lightsStateVersion!==xn.state.version||It.outputColorSpace!==Pt||G.isBatchedMesh&&It.batching===!1||!G.isBatchedMesh&&It.batching===!0||G.isBatchedMesh&&It.batchingColor===!0&&G.colorTexture===null||G.isBatchedMesh&&It.batchingColor===!1&&G.colorTexture!==null||G.isInstancedMesh&&It.instancing===!1||!G.isInstancedMesh&&It.instancing===!0||G.isSkinnedMesh&&It.skinning===!1||!G.isSkinnedMesh&&It.skinning===!0||G.isInstancedMesh&&It.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&It.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&It.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&It.instancingMorph===!1&&G.morphTexture!==null||It.envMap!==Dt||j.fog===!0&&It.fog!==dt||It.numClippingPlanes!==void 0&&(It.numClippingPlanes!==ut.numPlanes||It.numIntersection!==ut.numIntersection)||It.vertexAlphas!==Bt||It.vertexTangents!==Ht||It.morphTargets!==Lt||It.morphNormals!==Jt||It.morphColors!==ae||It.toneMapping!==le||It.morphTargetsCount!==Qt)&&(te=!0):(te=!0,It.__version=j.version);let sn=It.currentProgram;te===!0&&(sn=bs(j,H,G));let vi=!1,ke=!1,Qi=!1;const ce=sn.getUniforms(),un=It.uniforms;if(mt.useProgram(sn.program)&&(vi=!0,ke=!0,Qi=!0),j.id!==S&&(S=j.id,ke=!0),vi||_!==T){mt.buffers.depth.getReversed()?(N.copy(T.projectionMatrix),Kh(N),Jh(N),ce.setValue(F,"projectionMatrix",N)):ce.setValue(F,"projectionMatrix",T.projectionMatrix),ce.setValue(F,"viewMatrix",T.matrixWorldInverse);const Ln=ce.map.cameraPosition;Ln!==void 0&&Ln.setValue(F,rt.setFromMatrixPosition(T.matrixWorld)),yt.logarithmicDepthBuffer&&ce.setValue(F,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(j.isMeshPhongMaterial||j.isMeshToonMaterial||j.isMeshLambertMaterial||j.isMeshBasicMaterial||j.isMeshStandardMaterial||j.isShaderMaterial)&&ce.setValue(F,"isOrthographic",T.isOrthographicCamera===!0),_!==T&&(_=T,ke=!0,Qi=!0)}if(G.isSkinnedMesh){ce.setOptional(F,G,"bindMatrix"),ce.setOptional(F,G,"bindMatrixInverse");const $e=G.skeleton;$e&&($e.boneTexture===null&&$e.computeBoneTexture(),ce.setValue(F,"boneTexture",$e.boneTexture,P))}G.isBatchedMesh&&(ce.setOptional(F,G,"batchingTexture"),ce.setValue(F,"batchingTexture",G._matricesTexture,P),ce.setOptional(F,G,"batchingIdTexture"),ce.setValue(F,"batchingIdTexture",G._indirectTexture,P),ce.setOptional(F,G,"batchingColorTexture"),G._colorsTexture!==null&&ce.setValue(F,"batchingColorTexture",G._colorsTexture,P));const ts=Z.morphAttributes;if((ts.position!==void 0||ts.normal!==void 0||ts.color!==void 0)&&zt.update(G,Z,sn),(ke||It.receiveShadow!==G.receiveShadow)&&(It.receiveShadow=G.receiveShadow,ce.setValue(F,"receiveShadow",G.receiveShadow)),j.isMeshGouraudMaterial&&j.envMap!==null&&(un.envMap.value=Dt,un.flipEnvMap.value=Dt.isCubeTexture&&Dt.isRenderTargetTexture===!1?-1:1),j.isMeshStandardMaterial&&j.envMap===null&&H.environment!==null&&(un.envMapIntensity.value=H.environmentIntensity),ke&&(ce.setValue(F,"toneMappingExposure",M.toneMappingExposure),It.needsLights&&ah(un,Qi),dt&&j.fog===!0&&_t.refreshFogUniforms(un,dt),_t.refreshMaterialUniforms(un,j,k,Q,d.state.transmissionRenderTarget[T.id]),ho.upload(F,Fa(It),un,P)),j.isShaderMaterial&&j.uniformsNeedUpdate===!0&&(ho.upload(F,Fa(It),un,P),j.uniformsNeedUpdate=!1),j.isSpriteMaterial&&ce.setValue(F,"center",G.center),ce.setValue(F,"modelViewMatrix",G.modelViewMatrix),ce.setValue(F,"normalMatrix",G.normalMatrix),ce.setValue(F,"modelMatrix",G.matrixWorld),j.isShaderMaterial||j.isRawShaderMaterial){const $e=j.uniformsGroups;for(let Ln=0,In=$e.length;Ln<In;Ln++){const Na=$e[Ln];B.update(Na,sn),B.bind(Na,sn)}}return sn}function ah(T,H){T.ambientLightColor.needsUpdate=H,T.lightProbe.needsUpdate=H,T.directionalLights.needsUpdate=H,T.directionalLightShadows.needsUpdate=H,T.pointLights.needsUpdate=H,T.pointLightShadows.needsUpdate=H,T.spotLights.needsUpdate=H,T.spotLightShadows.needsUpdate=H,T.rectAreaLights.needsUpdate=H,T.hemisphereLights.needsUpdate=H}function lh(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(T,H,Z){gt.get(T.texture).__webglTexture=H,gt.get(T.depthTexture).__webglTexture=Z;const j=gt.get(T);j.__hasExternalTextures=!0,j.__autoAllocateDepthBuffer=Z===void 0,j.__autoAllocateDepthBuffer||pt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),j.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,H){const Z=gt.get(T);Z.__webglFramebuffer=H,Z.__useDefaultFramebuffer=H===void 0},this.setRenderTarget=function(T,H=0,Z=0){L=T,C=H,E=Z;let j=!0,G=null,dt=!1,bt=!1;if(T){const Dt=gt.get(T);if(Dt.__useDefaultFramebuffer!==void 0)mt.bindFramebuffer(F.FRAMEBUFFER,null),j=!1;else if(Dt.__webglFramebuffer===void 0)P.setupRenderTarget(T);else if(Dt.__hasExternalTextures)P.rebindTextures(T,gt.get(T.texture).__webglTexture,gt.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Lt=T.depthTexture;if(Dt.__boundDepthTexture!==Lt){if(Lt!==null&&gt.has(Lt)&&(T.width!==Lt.image.width||T.height!==Lt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");P.setupDepthRenderbuffer(T)}}const Bt=T.texture;(Bt.isData3DTexture||Bt.isDataArrayTexture||Bt.isCompressedArrayTexture)&&(bt=!0);const Ht=gt.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Ht[H])?G=Ht[H][Z]:G=Ht[H],dt=!0):T.samples>0&&P.useMultisampledRTT(T)===!1?G=gt.get(T).__webglMultisampledFramebuffer:Array.isArray(Ht)?G=Ht[Z]:G=Ht,w.copy(T.viewport),R.copy(T.scissor),A=T.scissorTest}else w.copy(ct).multiplyScalar(k).floor(),R.copy(xt).multiplyScalar(k).floor(),A=Y;if(mt.bindFramebuffer(F.FRAMEBUFFER,G)&&j&&mt.drawBuffers(T,G),mt.viewport(w),mt.scissor(R),mt.setScissorTest(A),dt){const Dt=gt.get(T.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+H,Dt.__webglTexture,Z)}else if(bt){const Dt=gt.get(T.texture),Bt=H||0;F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,Dt.__webglTexture,Z||0,Bt)}S=-1},this.readRenderTargetPixels=function(T,H,Z,j,G,dt,bt){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Pt=gt.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&bt!==void 0&&(Pt=Pt[bt]),Pt){mt.bindFramebuffer(F.FRAMEBUFFER,Pt);try{const Dt=T.texture,Bt=Dt.format,Ht=Dt.type;if(!yt.textureFormatReadable(Bt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!yt.textureTypeReadable(Ht)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=T.width-j&&Z>=0&&Z<=T.height-G&&F.readPixels(H,Z,j,G,Vt.convert(Bt),Vt.convert(Ht),dt)}finally{const Dt=L!==null?gt.get(L).__webglFramebuffer:null;mt.bindFramebuffer(F.FRAMEBUFFER,Dt)}}},this.readRenderTargetPixelsAsync=async function(T,H,Z,j,G,dt,bt){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Pt=gt.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&bt!==void 0&&(Pt=Pt[bt]),Pt){const Dt=T.texture,Bt=Dt.format,Ht=Dt.type;if(!yt.textureFormatReadable(Bt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!yt.textureTypeReadable(Ht))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(H>=0&&H<=T.width-j&&Z>=0&&Z<=T.height-G){mt.bindFramebuffer(F.FRAMEBUFFER,Pt);const Lt=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,Lt),F.bufferData(F.PIXEL_PACK_BUFFER,dt.byteLength,F.STREAM_READ),F.readPixels(H,Z,j,G,Vt.convert(Bt),Vt.convert(Ht),0);const Jt=L!==null?gt.get(L).__webglFramebuffer:null;mt.bindFramebuffer(F.FRAMEBUFFER,Jt);const ae=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await jh(F,ae,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,Lt),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,dt),F.deleteBuffer(Lt),F.deleteSync(ae),dt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(T,H=null,Z=0){T.isTexture!==!0&&(us("WebGLRenderer: copyFramebufferToTexture function signature has changed."),H=arguments[0]||null,T=arguments[1]);const j=Math.pow(2,-Z),G=Math.floor(T.image.width*j),dt=Math.floor(T.image.height*j),bt=H!==null?H.x:0,Pt=H!==null?H.y:0;P.setTexture2D(T,0),F.copyTexSubImage2D(F.TEXTURE_2D,Z,0,0,bt,Pt,G,dt),mt.unbindTexture()},this.copyTextureToTexture=function(T,H,Z=null,j=null,G=0){T.isTexture!==!0&&(us("WebGLRenderer: copyTextureToTexture function signature has changed."),j=arguments[0]||null,T=arguments[1],H=arguments[2],G=arguments[3]||0,Z=null);let dt,bt,Pt,Dt,Bt,Ht,Lt,Jt,ae;const le=T.isCompressedTexture?T.mipmaps[G]:T.image;Z!==null?(dt=Z.max.x-Z.min.x,bt=Z.max.y-Z.min.y,Pt=Z.isBox3?Z.max.z-Z.min.z:1,Dt=Z.min.x,Bt=Z.min.y,Ht=Z.isBox3?Z.min.z:0):(dt=le.width,bt=le.height,Pt=le.depth||1,Dt=0,Bt=0,Ht=0),j!==null?(Lt=j.x,Jt=j.y,ae=j.z):(Lt=0,Jt=0,ae=0);const Le=Vt.convert(H.format),Qt=Vt.convert(H.type);let It;H.isData3DTexture?(P.setTexture3D(H,0),It=F.TEXTURE_3D):H.isDataArrayTexture||H.isCompressedArrayTexture?(P.setTexture2DArray(H,0),It=F.TEXTURE_2D_ARRAY):(P.setTexture2D(H,0),It=F.TEXTURE_2D),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,H.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,H.unpackAlignment);const xn=F.getParameter(F.UNPACK_ROW_LENGTH),te=F.getParameter(F.UNPACK_IMAGE_HEIGHT),sn=F.getParameter(F.UNPACK_SKIP_PIXELS),vi=F.getParameter(F.UNPACK_SKIP_ROWS),ke=F.getParameter(F.UNPACK_SKIP_IMAGES);F.pixelStorei(F.UNPACK_ROW_LENGTH,le.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,le.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,Dt),F.pixelStorei(F.UNPACK_SKIP_ROWS,Bt),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Ht);const Qi=T.isDataArrayTexture||T.isData3DTexture,ce=H.isDataArrayTexture||H.isData3DTexture;if(T.isRenderTargetTexture||T.isDepthTexture){const un=gt.get(T),ts=gt.get(H),$e=gt.get(un.__renderTarget),Ln=gt.get(ts.__renderTarget);mt.bindFramebuffer(F.READ_FRAMEBUFFER,$e.__webglFramebuffer),mt.bindFramebuffer(F.DRAW_FRAMEBUFFER,Ln.__webglFramebuffer);for(let In=0;In<Pt;In++)Qi&&F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,gt.get(T).__webglTexture,G,Ht+In),T.isDepthTexture?(ce&&F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,gt.get(H).__webglTexture,G,ae+In),F.blitFramebuffer(Dt,Bt,dt,bt,Lt,Jt,dt,bt,F.DEPTH_BUFFER_BIT,F.NEAREST)):ce?F.copyTexSubImage3D(It,G,Lt,Jt,ae+In,Dt,Bt,dt,bt):F.copyTexSubImage2D(It,G,Lt,Jt,ae+In,Dt,Bt,dt,bt);mt.bindFramebuffer(F.READ_FRAMEBUFFER,null),mt.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else ce?T.isDataTexture||T.isData3DTexture?F.texSubImage3D(It,G,Lt,Jt,ae,dt,bt,Pt,Le,Qt,le.data):H.isCompressedArrayTexture?F.compressedTexSubImage3D(It,G,Lt,Jt,ae,dt,bt,Pt,Le,le.data):F.texSubImage3D(It,G,Lt,Jt,ae,dt,bt,Pt,Le,Qt,le):T.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,G,Lt,Jt,dt,bt,Le,Qt,le.data):T.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,G,Lt,Jt,le.width,le.height,Le,le.data):F.texSubImage2D(F.TEXTURE_2D,G,Lt,Jt,dt,bt,Le,Qt,le);F.pixelStorei(F.UNPACK_ROW_LENGTH,xn),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,te),F.pixelStorei(F.UNPACK_SKIP_PIXELS,sn),F.pixelStorei(F.UNPACK_SKIP_ROWS,vi),F.pixelStorei(F.UNPACK_SKIP_IMAGES,ke),G===0&&H.generateMipmaps&&F.generateMipmap(It),mt.unbindTexture()},this.copyTextureToTexture3D=function(T,H,Z=null,j=null,G=0){return T.isTexture!==!0&&(us("WebGLRenderer: copyTextureToTexture3D function signature has changed."),Z=arguments[0]||null,j=arguments[1]||null,T=arguments[2],H=arguments[3],G=arguments[4]||0),us('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(T,H,Z,j,G)},this.initRenderTarget=function(T){gt.get(T).__webglFramebuffer===void 0&&P.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?P.setTextureCube(T,0):T.isData3DTexture?P.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?P.setTexture2DArray(T,0):P.setTexture2D(T,0),mt.unbindTexture()},this.resetState=function(){C=0,E=0,L=null,mt.reset(),re.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Cn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=jt._getDrawingBufferColorSpace(t),e.unpackColorSpace=jt._getUnpackColorSpace()}}class ba{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new J(t),this.near=e,this.far=n}clone(){return new ba(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class oa extends qt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new mn,this.environmentIntensity=1,this.environmentRotation=new mn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class jc extends Re{constructor(t=null,e=1,n=1,i,o,r,a,l,c=Xe,h=Xe,u,f){super(null,r,a,l,c,h,i,o,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ra extends pe{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Li=new oe,Ul=new oe,Xs=[],Nl=new gi,c0=new oe,rs=new Kt,as=new ji;class se extends Kt{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new ra(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,c0)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new gi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Li),Nl.copy(t.boundingBox).applyMatrix4(Li),this.boundingBox.union(Nl)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new ji),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Li),as.copy(t.boundingSphere).applyMatrix4(Li),this.boundingSphere.union(as)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,o=n.length+1,r=t*o+1;for(let a=0;a<n.length;a++)n[a]=i[r+a]}raycast(t,e){const n=this.matrixWorld,i=this.count;if(rs.geometry=this.geometry,rs.material=this.material,rs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),as.copy(this.boundingSphere),as.applyMatrix4(n),t.ray.intersectsSphere(as)!==!1))for(let o=0;o<i;o++){this.getMatrixAt(o,Li),Ul.multiplyMatrices(n,Li),rs.matrixWorld=Ul,rs.raycast(t,Xs);for(let r=0,a=Xs.length;r<a;r++){const l=Xs[r];l.instanceId=o,l.object=this,e.push(l)}Xs.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new ra(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new jc(new Float32Array(i*this.count),i,this.count,pa,pn));const o=this.morphTexture.source.data.data;let r=0;for(let c=0;c<n.length;c++)r+=n[c];const a=this.geometry.morphTargetsRelative?1:1-r,l=i*t;o[l]=a,o.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class ri extends Ki{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new J(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const go=new O,vo=new O,zl=new oe,ls=new xa,$s=new ji,ir=new O,Bl=new O;class Eo extends qt{constructor(t=new fe,e=new ri){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let i=1,o=e.count;i<o;i++)go.fromBufferAttribute(e,i-1),vo.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=go.distanceTo(vo);t.setAttribute("lineDistance",new Yt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,o=t.params.Line.threshold,r=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),$s.copy(n.boundingSphere),$s.applyMatrix4(i),$s.radius+=o,t.ray.intersectsSphere($s)===!1)return;zl.copy(i).invert(),ls.copy(t.ray).applyMatrix4(zl);const a=o/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){const p=Math.max(0,r.start),g=Math.min(h.count,r.start+r.count);for(let v=p,m=g-1;v<m;v+=c){const d=h.getX(v),x=h.getX(v+1),y=qs(this,t,ls,l,d,x);y&&e.push(y)}if(this.isLineLoop){const v=h.getX(g-1),m=h.getX(p),d=qs(this,t,ls,l,v,m);d&&e.push(d)}}else{const p=Math.max(0,r.start),g=Math.min(f.count,r.start+r.count);for(let v=p,m=g-1;v<m;v+=c){const d=qs(this,t,ls,l,v,v+1);d&&e.push(d)}if(this.isLineLoop){const v=qs(this,t,ls,l,g-1,p);v&&e.push(v)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,r=i.length;o<r;o++){const a=i[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}}function qs(s,t,e,n,i,o){const r=s.geometry.attributes.position;if(go.fromBufferAttribute(r,i),vo.fromBufferAttribute(r,o),e.distanceSqToSegment(go,vo,ir,Bl)>n)return;ir.applyMatrix4(s.matrixWorld);const l=t.ray.origin.distanceTo(ir);if(!(l<t.near||l>t.far))return{distance:l,point:Bl.clone().applyMatrix4(s.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:s}}const Ol=new O,kl=new O;class Hi extends Eo{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let i=0,o=e.count;i<o;i+=2)Ol.fromBufferAttribute(e,i),kl.fromBufferAttribute(e,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Ol.distanceTo(kl);t.setAttribute("lineDistance",new Yt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Kc extends Re{constructor(t,e,n,i,o,r,a,l,c){super(t,e,n,i,o,r,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Qe extends fe{constructor(t=1,e=1,n=1,i=32,o=1,r=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:o,openEnded:r,thetaStart:a,thetaLength:l};const c=this;i=Math.floor(i),o=Math.floor(o);const h=[],u=[],f=[],p=[];let g=0;const v=[],m=n/2;let d=0;x(),r===!1&&(t>0&&y(!0),e>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new Yt(u,3)),this.setAttribute("normal",new Yt(f,3)),this.setAttribute("uv",new Yt(p,2));function x(){const M=new O,D=new O;let C=0;const E=(e-t)/n;for(let L=0;L<=o;L++){const S=[],_=L/o,w=_*(e-t)+t;for(let R=0;R<=i;R++){const A=R/i,I=A*l+a,z=Math.sin(I),W=Math.cos(I);D.x=w*z,D.y=-_*n+m,D.z=w*W,u.push(D.x,D.y,D.z),M.set(z,E,W).normalize(),f.push(M.x,M.y,M.z),p.push(A,1-_),S.push(g++)}v.push(S)}for(let L=0;L<i;L++)for(let S=0;S<o;S++){const _=v[S][L],w=v[S+1][L],R=v[S+1][L+1],A=v[S][L+1];(t>0||S!==0)&&(h.push(_,w,A),C+=3),(e>0||S!==o-1)&&(h.push(w,R,A),C+=3)}c.addGroup(d,C,0),d+=C}function y(M){const D=g,C=new Xt,E=new O;let L=0;const S=M===!0?t:e,_=M===!0?1:-1;for(let R=1;R<=i;R++)u.push(0,m*_,0),f.push(0,_,0),p.push(.5,.5),g++;const w=g;for(let R=0;R<=i;R++){const I=R/i*l+a,z=Math.cos(I),W=Math.sin(I);E.x=S*W,E.y=m*_,E.z=S*z,u.push(E.x,E.y,E.z),f.push(0,_,0),C.x=z*.5+.5,C.y=W*.5*_+.5,p.push(C.x,C.y),g++}for(let R=0;R<i;R++){const A=D+R,I=w+R;M===!0?h.push(I,I+1,A):h.push(I+1,I,A),L+=3}c.addGroup(d,L,M===!0?1:2),d+=L}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Qe(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class di extends Qe{constructor(t=1,e=1,n=32,i=1,o=!1,r=0,a=Math.PI*2){super(0,t,e,n,i,o,r,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:o,thetaStart:r,thetaLength:a}}static fromJSON(t){return new di(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Ea extends fe{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};const o=[],r=[];a(i),c(n),h(),this.setAttribute("position",new Yt(o,3)),this.setAttribute("normal",new Yt(o.slice(),3)),this.setAttribute("uv",new Yt(r,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(x){const y=new O,M=new O,D=new O;for(let C=0;C<e.length;C+=3)p(e[C+0],y),p(e[C+1],M),p(e[C+2],D),l(y,M,D,x)}function l(x,y,M,D){const C=D+1,E=[];for(let L=0;L<=C;L++){E[L]=[];const S=x.clone().lerp(M,L/C),_=y.clone().lerp(M,L/C),w=C-L;for(let R=0;R<=w;R++)R===0&&L===C?E[L][R]=S:E[L][R]=S.clone().lerp(_,R/w)}for(let L=0;L<C;L++)for(let S=0;S<2*(C-L)-1;S++){const _=Math.floor(S/2);S%2===0?(f(E[L][_+1]),f(E[L+1][_]),f(E[L][_])):(f(E[L][_+1]),f(E[L+1][_+1]),f(E[L+1][_]))}}function c(x){const y=new O;for(let M=0;M<o.length;M+=3)y.x=o[M+0],y.y=o[M+1],y.z=o[M+2],y.normalize().multiplyScalar(x),o[M+0]=y.x,o[M+1]=y.y,o[M+2]=y.z}function h(){const x=new O;for(let y=0;y<o.length;y+=3){x.x=o[y+0],x.y=o[y+1],x.z=o[y+2];const M=m(x)/2/Math.PI+.5,D=d(x)/Math.PI+.5;r.push(M,1-D)}g(),u()}function u(){for(let x=0;x<r.length;x+=6){const y=r[x+0],M=r[x+2],D=r[x+4],C=Math.max(y,M,D),E=Math.min(y,M,D);C>.9&&E<.1&&(y<.2&&(r[x+0]+=1),M<.2&&(r[x+2]+=1),D<.2&&(r[x+4]+=1))}}function f(x){o.push(x.x,x.y,x.z)}function p(x,y){const M=x*3;y.x=t[M+0],y.y=t[M+1],y.z=t[M+2]}function g(){const x=new O,y=new O,M=new O,D=new O,C=new Xt,E=new Xt,L=new Xt;for(let S=0,_=0;S<o.length;S+=9,_+=6){x.set(o[S+0],o[S+1],o[S+2]),y.set(o[S+3],o[S+4],o[S+5]),M.set(o[S+6],o[S+7],o[S+8]),C.set(r[_+0],r[_+1]),E.set(r[_+2],r[_+3]),L.set(r[_+4],r[_+5]),D.copy(x).add(y).add(M).divideScalar(3);const w=m(D);v(C,_+0,x,w),v(E,_+2,y,w),v(L,_+4,M,w)}}function v(x,y,M,D){D<0&&x.x===1&&(r[y]=x.x-1),M.x===0&&M.z===0&&(r[y]=D/2/Math.PI+.5)}function m(x){return Math.atan2(x.z,-x.x)}function d(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ea(t.vertices,t.indices,t.radius,t.details)}}const Ys=new O,Zs=new O,sr=new O,js=new Je;class or extends fe{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const i=Math.pow(10,4),o=Math.cos(co*e),r=t.getIndex(),a=t.getAttribute("position"),l=r?r.count:a.count,c=[0,0,0],h=["a","b","c"],u=new Array(3),f={},p=[];for(let g=0;g<l;g+=3){r?(c[0]=r.getX(g),c[1]=r.getX(g+1),c[2]=r.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);const{a:v,b:m,c:d}=js;if(v.fromBufferAttribute(a,c[0]),m.fromBufferAttribute(a,c[1]),d.fromBufferAttribute(a,c[2]),js.getNormal(sr),u[0]=`${Math.round(v.x*i)},${Math.round(v.y*i)},${Math.round(v.z*i)}`,u[1]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,u[2]=`${Math.round(d.x*i)},${Math.round(d.y*i)},${Math.round(d.z*i)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let x=0;x<3;x++){const y=(x+1)%3,M=u[x],D=u[y],C=js[h[x]],E=js[h[y]],L=`${M}_${D}`,S=`${D}_${M}`;S in f&&f[S]?(sr.dot(f[S].normal)<=o&&(p.push(C.x,C.y,C.z),p.push(E.x,E.y,E.z)),f[S]=null):L in f||(f[L]={index0:c[x],index1:c[y],normal:sr.clone()})}}for(const g in f)if(f[g]){const{index0:v,index1:m}=f[g];Ys.fromBufferAttribute(a,v),Zs.fromBufferAttribute(a,m),p.push(Ys.x,Ys.y,Ys.z),p.push(Zs.x,Zs.y,Zs.z)}this.setAttribute("position",new Yt(p,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class ai extends Ea{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],o=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,o,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new ai(t.radius,t.detail)}}class wa extends fe{constructor(t=.5,e=1,n=32,i=1,o=0,r=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:o,thetaLength:r},n=Math.max(3,n),i=Math.max(1,i);const a=[],l=[],c=[],h=[];let u=t;const f=(e-t)/i,p=new O,g=new Xt;for(let v=0;v<=i;v++){for(let m=0;m<=n;m++){const d=o+m/n*r;p.x=u*Math.cos(d),p.y=u*Math.sin(d),l.push(p.x,p.y,p.z),c.push(0,0,1),g.x=(p.x/e+1)/2,g.y=(p.y/e+1)/2,h.push(g.x,g.y)}u+=f}for(let v=0;v<i;v++){const m=v*(n+1);for(let d=0;d<n;d++){const x=d+m,y=x,M=x+n+1,D=x+n+2,C=x+1;a.push(y,M,C),a.push(M,D,C)}}this.setIndex(a),this.setAttribute("position",new Yt(l,3)),this.setAttribute("normal",new Yt(c,3)),this.setAttribute("uv",new Yt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new wa(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Yi extends fe{constructor(t=1,e=32,n=16,i=0,o=Math.PI*2,r=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:o,thetaStart:r,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(r+a,Math.PI);let c=0;const h=[],u=new O,f=new O,p=[],g=[],v=[],m=[];for(let d=0;d<=n;d++){const x=[],y=d/n;let M=0;d===0&&r===0?M=.5/e:d===n&&l===Math.PI&&(M=-.5/e);for(let D=0;D<=e;D++){const C=D/e;u.x=-t*Math.cos(i+C*o)*Math.sin(r+y*a),u.y=t*Math.cos(r+y*a),u.z=t*Math.sin(i+C*o)*Math.sin(r+y*a),g.push(u.x,u.y,u.z),f.copy(u).normalize(),v.push(f.x,f.y,f.z),m.push(C+M,1-y),x.push(c++)}h.push(x)}for(let d=0;d<n;d++)for(let x=0;x<e;x++){const y=h[d][x+1],M=h[d][x],D=h[d+1][x],C=h[d+1][x+1];(d!==0||r>0)&&p.push(y,M,C),(d!==n-1||l<Math.PI)&&p.push(M,D,C)}this.setIndex(p),this.setAttribute("position",new Yt(g,3)),this.setAttribute("normal",new Yt(v,3)),this.setAttribute("uv",new Yt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Yi(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class he extends Ki{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new J(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new J(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ic,this.normalScale=new Xt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new mn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Jc extends qt{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new J(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class h0 extends Jc{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(qt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new J(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const rr=new oe,Hl=new O,Gl=new O;class u0{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Xt(512,512),this.map=null,this.mapPass=null,this.matrix=new oe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ma,this._frameExtents=new Xt(1,1),this._viewportCount=1,this._viewports=[new de(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Hl.setFromMatrixPosition(t.matrixWorld),e.position.copy(Hl),Gl.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Gl),e.updateMatrixWorld(),rr.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(rr),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(rr)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class d0 extends u0{constructor(){super(new ya(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Vl extends Jc{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(qt.DEFAULT_UP),this.updateMatrix(),this.target=new qt,this.shadow=new d0}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const Wl=new oe;class Qc{constructor(t,e,n=0,i=1/0){this.ray=new xa(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new _a,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Wl.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Wl),this}intersectObject(t,e=!0,n=[]){return aa(t,this,n,e),n.sort(Xl),n}intersectObjects(t,e=!0,n=[]){for(let i=0,o=t.length;i<o;i++)aa(t[i],this,n,e);return n.sort(Xl),n}}function Xl(s,t){return s.distance-t.distance}function aa(s,t,e,n){let i=!0;if(s.layers.test(t.layers)&&s.raycast(t,e)===!1&&(i=!1),i===!0&&n===!0){const o=s.children;for(let r=0,a=o.length;r<a;r++)aa(o[r],t,e,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ha}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ha);function f0(s){if(!(s instanceof HTMLElement))return!1;const t=s.tagName;return t==="INPUT"||t==="TEXTAREA"||t==="SELECT"||s.isContentEditable}class p0{camera;target=new O(205,8,90);yaw=-.34;pitch=.56;distance=490;keys=new Set;domElement;hooks={isToolActive:()=>!1};pointers=new Map;mode="none";primaryPointerId=null;maxTravel=0;lastPinchDist=0;lastPinchAngle=0;lastMidX=0;lastMidY=0;longPressTimer=null;longPressFired=!1;raycaster=new Qc;ndc=new Xt;groundPlane=new Tn(new O(0,1,0),0);tmpHitA=new O;tmpHitB=new O;constructor(t,e=16/9){this.domElement=t,this.domElement.style.touchAction="none",this.camera=new je(42,e,2,3400),this.applyPreset("overview"),this.bindEvents()}setHooks(t){this.hooks=t}applyPreset(t){t==="street"?(this.target.set(222,14,25),this.yaw=-.26,this.pitch=.21,this.distance=168):t==="newcity"?(this.target.set(130,8,-20),this.yaw=-.34,this.pitch=.56,this.distance=580):(this.target.set(190,6,95),this.yaw=-.36,this.pitch=.56,this.distance=520),this.syncCamera()}focusPoint(t,e,n,i){this.target.set(t,e,n),i!==void 0&&(this.distance=i),this.syncCamera()}syncCamera(){this.pitch=Math.max(.14,Math.min(1.38,this.pitch)),this.distance=Math.max(45,Math.min(1150,this.distance)),this.target.x=Math.max(-780,Math.min(780,this.target.x)),this.target.z=Math.max(-780,Math.min(780,this.target.z));const t=Math.cos(this.pitch)*this.distance,e=Math.sin(this.pitch)*this.distance,n=Math.sin(this.yaw)*t,i=Math.cos(this.yaw)*t;this.camera.position.set(this.target.x+n,Math.max(6,this.target.y+e),this.target.z+i),this.camera.lookAt(this.target),this.camera.updateMatrixWorld()}intersectGroundAtClient(t,e,n){const i=this.domElement.getBoundingClientRect();return i.width<=0||i.height<=0?!1:(this.ndc.set((t-i.left)/i.width*2-1,-((e-i.top)/i.height)*2+1),this.raycaster.setFromCamera(this.ndc,this.camera),this.groundPlane.constant=-this.target.y,this.raycaster.ray.intersectPlane(this.groundPlane,n)!==null)}panByScreenDelta(t,e){const n=this.distance*.00145,i=-Math.sin(this.yaw),o=-Math.cos(this.yaw),r=Math.cos(this.yaw),a=-Math.sin(this.yaw);this.target.x+=(-t*r+e*i)*n,this.target.z+=(-t*a+e*o)*n}update(t){const e=this.distance*.85*t,n=1.45*t,i=-Math.sin(this.yaw),o=-Math.cos(this.yaw),r=Math.cos(this.yaw),a=-Math.sin(this.yaw);let l=!1;(this.keys.has("KeyW")||this.keys.has("ArrowUp"))&&(this.target.x+=i*e,this.target.z+=o*e,l=!0),(this.keys.has("KeyS")||this.keys.has("ArrowDown"))&&(this.target.x-=i*e,this.target.z-=o*e,l=!0),(this.keys.has("KeyA")||this.keys.has("ArrowLeft"))&&(this.target.x-=r*e,this.target.z-=a*e,l=!0),(this.keys.has("KeyD")||this.keys.has("ArrowRight"))&&(this.target.x+=r*e,this.target.z+=a*e,l=!0),this.keys.has("KeyQ")&&(this.yaw-=n,l=!0),this.keys.has("KeyE")&&(this.yaw+=n,l=!0),l&&this.syncCamera()}clearLongPress(){this.longPressTimer!==null&&(clearTimeout(this.longPressTimer),this.longPressTimer=null)}initMultiTouch(){const t=Array.from(this.pointers.values());if(t.length<2)return;const e=t[0],n=t[1];this.lastPinchDist=Math.max(10,Math.hypot(n.x-e.x,n.y-e.y)),this.lastPinchAngle=Math.atan2(n.y-e.y,n.x-e.x),this.lastMidX=(e.x+n.x)*.5,this.lastMidY=(e.y+n.y)*.5}bindEvents(){window.addEventListener("keydown",this.onKeyDown),window.addEventListener("keyup",this.onKeyUp),window.addEventListener("blur",this.onWindowBlur),this.domElement.addEventListener("pointerdown",this.onPointerDown),window.addEventListener("pointermove",this.onPointerMove),window.addEventListener("pointerup",this.onPointerUp),window.addEventListener("pointercancel",this.onPointerUp),this.domElement.addEventListener("wheel",this.onWheel,{passive:!1}),this.domElement.addEventListener("contextmenu",this.onContextMenu),this.domElement.addEventListener("touchstart",this.preventTouchDefault,{passive:!1}),this.domElement.addEventListener("touchmove",this.preventTouchDefault,{passive:!1})}preventTouchDefault=t=>{t.cancelable&&t.preventDefault()};onWindowBlur=()=>{this.keys.clear(),this.pointers.clear(),this.mode="none",this.primaryPointerId=null,this.clearLongPress()};onKeyDown=t=>{f0(t.target)||(this.keys.add(t.code),this.hooks.onKeyDown?.(t))};onKeyUp=t=>{this.keys.delete(t.code)};onContextMenu=t=>{t.preventDefault()};onPointerDown=t=>{t.pointerType==="touch"&&t.preventDefault(),this.domElement.setPointerCapture?.(t.pointerId);const e={id:t.pointerId,x:t.clientX,y:t.clientY,startX:t.clientX,startY:t.clientY,button:t.button,pointerType:t.pointerType};if(this.pointers.set(t.pointerId,e),this.pointers.size>=2){this.clearLongPress(),this.mode==="tool"&&this.hooks.onToolCancel?.(),this.mode="multitouch",this.primaryPointerId=null,this.initMultiTouch();return}this.primaryPointerId=t.pointerId,this.maxTravel=0,this.longPressFired=!1,this.clearLongPress();const n=this.keys.has("Space"),i=this.hooks.isToolActive();if(t.button===2)this.mode="orbit";else if(t.button===1)this.mode="pan";else if(t.button===0)if(t.shiftKey&&t.pointerType==="mouse"&&!i)this.mode="orbit";else if(!i||n||t.altKey){if(this.mode="pan",t.pointerType==="touch"){const o=t.clientX,r=t.clientY;this.longPressTimer=setTimeout(()=>{this.mode==="pan"&&this.maxTravel<10&&this.pointers.size===1&&(this.longPressFired=!0,this.hooks.onLongPress?.(o,r))},460)}}else this.mode="tool",this.hooks.onToolDown?.(t.clientX,t.clientY,t.pointerType)};onPointerMove=t=>{const e=this.pointers.get(t.pointerId);if(!e){if(t.pointerType==="mouse"&&t.buttons===0){const r=this.domElement.getBoundingClientRect();t.clientX>=r.left&&t.clientX<=r.right&&t.clientY>=r.top&&t.clientY<=r.bottom&&this.hooks.onHover?.(t.clientX,t.clientY)}return}const n=t.clientX-e.x,i=t.clientY-e.y;e.x=t.clientX,e.y=t.clientY;const o=Math.hypot(t.clientX-e.startX,t.clientY-e.startY);if(o>this.maxTravel&&(this.maxTravel=o,this.maxTravel>10&&this.clearLongPress()),this.mode==="multitouch"&&this.pointers.size>=2){const r=Array.from(this.pointers.values()),a=r[0],l=r[1],c=Math.max(10,Math.hypot(l.x-a.x,l.y-a.y)),h=Math.atan2(l.y-a.y,l.x-a.x),u=(a.x+l.x)*.5,f=(a.y+l.y)*.5,p=this.lastPinchDist/c;Number.isFinite(p)&&p>.5&&p<2&&(this.distance*=p);let g=h-this.lastPinchAngle;for(;g>Math.PI;)g-=Math.PI*2;for(;g<-Math.PI;)g+=Math.PI*2;Math.abs(g)<.6&&(this.yaw-=g*1.1);const v=u-this.lastMidX,m=f-this.lastMidY;this.pitch+=m*.0045,this.panByScreenDelta(v*.65,0),this.lastPinchDist=c,this.lastPinchAngle=h,this.lastMidX=u,this.lastMidY=f,this.syncCamera();return}t.pointerId===this.primaryPointerId&&(this.mode==="orbit"?(this.yaw-=n*.0065,this.pitch+=i*.0055,this.syncCamera()):this.mode==="pan"?this.maxTravel>4&&(this.panByScreenDelta(n,i),this.syncCamera()):this.mode==="tool"&&this.hooks.onToolMove?.(t.clientX,t.clientY,e.pointerType))};onPointerUp=t=>{const e=this.pointers.get(t.pointerId);if(e){if(this.pointers.delete(t.pointerId),this.clearLongPress(),this.mode==="multitouch"){this.pointers.size<2?(this.mode="none",this.primaryPointerId=null):this.initMultiTouch();return}if(t.pointerId===this.primaryPointerId){const n=this.maxTravel<=7,i=this.mode;this.mode="none",this.primaryPointerId=null,i==="orbit"&&e.button===2&&n?this.hooks.onRightClick?.():i==="pan"&&e.button===0&&n&&!this.longPressFired?this.hooks.onTapSelect?.(t.clientX,t.clientY):i==="tool"&&this.hooks.onToolUp?.(t.clientX,t.clientY,e.pointerType,this.maxTravel>16)}}};onWheel=t=>{t.preventDefault();const e=t.deltaY>0?1.11:.9,n=this.intersectGroundAtClient(t.clientX,t.clientY,this.tmpHitA);if(this.distance*=e,this.syncCamera(),n&&this.intersectGroundAtClient(t.clientX,t.clientY,this.tmpHitB)){const o=this.tmpHitA.x-this.tmpHitB.x,r=this.tmpHitA.z-this.tmpHitB.z;Math.hypot(o,r)<this.distance*.8&&(this.target.x+=o,this.target.z+=r,this.syncCamera())}};dispose(){this.clearLongPress(),window.removeEventListener("keydown",this.onKeyDown),window.removeEventListener("keyup",this.onKeyUp),window.removeEventListener("blur",this.onWindowBlur),this.domElement.removeEventListener("pointerdown",this.onPointerDown),window.removeEventListener("pointermove",this.onPointerMove),window.removeEventListener("pointerup",this.onPointerUp),window.removeEventListener("pointercancel",this.onPointerUp),this.domElement.removeEventListener("wheel",this.onWheel),this.domElement.removeEventListener("contextmenu",this.onContextMenu),this.domElement.removeEventListener("touchstart",this.preventTouchDefault),this.domElement.removeEventListener("touchmove",this.preventTouchDefault)}}function ln(s,t){return Math.hypot(t.x-s.x,t.z-s.z)}function $l(s,t){const e=t.x-s.x,n=t.z-s.z;return e*e+n*n}function ql(s,t,e){return{x:s.x+(t.x-s.x)*e,z:s.z+(t.z-s.z)*e}}function ar(s,t){return{p0:{x:s.x,z:s.z},c0:ql(s,t,1/3),c1:ql(s,t,2/3),p1:{x:t.x,z:t.z}}}function lr(s,t,e){return{p0:{x:s.x,z:s.z},c0:{x:s.x+2/3*(t.x-s.x),z:s.z+2/3*(t.z-s.z)},c1:{x:e.x+2/3*(t.x-e.x),z:e.z+2/3*(t.z-e.z)},p1:{x:e.x,z:e.z}}}function Oe(s,t){const e=1-t,n=e*e,i=n*e,o=t*t,r=o*t;return{x:i*s.p0.x+3*n*t*s.c0.x+3*e*o*s.c1.x+r*s.p1.x,z:i*s.p0.z+3*n*t*s.c0.z+3*e*o*s.c1.z+r*s.p1.z}}function m0(s,t){const e=1-t,n=e*e,i=t*t;return{x:3*n*(s.c0.x-s.p0.x)+6*e*t*(s.c1.x-s.c0.x)+3*i*(s.p1.x-s.c1.x),z:3*n*(s.c0.z-s.p0.z)+6*e*t*(s.c1.z-s.c0.z)+3*i*(s.p1.z-s.c1.z)}}function li(s,t){let e=m0(s,t),n=Math.hypot(e.x,e.z);if(n<1e-6){const i=t<.5?.005:-.005,o=Oe(s,t),r=Oe(s,Math.max(0,Math.min(1,t+i)));e={x:(r.x-o.x)*Math.sign(i),z:(r.z-o.z)*Math.sign(i)},n=Math.hypot(e.x,e.z),n<1e-6&&(e={x:s.p1.x-s.p0.x,z:s.p1.z-s.p0.z},n=Math.hypot(e.x,e.z)||1)}return{x:e.x/n,z:e.z/n}}function ci(s){return{x:-s.z,z:s.x}}function hi(s,t=32){const e=t+1,n=new Float32Array(e),i=new Float32Array(e),o=new Float32Array(e),r=new Float32Array(e);let a=0,l=Oe(s,0),c=l.x,h=l.x,u=l.z,f=l.z;n[0]=0,i[0]=0,o[0]=l.x,r[0]=l.z;for(let p=1;p<=t;p++){const g=p/t,v=Oe(s,g);a+=Math.hypot(v.x-l.x,v.z-l.z),n[p]=g,i[p]=a,o[p]=v.x,r[p]=v.z,v.x<c&&(c=v.x),v.x>h&&(h=v.x),v.z<u&&(u=v.z),v.z>f&&(f=v.z),l=v}return{bezier:s,samples:t,ts:n,arcLengths:i,xs:o,zs:r,length:a,minX:c,maxX:h,minZ:u,maxZ:f}}function ui(s,t){if(t<=0||s.length<=1e-6)return 0;if(t>=s.length)return 1;let e=0,n=s.samples;for(;e+1<n;){const a=e+n>>1;s.arcLengths[a]<=t?e=a:n=a}const i=s.arcLengths[e],o=s.arcLengths[n],r=o>i?(t-i)/(o-i):0;return s.ts[e]+(s.ts[n]-s.ts[e])*r}function g0(s,t){const n=Math.max(0,Math.min(1,t))*s.samples,i=Math.min(s.samples-1,Math.floor(n)),o=n-i;return s.arcLengths[i]+(s.arcLengths[i+1]-s.arcLengths[i])*o}function cr(s,t){let e=0,n=1/0;for(let h=0;h<=s.samples;h++){const u=s.xs[h]-t.x,f=s.zs[h]-t.z,p=u*u+f*f;p<n&&(n=p,e=h)}let i=Math.max(0,(e-1)/s.samples),o=Math.min(1,(e+1)/s.samples);const r=.6180339887498949;for(let h=0;h<14;h++){const u=o-(o-i)*r,f=i+(o-i)*r,p=$l(Oe(s.bezier,u),t),g=$l(Oe(s.bezier,f),t);p<g?o=f:i=u}const a=.5*(i+o),l=Oe(s.bezier,a),c=ln(l,t);return{t:a,s:g0(s,a),dist:c,point:l}}const xo=12,ms=5,si=6,_o=14,Mo=7,Yl=7;function Dn(s){let t=s>>>0;return()=>(t=t*1664525+1013904223>>>0,t/4294967296)}function Se(s,t=!0){const e=new Kc(s);return e.colorSpace=De,e.wrapS=t?fi:hn,e.wrapT=t?fi:hn,e.anisotropy=4,e.needsUpdate=!0,e}function Ms(s,t,e,n=8){const i=Dn(e);for(let o=0;o<900;o++){const r=i()*t,a=i()*t,l=4+i()*24,c=3+i()*14,h=i()>.5;s.fillStyle=h?`rgba(42, 48, 56, ${i()*n/255})`:`rgba(255, 252, 245, ${i()*n/255})`,s.fillRect(r,a,l,c)}}function ys(s,t,e,n,i,o,r){const a=r.frameColor??"#D6CFC4",l=r.glassColor??"#445C6E";if(s.fillStyle="rgba(26, 34, 44, 0.28)",s.fillRect(e-2,n-2,i+4,o+4),r.hasShutters){s.fillStyle=r.shutterColor??"#6D7A7E";const h=Math.max(5,Math.round(i*.24));s.fillRect(e-h-2,n,h,o),s.fillRect(e+i+2,n,h,o)}s.fillStyle=a,s.fillRect(e-1,n-1,i+2,o+2),s.fillStyle=l,s.fillRect(e+2,n+2,i-4,o-4);const c=s.createLinearGradient(e,n+2,e,n+o-2);if(c.addColorStop(0,"rgba(186, 214, 232, 0.42)"),c.addColorStop(.45,"rgba(120, 152, 178, 0.14)"),c.addColorStop(1,"rgba(20, 32, 46, 0.35)"),s.fillStyle=c,s.fillRect(e+2,n+2,i-4,o-4),r.hasMullion&&(s.fillStyle=a,s.fillRect(e+i*.5-1,n+2,2,o-4),s.fillRect(e+2,n+o*.48,i-4,2)),r.hasSill&&(s.fillStyle="#E5DFD5",s.fillRect(e-3,n+o,i+6,4),s.fillStyle="rgba(25, 32, 40, 0.22)",s.fillRect(e-2,n+o+4,i+4,3)),r.lit){const h=t.createLinearGradient(e,n+2,e,n+o-2);h.addColorStop(0,r.litColor),h.addColorStop(1,"#D99B4E"),t.fillStyle=h,t.fillRect(e+3,n+3,i-6,o-6),r.hasMullion&&(t.fillStyle="#181410",t.fillRect(e+i*.5-1,n+2,2,o-4),t.fillRect(e+2,n+o*.48,i-4,2))}}function v0(){const t=document.createElement("canvas");t.width=t.height=512;const e=t.getContext("2d"),n=document.createElement("canvas");n.width=n.height=512;const i=n.getContext("2d");e.fillStyle="#FFFFFF",e.fillRect(0,0,512,512),Ms(e,512,101,10),i.fillStyle="#000000",i.fillRect(0,0,512,512);const o=4,r=4,a=512/o,l=512/r,c=Dn(2101);for(let h=0;h<r;h++){e.fillStyle="rgba(65, 62, 56, 0.08)",e.fillRect(0,h*l,512,3);for(let u=0;u<o;u++){const f=u*a,p=h*l,g=50,v=62,m=f+(a-g)*.5,d=p+(l-v)*.52,x=c(),y=x<.44,M=x<.28?"#FFE0A3":x<.39?"#FFCC7A":"#FFF1D2";ys(e,i,m,d,g,v,{lit:y,litColor:M,frameColor:"#EAE4DA",glassColor:"#3C5364",hasSill:!0,hasMullion:!0,hasShutters:(h+u)%3===0,shutterColor:"#69797F"})}}return{map:Se(t),emissiveMap:Se(n)}}function x0(){const t=document.createElement("canvas");t.width=t.height=512;const e=t.getContext("2d"),n=document.createElement("canvas");n.width=n.height=512;const i=n.getContext("2d");e.fillStyle="#FFFFFF",e.fillRect(0,0,512,512),Ms(e,512,202,8),i.fillStyle="#000000",i.fillRect(0,0,512,512);const o=4,r=4,a=512/o,l=512/r,c=Dn(3202);for(let h=0;h<r;h++){const u=h*l;e.fillStyle="#D8D4CC",e.fillRect(0,u,512,10),e.fillStyle="rgba(30, 38, 48, 0.20)",e.fillRect(0,u+10,512,5);for(let f=0;f<o;f++){const p=f*a;e.fillStyle="rgba(40, 48, 58, 0.07)",e.fillRect(p,u+10,6,l-10);const g=76,v=68,m=p+(a-g)*.5,d=u+28,x=c(),y=x<.42,M=x<.24?"#FFD891":x<.35?"#FFF0CE":"#CBE4F5";ys(e,i,m,d,g,v,{lit:y,litColor:M,frameColor:"#C5C9CE",glassColor:"#364F63",hasSill:!0,hasMullion:!0}),e.fillStyle="rgba(46, 56, 66, 0.45)",e.fillRect(m-4,d+v-18,g+8,3)}}return{map:Se(t),emissiveMap:Se(n)}}function _0(){const t=document.createElement("canvas");t.width=t.height=512;const e=t.getContext("2d"),n=document.createElement("canvas");n.width=n.height=512;const i=n.getContext("2d");e.fillStyle="#FFFFFF",e.fillRect(0,0,512,512),Ms(e,512,303,9),i.fillStyle="#000000",i.fillRect(0,0,512,512);const o=4,r=4,a=512/o,l=512/r,c=Dn(4303);for(let h=0;h<r;h++){const u=h*l,f=h===r-1;e.fillStyle="#D5CFC5",e.fillRect(0,u,512,9),e.fillStyle="rgba(34, 42, 52, 0.16)",e.fillRect(0,u+9,512,4);for(let p=0;p<o;p++){const g=p*a;if(f){const v=g+10,m=u+20,d=a-20,x=l-28;e.fillStyle="#384652",e.fillRect(v-3,m-3,d+6,x+6),e.fillStyle="#2A4052",e.fillRect(v,m,d,x),e.fillStyle="rgba(205, 232, 248, 0.22)",e.beginPath(),e.moveTo(v+6,m+x),e.lineTo(v+34,m),e.lineTo(v+52,m),e.lineTo(v+24,m+x),e.closePath(),e.fill(),c()<.78&&(i.fillStyle=c()<.65?"#FFE2A8":"#FFEFC8",i.fillRect(v+4,m+5,d-8,x-10))}else{const d=g+(a-66)*.5,x=u+28,y=c();ys(e,i,d,x,66,66,{lit:y<.38,litColor:y<.25?"#FFDF9E":"#D9EEFF",frameColor:"#E2DDD5",glassColor:"#3C5468",hasSill:!0,hasMullion:!0})}}}return{map:Se(t),emissiveMap:Se(n)}}function M0(){const t=document.createElement("canvas");t.width=t.height=512;const e=t.getContext("2d"),n=document.createElement("canvas");n.width=n.height=512;const i=n.getContext("2d");e.fillStyle="#F6F7F9",e.fillRect(0,0,512,512),i.fillStyle="#000000",i.fillRect(0,0,512,512);const o=4,r=4,a=512/o,l=512/r,c=Dn(5404);for(let h=0;h<r;h++){const u=h*l;e.fillStyle="#CBD3DC",e.fillRect(0,u,512,28),e.fillStyle="rgba(28, 40, 56, 0.22)",e.fillRect(0,u+28,512,4);for(let f=0;f<o;f++){const g=f*a+6,v=u+34,m=a-12,d=l-42;e.fillStyle="#335870",e.fillRect(g,v,m,d);const x=e.createLinearGradient(g,v,g+m,v+d);x.addColorStop(0,"rgba(182, 224, 242, 0.42)"),x.addColorStop(.5,"rgba(92, 145, 178, 0.14)"),x.addColorStop(1,"rgba(22, 42, 60, 0.34)"),e.fillStyle=x,e.fillRect(g,v,m,d),e.fillStyle="#DCE3EA",e.fillRect(g+m*.5-1,v,2,d);const y=c();y<.52&&(i.fillStyle=y<.3?"#FFF1C9":y<.44?"#FFD892":"#C8ECFF",i.fillRect(g+3,v+4,m-6,d-8),i.fillStyle="#0F1620",i.fillRect(g+m*.5-1,v,2,d))}}return{map:Se(t),emissiveMap:Se(n)}}function y0(){const t=document.createElement("canvas");t.width=t.height=512;const e=t.getContext("2d"),n=document.createElement("canvas");n.width=n.height=512;const i=n.getContext("2d");e.fillStyle="#F2EFEA",e.fillRect(0,0,512,512);for(let h=0;h<512;h+=16)e.fillStyle="rgba(38, 42, 48, 0.08)",e.fillRect(h,0,4,512),e.fillStyle="rgba(255, 255, 255, 0.08)",e.fillRect(h+4,0,3,512);Ms(e,512,6505,14),i.fillStyle="#000000",i.fillRect(0,0,512,512);const o=4,r=4,a=512/o,l=512/r,c=Dn(6505);for(let h=0;h<r;h++){const u=h*l,f=h===r-1;e.fillStyle="rgba(42, 46, 52, 0.24)",e.fillRect(0,u,512,6);for(let p=0;p<o;p++){const g=p*a;if(f&&p%2===0){const v=g+16,m=u+26,d=a-32,x=l-26;e.fillStyle="#4B5056",e.fillRect(v-4,m-4,d+8,x+4),e.fillStyle="#6C727A",e.fillRect(v,m,d,x);for(let y=m+12;y<m+x;y+=14)e.fillStyle="rgba(28, 32, 38, 0.35)",e.fillRect(v,y,d,2)}else{const v=g+14,m=u+34,d=a-28,x=42,y=c()<.36;ys(e,i,v,m,d,x,{lit:y,litColor:"#FFD68A",frameColor:"#666E76",glassColor:"#374650",hasMullion:!0})}}}return{map:Se(t),emissiveMap:Se(n)}}function S0(){const t=document.createElement("canvas");t.width=t.height=512;const e=t.getContext("2d"),n=document.createElement("canvas");n.width=n.height=512;const i=n.getContext("2d");e.fillStyle="#B8CFD8",e.fillRect(0,0,512,512),i.fillStyle="#000000",i.fillRect(0,0,512,512);const o=4,r=4,a=512/o,l=512/r,c=Dn(7606);for(let h=0;h<r;h++){const u=h*l;e.fillStyle="#7E98A6",e.fillRect(0,u,512,24),e.fillStyle="#DCE4EA",e.fillRect(0,u+24,512,4);for(let f=0;f<o;f++){const p=f*a;e.fillStyle="#E2E9EE",e.fillRect(p,u,5,l),e.fillStyle="rgba(30, 46, 58, 0.25)",e.fillRect(p+5,u,2,l);const g=p+8,v=u+30,m=a-12,d=l-34,x=e.createLinearGradient(g,v,g+m*.4,v+d);x.addColorStop(0,"#E0F2F8"),x.addColorStop(.45,"#9BC1CF"),x.addColorStop(1,"#587F92"),e.fillStyle=x,e.fillRect(g,v,m,d),e.fillStyle="rgba(226, 236, 242, 0.72)",e.fillRect(g+m*.5-1,v,2,d);const y=c();y<.48&&(i.fillStyle=y<.22?"#E2F3FF":y<.38?"#FFF3D4":"#FFE0A6",i.fillRect(g+2,v+3,m-4,d-6),i.fillStyle="#0A121A",i.fillRect(g+m*.5-1,v,2,d))}}return{map:Se(t),emissiveMap:Se(n)}}function b0(){const t=document.createElement("canvas");t.width=t.height=512;const e=t.getContext("2d"),n=document.createElement("canvas");n.width=n.height=512;const i=n.getContext("2d");e.fillStyle="#FFFFFF",e.fillRect(0,0,512,512),Ms(e,512,8707,7),i.fillStyle="#000000",i.fillRect(0,0,512,512);const o=4,r=4,a=512/o,l=512/r,c=Dn(8707);for(let h=0;h<r;h++){const u=h*l;e.fillStyle="#DEDAD2",e.fillRect(0,u,512,12),e.fillStyle="rgba(30, 38, 48, 0.14)",e.fillRect(0,u+12,512,4);for(let f=0;f<o;f++){const p=f*a,g=62,v=70,m=p+(a-g)*.5,d=u+28,x=c();ys(e,i,m,d,g,v,{lit:x<.55,litColor:x<.3?"#FFF0C6":"#DCEEFF",frameColor:"#E5E1D8",glassColor:"#3B566C",hasSill:!0,hasMullion:!0})}}return{map:Se(t),emissiveMap:Se(n)}}function E0(){const t=document.createElement("canvas");t.width=t.height=128;const e=t.getContext("2d");e.clearRect(0,0,128,128);const n=128*.5,i=e.createRadialGradient(n,n,128*.24,n,n,128*.5);return i.addColorStop(0,"rgba(18, 26, 30, 0.44)"),i.addColorStop(.62,"rgba(18, 26, 30, 0.28)"),i.addColorStop(.86,"rgba(18, 26, 30, 0.08)"),i.addColorStop(1,"rgba(18, 26, 30, 0.0)"),e.fillStyle=i,e.fillRect(0,0,128,128),Se(t,!1)}function w0(){const t=document.createElement("canvas");t.width=t.height=128;const e=t.getContext("2d"),n=128*.5,i=e.createRadialGradient(n,n,2,n,n,n);return i.addColorStop(0,"rgba(255, 224, 152, 0.85)"),i.addColorStop(.32,"rgba(255, 198, 108, 0.42)"),i.addColorStop(.7,"rgba(245, 168, 76, 0.12)"),i.addColorStop(1,"rgba(245, 168, 76, 0.0)"),e.fillStyle=i,e.fillRect(0,0,128,128),Se(t,!1)}function T0(){const t=document.createElement("canvas");t.width=t.height=256;const e=t.getContext("2d");e.fillStyle="#E6E8EC",e.fillRect(0,0,256,256);const n=Dn(9909);for(let i=0;i<4200;i++){const o=n()*256,r=n()*256,a=1+n()*2.5,l=195+Math.floor(n()*48);e.fillStyle=`rgb(${l},${l},${l+2})`,e.fillRect(o,r,a,a)}return e.fillStyle="rgba(140, 148, 160, 0.12)",e.fillRect(0,256*.22,256,256*.12),e.fillRect(0,256*.66,256,256*.12),Se(t,!0)}function A0(){const s=v0(),t=x0(),e=_0(),n=M0(),i=y0(),o=S0(),r=b0(),a=E0(),l=w0(),c=T0(),h=[s.map,s.emissiveMap,t.map,t.emissiveMap,e.map,e.emissiveMap,n.map,n.emissiveMap,i.map,i.emissiveMap,o.map,o.emissiveMap,r.map,r.emissiveMap,a,l,c];return{res_low:s,res_high:t,com_low:e,com_high:n,ind:i,office:o,civic:r,groundAO:a,lampGlow:l,asphalt:c,dispose:()=>{for(const u of h)u.dispose()}}}function th(s){let t=0;const e=[];for(const c of s){const h=c.index?c.toNonIndexed():c.clone();h.attributes.normal||h.computeVertexNormals();const u=h.attributes.position.count;if(h.attributes.uv||h.setAttribute("uv",new pe(new Float32Array(u*2),2)),!h.attributes.color){const f=new Float32Array(u*3);f.fill(1),h.setAttribute("color",new pe(f,3))}e.push(h),t+=u}const n=new Float32Array(t*3),i=new Float32Array(t*3),o=new Float32Array(t*2),r=new Float32Array(t*3);let a=0;for(const c of e){const h=c.attributes.position,u=c.attributes.normal,f=c.attributes.uv,p=c.attributes.color,g=h.count;n.set(h.array,a*3),i.set(u.array,a*3),o.set(f.array,a*2),r.set(p.array,a*3),a+=g,c.dispose()}const l=new fe;return l.setAttribute("position",new pe(n,3)),l.setAttribute("normal",new pe(i,3)),l.setAttribute("uv",new pe(o,2)),l.setAttribute("color",new pe(r,3)),l}function vs(s,t,e,n=.74,i=1.04){const o=s.attributes.position,r=o.count,a=s.attributes.color,l=a?a.array:new Float32Array(r*3),c=Math.max(1e-4,e-t);for(let h=0;h<r;h++){const u=o.getY(h),f=Math.max(0,Math.min(1,(u-t)/c)),p=n+(i-n)*Math.pow(f,.72);a?(l[h*3]*=p,l[h*3+1]*=p,l[h*3+2]*=p):(l[h*3]=p,l[h*3+1]=p,l[h*3+2]=p)}return a?a.needsUpdate=!0:s.setAttribute("color",new pe(l,3)),s}function wo(s,t){const e=new fe;e.setAttribute("position",new Yt(s,3)),e.computeVertexNormals();const n=s.length/3,i=new Float32Array(n*2);for(let o=0;o<n;o++)i[o*2]=s[o*3]+.5,i[o*2+1]=s[o*3+2]+.5;return e.setAttribute("uv",new pe(i,2)),vs(e,-.5,.5,.84,1.03),e}function gn(s,t,e,n){s.push(t[0],t[1],t[2],e[0],e[1],e[2],n[0],n[1],n[2])}function tn(s,t,e,n,i){gn(s,t,e,n),gn(s,t,n,i)}function C0(){const s=[-.5,-.5,.5],t=[.5,-.5,.5],e=[.5,-.5,-.5],n=[-.5,-.5,-.5],i=[-.5,.5,0],o=[.5,.5,0],r=[];return tn(r,s,t,o,i),tn(r,e,n,i,o),gn(r,t,e,o),gn(r,n,s,i),tn(r,n,e,t,s),wo(r)}function R0(s=.52){const t=Math.max(.08,Math.min(.46,s*.5)),e=[-.5,-.5,.5],n=[.5,-.5,.5],i=[.5,-.5,-.5],o=[-.5,-.5,-.5],r=[-t,.5,0],a=[t,.5,0],l=[];return tn(l,e,n,a,r),tn(l,i,o,r,a),gn(l,n,i,a),gn(l,o,e,r),tn(l,o,i,n,e),wo(l)}function P0(){const s=[-.5,-.5,.5],t=[.5,-.5,.5],e=[.5,-.5,-.5],n=[-.5,-.5,-.5],i=[.5,.5,-.5],o=[-.5,.5,-.5],r=[];return tn(r,s,t,i,o),tn(r,e,n,o,i),gn(r,t,e,i),gn(r,n,s,o),tn(r,n,e,t,s),wo(r)}function D0(s=3){const t=[],e=1/s;for(let n=0;n<s;n++){const i=-.5+n*e,o=i+e,r=[i,-.5,.5],a=[o,-.5,.5],l=[o,-.5,-.5],c=[i,-.5,-.5],h=[i+e*.14,.5,.5],u=[i+e*.14,.5,-.5];tn(t,a,l,u,h),tn(t,c,r,h,u),gn(t,r,a,h),gn(t,l,c,u),tn(t,c,l,a,r)}return wo(t)}function Ta(){const s=[],t=new ai(2.35,1);t.scale(1.06,.92,1.02),t.translate(0,4.75,0),s.push(t);const e=new ai(1.75,1);e.scale(1,.86,.98),e.translate(1.25,3.85,.55),s.push(e);const n=new ai(1.65,1);n.scale(.98,.88,1.02),n.translate(-1.15,3.95,-.65),s.push(n);const i=new ai(1.45,1);i.scale(1,.9,1),i.translate(-.2,5.9,.35),s.push(i);const o=th(s);for(const r of s)r.dispose();return vs(o,2.2,7.2,.62,1.08)}function eh(){const s=[],t=new di(2.55,3.8,7,1,!1);t.translate(0,3.4,0),s.push(t);const e=new di(2.05,3.5,7,1,!1);e.rotateY(.45),e.translate(0,5.5,0),s.push(e);const n=new di(1.38,3.1,7,1,!1);n.rotateY(.9),n.translate(0,7.55,0),s.push(n);const i=th(s);for(const o of s)o.dispose();return vs(i,1.5,9.1,.58,1.1)}function Aa(s,t,e=.24){s.customProgramCacheKey=()=>`tidelight_tree_sway_${e.toFixed(2)}`,s.onBeforeCompile=n=>{n.uniforms.uWindTime=t,n.vertexShader=n.vertexShader.replace("#include <common>",`#include <common>
uniform float uWindTime;`).replace("#include <begin_vertex>",`#include <begin_vertex>
float tlHeightMask = max(0.0, (position.y - 1.4) / 6.0);
float tlPhase = 0.0;
#ifdef USE_INSTANCING
  tlPhase = instanceMatrix[3].x * 0.09 + instanceMatrix[3].z * 0.07;
#endif
float tlGust = sin(uWindTime * 1.65 + tlPhase) * 0.72 + sin(uWindTime * 2.9 + tlPhase * 1.7) * 0.28;
transformed.x += tlGust * tlHeightMask * tlHeightMask * ${e.toFixed(3)};
transformed.z += cos(uWindTime * 1.35 + tlPhase * 1.15) * tlHeightMask * tlHeightMask * ${(e*.6).toFixed(3)};`)}}const L0=new Map(Object.entries(xc).map(([s,t])=>[t,s])),I0={res_low:["#EAE3D6","#E4D5C6","#D5DDD3","#DFD3C2","#E8DDD2","#D8DCE0"],res_high:["#E2DDD5","#D7D0C6","#D5DBD9","#DFD5CA","#D0D6DC"],com_low:["#E5D8C5","#C7967E","#CED8CE","#DFD3C0","#C6D2DC","#EAE4D8"],com_high:["#CED6DE","#DCD6CC","#9FB8C8","#BCC8D0"],ind:["#B8986E","#747D86","#9E6954","#8B857B","#7F868D"],office:["#8AC0CF","#7CB0C4","#96C3CE","#A6C9D4","#78A6BA"]},Zl=["#A25D49","#566778","#82614B","#666B72","#926D56"],Ks=["#B85C4B","#48799B","#4F8066","#C29648","#7D6384"],jl=["#646D76","#975D4B","#586774","#7B6756"],Kl=["#2E4A62","#8F4D3F","#3E6A58","#997536","#4E5866"];function Ii(s,t,e,n,i,o,r){const a=Math.cos(n),l=Math.sin(n);return[s+i*a+r*l,t+o,e-i*l+r*a]}class F0{group=new ye;lastRevision=-1;textures=null;facadeMats=[];turbineRotors=[];exclusionPoints=[];smokeSources=[];smokeMesh=null;smokeTime=0;enableSmoke=!0;windTimeUniform={value:0};smokeDummy=new qt;setQuality(t){this.enableSmoke=t.enableSmoke,this.smokeMesh&&(this.smokeMesh.visible=this.enableSmoke)}getExclusionPoints(){return this.exclusionPoints}getSharedTextures(){return this.textures||(this.textures=A0()),this.textures}updateFromSnapshot(t){if(t.revision===this.lastRevision)return!1;this.lastRevision=t.revision,this.clear();const e=this.getSharedTextures(),n=t.buildings,i=Math.floor(n.length/_o);if(i===0)return!0;const o=[],r=[],a=[],l=[],c=[],h=[],u=[],f=[],p=[],g=[],v=[],m=[];this.smokeSources=[];const d={res_low:[],res_high:[],com_low:[],com_high:[],ind:[],office:[],civic:[]};this.exclusionPoints=[];const x=(D,C,E,L,S,_,w,R,A,I,z,W,Q=0,k=0,K=0)=>{const[q,ct,xt]=Ii(C,E,L,S,_,w,R);D.push({x:q,y:ct,z:xt,yaw:S+Q,sx:A,sy:I,sz:z,color:W,rx:k,seed:K})},y=(D,C,E,L,S,_,w,R,A,I,z,W,Q=0,k=0)=>{const[K,q,ct]=Ii(C,E,L,S,_,w,R);D.push({x:K,y:q,z:ct,yaw:S,rx:Q,rz:k,radiusTop:A,radiusBottom:I,height:z,color:W})},M=(D,C,E,L,S,_,w,R,A=.55,I=.85)=>{const z=w+I*.5;x(r,D,C,E,L,0,z,-_*.5+A*.5,S,I,A,R),x(r,D,C,E,L,0,z,_*.5-A*.5,S,I,A,R),x(r,D,C,E,L,-S*.5+A*.5,z,0,A,I,Math.max(.4,_-A*2),R),x(r,D,C,E,L,S*.5-A*.5,z,0,A,I,Math.max(.4,_-A*2),R)};for(let D=0;D<i;D++){const C=D*_o,E=Math.round(n[C]),L=Math.round(n[C+1]),S=Math.round(n[C+2]),_=Math.max(1,Math.round(n[C+3])),w=n[C+4],R=n[C+5],A=n[C+6],I=n[C+7],z=Math.max(4,n[C+8]),W=Math.max(4,n[C+9]),Q=Math.max(2.5,n[C+10]),k=Math.max(.15,Math.min(1,n[C+11])),K=Math.round(n[C+12]),q=Math.abs(Math.round(n[C+13])),ct=((E*.6180339887+q*.137)%1+1)%1,xt=(K&dn.ABANDONED)!==0;if(this.exclusionPoints.push({x:w,z:A,r:Math.max(z,W)*.66+2.5}),v.push({x:w,y:R+.08,z:A,yaw:I,sx:z*1.16+2.2,sz:W*1.16+2.2}),L===1){const st=L0.get(S)??"park_small";this.buildPloppable(st,w,R,A,I,z,W,Q,q,ct,o,d,r,a,l,c,h,u,f,p,g,m,x,y,M);continue}const Y=fo[S]??"res_low";if(Y==="none")continue;const U=I0[Y];let X=U[(q+_)%U.length];xt?X="#747B84":k<.95&&(X="#D2C3AA");const $=z*.88,N=W*.88;if(k<.95){const st=Math.max(2.6,Q*(.28+.72*k));o.push({x:w,y:R-1.85,z:A,yaw:I,sx:$+.6,sy:4.2,sz:N+.6,color:"#97938A"}),r.push({x:w,y:R+st*.5,z:A,yaw:I,sx:$*.94,sy:st,sz:N*.94,color:"#CFC4B0"}),a.push({x:w,y:R+st+.6,z:A,yaw:I,sx:$*.98,sy:.45,sz:N*.98,color:"#C59A4B"});continue}if(Y==="res_low"){const st=xt?"#5E646C":Zl[(q+E)%Zl.length],rt=xt?"#6F757D":"#EDE8DF",ft=(q+E)%3;o.push({x:w,y:R-1.9,z:A,yaw:I,sx:z*.96,sy:4.1,sz:W*.96,color:"#889677"});const ht=z>14?.68:.78,at=W>14?.62:.74,lt=Math.min(14.5,z*ht),F=Math.min(11.5,W*at),wt=Math.max(4.6,Math.min(11.5,Q*(.76+_*.06))),pt=z>14?(q%2===0?-1:1)*(z-lt)*.14:0,yt=-(W-F)*.16;x(o,w,R,A,I,pt,-1.65,yt,lt+.55,4.1,F+.55,"#99948C"),x(d.res_low,w,R,A,I,pt,wt*.5+.35,yt,lt,wt,F,X,0,0,ct);const mt=wt+.35;if(ft===0){const b=Math.min(3.8,Math.max(2.1,F*.34)),V=lt<F?Math.PI*.5:0,nt=V===0?lt+.9:F+.9,it=V===0?F+1:lt+1;x(c,w,R,A,I,pt,mt+b*.5,yt,nt,b,it,st,V),x(r,w,R,A,I,pt,mt+b+.08,yt,V===0?nt+.1:.34,.26,V===0?.34:nt+.1,"#4C5056"),x(r,w,R,A,I,pt+lt*.28,mt+b*.62,yt+F*.16,1.05,b+1.35,1.05,"#8E5B4C")}else if(ft===1){const b=Math.min(3.5,Math.max(1.9,Math.min(lt,F)*.32));x(h,w,R,A,I,pt,mt+b*.5,yt,lt+1.05,b,F+1.05,st),x(r,w,R,A,I,pt-lt*.25,mt+b*.58,yt-F*.1,.95,b+1.15,.95,"#9A8A7B")}else{const b=Math.min(2.2,Math.max(1.2,F*.18));if(x(u,w,R,A,I,pt,mt+b*.5,yt,lt+1.15,b,F+1.15,st),_>=2||z>=12){const V=lt*.58,nt=F*.64,it=2.6+_*.35;x(d.res_low,w,R,A,I,pt-lt*.16,mt+it*.45,yt+F*.12,V,it,nt,rt,0,0,(ct+.31)%1),x(u,w,R,A,I,pt-lt*.16,mt+it+.45,yt+F*.12,V+.9,1,nt+.9,"#596571",Math.PI)}}const Ut=Math.min(4.2,lt*.42),gt=2,P=yt-F*.5-gt*.45;if(x(r,w,R,A,I,pt,.55,P,Ut,.65,gt,"#CEC7BA"),x(u,w,R,A,I,pt,3.1,P-.1,Ut+.5,.75,gt+.55,st,Math.PI),x(r,w,R,A,I,pt-Ut*.42,1.85,P-gt*.36,.28,2.2,.28,rt),x(r,w,R,A,I,pt+Ut*.42,1.85,P-gt*.36,.28,2.2,.28,rt),z>=13&&ft!==2){const b=Math.min(5.8,(z-lt)*.82),V=F*.72,nt=Math.max(3.6,wt*.62),it=pt<=0?1:-1,et=pt+it*(lt*.5+b*.45);x(d.res_low,w,R,A,I,et,nt*.5+.35,yt+F*.08,b,nt,V,rt,0,0,(ct+.57)%1),x(c,w,R,A,I,et,nt+.35+.95,yt+F*.08,b+.7,1.9,V+.7,st)}if(W>=11||z>=12){const b=(q+E)%2===0?"#5D8052":"#B6A78E",V=(q+E)%2===0?.95:.78,nt=.2+V*.5,it=z*.46,et=W*.46;if(x(r,w,R,A,I,0,nt,et,z*.92,V,.45,b),x(r,w,R,A,I,-it,nt,et*.25,.45,V,W*.65,b),x(r,w,R,A,I,it,nt,et*.25,.45,V,W*.65,b),W>=12){(q+E)%3===0&&(x(r,w,R,A,I,-z*.18,.32,et-2.4,3.8,.3,2.2,"#7B6753"),x(r,w,R,A,I,-z*.18,.5,et-2.4,3.3,.28,1.7,"#648E53"));const[Rt,_t,Tt]=Ii(w,R+.2,A,I,(q%2===0?1:-1)*z*.26,0,et-2.3);m.push({x:Rt,y:_t,z:Tt,scale:.55+q%3*.12,conifer:(E+q)%4===0,color:(E+q)%7===0?"#CFA7AB":"#58824D"})}}continue}if(Y==="res_high"){const st=Math.max(16,Q*(.95+(_-1)*.12)),rt=xt?"#687078":"#CFC9BE",ft=xt?"#586068":"#52616E";o.push({x:w,y:R-1.85,z:A,yaw:I,sx:$+.7,sy:4.2,sz:N+.7,color:"#949088"});const ht=3.6;x(r,w,R,A,I,0,ht*.5+.2,0,$*1.02,ht,N*1.02,"#B6B1A8"),x(l,w,R,A,I,0,ht*.5+.2,-N*.51,$*.56,ht*.78,.45,"#3E5B6E");const at=_>=3?st*.74:st-ht,lt=ht+.2;x(d.res_high,w,R,A,I,0,lt+at*.5,0,$,at,N,X,0,0,ct);const F=3.4,wt=Math.min(10,Math.max(2,Math.floor(at/F))),pt=$>=16?2:1,yt=pt===2?$*.34:$*.58;for(let Ut=1;Ut<wt;Ut++){const gt=lt+Ut*F;if(gt>lt+at-1.5)break;for(let P=0;P<pt;P++){const b=pt===2?P===0?-$*.24:$*.24:0;x(r,w,R,A,I,b,gt,-N*.5-.52,yt,.34,1.08,rt),x(a,w,R,A,I,b,gt+.55,-N*.5-.96,yt,.75,.18,ft),N>=10&&(x(r,w,R,A,I,b,gt,N*.5+.52,yt,.34,1.08,rt),x(a,w,R,A,I,b,gt+.55,N*.5+.96,yt,.75,.18,ft))}}let mt=lt+at;if(M(w,R,A,I,$,N,mt,rt,.55,.9),_>=3){const Ut=Math.max(6.5,st*.28),gt=$*.76,P=N*.76;x(d.res_high,w,R,A,I,0,mt+Ut*.5,0,gt,Ut,P,X,0,0,(ct+.23)%1),mt+=Ut,M(w,R,A,I,gt,P,mt,rt,.5,.85)}x(r,w,R,A,I,-$*.14,mt+1.5,N*.08,$*.3,3,N*.28,"#C8C3BA"),x(a,w,R,A,I,$*.18,mt+.85,-N*.12,2.2,1.4,1.8,"#7A838C");continue}if(Y==="com_low"){const st=xt?"#676D75":Ks[(q+E)%Ks.length],rt=xt?"#5A6068":Kl[(q+E)%Kl.length],ft=Math.max(5.5,Math.min(13.5,Q));o.push({x:w,y:R-1.85,z:A,yaw:I,sx:$+.6,sy:4.2,sz:N+.6,color:"#96928A"});const ht=$>=14.5,at=ht?2:1;for(let lt=0;lt<at;lt++){const F=ht?$*.49:$,wt=ht?lt===0?-$*.255:$*.255:0,pt=(q+E+lt)%3,yt=ht?ft*(lt===0?1.02:.8):ft,mt=lt===0?X:U[(q+_+2)%U.length],Ut=lt===0?st:Ks[(q+E+2)%Ks.length],gt=xt?"#5E646C":jl[(q+E+lt)%jl.length];x(d.com_low,w,R,A,I,wt,yt*.5+.25,0,F,yt,N,xt?"#747B84":mt,0,0,(ct+lt*.37)%1);const P=yt+.25;if(pt===1){const V=Math.min(2.8,Math.max(1.6,Math.min(F,N)*.24));x(h,w,R,A,I,wt,P+V*.5,0,F+.65,V,N+.65,gt)}else pt===2?(x(r,w,R,A,I,wt,P+.35,-N*.5+.28,F+.25,.75,.56,gt),x(r,w,R,A,I,wt,P+.35,N*.5-.28,F+.25,.75,.56,gt),x(r,w,R,A,I,wt-F*.5+.25,P+.35,0,.5,.75,N,gt),x(r,w,R,A,I,wt+F*.5-.25,P+.35,0,.5,.75,N,gt),x(r,w,R,A,I,wt,P+1.15,N*.1,F*.58,1.9,N*.52,"#9E8366"),x(u,w,R,A,I,wt,P+2.4,N*.1,F*.64,.75,N*.58,gt)):(x(r,w,R,A,I,wt,P+.55,-N*.5+.3,F+.25,1.15,.6,"#C8C0B2"),x(r,w,R,A,I,wt,P+.35,N*.5-.28,F+.2,.75,.56,"#C8C0B2"),x(r,w,R,A,I,wt-F*.5+.25,P+.35,0,.5,.75,N,"#C8C0B2"),x(r,w,R,A,I,wt+F*.5-.25,P+.35,0,.5,.75,N,"#C8C0B2"),x(a,w,R,A,I,wt+F*.16,P+.55,N*.14,1.6,.95,1.35,"#76808A"));const b=Math.min(3.55,yt*.46);x(u,w,R,A,I,wt,b,-N*.5-.68,F*.94,.84,1.42,Ut,Math.PI),(!ht||lt===0)&&x(u,w,R,A,I,wt-F*.5-.52,b,-N*.1,N*.58,.76,1.1,Ut,-Math.PI*.5),x(r,w,R,A,I,wt,b+.85,-N*.5-.16,F*.64,.78,.28,rt),x(r,w,R,A,I,wt,b+.85,-N*.5-.32,F*.38,.2,.08,"#F2ECE1")}continue}if(Y==="com_high"){const st=Math.min(8.5,Q*.36),rt=Math.max(10,Q-st),ft=xt?"#6C737C":"#D5D9DF";o.push({x:w,y:R-1.85,z:A,yaw:I,sx:$+.8,sy:4.2,sz:N+.8,color:"#919498"}),x(d.com_high,w,R,A,I,0,st*.5+.25,0,$,st,N,X,0,0,ct),x(a,w,R,A,I,0,3.8,-N*.5-1.1,$*.68,.38,2.2,"#4A5B6B"),x(l,w,R,A,I,0,4.02,-N*.5-1.05,$*.62,.18,1.9,"#7CB2C8");const ht=$*.82,at=N*.8,lt=st+.25;x(d.com_high,w,R,A,I,0,lt+rt*.5,N*.04,ht,rt,at,X,0,0,(ct+.41)%1),x(l,w,R,A,I,0,lt+rt*.5,N*.04-at*.5-.22,ht*.34,rt*.94,.45,"#4C829E");const F=lt+rt;M(w,R,A,I,ht,at,F,ft,.6,1.05),x(l,w,R,A,I,0,F+1.15,N*.04,ht*.44,1.8,at*.34,"#6A9DB4");continue}if(Y==="ind"){const st=Math.max(6.2,Math.min(14,Q*.88)),rt=xt?"#626870":"#7B848D",ft=$>=12||q%2===0,ht=ft?$*.72:$,at=ft?-$*.13:0;o.push({x:w,y:R-1.85,z:A,yaw:I,sx:$+.8,sy:4.2,sz:N+.8,color:"#84837E"}),x(d.ind,w,R,A,I,at,st*.5+.25,0,ht,st,N*.9,X,0,0,ct);const lt=st+.25;if(q%2===0){const F=Math.min(3.2,Math.max(1.8,ht*.16));x(f,w,R,A,I,at,lt+F*.5,0,ht+.3,F,N*.92,rt)}else x(r,w,R,A,I,at,lt+.35,0,ht+.3,.7,N*.92,rt),x(r,w,R,A,I,at,lt+1.5,0,ht*.78,1.7,N*.36,"#6D767F"),x(c,w,R,A,I,at,lt+2.8,0,ht*.82,1.1,N*.42,rt);if(x(a,w,R,A,I,at,3.9,-N*.45-.85,ht*.65,.35,1.7,"#5E666E"),ft){const F=$*.34,wt=Math.min(2.3,$*.12),pt=st*.86;y(p,w,R,A,I,F,pt*.5+.25,-N*.18,wt,wt,pt,"#B8BEC4"),y(g,w,R,A,I,F,pt+.75,-N*.18,.2,wt*1.04,1,"#969EA6"),N>=12&&y(p,w,R,A,I,F,pt*.45+.25,N*.2,wt*.9,wt*.9,pt*.9,"#A5AEB6")}if(!xt&&(q%2===0||_>=2)){const F=6.5+_*2.5,wt=at+ht*.32,pt=N*.26;y(p,w,R,A,I,wt,lt+F*.5,pt,.55,.95,F,q%3===0?"#9E5E4B":"#737C86"),y(p,w,R,A,I,wt,lt+F-1.4,pt,.66,.7,1.1,"#D4CEC4");const[yt,mt,Ut]=Ii(w,R,A,I,wt,lt+F+.6,pt);this.smokeSources.push({x:yt,y:mt,z:Ut,scale:.95,phase:ct*Math.PI*2})}continue}if(Y==="office"){const st=.88+(q+E)%4*.14,rt=Math.max(22,Q*(1.04+(_-1)*.18)*st),ft=xt?"#6C737B":"#D5DDE4";o.push({x:w,y:R-1.85,z:A,yaw:I,sx:$+.8,sy:4.2,sz:N+.8,color:"#8F959C"});const ht=4.6;x(r,w,R,A,I,0,ht*.5+.25,0,$*1.02,ht,N*1.02,"#C7CFD6"),x(l,w,R,A,I,0,ht*.5+.25,0,$*.9,ht*.82,N*1.04,"#4B7890");const at=ht+.25,lt=_>=2||(q+E)%2===0,F=lt?rt*.68:rt-ht;x(d.office,w,R,A,I,0,at+F*.5,0,$*.94,F,N*.94,X,0,0,ct);const wt=$*.47,pt=N*.47;for(const mt of[-wt,wt])for(const Ut of[-pt,pt])x(r,w,R,A,I,mt,at+F*.5,Ut,.72,F+.4,.72,ft);x(r,w,R,A,I,0,at+F*.5,0,$*.97,.48,N*.97,ft);let yt=at+F;if(M(w,R,A,I,$*.94,N*.94,yt,ft,.52,.9),lt){const mt=Math.max(7.5,rt*.34),Ut=$*.68,gt=N*.68;x(d.office,w,R,A,I,0,yt+mt*.5,0,Ut,mt,gt,X,0,0,(ct+.52)%1),yt+=mt,M(w,R,A,I,Ut,gt,yt,ft,.48,1.05)}x(r,w,R,A,I,0,yt+1.6,0,$*.38,3,N*.38,"#C3CDD6"),(_>=3||rt>32)&&y(p,w,R,A,I,0,yt+6.4,0,.14,.32,7.2,"#E2E9F0")}}return this.addSolidBoxInstanced(o,.94,.02,.78),this.addSolidBoxInstanced(r,.82,.06,.84),this.addSolidBoxInstanced(a,.52,.36,.85),this.addSolidBoxInstanced(l,.24,.42,.86),this.addFacadeInstanced("res_low",d.res_low,e.res_low,3,3.1,.82,.04,"#8A857C"),this.addFacadeInstanced("res_high",d.res_high,e.res_high,3.3,3.4,.78,.06,"#7E8082"),this.addFacadeInstanced("com_low",d.com_low,e.com_low,3.2,3.6,.76,.06,"#76787A"),this.addFacadeInstanced("com_high",d.com_high,e.com_high,3.6,3.8,.42,.22,"#868E96"),this.addFacadeInstanced("ind",d.ind,e.ind,3.8,4.2,.86,.12,"#6E747B"),this.addFacadeInstanced("office",d.office,e.office,3.4,3.6,.2,.24,"#8B96A0"),this.addFacadeInstanced("civic",d.civic,e.civic,3.4,3.6,.76,.08,"#908F8A"),this.addCustomPolyInstanced(c,C0(),.84,.04),this.addCustomPolyInstanced(h,R0(.5),.84,.04),this.addCustomPolyInstanced(u,P0(),.8,.06),this.addCustomPolyInstanced(f,D0(3),.78,.14),this.addCylinderInstanced(p,!1),this.addCylinderInstanced(g,!0),this.addGroundAOInstanced(v,e.groundAO),this.addYardTreesInstanced(m),this.buildSmokeInstanced(),!0}buildPloppable(t,e,n,i,o,r,a,l,c,h,u,f,p,g,v,m,d,x,y,M,D,C,E,L,S){if(t==="wind_turbine"){u.push({x:e,y:n-1.8,z:i,yaw:o,sx:6.8,sy:4,sz:6.8,color:"#ABA79E"}),L(M,e,n,i,o,0,15,0,.65,1.45,30,"#ECEFF3"),E(p,e,n,i,o,0,30.2,.3,2.1,2,4.8,"#E4EAF0"),L(D,e,n,i,o,0,30.2,2.9,.15,.95,1.8,"#EEF2F6",Math.PI*.5);const _=this.createWindRotor();_.position.set(e,n+30.2,i),_.rotation.y=o,_.children[0].rotation.z=c*.9,this.turbineRotors.push(_.children[0]),this.group.add(_);return}if(t==="solar_plant"){u.push({x:e,y:n-1.85,z:i,yaw:o,sx:r,sy:4.1,sz:a,color:"#ABA599"}),E(f.civic,e,n,i,o,-r*.34,2.2,-a*.3,7.5,4,6.2,"#E5E8EC",0,0,h),E(p,e,n,i,o,-r*.34,4.4,-a*.3,7.9,.45,6.6,"#6E7C8A");const _=3,w=4;for(let R=0;R<_;R++)for(let A=0;A<w;A++){if(R===0&&A===0)continue;const I=-r*.36+A*(r*.24),z=-a*.3+R*(a*.3);E(g,e,n,i,o,I,1,z,.55,1.8,.55,"#8A949E"),E(v,e,n,i,o,I,2.15,z,5.8,.22,4,"#264468",0,.46),E(p,e,n,i,o,I,2.02,z,6,.14,4.2,"#BCC5CE",0,.46)}return}if(t==="coal_plant"){u.push({x:e,y:n-1.85,z:i,yaw:o,sx:r*1.02,sy:4.2,sz:a*1.02,color:"#7D7A74"}),E(f.ind,e,n,i,o,-r*.14,7.8,0,r*.58,15.2,a*.72,"#925B4B",0,0,h),E(y,e,n,i,o,-r*.14,16.5,0,r*.6,2.4,a*.74,"#6B727A"),E(f.ind,e,n,i,o,r*.28,4.6,a*.06,r*.32,8.8,a*.6,"#747D86",0,0,(h+.3)%1),E(x,e,n,i,o,r*.28,9.7,a*.06,r*.34,1.5,a*.62,"#626B74"),E(g,e,n,i,o,r*.22,1.2,-a*.34,7.5,2,5.5,"#3B3F44");for(const _ of[-r*.24,r*.02]){L(M,e,n,i,o,_,18,-a*.16,1.25,2.15,24,"#858B92"),L(M,e,n,i,o,_,26.2,-a*.16,1.4,1.5,2.4,"#B85442"),L(M,e,n,i,o,_,22.8,-a*.16,1.55,1.65,2,"#E2DDD5");const[w,R,A]=Ii(e,n,i,o,_,30.5,-a*.16);this.smokeSources.push({x:w,y:R,z:A,scale:1.45,phase:(_+h*10)*.7})}return}if(t==="water_pump"){u.push({x:e,y:n-1.9,z:i,yaw:o,sx:r,sy:4.4,sz:a,color:"#9DA2A6"}),E(f.civic,e,n,i,o,-1.6,3.9,0,r*.62,7.2,a*.68,"#E4E9EE",0,0,h),E(m,e,n,i,o,-1.6,8.7,0,r*.68,2.5,a*.74,"#3B82AD"),L(M,e,n,i,o,r*.28,4.2,-1.2,2.2,2.2,7.8,"#4692BF"),L(D,e,n,i,o,r*.28,8.6,-1.2,.2,2.3,1.2,"#35749B"),L(M,e,n,i,o,-2.2,1.4,-a*.56,.65,.65,5.2,"#5E7282",Math.PI*.42),L(M,e,n,i,o,.8,1.4,-a*.56,.65,.65,5.2,"#5E7282",Math.PI*.42);return}if(t==="water_tower"){u.push({x:e,y:n-1.85,z:i,yaw:o,sx:r*.82,sy:4.1,sz:a*.82,color:"#9D9A92"});const _=3.2;for(const[w,R]of[[-_,-_],[_,-_],[-_,_],[_,_]])L(M,e,n,i,o,w*.85,7.6,R*.85,.34,.44,15.2,"#8F99A3");L(M,e,n,i,o,0,7.8,0,.85,.95,15.2,"#6E7A85"),E(g,e,n,i,o,0,7.5,0,_*1.85,.4,_*1.85,"#9BA5AE"),E(g,e,n,i,o,0,14.6,0,_*2.1,.55,_*2.1,"#AEB7C0"),L(M,e,n,i,o,0,18.2,0,4.9,4.7,6.8,"#DDE5EC"),L(M,e,n,i,o,0,18.2,0,5.02,5.02,1.5,"#4692BF"),L(D,e,n,i,o,0,23,0,.2,5.2,2.9,"#3B7EA8");return}if(t==="sewage_outlet"){u.push({x:e,y:n-1.9,z:i,yaw:o,sx:r,sy:4.4,sz:a,color:"#8A8984"}),E(p,e,n,i,o,0,3,1.2,r*.86,5.6,a*.64,"#92969A"),E(p,e,n,i,o,0,5.95,1.2,r*.88,.5,a*.66,"#B88F4A"),L(M,e,n,i,o,0,6.5,1.4,3.6,3.6,1.6,"#7C654B"),L(M,e,n,i,o,-2.8,1.6,-a*.45,1.25,1.25,4.4,"#6A6E72",Math.PI*.5),L(M,e,n,i,o,2.8,1.6,-a*.45,1.25,1.25,4.4,"#6A6E72",Math.PI*.5);return}if(t==="police_station"){u.push({x:e,y:n-1.85,z:i,yaw:o,sx:r*1.02,sy:4.2,sz:a*1.02,color:"#999791"}),E(f.civic,e,n,i,o,0,l*.48+.25,.8,r*.9,l*.92,a*.78,"#E4E7EC",0,0,h),S(e,n,i,o,r*.9,a*.78,l*.94+.25,"#3E6BA8",.65,1.1),E(p,e,n,i,o,0,4.6,-a*.4,r*.44,.8,3.2,"#3E6BA8"),E(p,e,n,i,o,-r*.18,2.2,-a*.45,.55,4.2,.55,"#EAEEF2"),E(p,e,n,i,o,r*.18,2.2,-a*.45,.55,4.2,.55,"#EAEEF2"),E(p,e,n,i,o,r*.22,l+1.1,1,3.4,2,3,"#CFD5DC"),L(M,e,n,i,o,r*.22,l+4.8,1,.14,.26,6.2,"#7D8996");return}if(t==="fire_station"){u.push({x:e,y:n-1.85,z:i,yaw:o,sx:r*1.02,sy:4.2,sz:a*1.02,color:"#99958E"}),E(f.civic,e,n,i,o,-1.5,l*.48+.25,0,r*.78,l*.92,a*.8,"#E5DDD4",0,0,h),S(e,n,i,o,r*.78,a*.8,l*.94+.25,"#B8473B",.6,1.1);for(const R of[-6,-1.5,3])E(p,e,n,i,o,R,2.3,-a*.41,3.3,4,.45,"#C44538"),E(p,e,n,i,o,R,4.45,-a*.42,3.6,.35,.6,"#EBE5DC");const _=4.6,w=l+6.5;E(f.civic,e,n,i,o,r*.35,w*.5+.25,a*.16,_,w,_,"#C45848",0,0,(h+.4)%1),E(d,e,n,i,o,r*.35,w+1.25,a*.16,_+.8,2,_+.8,"#58626C");return}if(t==="clinic"||t==="hospital"){const _=t==="hospital";u.push({x:e,y:n-1.85,z:i,yaw:o,sx:r*1.02,sy:4.2,sz:a*1.02,color:"#9B9DA0"});const w=_?9:l*.85;E(f.civic,e,n,i,o,0,w*.5+.25,0,r*.92,w,a*.8,"#EDF1F4",0,0,h),S(e,n,i,o,r*.92,a*.8,w+.25,"#D5DDE3",.6,.9),E(p,e,n,i,o,0,4.2,-a*.46,r*.36,.55,3.6,"#D9535E"),E(p,e,n,i,o,-r*.15,2.1,-a*.52,.45,4,.45,"#E2E7EC"),E(p,e,n,i,o,r*.15,2.1,-a*.52,.45,4,.45,"#E2E7EC");let R=w+.95;if(_){const I=l-w+4;E(f.office,e,n,i,o,-r*.14,w+.25+I*.5,.5,r*.54,I,a*.58,"#E6EEF2",0,0,(h+.2)%1),S(e,n,i,o,r*.54,a*.58,w+.25+I,"#CFD8E0",.6,1),R=w+.25+I+.65,L(M,e,n,i,o,r*.28,w+.55,0,4.2,4.2,.45,"#59636E"),E(p,e,n,i,o,r*.28-1.2,w+.85,0,.55,.15,3.2,"#F0EFEA"),E(p,e,n,i,o,r*.28+1.2,w+.85,0,.55,.15,3.2,"#F0EFEA"),E(p,e,n,i,o,r*.28,w+.85,0,2.4,.15,.55,"#F0EFEA")}const A=_?-r*.14:0;E(p,e,n,i,o,A,R,0,5.4,.65,1.75,"#D84E58"),E(p,e,n,i,o,A,R,0,1.75,.65,5.4,"#D84E58");return}if(t==="elementary_school"||t==="high_school"){const _=t==="high_school";u.push({x:e,y:n-1.85,z:i,yaw:o,sx:r*1.02,sy:4.2,sz:a*1.02,color:"#C6BEB1"});const w=_?"#D9C2A0":"#E2CCA9",R=_?"#586A7A":"#9E5C49",A=l*.82;E(f.civic,e,n,i,o,0,A*.5+.25,-a*.18,r*.88,A,a*.46,w,0,0,h),E(m,e,n,i,o,0,A+1.55,-a*.18,r*.92,2.7,a*.52,R);const I=A*.82;for(const z of[-1,1])E(f.civic,e,n,i,o,z*r*.33,I*.5+.25,a*.2,r*.24,I,a*.44,w,0,0,(h+z*.2+1)%1),E(d,e,n,i,o,z*r*.33,I+1.2,a*.2,r*.28,2,a*.48,R);E(p,e,n,i,o,0,A+3.4,-a*.26,3.6,3.6,3.6,"#EBE4D8"),E(d,e,n,i,o,0,A+6.1,-a*.26,4.1,2.1,4.1,"#C4923B"),E(p,e,n,i,o,0,.36,a*.24,r*.36,.28,a*.34,"#6E9A74");return}if(t==="park_small"||t==="park_plaza"){const _=t==="park_plaza";if(u.push({x:e,y:n-1.9,z:i,yaw:o,sx:r,sy:4.2,sz:a,color:"#BCB5A8"}),E(p,e,n,i,o,0,.35,0,r*.95,.42,a*.95,"#668E55"),E(p,e,n,i,o,0,.48,0,r*.96,.3,2.6,"#D9D3C7"),E(p,e,n,i,o,0,.48,0,2.6,.3,a*.96,"#D9D3C7"),_)E(p,e,n,i,o,0,.65,0,r*.46,.45,a*.46,"#DFD9CD"),L(M,e,n,i,o,0,1.15,0,3.9,4.2,.9,"#C9C2B4"),L(M,e,n,i,o,0,1.32,0,3.4,3.4,.72,"#4BA6AE"),L(M,e,n,i,o,0,2.35,0,.9,1.4,1.8,"#D5CFC2"),L(M,e,n,i,o,0,3.4,0,1.6,.6,.55,"#DFD9CD");else{E(p,e,n,i,o,0,.65,0,5.2,.42,5.2,"#D7D0C3");for(const[R,A]of[[-1.9,-1.9],[1.9,-1.9],[-1.9,1.9],[1.9,1.9]])E(p,e,n,i,o,R,2,A,.34,2.4,.34,"#8A694D");E(d,e,n,i,o,0,3.9,0,5.8,1.8,5.8,"#9A634C")}const w=_?[[-r*.35,-a*.35,!1,"#58844D"],[r*.35,-a*.35,!0,"#416945"],[-r*.35,a*.35,!0,"#416945"],[r*.35,a*.35,!1,"#CFA8AC"],[0,-a*.38,!1,"#6A9155"],[0,a*.38,!1,"#6A9155"]]:[[-r*.33,-a*.33,!1,"#5A854E"],[r*.33,-a*.33,!0,"#436B46"],[-r*.33,a*.33,!1,"#CFA8AC"],[r*.33,a*.33,!1,"#679054"]];for(const[R,A,I,z]of w){const[W,Q,k]=Ii(e,n+.45,i,o,R,0,A);C.push({x:W,y:Q,z:k,scale:_?.92:.78,conifer:I,color:z})}return}u.push({x:e,y:n-1.85,z:i,yaw:o,sx:r,sy:4.1,sz:a,color:"#786D59"}),E(p,e,n,i,o,0,1,1.2,r*.86,1.6,a*.76,"#8B7D64"),E(p,e,n,i,o,-r*.08,2.25,2,r*.56,1.4,a*.48,"#9D8E73"),E(p,e,n,i,o,r*.16,1.9,-1.5,r*.34,1.1,a*.32,"#7D725D"),E(f.ind,e,n,i,o,-r*.28,2.3,-a*.34,7.2,4,5,"#8A8F94",0,0,h),E(x,e,n,i,o,-r*.28,4.7,-a*.34,7.6,1,5.4,"#677078"),E(p,e,n,i,o,-r*.04,3.45,2.2,2.4,1.3,3.6,"#C99B3E"),E(g,e,n,i,o,0,.95,a*.48,r*.96,1.4,.35,"#6B7075"),E(g,e,n,i,o,-r*.48,.95,0,.35,1.4,a*.96,"#6B7075"),E(g,e,n,i,o,r*.48,.95,0,.35,1.4,a*.96,"#6B7075")}addSolidBoxInstanced(t,e,n,i){if(t.length===0)return;const o=new Te(1,1,1);vs(o,-.5,.5,i,1.02);const r=new he({color:"#ffffff",vertexColors:!0,roughness:e,metalness:n}),a=new se(o,r,t.length);a.castShadow=!0,a.receiveShadow=!0;const l=new qt,c=new J;for(let h=0;h<t.length;h++){const u=t[h];l.position.set(u.x,u.y,u.z),l.rotation.set(u.rx??0,u.yaw,0),l.scale.set(u.sx,u.sy,u.sz),l.updateMatrix(),a.setMatrixAt(h,l.matrix),c.set(u.color),a.setColorAt(h,c)}a.instanceMatrix.needsUpdate=!0,a.instanceColor&&(a.instanceColor.needsUpdate=!0),this.group.add(a)}addFacadeInstanced(t,e,n,i,o,r,a,l){if(e.length===0)return;const c=new Te(1,1,1),h=new Float32Array(e.length*4);for(let d=0;d<e.length;d++){const x=e[d];h[d*4]=x.sx,h[d*4+1]=x.sy,h[d*4+2]=x.sz,h[d*4+3]=x.seed??d*.37%1}c.setAttribute("aBuildingMeta",new ra(h,4));const u=new he({color:"#ffffff",map:n.map,emissive:new J("#FFE0A6"),emissiveMap:n.emissiveMap,emissiveIntensity:0,roughness:r,metalness:a});u.customProgramCacheKey=()=>`tidelight_facade_${t}`,u.onBeforeCompile=d=>{d.uniforms.uBayWidth={value:i},d.uniforms.uFloorHeight={value:o},d.vertexShader=d.vertexShader.replace("#include <uv_pars_vertex>",`#include <uv_pars_vertex>
attribute vec4 aBuildingMeta;
uniform float uBayWidth;
uniform float uFloorHeight;
varying float vRawUvY;
varying float vLightSeed;`).replace("#include <uv_vertex>",`#include <uv_vertex>
vRawUvY = uv.y;
vLightSeed = aBuildingMeta.w;
float tlFaceW = abs(normal.x) > 0.5 ? aBuildingMeta.z : aBuildingMeta.x;
float tlFaceH = aBuildingMeta.y;
float tlBays = max(1.0, floor(tlFaceW / uBayWidth + 0.5));
float tlFloors = max(1.0, floor(tlFaceH / uFloorHeight + 0.5));
float tlUShift = floor(aBuildingMeta.w * 4.0) * 0.25;
vec2 tlScaledUv = vec2(uv.x * (tlBays * 0.25) + tlUShift, uv.y * (tlFloors * 0.25));
#ifdef USE_MAP
  vMapUv = tlScaledUv;
#endif
#ifdef USE_EMISSIVEMAP
  vEmissiveMapUv = tlScaledUv;
#endif`),d.fragmentShader=d.fragmentShader.replace("#include <common>",`#include <common>
varying float vRawUvY;
varying float vLightSeed;`).replace("#include <map_fragment>",`#include <map_fragment>
float tlBaseAO = mix(0.74, 1.0, smoothstep(0.0, 0.24, vRawUvY));
float tlTopAO = mix(0.91, 1.0, smoothstep(1.0, 0.91, vRawUvY));
diffuseColor.rgb *= tlBaseAO * tlTopAO;`).replace("#include <emissivemap_fragment>",`#ifdef USE_EMISSIVEMAP
  vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
  vec2 tlWinCell = floor(vEmissiveMapUv * 4.0);
  float tlWinHash = fract(sin(dot(tlWinCell + vec2(vLightSeed * 19.3, vLightSeed * 7.1), vec2(127.1, 311.7))) * 43758.5453);
  float tlBldBright = 0.56 + fract(vLightSeed * 3.73) * 0.64;
  float tlWinGate = smoothstep(0.20, 0.30, tlWinHash);
  vec3 tlRoomTint = mix(vec3(1.06, 0.92, 0.72), vec3(0.84, 0.94, 1.08), step(0.80, tlWinHash));
  totalEmissiveRadiance *= emissiveColor.rgb * tlWinGate * tlBldBright * tlRoomTint;
#endif`)},this.facadeMats.push(u);const f=new he({color:l,roughness:.88,metalness:.04}),p=[u,u,f,f,u,u],g=new se(c,p,e.length);g.castShadow=!0,g.receiveShadow=!0;const v=new qt,m=new J;for(let d=0;d<e.length;d++){const x=e[d];v.position.set(x.x,x.y,x.z),v.rotation.set(0,x.yaw,0),v.scale.set(x.sx,x.sy,x.sz),v.updateMatrix(),g.setMatrixAt(d,v.matrix),m.set(x.color),g.setColorAt(d,m)}g.instanceMatrix.needsUpdate=!0,g.instanceColor&&(g.instanceColor.needsUpdate=!0),this.group.add(g)}addCustomPolyInstanced(t,e,n,i){if(t.length===0){e.dispose();return}const o=new he({color:"#ffffff",vertexColors:!0,roughness:n,metalness:i}),r=new se(e,o,t.length);r.castShadow=!0,r.receiveShadow=!0;const a=new qt,l=new J;for(let c=0;c<t.length;c++){const h=t[c];a.position.set(h.x,h.y,h.z),a.rotation.set(h.rx??0,h.yaw,0),a.scale.set(h.sx,h.sy,h.sz),a.updateMatrix(),r.setMatrixAt(c,a.matrix),l.set(h.color),r.setColorAt(c,l)}r.instanceMatrix.needsUpdate=!0,r.instanceColor&&(r.instanceColor.needsUpdate=!0),this.group.add(r)}addCylinderInstanced(t,e){if(t.length===0)return;const n=e?new di(1,1,10,1,!1):new Qe(.86,1,1,10,1,!1);vs(n,-.5,.5,.82,1.03);const i=new he({color:"#ffffff",vertexColors:!0,roughness:.68,metalness:.16}),o=new se(n,i,t.length);o.castShadow=!0,o.receiveShadow=!0;const r=new qt,a=new J;for(let l=0;l<t.length;l++){const c=t[l],h=e?c.radiusBottom:(c.radiusTop+c.radiusBottom)*.5;r.position.set(c.x,c.y,c.z),r.rotation.set(c.rx??0,c.yaw??0,c.rz??0),r.scale.set(h,c.height,h),r.updateMatrix(),o.setMatrixAt(l,r.matrix),a.set(c.color),o.setColorAt(l,a)}o.instanceMatrix.needsUpdate=!0,o.instanceColor&&(o.instanceColor.needsUpdate=!0),this.group.add(o)}addGroundAOInstanced(t,e){if(t.length===0)return;const n=new en(1,1);n.rotateX(-Math.PI/2);const i=new Me({map:e,transparent:!0,opacity:.72,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),o=new se(n,i,t.length);o.renderOrder=2;const r=new qt;for(let a=0;a<t.length;a++){const l=t[a];r.position.set(l.x,l.y,l.z),r.rotation.set(0,l.yaw,0),r.scale.set(l.sx,1,l.sz),r.updateMatrix(),o.setMatrixAt(a,r.matrix)}o.instanceMatrix.needsUpdate=!0,this.group.add(o)}addYardTreesInstanced(t){if(t.length===0)return;const e=t.filter(o=>!o.conifer),n=t.filter(o=>o.conifer),i=(o,r)=>{if(o.length===0){r.dispose();return}const a=new Qe(.22,.36,2.5,6);a.translate(0,1.25,0);const l=new he({color:"#6A5342",roughness:.92}),c=new he({color:"#ffffff",vertexColors:!0,roughness:.86});Aa(c,this.windTimeUniform,.2);const h=new se(a,l,o.length),u=new se(r,c,o.length);u.castShadow=!0,u.receiveShadow=!0;const f=new qt,p=new J;for(let g=0;g<o.length;g++){const v=o[g];f.position.set(v.x,v.y-.2,v.z),f.rotation.set(0,g*1.9,0),f.scale.setScalar(v.scale),f.updateMatrix(),h.setMatrixAt(g,f.matrix),u.setMatrixAt(g,f.matrix),p.set(v.color),u.setColorAt(g,p)}h.instanceMatrix.needsUpdate=!0,u.instanceMatrix.needsUpdate=!0,u.instanceColor&&(u.instanceColor.needsUpdate=!0),this.group.add(h,u)};i(e,Ta()),i(n,eh())}buildSmokeInstanced(){if(this.smokeSources.length===0)return;const e=this.smokeSources.length*4,n=new ai(1.15,1),i=new he({color:"#E6E4DF",transparent:!0,opacity:.42,roughness:1,metalness:0,depthWrite:!1}),o=new se(n,i,e);o.renderOrder=4,o.visible=this.enableSmoke,this.smokeMesh=o,this.group.add(o),this.updateSmokeInstances()}updateSmokeInstances(){if(!this.smokeMesh||!this.enableSmoke||this.smokeSources.length===0)return;const t=4;let e=0;for(let n=0;n<this.smokeSources.length;n++){const i=this.smokeSources[n];for(let o=0;o<t;o++){const r=((this.smokeTime*.22+i.phase*.16+o/t)%1+1)%1,a=r*16*i.scale,l=r*7.5*i.scale+Math.sin(this.smokeTime*1.1+i.phase+o)*.8,c=r*3.8*i.scale,h=Math.sin(r*Math.PI),u=(.55+r*1.65)*Math.max(.12,h)*i.scale;this.smokeDummy.position.set(i.x+l,i.y+a,i.z+c),this.smokeDummy.rotation.set(r*1.2,i.phase+r,0),this.smokeDummy.scale.set(u,u*.82,u),this.smokeDummy.updateMatrix(),this.smokeMesh.setMatrixAt(e++,this.smokeDummy.matrix)}}this.smokeMesh.instanceMatrix.needsUpdate=!0}createWindRotor(){const t=new ye,e=new ye;e.position.set(0,0,2.75);const n=new he({color:"#F3F6F9",roughness:.42,metalness:.12}),i=new Kt(new Yi(1,8,8),n);e.add(i);const o=new Qe(.16,.62,13.8,5,1,!1);o.scale(1,1,.34),o.translate(0,6.9,0);for(let r=0;r<3;r++){const a=new Kt(o,n);a.rotation.z=r*Math.PI*2/3,a.castShadow=!0,e.add(a)}return t.add(e),t}update(t,e){this.windTimeUniform.value+=t,this.smokeTime+=t;for(let n=0;n<this.facadeMats.length;n++)this.facadeMats[n].emissiveIntensity=e*2.15;for(let n=0;n<this.turbineRotors.length;n++)this.turbineRotors[n].rotation.z-=t*1.55;this.updateSmokeInstances()}clear(){for(this.turbineRotors=[],this.facadeMats=[],this.smokeSources=[],this.smokeMesh=null;this.group.children.length>0;){const t=this.group.children[0];this.group.remove(t),t.traverse(e=>{e instanceof Kt&&(e.geometry.dispose(),Array.isArray(e.material)?e.material.forEach(n=>n.dispose()):e.material.dispose())})}}}function Ft(s,t="0 0 24 24",e="tl-ico"){return`<svg class="${e}" viewBox="${t}" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${s}</svg>`}const Ot={road:Ft('<path d="M7 20L10 4M17 20L14 4M12 7v2M12 12v2M12 17v2"/>'),zone:Ft('<rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.5"/>'),utility:Ft('<path d="M13 3L6 13h6l-1 8 7-10h-6l1-8z"/>'),service:Ft('<path d="M4 20h16M6 20V9l6-4 6 4v11M10 14h4M12 12v4"/>'),park:Ft('<path d="M12 20v-6"/><circle cx="12" cy="9" r="4.5"/><path d="M6.5 14.5a3 3 0 1 1 2.2-5.1M17.5 14.5a3 3 0 1 0-2.2-5.1"/>'),bulldoze:Ft('<path d="M3 16h11l3-6h3M5 16v3M14 16v3M7 10h6v6H7zM18 10l2 6M4 19h13"/>'),info:Ft('<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5M12 8h.01"/>'),budget:Ft('<rect x="3.5" y="5.5" width="17" height="13" rx="2.5"/><path d="M12 9v6M9.5 11.2c0-1 1.1-1.7 2.5-1.7s2.5.7 2.5 1.7-1.1 1.6-2.5 1.8-2.5.7-2.5 1.8 1.1 1.7 2.5 1.7 2.5-.7 2.5-1.7"/>'),save:Ft('<path d="M5 4h11l3 3v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"/><path d="M8 4v5h7V4M8 20v-6h8v6"/>'),rotate:Ft('<path d="M20 12a8 8 0 1 1-2.3-5.6"/><path d="M20 4v5h-5"/>'),pause:Ft('<path d="M9 6.5v11M15 6.5v11"/>'),lock:Ft('<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>'),close:Ft('<path d="M6 6l12 12M18 6L6 18"/>'),small_2lane:Ft('<path d="M8 20L10 4M16 20L14 4M12 8v3M12 14v3"/>'),tree_2lane:Ft('<path d="M9 20L10.5 4M15 20L13.5 4"/><circle cx="5.5" cy="11" r="2.2"/><path d="M5.5 13.2V17"/><circle cx="18.5" cy="11" r="2.2"/><path d="M18.5 13.2V17"/>'),oneway_2lane:Ft('<path d="M8 20V4M16 20V4M12 17V7M9.5 10L12 7l2.5 3"/>'),avenue_4lane:Ft('<path d="M5 20L7 4M19 20L17 4M12 20V4M8.8 10v2M8.5 15v2M15.2 10v2M15.5 15v2"/>'),highway:Ft('<path d="M4 20L7.5 4M20 20L16.5 4M11 20L11.5 4M13 20L12.5 4"/>'),straight:Ft('<path d="M5 19L19 5"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="5" r="2"/>'),curve:Ft('<path d="M4 19Q5 5 20 5"/><circle cx="4" cy="19" r="1.8"/><circle cx="20" cy="5" r="1.8"/>'),freeform:Ft('<path d="M4 17c3-7 5 3 8-4s5 2 8-6"/>'),upgrade:Ft('<path d="M12 19V5M7 10l5-5 5 5M5 19h14"/>'),snap:Ft('<path d="M7 4v7a5 5 0 0 0 10 0V4M5 8h4M15 8h4"/>'),res_low:Ft('<path d="M4 12l8-6 8 6"/><path d="M6.5 10.5V19h11v-8.5M10.5 19v-4h3v4"/>'),res_high:Ft('<rect x="6" y="4" width="12" height="16" rx="1.5"/><path d="M9.5 8h1.5M13 8h1.5M9.5 11.5h1.5M13 11.5h1.5M9.5 15h1.5M13 15h1.5"/>'),com_low:Ft('<path d="M4 10l1.5-5h13L20 10M5 10v9h14v-9M4 10a2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0"/>'),com_high:Ft('<path d="M5 20V8l4-3 4 3v12M13 20v-9l3-2 3 2v9M8 11h2M8 14.5h2M15.5 13h1.5"/>'),ind:Ft('<path d="M3 20V11l5 3v-3l5 3V8h4v12H3zM17 8V4h2.5v4"/>'),office:Ft('<path d="M7 20V6l5-2.5L17 6v14M10 9h4M10 12.5h4M10 16h4"/>'),dezone:Ft('<rect x="4" y="4" width="16" height="16" rx="2" stroke-dasharray="3 2"/><path d="M8.5 8.5l7 7M15.5 8.5l-7 7"/>'),power_line:Ft('<path d="M12 3v18M8 7h8M6 11h12M9 21l3-10 3 10"/>'),wind_turbine:Ft('<path d="M12 21v-9M12 12l-5-4M12 12l6-2M12 12l-1 6"/><circle cx="12" cy="12" r="1.5"/>'),coal_plant:Ft('<path d="M4 20v-8h10v8M14 20V9h5v11M6 12V6h3v6M10.5 12V7h2.5v5"/>'),solar_plant:Ft('<path d="M3 16l3-8h12l3 8H3zM8 12h8M12 8v8M9 19h6"/>'),water_pipe:Ft('<path d="M3 12h18M7 9v6M17 9v6"/><circle cx="12" cy="12" r="2.2"/>'),water_pump:Ft('<path d="M12 4s5.5 6 5.5 10a5.5 5.5 0 1 1-11 0C6.5 10 12 4 12 4z"/>'),water_tower:Ft('<rect x="6.5" y="4.5" width="11" height="6.5" rx="2"/><path d="M8.5 11L7 20M15.5 11l1.5 9M7.5 16h9"/>'),sewage_outlet:Ft('<path d="M4 8h9a3 3 0 0 1 3 3v3H4V8zM16 14c1.5 1 2.5 2 4 2M15 18c1.8 1 3.2 1 5 0"/>'),clinic:Ft('<rect x="4" y="6" width="16" height="14" rx="2"/><path d="M12 9.5v7M8.5 13h7"/>'),hospital:Ft('<rect x="3.5" y="4.5" width="17" height="15.5" rx="2"/><path d="M12 8v8M8 12h8"/>'),elementary_school:Ft('<path d="M3 10l9-5 9 5-9 5-9-5z"/><path d="M6 12v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5"/>'),high_school:Ft('<path d="M4 20V9l8-4.5L20 9v11M9 20v-5h6v5M12 9.5v2"/>'),police_station:Ft('<path d="M12 3.5l7 3v5.5c0 4.5-3 7.3-7 8.5-4-1.2-7-4-7-8.5V6.5l7-3z"/>'),fire_station:Ft('<path d="M12 4c2.8 2.8 5 5.6 5 9a5 5 0 1 1-10 0c0-2 1-4 2.3-5.6.3 1.7 1.3 2.6 2.2 2.6.2-2.2 0-4.2.5-6z"/>'),landfill:Ft('<path d="M4 18l4-8 4 3 4-6 4 11H4z"/>'),park_small:Ft('<path d="M12 20v-5"/><circle cx="12" cy="10" r="5"/><path d="M6 20h12"/>'),park_plaza:Ft('<path d="M4 19h16M8 19c0-3 2-5 4-5s4 2 4 5M12 14V7M9 9.5c1-1.5 2-2.5 3-2.5s2 1 3 2.5"/>')},U0=[{flag:dn.ABANDONED,labelZh:"已废弃",color:"#6E7580",icon:Ft('<path d="M6 6l12 12M18 6L6 18"/>',"0 0 24 24","tl-prob-svg")},{flag:dn.NO_POWER,labelZh:"电力不足",color:"#E59A28",icon:Ft('<path d="M13 3L6 13h6l-1 8 7-10h-6l1-8z"/>',"0 0 24 24","tl-prob-svg")},{flag:dn.NO_WATER,labelZh:"供水不足",color:"#3B9ED8",icon:Ft('<path d="M12 4s5 5.5 5 9.5a5 5 0 1 1-10 0C7 9.5 12 4 12 4z"/>',"0 0 24 24","tl-prob-svg")},{flag:dn.NO_SEWAGE,labelZh:"排污不足",color:"#8E6B47",icon:Ft('<path d="M4 10h10a3 3 0 0 1 3 3v3H4v-6zM17 16l3 2"/>',"0 0 24 24","tl-prob-svg")},{flag:dn.POLLUTED_WATER,labelZh:"水源污染",color:"#9C5E7B",icon:Ft('<path d="M12 4s5 5.5 5 9.5a5 5 0 1 1-10 0C7 9.5 12 4 12 4zM9 14l6-4"/>',"0 0 24 24","tl-prob-svg")},{flag:dn.HIGH_TAX,labelZh:"税率过高",color:"#D95050",icon:Ft('<path d="M12 4v16M8 8h6a2.5 2.5 0 0 1 0 5H9a2.5 2.5 0 0 0 0 5h7"/>',"0 0 24 24","tl-prob-svg")},{flag:dn.HIGH_POLLUTION,labelZh:"空气/地面污染",color:"#8A567C",icon:Ft('<path d="M6 17h12a3.5 3.5 0 0 0 .5-7A5 5 0 0 0 9 8.5 3.5 3.5 0 0 0 6 17z"/>',"0 0 24 24","tl-prob-svg")},{flag:dn.GARBAGE,labelZh:"垃圾堆积",color:"#8E7F65",icon:Ft('<path d="M5 7h14M9 7V5h6v2M7 7l1 12h8l1-12"/>',"0 0 24 24","tl-prob-svg")},{flag:dn.CRIME,labelZh:"治安隐患",color:"#3D6EB8",icon:Ft('<path d="M12 4l6 2.5V12c0 4-2.5 6.5-6 8-3.5-1.5-6-4-6-8V6.5L12 4z"/>',"0 0 24 24","tl-prob-svg")}];function Jl(s){return s===0?[]:U0.filter(t=>(s&t.flag)!==0)}const Ql=[{id:"none",zh:"常规"},{id:"traffic",zh:"交通",legend:["畅通","#4CC38A,#F2C94C,#EB7B3C,#D63E4F","拥堵"]},{id:"landvalue",zh:"地价",legend:["普通","#D4DCE3,#7BC8A4,#38A3A5,#F2C94C","黄金地段"]},{id:"pollution",zh:"污染",legend:["洁净","#DCE6DC,#A68A5B,#8A567C","重度污染"]},{id:"noise",zh:"噪音",legend:["安静","#DCE6DC,#A68A5B,#8A567C","嘈杂"]},{id:"power",zh:"电力",legend:["无电","#9BA4B0,#F6C84C","已供电"]},{id:"water",zh:"供水",legend:["无水","#9C8F82,#58B8EE","已供水"]},{id:"services",zh:"服务",legend:["缺乏","#CBD5DF,#4BC29A","覆盖良好"]},{id:"happiness",zh:"幸福",legend:["不满","#CBD5DF,#4BC29A","幸福"]}],N0=[{id:"road",zh:"道路",icon:Ot.road},{id:"zone",zh:"分区",icon:Ot.zone},{id:"utility",zh:"设施",icon:Ot.utility},{id:"service",zh:"服务",icon:Ot.service},{id:"park",zh:"公园",icon:Ot.park},{id:"bulldoze",zh:"拆除",icon:Ot.bulldoze},{id:"info",zh:"信息",icon:Ot.info}],z0=[{kind:"line",lineKind:"power_line",zh:"输电线",costText:"¥6/m",sub:"连接电网",icon:Ot.power_line,tier:0},{kind:"plop",plop:"wind_turbine"},{kind:"plop",plop:"coal_plant"},{kind:"plop",plop:"solar_plant"},{kind:"line",lineKind:"water_pipe",zh:"供水管道",costText:"¥8/m",sub:"地下管网",icon:Ot.water_pipe,tier:0},{kind:"plop",plop:"water_pump"},{kind:"plop",plop:"water_tower"},{kind:"plop",plop:"sewage_outlet"}],hr=["clinic","elementary_school","landfill","police_station","fire_station","high_school","hospital"],B0=["park_small","park_plaza"],Js={none:"#E55B5B",res_low:"#7ED389",res_high:"#2F9E66",com_low:"#69B8F5",com_high:"#2D74C4",ind:"#F0B94D",office:"#49C6C1"},tc=[{id:"roads",zh:"道路养护"},{id:"power",zh:"电力系统"},{id:"water",zh:"供水排污"},{id:"health",zh:"医疗卫生"},{id:"education",zh:"教育学校"},{id:"police",zh:"警察治安"},{id:"fire",zh:"消防应急"},{id:"parks",zh:"公园广场"},{id:"garbage",zh:"环卫垃圾"}];function O0(s){const t=(s%24+24)%24,e=Math.floor(t),n=Math.floor((t-e)*60),i=`${String(e).padStart(2,"0")}:${String(n).padStart(2,"0")}`;let o="晴昼";return t>=5.5&&t<7.8?o="晨曦":t>=17&&t<19.6?o="暮光":(t>=19.6||t<5.5)&&(o="星夜"),{clock:i,phaseZh:o}}function Qs(s){return Math.max(8,Math.min(100,Math.round((s+50)/150*100)))}function cs(s){return ca.find(t=>t.tier===s)?.populationRequired??0}class k0{constructor(t,e){this.callbacks=e,this.injectStyles(),this.problemLayerEl=document.createElement("div"),this.problemLayerEl.className="tl-problem-layer",t.appendChild(this.problemLayerEl),this.root=document.createElement("div"),this.root.className="tl-hud",this.root.innerHTML=`
      <div class="tl-topbar">
        <button type="button" class="tl-glass tl-brand tl-brand-btn" data-action="toggle-about" title="关于汐光市 · 画质与开源致谢">
          <svg class="tl-logo" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M3 17c2.4-1.8 4.6-1.8 7 0s4.6 1.8 7 0 2.5-1.5 4-1"/>
            <path d="M5 13V7l4-2 4 2v6"/>
            <path d="M13 13V9l3-1.5L19 9v4"/>
          </svg>
          <div style="text-align:left;">
            <div class="tl-title">汐光市 <span class="tl-sub">Tidelight</span></div>
            <div class="tl-milestone" data-el="milestone">初建港湾</div>
          </div>
        </button>

        <div class="tl-glass tl-stats">
          <div class="tl-stat">
            <span class="tl-label">人口</span>
            <span class="tl-val" data-el="pop">0</span>
          </div>
          <div class="tl-sep"></div>
          <button type="button" class="tl-stat tl-stat-btn" data-action="open-budget" title="打开财政与税收面板">
            <span class="tl-label">资金</span>
            <span class="tl-val" data-el="money">¥120,000</span>
            <span class="tl-delta" data-el="net">+0/周</span>
          </button>
          <div class="tl-sep tl-hide-sm"></div>
          <div class="tl-stat tl-hide-sm">
            <span class="tl-label">历日</span>
            <span class="tl-val" data-el="date">第 1 天 · 10:30 晴昼</span>
          </div>
        </div>

        <div class="tl-glass tl-rci" title="需求指标 (住/商/工/办)">
          <div class="tl-rci-col"><div class="tl-rci-track"><div class="tl-rci-fill tl-r" data-rci="r"></div></div><span>住</span></div>
          <div class="tl-rci-col"><div class="tl-rci-track"><div class="tl-rci-fill tl-c" data-rci="c"></div></div><span>商</span></div>
          <div class="tl-rci-col"><div class="tl-rci-track"><div class="tl-rci-fill tl-i" data-rci="i"></div></div><span>工</span></div>
          <div class="tl-rci-col"><div class="tl-rci-track"><div class="tl-rci-fill tl-o" data-rci="o"></div></div><span>办</span></div>
        </div>

        <div class="tl-glass tl-speeds" role="group" aria-label="模拟速度">
          <button type="button" class="tl-btn tl-pause-btn" data-speed="0" title="暂停">${Ot.pause}</button>
          <button type="button" class="tl-btn" data-speed="1" title="1倍速">1x</button>
          <button type="button" class="tl-btn" data-speed="2" title="2倍速">2x</button>
          <button type="button" class="tl-btn" data-speed="4" title="4倍速">4x</button>
        </div>

        <div class="tl-glass tl-top-actions">
          <button type="button" class="tl-btn tl-act-btn" data-action="toggle-budget" title="财政与税收">
            ${Ot.budget}<span>预算</span>
          </button>
          <button type="button" class="tl-btn tl-act-btn" data-action="toggle-save" title="保存与读取存档">
            ${Ot.save}<span>存档</span>
          </button>
        </div>
      </div>

      <div class="tl-toasts" data-el="toasts"></div>
      <div class="tl-legend-wrap" data-el="legend"></div>
      <div class="tl-inspect-wrap" data-el="inspect"></div>
      <div class="tl-modal-wrap" data-el="budget-modal"></div>
      <div class="tl-modal-wrap" data-el="save-modal"></div>
      <div class="tl-modal-wrap" data-el="about-modal"></div>
      <div class="tl-readout tl-glass" data-el="readout" style="display:none;"></div>

      <div class="tl-bottom-stack">
        <div class="tl-subpanel tl-glass" data-el="subpanel" style="display:none;"></div>

        <div class="tl-bottombar">
          <div class="tl-dock-spacer"></div>
          <div class="tl-glass tl-dock" role="toolbar" aria-label="建造工具栏">
            ${N0.map(n=>`
              <button type="button" class="tl-dock-btn" data-cat="${n.id}" aria-pressed="false">
                ${n.icon}
                <span>${n.zh}</span>
              </button>`).join("")}
          </div>
          <div class="tl-glass tl-cams" role="group" aria-label="视角预设">
            <button type="button" class="tl-pill" data-cam="overview">鸟瞰</button>
            <button type="button" class="tl-pill" data-cam="street">街景</button>
          </div>
        </div>
      </div>
    `,t.appendChild(this.root),this.popEl=this.root.querySelector('[data-el="pop"]'),this.moneyEl=this.root.querySelector('[data-el="money"]'),this.netEl=this.root.querySelector('[data-el="net"]'),this.dateEl=this.root.querySelector('[data-el="date"]'),this.milestoneEl=this.root.querySelector('[data-el="milestone"]'),this.subpanelEl=this.root.querySelector('[data-el="subpanel"]'),this.readoutEl=this.root.querySelector('[data-el="readout"]'),this.toastContainer=this.root.querySelector('[data-el="toasts"]'),this.inspectCardEl=this.root.querySelector('[data-el="inspect"]'),this.budgetModalEl=this.root.querySelector('[data-el="budget-modal"]'),this.saveModalEl=this.root.querySelector('[data-el="save-modal"]'),this.aboutModalEl=this.root.querySelector('[data-el="about-modal"]'),this.legendBarEl=this.root.querySelector('[data-el="legend"]'),this.budgetBtn=this.root.querySelector('[data-action="toggle-budget"]'),this.saveBtn=this.root.querySelector('[data-action="toggle-save"]'),this.rciBars={r:this.root.querySelector('[data-rci="r"]'),c:this.root.querySelector('[data-rci="c"]'),i:this.root.querySelector('[data-rci="i"]'),o:this.root.querySelector('[data-rci="o"]')};for(const n of Array.from(this.root.querySelectorAll("[data-speed]"))){const i=Number(n.dataset.speed);this.speedBtns.set(i,n),n.addEventListener("click",()=>e.onSpeedChange(i))}for(const n of Array.from(this.root.querySelectorAll("[data-cat]"))){const i=n.dataset.cat;this.catBtns.set(i,n),n.addEventListener("click",()=>this.toggleCategory(i))}for(const n of Array.from(this.root.querySelectorAll("[data-cam]"))){const i=n.dataset.cam;n.addEventListener("click",()=>e.onCameraPreset(i))}this.root.querySelector('[data-action="open-budget"]')?.addEventListener("click",()=>this.setBudgetOpen(!this.budgetOpen)),this.root.querySelector('[data-action="toggle-about"]')?.addEventListener("click",()=>this.setAboutOpen(!this.aboutOpen)),this.budgetBtn.addEventListener("click",()=>this.setBudgetOpen(!this.budgetOpen)),this.saveBtn.addEventListener("click",()=>this.setSaveOpen(!this.saveOpen)),this.problemLayerEl.addEventListener("click",n=>{const i=n.target.closest("[data-prob-bid]");if(i){const o=Number(i.dataset.probBid);Number.isFinite(o)&&e.onPickBuilding(o)}})}root;popEl;moneyEl;netEl;dateEl;milestoneEl;rciBars;speedBtns=new Map;catBtns=new Map;subpanelEl;readoutEl;toastContainer;inspectCardEl;budgetModalEl;saveModalEl;aboutModalEl;problemLayerEl;legendBarEl;budgetBtn;saveBtn;activeCategory="none";activeRoadType="small_2lane";activeRoadMode="straight";roadSnap=!0;activeZone="res_low";activeZoneBrush="medium";activeUtilitySel="wind_turbine";activeServiceSel="clinic";activeParkSel="park_small";currentOverlay="none";currentPlopYaw=0;budgetOpen=!1;budgetTab="taxes";saveOpen=!1;aboutOpen=!1;currentQuality="high";lastMilestoneTier=0;latestSnapshot=null;saveSlotsCache=[];inspectedBuilding=null;problemBadgeNodes=new Map;toggleCategory(t){this.activeCategory===t?this.selectCategory("none"):this.selectCategory(t)}selectCategory(t){this.activeCategory=t,t!=="none"&&(this.setBudgetOpen(!1),this.setSaveOpen(!1),this.setAboutOpen(!1));for(const[e,n]of this.catBtns.entries()){const i=e===t;n.classList.toggle("active",i),n.setAttribute("aria-pressed",i?"true":"false")}this.emitActiveTool(),this.renderSubpanel()}clearTool(){this.activeCategory!=="none"&&this.selectCategory("none")}setRoadOptions(t,e,n){t&&(this.activeRoadType=t),e&&(this.activeRoadMode=e),n!==void 0&&(this.roadSnap=n),this.activeCategory==="road"&&(this.emitActiveTool(),this.renderSubpanel())}setZoneOptions(t,e){t!==void 0&&(this.activeZone=t),e&&(this.activeZoneBrush=e),this.activeCategory==="zone"&&(this.emitActiveTool(),this.renderSubpanel())}setBudgetOpen(t){this.budgetOpen=t,t&&(this.saveOpen=!1,this.saveModalEl.innerHTML="",this.saveBtn.classList.remove("active"),this.aboutOpen=!1,this.aboutModalEl.innerHTML=""),this.budgetBtn.classList.toggle("active",t),this.renderBudgetModal()}setSaveOpen(t){this.saveOpen=t,t&&(this.budgetOpen=!1,this.budgetModalEl.innerHTML="",this.budgetBtn.classList.remove("active"),this.aboutOpen=!1,this.aboutModalEl.innerHTML=""),this.saveBtn.classList.toggle("active",t),this.renderSaveModal()}setAboutOpen(t){this.aboutOpen=t,t&&(this.budgetOpen=!1,this.budgetModalEl.innerHTML="",this.budgetBtn.classList.remove("active"),this.saveOpen=!1,this.saveModalEl.innerHTML="",this.saveBtn.classList.remove("active")),this.renderAboutModal()}setQualityLevel(t){this.currentQuality=t,this.aboutOpen&&this.renderAboutModal()}setSaveSlots(t){this.saveSlotsCache=t,this.saveOpen&&this.renderSaveModal()}setInspectedBuilding(t){this.inspectedBuilding=t,this.renderInspectCard()}setPloppableYaw(t){this.currentPlopYaw=t}updateReadout(t){if(!t.visible){this.readoutEl.style.display="none";return}this.readoutEl.style.display="flex",this.readoutEl.classList.toggle("tl-invalid",!t.valid);const e=window.innerWidth,n=window.innerHeight;if(e<=640)this.readoutEl.style.left="50%",this.readoutEl.style.top="auto",this.readoutEl.style.bottom="calc(env(safe-area-inset-bottom) + 172px)",this.readoutEl.style.transform="translateX(-50%)";else{const o=Math.max(16,Math.min(e-290,t.screenX+20)),r=Math.max(76,Math.min(n-180,t.screenY-58));this.readoutEl.style.left=`${Math.round(o)}px`,this.readoutEl.style.top=`${Math.round(r)}px`,this.readoutEl.style.bottom="auto",this.readoutEl.style.transform="none"}this.readoutEl.innerHTML=`
      <div class="tl-ro-row">
        <span class="tl-ro-title">${t.title}</span>
        ${t.costText?`<span class="tl-ro-cost">${t.costText}</span>`:""}
        ${t.snapBadge?`<span class="tl-ro-snap">${t.snapBadge}</span>`:""}
      </div>
      ${t.hint?`<div class="tl-ro-hint">${t.hint}</div>`:""}
    `}showToast(t,e="info",n){const i=document.createElement("div");i.className=`tl-toast tl-glass tl-toast-${e}`,i.innerHTML=`
      <div class="tl-toast-title">${t}</div>
      ${n?`<div class="tl-toast-sub">${n}</div>`:""}
    `,this.toastContainer.appendChild(i),setTimeout(()=>{i.classList.add("tl-toast-out"),setTimeout(()=>i.remove(),300)},e==="milestone"?5200:3e3)}updateProblemMarkers(t){const e=new Set;for(let n=0;n<t.length;n++){const i=t[n],o=Jl(i.flags);if(o.length===0)continue;e.add(i.buildingId);const r=o[0];let a=this.problemBadgeNodes.get(i.buildingId);if(!a){const l=document.createElement("button");l.type="button",l.className="tl-prob-badge",l.dataset.probBid=String(i.buildingId),this.problemLayerEl.appendChild(l),a={btn:l,flags:-1},this.problemBadgeNodes.set(i.buildingId,a)}a.flags!==i.flags&&(a.flags=i.flags,a.btn.title=o.map(l=>l.labelZh).join(" · "),a.btn.style.setProperty("--prob-col",r.color),a.btn.innerHTML=r.icon),a.btn.style.transform=`translate(${Math.round(i.screenX-11)}px,${Math.round(i.screenY-22)}px)`}for(const[n,i]of this.problemBadgeNodes.entries())e.has(n)||(i.btn.remove(),this.problemBadgeNodes.delete(n))}update(t,e){this.latestSnapshot=t,this.root.classList.toggle("tl-night",e);const{stats:n}=t;this.popEl.textContent=n.population.toLocaleString("zh-CN"),this.moneyEl.textContent=`¥${n.money.toLocaleString("zh-CN")}`;const i=n.weeklyNet>=0?"+":"";this.netEl.textContent=`${i}${n.weeklyNet.toLocaleString("zh-CN")}/周`,this.netEl.classList.toggle("tl-pos",n.weeklyNet>=0),this.netEl.classList.toggle("tl-neg",n.weeklyNet<0);const{clock:o,phaseZh:r}=O0(t.timeOfDay);this.dateEl.textContent=`第 ${t.simDay} 天 · ${o} ${r}`,this.milestoneEl.textContent=`${n.milestoneNameZh} · ${n.vehicleCount} 车`,this.rciBars.r.style.height=`${Qs(n.demand.r)}%`,this.rciBars.c.style.height=`${Qs(n.demand.c)}%`,this.rciBars.i.style.height=`${Qs(n.demand.i)}%`,this.rciBars.o.style.height=`${Qs(n.demand.o)}%`;for(const[c,h]of this.speedBtns.entries())h.classList.toggle("active",c===t.speed);const a=this.currentOverlay!==t.overlayType;this.currentOverlay=t.overlayType,a&&(this.renderLegend(),this.activeCategory==="info"&&this.renderSubpanel());const l=n.milestoneTier!==this.lastMilestoneTier;if(this.lastMilestoneTier=n.milestoneTier,l&&this.activeCategory!=="none")this.renderSubpanel();else if(this.activeCategory==="utility"){const c=this.subpanelEl.querySelector('[data-el="util-summary"]');c&&(c.innerHTML=this.renderUtilitySummaryHtml(t))}this.budgetOpen&&this.updateBudgetLiveNumbers(t)}emitActiveTool(){const t=this.latestSnapshot?.stats.milestoneTier??0;if(this.activeCategory==="none"){this.callbacks.onToolChange({kind:"none"},"none");return}if(this.activeCategory==="road"){An[this.activeRoadType].milestoneTier>t&&(this.activeRoadType="small_2lane"),this.callbacks.onToolChange({kind:"road",roadType:this.activeRoadType,mode:this.activeRoadMode,snap:this.roadSnap},"road");return}if(this.activeCategory==="zone"){this.activeZone!=="none"&&zi[this.activeZone].milestoneTier>t&&(this.activeZone="res_low"),this.callbacks.onToolChange({kind:"zone",zone:this.activeZone,brush:this.activeZoneBrush},"zone");return}if(this.activeCategory==="utility"){this.activeUtilitySel==="power_line"||this.activeUtilitySel==="water_pipe"?this.callbacks.onToolChange({kind:"utility_line",lineKind:this.activeUtilitySel},"utility"):(Ue[this.activeUtilitySel].milestoneTier>t&&(this.activeUtilitySel="wind_turbine"),this.callbacks.onToolChange({kind:"ploppable",ploppable:this.activeUtilitySel,yaw:this.currentPlopYaw},"utility"));return}if(this.activeCategory==="service"){const e=hr.find(n=>Ue[n].milestoneTier<=t);Ue[this.activeServiceSel].milestoneTier>t&&e&&(this.activeServiceSel=e),Ue[this.activeServiceSel].milestoneTier<=t?this.callbacks.onToolChange({kind:"ploppable",ploppable:this.activeServiceSel,yaw:this.currentPlopYaw},"service"):this.callbacks.onToolChange({kind:"none"},"service");return}if(this.activeCategory==="park"){Ue[this.activeParkSel].milestoneTier>t&&(this.activeParkSel="park_small"),this.callbacks.onToolChange({kind:"ploppable",ploppable:this.activeParkSel,yaw:this.currentPlopYaw},"park");return}if(this.activeCategory==="bulldoze"){this.callbacks.onToolChange({kind:"bulldoze"},"bulldoze");return}this.activeCategory==="info"&&this.callbacks.onToolChange({kind:"info",overlay:this.currentOverlay},"info")}renderUtilitySummaryHtml(t){if(!t)return"";const e=t.stats,n=e.powerProducedMW>=e.powerConsumedMW,i=e.waterProducedM3>=e.waterConsumedM3,o=e.sewageCapacityM3>=e.sewageConsumedM3;return`
      <span class="tl-chip ${n?"ok":"warn"}">电力 ${e.powerConsumedMW}/${e.powerProducedMW} MW</span>
      <span class="tl-chip ${i?"ok":"warn"}">供水 ${e.waterConsumedM3}/${e.waterProducedM3} m³</span>
      <span class="tl-chip ${o?"ok":"warn"}">排污 ${e.sewageConsumedM3}/${e.sewageCapacityM3} m³</span>
    `}renderSubpanel(){const t=this.activeCategory;if(t==="none"){this.subpanelEl.style.display="none",this.subpanelEl.innerHTML="";return}const e=this.latestSnapshot?.stats.milestoneTier??0;this.subpanelEl.style.display="flex";const n=`
      <div class="tl-sheet-header">
        <div class="tl-sheet-handle"></div>
        <button type="button" class="tl-sheet-close" data-sub-close title="收起面板">${Ot.close}</button>
      </div>
    `;if(t==="road"){const i=[{id:"straight",zh:"直线",icon:Ot.straight},{id:"curve",zh:"曲线",icon:Ot.curve},{id:"freeform",zh:"自由",icon:Ot.freeform},{id:"upgrade",zh:"升级",icon:Ot.upgrade}];this.subpanelEl.innerHTML=`
        ${n}
        <div class="tl-sub-controls">
          <div class="tl-seg-group">
            ${i.map(o=>`<button type="button" class="tl-mini-btn ${this.activeRoadMode===o.id?"active":""}" data-road-mode="${o.id}">${o.icon}<span>${o.zh}</span></button>`).join("")}
          </div>
          <button type="button" class="tl-mini-btn ${this.roadSnap?"active":""}" data-road-snap="1" title="节点、路口与15°角度吸附">
            ${Ot.snap}<span>吸附 15°</span>
          </button>
        </div>
        <div class="tl-sub-items">
          ${la.map(o=>{const r=An[o],a=r.milestoneTier>e,l=cs(r.milestoneTier);return`
              <button type="button" class="tl-item-card ${!a&&this.activeRoadType===o?"active":""} ${a?"locked":""}" data-road-type="${o}" ${a?"disabled":""}>
                <div class="tl-item-ico">${Ot[o]??Ot.road}</div>
                <div class="tl-item-name">${r.labelZh}</div>
                <div class="tl-item-meta">${a?`${Ot.lock} 需${l}人`:`¥${r.costPerMeter}/m`}</div>
              </button>`}).join("")}
        </div>
      `}else if(t==="zone"){const i=[{id:"small",zh:"小刷"},{id:"medium",zh:"中刷"},{id:"large",zh:"大刷"},{id:"segment",zh:"整段填充"}];this.subpanelEl.innerHTML=`
        ${n}
        <div class="tl-sub-controls">
          <div class="tl-seg-group">
            ${i.map(o=>`<button type="button" class="tl-mini-btn ${this.activeZoneBrush===o.id?"active":""}" data-zone-brush="${o.id}">${o.zh}</button>`).join("")}
          </div>
          <span class="tl-sub-hint">点击或拖动涂抹道路旁 8m 格子</span>
        </div>
        <div class="tl-sub-items">
          ${Ao.map(o=>{const r=zi[o],a=r.milestoneTier>e,l=cs(r.milestoneTier);return`
              <button type="button" class="tl-item-card ${!a&&this.activeZone===o?"active":""} ${a?"locked":""}" data-zone-type="${o}" ${a?"disabled":""}>
                <div class="tl-item-ico" style="color:${Js[o]};">${Ot[o]}</div>
                <div class="tl-item-name">${r.labelZh}</div>
                <div class="tl-item-meta">${a?`${Ot.lock} 需${l}人`:`<span class="tl-swatch" style="background:${Js[o]};"></span>免费`}</div>
              </button>`}).join("")}
          <button type="button" class="tl-item-card ${this.activeZone==="none"?"active":""}" data-zone-type="none">
            <div class="tl-item-ico" style="color:#D95050;">${Ot.dezone}</div>
            <div class="tl-item-name">取消分区</div>
            <div class="tl-item-meta">擦除规划</div>
          </button>
        </div>
      `}else if(t==="utility"){const i=this.activeUtilitySel!=="power_line"&&this.activeUtilitySel!=="water_pipe";this.subpanelEl.innerHTML=`
        ${n}
        <div class="tl-sub-controls">
          <div class="tl-util-summary" data-el="util-summary">${this.renderUtilitySummaryHtml(this.latestSnapshot)}</div>
          ${i?`<button type="button" class="tl-mini-btn" data-rotate-plop="1">${Ot.rotate}<span>旋转 (R)</span></button>`:'<span class="tl-sub-hint">拖动或两点铺设管线</span>'}
        </div>
        <div class="tl-sub-items">
          ${z0.map(o=>{if(o.kind==="line")return`
                <button type="button" class="tl-item-card ${this.activeUtilitySel===o.lineKind?"active":""}" data-util-line="${o.lineKind}">
                  <div class="tl-item-ico">${o.icon}</div>
                  <div class="tl-item-name">${o.zh}</div>
                  <div class="tl-item-meta">${o.costText}</div>
                </button>`;const r=Ue[o.plop],a=r.milestoneTier>e,l=cs(r.milestoneTier);return`
              <button type="button" class="tl-item-card ${!a&&this.activeUtilitySel===o.plop?"active":""} ${a?"locked":""}" data-util-plop="${o.plop}" ${a?"disabled":""}>
                <div class="tl-item-ico">${Ot[o.plop]??Ot.utility}</div>
                <div class="tl-item-name">${r.labelZh}</div>
                <div class="tl-item-meta">${a?`${Ot.lock} 需${l}人`:`¥${r.cost.toLocaleString("zh-CN")}`}</div>
              </button>`}).join("")}
        </div>
      `}else if(t==="service"){const i=hr.some(o=>Ue[o].milestoneTier<=e);this.subpanelEl.innerHTML=`
        ${n}
        <div class="tl-sub-controls">
          <span class="tl-sub-hint">${i?"公共服务提升地价与幸福度，助建筑升级":"人口达到 250（海风村落）解锁首批公共服务"}</span>
          ${i?`<button type="button" class="tl-mini-btn" data-rotate-plop="1">${Ot.rotate}<span>旋转 (R)</span></button>`:""}
        </div>
        <div class="tl-sub-items">
          ${hr.map(o=>{const r=Ue[o],a=r.milestoneTier>e,l=cs(r.milestoneTier);return`
              <button type="button" class="tl-item-card ${!a&&this.activeServiceSel===o?"active":""} ${a?"locked":""}" data-service-plop="${o}" ${a?"disabled":""}>
                <div class="tl-item-ico">${Ot[o]??Ot.service}</div>
                <div class="tl-item-name">${r.labelZh}</div>
                <div class="tl-item-meta">${a?`${Ot.lock} 需${l}人`:`¥${r.cost.toLocaleString("zh-CN")}`}</div>
              </button>`}).join("")}
        </div>
      `}else t==="park"?this.subpanelEl.innerHTML=`
        ${n}
        <div class="tl-sub-controls">
          <span class="tl-sub-hint">公园可大幅提升周边地价、降低噪音</span>
          <button type="button" class="tl-mini-btn" data-rotate-plop="1">${Ot.rotate}<span>旋转 (R)</span></button>
        </div>
        <div class="tl-sub-items">
          ${B0.map(i=>{const o=Ue[i],r=o.milestoneTier>e,a=cs(o.milestoneTier);return`
              <button type="button" class="tl-item-card ${!r&&this.activeParkSel===i?"active":""} ${r?"locked":""}" data-park-plop="${i}" ${r?"disabled":""}>
                <div class="tl-item-ico">${Ot[i]??Ot.park}</div>
                <div class="tl-item-name">${o.labelZh}</div>
                <div class="tl-item-meta">${r?`${Ot.lock} 需${a}人`:`¥${o.cost.toLocaleString("zh-CN")}`}</div>
              </button>`}).join("")}
        </div>
      `:t==="bulldoze"?this.subpanelEl.innerHTML=`
        ${n}
        <div class="tl-sub-controls">
          <span class="tl-sub-hint" style="color:#C84646;font-weight:600;">拆除模式：点击任意建筑、路段或管线即可拆除（道路与设施返还 50% 费用）· Esc 或右键退出</span>
        </div>
      `:t==="info"&&(this.subpanelEl.innerHTML=`
        ${n}
        <div class="tl-sub-controls">
          <span class="tl-sub-hint">切换城市数据热力图与管网视图</span>
        </div>
        <div class="tl-overlay-grid">
          ${Ql.map(i=>`<button type="button" class="tl-pill tl-ov-btn ${this.currentOverlay===i.id?"active":""}" data-overlay-pick="${i.id}">${i.zh}</button>`).join("")}
        </div>
      `);this.bindSubpanelEvents()}bindSubpanelEvents(){this.subpanelEl.querySelector("[data-sub-close]")?.addEventListener("click",()=>{this.selectCategory("none")});for(const t of Array.from(this.subpanelEl.querySelectorAll("[data-road-mode]")))t.addEventListener("click",()=>{this.activeRoadMode=t.dataset.roadMode,this.emitActiveTool(),this.renderSubpanel()});this.subpanelEl.querySelector("[data-road-snap]")?.addEventListener("click",()=>{this.roadSnap=!this.roadSnap,this.emitActiveTool(),this.renderSubpanel()});for(const t of Array.from(this.subpanelEl.querySelectorAll("[data-road-type]")))t.addEventListener("click",()=>{this.activeRoadType=t.dataset.roadType,this.emitActiveTool(),this.renderSubpanel()});for(const t of Array.from(this.subpanelEl.querySelectorAll("[data-zone-brush]")))t.addEventListener("click",()=>{this.activeZoneBrush=t.dataset.zoneBrush,this.emitActiveTool(),this.renderSubpanel()});for(const t of Array.from(this.subpanelEl.querySelectorAll("[data-zone-type]")))t.addEventListener("click",()=>{this.activeZone=t.dataset.zoneType,this.emitActiveTool(),this.renderSubpanel()});for(const t of Array.from(this.subpanelEl.querySelectorAll("[data-util-line]")))t.addEventListener("click",()=>{this.activeUtilitySel=t.dataset.utilLine,this.emitActiveTool(),this.renderSubpanel()});for(const t of Array.from(this.subpanelEl.querySelectorAll("[data-util-plop]")))t.addEventListener("click",()=>{this.activeUtilitySel=t.dataset.utilPlop,this.emitActiveTool(),this.renderSubpanel()});for(const t of Array.from(this.subpanelEl.querySelectorAll("[data-service-plop]")))t.addEventListener("click",()=>{this.activeServiceSel=t.dataset.servicePlop,this.emitActiveTool(),this.renderSubpanel()});for(const t of Array.from(this.subpanelEl.querySelectorAll("[data-park-plop]")))t.addEventListener("click",()=>{this.activeParkSel=t.dataset.parkPlop,this.emitActiveTool(),this.renderSubpanel()});this.subpanelEl.querySelector("[data-rotate-plop]")?.addEventListener("click",()=>{this.callbacks.onRotatePloppable()});for(const t of Array.from(this.subpanelEl.querySelectorAll("[data-overlay-pick]")))t.addEventListener("click",()=>{const e=t.dataset.overlayPick;this.callbacks.onOverlayChange(e)})}renderLegend(){const t=Ql.find(o=>o.id===this.currentOverlay);if(!t||!t.legend){this.legendBarEl.innerHTML="";return}const[e,n,i]=t.legend;this.legendBarEl.innerHTML=`
      <div class="tl-glass tl-legend">
        <span class="tl-legend-name">${t.zh}视图</span>
        <span class="tl-legend-lbl">${e}</span>
        <span class="tl-legend-grad" style="background:linear-gradient(90deg, ${n});"></span>
        <span class="tl-legend-lbl">${i}</span>
        <button type="button" class="tl-legend-close" data-clear-ov title="关闭视图">${Ot.close}</button>
      </div>
    `,this.legendBarEl.querySelector("[data-clear-ov]")?.addEventListener("click",()=>{this.callbacks.onOverlayChange("none")})}renderInspectCard(){const t=this.inspectedBuilding;if(!t){this.inspectCardEl.innerHTML="";return}const e=Jl(t.problems),n=t.zone==="res_low"||t.zone==="res_high",i=t.kind==="growable"?Js[t.zone]:"#2B7A9B",o=t.kind==="growable"?`Lv.${t.level} / ${t.maxLevel}`:"公共设施";this.inspectCardEl.innerHTML=`
      <div class="tl-glass tl-inspect-card">
        <div class="tl-card-head">
          <div class="tl-card-title-wrap">
            <span class="tl-card-dot" style="background:${i};"></span>
            <div>
              <div class="tl-card-title">${t.labelZh} <span class="tl-card-lvl">${o}</span></div>
              <div class="tl-card-sub">${t.labelEn}${t.abandoned?" · 已废弃":t.progress<.99?` · 建造中 ${Math.round(t.progress*100)}%`:""}</div>
            </div>
          </div>
          <button type="button" class="tl-icon-btn" data-inspect-close title="关闭">${Ot.close}</button>
        </div>

        <div class="tl-card-grid">
          ${n?`<div class="tl-kv"><span>居民</span><strong>${t.residents} 人 (${t.households}/${t.capacityHouseholds} 户)</strong></div>`:`<div class="tl-kv"><span>岗位</span><strong>${t.workers} / ${t.capacityJobs}</strong></div>`}
          <div class="tl-kv"><span>幸福度</span><strong>${t.happiness}%</strong></div>
          <div class="tl-kv"><span>地价</span><strong>${t.landValue}</strong></div>
          <div class="tl-kv"><span>服务覆盖</span><strong>${t.serviceCoverage}%</strong></div>
          ${t.taxRate!==void 0?`<div class="tl-kv"><span>适用税率</span><strong>${t.taxRate}%</strong></div>`:t.upkeepPerDay!==void 0?`<div class="tl-kv"><span>每日维护</span><strong>¥${t.upkeepPerDay}/天</strong></div>`:""}
          <div class="tl-kv"><span>噪音/污染</span><strong>${t.noise} / ${t.pollution}</strong></div>
        </div>

        <div class="tl-chip-row">
          <span class="tl-chip ${t.hasPower?"ok":"warn"}">电力 ${t.hasPower?"✓":"✗"}</span>
          <span class="tl-chip ${t.hasWater?"ok":"warn"}">供水 ${t.hasWater?"✓":"✗"}</span>
          <span class="tl-chip ${t.hasSewage?"ok":"warn"}">排污 ${t.hasSewage?"✓":"✗"}</span>
        </div>

        ${e.length>0?`<div class="tl-prob-list">
                ${e.map(r=>`<span class="tl-prob-pill" style="--prob-col:${r.color};">${r.icon}<span>${r.labelZh}</span></span>`).join("")}
              </div>`:""}

        <div class="tl-card-foot">
          <button type="button" class="tl-danger-btn" data-inspect-bulldoze="${t.id}">${Ot.bulldoze}<span>拆除建筑</span></button>
        </div>
      </div>
    `,this.inspectCardEl.querySelector("[data-inspect-close]")?.addEventListener("click",()=>{this.callbacks.onCloseInspect()}),this.inspectCardEl.querySelector("[data-inspect-bulldoze]")?.addEventListener("click",()=>{this.callbacks.onBulldozeBuilding(t.id)})}renderBudgetModal(){if(!this.budgetOpen||!this.latestSnapshot){this.budgetModalEl.innerHTML="";return}const t=this.latestSnapshot.stats,e=t.finance,n=ca.find(o=>o.tier===t.milestoneTier+1),i=n?Math.min(100,Math.round(t.population/n.populationRequired*100)):100;this.budgetModalEl.innerHTML=`
      <div class="tl-glass tl-panel-card">
        <div class="tl-card-head">
          <div>
            <div class="tl-card-title">财政、税收与里程碑</div>
            <div class="tl-card-sub">Budget & Taxation · 调整税率与公共服务预算</div>
          </div>
          <button type="button" class="tl-icon-btn" data-budget-close title="关闭">${Ot.close}</button>
        </div>

        <div class="tl-fin-summary">
          <div class="tl-fin-box">
            <span>当前资金</span>
            <strong data-fin="money">¥${t.money.toLocaleString("zh-CN")}</strong>
          </div>
          <div class="tl-fin-box">
            <span>每周收入</span>
            <strong class="tl-pos" data-fin="inc">+¥${e.weeklyIncome.toLocaleString("zh-CN")}</strong>
          </div>
          <div class="tl-fin-box">
            <span>每周支出</span>
            <strong class="tl-neg" data-fin="exp">-¥${e.weeklyExpenses.toLocaleString("zh-CN")}</strong>
          </div>
          <div class="tl-fin-box">
            <span>每周净结余</span>
            <strong class="${t.weeklyNet>=0?"tl-pos":"tl-neg"}" data-fin="net">${t.weeklyNet>=0?"+":""}¥${t.weeklyNet.toLocaleString("zh-CN")}</strong>
          </div>
        </div>

        <div class="tl-ms-bar-wrap">
          <div class="tl-ms-row">
            <span>当前阶段：<strong>${t.milestoneNameZh}</strong></span>
            <span>${n?`下一阶段 ${n.nameZh} (${t.population}/${n.populationRequired} 人口)`:"已达最高阶段"}</span>
          </div>
          <div class="tl-ms-track"><div class="tl-ms-fill" style="width:${i}%;"></div></div>
        </div>

        <div class="tl-tabs">
          <button type="button" class="tl-tab ${this.budgetTab==="taxes"?"active":""}" data-btab="taxes">分区税率 (1%–29%)</button>
          <button type="button" class="tl-tab ${this.budgetTab==="budgets"?"active":""}" data-btab="budgets">服务预算 (50%–150%)</button>
        </div>

        <div class="tl-slider-list">
          ${this.budgetTab==="taxes"?Ao.map(o=>{const r=zi[o],a=t.taxRates[o],l=e.incomeByZone[o]??0;return`
                    <label class="tl-slider-row">
                      <span class="tl-sl-name"><span class="tl-swatch" style="background:${Js[o]};"></span>${r.labelZh}</span>
                      <input type="range" min="1" max="29" step="1" value="${a}" data-tax-zone="${o}" />
                      <span class="tl-sl-val" data-tax-val="${o}">${a}%</span>
                      <span class="tl-sl-amt tl-pos" data-tax-rev="${o}">+¥${l.toLocaleString("zh-CN")}/周</span>
                    </label>`}).join(""):tc.map(o=>{const r=t.budgets[o.id],a=e.expenseByCategory[o.id]??0;return`
                    <label class="tl-slider-row">
                      <span class="tl-sl-name">${o.zh}</span>
                      <input type="range" min="50" max="150" step="5" value="${r}" data-bud-cat="${o.id}" />
                      <span class="tl-sl-val" data-bud-val="${o.id}">${r}%</span>
                      <span class="tl-sl-amt tl-neg" data-bud-exp="${o.id}">-¥${a.toLocaleString("zh-CN")}/周</span>
                    </label>`}).join("")}
        </div>
      </div>
    `,this.budgetModalEl.querySelector("[data-budget-close]")?.addEventListener("click",()=>this.setBudgetOpen(!1));for(const o of Array.from(this.budgetModalEl.querySelectorAll("[data-btab]")))o.addEventListener("click",()=>{this.budgetTab=o.dataset.btab,this.renderBudgetModal()});for(const o of Array.from(this.budgetModalEl.querySelectorAll("[data-tax-zone]"))){const r=o.dataset.taxZone;o.addEventListener("input",()=>{const a=Number(o.value),l=this.budgetModalEl.querySelector(`[data-tax-val="${r}"]`);l&&(l.textContent=`${a}%`),this.callbacks.onSetTaxRate(r,a)})}for(const o of Array.from(this.budgetModalEl.querySelectorAll("[data-bud-cat]"))){const r=o.dataset.budCat;o.addEventListener("input",()=>{const a=Number(o.value),l=this.budgetModalEl.querySelector(`[data-bud-val="${r}"]`);l&&(l.textContent=`${a}%`),this.callbacks.onSetBudget(r,a)})}}updateBudgetLiveNumbers(t){const e=t.stats,n=e.finance,i=this.budgetModalEl.querySelector('[data-fin="money"]'),o=this.budgetModalEl.querySelector('[data-fin="inc"]'),r=this.budgetModalEl.querySelector('[data-fin="exp"]'),a=this.budgetModalEl.querySelector('[data-fin="net"]');i&&(i.textContent=`¥${e.money.toLocaleString("zh-CN")}`),o&&(o.textContent=`+¥${n.weeklyIncome.toLocaleString("zh-CN")}`),r&&(r.textContent=`-¥${n.weeklyExpenses.toLocaleString("zh-CN")}`),a&&(a.textContent=`${e.weeklyNet>=0?"+":""}¥${e.weeklyNet.toLocaleString("zh-CN")}`,a.className=e.weeklyNet>=0?"tl-pos":"tl-neg");for(const l of Ao){const c=this.budgetModalEl.querySelector(`[data-tax-rev="${l}"]`);c&&(c.textContent=`+¥${(n.incomeByZone[l]??0).toLocaleString("zh-CN")}/周`)}for(const l of tc){const c=this.budgetModalEl.querySelector(`[data-bud-exp="${l.id}"]`);c&&(c.textContent=`-¥${(n.expenseByCategory[l.id]??0).toLocaleString("zh-CN")}/周`)}}renderSaveModal(){if(!this.saveOpen){this.saveModalEl.innerHTML="";return}const t=e=>{const n=new Date(e),i=o=>String(o).padStart(2,"0");return`${n.getMonth()+1}/${n.getDate()} ${i(n.getHours())}:${i(n.getMinutes())}`};this.saveModalEl.innerHTML=`
      <div class="tl-glass tl-panel-card">
        <div class="tl-card-head">
          <div>
            <div class="tl-card-title">城市存档管理</div>
            <div class="tl-card-sub">Save & Load · 本地自动存档 + 3 个手动存档槽</div>
          </div>
          <button type="button" class="tl-icon-btn" data-save-close title="关闭">${Ot.close}</button>
        </div>

        <div class="tl-slot-list">
          ${this.saveSlotsCache.map(e=>{const n=e.meta;return`
                <div class="tl-slot-row">
                  <div class="tl-slot-info">
                    <div class="tl-slot-name">${e.label} ${e.isAuto?'<span class="tl-tag">自动</span>':""}</div>
                    <div class="tl-slot-meta">
                      ${n?`第 ${n.simDay} 天 · ${n.population.toLocaleString("zh-CN")} 人 · ¥${n.money.toLocaleString("zh-CN")} · ${n.milestoneNameZh} · ${t(n.savedAt)}`:"空存档槽"}
                    </div>
                  </div>
                  <div class="tl-slot-actions">
                    ${e.isAuto?"":`<button type="button" class="tl-mini-btn active" data-slot-save="${e.slotId}">保存</button>`}
                    <button type="button" class="tl-mini-btn" data-slot-load="${e.slotId}" ${n?"":"disabled"}>读取</button>
                    ${n&&!e.isAuto?`<button type="button" class="tl-mini-btn tl-btn-del" data-slot-del="${e.slotId}">删除</button>`:""}
                  </div>
                </div>`}).join("")}
        </div>

        <div class="tl-save-footer">
          <button type="button" class="tl-mini-btn" data-new-city="empty">新建空白海湾城</button>
          <button type="button" class="tl-mini-btn" data-new-city="demo">载入示例小镇</button>
          <button type="button" class="tl-mini-btn" data-open-about="1">关于 · 致谢</button>
        </div>
      </div>
    `,this.saveModalEl.querySelector("[data-save-close]")?.addEventListener("click",()=>this.setSaveOpen(!1)),this.saveModalEl.querySelector("[data-open-about]")?.addEventListener("click",()=>this.setAboutOpen(!0));for(const e of Array.from(this.saveModalEl.querySelectorAll("[data-slot-save]")))e.addEventListener("click",()=>this.callbacks.onSaveSlot(e.dataset.slotSave));for(const e of Array.from(this.saveModalEl.querySelectorAll("[data-slot-load]")))e.addEventListener("click",()=>this.callbacks.onLoadSlot(e.dataset.slotLoad));for(const e of Array.from(this.saveModalEl.querySelectorAll("[data-slot-del]")))e.addEventListener("click",()=>this.callbacks.onDeleteSlot(e.dataset.slotDel));this.saveModalEl.querySelector('[data-new-city="empty"]')?.addEventListener("click",()=>{this.setSaveOpen(!1),this.callbacks.onNewCity(!1)}),this.saveModalEl.querySelector('[data-new-city="demo"]')?.addEventListener("click",()=>{this.setSaveOpen(!1),this.callbacks.onNewCity(!0)})}renderAboutModal(){if(!this.aboutOpen){this.aboutModalEl.innerHTML="";return}const t=[{id:"low",zh:"流畅 (低)"},{id:"medium",zh:"均衡 (中)"},{id:"high",zh:"精致 (高)"}];this.aboutModalEl.innerHTML=`
      <div class="tl-glass tl-panel-card">
        <div class="tl-card-head">
          <div>
            <div class="tl-card-title">关于汐光市 · Tidelight</div>
            <div class="tl-card-sub">原创海滨微缩城市建造模拟 · Original Coastal City-Builder</div>
          </div>
          <button type="button" class="tl-icon-btn" data-about-close title="关闭">${Ot.close}</button>
        </div>

        <div class="tl-about-sec">
          <div class="tl-about-lbl">画质预设 · Visual Quality</div>
          <div class="tl-seg-group">
            ${t.map(e=>`<button type="button" class="tl-mini-btn ${this.currentQuality===e.id?"active":""}" data-set-quality="${e.id}">${e.zh}</button>`).join("")}
          </div>
        </div>

        <div class="tl-about-sec">
          <div class="tl-about-lbl">开源致谢与原创声明 · Credits</div>
          <ul class="tl-credit-list">
            <li><strong>Three.js</strong> (MIT) — WebGL2 3D 场景渲染与自定义着色器</li>
            <li><strong>Vite</strong> (MIT) &amp; <strong>TypeScript</strong> (Apache-2.0) — 构建与类型系统</li>
            <li><strong>Vitest</strong> (MIT) — 仿真核心自动化测试</li>
            <li><strong>100% 原创程序化资产</strong> — 所有建筑网格、立面/地形纹理、海面/移轴着色器及 SVG 图标均为本项目原创生成（详见 CREDITS.md）。</li>
          </ul>
        </div>
      </div>
    `,this.aboutModalEl.querySelector("[data-about-close]")?.addEventListener("click",()=>this.setAboutOpen(!1));for(const e of Array.from(this.aboutModalEl.querySelectorAll("[data-set-quality]")))e.addEventListener("click",()=>{const n=e.dataset.setQuality;this.currentQuality=n,this.callbacks.onQualityChange?.(n),this.renderAboutModal()})}injectStyles(){if(document.getElementById("tl-hud-styles"))return;const t=document.createElement("style");t.id="tl-hud-styles",t.textContent=`
      html, body, #app {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        overscroll-behavior: none;
        touch-action: none;
        user-select: none;
        -webkit-user-select: none;
        -webkit-touch-callout: none;
        font-family: "PingFang SC", "Noto Sans SC", "Inter", system-ui, -apple-system, sans-serif;
        background: #D7ECFA;
      }
      .tl-ico {
        width: 19px;
        height: 19px;
        flex-shrink: 0;
      }
      .tl-problem-layer {
        position: fixed;
        inset: 0;
        pointer-events: none;
        z-index: 6;
        overflow: hidden;
      }
      .tl-prob-badge {
        position: absolute;
        left: 0;
        top: 0;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        border: 1.5px solid rgba(255, 255, 255, 0.94);
        background: var(--prob-col, #E55B5B);
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        cursor: pointer;
        pointer-events: auto;
        opacity: 0.9;
        box-shadow: 0 2px 8px rgba(20, 32, 48, 0.24);
      }
      .tl-prob-svg {
        width: 12px;
        height: 12px;
      }
      .tl-pause-btn .tl-ico {
        width: 15px;
        height: 15px;
      }
      .tl-hud {
        position: fixed;
        inset: 0;
        pointer-events: none;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: max(10px, env(safe-area-inset-top)) max(12px, env(safe-area-inset-right)) max(10px, env(safe-area-inset-bottom)) max(12px, env(safe-area-inset-left));
        box-sizing: border-box;
        z-index: 10;
        color: #1F3245;
      }
      .tl-topbar {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
      }
      .tl-glass {
        pointer-events: auto;
        background: rgba(252, 250, 246, 0.86);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(40, 62, 82, 0.14);
        border-radius: 14px;
        box-shadow: 0 8px 24px rgba(24, 42, 62, 0.12);
        transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease;
      }
      .tl-night {
        color: #EDF3FA;
      }
      .tl-night .tl-glass {
        background: rgba(18, 28, 52, 0.84);
        border-color: rgba(164, 198, 238, 0.22);
        box-shadow: 0 8px 24px rgba(4, 10, 24, 0.42);
      }
      .tl-brand {
        display: flex;
        align-items: center;
        gap: 9px;
        padding: 6px 13px;
      }
      .tl-brand-btn {
        appearance: none;
        color: inherit;
        font: inherit;
        cursor: pointer;
      }
      .tl-brand-btn:hover {
        border-color: rgba(43, 122, 155, 0.36);
      }
      .tl-about-sec {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .tl-about-lbl {
        font-size: 11.5px;
        font-weight: 700;
        opacity: 0.78;
      }
      .tl-credit-list {
        margin: 0;
        padding-left: 18px;
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 12px;
        line-height: 1.45;
      }
      .tl-logo {
        width: 24px;
        height: 24px;
        color: #2B7A9B;
        flex-shrink: 0;
      }
      .tl-night .tl-logo { color: #5CC4C8; }
      .tl-title {
        font-size: 15px;
        font-weight: 700;
        letter-spacing: 0.02em;
        line-height: 1.15;
      }
      .tl-sub {
        font-size: 11px;
        font-weight: 500;
        opacity: 0.65;
        margin-left: 3px;
      }
      .tl-milestone {
        font-size: 11px;
        opacity: 0.72;
        margin-top: 1px;
      }
      .tl-stats {
        display: flex;
        align-items: center;
        gap: 11px;
        padding: 6px 14px;
        font-variant-numeric: tabular-nums;
      }
      .tl-stat {
        display: flex;
        align-items: baseline;
        gap: 5px;
      }
      .tl-stat-btn {
        appearance: none;
        border: none;
        background: transparent;
        color: inherit;
        font: inherit;
        padding: 2px 5px;
        margin: -2px -5px;
        border-radius: 8px;
        cursor: pointer;
      }
      .tl-stat-btn:hover { background: rgba(43, 122, 155, 0.1); }
      .tl-label { font-size: 11px; opacity: 0.66; font-weight: 600; }
      .tl-val { font-size: 14px; font-weight: 700; }
      .tl-delta { font-size: 11px; font-weight: 600; }
      .tl-pos { color: #2B935E; }
      .tl-neg { color: #D95050; }
      .tl-night .tl-pos { color: #67D49A; }
      .tl-night .tl-neg { color: #F57A7A; }
      .tl-sep { width: 1px; height: 18px; background: rgba(40, 62, 82, 0.16); }
      .tl-night .tl-sep { background: rgba(164, 198, 238, 0.2); }
      .tl-rci {
        display: flex;
        align-items: flex-end;
        gap: 5px;
        padding: 5px 10px;
      }
      .tl-rci-col {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
        font-size: 10px;
        font-weight: 600;
      }
      .tl-rci-track {
        width: 8px;
        height: 24px;
        border-radius: 4px;
        background: rgba(40, 62, 82, 0.12);
        display: flex;
        align-items: flex-end;
        overflow: hidden;
      }
      .tl-night .tl-rci-track { background: rgba(255, 255, 255, 0.14); }
      .tl-rci-fill { width: 100%; height: 40%; border-radius: 4px; transition: height 0.2s ease; }
      .tl-r { background: #5EC96F; }
      .tl-c { background: #56ACEE; }
      .tl-i { background: #EEA93B; }
      .tl-o { background: #41BEB9; }
      .tl-speeds, .tl-top-actions, .tl-cams {
        display: flex;
        align-items: center;
        gap: 3px;
        padding: 4px;
      }
      .tl-btn, .tl-pill, .tl-mini-btn {
        appearance: none;
        border: none;
        background: transparent;
        color: inherit;
        font: inherit;
        font-size: 12px;
        font-weight: 600;
        padding: 6px 10px;
        border-radius: 9px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 5px;
        transition: background 0.15s ease, color 0.15s ease;
        white-space: nowrap;
      }
      .tl-act-btn .tl-ico { width: 16px; height: 16px; }
      .tl-mini-btn {
        background: rgba(40, 62, 82, 0.06);
        padding: 5px 10px;
      }
      .tl-night .tl-mini-btn { background: rgba(255, 255, 255, 0.08); }
      .tl-mini-btn .tl-ico { width: 15px; height: 15px; }
      .tl-btn:hover, .tl-pill:hover, .tl-mini-btn:hover {
        background: rgba(43, 122, 155, 0.14);
      }
      .tl-btn.active, .tl-pill.active, .tl-mini-btn.active {
        background: #2B7A9B;
        color: #FFFFFF;
      }
      .tl-night .tl-btn.active, .tl-night .tl-pill.active, .tl-night .tl-mini-btn.active {
        background: #4CB2C4;
        color: #0D1B2A;
      }
      .tl-mini-btn:disabled { opacity: 0.42; cursor: not-allowed; }
      .tl-btn-del { color: #C84646; }

      /* Bottom build dock + subpanel */
      .tl-bottom-stack {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        width: 100%;
        pointer-events: none;
      }
      .tl-bottombar {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        align-items: end;
        width: 100%;
        gap: 8px;
        pointer-events: none;
      }
      .tl-cams { justify-self: end; }
      .tl-dock {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 5px 6px;
        justify-self: center;
      }
      .tl-dock-btn {
        appearance: none;
        border: none;
        background: transparent;
        color: inherit;
        font: inherit;
        min-width: 56px;
        min-height: 46px;
        padding: 5px 9px;
        border-radius: 10px;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2px;
        font-size: 11px;
        font-weight: 600;
        transition: background 0.15s ease, color 0.15s ease, transform 0.1s ease;
      }
      .tl-dock-btn:hover { background: rgba(43, 122, 155, 0.12); }
      .tl-dock-btn.active {
        background: #2B7A9B;
        color: #FFFFFF;
      }
      .tl-night .tl-dock-btn.active {
        background: #4CB2C4;
        color: #0D1B2A;
      }

      .tl-subpanel {
        max-width: min(860px, 100%);
        padding: 8px 12px 10px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        box-sizing: border-box;
      }
      .tl-sheet-header {
        display: none;
        align-items: center;
        justify-content: center;
        position: relative;
        height: 16px;
      }
      .tl-sheet-handle {
        width: 36px;
        height: 4px;
        border-radius: 99px;
        background: rgba(40, 62, 82, 0.25);
      }
      .tl-sheet-close {
        position: absolute;
        right: 0;
        top: -4px;
        appearance: none;
        border: none;
        background: transparent;
        color: inherit;
        cursor: pointer;
        padding: 4px;
      }
      .tl-sub-controls {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 8px;
      }
      .tl-seg-group {
        display: flex;
        align-items: center;
        gap: 4px;
        flex-wrap: wrap;
      }
      .tl-sub-hint {
        font-size: 11.5px;
        opacity: 0.75;
      }
      .tl-util-summary {
        display: flex;
        align-items: center;
        gap: 6px;
        flex-wrap: wrap;
      }
      .tl-sub-items {
        display: flex;
        align-items: stretch;
        gap: 6px;
        overflow-x: auto;
        padding-bottom: 2px;
        scrollbar-width: thin;
        touch-action: pan-x;
      }
      .tl-item-card {
        appearance: none;
        border: 1px solid rgba(40, 62, 82, 0.12);
        background: rgba(255, 255, 255, 0.62);
        color: inherit;
        font: inherit;
        min-width: 82px;
        min-height: 66px;
        padding: 7px 8px;
        border-radius: 11px;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 3px;
        flex-shrink: 0;
        transition: background 0.14s ease, border-color 0.14s ease, transform 0.1s ease;
      }
      .tl-night .tl-item-card {
        background: rgba(255, 255, 255, 0.06);
        border-color: rgba(164, 198, 238, 0.18);
      }
      .tl-item-card:hover:not(:disabled) {
        border-color: #2B7A9B;
        background: rgba(43, 122, 155, 0.1);
      }
      .tl-item-card.active {
        background: #2B7A9B;
        border-color: #2B7A9B;
        color: #FFFFFF;
      }
      .tl-night .tl-item-card.active {
        background: #4CB2C4;
        border-color: #4CB2C4;
        color: #0D1B2A;
      }
      .tl-item-card.locked {
        opacity: 0.52;
        cursor: not-allowed;
      }
      .tl-item-ico .tl-ico { width: 21px; height: 21px; }
      .tl-item-name { font-size: 11.5px; font-weight: 700; line-height: 1.15; }
      .tl-item-meta {
        font-size: 10.5px;
        opacity: 0.78;
        display: inline-flex;
        align-items: center;
        gap: 3px;
        font-variant-numeric: tabular-nums;
      }
      .tl-item-meta .tl-ico { width: 11px; height: 11px; }
      .tl-swatch {
        display: inline-block;
        width: 9px;
        height: 9px;
        border-radius: 3px;
        margin-right: 3px;
      }
      .tl-overlay-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
      }
      .tl-ov-btn {
        background: rgba(40, 62, 82, 0.06);
        min-height: 34px;
      }
      .tl-night .tl-ov-btn { background: rgba(255, 255, 255, 0.08); }

      /* Floating legend */
      .tl-legend-wrap {
        position: fixed;
        top: max(68px, calc(env(safe-area-inset-top) + 58px));
        left: 12px;
        pointer-events: none;
      }
      .tl-legend {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 6px 10px;
        font-size: 11.5px;
      }
      .tl-legend-name { font-weight: 700; }
      .tl-legend-lbl { opacity: 0.72; font-size: 11px; }
      .tl-legend-grad { width: 88px; height: 8px; border-radius: 99px; }
      .tl-legend-close {
        appearance: none;
        border: none;
        background: transparent;
        color: inherit;
        cursor: pointer;
        padding: 2px;
        display: flex;
      }
      .tl-legend-close .tl-ico { width: 14px; height: 14px; }

      /* Live cursor readout */
      .tl-readout {
        position: fixed;
        pointer-events: none;
        padding: 7px 11px;
        border-radius: 11px;
        display: flex;
        flex-direction: column;
        gap: 2px;
        z-index: 25;
        font-variant-numeric: tabular-nums;
      }
      .tl-readout.tl-invalid {
        border-color: rgba(229, 91, 91, 0.6);
      }
      .tl-ro-row { display: flex; align-items: center; gap: 7px; white-space: nowrap; }
      .tl-ro-title { font-size: 12.5px; font-weight: 700; }
      .tl-ro-cost { font-size: 12px; font-weight: 700; color: #2B7A9B; }
      .tl-night .tl-ro-cost { color: #67D4E0; }
      .tl-readout.tl-invalid .tl-ro-cost, .tl-readout.tl-invalid .tl-ro-hint { color: #D95050; }
      .tl-ro-snap {
        font-size: 10.5px;
        font-weight: 700;
        padding: 1px 6px;
        border-radius: 6px;
        background: rgba(47, 183, 164, 0.18);
        color: #1A7F72;
      }
      .tl-night .tl-ro-snap { color: #7EEAD8; }
      .tl-ro-hint { font-size: 10.5px; opacity: 0.74; }

      /* Toasts */
      .tl-toasts {
        position: fixed;
        top: max(66px, calc(env(safe-area-inset-top) + 56px));
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
        pointer-events: none;
        z-index: 30;
      }
      .tl-toast {
        padding: 9px 16px;
        border-radius: 12px;
        text-align: center;
        transition: opacity 0.25s ease, transform 0.25s ease;
      }
      .tl-toast-title { font-size: 13px; font-weight: 700; }
      .tl-toast-sub { font-size: 11.5px; opacity: 0.8; margin-top: 2px; }
      .tl-toast-warn { border-color: rgba(229, 91, 91, 0.55); }
      .tl-toast-milestone {
        border-color: rgba(232, 184, 75, 0.85);
        background: rgba(255, 249, 232, 0.94);
      }
      .tl-night .tl-toast-milestone {
        background: rgba(34, 46, 74, 0.94);
        border-color: rgba(242, 201, 76, 0.75);
      }
      .tl-toast-out { opacity: 0; transform: translateY(-6px); }

      /* Inspect card & Modals */
      .tl-inspect-wrap {
        position: fixed;
        right: max(12px, env(safe-area-inset-right));
        top: max(70px, calc(env(safe-area-inset-top) + 60px));
        pointer-events: none;
        z-index: 18;
      }
      .tl-inspect-card {
        width: 274px;
        padding: 12px 14px;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .tl-modal-wrap {
        position: fixed;
        top: max(68px, calc(env(safe-area-inset-top) + 58px));
        right: max(12px, env(safe-area-inset-right));
        pointer-events: none;
        z-index: 22;
      }
      .tl-panel-card {
        width: min(440px, calc(100vw - 24px));
        max-height: calc(100vh - 180px);
        overflow-y: auto;
        touch-action: pan-y;
        padding: 14px 16px;
        display: flex;
        flex-direction: column;
        gap: 11px;
        box-sizing: border-box;
      }
      .tl-card-head {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 8px;
      }
      .tl-card-title-wrap { display: flex; align-items: center; gap: 9px; }
      .tl-card-dot { width: 12px; height: 12px; border-radius: 4px; flex-shrink: 0; }
      .tl-card-title { font-size: 14.5px; font-weight: 700; }
      .tl-card-lvl { font-size: 11.5px; font-weight: 600; opacity: 0.7; margin-left: 4px; }
      .tl-card-sub { font-size: 11px; opacity: 0.68; margin-top: 1px; }
      .tl-icon-btn {
        appearance: none;
        border: none;
        background: transparent;
        color: inherit;
        cursor: pointer;
        padding: 4px;
        border-radius: 8px;
        display: flex;
      }
      .tl-icon-btn:hover { background: rgba(40, 62, 82, 0.1); }
      .tl-card-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 6px 10px;
        font-variant-numeric: tabular-nums;
      }
      .tl-kv {
        display: flex;
        flex-direction: column;
        background: rgba(40, 62, 82, 0.05);
        padding: 6px 8px;
        border-radius: 8px;
      }
      .tl-night .tl-kv { background: rgba(255, 255, 255, 0.06); }
      .tl-kv span { font-size: 10.5px; opacity: 0.68; }
      .tl-kv strong { font-size: 12.5px; margin-top: 1px; }
      .tl-chip-row { display: flex; flex-wrap: wrap; gap: 5px; }
      .tl-chip {
        font-size: 11px;
        font-weight: 600;
        padding: 3px 8px;
        border-radius: 99px;
        font-variant-numeric: tabular-nums;
      }
      .tl-chip.ok { background: rgba(47, 158, 102, 0.14); color: #22784C; }
      .tl-chip.warn { background: rgba(229, 91, 91, 0.16); color: #C23E3E; }
      .tl-night .tl-chip.ok { color: #7EE0AC; }
      .tl-night .tl-chip.warn { color: #FF8E8E; }
      .tl-prob-list { display: flex; flex-wrap: wrap; gap: 5px; }
      .tl-prob-pill {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 3px 8px;
        border-radius: 99px;
        background: var(--prob-col, #E55B5B);
        color: #fff;
        font-size: 11px;
        font-weight: 600;
      }
      .tl-card-foot { display: flex; justify-content: flex-end; }
      .tl-danger-btn {
        appearance: none;
        border: 1px solid rgba(217, 80, 80, 0.35);
        background: rgba(217, 80, 80, 0.1);
        color: #C84040;
        font: inherit;
        font-size: 12px;
        font-weight: 600;
        padding: 6px 11px;
        border-radius: 9px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 5px;
      }
      .tl-danger-btn:hover { background: rgba(217, 80, 80, 0.2); }
      .tl-danger-btn .tl-ico { width: 15px; height: 15px; }

      /* Budget panel internals */
      .tl-fin-summary {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 7px;
        font-variant-numeric: tabular-nums;
      }
      .tl-fin-box {
        background: rgba(40, 62, 82, 0.05);
        padding: 7px 10px;
        border-radius: 9px;
        display: flex;
        flex-direction: column;
      }
      .tl-night .tl-fin-box { background: rgba(255, 255, 255, 0.06); }
      .tl-fin-box span { font-size: 11px; opacity: 0.7; }
      .tl-fin-box strong { font-size: 14px; margin-top: 2px; }
      .tl-ms-bar-wrap { display: flex; flex-direction: column; gap: 4px; }
      .tl-ms-row { display: flex; justify-content: space-between; font-size: 11.5px; }
      .tl-ms-track {
        height: 7px;
        border-radius: 99px;
        background: rgba(40, 62, 82, 0.12);
        overflow: hidden;
      }
      .tl-ms-fill { height: 100%; background: linear-gradient(90deg, #2B7A9B, #5CC4C8); border-radius: 99px; }
      .tl-tabs { display: flex; gap: 6px; }
      .tl-tab {
        flex: 1;
        appearance: none;
        border: none;
        background: rgba(40, 62, 82, 0.07);
        color: inherit;
        font: inherit;
        font-size: 12px;
        font-weight: 600;
        padding: 7px 10px;
        border-radius: 9px;
        cursor: pointer;
      }
      .tl-tab.active { background: #2B7A9B; color: #fff; }
      .tl-slider-list { display: flex; flex-direction: column; gap: 7px; font-variant-numeric: tabular-nums; }
      .tl-slider-row {
        display: grid;
        grid-template-columns: 84px 1fr 40px 84px;
        align-items: center;
        gap: 8px;
        font-size: 12px;
      }
      .tl-slider-row input[type="range"] {
        width: 100%;
        accent-color: #2B7A9B;
        cursor: pointer;
        touch-action: pan-x;
      }
      .tl-sl-name { font-weight: 600; display: flex; align-items: center; }
      .tl-sl-val { font-weight: 700; text-align: right; }
      .tl-sl-amt { font-size: 11px; font-weight: 600; text-align: right; }

      /* Save slots */
      .tl-slot-list { display: flex; flex-direction: column; gap: 7px; }
      .tl-slot-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        padding: 9px 11px;
        border-radius: 10px;
        background: rgba(40, 62, 82, 0.05);
      }
      .tl-night .tl-slot-row { background: rgba(255, 255, 255, 0.06); }
      .tl-slot-name { font-size: 13px; font-weight: 700; display: flex; align-items: center; gap: 5px; }
      .tl-slot-meta { font-size: 11px; opacity: 0.72; margin-top: 2px; font-variant-numeric: tabular-nums; }
      .tl-slot-actions { display: flex; gap: 5px; flex-shrink: 0; }
      .tl-tag {
        font-size: 10px;
        padding: 1px 5px;
        border-radius: 5px;
        background: rgba(43, 122, 155, 0.16);
        color: #2B7A9B;
      }
      .tl-save-footer {
        display: flex;
        justify-content: space-between;
        gap: 8px;
        padding-top: 4px;
        border-top: 1px solid rgba(40, 62, 82, 0.1);
      }

      /* Mobile Portrait (e.g. 390x844) -> compact topbar + bottom sheet dock */
      @media (max-width: 720px) {
        .tl-hud {
          padding: max(8px, env(safe-area-inset-top)) max(8px, env(safe-area-inset-right)) max(8px, env(safe-area-inset-bottom)) max(8px, env(safe-area-inset-left));
        }
        .tl-topbar { gap: 5px; }
        .tl-brand { padding: 5px 9px; gap: 6px; }
        .tl-logo { width: 20px; height: 20px; }
        .tl-title { font-size: 13px; }
        .tl-sub { display: none; }
        .tl-milestone { font-size: 10px; }
        .tl-stats { padding: 5px 9px; gap: 7px; }
        .tl-val { font-size: 12.5px; }
        .tl-delta { display: none; }
        .tl-hide-sm { display: none; }
        .tl-rci { padding: 4px 7px; gap: 4px; }
        .tl-rci-track { width: 7px; height: 20px; }
        .tl-speeds { padding: 3px; gap: 2px; }
        .tl-speeds .tl-btn { padding: 5px 7px; font-size: 11px; min-height: 32px; }
        .tl-top-actions { padding: 3px; }
        .tl-top-actions .tl-btn { padding: 5px 7px; font-size: 11px; min-height: 32px; }
        .tl-bottombar {
          grid-template-columns: 1fr;
          justify-items: stretch;
        }
        .tl-dock-spacer, .tl-cams { display: none; }
        .tl-dock {
          width: 100%;
          box-sizing: border-box;
          justify-content: space-between;
          padding: 4px;
          gap: 2px;
        }
        .tl-dock-btn {
          flex: 1;
          min-width: 0;
          min-height: 48px;
          padding: 5px 2px;
          font-size: 10.5px;
        }
        .tl-dock-btn .tl-ico { width: 18px; height: 18px; }
        .tl-subpanel {
          width: 100%;
          border-radius: 16px;
          padding: 6px 10px 10px;
          max-height: 34vh;
        }
        .tl-sheet-header { display: flex; }
        .tl-item-card { min-width: 76px; min-height: 62px; }
        .tl-inspect-wrap {
          left: 8px;
          right: 8px;
          top: auto;
          bottom: calc(env(safe-area-inset-bottom) + 74px);
        }
        .tl-inspect-card { width: 100%; box-sizing: border-box; }
        .tl-modal-wrap {
          left: 8px;
          right: 8px;
          top: max(96px, calc(env(safe-area-inset-top) + 86px));
        }
        .tl-panel-card { width: 100%; max-height: 60vh; }
        .tl-slider-row { grid-template-columns: 74px 1fr 36px 70px; gap: 5px; font-size: 11.5px; }
      }

      /* Mobile Landscape compact */
      @media (max-height: 460px) {
        .tl-hud { padding: 6px max(10px, env(safe-area-inset-right)) max(6px, env(safe-area-inset-bottom)) max(10px, env(safe-area-inset-left)); }
        .tl-brand { padding: 4px 8px; }
        .tl-stats { padding: 4px 9px; }
        .tl-dock-btn { min-height: 40px; min-width: 48px; padding: 3px 6px; }
        .tl-subpanel { padding: 5px 9px; gap: 5px; }
        .tl-item-card { min-height: 50px; min-width: 72px; padding: 4px 6px; }
      }
    `,document.head.appendChild(t)}}const H0="#29485C",to="#22C7D6",G0="#FFFFFF",V0="#FFF8DB",W0="#1FC2B6",Qn="#E24C4C",X0="#FFE3E3",ur="#1FE0C8",dr="#F4BD44",ec="#F4C95D",$0={none:"#E55B5B",res_low:"#7ED389",res_high:"#2F9E66",com_low:"#69B8F5",com_high:"#2D74C4",ind:"#F0B94D",office:"#49C6C1"};function nc(s){s.traverse(t=>{(t instanceof Kt||t instanceof Eo||t instanceof Hi)&&(t.geometry.dispose(),Array.isArray(t.material)?t.material.forEach(e=>e.dispose()):t.material.dispose())})}function fs(s,t,e,n,i,o,r=.65,a=10){const l=[],c=[];for(const p of s){const g=hi(p,28);if(g.length<1)continue;const v=Math.max(6,Math.ceil(g.length/3.5)),m=l.length/3;for(let d=0;d<=v;d++){const x=d/v*g.length,y=ui(g,x),M=Oe(p,y),D=li(p,y),C=ci(D),E=Math.max(.25,o(M.x,M.z))+r;l.push(M.x+C.x*t,E,M.z+C.z*t),l.push(M.x+C.x*e,E,M.z+C.z*e)}for(let d=0;d<v;d++){const x=m+d*2;c.push(x,x+1,x+2,x+1,x+3,x+2)}}if(c.length===0)return null;const h=new fe;h.setAttribute("position",new Yt(l,3)),h.setIndex(c),h.computeVertexNormals();const u=new Me({color:n,transparent:!0,opacity:i,side:Ke,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-8,polygonOffsetUnits:-8}),f=new Kt(h,u);return f.renderOrder=a,f}function ic(s,t,e,n,i=.88){const o=[],r=[];for(const f of s){const p=hi(f,28);if(!(p.length<2))for(let g=1.5;g<p.length-1.5;g+=8.4){const v=Math.min(p.length-1,g+4.2);if(v-g<1)break;const m=ui(p,g),d=ui(p,v),x=Oe(f,m),y=Oe(f,d),M=ci(li(f,m)),D=ci(li(f,d)),C=Math.max(.25,n(x.x,x.z))+i,E=Math.max(.25,n(y.x,y.z))+i,L=o.length/3;o.push(x.x-M.x*t,C,x.z-M.z*t,x.x+M.x*t,C,x.z+M.z*t,y.x-D.x*t,E,y.z-D.z*t,y.x+D.x*t,E,y.z+D.z*t),r.push(L,L+1,L+2,L+1,L+3,L+2)}}if(r.length===0)return null;const c=new fe;c.setAttribute("position",new Yt(o,3)),c.setIndex(r),c.computeVertexNormals();const h=new Me({color:e,transparent:!0,opacity:.96,side:Ke,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-10,polygonOffsetUnits:-10}),u=new Kt(c,h);return u.renderOrder=13,u}function q0(s,t,e,n,i,o=.56){return fs(s,-t*.5,t*.5,e,n,i,o,10)}function Ze(s,t,e,n,i,o,r=.9,a=36){const l=new wa(n,i,a);l.rotateX(-Math.PI/2);const c=new Me({color:o,transparent:!0,opacity:r,side:Ke,depthWrite:!1}),h=new Kt(l,c);return h.position.set(s,t,e),h.renderOrder=14,h}function sc(s,t,e,n,i,o=.55,r=48){const a=[];for(let u=0;u<=r;u++){const f=u/r*Math.PI*2,p=s+Math.cos(f)*e,g=t+Math.sin(f)*e,v=Math.max(.2,i(p,g))+o;a.push(p,v,g)}const l=new fe;l.setAttribute("position",new Yt(a,3));const c=new ri({color:n,transparent:!0,opacity:.92,depthWrite:!1}),h=new Eo(l,c);return h.renderOrder=11,h}class Y0{group=new ye;previewGroup=new ye;selectionGroup=new ye;constructor(){this.group.add(this.previewGroup,this.selectionGroup)}clearPreview(){for(;this.previewGroup.children.length>0;){const t=this.previewGroup.children[0];this.previewGroup.remove(t),nc(t)}}clearSelection(){for(;this.selectionGroup.children.length>0;){const t=this.selectionGroup.children[0];this.selectionGroup.remove(t),nc(t)}}showSelectedBuilding(t,e,n,i,o,r,a){this.clearSelection();const l=new Te(o+1.8,a+2.2,r+1.8),c=new or(l);l.dispose();const h=new ri({color:ec}),u=new Hi(c,h);u.position.set(t,e+a*.5+.5,n),u.rotation.y=i,u.renderOrder=14,this.selectionGroup.add(u);const f=Math.hypot(o,r)*.55+1.5,p=Ze(t,e+.45,n,f-.9,f,ec,.85,32);this.selectionGroup.add(p)}showRoadAnchor(t,e,n,i){this.clearPreview();const o=Math.max(.2,i(t.x,t.z))+.72,r=e==="node"?ur:e==="segment"?dr:to,a=Math.max(4.8,n*.54);this.previewGroup.add(Ze(t.x,o,t.z,a*.48,a,r,.94,28)),this.previewGroup.add(Ze(t.x,o+.05,t.z,a,a+1.1,"#FFFFFF",.92,28)),e!=="none"&&this.previewGroup.add(Ze(t.x,o+.08,t.z,a+1.8,a+3,r,.72,28))}showRoadPreview(t,e,n,i,o){if(this.clearPreview(),t.length===0)return;const r=e*.5,a=1.15,l=fs(t,-(r+a+.9),r+a+.9,n?to:Qn,.34,i,.62,9);l&&this.previewGroup.add(l);const c=fs(t,-r,r,n?H0:"#9E2A2A",.86,i,.74,10);c&&this.previewGroup.add(c);const h=n?G0:X0,u=fs(t,-(r+a),-r+.15,h,.96,i,.84,12),f=fs(t,r-.15,r+a,h,.96,i,.84,12);u&&this.previewGroup.add(u),f&&this.previewGroup.add(f);const p=ic(t,.42,n?V0:"#FFD0D0",i,.9);if(p&&this.previewGroup.add(p),!o?.highlightOnly){const g=t[0].p0,v=t[t.length-1].p1,m=Math.max(.25,i(g.x,g.z))+.92,d=Math.max(.25,i(v.x,v.z))+.92,x=Math.max(5,r+1),y=o?.startSnap==="node"?ur:o?.startSnap==="segment"?dr:n?to:Qn,M=o?.endSnap==="node"?ur:o?.endSnap==="segment"?dr:n?to:Qn;if(this.previewGroup.add(Ze(g.x,m,g.z,x*.48,x,y,.95,28)),this.previewGroup.add(Ze(g.x,m+.04,g.z,x,x+1,"#FFFFFF",.95,28)),this.previewGroup.add(Ze(v.x,d,v.z,x*.48,x,M,.95,28)),this.previewGroup.add(Ze(v.x,d+.04,v.z,x,x+1,"#FFFFFF",.95,28)),o?.controlPoint){const D=o.controlPoint,C=Math.max(.25,i(D.x,D.z))+.94;this.previewGroup.add(Ze(D.x,C,D.z,1.8,4.2,"#F4C94E",.96,24)),this.previewGroup.add(Ze(D.x,C+.04,D.z,4.2,5.1,"#FFFFFF",.92,24));const E={p0:g,c0:{x:g.x+(D.x-g.x)/3,z:g.z+(D.z-g.z)/3},c1:{x:g.x+(D.x-g.x)*2/3,z:g.z+(D.z-g.z)*2/3},p1:D},L={p0:D,c0:{x:D.x+(v.x-D.x)/3,z:D.z+(v.z-D.z)/3},c1:{x:D.x+(v.x-D.x)*2/3,z:D.z+(v.z-D.z)*2/3},p1:v},S=ic([E,L],.35,"#FFE07D",i,.88);S&&this.previewGroup.add(S)}}}showZoneBrushPreview(t,e,n,i,o,r){this.clearPreview();const a=$0[n];if(r&&this.previewGroup.add(sc(t.x,t.z,e,a,o,.52,40)),i.length===0)return;const l=gr-.55,c=new en(l,l);c.rotateX(-Math.PI/2);const h=new Me({color:a,transparent:!0,opacity:n==="none"?.68:.76,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-5,polygonOffsetUnits:-5}),u=new se(c,h,i.length);u.renderOrder=10;const f=new qt;for(let p=0;p<i.length;p++){const g=i[p],v=Math.max(g.y,o(g.x,g.z))+.34;f.position.set(g.x,v,g.z),f.rotation.set(0,g.yaw,0),f.scale.set(1,1,1),f.updateMatrix(),u.setMatrixAt(p,f.matrix)}u.instanceMatrix.needsUpdate=!0,this.previewGroup.add(u)}showPloppableGhost(t,e,n,i,o,r,a,l,c){this.clearPreview();const h=Math.max(.2,c(t,e)),u=l?W0:Qn,f=new Te(i,Math.max(3,r),o),p=new he({color:u,transparent:!0,opacity:.48,roughness:.5,depthWrite:!1}),g=new Kt(f,p);g.position.set(t,h+Math.max(3,r)*.5,e),g.rotation.y=n,g.renderOrder=10,this.previewGroup.add(g);const v=new or(f),m=new ri({color:l?"#FFFFFF":"#FFD4D4"}),d=new Hi(v,m);d.position.copy(g.position),d.rotation.y=n,d.renderOrder=11,this.previewGroup.add(d);const x=o*.5+3.5,y=t+Math.sin(n)*x,M=e+Math.cos(n)*x,D=new di(2.2,4.4,3);D.rotateX(Math.PI/2);const C=new Me({color:u,transparent:!0,opacity:.92}),E=new Kt(D,C);E.position.set(y,h+1.8,M),E.rotation.y=n,E.renderOrder=12,this.previewGroup.add(E),a>20&&this.previewGroup.add(sc(t,e,a,l?"#5CC4C8":Qn,c,.55,64))}showUtilityLinePreview(t,e,n,i,o){this.clearPreview();const r=i?t==="power_line"?"#F6C84C":"#3B9ED8":Qn,a=Math.max(.2,o(e.x,e.z))+.6;if(this.previewGroup.add(Ze(e.x,a,e.z,2.4,4.8,r,.92,24)),!n)return;const l=Math.hypot(n.x-e.x,n.z-e.z);if(l<1)return;const c=Math.max(.2,o(n.x,n.z))+.6;this.previewGroup.add(Ze(n.x,c,n.z,2.4,4.8,r,.92,24));const h=Math.max(2,Math.ceil(l/12)),u=[],f=t==="power_line"?11.5:1;for(let m=0;m<=h;m++){const d=m/h,x=e.x+(n.x-e.x)*d,y=e.z+(n.z-e.z)*d;u.push(x,Math.max(.2,o(x,y))+f,y)}const p=new fe;p.setAttribute("position",new Yt(u,3));const g=new ri({color:r}),v=new Eo(p,g);if(v.renderOrder=12,this.previewGroup.add(v),t==="power_line"){const m=Math.max(1,Math.round(l/55)),d=new Qe(.35,.6,12,4);d.translate(0,6,0);const x=new Me({color:r,transparent:!0,opacity:.78});for(let y=0;y<=m;y++){const M=y/m,D=e.x+(n.x-e.x)*M,C=e.z+(n.z-e.z)*M,E=new Kt(d.clone(),x.clone());E.position.set(D,o(D,C),C),E.renderOrder=11,this.previewGroup.add(E)}d.dispose(),x.dispose()}else{const m={p0:e,c0:{x:e.x+(n.x-e.x)/3,z:e.z+(n.z-e.z)/3},c1:{x:e.x+(n.x-e.x)*2/3,z:e.z+(n.z-e.z)*2/3},p1:n},d=q0([m],6,r,.56,o,.55);d&&this.previewGroup.add(d)}}showBulldozeBox(t,e,n,i,o,r,a){this.clearPreview();const l=new Te(o+1.6,Math.max(4,a+1.8),r+1.6),c=new Me({color:Qn,transparent:!0,opacity:.44,depthWrite:!1}),h=new Kt(l,c);h.position.set(t,e+Math.max(4,a+1.8)*.5,n),h.rotation.y=i,h.renderOrder=12,this.previewGroup.add(h);const u=new or(l),f=new Hi(u,new ri({color:"#FFF0F0"}));f.position.copy(h.position),f.rotation.y=i,f.renderOrder=13,this.previewGroup.add(f)}}const ps={low:{level:"low",pixelRatioCap:1,shadowMapSize:1024,postProcessMode:"lite",bloomEnabled:!0,treeDensityMult:1,enableSmoke:!1,waterWaveDetail:.65},medium:{level:"medium",pixelRatioCap:1.5,shadowMapSize:1536,postProcessMode:"full",bloomEnabled:!0,treeDensityMult:1.65,enableSmoke:!0,waterWaveDetail:.85},high:{level:"high",pixelRatioCap:2,shadowMapSize:2048,postProcessMode:"full",bloomEnabled:!0,treeDensityMult:2.35,enableSmoke:!0,waterWaveDetail:1}};function Z0(s){const t=(s.get("quality")??"").toLowerCase();if(t==="low"||t==="medium"||t==="high")return ps[t];const e=typeof window<"u"&&window.innerWidth<=720,n=typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia("(pointer: coarse)").matches,i=typeof navigator<"u"&&/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);return e||n||i?(typeof navigator<"u"&&navigator.hardwareConcurrency||4)<=2?ps.low:ps.medium:ps.high}function oc(s){return ps[s]}const eo=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`,j0=`
  uniform sampler2D tInput;
  uniform vec2 uTexelDir;
  varying vec2 vUv;

  void main() {
    vec3 sum = texture2D(tInput, vUv).rgb * 0.204164;
    sum += texture2D(tInput, clamp(vUv + uTexelDir * 1.407333, 0.001, 0.999)).rgb * 0.304005;
    sum += texture2D(tInput, clamp(vUv - uTexelDir * 1.407333, 0.001, 0.999)).rgb * 0.304005;
    sum += texture2D(tInput, clamp(vUv + uTexelDir * 3.294215, 0.001, 0.999)).rgb * 0.093913;
    sum += texture2D(tInput, clamp(vUv - uTexelDir * 3.294215, 0.001, 0.999)).rgb * 0.093913;
    gl_FragColor = vec4(sum, 1.0);
  }
`,K0=`
  uniform sampler2D tInput;
  uniform vec2 uTexelDir;
  uniform float uThreshold;
  varying vec2 vUv;

  vec3 sampleBright(vec2 uv) {
    vec3 c = texture2D(tInput, clamp(uv, 0.001, 0.999)).rgb;
    float lum = max(c.r, max(c.g, c.b));
    float knee = 0.25;
    float soft = clamp(lum - uThreshold + knee, 0.0, 2.0 * knee);
    soft = (soft * soft) / (4.0 * knee + 0.0001);
    float contrib = max(soft, lum - uThreshold) / max(lum, 0.0001);
    return c * max(0.0, contrib);
  }

  void main() {
    vec3 sum = sampleBright(vUv) * 0.227027;
    sum += sampleBright(vUv + uTexelDir * 1.384615) * 0.316216;
    sum += sampleBright(vUv - uTexelDir * 1.384615) * 0.316216;
    sum += sampleBright(vUv + uTexelDir * 3.230769) * 0.070270;
    sum += sampleBright(vUv - uTexelDir * 3.230769) * 0.070270;
    gl_FragColor = vec4(sum, 1.0);
  }
`,nh=`
  vec3 acesFilm(vec3 x) {
    const float a = 2.51;
    const float b = 0.03;
    const float c = 2.43;
    const float d = 0.59;
    const float e = 0.14;
    return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
  }

  vec3 linearToSrgb(vec3 c) {
    vec3 lo = c * 12.92;
    vec3 hi = pow(max(c, vec3(0.0)), vec3(1.0 / 2.4)) * 1.055 - 0.055;
    return mix(lo, hi, step(vec3(0.0031308), c));
  }
`,J0=`
  uniform sampler2D tScene;
  uniform sampler2D tDofBlur;
  uniform sampler2D tBloom;
  uniform float uExposure;
  uniform float uTiltShiftStrength;
  uniform float uFocusY;
  uniform float uFocusBand;
  uniform float uBloomIntensity;
  uniform float uSaturation;
  uniform float uVignette;
  varying vec2 vUv;

  ${nh}

  void main() {
    vec3 sharp = texture2D(tScene, vUv).rgb;
    vec3 blurred = texture2D(tDofBlur, vUv).rgb;
    vec3 bloom = texture2D(tBloom, vUv).rgb;

    // Asymmetric tilt-shift miniature focus band: crisp center, soft top & bottom bands
    float dist = abs(vUv.y - uFocusY);
    float edgeEnd = min(0.56, uFocusBand + 0.30);
    float dofMix = smoothstep(uFocusBand, edgeEnd, dist) * uTiltShiftStrength;
    // Slight extra falloff on the very top/bottom corners for miniature lens feel
    vec3 col = mix(sharp, blurred, dofMix);

    // Tasteful selective bloom on emissive windows, streetlights & car lights
    col += bloom * uBloomIntensity;

    // ACES Filmic tone mapping
    col = acesFilm(col * uExposure);

    // Subtle warm-pastel miniature color polish
    float luma = dot(col, vec3(0.2126, 0.7152, 0.0722));
    col = mix(vec3(luma), col, uSaturation);

    // Gentle miniature optical vignette
    vec2 centered = (vUv - 0.5) * vec2(1.0, 0.92);
    float vig = 1.0 - smoothstep(0.38, 0.88, length(centered)) * uVignette;
    col *= vig;

    gl_FragColor = vec4(linearToSrgb(col), 1.0);
  }
`,Q0=`
  uniform sampler2D tScene;
  uniform vec2 uTexelSize;
  uniform float uExposure;
  uniform float uTiltShiftStrength;
  uniform float uFocusY;
  uniform float uFocusBand;
  uniform float uBloomIntensity;
  uniform float uBloomThreshold;
  uniform float uSaturation;
  uniform float uVignette;
  varying vec2 vUv;

  ${nh}

  void main() {
    vec3 sharp = texture2D(tScene, vUv).rgb;
    float dist = abs(vUv.y - uFocusY);
    float edgeEnd = min(0.56, uFocusBand + 0.30);
    float dofMix = smoothstep(uFocusBand, edgeEnd, dist) * uTiltShiftStrength;

    vec3 col = sharp;
    if (dofMix > 0.01) {
      float rad = 2.6 * dofMix;
      vec2 stepX = vec2(uTexelSize.x * rad, 0.0);
      vec2 stepY = vec2(0.0, uTexelSize.y * rad);
      vec3 acc = sharp * 0.22;
      acc += texture2D(tScene, clamp(vUv + stepX, 0.001, 0.999)).rgb * 0.13;
      acc += texture2D(tScene, clamp(vUv - stepX, 0.001, 0.999)).rgb * 0.13;
      acc += texture2D(tScene, clamp(vUv + stepY, 0.001, 0.999)).rgb * 0.13;
      acc += texture2D(tScene, clamp(vUv - stepY, 0.001, 0.999)).rgb * 0.13;
      acc += texture2D(tScene, clamp(vUv + stepX + stepY, 0.001, 0.999)).rgb * 0.065;
      acc += texture2D(tScene, clamp(vUv - stepX + stepY, 0.001, 0.999)).rgb * 0.065;
      acc += texture2D(tScene, clamp(vUv + stepX - stepY, 0.001, 0.999)).rgb * 0.065;
      acc += texture2D(tScene, clamp(vUv - stepX - stepY, 0.001, 0.999)).rgb * 0.065;
      col = mix(sharp, acc, dofMix);
    }

    // Cheap inline bloom tap for night lights
    if (uBloomIntensity > 0.02) {
      vec2 bStep = uTexelSize * 3.5;
      vec3 bAcc = vec3(0.0);
      vec3 s1 = texture2D(tScene, clamp(vUv + vec2(bStep.x, 0.0), 0.001, 0.999)).rgb;
      vec3 s2 = texture2D(tScene, clamp(vUv - vec2(bStep.x, 0.0), 0.001, 0.999)).rgb;
      vec3 s3 = texture2D(tScene, clamp(vUv + vec2(0.0, bStep.y), 0.001, 0.999)).rgb;
      vec3 s4 = texture2D(tScene, clamp(vUv - vec2(0.0, bStep.y), 0.001, 0.999)).rgb;
      bAcc += max(s1 - uBloomThreshold, 0.0);
      bAcc += max(s2 - uBloomThreshold, 0.0);
      bAcc += max(s3 - uBloomThreshold, 0.0);
      bAcc += max(s4 - uBloomThreshold, 0.0);
      col += bAcc * 0.25 * uBloomIntensity;
    }

    col = acesFilm(col * uExposure);
    float luma = dot(col, vec3(0.2126, 0.7152, 0.0722));
    col = mix(vec3(luma), col, uSaturation);
    vec2 centered = (vUv - 0.5) * vec2(1.0, 0.92);
    float vig = 1.0 - smoothstep(0.38, 0.88, length(centered)) * uVignette;
    col *= vig;

    gl_FragColor = vec4(linearToSrgb(col), 1.0);
  }
`;class tg{active;isHDR;mode;quadScene;quadCam;quadMesh;sceneRT=null;dofA=null;dofB=null;bloomA=null;bloomB=null;blurMat;brightBlurMat;compositeFullMat;compositeLiteMat;width=1;height=1;rtType=ze;constructor(t,e,n,i){this.mode=i.postProcessMode,this.quadScene=new oa,this.quadCam=new ya(-1,1,1,-1,0,1);const o=new en(2,2);this.blurMat=new Be({vertexShader:eo,fragmentShader:j0,depthTest:!1,depthWrite:!1,uniforms:{tInput:{value:null},uTexelDir:{value:new Xt(1/512,0)}}}),this.brightBlurMat=new Be({vertexShader:eo,fragmentShader:K0,depthTest:!1,depthWrite:!1,uniforms:{tInput:{value:null},uTexelDir:{value:new Xt(1/256,0)},uThreshold:{value:.92}}}),this.compositeFullMat=new Be({vertexShader:eo,fragmentShader:J0,depthTest:!1,depthWrite:!1,uniforms:{tScene:{value:null},tDofBlur:{value:null},tBloom:{value:null},uExposure:{value:1.04},uTiltShiftStrength:{value:.85},uFocusY:{value:.48},uFocusBand:{value:.14},uBloomIntensity:{value:.3},uSaturation:{value:1.05},uVignette:{value:.16}}}),this.compositeLiteMat=new Be({vertexShader:eo,fragmentShader:Q0,depthTest:!1,depthWrite:!1,uniforms:{tScene:{value:null},uTexelSize:{value:new Xt(1/1280,1/720)},uExposure:{value:1.04},uTiltShiftStrength:{value:.85},uFocusY:{value:.48},uFocusBand:{value:.14},uBloomIntensity:{value:.3},uBloomThreshold:{value:.85},uSaturation:{value:1.05},uVignette:{value:.16}}}),this.quadMesh=new Kt(o,this.compositeFullMat),this.quadMesh.frustumCulled=!1,this.quadScene.add(this.quadMesh),this.rtType=this.detectRenderTargetType(t),this.isHDR=this.rtType===Wn;let r=!1;try{this.allocateTargets(Math.max(2,e),Math.max(2,n)),r=this.sceneRT!==null}catch{r=!1}this.active=r}detectRenderTargetType(t){try{if(!t.capabilities.isWebGL2)return ze;const e=t.getContext();if(!(e.getExtension("EXT_color_buffer_float")!==null||e.getExtension("EXT_color_buffer_half_float")!==null))return ze;const i=new Ve(4,4,{type:Wn,minFilter:Ae,magFilter:Ae}),o=t.getRenderTarget();t.setRenderTarget(i);const r=e.checkFramebufferStatus(e.FRAMEBUFFER);return t.setRenderTarget(o),i.dispose(),r===e.FRAMEBUFFER_COMPLETE?Wn:ze}catch{return ze}}setMode(t){this.mode!==t&&(this.mode=t,this.allocateTargets(this.width,this.height))}resize(t,e){const n=Math.max(2,Math.floor(t)),i=Math.max(2,Math.floor(e));n===this.width&&i===this.height&&this.sceneRT||this.allocateTargets(n,i)}allocateTargets(t,e){this.disposeTargets(),this.width=t,this.height=e;const n={type:this.rtType,minFilter:Ae,magFilter:Ae,format:We,colorSpace:mi};if(this.sceneRT=new Ve(t,e,{...n,depthBuffer:!0,stencilBuffer:!1}),this.mode==="full"){const i=Math.max(2,Math.floor(t*.5)),o=Math.max(2,Math.floor(e*.5)),r=Math.max(2,Math.floor(t*.25)),a=Math.max(2,Math.floor(e*.25));this.dofA=new Ve(i,o,{...n,depthBuffer:!1}),this.dofB=new Ve(i,o,{...n,depthBuffer:!1}),this.bloomA=new Ve(r,a,{...n,depthBuffer:!1}),this.bloomB=new Ve(r,a,{...n,depthBuffer:!1})}}render(t,e,n,i){if(!this.active||!this.sceneRT)return!1;const o=t.toneMapping;try{t.toneMapping=Rn,t.setRenderTarget(this.sceneRT),t.clear(!0,!0,!1),t.render(e,n);const r=this.isHDR?i.bloomThreshold:Math.min(.76,i.bloomThreshold*.72);if(this.mode==="full"&&this.dofA&&this.dofB&&this.bloomA&&this.bloomB){const a=this.dofA.width,l=this.dofA.height;this.quadMesh.material=this.blurMat,this.blurMat.uniforms.tInput.value=this.sceneRT.texture,this.blurMat.uniforms.uTexelDir.value.set(1.65/a,0),t.setRenderTarget(this.dofA),t.render(this.quadScene,this.quadCam),this.blurMat.uniforms.tInput.value=this.dofA.texture,this.blurMat.uniforms.uTexelDir.value.set(0,1.65/l),t.setRenderTarget(this.dofB),t.render(this.quadScene,this.quadCam),this.blurMat.uniforms.tInput.value=this.dofB.texture,this.blurMat.uniforms.uTexelDir.value.set(2.35/a,0),t.setRenderTarget(this.dofA),t.render(this.quadScene,this.quadCam),this.blurMat.uniforms.tInput.value=this.dofA.texture,this.blurMat.uniforms.uTexelDir.value.set(0,2.35/l),t.setRenderTarget(this.dofB),t.render(this.quadScene,this.quadCam);const c=this.bloomA.width,h=this.bloomA.height;this.quadMesh.material=this.brightBlurMat,this.brightBlurMat.uniforms.tInput.value=this.sceneRT.texture,this.brightBlurMat.uniforms.uThreshold.value=r,this.brightBlurMat.uniforms.uTexelDir.value.set(1.4/c,0),t.setRenderTarget(this.bloomA),t.render(this.quadScene,this.quadCam),this.quadMesh.material=this.blurMat,this.blurMat.uniforms.tInput.value=this.bloomA.texture,this.blurMat.uniforms.uTexelDir.value.set(0,1.4/h),t.setRenderTarget(this.bloomB),t.render(this.quadScene,this.quadCam),this.blurMat.uniforms.tInput.value=this.bloomB.texture,this.blurMat.uniforms.uTexelDir.value.set(2.1/c,0),t.setRenderTarget(this.bloomA),t.render(this.quadScene,this.quadCam),this.blurMat.uniforms.tInput.value=this.bloomA.texture,this.blurMat.uniforms.uTexelDir.value.set(0,2.1/h),t.setRenderTarget(this.bloomB),t.render(this.quadScene,this.quadCam);const u=this.compositeFullMat.uniforms;u.tScene.value=this.sceneRT.texture,u.tDofBlur.value=this.dofB.texture,u.tBloom.value=this.bloomB.texture,u.uExposure.value=i.exposure,u.uTiltShiftStrength.value=i.tiltShiftStrength,u.uFocusY.value=i.focusY,u.uFocusBand.value=i.focusBand,u.uBloomIntensity.value=i.bloomIntensity,u.uSaturation.value=i.saturation,u.uVignette.value=i.vignetteStrength,this.quadMesh.material=this.compositeFullMat,t.setRenderTarget(null),t.render(this.quadScene,this.quadCam)}else{const a=this.compositeLiteMat.uniforms;a.tScene.value=this.sceneRT.texture,a.uTexelSize.value.set(1/this.width,1/this.height),a.uExposure.value=i.exposure,a.uTiltShiftStrength.value=i.tiltShiftStrength,a.uFocusY.value=i.focusY,a.uFocusBand.value=i.focusBand,a.uBloomIntensity.value=i.bloomIntensity,a.uBloomThreshold.value=r,a.uSaturation.value=i.saturation,a.uVignette.value=i.vignetteStrength,this.quadMesh.material=this.compositeLiteMat,t.setRenderTarget(null),t.render(this.quadScene,this.quadCam)}return t.toneMapping=o,!0}catch{return t.setRenderTarget(null),t.toneMapping=o,!1}}disposeTargets(){this.sceneRT?.dispose(),this.dofA?.dispose(),this.dofB?.dispose(),this.bloomA?.dispose(),this.bloomB?.dispose(),this.sceneRT=null,this.dofA=null,this.dofB=null,this.bloomA=null,this.bloomB=null}dispose(){this.disposeTargets(),this.quadMesh.geometry.dispose(),this.blurMat.dispose(),this.brightBlurMat.dispose(),this.compositeFullMat.dispose(),this.compositeLiteMat.dispose()}}const kn=[{hour:0,zenith:"#091022",horizon:"#182542",sunColor:"#8FB2E4",sunIntensity:.36,sunAzimuthDeg:35,sunElevationDeg:36,hemiSky:"#2A406E",hemiGround:"#101520",hemiIntensity:.28,exposure:.96,emissive:1},{hour:5,zenith:"#091022",horizon:"#182542",sunColor:"#8FB2E4",sunIntensity:.36,sunAzimuthDeg:55,sunElevationDeg:32,hemiSky:"#2A406E",hemiGround:"#101520",hemiIntensity:.28,exposure:.96,emissive:1},{hour:6.5,zenith:"#6588BD",horizon:"#F3C7A3",sunColor:"#FFB87E",sunIntensity:1.95,sunAzimuthDeg:85,sunElevationDeg:18,hemiSky:"#A3BDE0",hemiGround:"#82776B",hemiIntensity:.72,exposure:1.02,emissive:.28},{hour:9.5,zenith:"#4A8FD2",horizon:"#D2E5F2",sunColor:"#FFEBC8",sunIntensity:2.68,sunAzimuthDeg:136,sunElevationDeg:36,hemiSky:"#AFD4F6",hemiGround:"#9B8F74",hemiIntensity:.88,exposure:1.03,emissive:0},{hour:15.5,zenith:"#4A8FD2",horizon:"#D2E5F2",sunColor:"#FFE9C2",sunIntensity:2.68,sunAzimuthDeg:224,sunElevationDeg:37,hemiSky:"#AFD4F6",hemiGround:"#9B8F74",hemiIntensity:.88,exposure:1.03,emissive:0},{hour:18.2,zenith:"#495E9B",horizon:"#E5B29A",sunColor:"#FFB378",sunIntensity:2.25,sunAzimuthDeg:268,sunElevationDeg:18,hemiSky:"#A4A6D2",hemiGround:"#7A685E",hemiIntensity:.74,exposure:1.02,emissive:.68},{hour:20.2,zenith:"#091022",horizon:"#182542",sunColor:"#8FB2E4",sunIntensity:.36,sunAzimuthDeg:315,sunElevationDeg:36,hemiSky:"#2A406E",hemiGround:"#101520",hemiIntensity:.28,exposure:.96,emissive:1},{hour:24,zenith:"#091022",horizon:"#182542",sunColor:"#8FB2E4",sunIntensity:.36,sunAzimuthDeg:395,sunElevationDeg:36,hemiSky:"#2A406E",hemiGround:"#101520",hemiIntensity:.28,exposure:.96,emissive:1}];function eg(){const s=new Yi(2500,32,20),t={uZenith:{value:new J("#4C92D4")},uHorizon:{value:new J("#CEE3F2")},uSunDir:{value:new O(.4,.7,.5).normalize()},uSunColor:{value:new J("#FFF3DC")},uNightFactor:{value:0},uTime:{value:0}},e=new Be({side:Ce,depthWrite:!1,fog:!1,uniforms:t,vertexShader:`
      varying vec3 vDir;
      void main() {
        vDir = normalize(position);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      uniform vec3 uZenith;
      uniform vec3 uHorizon;
      uniform vec3 uSunDir;
      uniform vec3 uSunColor;
      uniform float uNightFactor;
      uniform float uTime;
      varying vec3 vDir;

      float hash21(vec2 p) {
        p = fract(p * vec2(234.34, 435.345));
        p += dot(p, p + 34.23);
        return fract(p.x * p.y);
      }

      float noise2(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(hash21(i), hash21(i + vec2(1.0, 0.0)), u.x),
          mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x),
          u.y
        );
      }

      void main() {
        vec3 d = normalize(vDir);
        float h = clamp(d.y, 0.0, 1.0);
        vec3 col = mix(uHorizon, uZenith, pow(h, 0.62));

        // Subtle warm coastal glow band right above the horizon
        float horizGlow = exp(-abs(d.y) * 9.0);
        vec3 warmBand = mix(vec3(0.95, 0.92, 0.85), vec3(0.28, 0.22, 0.34), uNightFactor);
        col = mix(col, warmBand, horizGlow * mix(0.22, 0.30, uNightFactor));

        // Soft Mie scattering around sun / moon
        float sunDot = max(dot(d, normalize(uSunDir)), 0.0);
        col += uSunColor * pow(sunDot, 12.0) * mix(0.22, 0.08, uNightFactor);
        col += uSunColor * pow(sunDot, 220.0) * mix(0.65, 0.22, uNightFactor);

        // Soft high-altitude wispy clouds by day/dusk
        if (d.y > 0.03) {
          vec2 cloudUv = d.xz / (d.y + 0.24) * 1.45 + vec2(uTime * 0.004, 0.0);
          float c = noise2(cloudUv) * 0.65 + noise2(cloudUv * 2.3 + 4.1) * 0.35;
          float cloudMask = smoothstep(0.56, 0.82, c) * smoothstep(0.03, 0.22, d.y) * (1.0 - uNightFactor * 0.78);
          vec3 cloudCol = mix(vec3(0.96, 0.97, 0.99), vec3(0.24, 0.32, 0.48), uNightFactor);
          col = mix(col, cloudCol, cloudMask * 0.38);
        }

        // Crisp subtle stars in the upper night sky
        if (uNightFactor > 0.25 && d.y > 0.08) {
          vec2 starGrid = floor((d.xz / (d.y + 0.45)) * 180.0);
          float s = hash21(starGrid);
          float star = smoothstep(0.993, 0.999, s) * smoothstep(0.08, 0.32, d.y) * uNightFactor;
          col += vec3(0.85, 0.92, 1.0) * star * 1.15;
        }

        gl_FragColor = vec4(col, 1.0);
        #include <colorspace_fragment>
      }
    `}),n=new Kt(s,e);return n.renderOrder=-100,n.frustumCulled=!1,{mesh:n,uniforms:t}}class ng{renderer;scene;sunLight;fillLight;hemiLight;fog;mood;quality;postProcess=null;envRT=null;postParams={exposure:1.04,tiltShiftStrength:.85,focusY:.48,focusBand:.14,bloomIntensity:.14,bloomThreshold:.92,saturation:1.06,vignetteStrength:.16};sky;container;rafId=null;lastTime=0;lastAppliedHour=-1;elapsed=0;tmpA=new J;tmpB=new J;shadowCenter=new O(205,0,80);constructor(t,e){this.container=t,this.quality=e;const n=t.clientWidth||window.innerWidth,i=t.clientHeight||window.innerHeight;this.renderer=new l0({antialias:!0,alpha:!1,powerPreference:"high-performance"});const o=Math.min(window.devicePixelRatio||1,e.pixelRatioCap);this.renderer.setPixelRatio(o),this.renderer.setSize(n,i),this.renderer.outputColorSpace=De,this.renderer.toneMapping=Sc,this.renderer.toneMappingExposure=1.04,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Mc;const r=this.renderer.domElement;r.style.display="block",r.style.width="100%",r.style.height="100%",t.appendChild(r),this.scene=new oa,this.scene.background=new J("#CEE3F2"),this.fog=new ba("#CFE4F2",680,2250),this.scene.fog=this.fog,this.sky=eg(),this.scene.add(this.sky.mesh),this.buildProceduralEnvMap(),this.sunLight=new Vl("#FFF3DC",2.38),this.sunLight.position.set(220,440,310),this.sunLight.target.position.set(205,0,80),this.sunLight.castShadow=!0,this.sunLight.shadow.mapSize.set(e.shadowMapSize,e.shadowMapSize),this.sunLight.shadow.camera.near=60,this.sunLight.shadow.camera.far=1480;const a=460;this.sunLight.shadow.camera.left=-a,this.sunLight.shadow.camera.right=a,this.sunLight.shadow.camera.top=a,this.sunLight.shadow.camera.bottom=-a,this.sunLight.shadow.bias=-45e-5,this.sunLight.shadow.normalBias=.045,this.scene.add(this.sunLight),this.scene.add(this.sunLight.target),this.fillLight=new Vl("#B8DAFA",.56),this.fillLight.position.set(-280,210,-240),this.scene.add(this.fillLight),this.hemiLight=new h0("#B8DBFA","#928D7B",.96),this.scene.add(this.hemiLight),this.mood={zenith:new J("#4C92D4"),horizon:new J("#CEE3F2"),sunColor:new J("#FFF3DC"),sunIntensity:2.38,sunPos:new O(220,440,310),sunDir:new O(.32,.72,.56).normalize(),hemiSky:new J("#B2D5F6"),hemiGround:new J("#8A8675"),hemiIntensity:.86,exposure:1.04,emissiveStrength:0,isNight:!1},this.postProcess=new tg(this.renderer,Math.round(n*o),Math.round(i*o),e),this.applyTimeOfDay(10.5)}buildProceduralEnvMap(){try{const t=new ia(this.renderer),e=new oa,n=new Yi(20,16,12),i=n.attributes.position,o=new Float32Array(i.count*3),r=new J("#66AEEB"),a=new J("#E3F1FA"),l=new J("#7C8A6D"),c=new J;for(let p=0;p<i.count;p++){const g=i.getY(p)/20;g>=0?c.copy(a).lerp(r,Math.pow(g,.7)):c.copy(a).lerp(l,Math.min(1,-g*1.4)),o[p*3]=c.r,o[p*3+1]=c.g,o[p*3+2]=c.b}n.setAttribute("color",new pe(o,3));const h=new Me({vertexColors:!0,side:Ce}),u=new Kt(n,h);e.add(u);const f=new Kt(new Yi(3.2,8,8),new Me({color:"#FFF5E0"}));f.position.set(8,12,10),e.add(f),this.envRT=t.fromScene(e,.04),this.scene.environment=this.envRT.texture,this.scene.environmentIntensity=.72,n.dispose(),h.dispose(),f.geometry.dispose(),f.material.dispose(),t.dispose()}catch{this.scene.environment=null}}getQuality(){return this.quality}isPostProcessActive(){return!!this.postProcess?.active}setQuality(t){this.quality=t;const e=Math.min(window.devicePixelRatio||1,t.pixelRatioCap),n=this.container.clientWidth||window.innerWidth,i=this.container.clientHeight||window.innerHeight;this.renderer.setPixelRatio(e),this.renderer.setSize(n,i),this.postProcess?.setMode(t.postProcessMode),this.postProcess?.resize(Math.round(n*e),Math.round(i*e))}updateCameraVisuals(t,e,n){this.shadowCenter.set(Math.round(t.x/16)*16,0,Math.round(t.z/16)*16);const o=Math.max(240,Math.min(520,e*.92));Math.abs(this.sunLight.shadow.camera.right-o)>25&&(this.sunLight.shadow.camera.left=-o,this.sunLight.shadow.camera.right=o,this.sunLight.shadow.camera.top=o,this.sunLight.shadow.camera.bottom=-o,this.sunLight.shadow.camera.updateProjectionMatrix()),this.sunLight.target.position.copy(this.shadowCenter),this.sunLight.position.copy(this.shadowCenter).addScaledVector(this.mood.sunDir,620);const r=Math.max(0,Math.min(1,(e-140)/340)),a=Math.max(0,Math.min(1,(n-.16)/.42)),l=Math.max(.28,r*.65+a*.35);this.postParams.tiltShiftStrength=.24+l*.68,this.postParams.focusBand=.25-l*.11,this.postParams.focusY=n<.3?.44:.49}applyTimeOfDay(t){const e=(t%24+24)%24;if(Math.abs(e-this.lastAppliedHour)<.002)return this.mood;this.lastAppliedHour=e;let n=kn[0],i=kn[kn.length-1];for(let f=0;f<kn.length-1;f++)if(e>=kn[f].hour&&e<=kn[f+1].hour){n=kn[f],i=kn[f+1];break}const o=Math.max(1e-4,i.hour-n.hour),r=Math.max(0,Math.min(1,(e-n.hour)/o)),a=r*r*(3-2*r),l=(f,p,g)=>{this.tmpA.set(f),this.tmpB.set(p),g.copy(this.tmpA).lerp(this.tmpB,a)};l(n.zenith,i.zenith,this.mood.zenith),l(n.horizon,i.horizon,this.mood.horizon),l(n.sunColor,i.sunColor,this.mood.sunColor),l(n.hemiSky,i.hemiSky,this.mood.hemiSky),l(n.hemiGround,i.hemiGround,this.mood.hemiGround),this.mood.sunIntensity=n.sunIntensity+(i.sunIntensity-n.sunIntensity)*a,this.mood.hemiIntensity=n.hemiIntensity+(i.hemiIntensity-n.hemiIntensity)*a,this.mood.exposure=n.exposure+(i.exposure-n.exposure)*a,this.mood.emissiveStrength=n.emissive+(i.emissive-n.emissive)*a,this.mood.isNight=this.mood.emissiveStrength>.55;const c=(n.sunAzimuthDeg+(i.sunAzimuthDeg-n.sunAzimuthDeg)*a)*Math.PI/180,h=(n.sunElevationDeg+(i.sunElevationDeg-n.sunElevationDeg)*a)*Math.PI/180;this.mood.sunDir.set(Math.cos(h)*Math.sin(c),Math.max(.2,Math.sin(h)),Math.cos(h)*Math.cos(c)).normalize(),this.mood.sunPos.copy(this.shadowCenter).addScaledVector(this.mood.sunDir,620),this.sunLight.position.copy(this.mood.sunPos),this.sunLight.color.copy(this.mood.sunColor),this.sunLight.intensity=this.mood.sunIntensity,this.fillLight.intensity=this.mood.isNight?.14:.38,this.fillLight.color.set(this.mood.isNight?"#345288":"#B4D4F2"),this.hemiLight.color.copy(this.mood.hemiSky),this.hemiLight.groundColor.copy(this.mood.hemiGround),this.hemiLight.intensity=this.mood.hemiIntensity,this.scene.environment&&(this.scene.environmentIntensity=.48*(1-this.mood.emissiveStrength*.78)),this.scene.background=this.mood.horizon,this.fog.color.copy(this.mood.horizon),this.fog.near=this.mood.isNight?500:720,this.fog.far=this.mood.isNight?1820:2350,this.renderer.toneMappingExposure=this.mood.exposure,this.sky.uniforms.uZenith.value.copy(this.mood.zenith),this.sky.uniforms.uHorizon.value.copy(this.mood.horizon),this.sky.uniforms.uSunDir.value.copy(this.mood.sunDir),this.sky.uniforms.uSunColor.value.copy(this.mood.sunColor),this.sky.uniforms.uNightFactor.value=this.mood.emissiveStrength;const u=this.mood.emissiveStrength;return this.postParams.exposure=this.mood.exposure,this.postParams.bloomIntensity=this.quality.bloomEnabled?.02+u*.8:0,this.postParams.bloomThreshold=1.12-u*.34,this.postParams.saturation=1.08-u*.02,this.postParams.vignetteStrength=.14+u*.09,this.mood}resize(t){const e=this.container.clientWidth||window.innerWidth,n=this.container.clientHeight||window.innerHeight,i=Math.min(window.devicePixelRatio||1,this.quality.pixelRatioCap);t.aspect=e/Math.max(1,n),t.updateProjectionMatrix(),this.renderer.setPixelRatio(i),this.renderer.setSize(e,n),this.postProcess?.resize(Math.round(e*i),Math.round(n*i))}startLoop(t,e){this.lastTime=performance.now();const n=i=>{this.rafId=requestAnimationFrame(n);const o=Math.min(.1,Math.max(.001,(i-this.lastTime)/1e3));this.lastTime=i,this.elapsed+=o,this.sky.uniforms.uTime.value=this.elapsed,t(o),this.sky.mesh.position.copy(e.position),(this.postProcess?.render(this.renderer,this.scene,e,this.postParams)??!1)||this.renderer.render(this.scene,e)};this.rafId=requestAnimationFrame(n)}dispose(){this.rafId!==null&&(cancelAnimationFrame(this.rafId),this.rafId=null),this.envRT?.dispose(),this.postProcess?.dispose(),this.renderer.dispose()}}function Hn(){return{positions:[],normals:[],uvs:[],indices:[]}}function uo(s,t,e,n,i,o,r,a,l,c,h,u,f,p=0,g=1,v=0,m=0,d=0,x=1,y=1){const M=s.positions.length/3;s.positions.push(t,e,n,i,o,r,a,l,c,h,u,f),s.normals.push(p,g,v,p,g,v,p,g,v,p,g,v),s.uvs.push(m,d,x,d,m,y,x,y),s.indices.push(M,M+1,M+2,M+1,M+3,M+2)}function ig(s){if(s.indices.length===0)return null;const t=new fe;return t.setAttribute("position",new Yt(s.positions,3)),t.setAttribute("normal",new Yt(s.normals,3)),t.setAttribute("uv",new Yt(s.uvs,2)),t.setIndex(s.indices),t}function Fe(s,t,e,n,i,o=!1,r){const a=r??s;for(let l=0;l<t.length-1;l++){const c=t[l],h=t[l+1],u=c.x+c.nx*e,f=c.z+c.nz*e,p=c.x+c.nx*n,g=c.z+c.nz*n,v=h.x+h.nx*e,m=h.z+h.nz*e,d=h.x+h.nx*n,x=h.z+h.nz*n,y=c.y+i,M=h.y+i;uo(s,u,y,f,p,y,g,v,M,m,d,M,x,0,1,0,0,c.s*.08,1,h.s*.08),o&&(uo(a,u,y,f,v,M,m,u,y-1.85,f,v,M-1.85,m,-c.nx,0,-c.nz),uo(a,d,M,x,p,y,g,d,M-1.85,x,p,y-1.85,g,c.nx,0,c.nz))}}function rc(s,t,e,n,i,o=16){const r=s.positions.length/3;s.positions.push(t,e,n),s.normals.push(0,1,0),s.uvs.push(.5,.5);for(let a=0;a<o;a++){const l=a/o*Math.PI*2;s.positions.push(t+Math.cos(l)*i,e,n+Math.sin(l)*i),s.normals.push(0,1,0),s.uvs.push(.5+Math.cos(l)*.5,.5+Math.sin(l)*.5)}for(let a=0;a<o;a++){const l=(a+1)%o;s.indices.push(r,r+1+l,r+1+a)}}function sg(s,t,e,n,i,o,r,a,l){const f=l-.55,p=e+.345;for(let g=-f+.55*.5;g<=f-.55*.5;g+=1.15){const v=t+r*g,m=n+a*g,d=.55*.5,x=2.1*.5,y=v-r*d-i*x,M=m-a*d-o*x,D=v+r*d-i*x,C=m+a*d-o*x,E=v-r*d+i*x,L=m-a*d+o*x,S=v+r*d+i*x,_=m+a*d+o*x;uo(s,y,p,M,D,p,C,E,p,L,S,p,_)}}const ei=new J("#4CC38A"),ac=new J("#F2C94C"),lc=new J("#EB7B3C"),og=new J("#D63E4F");function rg(s,t){const e=Math.max(0,Math.min(1,s));e<.35?t.copy(ei).lerp(ac,e/.35):e<.7?t.copy(ac).lerp(lc,(e-.35)/.35):t.copy(lc).lerp(og,(e-.7)/.3)}class ag{group=new ye;roadGroup=new ye;utilityGroup=new ye;trafficOverlayGroup=new ye;lastRoadRev=-1;lastUtilityRev=-1;sharedTextures=null;streetLampMat=null;lampPoolMat=null;trafficOverlayGeo=null;trafficOverlayRefs=[];utilityPipeMeshes=[];forceShowPipes=!1;lastOverlay="none";exclusionPoints=[];windTimeUniform={value:0};constructor(){this.group.add(this.roadGroup,this.utilityGroup,this.trafficOverlayGroup),this.trafficOverlayGroup.visible=!1}setSharedTextures(t){this.sharedTextures=t}getExclusionPoints(){return this.exclusionPoints}updateRoads(t,e){if(t.revision===this.lastRoadRev)return!1;this.lastRoadRev=t.revision,this.clearGroup(this.roadGroup),this.clearGroup(this.trafficOverlayGroup),this.streetLampMat=null,this.lampPoolMat=null,this.trafficOverlayGeo=null,this.trafficOverlayRefs=[],this.exclusionPoints=[];const n=t.segments,i=Math.floor(n.length/xo),o=t.nodes,r=Math.floor(o.length/ms),a=Hn(),l=Hn(),c=Hn(),h=Hn(),u=Hn(),f=Hn(),p=Hn(),g=Hn(),v=[],m=[],d=[],x=[],y=[],M=[],D=[],C=[];for(let S=0;S<r;S++){const _=S*ms;C.push({x:o[_+1],z:o[_+2],radius:o[_+3]})}for(let S=0;S<i;S++){const _=S*xo,w=Math.round(n[_]),R=Math.round(n[_+1]),A=la[R]??"small_2lane",I=An[A],z={p0:{x:n[_+2],z:n[_+3]},c0:{x:n[_+4],z:n[_+5]},c1:{x:n[_+6],z:n[_+7]},p1:{x:n[_+8],z:n[_+9]}},W=n[_+10]||I.width,Q=n[_+11]>.5,k=hi(z,28),K=Math.max(4,Math.ceil(k.length/4.5)),q=[];for(let $=0;$<=K;$++){const N=$/K*k.length,st=ui(k,N),rt=Oe(z,st),ft=li(z,st),ht=Math.hypot(ft.x,ft.z)||1,at=ft.x/ht,lt=ft.z/ht,F=ci(ft),wt=e(rt.x,rt.z),pt=Q?Math.max(wt,1.8):wt;q.push({x:rt.x,y:pt,z:rt.z,tx:at,tz:lt,nx:F.x,nz:F.z,s:N,yaw:Math.atan2(at,lt)}),$%2===0&&this.exclusionPoints.push({x:rt.x,z:rt.z,r:W*.65+4.2})}const ct=W*.5,xt=Math.max(2.6,ct-I.sidewalkWidth);if(Fe(a,q,-ct,ct,.24,!0,l),A!=="highway"&&(Fe(l,q,-xt-.28,-xt,.285,!1),Fe(l,q,xt,xt+.28,.285,!1)),Fe(A==="highway"?h:c,q,-xt,xt,.3,!1),(A==="highway"||A==="avenue_4lane")&&(Fe(p,q,-xt+.18,-xt+.34,.34,!1),Fe(p,q,xt-.34,xt-.18,.34,!1)),I.medianWidth>.2){const $=I.medianWidth*.5;A==="highway"?Fe(f,q,-$*.45,$*.45,.48,!1):(Fe(u,q,-$,$,.37,!1),Fe(g,q,-$-.34,-$-.14,.34,!1),Fe(g,q,$+.14,$+.34,.34,!1))}else if(A==="small_2lane"||A==="tree_2lane")for(let $=1;$<q.length-2;$+=2)Fe(p,[q[$],q[$+1]],-.13,.13,.34,!1);else if(A==="oneway_2lane")for(let $=1;$<q.length-2;$+=2)Fe(p,[q[$],q[$+1]],-.12,.12,.34,!1);if(A==="avenue_4lane"||A==="highway"){const $=(I.medianWidth*.5+xt)*.5;for(let N=1;N<q.length-2;N+=2)Fe(p,[q[N],q[N+1]],-$-.12,-$+.12,.34,!1),Fe(p,[q[N],q[N+1]],$-.12,$+.12,.34,!1)}if(A!=="highway"&&k.length>26){const $=Math.min(11,ct+2.4);for(const N of[$,k.length-$]){const st=ui(k,N),rt=Oe(z,st),ft=li(z,st),ht=Math.hypot(ft.x,ft.z)||1,at=ft.x/ht,lt=ft.z/ht,F=ci(ft),wt=Q?Math.max(e(rt.x,rt.z),1.8):e(rt.x,rt.z);sg(p,rt.x,wt,rt.z,at,lt,F.x,F.z,xt)}}const U=v.length/3,X=xt*.96;for(let $=0;$<q.length;$++){const N=q[$],st=N.y+.43;v.push(N.x-N.nx*X,st,N.z-N.nz*X),v.push(N.x+N.nx*X,st,N.z+N.nz*X),m.push(0,1,0,0,1,0),d.push(ei.r,ei.g,ei.b,ei.r,ei.g,ei.b)}for(let $=0;$<q.length-1;$++){const N=U+$*2;x.push(N,N+1,N+2,N+1,N+3,N+2)}if(this.trafficOverlayRefs.push({segId:w,startVertex:U,vertexCount:q.length*2}),k.length>24&&!Q){if(I.hasTrees){const $=A==="avenue_4lane"?22:18;for(let N=14;N<k.length-14;N+=$){const st=ui(k,N),rt=Oe(z,st),ft=ci(li(z,st));if(A==="avenue_4lane"){const ht=e(rt.x,rt.z);y.push({x:rt.x,y:ht+.25,z:rt.z,scale:.62})}else{const ht=ct-1.5,at=rt.x-ft.x*ht,lt=rt.z-ft.z*ht,F=rt.x+ft.x*ht,wt=rt.z+ft.z*ht;y.push({x:at,y:e(at,lt)+.16,z:lt,scale:.68}),y.push({x:F,y:e(F,wt)+.16,z:wt,scale:.68})}}}if(A!=="highway")for(let N=15;N<k.length-13;N+=30){const st=ui(k,N),rt=Oe(z,st),ft=li(z,st),ht=ci(ft),at=Math.floor(N/30)%2===0?1:-1,lt=xt+.72,F=rt.x+ht.x*lt*at,wt=rt.z+ht.z*lt*at;M.push({x:F,y:e(F,wt)+.22,z:wt,yaw:Math.atan2(ft.x,ft.z),side:at})}}}for(let S=0;S<r;S++){const _=S*ms,w=o[_+1],R=o[_+2],A=o[_+3],I=Math.round(o[_+4]),z=e(w,R);rc(a,w,z+.246,R,A*1.03,18),rc(c,w,z+.308,R,Math.max(2.5,A-1.45),18),I===2&&(D.push({x:w+A*.78,y:z+.2,z:R+A*.78}),D.push({x:w-A*.78,y:z+.2,z:R-A*.78}))}const E=(S,_,w,R,A=!0,I)=>{const z=ig(S);if(!z)return;const W=new he({color:_,map:I??null,roughness:w,metalness:.02,polygonOffset:!0,polygonOffsetFactor:R,polygonOffsetUnits:R}),Q=new Kt(z,W);Q.receiveShadow=A,this.roadGroup.add(Q)},L=this.sharedTextures?.asphalt;if(E(a,"#CEC8BC",.91,-1,!0),E(l,"#A7A196",.92,-1.5,!0),E(c,"#5E646F",.88,-2.5,!0,L),E(h,"#505762",.85,-2.5,!0,L),E(u,"#6E915B",.92,-3.5,!0),E(f,"#C2BDB3",.86,-3.5,!0),E(p,"#EFEADF",.78,-5,!1),E(g,"#DEB24D",.78,-5,!1),y.length>0){const S=new Qe(.2,.32,2.5,6);S.translate(0,1.25,0);const _=new he({color:"#6A5342",roughness:.92}),w=Ta(),R=new he({color:"#5A854E",vertexColors:!0,roughness:.86});Aa(R,this.windTimeUniform,.18);const A=new se(S,_,y.length),I=new se(w,R,y.length);I.castShadow=!0,I.receiveShadow=!0;const z=new qt;for(let W=0;W<y.length;W++){const Q=y[W];z.position.set(Q.x,Q.y,Q.z),z.rotation.set(0,W*1.37,0),z.scale.setScalar(Q.scale),z.updateMatrix(),A.setMatrixAt(W,z.matrix),I.setMatrixAt(W,z.matrix)}A.instanceMatrix.needsUpdate=!0,I.instanceMatrix.needsUpdate=!0,this.roadGroup.add(A,I)}if(M.length>0){const S=new Qe(.09,.14,5.4,5);S.translate(0,2.7,0);const _=new Te(1.5,.12,.12);_.translate(-.7,5.3,0);const w=new he({color:"#5D6672",roughness:.58,metalness:.38}),R=new Te(.65,.24,.42);R.translate(-1.35,5.18,0);const A=new he({color:"#FFF4D4",emissive:new J("#FFD07A"),emissiveIntensity:.1,roughness:.25});this.streetLampMat=A;const I=new se(S,w,M.length),z=new se(_,w,M.length),W=new se(R,A,M.length);let Q=null;if(this.sharedTextures){const K=new en(11.5,11.5);K.rotateX(-Math.PI/2);const q=new Me({map:this.sharedTextures.lampGlow,transparent:!0,opacity:0,blending:vr,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-6,polygonOffsetUnits:-6});this.lampPoolMat=q,Q=new se(K,q,M.length),Q.renderOrder=5}const k=new qt;for(let K=0;K<M.length;K++){const q=M[K],ct=q.yaw+(q.side>0?0:Math.PI);if(k.position.set(q.x,q.y,q.z),k.rotation.set(0,ct,0),k.scale.set(1,1,1),k.updateMatrix(),I.setMatrixAt(K,k.matrix),z.setMatrixAt(K,k.matrix),W.setMatrixAt(K,k.matrix),Q){const xt=Math.cos(ct),Y=Math.sin(ct);k.position.set(q.x-xt*2.2,q.y+.18,q.z+Y*2.2),k.rotation.set(0,0,0),k.scale.set(1,1,1),k.updateMatrix(),Q.setMatrixAt(K,k.matrix)}}I.instanceMatrix.needsUpdate=!0,z.instanceMatrix.needsUpdate=!0,W.instanceMatrix.needsUpdate=!0,this.roadGroup.add(I,z,W),Q&&(Q.instanceMatrix.needsUpdate=!0,this.roadGroup.add(Q))}if(D.length>0){const S=new Te(.28,5.6,.28);S.translate(0,2.8,0);const _=new Te(.55,1.4,.55);_.translate(0,5.2,0);const w=new he({color:"#3E4652",roughness:.6,metalness:.3}),R=new he({color:"#2F3640",emissive:new J("#5FE08C"),emissiveIntensity:.5,roughness:.4}),A=new se(S,w,D.length),I=new se(_,R,D.length),z=new qt;for(let W=0;W<D.length;W++){const Q=D[W];z.position.set(Q.x,Q.y,Q.z),z.rotation.set(0,0,0),z.scale.set(1,1,1),z.updateMatrix(),A.setMatrixAt(W,z.matrix),I.setMatrixAt(W,z.matrix)}A.instanceMatrix.needsUpdate=!0,I.instanceMatrix.needsUpdate=!0,this.roadGroup.add(A,I)}if(x.length>0){const S=new fe;S.setAttribute("position",new Yt(v,3)),S.setAttribute("normal",new Yt(m,3)),S.setAttribute("color",new Yt(d,3)),S.setIndex(x),this.trafficOverlayGeo=S;const _=new Me({vertexColors:!0,transparent:!0,opacity:.9,polygonOffset:!0,polygonOffsetFactor:-7,polygonOffsetUnits:-7}),w=new Kt(S,_);w.renderOrder=6,this.trafficOverlayGroup.add(w)}return!0}updateUtilities(t,e){if(t.revision===this.lastUtilityRev)return;this.lastUtilityRev=t.revision,this.clearGroup(this.utilityGroup),this.utilityPipeMeshes=[];const n=t.lines,i=Math.floor(n.length/Mo);if(i===0)return;const o=[],r=[],a=[];for(let l=0;l<i;l++){const c=l*Mo,h=Math.round(n[c+1]),u=n[c+2],f=n[c+3],p=n[c+4],g=n[c+5],v=n[c+6]>.5,m=p-u,d=g-f,x=Math.hypot(m,d);if(!(x<1))if(h===0){const y=Math.atan2(m,d),M=Math.max(1,Math.round(x/55));let D=u,C=e(u,f)+12.5,E=f;o.push({x:u,y:e(u,f),z:f,yaw:y});for(let L=1;L<=M;L++){const S=L/M,_=u+m*S,w=f+d*S,R=e(_,w)+12.5;o.push({x:_,y:e(_,w),z:w,yaw:y});const A=(D+_)*.5,I=(E+w)*.5,z=(C+R)*.5-1.4;r.push(D,C,E,A,z,I,A,z,I,_,R,w),D=_,C=R,E=w}}else a.push({x0:u,y0:e(u,f)+.55,z0:f,x1:p,y1:e(p,g)+.55,z1:g,active:v})}if(o.length>0){const l=new Qe(.26,.56,13,4);l.translate(0,6.5,0);const c=new Te(5.2,.34,.34);c.translate(0,12.2,0);const h=new he({color:"#838F9C",roughness:.55,metalness:.4}),u=new se(l,h,o.length),f=new se(c,h,o.length),p=new qt;for(let g=0;g<o.length;g++){const v=o[g];p.position.set(v.x,v.y-.5,v.z),p.rotation.set(0,v.yaw,0),p.scale.set(1,1,1),p.updateMatrix(),u.setMatrixAt(g,p.matrix),f.setMatrixAt(g,p.matrix)}u.instanceMatrix.needsUpdate=!0,f.instanceMatrix.needsUpdate=!0,this.utilityGroup.add(u,f)}if(r.length>0){const l=new fe;l.setAttribute("position",new Yt(r,3));const c=new ri({color:"#6A7684"});this.utilityGroup.add(new Hi(l,c))}if(a.length>0){const l=new Qe(.85,.85,1,8);l.rotateX(Math.PI/2);const c=new Me({color:"#3B9ED8",transparent:!0,opacity:.88}),h=new se(l,c,a.length),u=new qt,f=new O,p=new O,g=new O;for(let v=0;v<a.length;v++){const m=a[v];f.set(m.x0,m.y0,m.z0),p.set(m.x1,m.y1,m.z1),g.addVectors(f,p).multiplyScalar(.5),u.position.copy(g),u.lookAt(p),u.scale.set(1,1,f.distanceTo(p)),u.updateMatrix(),h.setMatrixAt(v,u.matrix)}h.instanceMatrix.needsUpdate=!0,h.visible=this.forceShowPipes||this.lastOverlay==="water",this.utilityPipeMeshes.push(h),this.utilityGroup.add(h)}}setForceShowPipes(t){this.forceShowPipes=t;const e=this.forceShowPipes||this.lastOverlay==="water";for(const n of this.utilityPipeMeshes)n.visible=e}updateTrafficOverlay(t,e){this.lastOverlay=t;const n=t==="traffic";this.trafficOverlayGroup.visible=n;for(const l of this.utilityPipeMeshes)l.visible=this.forceShowPipes||t==="water";if(!n||!this.trafficOverlayGeo||this.trafficOverlayRefs.length===0)return;const i=new Map;for(let l=0;l+1<e.length;l+=2)i.set(Math.round(e[l]),e[l+1]);const o=this.trafficOverlayGeo.attributes.color,r=o.array,a=new J;for(const l of this.trafficOverlayRefs){const c=i.get(l.segId)??0;rg(c,a);for(let h=0;h<l.vertexCount;h++){const u=(l.startVertex+h)*3;r[u]=a.r,r[u+1]=a.g,r[u+2]=a.b}}o.needsUpdate=!0}updateLighting(t,e=0){this.windTimeUniform.value+=e,this.streetLampMat&&(this.streetLampMat.emissiveIntensity=.08+t*4.5),this.lampPoolMat&&(this.lampPoolMat.opacity=Math.max(0,(t-.12)*.78))}clearGroup(t){for(;t.children.length>0;){const e=t.children[0];t.remove(e),(e instanceof Kt||e instanceof Hi)&&(e.geometry.dispose(),Array.isArray(e.material)?e.material.forEach(n=>n.dispose()):e.material.dispose())}}}const cc=new J("#133548"),lg=new J("#478082"),cg=new J("#B9A47C"),hc=new J("#E6D6AE"),uc=new J("#86A164"),dc=new J("#61834E"),hg=new J("#9FA76C"),ug=new J("#AEA976"),dg=new J("#43603B"),fc=new J("#4A6C44"),fr=new J("#9B9789"),fg=new J("#7C7D74"),no=[new J("#395F3F"),new J("#456D47"),new J("#2F5137"),new J("#4E754A")],Fi=[new J("#537E49"),new J("#688E52"),new J("#456F44"),new J("#789858"),new J("#8A9C5C"),new J("#D1A7AC")],pg=new J("#D4DCE3"),pc=new J("#7BC8A4"),mc=new J("#38A3A5"),mg=new J("#F2C94C"),gg=new J("#A68A5B"),vg=new J("#8A567C"),xg=new J("#F6C84C"),_g=new J("#9BA4B0"),Mg=new J("#58B8EE"),yg=new J("#9C8F82"),Sg=new J("#CBD5DF"),bg=new J("#4BC29A");function _e(s,t,e){let n=Math.imul(s,374761393)+Math.imul(t,668265263)+Math.imul(e,1442695041);return n=(n^n>>>13)>>>0,n=Math.imul(n,1274126177)>>>0,((n^n>>>16)>>>0)/4294967296}function ih(s,t,e){const n=Math.floor(s),i=Math.floor(t),o=s-n,r=t-i,a=o*o*(3-2*o),l=r*r*(3-2*r),c=_e(n,i,e),h=_e(n+1,i,e),u=_e(n,i+1,e),f=_e(n+1,i+1,e);return(c+(h-c)*a)*(1-l)+(u+(f-u)*a)*l}function pr(s,t,e,n=3){let i=0,o=.5,r=1,a=0;for(let l=0;l<n;l++)i+=ih(s*r,t*r,e+l*79)*o,a+=o,o*=.5,r*=2.03;return i/a}function Eg(){const t=document.createElement("canvas");t.width=512,t.height=512;const e=t.getContext("2d");e.fillStyle="#EAEAE8",e.fillRect(0,0,512,512);let n=424242;const i=()=>(n=n*1664525+1013904223>>>0,n/4294967296);for(let r=0;r<480;r++){const a=i()*512,l=i()*512,c=18+i()*58,h=i(),u=.055+i()*.075,f=h>.55?`rgba(255, 248, 212, ${u})`:h>.18?`rgba(34, 58, 32, ${u})`:`rgba(112, 92, 62, ${u*.85})`;for(const p of[-512,0,512])for(const g of[-512,0,512]){const v=a+p,m=l+g;if(v+c<0||v-c>512||m+c<0||m-c>512)continue;const d=e.createRadialGradient(v,m,2,v,m,c);d.addColorStop(0,f),d.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=d,e.beginPath(),e.arc(v,m,c,0,Math.PI*2),e.fill()}}for(let r=0;r<7200;r++){const a=i()*512,l=i()*512,c=1.2+i()*2.6,h=i()>.45;e.fillStyle=h?"rgba(28, 48, 30, 0.13)":"rgba(255, 250, 228, 0.11)",e.fillRect(a,l,c,c*1.4)}const o=new Kc(t);return o.colorSpace=De,o.wrapS=fi,o.wrapT=fi,o.repeat.set(22,22),o.anisotropy=4,o.needsUpdate=!0,o}function wg(s,t,e){const n=Math.max(0,Math.min(1,t));switch(s){case"landvalue":return n<.35?e.copy(pg).lerp(pc,n/.35):n<.7?e.copy(pc).lerp(mc,(n-.35)/.35):e.copy(mc).lerp(mg,(n-.7)/.3),.78;case"pollution":case"noise":return n<.05?0:(e.copy(gg).lerp(vg,n),Math.min(.84,.25+n*.65));case"power":return n>.25?(e.copy(xg),.68):(e.copy(_g),.42);case"water":return n>.25?(e.copy(Mg),.7):(e.copy(yg),.36);case"services":case"happiness":return e.copy(Sg).lerp(bg,n),.7;default:return 0}}class Tg{group=new ye;seed=202604;heights=new Float32Array(ee*ee);terrainGeo=null;terrainMesh=null;terrainDetailTex=null;baseColors=new Float32Array(ee*ee*3);waterMat=null;waterDepthTex=null;rawTrees=new Float32Array(0);treeMeshes=[];windTimeUniform={value:0};waveTime=0;treeDensityMult=2.35;waterWaveDetail=1;setQuality(t){this.treeDensityMult=t.treeDensityMult,this.waterWaveDetail=t.waterWaveDetail,this.waterMat&&(this.waterMat.uniforms.uWaveDetail.value=this.waterWaveDetail)}init(t){this.clear(),this.seed=t.seed||202604,this.heights=new Float32Array(t.heights),this.rawTrees=new Float32Array(t.trees),this.buildTerrainSurface(),this.buildWaterSurface(),this.buildTrees(null)}getTerrainMesh(){return this.terrainMesh}sampleSlope(t,e){const i=this.sampleHeight(t-5,e),o=this.sampleHeight(t+5,e),r=this.sampleHeight(t,e-5),a=this.sampleHeight(t,e+5);return Math.hypot((o-i)/10,(a-r)/10)}isInBounds(t,e,n=16){return t>=-qe+n&&t<=qe-n&&e>=-qe+n&&e<=qe-n}isWater(t,e,n=.2){return this.sampleHeight(t,e)<=En+n}isBuildable(t,e,n=.32){return!this.isInBounds(t,e,20)||this.sampleHeight(t,e)<=En+.6?!1:this.sampleSlope(t,e)<=n}isNearWater(t,e,n=72){if(this.isWater(t,e,.3))return!0;const i=8;for(let o=0;o<i;o++){const r=o/i*Math.PI*2;if(this.isWater(t+Math.cos(r)*n,e+Math.sin(r)*n,.1)||this.isWater(t+Math.cos(r)*n*.5,e+Math.sin(r)*n*.5,.1))return!0}return!1}sampleHeight(t,e){const n=Math.max(0,Math.min(ee-1.0001,(t+qe)/za)),i=Math.max(0,Math.min(ee-1.0001,(e+qe)/za)),o=Math.floor(n),r=Math.floor(i),a=n-o,l=i-r,c=r*ee+o,h=this.heights[c],u=this.heights[c+1],f=this.heights[c+ee],p=this.heights[c+ee+1];return(h+(u-h)*a)*(1-l)+(f+(p-f)*a)*l}buildForestDensityGrid(){const e=new Float32Array(9216),n=Math.floor(this.rawTrees.length/5);for(let i=0;i<n;i++){const o=this.rawTrees[i*5],r=this.rawTrees[i*5+2],a=Math.floor((o+qe)/cn*96),l=Math.floor((r+qe)/cn*96);for(let c=-2;c<=2;c++){const h=l+c;if(!(h<0||h>=96))for(let u=-2;u<=2;u++){const f=a+u;if(f<0||f>=96)continue;const p=u*u+c*c;p<=5&&(e[h*96+f]+=(6-p)*.05)}}}return e}buildTerrainSurface(){const t=new en(cn,cn,ee-1,ee-1);t.rotateX(-Math.PI/2);const e=t.attributes.position,n=e.count,i=new Float32Array(n*3),o=new J;for(let u=0;u<n;u++)e.setY(u,this.heights[u]);t.computeVertexNormals();const r=t.attributes.normal,a=this.buildForestDensityGrid(),l=96;for(let u=0;u<ee;u++)for(let f=0;f<ee;f++){const p=u*ee+f,g=this.heights[p],v=e.getX(p),m=e.getZ(p),d=r.getY(p),x=1-Math.max(0,Math.min(1,d)),y=pr(v*.0036+4.1,m*.0036-7.3,this.seed+11,3),M=pr(v*.012-3.2,m*.012+5.9,this.seed+53,3),D=ih(v*.038,m*.038,this.seed+97),C=u*ee+Math.max(0,f-1),E=u*ee+Math.min(ee-1,f+1),L=Math.max(0,u-1)*ee+f,S=Math.min(ee-1,u+1)*ee+f,_=(this.heights[C]+this.heights[E]+this.heights[L]+this.heights[S])*.25,w=Math.max(-2.5,Math.min(2.5,_-g)),R=Math.max(0,Math.min(l-1,Math.floor((v+qe)/cn*l))),A=Math.max(0,Math.min(l-1,Math.floor((m+qe)/cn*l))),I=Math.min(1,a[A*l+R]),z=2.45+(M-.5)*1.15;if(g<-3.2)o.copy(cc);else if(g<0){const k=(g+3.2)/3.2;o.copy(cc).lerp(lg,Math.pow(k,1.1))}else if(g<.55){const k=g/.55;o.copy(cg).lerp(hc,k)}else if(g<z){const k=(g-.55)/Math.max(.25,z-.55);o.copy(hc).lerp(uc,Math.pow(k,1.25))}else if(g<18){const k=(g-z)/Math.max(1,18-z);o.copy(uc).lerp(dc,Math.min(1,k*.55+y*.65)),M>.5&&o.lerp(hg,(M-.5)*1.15),y>.64&&M>.58&&o.lerp(ug,(y-.64)*1.1)}else if(g<38){const k=(g-18)/20;o.copy(dc).lerp(fc,k),y>.5&&o.lerp(fr,(y-.5)*.55*k)}else{const k=Math.min(1,(g-38)/16);o.copy(fc).lerp(fr,k*.88)}g>1.8&&I>.04&&o.lerp(dg,Math.min(.66,I*.72));const W=.04+(M-.5)*.022;if(x>W&&g>1.6){const k=Math.min(.9,(x-W)*5.8);o.lerp(D>.48?fr:fg,k)}const Q=1+(M-.5)*.14+(D-.5)*.08-w*.075;o.multiplyScalar(Math.max(.74,Math.min(1.16,Q))),i[p*3]=o.r,i[p*3+1]=o.g,i[p*3+2]=o.b}this.baseColors=new Float32Array(i),t.setAttribute("color",new pe(i,3)),this.terrainGeo=t,this.terrainDetailTex||(this.terrainDetailTex=Eg());const c=new he({vertexColors:!0,map:this.terrainDetailTex,roughness:.94,metalness:0}),h=new Kt(t,c);h.receiveShadow=!0,h.name="terrain",this.terrainMesh=h,this.group.add(h)}buildWaterSurface(){const t=new Uint8Array(ee*ee*4);for(let r=0;r<ee;r++){const a=ee-1-r;for(let l=0;l<ee;l++){const c=this.heights[r*ee+l],h=En-c,u=Math.max(0,Math.min(255,Math.round(h/11*255))),f=Math.max(0,Math.min(255,Math.round((h+.4)/2.6*255))),p=(a*ee+l)*4;t[p]=u,t[p+1]=f,t[p+2]=0,t[p+3]=255}}const e=new jc(t,ee,ee,We);e.minFilter=Ae,e.magFilter=Ae,e.wrapS=hn,e.wrapT=hn,e.needsUpdate=!0,this.waterDepthTex=e;const n=new en(cn,cn,96,96);n.rotateX(-Math.PI/2);const i=new Be({transparent:!0,depthWrite:!1,uniforms:{uDepthMap:{value:e},uTime:{value:0},uWaveDetail:{value:this.waterWaveDetail},uSunDir:{value:new O(.35,.72,.55).normalize()},uSunColor:{value:new J("#FFF4DE")},uHorizonColor:{value:new J("#CEE3F2")},uZenithColor:{value:new J("#4C92D4")},uFogColor:{value:new J("#CEE3F2")},uFogNear:{value:680},uFogFar:{value:2250},uNightFactor:{value:0}},vertexShader:`
        varying vec2 vUv;
        varying vec3 vWorldPos;
        varying float vFogDepth;

        void main() {
          vUv = uv;
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vWorldPos = worldPos.xyz;
          vec4 mvPos = viewMatrix * worldPos;
          vFogDepth = -mvPos.z;
          gl_Position = projectionMatrix * mvPos;
        }
      `,fragmentShader:`
        uniform sampler2D uDepthMap;
        uniform float uTime;
        uniform float uWaveDetail;
        uniform vec3 uSunDir;
        uniform vec3 uSunColor;
        uniform vec3 uHorizonColor;
        uniform vec3 uZenithColor;
        uniform vec3 uFogColor;
        uniform float uFogNear;
        uniform float uFogFar;
        uniform float uNightFactor;

        varying vec2 vUv;
        varying vec3 vWorldPos;
        varying float vFogDepth;

        float hash21(vec2 p) {
          p = fract(p * vec2(123.34, 456.21));
          p += dot(p, p + 45.32);
          return fract(p.x * p.y);
        }

        float noise2(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          vec2 u = f * f * (3.0 - 2.0 * f);
          float a = hash21(i);
          float b = hash21(i + vec2(1.0, 0.0));
          float c = hash21(i + vec2(0.0, 1.0));
          float d = hash21(i + vec2(1.0, 1.0));
          return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
        }

        void main() {
          vec4 depthSample = texture2D(uDepthMap, vUv);
          float fineDepth = depthSample.g * 2.6 - 0.4; // -0.4m .. +2.2m
          float broadDepth = depthSample.r * 11.0;
          float depth = max(fineDepth, broadDepth);

          if (fineDepth < -0.05) discard;

          vec2 wp = vWorldPos.xz;

          // Multi-frequency animated ripples (natural ocean surface texture, cheap on SwiftShader)
          float t = uTime * 0.72;
          float w1 = sin(wp.x * 0.16 + wp.y * 0.11 + t * 1.45) * cos(wp.y * 0.14 - wp.x * 0.08 - t * 1.15);
          float w2 = sin(wp.x * 0.38 - wp.y * 0.31 - t * 2.1) * 0.55;
          float n1 = noise2(wp * 0.11 + vec2(t * 0.32, -t * 0.24)) - 0.5;
          float n2 = noise2(wp * 0.28 + vec2(-t * 0.45, t * 0.38)) - 0.5;
          float rippleScale = (0.055 + 0.045 * uWaveDetail) * smoothstep(0.0, 1.0, fineDepth);

          vec3 N = normalize(vec3(
            (w1 * 0.55 + w2 * 0.65 + n1 * 0.8 + n2 * 0.5) * rippleScale,
            1.0,
            (w1 * 0.45 - w2 * 0.75 + n1 * 0.65 - n2 * 0.55) * rippleScale
          ));

          vec3 V = normalize(cameraPosition - vWorldPos);
          float NdotV = max(dot(N, V), 0.001);
          float fresnel = pow(1.0 - NdotV, 3.6);

          // TRUE LINEAR coastal water colors (so ACES + sRGB matches deep marine references!)
          vec3 cShallowDay = vec3(0.055, 0.235, 0.245); // clear coastal turquoise
          vec3 cMidDay     = vec3(0.018, 0.095, 0.148); // harbor teal
          vec3 cDeepDay    = vec3(0.009, 0.042, 0.088); // deep bay marine blue

          vec3 cShallowNight = vec3(0.008, 0.024, 0.042);
          vec3 cMidNight     = vec3(0.004, 0.012, 0.028);
          vec3 cDeepNight    = vec3(0.002, 0.006, 0.018);

          vec3 cShallow = mix(cShallowDay, cShallowNight, uNightFactor);
          vec3 cMid     = mix(cMidDay, cMidNight, uNightFactor);
          vec3 cDeep    = mix(cDeepDay, cDeepNight, uNightFactor);

          float midT = smoothstep(0.18, 2.2, depth);
          float deepT = smoothstep(1.8, 6.8, depth);
          vec3 waterCol = mix(cShallow, cMid, midT);
          waterCol = mix(waterCol, cDeep, deepT);

          // Subtle wave crest/trough light modulation
          waterCol *= 0.90 + 0.16 * (w1 * 0.5 + n1 + n2 * 0.5);

          // Fresnel sky reflection (already linear uHorizonColor / uZenithColor)
          vec3 skyRefl = mix(uHorizonColor, uZenithColor, 0.48 + 0.28 * (1.0 - NdotV));
          float reflStrength = mix(0.08, 0.48, fresnel) * mix(0.85, 0.52, uNightFactor);
          waterCol = mix(waterCol, skyRefl * 0.72, reflStrength);

          // Crisp sun / moon specular glints
          vec3 H = normalize(normalize(uSunDir) + V);
          float specBroad = pow(max(dot(N, H), 0.0), 48.0) * 0.16;
          float specSharp = pow(max(dot(N, H), 0.0), 220.0) * 0.58;
          waterCol += uSunColor * (specBroad + specSharp) * mix(0.95, 0.35, uNightFactor);

          // Tight crisp organic shoreline foam kiss right along depth 0.0 .. 0.30m
          float shoreNoise = noise2(wp * 0.22 + vec2(t * 0.42, t * 0.25));
          float edgeBand = 1.0 - smoothstep(0.01, 0.24 + shoreNoise * 0.14, fineDepth);
          float rippleFoam = smoothstep(0.58, 0.92, sin(fineDepth * 26.0 - uTime * 2.2 + shoreNoise * 5.0))
                           * (1.0 - smoothstep(0.08, 0.50, fineDepth)) * 0.46;
          float foamMask = clamp(edgeBand * (0.65 + shoreNoise * 0.38) + rippleFoam, 0.0, 1.0);
          foamMask *= smoothstep(-0.02, 0.04, fineDepth);

          // Linear foam color (clean sunlit seafoam by day, subtle moonlit rim by night)
          vec3 foamCol = mix(vec3(0.76, 0.85, 0.84), vec3(0.04, 0.065, 0.11), uNightFactor);
          waterCol = mix(waterCol, foamCol, foamMask * 0.80);

          // Seamless edge feathering over wet beach sand
          float alpha = smoothstep(-0.03, 0.18, fineDepth);
          alpha = mix(alpha * 0.76, 0.96, smoothstep(0.14, 1.8, depth));
          alpha = max(alpha, foamMask * 0.82);

          // Atmospheric distance fog
          float fogFactor = smoothstep(uFogNear, uFogFar, vFogDepth);
          waterCol = mix(waterCol, uFogColor, fogFactor);

          gl_FragColor = vec4(waterCol, alpha);
          #include <colorspace_fragment>
        }
      `});this.waterMat=i;const o=new Kt(n,i);o.position.y=En+.04,o.renderOrder=1,o.name="water",this.group.add(o)}buildTrees(t){for(const u of this.treeMeshes)this.group.remove(u),u instanceof Kt&&(u.geometry.dispose(),Array.isArray(u.material)?u.material.forEach(f=>f.dispose()):u.material.dispose());this.treeMeshes=[];const e=Math.floor(this.rawTrees.length/5);if(e===0)return;const n=(u,f)=>{if(!t)return!1;for(let p=0;p<t.length;p++){const g=t[p],v=u-g.x,m=f-g.z;if(v*v+m*m<g.r*g.r)return!0}return!1},i=[],o=[],r=this.treeDensityMult>=2.1?2:this.treeDensityMult>=1.4?1:0;for(let u=0;u<e;u++){const f=this.rawTrees[u*5],p=this.rawTrees[u*5+1],g=this.rawTrees[u*5+2],v=this.rawTrees[u*5+3],m=Math.floor(this.rawTrees[u*5+4]);if(n(f,g))continue;const d=p>14.5?.72:.42,y=_e(u,17,this.seed)<d,M=u*1.6180339%(Math.PI*2);if(y)i.push({x:f,y:p,z:g,scale:v*1.2,yaw:M,colorIdx:m%no.length});else{const D=_e(u,91,this.seed),C=p<16&&D<.055?Fi.length-1:(m+u)%(Fi.length-1);o.push({x:f,y:p,z:g,scale:v*1.14,yaw:M,colorIdx:C})}for(let D=0;D<r;D++){const C=_e(u,31+D*7,this.seed)*Math.PI*2,E=5.5+_e(u,53+D*11,this.seed)*11,L=f+Math.cos(C)*E,S=g+Math.sin(C)*E;if(!this.isInBounds(L,S,24))continue;const _=this.sampleHeight(L,S);if(_<En+1.8||_>54||n(L,S))continue;const w=v*(.72+_e(u,71+D*13,this.seed)*.56),R=C*1.7;_e(u,83+D*5,this.seed)<(_>13.5?.75:.45)?i.push({x:L,y:_,z:S,scale:w*1.15,yaw:R,colorIdx:(m+D+1)%no.length}):o.push({x:L,y:_,z:S,scale:w*1.06,yaw:R,colorIdx:(m+D)%(Fi.length-1)})}}const a=Math.round(135*Math.min(1.5,this.treeDensityMult*.65)),l=this.treeDensityMult>=2?4:this.treeDensityMult>=1.4?3:2;for(let u=0;u<a;u++){const f=-520+_e(u,211,this.seed)*1120,p=-560+_e(u,307,this.seed)*980;if(!this.isInBounds(f,p,28)||Math.abs(f-240)<38&&p<-210)continue;const g=this.sampleHeight(f,p);if(g<En+2||g>38)continue;const v=g<6.8&&this.isNearWater(f,p,84),m=pr(f*.0055+9.2,p*.0055-4.7,this.seed+401,3);if(!(!v&&m<.59))for(let d=0;d<l;d++){const x=_e(u,811+d*17,this.seed)*Math.PI*2,y=d===0?0:4.5+_e(u,907+d*23,this.seed)*11.5,M=f+Math.cos(x)*y,D=p+Math.sin(x)*y;if(!this.isInBounds(M,D,24)||Math.abs(M-240)<32&&D<-215)continue;const C=this.sampleHeight(M,D);if(C<En+1.8||C>42||n(M,D))continue;const E=.8+_e(u+d*31,419,this.seed)*.64,L=_e(u+d*19,521,this.seed)*Math.PI*2;if(_e(u+d*13,613,this.seed)<(v?.34:.52))i.push({x:M,y:C,z:D,scale:E*1.16,yaw:L,colorIdx:(u+d)%no.length});else{const _=_e(u+d*7,709,this.seed)<.05;o.push({x:M,y:C,z:D,scale:E*1.08,yaw:L,colorIdx:_?Fi.length-1:(u+d)%(Fi.length-1)})}}}const c=new qt,h=(u,f,p,g,v,m,d)=>{if(u.length===0)return;const x=new Qe(v,m,g,6);x.translate(0,g*.5,0);const y=new he({color:"#6A5342",roughness:.94,metalness:0}),M=new he({color:"#ffffff",vertexColors:!0,roughness:.88,metalness:0});Aa(M,this.windTimeUniform,d);const D=new se(x,y,u.length),C=new se(f,M,u.length);C.castShadow=!0,C.receiveShadow=!0;for(let E=0;E<u.length;E++){const L=u[E];c.position.set(L.x,L.y-.35,L.z),c.rotation.set(0,L.yaw,0);const S=.9+E*37%23*.01;c.scale.set(L.scale,L.scale*S,L.scale),c.updateMatrix(),D.setMatrixAt(E,c.matrix),C.setMatrixAt(E,c.matrix),C.setColorAt(E,p[L.colorIdx%p.length])}D.instanceMatrix.needsUpdate=!0,C.instanceMatrix.needsUpdate=!0,C.instanceColor&&(C.instanceColor.needsUpdate=!0),this.treeMeshes.push(D,C),this.group.add(D,C)};h(i,eh(),no,2.8,.24,.48,.22),h(o,Ta(),Fi,3,.28,.52,.26)}applyOverlay(t,e){if(!this.terrainGeo)return;const n=this.terrainGeo.attributes.color,i=n.array;if(t==="none"){i.set(this.baseColors),n.needsUpdate=!0;return}const o=this.terrainGeo.attributes.position;if(t==="traffic"||!e){for(let l=0;l<o.count;l++){const c=this.baseColors[l*3],h=this.baseColors[l*3+1],u=this.baseColors[l*3+2],f=c*.299+h*.587+u*.114,p=Math.min(.86,f*1.12+.12);i[l*3]=p*.82+c*.18,i[l*3+1]=p*.84+h*.16,i[l*3+2]=p*.87+u*.13}n.needsUpdate=!0;return}const r=new J,a=new J;for(let l=0;l<o.count;l++){const c=this.heights[l],h=this.baseColors[l*3],u=this.baseColors[l*3+1],f=this.baseColors[l*3+2];if(c<En-.4&&t!=="pollution"){i[l*3]=h,i[l*3+1]=u,i[l*3+2]=f;continue}const p=o.getX(l),g=o.getZ(l),v=Math.max(0,Math.min(Ui-1.001,(p+qe)/Ba-.5)),m=Math.max(0,Math.min(Ui-1.001,(g+qe)/Ba-.5)),d=Math.floor(v),x=Math.floor(m),y=v-d,M=m-x,D=x*Ui+d,C=(e[D]*(1-y)+e[D+1]*y)*(1-M)+(e[D+Ui]*(1-y)+e[D+Ui+1]*y)*M,E=wg(t,C,r),L=h*.299+u*.587+f*.114,S=Math.min(.84,L*1.1+.1);a.setRGB(S*.78+h*.22,S*.78+u*.22,S*.8+f*.2),a.lerp(r,E),i[l*3]=a.r,i[l*3+1]=a.g,i[l*3+2]=a.b}n.needsUpdate=!0}syncEnvironment(t){if(!this.waterMat)return;const e=this.waterMat.uniforms;e.uHorizonColor.value.copy(t.horizonColor),e.uZenithColor.value.copy(t.zenithColor),e.uSunDir.value.copy(t.sunDir).normalize(),e.uSunColor.value.copy(t.sunColor),e.uFogColor.value.copy(t.fogColor),e.uFogNear.value=t.fogNear,e.uFogFar.value=t.fogFar,e.uNightFactor.value=t.emissiveStrength}update(t,e){this.waveTime+=t,this.windTimeUniform.value=this.waveTime,this.waterMat&&(this.waterMat.uniforms.uTime.value=this.waveTime)}clear(){for(;this.group.children.length>0;){const t=this.group.children[0];this.group.remove(t),t instanceof Kt&&(t.geometry.dispose(),Array.isArray(t.material)?t.material.forEach(e=>e.dispose()):t.material.dispose())}this.waterDepthTex&&(this.waterDepthTex.dispose(),this.waterDepthTex=null),this.terrainGeo=null,this.terrainMesh=null,this.waterMat=null,this.treeMeshes=[]}}const hs=1600,io=[new J("#EAE6DE"),new J("#C96254"),new J("#4B88B4"),new J("#D9B154"),new J("#579A7B"),new J("#7C71A6"),new J("#C88456"),new J("#5D6570")],Ag=new J("#E3DFD7"),gc=[new J("#EEF2F6"),new J("#C44A3C"),new J("#3B69A8")],Cg=new J("#3D5366"),Rg=new J("#DAD5C8"),Pg=new J("#FFF4CC"),Dg=new J("#6D232A"),Lg=new J("#FF404E");class Ig{group=new ye;bodyMesh;cabinMesh;headlightMesh;taillightMesh;headMat;tailMat;dummy=new qt;tmpCol=new J;lastEmissive=0;constructor(){const t=new Te(1,1,1),e=new he({color:"#ffffff",roughness:.42,metalness:.18}),n=new he({color:"#ffffff",roughness:.24,metalness:.32});this.headMat=new Me({color:"#ffffff",toneMapped:!1}),this.tailMat=new Me({color:"#ffffff",toneMapped:!1}),this.bodyMesh=new se(t,e,hs),this.cabinMesh=new se(t,n,hs),this.headlightMesh=new se(t,this.headMat,hs),this.taillightMesh=new se(t,this.tailMat,hs),this.bodyMesh.castShadow=!0,this.bodyMesh.receiveShadow=!0,this.cabinMesh.castShadow=!0,this.bodyMesh.count=0,this.cabinMesh.count=0,this.headlightMesh.count=0,this.taillightMesh.count=0,this.bodyMesh.frustumCulled=!1,this.cabinMesh.frustumCulled=!1,this.headlightMesh.frustumCulled=!1,this.taillightMesh.frustumCulled=!1,this.group.add(this.bodyMesh,this.cabinMesh,this.headlightMesh,this.taillightMesh)}updateFromSnapshot(t,e){this.lastEmissive=e;const n=Math.min(hs,Math.floor(t.length/Yl));if(this.bodyMesh.count=n,this.cabinMesh.count=n,this.headlightMesh.count=n,this.taillightMesh.count=n,n===0)return;const i=1+e*2.4,o=this.tmpCol.copy(Rg).lerp(Pg,Math.min(1,.25+e*.9)).multiplyScalar(i),r=new J().copy(Lg).multiplyScalar(1+e*1.9);for(let a=0;a<n;a++){const l=a*Yl,c=t[l],h=t[l+1]+.1,u=t[l+2],f=t[l+3],p=Math.round(t[l+4]),g=Math.abs(Math.round(t[l+5])),v=t[l+6]>.5,m=Math.sin(f),d=Math.cos(f);let x=2.02,y=1.02,M=4.45,D=1.72,C=.76,E=2.25,L=-.25,S=io[g%io.length];p===1?(x=2.42,y=2.4,M=6.7,D=2.2,C=1.76,E=1.95,L=2.25,S=Ag):p===2?(x=2.12,y=1.72,M=5.1,D=1.88,C=.54,E=3.1,L=-.15):p===3&&(x=2.12,y=1.68,M=5.1,D=1.82,C=.58,E=2.95,L=-.1,S=gc[g%gc.length]),this.dummy.position.set(c,h+y*.5,u),this.dummy.rotation.set(0,f,0),this.dummy.scale.set(x,y,M),this.dummy.updateMatrix(),this.bodyMesh.setMatrixAt(a,this.dummy.matrix),this.bodyMesh.setColorAt(a,S);const _=p===1?h+C*.5+.15:h+y+C*.45;this.dummy.position.set(c+m*L,_,u+d*L),this.dummy.rotation.set(0,f,0),this.dummy.scale.set(D,C,E),this.dummy.updateMatrix(),this.cabinMesh.setMatrixAt(a,this.dummy.matrix),this.cabinMesh.setColorAt(a,p===1?io[g%io.length]:Cg);const w=M*.5+.14+e*.45,R=1+e*.95;this.dummy.position.set(c+m*w,h+.56,u+d*w),this.dummy.rotation.set(0,f,0),this.dummy.scale.set(x*.88,.38*(1+e*.35),.32*R),this.dummy.updateMatrix(),this.headlightMesh.setMatrixAt(a,this.dummy.matrix),this.headlightMesh.setColorAt(a,o);const A=-(M*.5+.12),I=v||e>.42;this.dummy.position.set(c+m*A,h+.58,u+d*A),this.dummy.rotation.set(0,f,0),this.dummy.scale.set(x*.88,I?.44:.26,I?.38:.18),this.dummy.updateMatrix(),this.taillightMesh.setMatrixAt(a,this.dummy.matrix),this.taillightMesh.setColorAt(a,I?r:Dg)}this.bodyMesh.instanceMatrix.needsUpdate=!0,this.cabinMesh.instanceMatrix.needsUpdate=!0,this.headlightMesh.instanceMatrix.needsUpdate=!0,this.taillightMesh.instanceMatrix.needsUpdate=!0,this.bodyMesh.instanceColor&&(this.bodyMesh.instanceColor.needsUpdate=!0),this.cabinMesh.instanceColor&&(this.cabinMesh.instanceColor.needsUpdate=!0),this.headlightMesh.instanceColor&&(this.headlightMesh.instanceColor.needsUpdate=!0),this.taillightMesh.instanceColor&&(this.taillightMesh.instanceColor.needsUpdate=!0)}getLastEmissive(){return this.lastEmissive}}const Fg={none:new J("#ffffff"),res_low:new J("#6FA875"),res_high:new J("#38885C"),com_low:new J("#6098C8"),com_high:new J("#386DA6"),ind:new J("#CFA04E"),office:new J("#4BA4A0")};class Ug{group=new ye;mesh=null;mat=null;availableMesh=null;showAvailableGrid=!1;lastRevision=-1;lastEmissive=0;computeOpacity(){return this.showAvailableGrid?Math.max(.32,.56-this.lastEmissive*.18):Math.max(0,.11*(1-this.lastEmissive*1.15))}setShowAvailableGrid(t){if(this.showAvailableGrid=t,this.availableMesh&&(this.availableMesh.visible=t),this.mat&&this.mesh){const e=this.computeOpacity();this.mat.opacity=e,this.mesh.visible=e>.01}}updateLighting(t){if(this.lastEmissive=t,this.mat&&this.mesh){const e=this.computeOpacity();this.mat.opacity=e,this.mesh.visible=e>.01}}updateFromSnapshot(t,e){if(t.revision===this.lastRevision)return;this.lastRevision=t.revision,this.clear();const n=t.cells,i=Math.floor(n.length/si);if(i===0)return;const o=[],r=[];for(let l=0;l<i;l++){const c=Math.round(n[l*si+4]);n[l*si+5]>=.5||(c>0?o.push(l):r.push(l))}const a=new qt;if(o.length>0){const l=gr-.9,c=new en(l,l);c.rotateX(-Math.PI/2);const h=this.computeOpacity(),u=new he({color:"#ffffff",roughness:.95,metalness:0,transparent:!0,opacity:h,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2});this.mat=u;const f=new se(c,u,o.length);f.receiveShadow=!0,f.renderOrder=2,f.visible=h>.01;for(let p=0;p<o.length;p++){const v=o[p]*si,m=n[v],d=n[v+2],x=n[v+3],y=fo[Math.round(n[v+4])]??"none",M=Math.max(n[v+1],e(m,d))+.14;a.position.set(m,M,d),a.rotation.set(0,x,0),a.scale.set(1,1,1),a.updateMatrix(),f.setMatrixAt(p,a.matrix),f.setColorAt(p,Fg[y])}f.instanceMatrix.needsUpdate=!0,f.instanceColor&&(f.instanceColor.needsUpdate=!0),this.mesh=f,this.group.add(f)}if(r.length>0){const l=gr-1.1,c=new en(l,l);c.rotateX(-Math.PI/2);const h=new Me({color:"#F7F4EC",transparent:!0,opacity:.24,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),u=new se(c,h,r.length);u.renderOrder=1,u.visible=this.showAvailableGrid;for(let f=0;f<r.length;f++){const g=r[f]*si,v=n[g],m=n[g+2],d=n[g+3],x=Math.max(n[g+1],e(v,m))+.12;a.position.set(v,x,m),a.rotation.set(0,d,0),a.scale.set(1,1,1),a.updateMatrix(),u.setMatrixAt(f,a.matrix)}u.instanceMatrix.needsUpdate=!0,this.availableMesh=u,this.group.add(u)}}clear(){this.mesh&&(this.group.remove(this.mesh),this.mesh.geometry.dispose(),this.mesh.material.dispose(),this.mesh=null,this.mat=null),this.availableMesh&&(this.group.remove(this.availableMesh),this.availableMesh.geometry.dispose(),this.availableMesh.material.dispose(),this.availableMesh=null)}}const Ca="tidelight_save_v1_",sh=[{slotId:"autosave",label:"自动存档",isAuto:!0},{slotId:"slot1",label:"存档槽 1",isAuto:!1},{slotId:"slot2",label:"存档槽 2",isAuto:!1},{slotId:"slot3",label:"存档槽 3",isAuto:!1}];function mr(){return sh.map(s=>{const t=oh(s.slotId);return{...s,meta:t?{slotId:t.slotId,label:s.label,isAuto:s.isAuto,savedAt:t.savedAt,population:t.population,money:t.money,simDay:t.simDay,milestoneNameZh:t.milestoneNameZh}:null}})}function oh(s){try{const t=window.localStorage.getItem(Ca+s);if(!t)return null;const e=JSON.parse(t);return!e||e.formatVersion!==1||typeof e.stateJson!="string"?null:e}catch{return null}}function Ng(s,t,e){const n=sh.find(o=>o.slotId===s),i={formatVersion:1,slotId:s,label:n?.label??s,isAuto:n?.isAuto??!1,savedAt:Date.now(),population:t.population,money:t.money,simDay:t.simDay,milestoneNameZh:t.milestoneNameZh,stateJson:e};try{return window.localStorage.setItem(Ca+s,JSON.stringify(i)),{ok:!0}}catch(o){return{ok:!1,reason:o instanceof Error?o.message:"浏览器存储空间不足"}}}function zg(s){try{return window.localStorage.removeItem(Ca+s),!0}catch{return!1}}const vc={small:16,medium:32,large:56,segment:24},Bg=new Map(Object.entries(xc).map(([s,t])=>[t,s]));function Og(s,t,e,n,i,o){const r=i-e,a=o-n,l=r*r+a*a;if(l<1e-6)return Math.hypot(s-e,t-n);const c=Math.max(0,Math.min(1,((s-e)*r+(t-n)*a)/l));return Math.hypot(s-(e+r*c),t-(n+a*c))}class kg{constructor(t,e,n,i,o){this.domElement=t,this.camera=e,this.terrain=n,this.preview=i,this.callbacks=o}tool={kind:"none"};money=12e4;roads=[];nodes=[];zoneCells=[];buildings=[];utilityLines=[];roadStart=null;roadStartSnap="none";roadControl=null;freeformPts=[];isDraggingTool=!1;utilStart=null;lastZonePaintPos=null;lastScreenX=0;lastScreenY=0;lastWorldPt=null;raycaster=new Qc;ndc=new Xt;fallbackPlane=new Tn(new O(0,1,0),-6);tmpVec=new O;getTool(){return this.tool}isToolActive(){return this.tool.kind!=="none"&&this.tool.kind!=="info"}hasActiveStroke(){return this.roadStart!==null||this.utilStart!==null||this.freeformPts.length>0}setTool(t){this.resetStroke(),this.tool=t,this.lastWorldPt&&this.isToolActive()?this.updateHoverVisuals(this.lastWorldPt,this.lastScreenX,this.lastScreenY):(this.preview.clearPreview(),this.hideReadout())}rotatePloppable(t=Math.PI/4){this.tool.kind==="ploppable"&&(this.tool={...this.tool,yaw:(this.tool.yaw+t)%(Math.PI*2)},this.lastWorldPt&&this.updateHoverVisuals(this.lastWorldPt,this.lastScreenX,this.lastScreenY))}resetStroke(){this.roadStart=null,this.roadStartSnap="none",this.roadControl=null,this.freeformPts=[],this.utilStart=null,this.lastZonePaintPos=null,this.isDraggingTool=!1,this.preview.clearPreview(),this.hideReadout()}cancelOrExit(){if(this.hasActiveStroke()){this.resetStroke(),this.lastWorldPt&&this.isToolActive()&&this.updateHoverVisuals(this.lastWorldPt,this.lastScreenX,this.lastScreenY);return}this.isToolActive()?(this.tool={kind:"none"},this.preview.clearPreview(),this.hideReadout(),this.callbacks.onToolCleared()):(this.preview.clearSelection(),this.callbacks.onInspectBuilding(null))}syncSnapshot(t){this.money=t.stats.money,t.roads&&this.unpackRoads(t.roads),t.zones&&this.unpackZones(t.zones),t.buildings&&this.unpackBuildings(t.buildings),t.utilities&&this.unpackUtilities(t.utilities)}unpackRoads(t){const e=[],n=t.segments,i=Math.floor(n.length/xo);for(let l=0;l<i;l++){const c=l*xo,h={p0:{x:n[c+2],z:n[c+3]},c0:{x:n[c+4],z:n[c+5]},c1:{x:n[c+6],z:n[c+7]},p1:{x:n[c+8],z:n[c+9]}},u=la[Math.round(n[c+1])]??"small_2lane";e.push({id:Math.round(n[c]),type:u,bezier:h,lut:hi(h,24),width:n[c+10]||An[u].width})}this.roads=e;const o=[],r=t.nodes,a=Math.floor(r.length/ms);for(let l=0;l<a;l++){const c=l*ms;o.push({id:Math.round(r[c]),x:r[c+1],z:r[c+2]})}this.nodes=o}unpackZones(t){const e=t.cells,n=Math.floor(e.length/si),i=new Array(n);for(let o=0;o<n;o++){const r=o*si;i[o]={x:e[r],y:e[r+1],z:e[r+2],yaw:e[r+3],zone:fo[Math.round(e[r+4])]??"none",occupied:e[r+5]>=.5}}this.zoneCells=i}unpackBuildings(t){const e=t.buildings,n=Math.floor(e.length/_o),i=new Array(n);for(let o=0;o<n;o++){const r=o*_o,a=Math.round(e[r+1]),l=Math.round(e[r+2]);i[o]={id:Math.round(e[r]),kind:a===1?"ploppable":"growable",zone:a===0?fo[l]??"res_low":"none",ploppableKind:a===1?Bg.get(l):void 0,level:Math.max(1,Math.round(e[r+3])),x:e[r+4],y:e[r+5],z:e[r+6],yaw:e[r+7],width:e[r+8],depth:e[r+9],height:e[r+10],progress:e[r+11],problems:Math.round(e[r+12])}}this.buildings=i}unpackUtilities(t){const e=t.lines,n=Math.floor(e.length/Mo),i=new Array(n);for(let o=0;o<n;o++){const r=o*Mo;i[o]={id:Math.round(e[r]),kind:Math.round(e[r+1])===0?"power_line":"water_pipe",x0:e[r+2],z0:e[r+3],x1:e[r+4],z1:e[r+5]}}this.utilityLines=i}raycastWorld(t,e){const n=this.domElement.getBoundingClientRect();if(n.width<=0||n.height<=0)return null;this.ndc.set((t-n.left)/n.width*2-1,-((e-n.top)/n.height)*2+1),this.raycaster.setFromCamera(this.ndc,this.camera);const i=this.terrain.getTerrainMesh();if(i){const r=this.raycaster.intersectObject(i,!1);if(r.length>0)return{x:r[0].point.x,z:r[0].point.z}}const o=this.raycaster.ray.intersectPlane(this.fallbackPlane,this.tmpVec);return o?{x:o.x,z:o.z}:null}projectWorldToScreen(t,e,n){this.tmpVec.set(t,e,n).project(this.camera);const i=this.domElement.getBoundingClientRect(),o=this.tmpVec.z>=-1&&this.tmpVec.z<=1&&this.tmpVec.x>=-1.05&&this.tmpVec.x<=1.05&&this.tmpVec.y>=-1.05&&this.tmpVec.y<=1.05;return{x:i.left+(this.tmpVec.x*.5+.5)*i.width,y:i.top+(-this.tmpVec.y*.5+.5)*i.height,visible:o}}snapRoadPoint(t,e,n){if(n){let i=null,o=15;for(const l of this.nodes){const c=Math.hypot(l.x-t.x,l.z-t.z);c<o&&(o=c,i=l)}if(i)return{point:{x:i.x,z:i.z},kind:"node"};let r=null,a=13;for(const l of this.roads){if(t.x<l.lut.minX-14||t.x>l.lut.maxX+14||t.z<l.lut.minZ-14||t.z>l.lut.maxZ+14)continue;const c=cr(l.lut,t);c.dist<a&&c.s>6&&c.s<l.lut.length-6&&(a=c.dist,r=c.point)}if(r)return{point:r,kind:"segment"};if(e){const l=t.x-e.x,c=t.z-e.z,h=Math.hypot(l,c);if(h>4){const u=Math.atan2(c,l),f=Math.PI/12,p=Math.round(u/f)*f,g=(Math.round(p*180/Math.PI)%360+360)%360;return{point:{x:e.x+Math.cos(p)*h,z:e.z+Math.sin(p)*h},kind:"none",angleDeg:g}}}}return{point:t,kind:"none"}}snapUtilityPoint(t){let e=null,n=18;for(const i of this.utilityLines){const o=Math.hypot(i.x0-t.x,i.z0-t.z);o<n&&(n=o,e={x:i.x0,z:i.z0});const r=Math.hypot(i.x1-t.x,i.z1-t.z);r<n&&(n=r,e={x:i.x1,z:i.z1})}for(const i of this.buildings){if(i.kind!=="ploppable")continue;const o=Math.hypot(i.x-t.x,i.z-t.z);o<n+8&&(n=o,e={x:i.x,z:i.z})}return e??t}pickBuildingAtWorld(t){let e=null,n=1/0;for(const i of this.buildings){const o=t.x-i.x,r=t.z-i.z,a=Math.hypot(i.width,i.depth)*.58+3;if(o*o+r*r>a*a)continue;const l=Math.cos(-i.yaw),c=Math.sin(-i.yaw),h=o*l-r*c,u=o*c+r*l;if(Math.abs(h)<=i.width*.56+2&&Math.abs(u)<=i.depth*.56+2){const f=Math.hypot(o,r);f<n&&(n=f,e=i)}}return e}pickRoadAtWorld(t,e=4){let n=null,i=1/0;for(const o of this.roads){const r=o.width*.5+e;if(t.x<o.lut.minX-r||t.x>o.lut.maxX+r||t.z<o.lut.minZ-r||t.z>o.lut.maxZ+r)continue;const a=cr(o.lut,t);a.dist<=r&&a.dist<i&&(i=a.dist,n=o)}return n}pickUtilityLineAtWorld(t){let e=null,n=11;for(const i of this.utilityLines){const o=Og(t.x,t.z,i.x0,i.z0,i.x1,i.z1);o<n&&(n=o,e=i)}return e}validatePloppable(t,e,n){const i=Ue[t];if(this.money<i.cost)return{valid:!1,reason:`资金不足 (需要 ¥${i.cost.toLocaleString("zh-CN")})`};if(!this.terrain.isInBounds(e,n,24))return{valid:!1,reason:"超出地图边界"};const o=this.terrain.sampleHeight(e,n);if(i.needsWaterEdge){if(!this.terrain.isNearWater(e,n,72))return{valid:!1,reason:"需放置在河岸或海岸附近"};if(o<En-1.2)return{valid:!1,reason:"水深过深，请靠近岸边"}}else if(!this.terrain.isBuildable(e,n,.32))return{valid:!1,reason:"地形过陡或位于水域"};const r=Math.hypot(i.width,i.depth)*.45;for(const a of this.buildings){if(a.kind!=="ploppable")continue;const l=Math.hypot(a.width,a.depth)*.45;if(Math.hypot(a.x-e,a.z-n)<(r+l)*.85)return{valid:!1,reason:"与现有设施重叠"}}return{valid:!0}}handleHover(t,e){if(this.lastScreenX=t,this.lastScreenY=e,!this.isToolActive())return;const n=this.raycastWorld(t,e);n&&(this.lastWorldPt=n,this.updateHoverVisuals(n,t,e))}handleTapSelect(t,e){const n=this.raycastWorld(t,e);if(!n)return;const i=this.pickBuildingAtWorld(n);i?(this.preview.showSelectedBuilding(i.x,i.y,i.z,i.yaw,i.width,i.depth,i.height),this.callbacks.onInspectBuilding(i)):(this.preview.clearSelection(),this.callbacks.onInspectBuilding(null))}handleToolDown(t,e,n){this.lastScreenX=t,this.lastScreenY=e;const i=this.raycastWorld(t,e);if(!i)return;this.lastWorldPt=i,this.isDraggingTool=!0;const o=this.tool;if(o.kind==="road"){if(o.mode==="upgrade"){const r=this.pickRoadAtWorld(i,5);r&&(r.type===o.roadType?this.callbacks.onToast("该路段已是此类型道路","info"):this.callbacks.sendCommand({type:"upgradeRoad",segmentId:r.id,roadType:o.roadType}));return}if(o.mode==="freeform"){const r=this.snapRoadPoint(i,null,o.snap);this.freeformPts=[r.point],this.roadStart=r.point,this.roadStartSnap=r.kind,this.updateHoverVisuals(i,t,e);return}if(o.mode==="straight"){if(this.roadStart){const r=this.snapRoadPoint(i,this.roadStart,o.snap);this.commitRoad(this.roadStart,r.point,void 0,void 0,o.roadType),this.resetStroke(),this.updateHoverVisuals(i,t,e)}else{const r=this.snapRoadPoint(i,null,o.snap);this.roadStart=r.point,this.roadStartSnap=r.kind,this.updateHoverVisuals(i,t,e)}return}if(o.mode==="curve"){if(this.roadStart)if(this.roadControl){const r=this.snapRoadPoint(i,this.roadControl,o.snap),a=lr(this.roadStart,this.roadControl,r.point);this.commitRoad(a.p0,a.p1,a.c0,a.c1,o.roadType),this.resetStroke(),this.updateHoverVisuals(i,t,e)}else{const r=this.snapRoadPoint(i,this.roadStart,o.snap);if(ln(this.roadStart,r.point)<8){this.callbacks.onToast("控制点距起点太近","warn");return}this.roadControl=r.point,this.updateHoverVisuals(i,t,e)}else{const r=this.snapRoadPoint(i,null,o.snap);this.roadStart=r.point,this.roadStartSnap=r.kind,this.updateHoverVisuals(i,t,e)}return}}if(o.kind==="zone"){this.applyZonePaint(i,o.zone,o.brush),this.lastZonePaintPos=i,this.updateHoverVisuals(i,t,e);return}if(o.kind==="ploppable"){const r=this.validatePloppable(o.ploppable,i.x,i.z);if(!r.valid){this.callbacks.onToast(r.reason??"无法在此处放置","warn"),this.updateHoverVisuals(i,t,e);return}this.callbacks.sendCommand({type:"placeBuilding",kind:o.ploppable,x:i.x,z:i.z,yaw:o.yaw});return}if(o.kind==="utility_line"){const r=this.snapUtilityPoint(i);this.utilStart?(this.commitUtilityLine(o.lineKind,this.utilStart,r),this.resetStroke(),this.updateHoverVisuals(i,t,e)):(this.utilStart=r,this.updateHoverVisuals(i,t,e));return}if(o.kind==="bulldoze"){this.commitBulldoze(i);return}}handleToolMove(t,e,n){this.lastScreenX=t,this.lastScreenY=e;const i=this.raycastWorld(t,e);if(!i)return;this.lastWorldPt=i;const o=this.tool;if(o.kind==="zone"&&this.isDraggingTool)(!this.lastZonePaintPos||ln(this.lastZonePaintPos,i)>=6)&&(this.applyZonePaint(i,o.zone,o.brush),this.lastZonePaintPos=i);else if(o.kind==="road"&&o.mode==="freeform"&&this.isDraggingTool&&this.freeformPts.length>0){const r=this.freeformPts[this.freeformPts.length-1];ln(r,i)>=32&&this.freeformPts.push(i)}this.updateHoverVisuals(i,t,e)}handleToolUp(t,e,n,i){this.isDraggingTool=!1;const o=this.raycastWorld(t,e)??this.lastWorldPt;if(!o)return;this.lastWorldPt=o;const r=this.tool;if(r.kind==="road"&&r.mode==="straight"&&this.roadStart&&i){const a=this.snapRoadPoint(o,this.roadStart,r.snap);ln(this.roadStart,a.point)>=10&&(this.commitRoad(this.roadStart,a.point,void 0,void 0,r.roadType),this.resetStroke(),this.updateHoverVisuals(o,t,e))}else if(r.kind==="road"&&r.mode==="freeform"&&this.freeformPts.length>0){const a=this.snapRoadPoint(o,null,r.snap),l=[...this.freeformPts];ln(l[l.length-1],a.point)>=12&&l.push(a.point);const c=this.buildFreeformCurves(l);for(const h of c)this.commitRoad(h.p0,h.p1,h.c0,h.c1,r.roadType);this.resetStroke(),this.updateHoverVisuals(o,t,e)}else if(r.kind==="utility_line"&&this.utilStart&&i){const a=this.snapUtilityPoint(o);ln(this.utilStart,a)>=8&&(this.commitUtilityLine(r.lineKind,this.utilStart,a),this.resetStroke(),this.updateHoverVisuals(o,t,e))}}buildFreeformCurves(t){if(t.length<2)return[];const e=[];for(let n=0;n<t.length-1;n++){const i=t[n],o=t[n+1],r=t[Math.max(0,n-1)],a=t[Math.min(t.length-1,n+2)],l={x:i.x+(o.x-r.x)/6,z:i.z+(o.z-r.z)/6},c={x:o.x-(a.x-i.x)/6,z:o.z-(a.z-i.z)/6};e.push({p0:i,c0:l,c1:c,p1:o})}return e}commitRoad(t,e,n,i,o){if(ln(t,e)<8){this.callbacks.onToast("路段太短（至少 8 米）","warn");return}this.callbacks.sendCommand({type:"buildRoad",p0:t,c0:n,c1:i,p1:e,roadType:o})}commitUtilityLine(t,e,n){if(ln(e,n)<6){this.callbacks.onToast("线路太短","warn");return}this.callbacks.sendCommand({type:"buildUtilityLine",kind:t,x0:e.x,z0:e.z,x1:n.x,z1:n.z})}applyZonePaint(t,e,n){if(n==="segment"){const o=this.pickRoadAtWorld(t,34);o&&this.callbacks.sendCommand({type:"zoneArea",zone:e,area:{shape:"segment",segmentId:o.id}});return}const i=vc[n];this.callbacks.sendCommand({type:"zoneArea",zone:e,area:{shape:"circle",x:t.x,z:t.z,radius:i}})}commitBulldoze(t){const e=this.pickBuildingAtWorld(t);if(e){this.callbacks.sendCommand({type:"bulldozeBuilding",buildingId:e.id}),this.preview.clearPreview();return}const n=this.pickRoadAtWorld(t,4);if(n){this.callbacks.sendCommand({type:"bulldozeRoad",segmentId:n.id}),this.preview.clearPreview();return}const i=this.pickUtilityLineAtWorld(t);i&&(this.callbacks.sendCommand({type:"bulldozeUtilityLine",lineId:i.id}),this.preview.clearPreview())}showDemoRoadPreview(t,e,n){if(this.tool.kind!=="road")return;const i=An[this.tool.roadType],o=n?lr(t,n,e):ar(t,e),r=hi(o,28),a=Math.round(r.length),l=Math.round(r.length*i.costPerMeter),c=(u,f)=>this.terrain.sampleHeight(u,f);this.preview.showRoadPreview([o],i.width,!0,c,{startSnap:"node",endSnap:"none",controlPoint:n});const h=this.projectWorldToScreen(e.x,c(e.x,e.z)+4,e.z);this.callbacks.onReadout({visible:!0,screenX:h.x,screenY:h.y,title:`${i.labelZh} · ${a} m`,costText:`¥${l.toLocaleString("zh-CN")}`,snapBadge:n?"曲线模式 · 节点吸附":"节点吸附",valid:this.money>=l,hint:"点击确认修建 · 右键取消"})}updateHoverVisuals(t,e,n){const i=(r,a)=>this.terrain.sampleHeight(r,a),o=this.tool;if(o.kind==="road"){const r=An[o.roadType];if(o.mode==="upgrade"){const m=this.pickRoadAtWorld(t,5);if(m){const d=m.type===o.roadType,x=An[m.type].costPerMeter,y=r.costPerMeter,M=Math.max(Math.round(m.lut.length*10),Math.round(m.lut.length*(y-x*.5))),D=!d&&this.money>=M;this.preview.showRoadPreview([m.bezier],r.width,D,i,{highlightOnly:!0}),this.callbacks.onReadout({visible:!0,screenX:e,screenY:n,title:d?`已是${r.labelZh}`:`升级为 ${r.labelZh}`,costText:d?void 0:`¥${M.toLocaleString("zh-CN")}`,valid:D,hint:d?void 0:"点击路段升级"})}else this.preview.clearPreview(),this.callbacks.onReadout({visible:!0,screenX:e,screenY:n,title:`升级道路 → ${r.labelZh}`,valid:!0,hint:"点击已有路段进行升级"});return}if(o.mode==="freeform"){if(this.freeformPts.length>0){const m=this.snapRoadPoint(t,null,o.snap),d=[...this.freeformPts,m.point],x=this.buildFreeformCurves(d);let y=0;for(const C of x)y+=hi(C,16).length;const M=Math.round(y*r.costPerMeter),D=y>=8&&this.money>=M;this.preview.showRoadPreview(x,r.width,D,i,{startSnap:this.roadStartSnap,endSnap:m.kind}),this.callbacks.onReadout({visible:!0,screenX:e,screenY:n,title:`${r.labelZh} · ${Math.round(y)} m`,costText:`¥${M.toLocaleString("zh-CN")}`,snapBadge:"自由曲线",valid:D,hint:"松开修建道路"})}else{const m=this.snapRoadPoint(t,null,o.snap);this.preview.showRoadAnchor(m.point,m.kind,r.width,i),this.callbacks.onReadout({visible:!0,screenX:e,screenY:n,title:`${r.labelZh} · 自由绘制`,snapBadge:m.kind==="node"?"吸附节点":m.kind==="segment"?"吸附路口":void 0,valid:!0,hint:"按住拖动自由绘制道路"})}return}if(!this.roadStart){const m=this.snapRoadPoint(t,null,o.snap);this.preview.showRoadAnchor(m.point,m.kind,r.width,i),this.callbacks.onReadout({visible:!0,screenX:e,screenY:n,title:`${r.labelZh}`,costText:`¥${r.costPerMeter}/m`,snapBadge:m.kind==="node"?"已吸附节点":m.kind==="segment"?"T型路口吸附":void 0,valid:!0,hint:o.mode==="curve"?"点击设置起点 (第 1/3 步)":"点击或拖动设置起点"});return}if(o.mode==="curve"&&!this.roadControl){const m=this.snapRoadPoint(t,this.roadStart,o.snap),d=ar(this.roadStart,m.point),x=ln(this.roadStart,m.point);this.preview.showRoadPreview([d],r.width*.7,x>=8,i,{startSnap:this.roadStartSnap,endSnap:m.kind}),this.callbacks.onReadout({visible:!0,screenX:e,screenY:n,title:`弯道控制点 · ${Math.round(x)} m`,snapBadge:m.angleDeg!==void 0?`角度 ${m.angleDeg}°`:void 0,valid:x>=8,hint:"点击设置弯曲方向 (第 2/3 步) · 右键取消"});return}const a=o.mode==="curve"&&this.roadControl?this.roadControl:this.roadStart,l=this.snapRoadPoint(t,a,o.snap),c=o.mode==="curve"&&this.roadControl?lr(this.roadStart,this.roadControl,l.point):ar(this.roadStart,l.point),u=hi(c,28).length,f=Math.round(u*r.costPerMeter),p=this.terrain.isInBounds(l.point.x,l.point.z,18),g=u>=8&&p&&this.money>=f;this.preview.showRoadPreview([c],r.width,g,i,{startSnap:this.roadStartSnap,endSnap:l.kind,controlPoint:this.roadControl??void 0});const v=l.kind==="node"?"吸附节点":l.kind==="segment"?"T型路口":l.angleDeg!==void 0?`角度 ${l.angleDeg}°`:void 0;this.callbacks.onReadout({visible:!0,screenX:e,screenY:n,title:`${r.labelZh} · ${Math.round(u)} m`,costText:`¥${f.toLocaleString("zh-CN")}`,snapBadge:v,valid:g,hint:p?u<8?"长度需至少 8 m":this.money<f?"资金不足":"点击确认 · 右键/Esc 取消":"超出地图边界"});return}if(o.kind==="zone"){const r=vc[o.brush],a=[];if(o.brush==="segment"){const c=this.pickRoadAtWorld(t,34);if(c){const h=c.width*.5+36;for(const u of this.zoneCells){if(u.x<c.lut.minX-h||u.x>c.lut.maxX+h||u.z<c.lut.minZ-h||u.z>c.lut.maxZ+h)continue;cr(c.lut,{x:u.x,z:u.z}).dist<=h&&a.push(u)}}}else{const c=r*r;for(const h of this.zoneCells){const u=h.x-t.x,f=h.z-t.z;u*u+f*f<=c&&a.push(h)}}this.preview.showZoneBrushPreview(t,r,o.zone,a,i,o.brush!=="segment");const l=o.zone==="none"?"取消分区":zi[o.zone].labelZh;this.callbacks.onReadout({visible:!0,screenX:e,screenY:n,title:`${l} · ${a.length} 格`,valid:a.length>0,hint:a.length>0?"点击或拖动涂抹规划":"请移至道路旁的可规划格"});return}if(o.kind==="ploppable"){const r=Ue[o.ploppable],a=this.validatePloppable(o.ploppable,t.x,t.z);this.preview.showPloppableGhost(t.x,t.z,o.yaw,r.width,r.depth,r.height,r.coverageRadius,a.valid,i),this.callbacks.onReadout({visible:!0,screenX:e,screenY:n,title:r.labelZh,costText:`¥${r.cost.toLocaleString("zh-CN")}`,valid:a.valid,hint:a.valid?"点击放置 · R 键旋转方向":a.reason});return}if(o.kind==="utility_line"){const r=this.snapUtilityPoint(t),a=o.lineKind==="power_line"?"输电线":"供水管道",l=o.lineKind==="power_line"?6:8;if(!this.utilStart)this.preview.showUtilityLinePreview(o.lineKind,r,null,!0,i),this.callbacks.onReadout({visible:!0,screenX:e,screenY:n,title:a,costText:`¥${l}/m`,valid:!0,hint:"点击或拖动铺设线路"});else{const c=ln(this.utilStart,r),h=Math.max(40,Math.round(c*l)),u=c>=6&&this.money>=h;this.preview.showUtilityLinePreview(o.lineKind,this.utilStart,r,u,i),this.callbacks.onReadout({visible:!0,screenX:e,screenY:n,title:`${a} · ${Math.round(c)} m`,costText:`¥${h.toLocaleString("zh-CN")}`,valid:u,hint:c<6?"距离太短":this.money<h?"资金不足":"松开或点击确认"})}return}if(o.kind==="bulldoze"){const r=this.pickBuildingAtWorld(t);if(r){this.preview.showBulldozeBox(r.x,r.y,r.z,r.yaw,r.width,r.depth,r.height);const c=r.kind==="ploppable"&&r.ploppableKind?Ue[r.ploppableKind].labelZh:r.zone!=="none"?`${zi[r.zone].labelZh} Lv.${r.level}`:"建筑",h=r.kind==="ploppable"&&r.ploppableKind?Math.round(Ue[r.ploppableKind].cost*.5):0;this.callbacks.onReadout({visible:!0,screenX:e,screenY:n,title:`拆除 ${c}`,costText:h>0?`+¥${h.toLocaleString("zh-CN")}`:void 0,valid:!1,hint:"点击拆除"});return}const a=this.pickRoadAtWorld(t,4);if(a){const c=An[a.type],h=Math.round(a.lut.length*c.costPerMeter*.5);this.preview.showRoadPreview([a.bezier],a.width+1,!1,i,{highlightOnly:!0}),this.callbacks.onReadout({visible:!0,screenX:e,screenY:n,title:`拆除 ${c.labelZh}`,costText:`+¥${h.toLocaleString("zh-CN")}`,valid:!1,hint:"点击拆除路段"});return}const l=this.pickUtilityLineAtWorld(t);if(l){const c=Math.hypot(l.x1-l.x0,l.z1-l.z0),h=l.kind==="power_line"?6:8,u=Math.max(20,Math.round(c*h*.5));this.preview.showUtilityLinePreview(l.kind,{x:l.x0,z:l.z0},{x:l.x1,z:l.z1},!1,i),this.callbacks.onReadout({visible:!0,screenX:e,screenY:n,title:`拆除 ${l.kind==="power_line"?"输电线":"供水管道"}`,costText:`+¥${u.toLocaleString("zh-CN")}`,valid:!1,hint:"点击拆除线路"});return}this.preview.clearPreview(),this.callbacks.onReadout({visible:!0,screenX:e,screenY:n,title:"拆除工具",valid:!0,hint:"点击建筑、道路或管线拆除"})}}hideReadout(){this.callbacks.onReadout({visible:!1,screenX:0,screenY:0,title:"",valid:!0})}}const Hg=new Set(["none","traffic","landvalue","pollution","noise","power","water","services","happiness"]),Gg=new Set(["road","zone","utility","service","park","bulldoze","info"]);function Vg(){const s=new URLSearchParams(window.location.search),t=s.get("demo"),e=t==="1"||t==="true",n=Number(s.get("seed")),i=Number.isFinite(n)&&n>0?Math.floor(n):202604,o=(s.get("time")??"").toLowerCase();let r=10.5,a=!1;o==="day"?(r=10.5,a=!0):o==="dusk"?(r=18.2,a=!0):o==="night"?(r=22.5,a=!0):o==="dawn"?(r=6.5,a=!0):o!==""&&Number.isFinite(Number(o))&&(r=(Number(o)%24+24)%24,a=!0);const l=(s.get("overlay")??"none").toLowerCase(),c=Hg.has(l)?l:"none",h=(s.get("cam")??"").toLowerCase();let u;h==="street"?u="street":h==="overview"?u="overview":h==="newcity"?u="newcity":u=e?"overview":"newcity";const f=(s.get("renderer")??"webgl").toLowerCase(),p="webgl",g=Z0(s),v=(s.get("tool")??"").toLowerCase();let m=null;v==="budget"?m="budget":Gg.has(v)&&(m=v);const d=s.get("preview")==="1"||s.get("preview")==="true";return{demo:e,seed:i,timeOfDay:r,lockTime:a,overlay:c,cam:u,rendererMode:p,qualityLevel:g.level,initialTool:m,previewRoad:d}}function Wg(s){const t=[];for(const e of Object.values(An))e.milestoneTier===s&&t.push(e.labelZh);for(const e of Object.values(zi))e.milestoneTier===s&&t.push(e.labelZh);for(const e of Object.values(Ue))e.milestoneTier===s&&t.push(e.labelZh);return t.length>0?`已解锁：${t.join("、")}`:""}function Xg(){const s=document.getElementById("app");if(!s)throw new Error("Missing #app container");const t=Vg();let e=oc(t.qualityLevel);const n=new ng(s,e),i=n.renderer.domElement,o=(s.clientWidth||window.innerWidth)/Math.max(1,s.clientHeight||window.innerHeight),r=new p0(i,o);r.applyPreset(t.cam);const a=new Tg,l=new Ug,c=new ag,h=new F0,u=new Ig,f=new Y0;a.setQuality(e),h.setQuality(e),c.setSharedTextures(h.getSharedTextures()),n.scene.add(a.group,l.group,c.group,h.group,u.group,f.group);let p=n.applyTimeOfDay(t.timeOfDay);const g=()=>{a.syncEnvironment({horizonColor:p.horizon,zenithColor:p.zenith,sunDir:p.sunDir,sunColor:p.sunColor,fogColor:n.fog.color,fogNear:n.fog.near,fogFar:n.fog.far,emissiveStrength:p.emissiveStrength})},v=new Worker(new URL("/tidelight-city/assets/worker-CR-Lgpq0.js",import.meta.url),{type:"module"}),m=Y=>v.postMessage(Y);let d=1;const x=new Map,y=new Map;let M=!1,D="none",C=null,E=null,L=!1,S=0,_=!1,w=!1;const R=(Y,U)=>{const X=d++;(Y.type==="buildRoad"||Y.type==="upgradeRoad"||Y.type==="bulldozeRoad"||Y.type==="zoneArea"||Y.type==="placeBuilding"||Y.type==="buildUtilityLine"||Y.type==="bulldozeUtilityLine"||Y.type==="bulldozeBuilding")&&(_=!0),y.set(X,($,N)=>{!$&&N&&K.showToast(N,"warn"),U?.($,N)}),m({type:"command",cmd:Y,requestId:X})},A=Y=>{E=Y;const U=d++;m({type:"inspectBuilding",buildingId:Y,requestId:U})},I=()=>new Promise(Y=>{const U=d++;x.set(U,Y),m({type:"serialize",requestId:U})}),z=async(Y,U=!1)=>{if(!C)return;const X=await I(),$=Ng(Y,{population:C.stats.population,money:C.stats.money,simDay:C.simDay,milestoneNameZh:C.stats.milestoneNameZh},X);K.setSaveSlots(mr()),U||($.ok?K.showToast(Y==="autosave"?"自动存档完成":"城市存档已保存","success"):K.showToast(`保存失败：${$.reason??"未知错误"}`,"warn"))},W=Y=>{const U=oh(Y);if(!U){K.showToast("该存档槽为空或已损坏","warn");return}const X=d++;y.set(X,($,N)=>{$?(L=!1,E=null,f.clearSelection(),K.setInspectedBuilding(null),K.setSaveOpen(!1),K.showToast(`已读取 ${U.label}`,"success",`第 ${U.simDay} 天 · ${U.population} 人`)):K.showToast(`读取失败：${N??"存档格式不兼容"}`,"warn")}),m({type:"deserialize",json:U.stateJson,requestId:X})},Q=Y=>{L=!1,_=!1,E=null,f.clearSelection(),K.setInspectedBuilding(null),K.clearTool(),r.applyPreset(Y?"overview":"newcity"),m({type:"init",seed:t.seed,demo:Y,timeOfDay:10.5,lockTime:t.lockTime,overlay:"none"}),K.showToast(Y?"已载入汐光市示例小镇":"已创建空白海湾新城，从北方高速开始建造吧！","info")},k=Y=>{if(e=oc(Y),n.setQuality(e),a.setQuality(e),h.setQuality(e),M){const U=[...c.getExclusionPoints(),...h.getExclusionPoints()];a.buildTrees(U)}ct.quality=e.level,K.setQualityLevel(e.level)},K=new k0(s,{onSpeedChange:Y=>{m({type:"setSpeed",speed:Y})},onOverlayChange:Y=>{m({type:"setOverlay",overlay:Y})},onCameraPreset:Y=>{r.applyPreset(Y)},onToolChange:(Y,U)=>{q.setTool(Y),l.setShowAvailableGrid(Y.kind==="zone");const X=Y.kind==="utility_line"&&Y.lineKind==="water_pipe"||Y.kind==="ploppable"&&(Y.ploppable==="water_pump"||Y.ploppable==="water_tower"||Y.ploppable==="sewage_outlet");c.setForceShowPipes(X),i.style.cursor=Y.kind==="none"||Y.kind==="info"?"grab":"crosshair"},onRotatePloppable:()=>{q.rotatePloppable(Math.PI/4);const Y=q.getTool();Y.kind==="ploppable"&&K.setPloppableYaw(Y.yaw)},onSetTaxRate:(Y,U)=>{R({type:"setTaxRate",zone:Y,rate:U})},onSetBudget:(Y,U)=>{R({type:"setBudget",category:Y,percent:U})},onSaveSlot:Y=>{z(Y,!1)},onLoadSlot:Y=>{W(Y)},onDeleteSlot:Y=>{zg(Y),K.setSaveSlots(mr()),K.showToast("已删除存档","info")},onNewCity:Y=>{Q(Y)},onBulldozeBuilding:Y=>{R({type:"bulldozeBuilding",buildingId:Y},U=>{U&&(E=null,f.clearSelection(),K.setInspectedBuilding(null))})},onCloseInspect:()=>{E=null,f.clearSelection(),K.setInspectedBuilding(null)},onPickBuilding:Y=>{const U=q.buildings.find(X=>X.id===Y);U&&(f.showSelectedBuilding(U.x,U.y,U.z,U.yaw,U.width,U.depth,U.height),A(Y))},onQualityChange:Y=>{k(Y),K.showToast(`已切换至${Y==="high"?"精致(高)":Y==="medium"?"均衡(中)":"流畅(低)"}画质`,"info")}});K.setSaveSlots(mr()),K.setQualityLevel(e.level);const q=new kg(i,r.camera,a,f,{sendCommand:Y=>R(Y),onReadout:Y=>K.updateReadout(Y),onToolCleared:()=>{K.clearTool(),l.setShowAvailableGrid(!1),c.setForceShowPipes(!1),i.style.cursor="grab"},onInspectBuilding:Y=>{Y?A(Y.id):(E=null,K.setInspectedBuilding(null))},onToast:(Y,U)=>K.showToast(Y,U)});i.style.cursor="grab",r.setHooks({isToolActive:()=>q.isToolActive(),onHover:(Y,U)=>q.handleHover(Y,U),onToolDown:(Y,U,X)=>q.handleToolDown(Y,U,X),onToolMove:(Y,U,X)=>q.handleToolMove(Y,U,X),onToolUp:(Y,U,X,$)=>q.handleToolUp(Y,U,X,$),onToolCancel:()=>q.resetStroke(),onTapSelect:(Y,U)=>q.handleTapSelect(Y,U),onLongPress:(Y,U)=>q.handleTapSelect(Y,U),onRightClick:()=>q.cancelOrExit(),onKeyDown:Y=>{if(Y.code==="Escape")K.setBudgetOpen(!1),K.setSaveOpen(!1),K.setAboutOpen(!1),q.cancelOrExit();else if(Y.code==="KeyR"){q.rotatePloppable(Y.shiftKey?Math.PI/12:Math.PI/4);const U=q.getTool();U.kind==="ploppable"&&K.setPloppableYaw(U.yaw)}}});const ct={ready:!1,renderer:t.rendererMode,quality:e.level,postProcess:n.isPostProcessActive(),tick:0,population:0,buildingCount:0,vehicleCount:0,selectCategory:Y=>K.selectCategory(Y),setRoadOptions:(Y,U,X)=>K.setRoadOptions(Y,U,X),showDemoRoadPreview:(Y,U,X)=>q.showDemoRoadPreview(Y,U,X),openBudget:(Y=!0)=>K.setBudgetOpen(Y),openSave:(Y=!0)=>K.setSaveOpen(Y),openAbout:(Y=!0)=>K.setAboutOpen(Y),sendCommand:Y=>R(Y),getStats:()=>C?.stats??null};window.__TIDELIGHT__=ct,v.onmessage=Y=>{const U=Y.data;if(U.type==="ready"){a.init(U.terrain),g(),M=!0;return}if(U.type==="commandResult"){if(U.requestId!==void 0){const X=y.get(U.requestId);X&&(y.delete(U.requestId),X(U.result.ok,U.result.reason))}return}if(U.type==="buildingDetail"){U.detail&&U.detail.id===E?K.setInspectedBuilding(U.detail):!U.detail&&E!==null&&(E=null,f.clearSelection(),K.setInspectedBuilding(null));return}if(U.type==="serialized"){const X=x.get(U.requestId);X&&(x.delete(U.requestId),X(U.json));return}if(U.type==="snapshot"){const X=U.snapshot;C=X,p=n.applyTimeOfDay(X.timeOfDay),g(),c.updateLighting(p.emissiveStrength,0),l.updateLighting(p.emissiveStrength);const $=(st,rt)=>a.sampleHeight(st,rt);let N=!1;if(X.roads&&c.updateRoads(X.roads,$)&&(N=!0),X.utilities&&c.updateUtilities(X.utilities,$),X.zones&&l.updateFromSnapshot(X.zones,$),X.buildings&&h.updateFromSnapshot(X.buildings)&&(N=!0),M&&N){const st=[...c.getExclusionPoints(),...h.getExclusionPoints()];a.buildTrees(st)}if(X.overlayField?(a.applyOverlay(X.overlayType,X.overlayField),D=X.overlayType):X.overlayType!==D&&((X.overlayType==="none"||X.overlayType==="traffic")&&a.applyOverlay(X.overlayType,void 0),D=X.overlayType),c.updateTrafficOverlay(X.overlayType,X.roadCongestion),u.updateFromSnapshot(X.vehicles,p.emissiveStrength),q.syncSnapshot(X),!L)L=!0,S=X.stats.milestoneTier;else if(X.stats.milestoneTier>S){S=X.stats.milestoneTier;const st=ca.find(rt=>rt.tier===S);if(st){const rt=Wg(st.tier);K.showToast(`里程碑达成：${st.nameZh}！奖励 ¥${st.bonusMoney.toLocaleString("zh-CN")}`,"milestone",rt)}}K.update(X,p.isNight),ct.ready=M,ct.tick=X.tick,ct.population=X.stats.population,ct.buildingCount=X.stats.buildingCount,ct.vehicleCount=X.stats.vehicleCount,M&&!w&&t.initialTool&&(w=!0,t.initialTool==="budget"?K.setBudgetOpen(!0):(K.selectCategory(t.initialTool),t.initialTool==="road"&&t.previewRoad&&(K.setRoadOptions(t.demo?"tree_2lane":"small_2lane","curve",!0),t.demo?q.showDemoRoadPreview({x:25,z:20},{x:-52,z:-78},{x:-56,z:14}):q.showDemoRoadPreview({x:240,z:-240},{x:130,z:-40},{x:240,z:-90}))))}},v.onerror=Y=>{console.error("Simulation worker error:",Y.message)},m({type:"init",seed:t.seed,demo:t.demo,timeOfDay:t.timeOfDay,lockTime:t.lockTime,overlay:t.overlay}),window.addEventListener("resize",()=>{n.resize(r.camera)}),setInterval(()=>{E!==null&&A(E)},1100),setInterval(()=>{M&&C&&_&&z("autosave",!0)},6e4);let xt=0;n.startLoop(Y=>{if(r.update(Y),n.updateCameraVisuals(r.target,r.distance,r.pitch),a.update(Y,p.emissiveStrength),h.update(Y,p.emissiveStrength),c.updateLighting(p.emissiveStrength,Y),xt+=Y,xt>=.08){xt=0;const U=[],X=r.camera.position,N=q.isToolActive()?210:96,st=[];for(let ht=0;ht<q.buildings.length;ht++){const at=q.buildings[ht];if(at.problems===0)continue;const lt=q.projectWorldToScreen(at.x,at.y+at.height+3.5,at.z);if(!lt.visible||lt.y<72||lt.y>window.innerHeight-N||lt.x<18||lt.x>window.innerWidth-18)continue;const F=at.x-X.x,wt=at.z-X.z,pt=(at.problems&1031)!==0?0:1;st.push({id:at.id,sx:lt.x,sy:lt.y,flags:at.problems,priority:pt,d2:F*F+wt*wt})}st.sort((ht,at)=>ht.priority!==at.priority?ht.priority-at.priority:ht.d2-at.d2);const rt=window.innerWidth<=640?6:8,ft=2116;for(let ht=0;ht<st.length&&U.length<rt;ht++){const at=st[ht];let lt=!1;for(let F=0;F<U.length;F++){const wt=U[F],pt=at.sx-wt.screenX,yt=at.sy-wt.screenY;if(pt*pt+yt*yt<ft){lt=!0;break}}lt||U.push({buildingId:at.id,screenX:at.sx,screenY:at.sy,flags:at.flags})}K.updateProblemMarkers(U)}},r.camera)}Xg();
