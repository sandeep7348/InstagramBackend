const express=require('express');
const app=express();
const userRoutes=require('./route/user');

const monogoose=require('mongoose');
monogoose.connect('mongodb://localhost:27017/appClone').then(()=>{
    console.log('Connected to MongoDB');
}).catch((err)=>{
    console.error('Error connecting to MongoDB',err);
});
app.use(express.json());
app.use('/api/users',userRoutes);

app.get('/',(req,res)=>{
    res.send('Hello World');
})

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})