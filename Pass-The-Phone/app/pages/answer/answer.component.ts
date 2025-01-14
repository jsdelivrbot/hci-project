import { Component, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";
import {RouterExtensions} from "nativescript-angular/router";

import { WebView, LoadEventData } from "ui/web-view";
import {TriviaQuestion} from "../../shared/triviaQuestion" 
import {TriviaAnswer} from "../../shared/triviaAnswer" 
import {RoundDataProvider} from "../../shared/providers/roundData.provider" 


@Component({
  selector: "answer",
  templateUrl: "pages/answer/answer.html",
  styleUrls: ["pages/answer/answer-common.css"]
})

export class AnswerComponent{

  public choices: Array<TriviaAnswer>;
  public question: string;
  private selectedAnswer: TriviaAnswer;
  private dummyAnswer: TriviaAnswer;

  private currentQuestion: TriviaQuestion;

  public constructor(private router: RouterExtensions, private roundDataProvider: RoundDataProvider) {
    // console.log("Constructing answer.component");
    this.choices = [];

    //need to have dummy otherwise, won't load on UI
    //TODO fix
    this.dummyAnswer = new TriviaAnswer(null,"")
    this.choices.push(this.dummyAnswer);
    this.choices.pop();
    

    this.currentQuestion = roundDataProvider.triviaQuestion

    this.question = this.currentQuestion.question; 
    this.shuffle(this.currentQuestion.triviaAnswers);
    for (let i =0; i<this.currentQuestion.triviaAnswers.length;i++){
      // console.log("question: "+this.currentQuestion.question);
      console.log(i)
      this.choices.push(this.currentQuestion.triviaAnswers[i]);
    }
  }

  private shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

  /*ngAfterViewInit() {
    let webview: WebView = this.webView.nativeElement;
    //let label: Label = this.labelResultRef.nativeElement;
    //label.text = "WebView is still loading...";

    webview.on(WebView.loadFinishedEvent, function (args: LoadEventData) {
        let message;
        if (!args.error) {
            message = "WebView finished loading of " + args.url;
        } else {
            message = "Error loading " + args.url + ": " + args.error;
        }

        //label.text = message;
        console.log("WebView message - " + message);
    });
  }*/

  public onItemTap(args) {
    // console.log("Item Tapped at cell index: " + args.index + " " + args.name);
    if(args.index >-1){
      this.selectedAnswer = this.choices[args.index];
      // console.log ("Chosen: "+this.selectedAnswer.content);

      let correct = this.checkCorrectness(this.selectedAnswer);

      //increasing answer count for this player
      this.roundDataProvider.currentPlayer.answerCount++;

      // increase player points if good answer.
      if(correct){
        this.roundDataProvider.currentPlayer.runningPointsTotal++;
      }else{
        // no point gain or loss
      }

      console.log(this.roundDataProvider.currentPlayer.name + 
        "Player is having: " + 
      this.roundDataProvider.currentPlayer.runningPointsTotal);
      
      this.next(correct, this.selectedAnswer.content);
    }
  }

  private checkCorrectness(answer) : boolean{

    if(this.currentQuestion.triviaCorrectAnswer == answer){
      //answer is correct!
      console.log("Answer is correct!");
      return true;
    }else{
      //answer is wrong
      console.log("Answer is wrong!");
      return false;
    }

  }
  @ViewChild("webview") webView: ElementRef;
  @ViewChild("showWebview") showWebview: ElementRef;
  @ViewChild("answers") listView: ElementRef;
  @ViewChild("selectAnswer") selectAnswer: ElementRef;
  @ViewChild("googleError") googleError: ElementRef;
  @ViewChild("timer") timer: ElementRef;
  public WebViewSRC: string;

  private stopWebview(){
    this.showWebview.nativeElement.visibility = "collapse";
    this.webView.nativeElement.visibility = "hidden";
    this.googleError.nativeElement.text = "20 seconds of Google are up...";
    this.googleError.nativeElement.color = "red";
    this.googleError.nativeElement.visibility="visible"
    this.timer.nativeElement.visibility = "hidden"
  }

  public firstClick: boolean = true;

  private viewWeb(){
    if(this.firstClick){
      this.firstClick = false;
      var countdown = 20000;
      var intervalId = setInterval(()=> {
        countdown -= 100;
        this.timer.nativeElement.text = countdown/1000.0
        if(countdown == 0){
          clearInterval(intervalId);
        } else if(countdown == 10000){
          this.timer.nativeElement.color = "red";
        }
      }, 100);
      setTimeout(() => {
        this.stopWebview();
      }, 20000);
    }
    if(this.webView.nativeElement.visibility == "visible"){
      this.showWebview.nativeElement.text = "Show Google";
      this.webView.nativeElement.visibility = "hidden";
    } else{
      this.showWebview.nativeElement.text = "Hide Google";
      this.webView.nativeElement.visibility = "visible";
      this.selectAnswer.nativeElement.visibility="visible"
    }
    this.WebViewSRC = "https://google.ca/";
    //let label: Label = this.labelResultRef.nativeElement;
    //label.text = "WebView is still loading...";
    console.log("WebView message - " + "ready");
    /*this.webView.nativeElement.on(WebView.loadFinishedEvent, function (args: LoadEventData) {
        let message;
        if (!args.error) {
            message = "WebView finished loading of " + args.url;
        } else {
            message = "Error loading " + args.url + ": " + args.error;
        }

        //label.text = message;
        console.log("WebView message - " + message);
    });*/
  }

  private next(correct,answer_content) {
    this.router.navigate(["answerValidation", correct,answer_content], { clearHistory: true });    
  }
  private quit(){
    this.router.navigate(["start"], { clearHistory: true });
  }
}
