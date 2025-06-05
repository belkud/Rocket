import './style.css'

let rocket = document.querySelector('.rocket') as HTMLImageElement
let shattle = document.querySelector('.shattle') as HTMLImageElement
let box_rocket = document.querySelector('#box_rocket') as HTMLDivElement
let fuel = document.getElementById('fuel') as HTMLDivElement //! полоса с топливом
let fuelScore = document.getElementById('fuelScore') as HTMLDivElement //! счётчик остатка топлива
let refuel = document.getElementById('refuel') as HTMLButtonElement //! кнопка 'заправить'
let degree = document.getElementById('degree') as HTMLDivElement //! угол наклона
let distance = document.getElementById('distance') as HTMLDivElement  
let time = document.getElementById('time') as HTMLDivElement  
let altitude = document.getElementById('altitude') as HTMLDivElement  //! высота
let speed = document.getElementById('speed') as HTMLDivElement  //! высота


let accelerate = document.getElementById('accelerate') as HTMLButtonElement //! кнопка ускорения
let slow_down = document.getElementById('slow_down') as HTMLButtonElement //! кнопка замедления
let normal = document.getElementById('normal') as HTMLButtonElement //! кнопка замедления

let transport = document.getElementById('transport') as HTMLDivElement //! div  с картинками
let change_transport = document.getElementById('change_transport') as any //! выбор летательного средства


change_transport.addEventListener('click', ()=> {
if (rocket.style.display == 'block') {
  rocket.style.display = 'none'
  shattle.style.display = 'block'
} else {
  rocket.style.display = 'block'
  shattle.style.display = 'none'
}
})

// let clouds = document.getElementById('clouds') as any  //! движение облаков
// let cloud = clouds.children
// cloud[0].style.marginLeft = `${Math.random()*80}%`
// cloud[1].style.marginLeft = `${Math.random()*80}%`
// cloud[2].style.marginLeft = `${Math.random()*80}%`

// let newTrans = document.createElement('div')


let acc = 0 //! двигаем ракету по горизонтали
let acc2 = 0 //! двигаем ракету по вертикали
let accFuel = 0  as any //! меняет ширину полосы с топливом, считает процент остатка топлива 
let accDistance = 0 //! считаем пройденное расстояник
let timeFly = 0 //! таймер полета времени
let mode = 1 //! обработка режимов
let accAltitude = 0 //! считаем высоту

