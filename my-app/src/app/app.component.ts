import { Component, OnInit } from '@angular/core';
import { interval, timer } from 'rxjs';
import { Source } from 'webpack-sources';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'my-app';

  numbers = null;
  subscribe = null;

  viewTimer = '00:00:00';

  isStart = 1; // 0 - Stop, 1 - Start
  isReadInput = false; 
  id = 0;
  arrTimers = [];

  public ngOnInit() : void{

    
  }

  fStartStop() : void{
    console.log('Start / Stop');

    console.log(this.viewTimer);

    this.viewTimer = this.viewTimer == '00:00' ? '00:00:00' :this.viewTimer;

    if( this.viewTimer == ''){
      return;
    }

    var getTime = new Date("1970-01-01T"+this.viewTimer+"Z").getTime();
    getTime = isNaN(getTime) ? 1000 : getTime;
    console.log(this.viewTimer, getTime);

    if(getTime == 0){
      return;
    }

    if(this.isStart == 1){

      this.isReadInput = true;

      this.numbers = interval(1000);
      this.subscribe = this.numbers.subscribe((x) => {

        getTime = getTime - 1000 ; 
        
        var hours = Math.floor((getTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var hoursNum = hours < 10 ? '0'+hours : hours;
        var minutes = Math.floor((getTime % (1000 * 60 * 60)) / (1000 * 60));
        var minutesNum = minutes < 10 ? '0'+minutes : minutes;
        var seconds = Math.floor((getTime % (1000 * 60)) / 1000);
        var secondsNum = seconds < 10 ? '0'+seconds : seconds;
        this.viewTimer = hoursNum+':'+minutesNum+':'+secondsNum;

        if(getTime < 1000){
          this.subscribe.unsubscribe();
          this.isStart = 1;
          this.isReadInput = false;
        }
      });
    }else if(this.isStart == 0){
      this.subscribe.unsubscribe();
      this.isReadInput = false;
    }

    this.isStart = this.isStart == 1 ? 0 : 1;

  }
  fWait() : void{
    console.log('Wait');
    var $this = this;
    setTimeout(function(){
      $this.subscribe.unsubscribe();
      $this.isStart = 1;
    }, 300);
    
  }
  fReset() : void{
    console.log('Reset');

    this.id = 0;
    this.viewTimer = '00:00:00';
    this.isStart = 1;
    this.arrTimers = [];
    this.isReadInput = false;

    this.subscribe.unsubscribe();
  }

}
