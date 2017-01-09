/*
<i class="icon ion-navicon fifty padding unfade" onclick='s.show()'></i>
<sidenav id=s control>
  <a href="#">About</a>
  <a href="#">Services</a>
  <a href="#">Clients</a>
  <a href="#">Contact</a>
</sidenav>

*/
enig.sidenav = (e) => {
  e.css(`height: 100%;
    width: 0;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #dbdbdb;
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 60px;`); 
  e.css(` color: #aaaaaa;  float: right; margin-right:20px;
          font-size: 28px; font-weight: bold; cursor:default`, '.close');
  e.show = k => e.style.width = '250px';
  e.hide = k => e.style.width = '0px';
  e.innerHTML = `
      <span class="close" onclick='this.parentElement.hide()'>×</span>
      <br><br>
      <p>${e.innerHTML}</p>
    </div>`
};
