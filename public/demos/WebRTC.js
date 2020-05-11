var conf = {iceServers: [{urls: []}]};
var pc = new RTCPeerConnection(conf);
var _chatChannel;

// HTML Elements
var localOffer = document.getElementById('localOffer');
var localOfferSet = document.getElementById('localOfferSet');
var remoteOffer = document.getElementById('remoteOffer');
var remoteOfferSet = document.getElementById('remoteOfferSet');

function errHandler(err) {
  console.log(err);
}

function sendMsg() {
  var message = document.getElementById('userMsg');
  appendMessage('You', message.value);
  _chatChannel.send(message.value);
  message.value = '';
  return false;
}

pc.ondatachannel = function(e){
  if (e.channel.label == "chatChannel"){
    console.log('chatChannel Received -',e);
    _chatChannel = e.channel;
    chatChannel(e.channel);
  }
};

pc.onicecandidate = function(e){
  var cand = e.candidate;
  if (!cand){
    console.log('iceGatheringState complete',pc.localDescription.sdp);
    localOffer.value = JSON.stringify(pc.localDescription);
  } else {
    console.log(cand.candidate);
  }
}

pc.oniceconnectionstatechange = function(){
	console.log('iceconnectionstatechange: ',pc.iceConnectionState);
}

pc.onaddstream = function(e){
	console.log('remote onaddstream',e.stream);
	remote.src = URL.createObjectURL(e.stream);
}

pc.onconnection = function(e){
	console.log('onconnection ',e);
}

remoteOfferGot.onclick = function() {
  var _remoteOffer = new RTCSessionDescription(JSON.parse(remoteOffer.value));
  console.log('remoteOffer \n',_remoteOffer);
  pc.setRemoteDescription(_remoteOffer).then(function() {
    console.log('setRemoteDescription ok');
    if(_remoteOffer.type == "offer") {
      pc.createAnswer().then(function(description) {
        console.log('createAnswer 200 ok \n',description);
      pc.setLocalDescription(description).then(function() {
      }).catch(errHandler);
      }).catch(errHandler);
    }
  }).catch(errHandler);
}

localOfferSet.onclick = function(){
  _chatChannel = pc.createDataChannel('chatChannel');
  chatChannel(_chatChannel);
  pc.createOffer().then(des => {
    console.log('createOffer ok ');
    pc.setLocalDescription(des).then( ()=>{
      setTimeout(function(){
        if(pc.iceGatheringState == "complete"){
          return;
        } else {
          console.log('after GetherTimeout');
          localOffer.value = JSON.stringify(pc.localDescription);
        }
      }, 2000);
      console.log('setLocalDescription ok');
    }).catch(errHandler);
  }).catch(errHandler);
}

function chatChannel(e){
  _chatChannel.onopen = function(e){
    console.log('chat channel is open', e);
    connectedSign.style.display = 'block';
  }
  _chatChannel.onmessage = function(e){
    appendMessage('Stranger', e.data);
    console.log(e);
  }
  _chatChannel.onclose = function(){
    console.log('chat channel closed');
  }
}