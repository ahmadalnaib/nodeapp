function itemTemplate(item) {
  return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
  <span class="item-text">${item.text}</span>
  <div>
    <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
    <button data-id='${item._id}' class="delete-me btn btn-danger btn-sm">Delete</button>
  </div>
</li>
  `
}
//initial page 
let ourHTML =items.map((item)=>{
return itemTemplate(item)
}).join('')
document.querySelector('#item-list').insertAdjacentHTML("beforeend",ourHTML)
//create feature

let createField =document.querySelector('#create-field')
document.querySelector("#create-form").addEventListener('submit',(e)=>{
  axios.post('/create-item',{text:createField.value})
  .then((response)=>{
   document.querySelector('#item-list').insertAdjacentHTML("beforeend", itemTemplate(response.data))
   createField.value=""
  createField.focus()
  })
  
  .catch(()=>{
    console.log('err')
  }) 
  e.preventDefault();
})



document.addEventListener('click',(e)=>{

//delete items
if(e.target.classList.contains('delete-me')){

if(confirm("ARE YOU SURE !")){
  axios.post('/delete-item',{id:e.target.getAttribute("data-id")})
  .then(()=>{
   e.target.parentElement.parentElement.remove();
  })
  .catch(()=>{
    console.log('err')
  }) 
}
}

//update items

if(e.target.classList.contains('edit-me')) {
 const userInput =prompt('Edit text',e.target.parentElement.parentElement.querySelector('.item-text').innerHTML)

 if(userInput){
  axios.post('/update-item',{text:userInput,id:e.target.getAttribute("data-id")})
  .then(()=>{
   e.target.parentElement.parentElement.querySelector('.item-text').innerHTML=userInput
  })
  .catch(()=>{
    console.log('err')
  })
 
 }
}


});