enigmatic.js
============

Really simple web controls  

###Helpers
body [document.body]   
$, $$  [querySelector, querySelectorAll] 
Element.$, $$  [querySelector, querySelectorAll] 
load(javascript_src, callback)    
Element.attr(name)  [get attribute value]    
Element.set(value)  [set value or innerHTML of various element types]    
Element.child(s, type, attrs, classes, style) [create element]    
Element.controls()  [process controls under any element]   
Element.render(obj) [render element using innerHTML as template]
Element.renderAll(arr)
NodeList.forEach = Array.prototype.forEach;
HTMLCollection.forEach = Array.prototype.forEach;    

Attribute any element as a control.  Controls are defined in JS functions.
````
<script src='enigmatic.js'></script>
<mapstatic where='Chicago' control></mapstatic>
<!--
  or this does the same: <div where='Chicago' control='mapstatic'></div>
-->
<script>
  function mapstatic(){
    this.child('<img src=\"https://maps.googleapis.com/maps/api/staticmap?center='+e.attr('where')+'&zoom=13&size=600x300&maptype=roadmap\"/>');
  }
  
  // optional - upon completion of processing controls
  function ready(){
    // do this
  }
</script>
````
