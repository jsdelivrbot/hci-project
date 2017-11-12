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

    public path: string;
    
    public subjectId: string;
    
    public gameMode: string;
    
    readonly answerCount:number = 2;

    public playersInRound: string[] = []
    
    public constructor() {}
    
    public hasRemainingPlayers: boolean = true;

    // Return a player that haven't played more than authorizes times
    // Returns null if no elligible player. Hence need to go to summary page
    public getRandomPlayer(){
        var elligiblePlayers : Player[] = [];
        let j = 0;
        let k = 0;
        //populate elligible players array
        for(let i = 0; i <this.players.length;i++){
            if(this.players[i].answerCount<this.answerCount){
                if(this.playersInRound.indexOf(this.players[i].name) < 0 && (this.currentPlayer == null || this.players[i].name != this.currentPlayer.name)){
                    elligiblePlayers[k]=this.players[i];
                    k++;
                }
                j++;
            }
        }
        if(j == 0){
            return null;
        }else{
            this.hasRemainingPlayers = j > 1;
            console.log(j > 1)
            let random = Math.floor(Math.random() * k);  
            this.playersInRound.push(elligiblePlayers[random].name)
            if(this.playersInRound.length == this.players.length){
                console.log("round done")
                this.playersInRound = []
            }
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

    public getPlayersInTeam(team: Team): Player[]{
        return team.players;
    }
    
    public getExistingAndRemainingPlayers(team: Team): Player[]{
        var noTeamPlayers : Player[] = [];
        let j = 0;
        
        //populate elligible players array
        for(let i = 0; i <this.players.length;i++){
            if(this.players[i].team == null /*|| this.players[i].team == team*/ ){
                noTeamPlayers[j]=this.players[i];
                j++;
            } else if(this.players[i].team.name ==  team.name){
                this.players[i].isSelected = true;
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

        this.players= [];
        this.teams= [];
        
        this.subjectId= "";
        
        this.gameMode= "";
    }
        
}