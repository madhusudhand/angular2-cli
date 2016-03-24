module.exports = function extend() {
  var newObj = {};
  // console.log(arguments);
  for(var i = 0; i < arguments.length ; i++){
    var obj = arguments[i];
    if(obj !== null && typeof obj === 'object'){
      for (var prop in obj)
        if (obj.hasOwnProperty(prop)) newObj[prop] = obj[prop];
    }
  }
  return newObj;
};
