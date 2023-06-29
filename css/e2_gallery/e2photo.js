// JavaScript Document

var currentpos=0;
var currentthumbpos=0;
var moveamount=66;
var thumbnailnum;
var maxthumbvisible = 6; //Define how many thumbnails will be visible at one time in the thumbbox--for now this should only be 3 since it's actually the css that controls the size of the viewable box
var current_imgid=0;
var moving = false;
var finishedsizing=0;
var preloadimg="yes"//Preload images ("yes" or "no"):
var myloadedimage = new Array();
     myloadedimage[0]=1;
var imggallery=new Array()
var firstimagestart=1;
var nextorprev=0;
var fadeout=1;




function loadinfo(){
    var fademe = new Fx.Style('iptc_info','opacity', {duration:transspeed });
    fademe.set(1,0);
}
function areweready(loadarea, imgindex, img_id){
  if ( finishedsizing++ ) {
    modifyimage(loadarea, imgindex, img_id);
    finishedsizing = 0;
  }
}

function modifyimage(loadarea, imgindex, img_id ){
  function loadimagenow(){
    //alert("Load Image Now Called");
    if (document.getElementById) {
        if(current_imgid!=img_id){

          var imgobj=document.getElementById(loadarea);
          var iptch=document.getElementById('iptc_info');
          var photonum=document.getElementById('photocount')
          var phototitle=document.getElementById('imgtitle')
          imgobj.innerHTML=returnimgcode(imggallery[imgindex]);
          
           var strChUserAgent = navigator.userAgent;
           var intSplitStart = strChUserAgent.indexOf("(",0);
           var intSplitEnd = strChUserAgent.indexOf(")",0);
           var strChStart = strChUserAgent.substring(0,intSplitStart);
           var strChMid = strChUserAgent.substring(intSplitStart, intSplitEnd);
           var strChEnd = strChUserAgent.substring(strChEnd);
          
           if(strChMid.indexOf("MSIE") == -1)
            {
            var main_image_wrapper=document.getElementById('main_image_wrapper');
            main_image_wrapper.setAttribute('onclick','javascript:fullres('+imgindex+')'); 
            }
          iptch.innerHTML=returniptc(imggallery[imgindex]);
          photonum.innerHTML=(Number(imgindex)+1)+" of "+imggallery.length+" Photos";
          phototitle.innerHTML="<strong>"+tempgallery[img_id][4]+"</strong> "+tempgallery[img_id][7];
          initImage(loadarea);
          current_imgid=img_id;
          myloadedimage[imgindex]=1;
        }
      }
    return false
  }
  if(myloadedimage[imgindex]==null){
    //var mynewimage=new Image()
    //alert(imggallery[imgindex][0]);
    //var newHTML = "<img src='"+tempgallery[0][0]+"' />";
    //$('imgloader').setHTML(newHTML);
    new Asset.image(imggallery[imgindex][0], {onload: loadimagenow});
    /*mynewimage.src=imggallery[imgindex][0]
    mynewimage.onload=function(){alert("myloadedimage");
        loadimagenow();
      }*/
    }else{
      //alert("calling Load Image Now Called");
      loadimagenow();
  }
}

function returnimgcode(theimg){
  var height_custom='';
  var width_custom='';
  if(330*(theimg[9]/theimg[10])>490)
    {
    tmp=theimg[10]*(490/theimg[9]);
    tmp=200-tmp/2;
    width_custom='width=490 style="position:relative;top:'+tmp+'px;';
    }
  else
    {
    width_custom='height=330';
    }
  var imghtml=""
  if (theimg[1]!="")
    imghtml=''
  imghtml+='<img  src="'+theimg[0]+'" border="0" id="'+theimg[8]+'"  '+height_custom+' '+width_custom+' style="cursor:pointer;" />'
  //imghtml+='<img  src="'+theimg[0]+'" border="0" id="'+theimg[8]+'"  '+height_custom+' '+width_custom+' style="cursor:pointer;" onclick="javascript:fullres(current_imgid);"/>'
  if (theimg[1]!="")
    imghtml+=''
  return imghtml
}
function returniptc(theimg){
  var iptchtml = ''+
      '<table style="margin-right:auto;margin-left:auto;">';
       if (theimg[7].length > 0) 
        {
        iptchtml += ' <tr>' +
        '  <td colspan="2" style="font-size:11px;" align="center" >' +
        theimg[7] +
        '</td>' +
        '</tr>' +
        '</table>';
        }
        var moreToWrite = false;
        if(theimg[4].length>0 || theimg[4].length>0 || theimg[4].length>0) 
        {
            moretoWrite = true;
            iptchtml += '<table style="margin-right:auto;margin-left:auto;">';
        }
       if(theimg[4].length>0)
        {
       iptchtml+='<tr>'+
       ' <td valign="top" style="color:black;font-weight:bold;">Title: </td>'+
       ' <td>'+theimg[4]+'</td>'+
       '</tr>';
        }
       if(theimg[5].length>0)
        {
      iptchtml+=' <tr>'+
       ' <td valign="top" style="color:black;font-weight:bold;">Author: </td>'+
      '  <td>'+theimg[5]+'</td>'+
      ' </tr>';
        }
      if(theimg[6].length>0)
        {
      iptchtml+=' <tr>'+
      '  <td valign="top" style="color:black;font-weight:bold;">Copyright: </td>'+
      '  <td>'+theimg[6]+'</td>'+
      ' </tr>';
        }
      if(moreToWrite == true)
      {
          iptchtml+=' </table>';
      }
  return iptchtml
}

