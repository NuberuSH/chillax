(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const c=a=>new Promise(n=>setTimeout(n,a));async function g(){const a=document.getElementById("landingpage-main"),n=document.getElementById("curtain"),r=["backgroundImage1.jpg","backgroundImage2.jpg","backgroundImage3.jpg","backgroundImage4.webp","backgroundImage5.jpg","gbackgroundImage6.jpg","backgroundImage7.jpg","backgroundImage8.jpg","backgroundImage9.webp","backgroundImage10.jpg","backgroundImage11.jpg"];let o=Math.floor(Math.random()*r.length);for(;;)a.style.backgroundImage=`url("${r[o]}")`,n.style.opacity=0,o=o<r.length-1?o+1:0,await c(8e3),n.style.opacity=1,await c(1200)}await g();
