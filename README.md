enigmatic.js
============

Easy declarative template rendering in vanilla JS    

####Instructions
Mark any Divs you want to render as Hidden    
Inside goes the template    
Make a ready() function    
Call render() on the element with an object or URL to get JSON    

####Helpers
$ document.querySelector    
$$ document.querySelectorAll    
load(script_src, callback);    
get(url, callback);    

````
<script src='enigmatic.js'></script>

{{#items}}
  <div id='stuff' hidden>
  	 {{#items}} 

  	   {{title}} {{url}} <br>

  	 {{/items}}
  </div>
{{/items}}

<script>
  function ready(){
    $('#stuff').render('https://jsonp.nodejitsu.com/?&url=http://api.ihackernews.com/page?format=json');
  }
</script>
````

####Web controls
````
<script src='en.js'></script>
<script src='//dpsw.info/controls.js'></script>

<feedburner n='basstracks.info' control>
````
