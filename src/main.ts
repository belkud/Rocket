import './style.css'

let rocket = document.getElementById('rocket') as HTMLImageElement
let box_rocket = document.getElementById('box_rocket') as HTMLDivElement
let fuel = document.getElementById('fuel') as HTMLDivElement //! полоса с топливом
let fuelScore = document.getElementById('fuelScore') as HTMLDivElement //! счётчик остатка топлива
let refuel = document.getElementById('refuel') as HTMLDivElement //! кнопка 'заправить'
let degree = document.getElementById('degree') as HTMLDivElement //! угол наклона
let distance = document.getElementById('distance') as HTMLDivElement  


let accelerate = document.getElementById('accelerate') as HTMLDivElement //! кнопка ускорения


let acc = 0 //! двигаем ракету по горизонтали
let acc2 = 0 //! двигаем ракету по вертикали
let accFuel = 0  as any //! меняет ширину полосы с топливом, считает процент остатка топлива 
let accDistance = 0
let superSpeed = 0


document.addEventListener('keydown',(event)=> {
  if (event.key == 'ArrowRight' || event.code == 'KeyD') {
    acc+=10
    box_rocket.style.transform =  `translate(${acc}px,${acc2}px)`
    rocket.style.rotate =  10 + 'deg'
  }
  if (event.key == 'ArrowLeft' || event.code == 'KeyA') {
    acc-=10
    box_rocket.style.transform =  `translate(${acc}px,${acc2}px)`
    rocket.style.rotate =  -10 + 'deg'
  }

  if (event.key == 'ArrowUp' || event.code == 'KeyW') {
    acc2-=10 + superSpeed
    box_rocket.style.transform =  `translate(${acc}px,${acc2}px)`
    rocket.style.rotate =  0 + 'deg'
    
  }

  if (event.key == 'ArrowDown' || event.code == 'KeyS') {
    acc2+=10
    box_rocket.style.transform =  `translate(${acc}px,${acc2}px)`
    rocket.style.rotate =  0 + 'deg'
  }

  accFuel+=1 //! меняем acc при нажататии на кнопки
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
  }  
   fuel.style.width =  `${77 - accFuel}px` //! меняем ширину топливной полосы
   accDistance+=1
  distance.innerHTML= accDistance + ' km'
  degree.innerHTML = (rocket.style.rotate).split('d').join(' d') 

  console.log(accFuel);
})







refuel.addEventListener('click', ()=> {  //! заправка ракеты и обнуление параметров
  accFuel=0
  fuel.style.width = 78 + 'px'
  fuelScore.innerHTML= 100 + ' %'
  fuel.style.backgroundColor = 'greenyellow'
  refuel.style.display = 'none'
})


    accelerate.addEventListener('click', ()=> {  //!ускорение 
        superSpeed=20
       
})