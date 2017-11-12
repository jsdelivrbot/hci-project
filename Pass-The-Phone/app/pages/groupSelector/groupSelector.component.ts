import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import {Team} from "../../shared/team";
import {Player} from "../../shared/player";
import {Group} from "../../shared/group";
import {RoundDataProvider} from "../../shared/providers/roundData.provider";


@Component({
  selector: "groupSelector",
  templateUrl: "pages/groupSelector/groupSelector.html",
  styleUrls: ["pages/groupSelector/groupSelector-common.css"]
})

export class GroupSelectorComponent implements OnInit{
  private groups: Array<Group> = [];
  private progressValue: number;  
  
  private selectedGroup: Group;
  
  public constructor(private router: Router, private rdp: RoundDataProvider) {}
  
  ngOnInit(){
    this.progressValue = 20;
    
    // let player1 = new Player("Sam");
    // let player2 = new Player("Joe");
    // let player3 = new Player("John");
    // let player4 = new Player("Will");
    // let player5 = new Player("Oli");
    // let player6 = new Player("Fab");
    // let player7 = new Player("Flo");
    // let player8 = new Player("Ege");
    // let player9 = new Player("Steve");
    // let player10 = new Player("Asher");
    
    // let groupPlayers1 = [player1, player2, player3];
    // let groupPlayers2 = [player2, player3, player4, player6];
    // let groupPlayers3 = [player4, player5, player6];
    // let groupPlayers4 = [player6, player7, player8, player4];
    // let groupPlayers5 = [player8, player9, player10];
    // let groupPlayers6 = [player1, player2, player3, player4, player5, player6, player7, player8, player9, player10];
    
    // this.groups.push( new Group ("groupPlayers1", groupPlayers1));
    // this.groups.push( new Group ("groupPlayers2", groupPlayers2));
    // this.groups.push( new Group ("groupPlayers3", groupPlayers3));
    // this.groups.push( new Group ("groupPlayers4", groupPlayers4));
    // this.groups.push( new Group ("groupPlayers5", groupPlayers5));
    // this.groups.push( new Group ("groupPlayers6", groupPlayers6));
    
    
    // for(var group of this.groups){
    //   this.rdp.insert_group(group);
    // }
    
    // this.rdp.clearGroups;
    
    for(let i = 0; i <this.groups.length;i++){
      delete this.groups[i];
    }
    
    this.groups= [];
    
    this.rdp.fetch_groups()

    

    console.log("fetch completed... Group count: "+this.rdp.groups.length);

    this.groups=this.rdp.groups;


    
    for(let i =0; i< this.rdp.groups.length; i++){
      console.log("groupName: "+this.rdp.groups[i].name);
      // this.groups.push(group);
    }
    
    // if(this.groups = null){
    //   //first retrie
    //   this.rdp.fetch_groups();
      
    //   for(var group of this.rdp.groups){
    //     console.log("groupName: "+group.name);
    //     this.groups.push(group);
    //   }
    // }


  }
  
  public onItemTap(args) {
    // console.log("Item Tapped at cell index: " + args.index + " " + args.name);
    if(args.index >= 0){
      this.selectedGroup = this.groups[args.index];
      console.log ("Chosen: "+this.selectedGroup.name);
      
      this.rdp.players = this.selectedGroup.players;
      
      this.rdp.group = this.selectedGroup;
      
      console.log("Group: "+ this.rdp.group.name);
      console.log("Players: "+ this.rdp.players);
      
      this.next();
    }
  }
  
  next() {
    this.router.navigate(["modeSelector"])
  }
}
