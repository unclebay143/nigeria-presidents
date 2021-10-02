var head = document.getElementById('head');
var pimg = document.getElementById('pimg');
var moreinfo = document.getElementById('moreinfo');

var text = localStorage.getItem('name');
var imgsrc = localStorage.getItem('imgsrc');
var info = localStorage.getItem('info');

// localStorage.removeItem('name');
// localStorage.removeItem('imgsrc');
// localStorage.removeItem('info');

head.innerHTML = text;
pimg.setAttribute('src',imgsrc);
moreinfo.innerHTML = info;