import './style.css'

let rocket = document.getElementById('rocket') as HTMLImageElement
let box_rocket = document.getElementById('box_rocket') as HTMLDivElement
let fuel = document.getElementById('fuel') as HTMLDivElement


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
    fuel.style.width =  `${77 - accFuel}px` //! меняем топливо
    fuel.innerHTML= accFuel
  }
  if (event.key == 'ArrowDown' || event.code == 'KeyS') {
    acc2+=10
    box_rocket.style.transform =  `translate(${acc}px,${acc2}px)`
    rocket.style.rotate =  0 + 'deg'
  }
  
  
  
  console.log(acc);
  console.log(acc2);
  
})


// fuel.style.width =  50 + 'px'
 


