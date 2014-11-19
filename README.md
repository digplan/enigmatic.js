enigmatic.js
============

Easy declarative template rendering in vanilla JS    

####$('')  QuerySelector
####$$('')  QuerySelectorAll
####load(jssrc, callback);
####ajax(verb, url, data, callback);
####get(url, callback)
####post(url, data, callback)
####put(url, data, callback)
####window.delete(url, data, callback)

####Element.child(html)  for creating child Div elements
####Hogan  Auto-loaded for templating

####Easy rendering

Attribute any Divs you want to render as Hidden, call render on element.    

````
<script src='enigmatic.js'></script>

<div id='stuff' hidden>
  	 {{#items}} 
  	   {{title}} {{url}} <br>
  	 {{/items}}
</div>

<script>
  function ready(){
    $('#stuff').render('https://jsonp.nodejitsu.com/?&url=http://api.ihackernews.com/page?format=json');
  }
</script>
````

####Web controls

Attribute any element as a control.  Controls are defined in JS functions.
````
<script src='//dpsw.info/enigmatic.js'></script>
<mapstatic where='Chicago' control></mapstatic>
<script>
  function mapstatic(p,e){
    e.child('<img src=\"https://maps.googleapis.com/maps/api/staticmap?center='+p.where+'&zoom=13&size=600x300&maptype=roadmap\"/>');
    // return string as innerHTML, or object and element id in callable in JS
  }
</script>
````
