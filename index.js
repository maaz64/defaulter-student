const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
const Student = mongoose.model('Student',{
    name:{type:String},
    class:{type:String},
    section:{type:String},
    gender:{type:String},

})
const Dues = mongoose.model('Dues',{student:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Student'
}})

exports.handler = async (event) => {
    try {

        const data =await Dues.find({}).populate('student');


        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify(error),
        };
    }
};