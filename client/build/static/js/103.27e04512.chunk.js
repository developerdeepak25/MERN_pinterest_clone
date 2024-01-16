"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[103],{943:(e,s,a)=>{a.d(s,{Z:()=>i});var t=a(791),l=a(184);const c=e=>{let{height:s=350}=e;return(0,l.jsx)("div",{className:"  w-full shimmer-bg",style:{height:s+"px"}})},i=e=>{let{src:s,height:a,alt:i,className:n,fileName:o}=e;const[r,d]=(0,t.useState)(!0);return(0,t.useEffect)((()=>{console.log(r)}),[r]),(0,l.jsxs)("div",{children:[r&&(0,l.jsx)(c,{height:a}),o&&s&&(0,l.jsx)("img",{src:s,alt:i,onLoad:()=>{d(!1)},className:"".concat(n,"  ").concat(r?"h-0":"h-auto")})]})}},103:(e,s,a)=>{a.r(s),a.d(s,{default:()=>x});var t=a(294),l=a(791),c=a(689),i=a(184);const n=e=>{let{height:s}=e;return(0,i.jsx)("svg",{height:s,viewBox:"0 0 512 512",id:"left-arrow",children:(0,i.jsx)("path",{d:"M189.3 128.4L89 233.4c-6 5.8-9 13.7-9 22.4s3 16.5 9 22.4l100.3 105.4c11.9 12.5 31.3 12.5 43.2 0 11.9-12.5 11.9-32.7 0-45.2L184.4 288h217c16.9 0 30.6-14.3 30.6-32s-13.7-32-30.6-32h-217l48.2-50.4c11.9-12.5 11.9-32.7 0-45.2-12-12.5-31.3-12.5-43.3 0z"})})};var o=a(402),r=a(420);const d=e=>{let{pinId:s,savedBy:a}=e;const{userId:c}=(0,r.v9)((e=>e.Auth)),[n,d]=(0,l.useState)(!1),[m,u]=(0,l.useState)(!1);console.log(n);return(0,l.useEffect)((()=>{d(a&&a.includes(c))}),[a,c]),(0,i.jsx)(i.Fragment,{children:(0,i.jsx)("div",{className:"pin-prime-btn ".concat(n&&"saved"," ").concat(m?"waiting":""),children:(0,i.jsx)("button",{onClick:async()=>{try{if(u(!0),n){const e=await t.Z.get("/image/unsavepost/".concat(s));return console.log("\ud83d\ude80 ~ file: SaveButton.js:9 ~ onClickHandler ~ resData:",e),void(200===e.status&&(d(!1),o.ZP.success("post unsaved successfully")))}const e=await t.Z.get("/image/savepost/".concat(s));console.log("\ud83d\ude80 ~ file: SaveButton.js:9 ~ onClickHandler ~ resData:",e),200===e.status&&(d(!0),o.ZP.success("post saved successfully"))}catch(e){console.log(e)}finally{u(!1)}},children:n?"saved":"save"})})})};var m=a(943),u=a(687);const x=()=>{const[e,s]=(0,l.useState)({}),{image:o,user:r,imageTitle:x,imageDescirption:h,saves:v}=e,p=(0,c.s0)(),{id:f}=(0,c.UO)();console.log(f);return(0,l.useEffect)((()=>{(async()=>{try{const e=await t.Z.get("/image/getpostdata/".concat(f));console.log("\ud83d\ude80 ~ file: Home.js:10 ~ getDataFromServer ~ resData:",e);const{postData:a}=e.data;console.log(a),s(a)}catch(e){console.log(e)}})()}),[f]),(0,i.jsx)("div",{className:"single-pin-container minus-nav-100vh bg-slate-50",children:(0,i.jsxs)("div",{className:"flex min-h-full justify-center relative ",children:[(0,i.jsx)("div",{className:"absolute go-back top-7 left-7 max-sm:hidden",children:(0,i.jsx)("button",{className:"left-arrow rounded-full hover:bg-gray-200 p-2  transition",onClick:()=>{p(-1)},children:(0,i.jsx)(n,{height:28})})}),(0,i.jsxs)("div",{className:"pin-viewer rounded-3xl overflow-hidden bg-white  max-w-5xl flex my-14  max-sm:rounded-none max-sm:my-0 max-sm:pb-24 max-sm:flex-col max-sm:px-2 max-sm:w-full",children:[(0,i.jsx)("div",{className:"visual-pin-container w-[512px] max-sm:w-auto ",children:(0,i.jsx)(m.Z,{className:"w-full",src:"/uploads/".concat(o),fileName:o,alt:"post_image",height:500})}),(0,i.jsxs)("div",{className:" w-[512px] desc-container px-9 max-sm:w-auto max-sm:px-2",children:[(0,i.jsx)("div",{className:"desc-container-header pt-9 pb-5 flex justify-end max-sm:pt-5 max-sm:justify-start",children:(0,i.jsx)(d,{pinId:f,savedBy:v})}),(0,i.jsxs)("div",{className:"desc-body flex flex-col gap-8 max-sm:gap-3",children:[(0,i.jsx)("h1",{className:" capitalize text-4xl font-semibold max-sm:text-3xl",children:x})," ",(0,i.jsx)("p",{className:" text-xl max-sm:text-base",children:h}),(0,i.jsxs)("div",{className:"creator-profile flex  w-full items-center mt-auto gap-2",children:[(0,i.jsx)("div",{className:"creator-image rounded-full w-9 aspect-square overflow-hidden opacity-80 shrink-0",children:null!==r&&void 0!==r&&r.userPic?(0,i.jsx)(u.Z,{src:"/pic_uploads/".concat(r.userPic),alt:r.username}):(0,i.jsx)(u.Z,{src:a(36),alt:null===r||void 0===r?void 0:r.username,className:"w-full"})}),(0,i.jsx)("div",{className:"creator-name font-medium  opacity-80  capitalize whitespace-nowrap overflow-hidden text-ellipsis",children:null===r||void 0===r?void 0:r.username})]})]})]})]})]})})}}}]);
//# sourceMappingURL=103.27e04512.chunk.js.map