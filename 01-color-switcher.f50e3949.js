!function(){var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]");console.log(t),console.log(e);var n=null;t.addEventListener("click",(function(){n=setInterval((function(){document.body.style.background="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3),t.setAttribute("disabled",!0)})),e.addEventListener("click",(function(){clearInterval(n),t.removeAttribute("disabled")}))}();
//# sourceMappingURL=01-color-switcher.f50e3949.js.map
