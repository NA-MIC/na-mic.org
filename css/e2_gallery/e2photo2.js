// JavaScript Document
function initGallery ( tempgallery, count, first_id, startwidth, startheight ) {

  document.body.setAttribute("onkeydown","KeyDown(event);");
  imggallery = tempgallery;
  if (preloadimg=="yes"){
    for (x=0; x<imggallery.length; x++){
      var myimage=new Image()
      myimage.src=imggallery[x][0]
    }
  }
  thumbnailnum = imggallery.length;
  current_imgid = first_id;
  currentwidth=startwidth;
  currentheight=startheight;    
  width=imggallery[0][9];
  height=imggallery[0][10];
  if(330*(width/height)>490)
    {
    cwidth=490;
    }
  else
    {
    cwidth=330*(width/height);
    }
var setloadersize = new Fx.Styles('main_image_wrapper',{duration:transspeed,onComplete: function(){loadfirstimage(currentwidth,currentheight)}});
     var fademe = new Fx.Style('iptc_info','opacity', {duration:transspeed });
    fademe.set(1,0);

    setloadersize.start({
      'width':[330,cwidth],
      'height':[399,330]      
    });

}


window.addEvent('domready', function() {
initGallery( tempgallery, tempgallery.length, tempgallery[0][8], tempgallery[0][1], tempgallery[0][2], 0 );
});




function KeyDown(e)
{
  if (!e) e=window.event;
  var selectName;
  switch(e.keyCode)
  {
  case 37:
    // Key left.
    previmage(current_imgid);
    break;
  case 39:
    // Key right.
    nextimage(current_imgid);
    break;
  }
}


function getstarted(width, height, loadarea, imgindex, img_id, current_imgid)
{
  var height_custom='';
  var width_custom='';
  if(330*(width/height)>490)
    {
    width=490;
    }
  else
    {
    width=330*(width/height);
    }
  height=330;
  minheight=document.getElementById('left_text').offsetHeight;
  checknext(img_id);
  if(current_imgid!=img_id){
    if(firstimagestart==1){
      currentwidth=firstimagewidth;
      currentheight=firstimageheight;
      firstimagestart=0;
    }
    if(nextorprev==1){
      currentwidth=cwidth;
      currentheight=cheight;
      nextorprev=0;
    }

    modifyimage(loadarea, imgindex, img_id);
    //var resizeDivHeight = new Fx.Styles('main_image_wrapper',{duration:transspeed, onComplete: function(){modifyimage(loadarea, imgindex, img_id);currentheight=height;currentwidth=width;} });
    //var fader = new Fx.Style('imgloader','opacity', {duration:fadespeed, onComplete: function(){  resizeDivHeight.start({'height': [330,330],'width': [currentwidth,width]});} });
    //fader.start(1,0);
    var fadeiptc = new Fx.Style('iptc_btn','opacity', {duration:transspeed });
    fadeiptc.set(0);
    var titlefade = new Fx.Style('imgtitle','opacity', {duration:transspeed });
    titlefade.set(0);
    fadeout=0

      var fademe = new Fx.Style('iptc_info','opacity', {duration:transspeed });
      fademe.set(1,0);;
  }
}


