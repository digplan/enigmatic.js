##Description
The "really simple webcontrol" standard defines a HTML element to javascript function binding.    
The result is a technique for simple web components, based on an HTML DOM element activated by JS functionality.  
    
The goal is to provide a very approachable and easy to implement web controls functionality.    
A reference implentation (just a few lines of JavaScript) and Hello World control is included.    

##Specification
1. A *really-simple-webcontrol* is implemented as a simple HTML element with the attribute "control".   
2. The control may have several names and inherits the functionality of each name.   
3. These consist of the tagname and any values in the attribute "control" of the element.   
4. Each name is mapped to a JavaScript function that contains functionality. 
5. That function takes one optional parameter, a callback, for asyncronous operations.  

This is an example of a helloworld control, with a parameter of name, value of "me" and the control keyword.    
````
<helloworld name='me' control>

<script>

  function helloworld(){
    this.innerHTML = 'Hello ' + this.attributes.getNamedItem('name').value;
  }

</script>
````

Displays **hello me** on the page.    
    
Async operations can be done like this.

````
<helloworld name='me' control>

<script>

  function helloworld(){

  	var e = this;

    setTimeout(function(){
      e.innerHTML = 'Hello me!';
    })

    e.innerHTML = 'Hello who?';

  }

</script>
````
