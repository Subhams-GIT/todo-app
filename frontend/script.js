async function fetcher(){
	const response=await fetch('http://localhost:3000/getTodos')
	if (!response.ok) {
		console.log('Failed to fetch todos');
		return ;
	}
	const jsonData = await response.json();
	let todosArray=[];
	for(let i=0;i<jsonData.todos.length;i++){
		todosArray[i]=jsonData.todos[i];
	}
	
	addTodo(todosArray)
} 

fetcher();
const todos=document.getElementsByClassName('clear')[0]
const titleGiven=document.getElementById('title');
const des=document.getElementById('des');
const btn=document.getElementById('addbtn')
const clrbtn=document.getElementById('clrbtn')
let globalId=1;

btn.addEventListener('click',()=>{createElements()})

function addTodo(todosArray= null){
	for(let i=0;i<todosArray.length;i++){
		createElements(todosArray[i])
	}
}

function createElements(todosdata){
	const todo=document.createElement('div')
		const title=document.createElement('input')
		const description=document.createElement('input')
		const done=document.createElement('button')
	
		title.setAttribute('class','box border-bottom')
		description.setAttribute('class','box border-bottom')
		done.setAttribute('class',' border-bottom')
		globalId++;
		done.setAttribute('id',(globalId))
		done.setAttribute('onclick',`markAsDone(${globalId})`);
		
		done.innerHTML='Mark As Done ';
		if(todosdata != null){
			title.value=todosdata.title
			description.value=todosdata.description
			done.innerHTML=true ? 'done':'mark as done'
		}
		else{
			title.value=titleGiven.value;
			description.value=des.value;
			done.innerHTML='mark as done'
			const formData = {
				title: title.value,
				description: description.value,
				id:globalId,
				done:false
			};
			fetch('http://localhost:3000/createtodos', {
  				method: 'POST',
 				headers: {
    			'Content-Type': 'application/json'
  				},
 				 body: JSON.stringify(formData)
				})
				.then(response => {
  				if (!response.ok) {
    				throw new Error('Failed to create todo');
 				}
  					return response.json();
	})
	.then(data => {
  		console.log('Todo created successfully:', data);
	})
	.catch(error => {
  		console.error('Error creating todo:', error);
	});
	}
		todo.appendChild(done)
		todo.appendChild(title)
		todo.appendChild(description)
		todos.appendChild(todo)
		console.log(todo);
}

function markAsDone(id){
	const parent=document.getElementById(id);
	console.log(parent);
	parent.innerHTML='done'
	const formData={
		id:id,
		done:'true'
	}
	fetch('http://localhost:3000/updatetodos', {
  				method: 'POST',
 				headers: {
    			'Content-Type': 'application/json'
  				},
 				 body: JSON.stringify(formData)
				})
				.then(response => {
  				if (!response.ok) {
    				throw new Error('Failed to update todo');
 				}
  					return response.json();
	})
}

clrbtn.addEventListener('click',async ()=>{
	todos.innerHTML=' '
	fetch('http://localhost:3000/deleteTodos', {
  				method: 'DELETE',
})
})