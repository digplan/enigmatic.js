enig.menu = (e) => {
    enig.loadcss('', `
      <style>
        menu {
          position: relative;
        }
        menu > li {
          background-color: #f9f9f9;
          min-width: 160px;
          max-width: 300px;
          list-style: none;
          padding: 10px;
          box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.1);
          cursor: arrow;
          text-decoration: none;
        }
        menu li:hover {
          background-color: #f1f1f1;
        }
      </style>
    `);
    e.style.display = 'none';
    
    e.toggle = () => {
      e.style.display = e.style.display == 'none' ? 'block':'none';
    };
    
    document.addEventListener('click', (ev) => {
       //if(ev.target.parentElement.id == e.id) return;
       if(ev.target.id == e.getAttribute('for')) return;
       e.style.display = 'none';
    })
    
    if(!e.hasAttribute('contextmenu')) return;
    
    window.oncontextmenu = function(ev) {
        e.style.display = 'block';
        var pos = window.cpos;
        e.style.position = 'fixed';
        e.style.top = `${ev.clientY}px`;
        e.style.left = `${ev.clientX-30}px`;
        ev.stopPropagation();
        return false;
    }
    
};