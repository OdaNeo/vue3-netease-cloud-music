(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["discoverToplist"],{"23b4":function(e,t,a){"use strict";a.r(t);var i=a("7a23"),n={id:"discoverToplist"},r={key:0},c={key:1};function o(e,t,a,o,l,s){var u=Object(i["B"])("recommend"),d=Object(i["B"])("play-list"),m=Object(i["B"])("comments"),p=Object(i["B"])("pagination");return Object(i["t"])(),Object(i["f"])("div",n,[e.topListId?(Object(i["t"])(),Object(i["f"])("div",c,[Object(i["j"])(d,{headerDetail:e.headerDetail,listDetail:e.listDetail},null,8,["headerDetail","listDetail"]),Object(i["j"])(m,{commentsDetail:e.commentsDetail,hotCommentsDetail:e.hotCommentsDetail},null,8,["commentsDetail","hotCommentsDetail"]),Object(i["j"])(p,{pageCount:e.pageCount,onPageNumber:e.pageNumber},null,8,["pageCount","onPageNumber"])])):(Object(i["t"])(),Object(i["f"])("div",r,[Object(i["j"])(u,{topTitle:"特色音乐榜",activeName:e.specialActiveName,topList:e.specialList,cardList:e.specialCardList,onGetid:e.getIdCallBackSpecial},null,8,["activeName","topList","cardList","onGetid"]),Object(i["j"])(u,{topTitle:"全球媒体榜",activeName:e.globalActiveName,topList:e.globalList,cardList:e.globalCardList,onGetid:e.getIdCallBackGlobal},null,8,["activeName","topList","cardList","onGetid"])]))])}a("a4d3"),a("e01a"),a("b0c0"),a("a9e3"),a("d3b7"),a("25f0"),a("96cf");var l=a("1da1"),s=a("5502"),u=a("6c02"),d=a("bca1"),m=a("9b6e"),p=a("961b"),b=a("6407"),v=a("79f6"),g=Object(i["k"])({name:"discoverTopList",components:{Recommend:d["a"],PlayList:m["a"],Comments:p["a"],Pagination:b["a"]},setup:function(){var e=Object(s["b"])(),t=Object(u["d"])(),a=e.state.topListFull,n=Object(i["x"])([]),r=Object(i["x"])([]),c=Object(i["y"])("云音乐飙升榜"),o=Object(i["x"])([]),d=Object(i["x"])([]),m=Object(i["y"])("云音乐说唱榜"),p=Object(i["y"])(0),b=Object(i["x"])([]),g=Object(i["x"])([]),j=Object(i["y"])({}),f=Object(i["x"])([]),O=Object(i["y"])(0),h=function(){var e=Object(l["a"])(regeneratorRuntime.mark((function e(t,a){var i,n,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,v["a"]["httpGET"]("GET_PLAYLIST_DETAIL",{id:t});case 2:for(i=e.sent,n=i.playlist,a[0]={id:"/discover/toplist?id="+n.id.toString(),name:n.name,artist:n.description,picUrl:n.coverImgUrl},r=0;r<10;r++)a[r+1]={id:"/song?id="+n.tracks[r].id.toString(),name:n.tracks[r].name,artist:n.tracks[r].ar[0].name,picUrl:n.tracks[r].al.picUrl};case 6:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),L=function(){for(var t=0;t<5;t++)n[t]=e.state.topListFull[t];h(n[0].id,r)},k=function(){for(var t=5;t<35;t++)o[t-5]=e.state.topListFull[t];h(o[0].id,d)},C=function(e){c.value=e.name,h(e.id,r)},y=function(e){m.value=e.name,h(e.id,d)};a.length?(L(),k()):e.dispatch("getTopListFull").then((function(){L(),k()}));var T=function(){var e=Object(l["a"])(regeneratorRuntime.mark((function e(t,a){var i,n,r,c;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return b.length=0,e.next=3,v["a"]["httpGET"]("GET_COMMENT_PLAYLIST",{id:t,limit:20,offset:a});case 3:for(i=e.sent,n=i.total,r=i.comments,p.value=Math.ceil(n/20),c=0;c<r.length;c++)b[c]={username:r[c].user.nickname,useravatar:r[c].user.avatarUrl,usertype:r[c].user.userType,content:r[c].content,liked:r[c].liked,likedcount:r[c].likedCount,time:r[c].time,replied:{username:r[c].beReplied.length?r[c].beReplied[0].user.nickname:void 0,content:r[c].beReplied.length?r[c].beReplied[0].content:void 0}};case 8:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),w=function(){var e=Object(l["a"])(regeneratorRuntime.mark((function e(t){var a,i,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return f.length=0,e.next=3,v["a"]["httpGET"]("GET_PLAYLIST_DETAIL",{id:t});case 3:for(a=e.sent,i=a.playlist,j.value={name:i.name,coverImgUrl:i.coverImgUrl,description:i.description,trackCount:i.trackCount,playCount:i.playCount,shareCount:i.shareCount,commentCount:i.commentCount,subscribedCount:i.subscribedCount,updateTime:i.updateTime},n=0;n<i.tracks.length;n++)f[n]={name:i.tracks[n].name,id:"/song?id="+i.tracks[n].id,artist:i.tracks[n].ar,artistUrl:"/artist?id="+i.tracks[n].ar[0].id,imgUrl:i.tracks[n].al.picUrl,time:i.tracks[n].dt};case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),N=function(e){T(Number(t.query.id),20*(e-1))};return t.query.id?(O.value=Number(t.query.id),T(Number(t.query.id),0),w(Number(t.query.id)),window.scrollTo({top:0})):(O.value=0,window.scrollTo({top:0})),Object(u["c"])((function(){setTimeout((function(){t.query.id?(O.value=Number(t.query.id),T(Number(t.query.id),0),w(Number(t.query.id)),window.scrollTo({top:0})):(O.value=0,window.scrollTo({top:0}))}),10)})),{specialList:n,specialCardList:r,specialActiveName:c,globalList:o,globalCardList:d,globalActiveName:m,getIdCallBackSpecial:C,getIdCallBackGlobal:y,topListId:O,commentsDetail:b,pageCount:p,pageNumber:N,listDetail:f,headerDetail:j,hotCommentsDetail:g}}});g.render=o;t["default"]=g}}]);