'use strict';

import mongoose from 'mongoose';

const ParksSchema = mongoose.Schema({
  location: {type: String},
});

export default mongoose.model('parks', ParksSchema);