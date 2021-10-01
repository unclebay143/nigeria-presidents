This snippet changes the colors when you click on the buttons and when you click on another button
```js
const button = document.querySelectorAll('button')


for (let index = 0; index < button.length; index++) {
  button[index].addEventListener('click', ()=>{
      button[index].style.backgroundColor='green'
    
    
  })
  button[index].addEventListener('focusout', ()=>{
    button[index].style.backgroundColor= 'rgba(39, 63, 39, 0.7)'
  
  
})
  
}
```js