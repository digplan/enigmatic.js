/*
<a id=btn>Toggle menu</a>
<menu id=mymenu for=btn control> 
    <li onclick="alert(1)">Alert One</li>
    <li onclick="alert(2)">Alert Two</li>
    <li onclick="alert(3)">Alert Three</li>
    <li onclick="alert(4)">Alert Four</li>
</menu>
*/
enig.menu = (e) => {
    e.css('position: relative;cursor:default;padding: 0;display: none');
    e.css(`background-color: #f9f9f9; min-width: 160px; max-width: 300px;
          list-style: none; padding: 10px; box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.1);
          cursor: arrow; box-sizing: border-box;`, 'menu > li');
    e.css('background-color: #f1f1f1', 'menu li:hover');
    e.show = () => (e.style.display = 'block');
    e.hide = () => (e.style.display = 'none');
    document.addEventListener('click', e.hide);
    var trigger = $('#' + e.getAttribute('for'))[0];
    trigger.onclick = e.show;
    trigger.addEventListener('click', e=>{e.stopPropagation()});
};
