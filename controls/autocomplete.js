// <input id=myac data='apilist' placeholder='API' control='autocomplete'> 
enig.autocomplete = e => {
  e.onkeyup = ()=>{
    var url = `https://autocomplete.clearbit.com/v1/companies/suggest?query=${e.value}`
    enig.get(url).then(r=>{ enig.data.apilist = r.json })
  }
  var display = e.parentElement.child();
  e.render = (items) => {
    display.innerHTML = items.message ? '' : items.map(({name,domain,logo})=>`
       <div onclick="${e.id}.value='${name}'; this.parentElement.innerHTML=''"
		style='margin-top:10px;cursor:default'>
		<img style='vertical-align:middle' height=30 src=${logo}> ${name}
       </div>
	`).join('')
  }
}
