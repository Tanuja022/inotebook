const mongoose=require('mongoose');
const mongourl="mongodb://localhost:27017/inotebook"

const connectTomongo=()=>{
    mongoose.connect(mongourl, ()=>{
        console.log("Connected mongo successfully")
    })
}
module.exports=connectTomongo;