function handler (event:any) {
  if (event.key == 'ArrowRight' || event.code == 'KeyD') {
    acc+=10 * mode
    box_rocket.style.transform =  `translate(${acc}px,${acc2}px)`
    rocket.style.rotate =  10 + 'deg'
    shattle.style.rotate =  10 + 'deg'
  }
  if (event.key == 'ArrowLeft' || event.code == 'KeyA') {
    acc-=10 * mode
    box_rocket.style.transform =  `translate(${acc}px,${acc2}px)`
    rocket.style.rotate =  -10 + 'deg'
    shattle.style.rotate =  -10 + 'deg'
  }

  if (event.key == 'ArrowUp' || event.code == 'KeyW' && box_rocket.offsetTop>=10) {
   // if (box_rocket.offsetTop<=10) { //! ограничение передвижения элемента!!!!!!! ракета!!!!!!!!!
     acc2-=10 * mode
     box_rocket.style.transform =  `translate(${acc}px,${acc2}px)`
     rocket.style.rotate =  0 + 'deg'
     shattle.style.rotate =  0 + 'deg'
     accAltitude+=1* mode
     // let computedStyle = getComputedStyle(box_rocket)
     // console.log(computedStyle.transform);
     
   // }
  }

  if (event.key == 'ArrowDown' || event.code == 'KeyS') {
    acc2+=10 * mode
    box_rocket.style.transform =  `translate(${acc}px,${acc2}px)`
    rocket.style.rotate =  0 + 'deg'
    shattle.style.rotate =  0 + 'deg'
    accAltitude-=1* mode
  }

  accFuel+=mode/3 //! меняем acc при нажататии на кнопки
  fuelScore.innerHTML= (100 - accFuel*1.3).toFixed(1) + ' %'  //! считаем остаток топлива

 

  if (fuel.style.width<=60 + 'px') { //! меняем цвет полосы при уменьшении топлива
    fuel.style.backgroundColor = 'orange'
  }
  if (fuel.style.width<=40 + 'px') {
    fuel.style.backgroundColor = 'orangered'
  }
  if (fuel.style.width<=20 + 'px') {
    fuel.style.backgroundColor = 'red'
  }
  if (fuel.style.width<=0 + 'px') {
    fuel.style.backgroundColor = 'greenyellow' //!от бага
  }
  

  if (accFuel>=77) { //! создаём условие, чтобы уровень топлива не был отрицательным
      fuelScore.innerHTML= 0 + ' %' as any
      refuel.style.display = 'block'   
      document.removeEventListener('keydown', handler) //! отключаем ракету когда топливо закончилось
  
  }  
    if (event.code == 'Space') {
      document.addEventListener('keydown', handler) //! отключаем ракету когда топливо закончилось

    }
  fuel.style.width =  `${77 - accFuel}px` //! меняем ширину топливной полосы
   

  accDistance+=mode/3
  distance.innerHTML= Math.round(accDistance) + ' km' //! меняем пройденное расстояние
  degree.innerHTML = (rocket.style.rotate).split('d').join(' d') 



  altitude.innerHTML = Math.round(accAltitude/3) + ' km' //! меняем высоту ракеты
  if (accAltitude<=0) {
    accAltitude=1
  }
 



  if (event.code == 'Space') { //! Заправляем ракету через 'backSpace' (пробел)
    addFuel()
  }
  if (event.code == 'Digit1') {  //! кнопка '1' - замедление
    mode = .5  
    changeRocketSize()  
  }
  if (event.code == 'Digit2') {  //! кнопка '2' - нормальный режим
    mode = 1
    changeRocketSize()  
  }
  if (event.code == 'Digit3') {  //! кнопка '3' - ускорение
    mode = 2
    changeRocketSize()  
  }

  
rocket.style.animation = 'none' //! убираем анимацию движения ракеты на месте

transport.classList.remove('switchAnimation')
setTimeout(() => {
  transport.classList.add('switchAnimation')
}, 2000); 

}




setInterval(() => {  //! время полёта
  timeFly+=1 as any
  time.innerHTML=timeFly + ' sec'
}, 1000);


 

refuel.addEventListener('click', addFuel) //! Кнопка 'заправить ракету'


function addFuel() { //! функция заправки ракеты и обнуление параметров
  accFuel=0
  fuel.style.width = 78 + 'px' 
  fuelScore.innerHTML= 100 + ' %'
  fuel.style.backgroundColor = 'greenyellow'
  refuel.style.display = 'none'
  document.addEventListener('keydown', handler)
}



function changeRocketSize () {  //! изменение размера ракеты при выборе режима
    transport.style.scale = 1.2 as any
    speed.innerHTML=5*mode + ' km/s'  //! записываем скорость ракеты
    setTimeout(() => transport.style.scale = 1 as any, 500);
}



slow_down.addEventListener('click', ()=> {  //!замедление 
        mode = .5  
        changeRocketSize()    
})
      
normal.addEventListener('click', ()=> {  //!обычная скорость   
        mode = 1
        changeRocketSize()       
})

accelerate.addEventListener('click', ()=> {  //!ускорение 
        mode = 2
        changeRocketSize()       
})

document.addEventListener('keydown', handler)



let clouds = document.getElementById('clouds') as any  //! движение облаков
let cloud = clouds.children
cloud[0].style.marginLeft = `${Math.random()*80}%`
cloud[1].style.marginLeft = `${Math.random()*80}%`
cloud[2].style.marginLeft = `${Math.random()*80}%`
cloud[3].style.marginLeft = `${Math.random()*80}%`
cloud[4].style.marginLeft = `${Math.random()*80}%`
cloud[5].style.marginLeft = `${Math.random()*80}%`
cloud[6].style.marginLeft = `${Math.random()*80}%`
cloud[7].style.marginLeft = `${Math.random()*80}%`

// cloud[0].style.animationDelay = `5s`
// cloud[1].style.animationDelay = `3s`
// cloud[2].style.animationDelay = `1s`
// cloud[3].style.animationDelay = `3s`
// cloud[4].style.animationDelay = `6s`
// cloud[5].style.animationDelay = `3s`
// cloud[6].style.animationDelay = `8s`
// cloud[7].style.animationDelay = `5s`

