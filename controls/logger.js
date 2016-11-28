enig.logger = function(e){
    enig.loadcss('', `
      <style>
        logger {
          position: fixed;
          bottom: 0%;
          border: 1px #dbdbdb solid;
          padding: 10px;
          width: 100%;
          height:20%;
          background-color: #ddd;
          left: 0;
          font-family: Courier;
          font-size:14px;
          overflow:scroll;
          padding: 16px;
        }
      </style>
    `);
    window.onerror = console.log = function(s){
      s = JSON.stringify(s);
      e.innerHTML += `${s}</br>`;
      e.scrollTop = e.scrollHeight;
    };
};
