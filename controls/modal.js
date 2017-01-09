/*
<button onclick='mymodal.open()'>Open Modal</button>
<modal id=mymodal control>
  hey there
</modal>
*/
enig.modal = (e) => {
  e.css(`visibility: hidden; position: fixed; z-index: 1; 
      padding-top: 100px; left: 0; top: 0; width: 100%;
      height: 100%; overflow: auto; background-color: rgb(0,0,0); 
  	  background-color: rgba(0,0,0,0.4);opacity: 0;
      transition: visibility 0s, opacity 0.2s linear;`)
  e.css('visibility: visible; opacity: 1;', 'modal[show]')
  e.css(` background-color: #fefefe;  margin: auto;
          padding: 20px;  border: 1px solid #888;
          width: 80%;`, '.modal-content');
  e.css(` color: #aaaaaa;  float: right;
          font-size: 28px; font-weight: bold; cursor:default`, '.close');
  e.open = (k) => {e.setAttribute('show', true)};
  e.close = (k) => {e.removeAttribute('show')};
  e.innerHTML = `
    <div class="modal-content">
      <span class="close" onclick='mymodal.close()'>×</span>
      <p class=roboto>${e.innerHTML}</p>
    </div>`
};
