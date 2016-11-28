enig['data-post'] = (e) => {
  e.setValue = (v) => {
    enig.ajax('GET', `http://httpbin.org/get?value=${v}`, null, (resp)=>{
       enig.dataresponse(resp);
    })
  }
}