enigmatic.js
============

Really simple web controls  

###Helpers
body [document.body]   
$, $$  [querySelector, querySelectorAll]   
load(javascript_src, callback)    
Element.attr(name)  [get attribute value]
Element.set(value)  [set value or innerHTML of various element types]
Element.child(string, type)  [create element]

Attribute any element as a control.  Controls are defined in JS functions.
````
<script src='//dpsw.info/enigmatic.js'></script>
<mapstatic where='Chicago' control></mapstatic>
<script>
  function mapstatic(e){
    e.child('<img src=\"https://maps.googleapis.com/maps/api/staticmap?center='+e.attr('where')+'&zoom=13&size=600x300&maptype=roadmap\"/>');
    // return string as innerHTML, or object and element id in callable in JS
  }
</script>
````
