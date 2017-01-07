enig['color-palette'] = (e) => {
  e.css('background-color:#dbdbdb;position:fixed');
  e.render = arr => {
    var width = e.offsetWidth/arr.length;
    e.innerHTML = arr.map(color =>
      `<div style='float:left;height:100%;width:${width};background-color:${color}'>&nbsp;</div>`
    ).join('');
  }
} 

/*
<color-palette class='eight eight-high' id=my data=colors control>

enig.ready = k =>
  data.colors = ["52433E", "BF402F", "D47944", "FFC486", "FFF7B3", "cbcbcb"]
*/
