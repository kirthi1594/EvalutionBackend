const express = require ("express")
require("dotenv").config()
const {connection} =require ("./config/db")
const {authRouter} = require("./routes/auth.route")
const {postRouter} = require("./routes/post.route")
const {auth} = require("./middleware/auth.middleware")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()
const port = process.env.PORT;
app.use(express.json())
app.use("/users",authRouter)
app.use("/posts",auth,postRouter)
app.use(cookieParser())
app.use(cors({
    origin:"https://evalution-backend-ly8q-fahq8evl5-kirthika-js-projects.vercel.app/",
  Credentials:true,}
))


app.get("/",(req,res)=>{
    res.send({"msg":"home page"})
})

app.listen(port, async()=>{
    try {
          await connection
        console.log(`running in ${port} & db connected`)
    } catch (error) {
        console.log(error)
    }
})