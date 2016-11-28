enig.fbcomments = (e) => {
  e.innerHTML = `<div class="fb-comments" data-href="${location.href}" data-numposts="2"></div>`;
  enig.load(`//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.8&appId=${e.getAttribute('appid')}`);
};