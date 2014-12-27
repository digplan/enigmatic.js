function autocomplete() {

  ondata.call(this);

  var e = this;
  var size = this.attr('size') || Error('no size');
  e.style.backgroundImage = "url("+this.attr('image')+")";

  // override .renderAll() for getting data
  e.renderAll = function(data){
    this.data = data;
  }

  this.style.position = 'relative';

  var parent = this.parentElement.child();
  parent.style.position = 'fixed';
  parent.style.backgroundColor = 'white';
  parent.style.opacity = '1';
   
  for (var i = 0; i < size; i++) {

    var item = parent.child();
    item.classList.add('acitem');
    item.hidden = true;

    item.onclick = function() {
      e.value = this.data.value;
      e.dispatchData(this.data);
      parent.hidden = true;
    };

    e.onkeyup = function() {

      if (!e.value) {
        e.style.backgroundImage = "url(api.png)";
        parent.children.forEach(function(c) {
          c.hidden = true;
        });
        return parent.hidden = true;
      }

      //var i = 0;
      parent.hidden = false;

      var show = this.data

        .filter(function(i) {
          var ret = i.value.match(RegExp(e.value, 'i'));
          return ret;
        })

        .sort(function(a, b) {
          return a > b;
        });

      parent.children.forEach(function(itemdiv) {
        if (!show.length) return itemdiv.hidden = true;

        var item = show.shift();
        var rx = new RegExp(e.value, 'i');
        var txt = item.value.match(rx)[0];
        txt = item.value.replace(txt, '<b>' + txt + '</b>')

        itemdiv.set('<i class="'+item.class+' left" style=""></i><div style="line-height:auto; margin-left:70px">'+item.value+'</div>');
        itemdiv.data = item;
        itemdiv.hidden = false;

      });

    }

  };

}