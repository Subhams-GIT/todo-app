const express=require('express')
const cors=require('cors')

const app=express();
app.use(cors())
const PORT= 3000;
const {todo} =require('./db')
app.use(express.json())
app.post('/createtodos',(req,res)=>{
	const {title,description,done,id}=req.body;
	const newtodo= new todo({
		title,
		description,
		id:id,
		done:false
	})
	newtodo.save();
	res.send('todo created')
})

app.get('/getTodos',async (req,res)=>{
	const response=await todo.find({})
	res.json({
		"todos":response
	})
})

app.delete('/deleteTodos',async (req,res)=>{
	try{
		await todo.deleteMany({})
		res.send({
			msg:"todos deleted"
		})
	}
	catch(error){
		console.log(error);
	}

})

app.post('/updatetodos',async (req,res)=>{
	const {id,done}=req.body.done;
        // Update the todo item based on its ID
        await todo.updateOne({ id: id }, { $set: { done: done } });
        res.send({ msg: "Todo updated" });
})
app.listen(PORT);
