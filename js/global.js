function addLoadEvent(func) {
    var oldonload = window.onload;
    if(typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            oldonload();
            func();
        }
    }
}
function insertAfter(newElement, targetElement) {
    let parent = targetElement.parentNode;
    if(parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement,targetElement.nextSibling)
    }
}
function addClass(element,value) {
    if(!element.className) {
        element.className = value;
    } else {
        newClassName = element.className;
        newClassName += '';
        newClassName += value;
        element.className = newClassName;
    }
}
function highlightPage() {
    if(!document.getElementsByTagName) return false;
    if(!document.getElementById) return false;
    let headers = document.getElementsByTagName('header');
    if(headers.length === 0) return false;
    let navs = headers[0].getElementsByTagName('nav');
    if(navigator.length === 0) return false;
    let links = navs[0].getElementsByTagName('a');
    let linkurl;
    // 比较当前链接的URL与当前页面的URL
    for (let i = 0; i < links.length; i++) {
        linkurl = links[i].getAttribute('href');
        // currenturl.indexOf(linkurl);
        // 某个字符串是否被包含在另一个字符串里面，是否是当前URL里的链接URL
        // 如果没有匹配到 indexOf方法将返回-1
        if(window.location.href.indexOf(linkurl) != -1) {
            links[i].className = 'here';
            // let linkText = links[i].lastChild.nodeValue.toLowerCase();
            // document.body.setAttribute('id',linkText);
        }
       
        
    }
}
addLoadEvent(highlightPage);
function moveElem(elemId, final_x, final_y, interval){
    if(!document.getElementById) return false;
    if(!document.getElementById(elemId)) return false;
    var elem = document.getElementById(elemId);
    // console.log(elem.movement);
    if(elem.movement) {
        // console.log(elem.movement);
        
        clearTimeout(elem.movement);
    }
    if(!elem.style.left) {
        elem.style.left = '0px';
    }
    if(!elem.style.top) {
        elem.style.top = '0px';
    }
    let xposi = parseInt(elem.style.left);
    let yposi = parseInt(elem.style.top);
    if(xposi === final_x && yposi === final_y) {
        return true;
    } 
    if(xposi < final_x) {
        let dist = Math.ceil((final_x - xposi)/10);
        xposi = xposi + dist;
    };
    if(xposi > final_x) {
        let dist = Math.ceil(( xposi - final_x)/10);
        xposi = xposi - dist;
    };
    if(yposi < final_y) {
        let dist = Math.ceil((final_y - yposi)/10);
        yposi = yposi + dist;
    };
    if(yposi > final_y) {
        let dist = Math.ceil(( yposi - final_y)/10);
        yposi = yposi - dist;
    };
    elem.style.left = xposi + 'px';
    elem.style.top = yposi + 'px';
    movement = setTimeout(() => {
        moveElem(elemId,final_x,final_y,interval) 
    }, interval);
}
// 创建幻灯片元素并准备相应链接 我们把幻灯片直接放在文档中的“intro”段落后面
function prepareSlideShow() {
    if(!document.getElementsByTagName) return false;
    if(!document.getElementById) return false;
    if(!document.getElementById('intro')) return false;
    let intro = document.getElementById('intro');
    let slideshow = document.createElement('div');
    slideshow.setAttribute('id','slideshow');
    intro.appendChild(slideshow);
    let preview = document.createElement('img');
    preview.setAttribute('src','./images/slideshow.png');
    preview.setAttribute('id','preview');
    preview.setAttribute('alt','这是古诗词的幻灯片');
    slideshow.appendChild(preview);
    insertAfter(slideshow,intro);
    // 接着循环遍历intro段落中的所有链接，并根据当前鼠标所在的链接来移动preview元素
    let links = document.getElementsByTagName('a');
    let destination;
    for (let i = 0; i < links.length; i++) {
        console.log(destination);
        
       links[i].onmouseover = function() {
           destination = this.getAttribute('href');
           console.log(destination);
           
           if(destination.indexOf('index.html') != -1) {
               moveElem('preview', 0, 0, 5);
           }
           if(destination.indexOf('about.html') != -1) {
            moveElem('preview', -296, 0, 5);
            }
            if(destination.indexOf('photos.html') != -1) {
                moveElem('preview', -592, 0, 5);
            }
            if(destination.indexOf('live.html') != -1) {
                moveElem('preview', -888, 0, 5);
            }           
            
       }
        
    }
}
addLoadEvent(prepareSlideShow);

