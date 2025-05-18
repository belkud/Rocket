import './style.css'

let rocket = document.getElementById('rocket') as HTMLImageElement
let box_rocket = document.getElementById('box_rocket') as HTMLDivElement
let fuel = document.getElementById('fuel') as HTMLDivElement //! полоса с топливом
let fuelScore = document.getElementById('fuelScore') as HTMLDivElement //! счётчик остатка топлива
let refuel = document.getElementById('refuel') as HTMLDivElement //! кнопка 'заправить'
let degree = document.getElementById('degree') as HTMLDivElement //! угол наклона
let distance = document.getElementById('distance') as HTMLDivElement  
let time = document.getElementById('time') as HTMLDivElement  
let altitude = document.getElementById('altitude') as HTMLDivElement  //! высота
let speed = document.getElementById('speed') as HTMLDivElement  //! высота


let accelerate = document.getElementById('accelerate') as HTMLButtonElement //! кнопка ускорения
let slow_down = document.getElementById('slow_down') as HTMLButtonElement //! кнопка замедления
let normal = document.getElementById('normal') as HTMLButtonElement //! кнопка замедления


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
  }
  if (event.key == 'ArrowLeft' || event.code == 'KeyA') {
    acc-=10 * mode
    box_rocket.style.transform =  `translate(${acc}px,${acc2}px)`
    rocket.style.rotate =  -10 + 'deg'
  }

  if (event.key == 'ArrowUp' || event.code == 'KeyW') {
    acc2-=10 * mode
    box_rocket.style.transform =  `translate(${acc}px,${acc2}px)`
    rocket.style.rotate =  0 + 'deg'
    accAltitude+=1* mode
  }

  if (event.key == 'ArrowDown' || event.code == 'KeyS') {
    acc2+=10 * mode
    box_rocket.style.transform =  `translate(${acc}px,${acc2}px)`
    rocket.style.rotate =  0 + 'deg'
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
   fuel.style.width =  `${77 - accFuel}px` //! меняем ширину топливной полосы
   

  accDistance+=mode/3
  distance.innerHTML= Math.round(accDistance) + ' km' //! меняем пройденное расстояние
  degree.innerHTML = (rocket.style.rotate).split('d').join(' d') 



  altitude.innerHTML = Math.round(accAltitude/3) + ' km' //! меняем высоту ракеты
  if (accAltitude<=0) {
    accAltitude=1
  }
 


rocket.style.animation = 'none'
 


}


setInterval(() => {  //! время полёта
  timeFly+=1 as any
  time.innerHTML=timeFly + ' sec'
}, 1000);


 

refuel.addEventListener('click', ()=> {  //! заправка ракеты и обнуление параметров
  accFuel=0
  fuel.style.width = 78 + 'px'
  fuelScore.innerHTML= 100 + ' %'
  fuel.style.backgroundColor = 'greenyellow'
  refuel.style.display = 'none'
  document.addEventListener('keydown', handler)
})




function changeRocketSize () {  //! изменение размера ракеты при выборе режима
    rocket.style.scale = 1.2 as any
    speed.innerHTML=5*mode + ' km/s'  //! записываем скорость ракеты
    setTimeout(() => rocket.style.scale = 1 as any, 500);
}

accelerate.addEventListener('click', ()=> {  //!ускорение 
        mode = 2
        changeRocketSize()
})

slow_down.addEventListener('click', ()=> {  //!замедление 
        mode = .5  
        changeRocketSize()    
      })
      
normal.addEventListener('click', ()=> {  //!обычная скорость   
        mode = 1
        changeRocketSize()       
})




document.addEventListener('keydown', handler)






// document.addEventListener('click', (event)=> {
//  console.log(event.clientX);
// })



// document.addEventListener('mousemove', function (event) {
//  console.log(`окна  Х=${event.clientX}px У=${event.clientY}px`)
//   console.log(`документа Х=${event.pageX}px У=${event.pageY}px`)
// })




//!!!!!!!!!!!!!! Всё что касаемо взрыва!
let explotionTimer = document.getElementById('explotionTimer') as HTMLDivElement 
let cross = document.getElementById('cross') as HTMLDivElement 
let SVG_rocket = document.getElementById('SVG_rocket') as HTMLDivElement 
let explotion = document.getElementById('explotion') as HTMLImageElement // ! gif взрыва 
let rocketFastKiller = document.getElementById('rocketFastKiller') as HTMLImageElement // ! gif взрыва 



let explotionAcc = 15 as any
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
  explotion.style.display = 'none'
 
}, 17000);

setTimeout(() => {
  SVG_rocket.style.display = 'block'
}, 2500);

setTimeout(() => {
  SVG_rocket.style.display = 'none'
}, 3500);
