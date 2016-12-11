enig.a = (e) => {
  e.setValue = (s) => {
    e.setAttribute('href', s);
    e.setAttribute('title', s);
  }
}
