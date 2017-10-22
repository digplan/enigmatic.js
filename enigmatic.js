enigmatic = x => {
 try {
   window.views = e =>
    e.set = showid =>
     $('views > view').forEach( v => v.hidden = v.id != showid )
  
   window.load = function(s, cb){
    var css = s.match(/css$/);
    var i = document.body.appendChild(document.createElement(css ? 'link' : 'script'));
    i.onload = cb||null;
    if(css) css.rel = "stylesheet";
    i[css ? 'href' : 'src'] = s;
   }
   window.$ = document.querySelectorAll.bind(document);
   window.data = new Proxy({}, {
    set: function(target, property, value, receiver) {
     document.querySelectorAll(`[data=${property}]`).forEach(function(e){
      var v = value;
      var prop = e.getAttribute('data-property');
      if(prop) v = eval('value.' + prop);
      if(e.set) e.set(v);
      if(e.render) e.render(v);
    });
        target[property] = value;
      }
   });
   document.querySelectorAll('[control]').forEach((e)=>{
    console.log(e)
    var ename = e.tagName.toLowerCase();
    var cn = e.getAttribute('control');
    if(cn) ename = cn;
    e.css = (rules, sel)=>{
      var style = document.createElement("style");
      document.head.appendChild(style);
      style.sheet.insertRule(`${sel||e.tagName} { ${rules} }`); 
    }
    window[ename](e);
   });
 } catch(e) {
   document.body.innerHTML = `<div style='color:red'>${e.stack}</div>`
 }  
}
window.onload = enigmatic
