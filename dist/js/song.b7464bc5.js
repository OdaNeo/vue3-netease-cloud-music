(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["song"],{"0d3b":function(e,t,n){"use strict";n.r(t);var a=n("7a23"),i=Object(a["P"])("data-v-a6e3e3a4");Object(a["w"])("data-v-a6e3e3a4");var r={id:"song"},c={class:"c-song-lyric-container mdui-panel","mdui-panel":""},l={class:"mdui-panel-item mdui-panel-item-open"},u=Object(a["j"])("div",{class:"mdui-panel-item-header"},"歌词",-1),o={class:"mdui-panel-item-body"};Object(a["u"])();var s=i((function(e,t,n,i,s,m){var d=Object(a["B"])("play-list"),p=Object(a["B"])("comments"),b=Object(a["B"])("pagination");return Object(a["t"])(),Object(a["f"])("div",r,[Object(a["j"])(d,{headerDetail:e.headerDetail,listDetail:e.listDetail},null,8,["headerDetail","listDetail"]),Object(a["j"])("div",c,[Object(a["j"])("div",l,[u,Object(a["j"])("div",o,[Object(a["j"])("p",null,Object(a["F"])(e.lyric),1)])])]),Object(a["j"])(p,{commentsDetail:e.commentsDetail,hotCommentsDetail:e.hotCommentsDetail},null,8,["commentsDetail","hotCommentsDetail"]),Object(a["j"])(b,{pageCount:e.pageCount,onPageNumber:e.pageNumber},null,8,["pageCount","onPageNumber"])])})),m=(n("a15b"),n("b0c0"),n("96cf"),n("1da1")),d=n("6c02"),p=n("8ceb"),b=n("9b6e"),j=n("961b"),v=n("6407"),h=n("79f6"),g=Object(a["k"])({name:"Song",components:{PlayList:b["a"],Comments:j["a"],Pagination:v["a"]},setup:function(){var e=Object(d["d"])(),t=Object(a["y"])({}),n=Object(a["x"])([]),i=Object(a["y"])(""),r=Object(a["y"])(0),c=Object(a["x"])([]),l=Object(a["x"])([]),u=Object(a["y"])(""),o=function(e){if(1===e.length)return e[0].name;for(var t=[],n=0;n<e.length;n++)t.push(e[n].name);return t.join("/")},s=function(){var e=Object(m["a"])(regeneratorRuntime.mark((function e(n){var a,r,c,l,u,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,h["a"]["httpGET"]("GET_SONG_DETAIL",{ids:n});case 2:return a=e.sent,r=a.songs,e.next=6,h["a"]["httpGET"]("GET_COMMENT_MUSIC",{id:n});case 6:return c=e.sent,l=c.total,e.next=10,h["a"]["httpGET"]("GET_LYRIC",{id:n});case 10:u=e.sent,s=u.lrc,i.value=s,t.value={name:r[0].name,coverImgUrl:r[0].al.picUrl,commentCount:l,album:r[0].al.name,artistName:o(r[0].ar),artistId:r[0].ar[0].id};case 14:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),b=function(){var e=Object(m["a"])(regeneratorRuntime.mark((function e(t){var n,a,i,u,o,s,m,d=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=d.length>1&&void 0!==d[1]?d[1]:0,c.length=0,e.next=4,h["a"]["httpGET"]("GET_COMMENT_MUSIC",{id:t,offset:n});case 4:if(a=e.sent,i=a.total,u=a.comments,o=a.hotComments,0===n)for(r.value=Math.ceil(i/20),s=0;s<o.length;s++)l[s]={username:o[s].user.nickname,useravatar:o[s].user.avatarUrl,usertype:o[s].user.userType,content:o[s].content,liked:o[s].liked,likedcount:o[s].likedCount,time:o[s].time,replied:{username:o[s].beReplied.length?o[s].beReplied[0].user.nickname:void 0,content:o[s].beReplied.length?o[s].beReplied[0].content:void 0}};else l.length=0;for(m=0;m<u.length;m++)c[m]={username:u[m].user.nickname,useravatar:u[m].user.avatarUrl,usertype:u[m].user.userType,content:u[m].content,liked:u[m].liked,likedcount:u[m].likedCount,time:u[m].time,replied:{username:u[m].beReplied.length?u[m].beReplied[0].user.nickname:void 0,content:u[m].beReplied.length?u[m].beReplied[0].content:void 0}};case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),j=function(e){b(u.value,20*(e-1))};return"string"===typeof e.query.id&&(u.value=e.query.id,s(u.value),b(u.value)),Object(a["r"])((function(){p["a"].mutation()})),{route:e,headerDetail:t,listDetail:n,lyric:i,commentsDetail:c,hotCommentsDetail:l,pageCount:r,pageNumber:j,id:u}}});n("7253");g.render=s,g.__scopeId="data-v-a6e3e3a4";t["default"]=g},"66ec":function(e,t,n){},7253:function(e,t,n){"use strict";n("66ec")}}]);