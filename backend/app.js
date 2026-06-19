const express=require('express')
const app=express()
let expenses=[
    {id:1,title:"kurkure",amount:10,category:"Food"},
    {id:2,title:"tops",amount:500,category:"clothing"},
    {id:3,title:"leggins",amount:200,category:"clothing"}
]
app.get('/expenses/display',(req,res)=>{
    res.status(200).json(expenses)
})
app.get('/',(req,res)=>{
    res.send("hii");
})
app.listen(5000,()=>{
    console.log("listening on port 5000")
})