import { Injectable } from '@angular/core';


import {TriviaQuestion} from "../triviaQuestion";
import {Team} from "../team";
import {Player} from "../player";
import {Group} from "../group";

@Injectable()
export class RoundDataProvider {
    
    public triviaQuestion: TriviaQuestion; 
    public currentPlayer: Player;
    public group: Group;
    public players : Player[] = [];
    public teams : Team[] = [];
    
    public subjectId: string;
    
    public gameMode: string;
    
    readonly answerCount:number = 1;
    
    public constructor() {}
    
    // Return a player that haven't played more than authorizes times
    // Returns null if no elligible player. Hence need to go to summary page
    public getRandomPlayer(){
        var elligiblePlayers : Player[] = [];
        let j = 0;
        
        //populate elligible players array
        for(let i = 0; i <this.players.length;i++){
            if(this.players[i].answerCount<this.answerCount){
                elligiblePlayers[j]=this.players[i];
                j++;
            }
        }
        
        if(j == 0){
            return null;
        }else{
            let random = Math.floor(Math.random() * j);  
            
            return elligiblePlayers[random];
        }
    }
    
    public calculateTeamCount(){
        let teamCount = 0;
        if( (this.players.length%2 == 0 || this.players.length%3 == 0 ) && this.players.length > 3) {
            //team creation of 2 or 3 player is possible
            if(this.players.length%3 == 0 ){
                //teams of 3 will be created
                teamCount = this.players.length/3;
            }else{
                //teams of 2 will be created
                teamCount = this.players.length/2;
            }
            return teamCount;
            
        }else{
            // no team creation is possible
            return 0;
        }
        
    }
    
    public getExistingAndRemainingPlayers(team): Player[]{
        var noTeamPlayers : Player[] = [];
        let j = 0;
        
        //populate elligible players array
        for(let i = 0; i <this.players.length;i++){
            if(this.players[i].team == null /*|| this.players[i].team == team*/ ){
                noTeamPlayers[j]=this.players[i];
                j++;
            }
        }
        
       return noTeamPlayers;
    }


    public clearData(){
        console.log("Clearing Data...");
        this.triviaQuestion = null; 
        this.currentPlayer= null;
        this.group= null;

        for(let i = 0; i <this.players.length;i++){
            delete this.players[i];
        }

        for(let i = 0; i <this.teams.length;i++){
            delete this.teams[i];
        }

        console.log("PLayers:..");
        
        for(let i = 0; i <this.players.length;i++){
           console.log(this.players[i].name);
        }

        console.log("Teams:..");
        
        for(let i = 0; i <this.teams.length;i++){
           console.log(this.teams[i].name);
        }



        this.players= [];
        this.teams= [];
        
        this.subjectId= "";
        
        this.gameMode= "";
    }
        
}