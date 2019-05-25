//https://stackoverflow.com/a/40799479/4195803
//https:stackoverflow.com/a/27076252/4195803
// schema options
module.exports = {
  toJSON: {
    transform: (doc, obj, game) => {
      delete obj.__v;
      return obj;
    }
  },
  toObject: {
    transform: (doc, obj, game) => {
      delete obj.__v;
      return obj;
    }
  }
};
