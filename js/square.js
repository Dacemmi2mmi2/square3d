const htmlElements = {
    container : document.querySelector('.container'),
    cube : document.querySelector('.cube'),
    front : document.querySelector('.front'),
    back : document.querySelector('.back'),
    right : document.querySelector('.right'),
    left : document.querySelector('.left'),
}

window.addEventListener('resize', () => {
    styleHtml(window.innerWidth);
});

const styleHtml = function stylesForHtmlElements(width){
    let styles = {
        container : {
            // width : htmlElements.container.style.width = window.innerWidth,
            perspective : htmlElements.container.style.perspective = width + 'px',
        },
        back : {
            transform : htmlElements.back.style.transform =  `rotateY(180deg) translateZ(${width}px)`,
        },
        left : {
            transform : htmlElements.left.style.transform =  `rotateY(-90deg) translateZ(${width / 2}px) translateX(-${width / 2}px)`,
        },
        right : {
            transform : htmlElements.right.style.transform =  `rotateY(90deg) translateZ(${width / 2}px) translateX(${width / 2}px)`,
        },
        // cube : {
        //     width : htmlElements.cube.style.width = window.innerWidth,
        // },
        // side : {
        //     width : htmlElements.cube.style.width = window.innerWidth,
        // }
    }
}
styleHtml(window.innerWidth);










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
