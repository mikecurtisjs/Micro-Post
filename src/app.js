import { http } from './http';
import { ui } from './ui';

//get post on dom load
document.addEventListener('DOMContentLoaded', getPosts);

//Listen for add post
document.querySelector('.post-sumbit').addEventListener('click', submitPost)

//delete post
document.querySelector('#posts').addEventListener('click', deletePost)

//Listen for edit state
document.querySelector('#posts').addEventListener('click', enableEdit)

//Listen for cancel
document.querySelector('.card-form').addEventListener('click', cancelEdit)

function deletePost(e){
  if(e.target.parentElement.classList.contains('delete')){
    const id = e.target.parentElement.dataset.id;
    http.delete(`http://localhost:3000/posts/${id}`)
    .then(message => {
      ui.showAlert(message, 'alert alert-danger')
      getPosts()
    })
    .catch(err => console.log(err))
  }
}

//Get Posts
function getPosts() {
  http.get('http://localhost:3000/posts')
  .then(data => ui.showPost(data))
  .catch(err => console.log(err))
}

//Submit Post
function submitPost() {
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;
  const id = document.querySelector('#id').value;

  const data = {
    title,
    body
  }
  
  if(title === '' || body === ''){
    ui.showAlert('Please add fields', 'alert alert-danger')
  }else{
    
    //Check for ID
    if(id === ''){
      //Create post
       //Create Post
    http.post('http://localhost:3000/posts', data)
    .then(data => {
      ui.showAlert('Post added', 'alert alert-success');
      ui.clearFields();
      getPosts();
    })
    .catch(err => console.log(err))
    }else{
      //Update post
      http.put(`http://localhost:3000/posts/${id}`, data)
    .then(data => {
      ui.showAlert('Post updated', 'alert alert-success');
      ui.changeFormState('add')
      getPosts();
    })
    .catch(err => console.log(err))
    }
  }
}

//Enable edit state 
function enableEdit(e) {
 
  if(e.target.parentElement.classList.contains('edit')){
    const id = e.target.parentElement.dataset.id
    const body = e.target.parentElement.previousElementSibling.textContent;
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent
    const data = {
      id,
      title,
      body
    }

    //Fill form current post
    ui.fillForm(data)

    ui
  }
  e.preventDefault();
}

//Cancel edit state
function cancelEdit(e) {
  if(e.target.classList.contains('post-cancel')) {
    ui.changeFormState('add')
  }
  
  e.preventDefault();
}