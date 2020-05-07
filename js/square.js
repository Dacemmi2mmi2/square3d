const htmlElements = {
    mainContainer : document.querySelector('.container'),
    cube : document.querySelector('.cube'),
    front : document.querySelector('.front'),
    back : document.querySelector('.back'),
    right : document.querySelector('.right'),
    left : document.querySelector('.left'),
    logo : document.querySelector('.logo'),
    moveLeft : document.querySelector('.left>button'),
}


const globalVariables = {
    countAddPage : 0,
}


const createPage = function createHtmlPages(htmlPage, htmlItems){
    let allElements = htmlPage.replace(/[^a-zа-я0-9'=\s-\/&#;+✔\.\?\,\!\(\)]/gmi, '\n').split('\n').filter(item => {return item}),
        allElementsSplit = [],
        parent = {},
        parentStrig = [],
        someEl,
        someText,
        rootElement,
        addEl;

    for (let i = 0; i < allElements.length; i++){
        allElementsSplit.push(allElements[i].split(' '));
    }

    globalVariables.countAddPage === 0 ? rootElement = htmlElements.front : rootElement = htmlElements.left;
    parent[0] = rootElement;
    parentStrig.push(htmlElements.front.tagName);
    addEl = rootElement;

    for (let i = 0; i < allElementsSplit.length - 1; i++){
        let check;
        htmlItems.filter(item => {return item === allElementsSplit[i][0] ? check = true : ''});
        if (check){
            addEl = parent[Object.keys(parent)[Object.keys(parent).length - 1]];
            someEl = document.createElement(allElementsSplit[i][0]);
            addEl.appendChild(someEl);
            parentStrig.push(allElementsSplit[i][0]);
            parent[i] = someEl;
            if(allElementsSplit[i].length > 1){
                for (let j = 0; j < allElementsSplit[i].length; j++){
                    if(allElementsSplit[i][j].match(/=/)){
                        someEl.setAttribute(allElementsSplit[i][j].replace(/'.{1,50}'/gi, '').slice(0, -1), allElementsSplit[i][j].replace(/^.{1,50}='/gi, '').slice(0, -1));
                    }
                }
            }
        }else{
            if(allElementsSplit[i][0] === '/' + parentStrig[parentStrig.length - 1]){
                parentStrig.pop();
                delete parent[Object.keys(parent)[Object.keys(parent).length - 1]];
            }else{
                if(allElementsSplit[i][0].length >= 1){
                    for (let k = 0; k < allElementsSplit[i].length; k++){
                        someText = document.createTextNode(allElementsSplit[i][k] + ' ');
                        parent[Object.keys(parent)[Object.keys(parent).length - 1]].appendChild(someText);
                    }
                }
            }
        }
    }
    while(rootElement.firstChild){
        rootElement.firstChild.remove();
    }
    rootElement.appendChild(parent[Object.keys(parent)[Object.keys(parent).length - 1]]);
    globalVariables.countAddPage ++ ;
    globalVariables.countAddPage === 2 ? globalVariables.countAddPage = 0 : '';
}
fetch('js/pages.json').then((response) => {return response.json()}).then((data) => {createPage(data.mainPage.ru, data.htmlItems)});


const widthwindow = window.addEventListener('resize', () => {
    sizeScreen(window.innerWidth);
});


const sizeScreen = function sizeWidthScreen(width){
    htmlElements.mainContainer.style.perspective = width + 'px';
    htmlElements.back.style.transform =  `rotateY(180deg) translateZ(${width}px)`;
    htmlElements.left.style.transform =  `rotateY(-90deg) translateZ(${width / 2}px) translateX(-${width / 2}px)`;
    htmlElements.right.style.transform =  `rotateY(90deg) translateZ(${width / 2}px) translateX(${width / 2}px)`;
}
sizeScreen(window.innerWidth);


const move = function moveSquare(pageHtml, listHtmlElements){
    let variables = {
        rotateX : 0,
        rotateY : 0,
        rotateZ : 0,
        translateZ : 0,
        translateX : 0,
        translateY : 0,
        paramWidthScreen : 0,
    }
    let width = window.innerWidth;

    width >= 1800 ? variables.paramWidthScreen = 20 : '';
    width >= 1500 && width < 1800 ? variables.paramWidthScreen = 10 : '';
    width >= 900 && width < 1500 ? variables.paramWidthScreen = 7 : '';
    width >= 600 && width < 900 ? variables.paramWidthScreen = 5 : '';
    width < 600 ? variables.paramWidthScreen = 3 : '';

    function moveAxisZ(){
        let moveZ = setInterval(() => {
            paramsGlobalSquare(variables.rotateY, variables.rotateX, variables.rotateZ, variables.translateY, variables.translateX, variables.translateZ);
            if(variables.translateZ === -width){
                clearInterval(moveZ);
                rotateSquare();
            }else{
                variables.translateZ -= variables.paramWidthScreen;
                width + variables.translateZ > variables.paramWidthScreen ? '' : variables.translateZ = -width;
            }
        }, 1);
    }
    moveAxisZ();

    function rotateSquare(){
        let rotate = setInterval(() => {
            paramsGlobalSquare(variables.rotateY, variables.rotateX, variables.rotateZ, variables.translateY, variables.translateX, variables.translateZ);
            variables.translateZ += width * 1.5 / 90;
            variables.translateX += width * 1.5 / 90;
            variables.rotateY ++ ;
            if(variables.rotateY === 90){
                clearInterval(rotate);
                createPage(pageHtml, listHtmlElements);
                moveAxisX();
            }
        }, 1);
    }

    function moveAxisX(){
        let moveX = setInterval(() => {
            paramsGlobalSquare(variables.rotateY, variables.rotateX, variables.rotateZ, variables.translateY, variables.translateX, variables.translateZ);
            if(variables.translateX === width / 2){
                clearInterval(moveX);
                for (let item in variables) {
                    variables[item] = 0;
                }
                paramsGlobalSquare(variables.rotateY, variables.rotateX, variables.rotateZ, variables.translateY, variables.translateX, variables.translateZ);
            }else{
                variables.translateX -= variables.paramWidthScreen;
                variables.translateX - width / 2 < variables.paramWidthScreen ? variables.translateX = width / 2 : '';
            }
        }, 1);
    }
}


const paramsGlobalSquare = function applyParamsGlobalSquare(rotateY, rotateX, rotateZ, translateY, translateX, translateZ){
    htmlElements.cube.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) rotateZ(${rotateZ}deg) translateY(${translateY}px) translateX(${translateX}px) translateZ(${translateZ}px)`;
}




htmlElements.mainContainer.addEventListener('click', (ev) => {
    if(ev.target.closest('main')){
        if(ev.target.firstChild.data === 'Услуги '){
            fetch('js/pages.json').then((response) => {return response.json()}).then((data) => {
                move(data.servicesPage.ru, data.htmlItems);
                createPage(data.servicesPage.ru, data.htmlItems);
            });
        }
        if(ev.target.className === 'textLogo'){
            fetch('js/pages.json').then((response) => {return response.json()}).then((data) => {
                move(data.mainPage.ru, data.htmlItems);
                createPage(data.mainPage.ru, data.htmlItems);
            });
        }
    }
});





// document.querySelector('.changeLangMainPage .option:first-child').addEventListener('click', () => {
//     let link = 'js/pages.json';
//     fetch(link).then((response) => {return response.json()}).then((data) => {changeLang(data)});
// });

// const changeLang = function changeLanguege(paramLangPage){
//     console.log(paramLangPage.mainPage.ru);
//     while(htmlElements.front.firstChild){
//         htmlElements.front.removeChild(htmlElements.front.firstChild);
//     }
//     htmlElements.front.innerHTML = paramLangPage.mainPage.ru;
// }