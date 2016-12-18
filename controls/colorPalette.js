enig.colorPalette = (e) => {
  e.setValue = (arr) => {
    e.style.backgroundColor = 'black';
    e.style.position = 'fixed';
    e.style.width = '300px';
    e.style.height = '200px';
    var len = arr.length;
    var child_width = e.offsetWidth/len;
    while(len--){
      var child = e.child();
      var val = arr[len];
      if(val[0] != '#') val = '#' + val;
      child.style.backgroundColor = val;
      child.style.width = child_width+'px';
      child.style.height = '100%';
      child.style.float = 'left';
    }
  }
}

/*
<colorPalette id=me control></colorPalette>
enig.colorPalette(element);
element.setValue(["52433E", "BF402F", "D47944", "FFC486", "FFF7B3", "cbcbcb"]);
*/
