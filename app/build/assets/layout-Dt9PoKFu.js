import{a as s,r as a,j as o,O as c}from"./index-C0dVWJZn.js";const m=t=>async i=>{let n;await new Promise(u=>{n=s.subscribe(e=>e.ready,e=>e&&u(null),{fireImmediately:!0})}),n();const r=s.getState();if(!r.signedIn)throw a("/signin");return(t==null?void 0:t(r,i))||null},h=m(),l=()=>o.jsx(c,{});export{l as Component,h as loader};