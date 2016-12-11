enig.util = {};
enig.util.twodarray = (arr) => {
  var keys=arr.shift();
  return arr.map((i)=>{
    var o={};
    for(var j=0;j<keys.length;j++)
      o[keys[j]] = i[j];
    return o;
  });
}
