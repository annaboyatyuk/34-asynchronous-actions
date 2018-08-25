'use strict';

import mongoose, {Schema} from 'mongoose';

const CoffeeSchema = mongoose.Schema({
  name: {type:String, required:true},
  roast: {type:String, required:true},
  coffee: {type:String, required:true},
  park: {type: Schema.Types.ObjectId, ref: 'parks'},
});

export default mongoose.model('coffee', CoffeeSchema);