function initImage(imageId) {
  var fader = new Fx.Style(imageId,'opacity', {duration:fadespeed});
  fader.set(0);
  fader.start(0,1);
  var titlefade = new Fx.Style('imgtitle','opacity', {duration:transspeed });
    titlefade.set(0);
    titlefade.start(0,1);
  var fadeiptc = new Fx.Style('iptc_btn','opacity', {duration:transspeed });
    fadeiptc.set(0);
    fadeiptc.start(0,1);

    var fademe = new Fx.Style('iptc_info','opacity', {duration:transspeed });
    fademe.set(1,0);

}

function leftthumb()
  {  
  for (i = 0; i < maxthumbvisible; i++) 
    {
		var pos = addposition('minus');	
		checkbutton(pos);
    movethumbs('plus');
	  if ( pos == 0 )
		  {
			break;	
		  }
    }
  }

function rightthumb()
  {
  for (i = 0; i < maxthumbvisible; i++) 
    {
		var pos = addposition('plus');
		//alert(pos);
		checkbutton(pos);
    movethumbs('minus');
	  /*if ( pos >= thumbnailnum - maxthumbvisible )
		  {
			break;	
		  }*/
    }
  }

function leftone()
  {
  var pos = addposition('minus');
  checkbutton(pos);
  movethumbs('plus');
  }

function rightone()
  {
	var pos = addposition('plus');
  checkbutton(pos);
  movethumbs('minus');
  }

function checkbutton(mynum){
  if ( mynum == 0 ) {
    mm_shl('back2','hidden');
		mm_shl('more2','visible');
  } else if ( mynum < thumbnailnum - maxthumbvisible ) {
		mm_shl('back2','visible');
		mm_shl('more2','visible');
  } else {
		mm_shl('back2','visible');
		mm_shl('more2','hidden');
  }
}
function checknext(mynum){
  thumbmax=(Number(thumbnailnum)-1);
  if ( mynum < 1 ) {
    mm_shl('prev','hidden');
    mm_shl('next','visible');
  } else if ( mynum <  thumbmax ) {
    mm_shl('prev','visible');
    mm_shl('next','visible');
  } else {
    mm_shl('prev','visible');
    mm_shl('next','hidden');
  }
}

function mm_shl() { //v6.0
  var obj,args=arguments;
  if ((obj=MM_findObj(args[0]))!=null) {
    if (obj.style) {
      obj=obj.style;
    }
    obj.visibility=args[1];
  }
}




function dump(arr,level) {
var dumped_text = "";
if(!level) level = 0;

//The padding given at the beginning of the line.
var level_padding = "";
for(var j=0;j<level+1;j++) level_padding += "    ";

if(typeof(arr) == 'object') { //Array/Hashes/Objects
 for(var item in arr) {
  var value = arr[item];
 
  if(typeof(value) == 'object') { //If it is an array,
   dumped_text += level_padding + "'" + item + "' ...\n";
   dumped_text += dump(value,level+1);
  } else {
   dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
  }
 }
} else { //Stings/Chars/Numbers etc.
 dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
}
return dumped_text;
} 


function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function addposition(addwidth){
  if ( !moving ) {
     // if animagic is still moving the image..don't update the current position till it's done
    if(addwidth=="minus"){
      currentpos-=1;
    }else if(addwidth=="plus"){
      currentpos+=1;
    }
  }
  return currentpos;
}
function movethumbs(way){
  if(way=='plus'){
    move=(currentthumbpos+moveamount);
    var movethumbs = new Fx.Styles('thumbgall', {duration: transspeed, transition: Fx.Transitions.quadOut});
    movethumbs.start({ left: [currentthumbpos, move]});
    currentthumbpos+=moveamount;

  }else if(way=='minus'){
    move=(currentthumbpos-moveamount);
    var movethumbs = new Fx.Styles('thumbgall', {duration: transspeed, transition: Fx.Transitions.quadOut});
    movethumbs.start({ left: [currentthumbpos, move]});
    currentthumbpos-=moveamount;
  }
}
function MM_openBrWindow(theURL,winName,features) { //v2.0
  window.open(theURL,winName,features);
}
var thumbopen=0
  function thumbs(){
    var resizethumb = new Fx.Styles('thumbhide',{duration:transspeed, transition: Fx.Transitions.quadOut});
    var movethumbs = new Fx.Styles('thumbbox', {duration: transspeed, transition: Fx.Transitions.quadOut});
    if(thumbopen==1){

      resizethumb.start({'height': 119});
      movethumbs.start({ 'top': [-120, 0]});
      thumbopen=0
    }else{
      resizethumb.start({'height': 0});
      movethumbs.start({ 'top': [0, -120]});
      thumbopen=1
    }
  }
