const htmlElements = {
    container : document.querySelector('.container'),
    cube : document.querySelector('.cube'),
    front : document.querySelector('.front'),
    back : document.querySelector('.back'),
    right : document.querySelector('.right'),
    left : document.querySelector('.left'),
    moveFront : document.querySelector('.front>button'),
    moveLeft : document.querySelector('.left>button'),
}


const globalVariables = {
    rotateX : 0,
    rotateY : 0,
    rotateZ : 0,
    translateZ : 0,
    translateX : 0,
    translateY : 0
}


const widthwindow = window.addEventListener('resize', () => {
    sizeScreen(window.innerWidth);
});


const sizeScreen = function sizeWidthScreen(width){
    htmlElements.container.style.perspective = width + 'px';
    htmlElements.back.style.transform =  `rotateY(180deg) translateZ(${width}px)`;
    htmlElements.left.style.transform =  `rotateY(-90deg) translateZ(${width / 2}px) translateX(-${width / 2}px)`;
    htmlElements.right.style.transform =  `rotateY(90deg) translateZ(${width / 2}px) translateX(${width / 2}px)`;
}
sizeScreen(window.innerWidth);


const move = function moveSquare(paramCall){
    let variables = {
        rotateX : 0,
        rotateY : 0,
        rotateZ : 0,
        translateZ : 0,
        translateX : 0,
        translateY : 0,
        paramWidthScreen : 0,
    }

    window.innerWidth >= 1800 ? variables.paramWidthScreen = 20 : '';
    window.innerWidth >= 1500 && window.innerWidth < 1800 ? variables.paramWidthScreen = 10 : '';
    window.innerWidth >= 900 && window.innerWidth < 1500 ? variables.paramWidthScreen = 7 : '';
    window.innerWidth >= 600 && window.innerWidth < 900 ? variables.paramWidthScreen = 5 : '';
    window.innerWidth < 600 ? variables.paramWidthScreen = 3 : '';

    function moveAxisZ(){
        let moveZ = setInterval(() => {
            paramsSquare(variables.rotateY, variables.rotateX, variables.rotateZ, variables.translateY, variables.translateX, variables.translateZ);
            if(variables.translateZ === -window.innerWidth){
                clearInterval(moveZ);
                rotateSquare();
            }else{
                variables.translateZ -= variables.paramWidthScreen;
                window.innerWidth + variables.translateZ > variables.paramWidthScreen ? '' : variables.translateZ = -window.innerWidth;
            }
        }, 1);
    }
    moveAxisZ();

    function rotateSquare(){
        let rotate = setInterval(() => {
            paramsSquare(variables.rotateY, variables.rotateX, variables.rotateZ, variables.translateY, variables.translateX, variables.translateZ);
            variables.translateZ += window.innerWidth * 1.5 / 90;
            variables.translateX += window.innerWidth * 1.5 / 90;
            variables.rotateY ++ ;
            if(variables.rotateY === 90){
                clearInterval(rotate);
                moveAxisX();
            }
        }, 1);
    }

    function moveAxisX(){
        let moveX = setInterval(() => {
            paramsSquare(variables.rotateY, variables.rotateX, variables.rotateZ, variables.translateY, variables.translateX, variables.translateZ);
            if(variables.translateX === window.innerWidth / 2){
                clearInterval(moveX);
                for (let item in variables) {
                    variables[item] = 0;
                }
                paramsSquare(variables.rotateY, variables.rotateX, variables.rotateZ, variables.translateY, variables.translateX, variables.translateZ);
            }else{
                variables.translateX -= variables.paramWidthScreen;
                variables.translateX - window.innerWidth / 2 < variables.paramWidthScreen ? variables.translateX = window.innerWidth / 2 : '';
            }
        }, 1);
    }
}


const paramsSquare = function applyParamsSquare(rotateY, rotateX, rotateZ, translateY, translateX, translateZ){
    htmlElements.cube.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) rotateZ(${rotateZ}deg) translateY(${translateY}px) translateX(${translateX}px) translateZ(${translateZ}px)`;
}

htmlElements.moveFront.addEventListener('click', () => {move('click')});
