import mongoose from 'mongoose'

const dbConnection = async()=>{
    try {
        const connection = await mongoose.connect(process.env.MONGO_DB_URL)
        if(connection){
            console.log(`Database connected successfully with ${connection.connection.host}`)
        }
    } catch (error) {
        console.log('ERROR IN DATABASE CONNECTION')
        console.log(error)
        process.exit(1)
    }
}

export default dbConnection;