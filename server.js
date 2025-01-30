const express=require('express')
const app=express();
require('dotenv').config();
const cors=require('cors')
const portfolioRoute=require('./routes/portfolioRoute')
const path=require('path')

const PORT=process.env.PORT || 5000;
require('./config/dbConfig')

app.use(cors())
app.use(express.json());

app.use('/api/portfolio',portfolioRoute)

if(process.env.NODE_ENV==='production'){
    app.use(express.static('client/build'))
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client/build/index.html'))
    })
}

app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
    
})