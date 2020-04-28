const htmlElements = {
    container : document.querySelector('.container'),
    cube : document.querySelector('.cube'),
    front : document.querySelector('.front'),
    back : document.querySelector('.back'),
    right : document.querySelector('.right'),
    left : document.querySelector('.left'),
    move : document.querySelector('button'),
}


const globalVariables = {
    countCallsMoveSquare : 0,
}


const widthwindow = window.addEventListener('resize', () => {
    sizeScreen(window.innerWidth);
    move('resize');
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
    paramCall === 'click' ? moveAxisZ() : '';

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
            }else{
                variables.translateX -= variables.paramWidthScreen;
                variables.translateX - window.innerWidth / 2 < variables.paramWidthScreen ? variables.translateX = window.innerWidth / 2 : '';
            }
        }, 1);
    }

    function changchangeParamsIfMoveWsaBe(){
        let i = 0;
        while(window.innerWidth + variables.translateZ > variables.paramWidthScreen){
            variables.translateZ -= variables.paramWidthScreen;
            window.innerWidth + variables.translateZ > variables.paramWidthScreen ? '' : variables.translateZ = -window.innerWidth;
            i++;
        }
        for(let i = 1; i <= 90; i++){
            variables.translateZ += window.innerWidth * 1.5 / 90;
            variables.translateX += window.innerWidth * 1.5 / 90;
            variables.rotateY ++ ;
        }
        let j = 0;
        while(variables.translateX - window.innerWidth / 2 > variables.paramWidthScreen){
            variables.translateX -= variables.paramWidthScreen;
            variables.translateX - window.innerWidth / 2 < variables.paramWidthScreen ? variables.translateX = window.innerWidth / 2 : '';
            j++;
        }
        paramsSquare(variables.rotateY, variables.rotateX, variables.rotateZ, variables.translateY, variables.translateX, variables.translateZ);
    }
    paramCall === 'resize' ? changchangeParamsIfMoveWsaBe() : '';

    // console.log(variables.rotateY, variables.rotateX, variables.rotateZ, variables.translateY, variables.translateX, variables.translateZ);
}


const paramsSquare = function applyParamsSquare(rotateY, rotateX, rotateZ, translateY, translateX, translateZ){
    htmlElements.cube.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) rotateZ(${rotateZ}deg) translateY(${translateY}px) translateX(${translateX}px) translateZ(${translateZ}px)`;
}

htmlElements.move.addEventListener('click', () => {move('click')});


// document.querySelector('button').addEventListener('click', () => {
//     let htmlElements = {
//         cube : document.querySelector('.cube'),
//         coordinates : document.querySelector('.coordinates'),
//         keycode : document.querySelector('.keycode'),
//     }

//     let variables = {
//         rotateX : 0,
//         rotateY : 0,
//         rotateZ : 0,
//         translateZ : 0,
//         translateX : 0,
//         translateY : 0,
//     }

//     let moveZ = setInterval(() => {
//         paramsSquare(variables.rotateY, variables.rotateX, variables.rotateZ, variables.translateY, variables.translateX, variables.translateZ);

//         if(variables.translateZ === -300){
//             clearInterval(moveZ);
//             rotateSquare();
//         }else{
//             variables.translateZ -= 2;
//         }
//     }, 1);

//     function rotateSquare(){
//         let rotate = setInterval(() => {
//             paramsSquare(variables.rotateY, variables.rotateX, variables.rotateZ, variables.translateY, variables.translateX, variables.translateZ);

//             if(variables.rotateY % 2){
//                 variables.translateZ += 4;
//                 variables.translateX += 4;
//             }else{
//                 variables.translateZ += 6;
//                 variables.translateX += 6;
//             }
//             variables.rotateY ++ ;
//             if(variables.rotateY === 90){
//                 clearInterval(rotate);
//                 moveXline();
//             }
//         }, 1);
//     }

//     function moveXline(){
//         let moveX = setInterval(() => {
//             paramsSquare(variables.rotateY, variables.rotateX, variables.rotateZ, variables.translateY, variables.translateX, variables.translateZ);
//             if(variables.translateX === 150){
//                 clearInterval(moveX);
//             }else{
//                 variables.translateX -= 2;
//             }
//         }, 1);
//     }

//     function paramsSquare(rotateY, rotateX, rotateZ, translateY, translateX, translateZ){
//         htmlElements.cube.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) rotateZ(${rotateZ}deg) translateY(${translateY}px) translateX(${translateX}px) translateZ(${translateZ}px)`;

//         htmlElements.coordinates.innerHTML = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) rotateZ(${rotateZ}deg) translateY(${translateY}px) translateX(${translateX}px) translateZ(${translateZ}px)`;
//     }
// });