function loadfirstimage(currentwidth,currentheight){

  var fadefirst = new Fx.Style('imgloader','opacity', {duration:fadespeed });
  fadefirst.set(0);
  var firsttitlefade = new Fx.Style('imgtitle','opacity', {duration:transspeed });
  firsttitlefade.set(0);
  function setfirstimage(){
    var height_custom='';
    var width_custom='';
    if(330*(tempgallery[0][9]/tempgallery[0][10])>490)
      {
      tmp=tempgallery[0][10]*(490/tempgallery[0][9]);
      tmp=200-tmp/2;
      width_custom='width=490 style="position:relative;top:'+tmp+'px;';
      }
    else
      {
      width_custom='height=330';
      }
    var newHTML = "<img src='"+tempgallery[0][0]+"' "+height_custom+" "+width_custom+" style=\"cursor:pointer;\"  />";
    //var newHTML = "<img src='"+tempgallery[0][0]+"' "+height_custom+" "+width_custom+" style=\"cursor:pointer;\" onclick=\"javascript:fullres(current_imgid);\" />";
    $('imgloader').setHTML(newHTML);

    var firsttitle=document.getElementById('imgtitle');
    
    var strChUserAgent = navigator.userAgent;
     var intSplitStart = strChUserAgent.indexOf("(",0);
     var intSplitEnd = strChUserAgent.indexOf(")",0);
     var strChStart = strChUserAgent.substring(0,intSplitStart);
     var strChMid = strChUserAgent.substring(intSplitStart, intSplitEnd);
     var strChEnd = strChUserAgent.substring(strChEnd);
    
     if(strChMid.indexOf("MSIE") == -1)
      {
       var main_image_wrapper=document.getElementById('main_image_wrapper');
    main_image_wrapper.setAttribute('onclick','javascript:fullres('+current_imgid+')'); 
      }
    firsttitle.innerHTML="<strong>"+tempgallery[0][4]+"</strong> "+tempgallery[0][7];
    fadefirst.start(0,1);
    //firsttitlefade.start(0,1);
    currentheight=imggallery[0][2];
    currentwidth=imggallery[0][1];
  }
  new Asset.image(imggallery[0][0], {onload: setfirstimage});
  /*firstimageload.onload=function(){
    alert("image loaded");
    var firstimg=document.getElementById('imgloader');
    firstimg.innerHTML=returnimgcode(imggallery[0]);
    var firsttitle=document.getElementById('imgtitle');
    firsttitle.innerHTML="<strong>"+tempgallery[0][4]+"</strong> "+tempgallery[0][7];
    fadefirst.start(0,1);
    firsttitlefade.start(0,1);
    currentheight=imggallery[0][2];
    currentwidth=imggallery[0][1];
  }*/
}

var fullrest_allowed=true;
function nextimage(current_imgid){
  
  fullrest_allowed=false;
  newimgid = Number(current_imgid)+1;
  if(imggallery[newimgid]==undefined)
    {
    return false;
    }
  newwidth =imggallery[newimgid][1]
  newheight =imggallery[newimgid][2]
  newimgindex =imggallery[newimgid][8]
  newimgid = imggallery[newimgid][8]
  cwidth=imggallery[current_imgid][1]
  cheight=imggallery[current_imgid][2]
  checknext(newimgid);
  nextorprev=1;
  height=Number(newheight);
  getstarted(Number(newwidth), height, 'imgloader',Number(newimgindex) ,Number(newimgid) , Number(current_imgid), Number(cwidth), Number(cheight))
  loadinfo();
}

var current_imgid_global=0;

function fullres(current_imgid){
  current_imgid_global=current_imgid;
  setTimeout("fullres2()",100);
}

function fullres2()
  {
  if (fullrest_allowed) 
    {
    window.open(imggallery[current_imgid_global][11], '_blank', config = 'height=600, width=800, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, directories=no, status=no');
    //window.open(imggallery[current_imgid_global][11], '_blank', config = 'height=' + imggallery[current_imgid_global][10] + ',  width=' + imggallery[current_imgid_global][9] + ', toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, directories=no, status=no');
    }
  fullrest_allowed=true;
  }

function previmage(current_imgid){
  
  fullrest_allowed=false;
  newimgid = Number(current_imgid)-1;
  if(imggallery[newimgid]==undefined)
    {
    return false;
    }
  newwidth =imggallery[newimgid][1]
  newheight =imggallery[newimgid][2]
  newimgindex =imggallery[newimgid][8]
  newimgid = imggallery[newimgid][8]
  cwidth=imggallery[current_imgid][1]
  cheight=imggallery[current_imgid][2]
  checknext(newimgid);
  nextorprev=1;
  getstarted(Number(newwidth), Number(newheight), 'imgloader',Number(newimgindex) ,Number(newimgid) , Number(current_imgid), Number(cwidth), Number(cheight))
}


