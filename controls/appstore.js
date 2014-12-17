function appstore(){
  this.innerHTML = '<meta name="apple-itunes-app" content="app-id={{id}}">'.replace('{{id}}', this.attr('id'));
}

// usage <appstore id='317642398'>   
// viewable on ios only
