enig.router = (e) => {
    var home = location.href;
    for(var ls = document.links, numLinks = ls.length, i=0; i<numLinks; i++){
      // Clicking a link will push state
      ls[i].onclick= (function(linktarget){
         return function(){
           var path = linktarget.split('/').pop();
           history.pushState({}, '', path);
           // Hide views other than selected
           $('router > view').forEach((view)=>{
             view.style.display = view.id == path ? '' : 'none';
             view.hidden = false;
           });
           //if(window._onviewchange) window._onviewchange(path);
           return false;
         };
         // link target
      })(ls[i].href);
    }
};
