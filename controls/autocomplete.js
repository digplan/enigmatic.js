function autocomplete() {

  ondata.call(this);

  var e = this;
  var size = this.attr('size');
  e.style.backgroundImage = "url("+this.attr('image')+")";

  // override .set() for getting data
  e.set = function(data){
    this.data = data;
  }

  var parent = body.child('', 'div');
  parent.className = 'menu';
 
  for (var i = 0; i < size; i++) {

    var item = parent.child('', 'div');
    item.classList.add('acitem');
    item.hidden = true;

    item.onclick = function() {
      e.value = this.obj.value;
      e.style.backgroundImage = "url(" + this.icon + ")";
      e.dispatchData(this.obj);
      parent.hidden = true;
    };

    e.onkeyup = function() {

      var arr = this.data;

      if (!e.value) {
        e.style.backgroundImage = "url(api.png)";
        parent.children.forEach(function(c) {
          c.hidden = true;
        });
        return parent.hidden = true;
      }

      var i = 0;
      parent.hidden = false;

      var show = arr.slice(0)

        .filter(function(i) {
          var ret = i.value.match(RegExp(e.value, 'i'));
          return ret;
        })

        .sort(function(a, b) {
          return a > b;
        });

      parent.children.forEach(function(item) {
        if (!show.length) return item.hidden = true;

        var results = show.shift();

        var rx = new RegExp(e.value, 'i');
        var txt = results.value.match(rx)[0];
        item.set(results.value.replace(txt, '<b>' + txt + '</b>'));
        item.style.backgroundImage = "url(" + results.icon + ")";
        item.val = results.value;
        item.icon = results.icon;
        item.obj = results;
        item.hidden = false;

      });

    }

  };

}

/* test
body.innerHTML = '';
var ac = body.child('', 'input');
ac.id = 'yea';
ac.setAttribute('control', 'autocomplete');
ac.setAttribute('size', '3');
ac.setAttribute('image', 'api.png');
ac.style.width = '300px';
ac.classList.add = 'autocomplete';
ac.data = [{"value": "Microwallet","icon": "microwallet.png"},{"value": "Blockchain","icon": "blockchain.jpg"}];

var catcher = body.control('', 'ondata', {datafrom: 'yea.value'});

body.controls();

*/