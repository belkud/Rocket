import './style.css'

let rocket = document.getElementById('rocket') as HTMLImageElement
let box_rocket = document.getElementById('box_rocket') as HTMLDivElement
let fuel = document.getElementById('fuel') as HTMLDivElement //! полоса с топливом
let fuelScore = document.getElementById('fuelScore') as HTMLDivElement //! счётчик остатка топлива
let refuel = document.getElementById('refuel') as HTMLDivElement //! кнопка 'заправить'


let acc = 0 //! по горизонтали
let acc2 = 0 //! по вертикали
let accFuel = 0  as any //! меняем уровень топлива

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
    acc2-=10
    accFuel+=1
    box_rocket.style.transform =  `translate(${acc}px,${acc2}px)`
    rocket.style.rotate =  0 + 'deg'

    fuel.style.width =  `${77 - accFuel}px` //! меняем топливную полосу
    
    fuelScore.innerHTML= (100 - accFuel*1.3).toFixed(1) + ' %'
    if (accFuel>=77) { //! создаём условие, чтобы уровень топлива не был отрицательным
      fuelScore.innerHTML= 0 + ' %' as any
      refuel.style.display = 'none'
    }  
  }
  if (event.key == 'ArrowDown' || event.code == 'KeyS') {
    acc2+=10
    box_rocket.style.transform =  `translate(${acc}px,${acc2}px)`
    rocket.style.rotate =  0 + 'deg'
  }
  if (event.code == 'KeyC') {
    console.log('123');
      accFuel=0
  }
  
})

refuel.addEventListener('click', ()=> {
  accFuel=0
  fuel.style.width = 80 + 'px'
  fuelScore.innerHTML= 100 + ' %'
  
})
