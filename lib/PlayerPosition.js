/*jslint node: true */

'use strict';

var regex_playTime = /(\d{2}):(\d{2}):(\d{2})\.(\d{2})/;

function PlayerPosition(h, m, s, f){
  this.set(h, m, s, f);
}

PlayerPosition.prototype.copy = function(p){
  this.hours = p.hours;
  this.minutes = p.minutes;
  this.seconds = p.seconds;
  this.frac = p.frac;

  return this;
};

PlayerPosition.prototype.set = function(h, m, s, f){
  if('string' === typeof h){
    var matches = regex_playTime.exec(h);
    if(matches){
      h = +matches[1];
      m = +matches[2];
      s = +matches[3];
      f = +matches[4];
    }
  }

  if(h instanceof PlayerPosition){
    this.copy(h);
  }else{
    this.hours = h;
    this.minutes = m;
    this.seconds = s;
    this.frac = f;
  }

  return this;
};

PlayerPosition.prototype.zero = function(){
  this.hours = 0;
  this.minutes = 0;
  this.seconds = 0;
  this.frac = 0;

  return this;
};

PlayerPosition.prototype.neutralize = function(){
  return this.set();
}

PlayerPosition.prototype.add = function(h, m, s, f){
  this.hours += h;
  this.minutes += m;
  this.seconds += s;
  this.frac += f;

  this.normalize();

  return this;
};

PlayerPosition.prototype.addHours   = function(h){ return this.add(h, 0, 0, 0); };
PlayerPosition.prototype.addMinutes = function(m){ return this.add(0, m, 0, 0); };
PlayerPosition.prototype.addSeconds = function(s){ return this.add(0, 0, s, 0); };
PlayerPosition.prototype.addFrac    = function(f){ return this.add(0, 0, 0, f); };

PlayerPosition.prototype.normalize = function(){
  var overflow;
  overflow = (this.frac / 100) | 0;
  this.frac %= 100;
  
  this.seconds += overflow;
  overflow = (this.seconds / 60) | 0;
  this.seconds %= 60;

  this.minutes += overflow;
  overflow = (this.minutes / 60) | 0;
  this.minutes %= 60;

  this.hours += overflow;

  return this;
};


module.exports = PlayerPosition;