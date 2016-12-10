enig.sidenav = () => {
  loadcss('',`
  sidenav {
  position: fixed;
  right:0;
  background-color: white;
  border: 2px solid black;
  padding: 10px;
  transition: 0.5s;
  display:none;
  `);

  this.toggle = () =>{
    sidenav.style.display = sidenav.style.display=='block' ? 'none':'block';
  }
}
