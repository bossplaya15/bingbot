// ==UserScript==
// @name         BingBot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Bot for Bing
// @author       Elena Ryskova
// @match        https://www.bing.com/*
// @match        https://napli.ru/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let keywords = ["10 популярных шрифтов от Google", "Отключение редакций и ревизий", "Вывод произвольных типов записей и полей в WordPress", "Взаимодействие PHP и MySQL. Подключение к базе данных MySQL", "Плагины VS Сode", "DevTools",];
let keyword = keywords[getRandom(0, keywords.length)];
//let keyword = "Плагины в цирке";
let btn = document.getElementById("search_icon");
let links = document.links;
let bingInput = document.getElementById("sb_form_q");
let nextp = document.getElementsByClassName("sb_pagN sb_pagN_bp b_widePag sb_bp ")[0];

if (btn !== null) {
    let i = 0;
  let timerId = setInterval(()=> {
    bingInput.value += keyword[i];
    i++;
    if (i == keyword.length) {
      clearInterval(timerId);
      setTimeout(()=>{
        btn.click();
      }, getRandom(200, 500));
    }
  }, 500);


} else if (location.hostname == "napli.ru") {
	setInterval(() => {
		let index = getRandom(0, links.length);
		if (getRandom(0, 101) >= 80) {
			location.href = "https://www.bing.com/";
		}
		if (links.length == 0) {
			location.href = "https://napli.ru";
		}
		if (links[index].href.indexOf("napli.ru") !== -1) {
			links[index].click();
		}
	}, getRandom(3000, 5000));
	console.log("Мы на целевом сайте");

}else {
   let nextBingPage = true;
  for (let i = 0; i < links.length; i++) {
    if (links[i].href.indexOf("napli.ru") !== -1) {
      let link = links[i];
      nextBingPage = false;
      console.log("Нашел строку " + link);
      setTimeout(()=>{
        link.click();
      }, getRandom(1500, 4000));
      break;
    }
  }
  if (document.getElementsByClassName("sb_pagS sb_pagS_bp b_widePag sb_bp")[0].innerHTML == "5") {
  nextBingPage = false;
  location.href = "https://www.bing.com/";
  }
    if (nextBingPage) {
      setTimeout(()=>{
      nextp.click();
    }, getRandom(2000, 5000));
  }
}

function getRandom(min, max) {
  return Math.floor(Math.random()*(max - min) + min);
}
