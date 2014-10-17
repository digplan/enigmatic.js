##Description
The "really simple webcontrol" standard defines a HTML element to javascript function binding.    
This allows web app functionality to be encapsulated and declared from within an HTML document.    
    
The goal is to provide a very approachable and easy to implement web controls functionality.    
A reference implentation (just a few lines of JavaScript) and Hello World control is included.    

##Specification
1. A *really-simple-webcontrol* is implemented as a simple HTML element    
2. The tagname is the name of the control and associated JavaScript function    
3. HTML element attributes are passed to the JavaScript function as the first paramter, the element itself as the second parameter    
4. The JavaScript function returns text that will become the innerHTML of the element, and optionally modify the element itself.    

This is an example of a helloworld control, with a parameter of name, value of "me" and the control keyword.    
````
<helloworld name='me' control>

<script>
  function helloworld(params, element){
    return 'hello ' + params.name;
  }
</script>
````

Displays **hello me** on the page.    

##Implementation
A sample implementation may look like this.  Functions are declared in the global scope (window) in this example, but implementations could put all functions in a *window.funcs* scope if namespace collision is a concern.    

````
$$ = document.querySelectorAll.bind(document);

function sliceNodes(what, func){

}

sliceNodes($$('[control]'), function(e) {
  var o = {};
  sliceNodes(e.attributes, function(a) {
    o[a.nodeName] = a.nodeValue;
  });
  e.innerHTML = window[e.tagName.toLowerCase()](o, e);
});
````
