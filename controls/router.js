/*
<a href='javascript:enig.route("view1")'>View 1</a>
<a href='javascript:enig.route("view2")'>View 2</a>
<a href='javascript:enig.route("view3")'>View 3</a>
<a href='javascript:enig.route("view4")'>View 4</a>

<router control>
   <view id=view1 >default view</view>
   <view id=view2 hidden>
      View 2
   </view>
   <view id=view3 hidden>
      View 3
   </view>
   <view id=view4 hidden>
      View 4
   </view>
</router>
*/
enig.router = (e) => {
  enig.route = (name) => {
    history.pushState({}, '', name);
    $('router > view').forEach(v => {v.hidden = v.id != name});
  }
};