setInterval(() => {
  cloud[0].style.marginLeft = `${Math.random()*100}%`
  cloud[1].style.marginLeft = `${Math.random()*100}%`
  cloud[2].style.marginLeft = `${Math.random()*100}%`
  cloud[3].style.marginLeft = `${Math.random()*100}%`
  cloud[4].style.marginLeft = `${Math.random()*100}%`
  cloud[5].style.marginLeft = `${Math.random()*100}%`
  cloud[6].style.marginLeft = `${Math.random()*100}%`
  cloud[7].style.marginLeft = `${Math.random()*100}%`
}, 10000);


console.log(Math.random()*100);


// console.log(clouds.children[0].style.marginLeft = '100px');








// document.addEventListener('mousemove', function (event) {
//  console.log(`окна  Х=${event.clientX}px У=${event.clientY}px`)
//   console.log(`документа Х=${event.pageX}px У=${event.pageY}px`)
// })




//!!!!!!!!!!!!!! Всё что касаемо взрыва!
let explotionTimer = document.getElementById('explotionTimer') as HTMLDivElement 
let cross = document.getElementById('cross') as HTMLDivElement 
let cross_box = document.getElementById('cross_box') as HTMLDivElement 
let SVG_rocket = document.getElementById('SVG_rocket') as HTMLDivElement 
let explotion = document.getElementById('explotion') as HTMLImageElement // ! gif взрыва 
let rocketFastKiller = document.getElementById('rocketFastKiller') as HTMLImageElement // ! Ракета-перехватчик 
let interceptorRocket = document.getElementById('interceptorRocket') as HTMLButtonElement // ! Кнопка запуска ракеты-перехватчика

let explotionAcc = 15 as any
interceptorRocket.addEventListener('click', ()=> {
  rocketFastKiller.style.display='block'
  cross_box.style.display='block'

let inter = setInterval(() => {
  explotionAcc-=1
  explotionTimer.innerHTML=explotionAcc
}, 1000);

setTimeout( ()=>clearInterval(inter), 15000);

setTimeout(() => {
  cross.style.display = 'none'
  explotionTimer.style.display = 'none'
  explotion.style.display = 'block'
  box_rocket.style.display = 'none'
  rocketFastKiller.style.display = 'none'
}, 15000);

setTimeout(() => {
  explotion.style.scale = 2 as any
}, 17100);

setTimeout(() => {
  explotion.style.display = 'none'
}, 19200);

setTimeout(() => {
  SVG_rocket.style.display = 'block'
}, 2500);

setTimeout(() => {
  SVG_rocket.style.display = 'none'
}, 3500);
})






// console.log(getComputedStyle(document.body));







// //!!!!!!!!!!!! Размеры и прокрутка элементов!!!!!!!!!!!!!



// let checkDiv = document.querySelector('#checkDiv') as HTMLDivElement
// console.log(checkDiv.clientWidth);  
// console.log(checkDiv.clientHeight); //! видимая внутренняя высота (сам текст)
// console.log(checkDiv.offsetHeight); //! видимая общая высота
// console.log(checkDiv.scrollHeight); //! высота вместе с невидимой частью элемента
// console.log(checkDiv.scrollTop); //! 
// console.log(checkDiv.offsetTop); //! высота от начала родителя (страницы)
// console.log(checkDiv.clientTop); // border элемента



// let accc = 0
// document.addEventListener('keydown', (e)=> {
//     if (checkDiv.offsetTop>=10) { //! ограничение передвижения элемента!!!!!!! ракета!!!!!!!!!
//         accc -=10     
        
//     }
//     checkDiv.style.top = accc+ 'px'
    
//     console.log(checkDiv.offsetTop);
//     console.log(getComputedStyle(box_rocket).marginTop);
    
//     // console.log(getComputedStyle(checkDiv).length); // количество css-свойств
// })

// // console.log(document.body.offsetHeight);
// // console.log(document.body.clientHeight);
// // console.log(document.body.scrollHeight);
// // console.log(document.body.scrollTop);
 





