const mongoose= require('mongoose');
const Review= require('./reviews');

const Schema= mongoose.Schema;

const imageSchema= new Schema({
    url: String,
    filename: String
})

imageSchema.virtual('thumbnail').get(function(){
    return this.url.replace('/upload', '/upload/w_200');
})

const campgroundSchema= new Schema({
    title: String,
    price: Number,
    location: String,
    description: String,

    images: [imageSchema],

    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
}]
})

campgroundSchema.post('findOneAndDelete', async(doc)=>{
    if(doc){
         await Review.deleteMany({_id: {
                $in : doc.reviews
            }})
    }
})

const Campground= mongoose.model('Campground', campgroundSchema);
module.exports= Campground;