const mongoose=require('mongoose')
const todoSchema=mongoose.Schema({
	title:String,
	description:String,
	id:Number,
	done:Boolean
})
const connectstring='YOUR_MONGO_URL'
mongoose.connect(connectstring);
const todo=mongoose.model('todo', todoSchema)
module.exports={
	todo:todo
}