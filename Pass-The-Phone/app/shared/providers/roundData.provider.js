"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Sqlite = require("nativescript-sqlite");
var RoundDataProvider = /** @class */ (function () {
    function RoundDataProvider() {
        // (new Sqlite("passthephone.db")).then(db => {
        //     db.execSQL("CREATE TABLE IF NOT EXISTS players (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, group_id TEXT)").then(id => {
        //         this.database = db;
        //     }, error => {
        //         console.log("CREATE TABLE ERROR", error);
        //     });
        // }, error => {
        //     console.log("OPEN DB ERROR", error);
        // });
        this.players = [];
        this.groups = [];
        this.teams = [];
        this.hasQuestions = false;
        this.answerCount = 2;
        this.playersInRound = [];
        this.groupFetch_completed = false;
        this.hasRemainingPlayers = true;
        // (new Sqlite("passthephone.db")).then(db => {
        //     db.execSQL("CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)").then(id => {
        //         this.database = db;
        //     }, error => {
        //         console.log("CREATE TABLE ERROR", error);
        //     });
        // }, error => {
        //     console.log("OPEN DB ERROR", error);
        // });
    }
    // Return a player that haven't played more than authorizes times
    // Returns null if no elligible player. Hence need to go to summary page
    RoundDataProvider.prototype.getRandomPlayer = function (questionAsker) {
        var elligiblePlayers = [];
        var j = 0;
        var k = 0;
        //populate elligible players array
        console.log("question asker: ".concat(questionAsker));
        for (var i = 0; i < this.players.length; i++) {
            if (this.players[i].answerCount < this.answerCount) {
                console.log("question asker: ".concat(this.players[i].name));
                if (this.players[i].name != questionAsker && this.playersInRound.indexOf(this.players[i].name) < 0 && (this.currentPlayer == null || this.players[i].name != this.currentPlayer.name)) {
                    elligiblePlayers[k] = this.players[i];
                    k++;
                }
                j++;
            }
        }
        if (j == 0) {
            return null;
        }
        else {
            this.hasRemainingPlayers = j > 1;
            console.log(j > 1);
            var random = Math.floor(Math.random() * k);
            console.log("random ".concat((random).toString()));
            console.log("elligible ".concat((elligiblePlayers.length).toString()));
            this.playersInRound.push(elligiblePlayers[random].name);
            if (this.playersInRound.length == this.players.length) {
                console.log("round done");
                this.playersInRound = [];
            }
            return elligiblePlayers[random];
        }
    };
    RoundDataProvider.prototype.calculateTeamCount = function () {
        var teamCount = 0;
        if ((this.players.length % 2 == 0 || this.players.length % 3 == 0) && this.players.length > 3) {
            //team creation of 2 or 3 player is possible
            if (this.players.length % 3 == 0) {
                //teams of 3 will be created
                teamCount = this.players.length / 3;
            }
            else {
                //teams of 2 will be created
                teamCount = this.players.length / 2;
            }
            return teamCount;
        }
        else {
            // no team creation is possible
            return 0;
        }
    };
    RoundDataProvider.prototype.getProgress = function () {
        var questionsAnswered = 0;
        this.players.forEach(function (player) {
            questionsAnswered += player.answerCount;
        });
        return (questionsAnswered / (this.answerCount * this.players.length)) * 100;
    };
    RoundDataProvider.prototype.getPlayersInTeam = function (team) {
        return team.players;
    };
    RoundDataProvider.prototype.getExistingAndRemainingPlayers = function (team) {
        var noTeamPlayers = [];
        var j = 0;
        //populate elligible players array
        for (var i = 0; i < this.players.length; i++) {
            if (this.players[i].team == null /*|| this.players[i].team == team*/) {
                noTeamPlayers[j] = this.players[i];
                j++;
            }
            else if (this.players[i].team.name == team.name) {
                this.players[i].isSelected = true;
                noTeamPlayers[j] = this.players[i];
                j++;
            }
        }
        return noTeamPlayers;
    };
    RoundDataProvider.prototype.clearData = function () {
        console.log("Clearing Data...");
        this.triviaQuestion = null;
        this.currentPlayer = null;
        this.group = null;
        for (var i = 0; i < this.players.length; i++) {
            delete this.players[i];
        }
        for (var i = 0; i < this.teams.length; i++) {
            delete this.teams[i];
        }
        this.players = [];
        this.teams = [];
        this.subjectId = "";
        this.gameMode = "";
    };
    RoundDataProvider = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], RoundDataProvider);
    return RoundDataProvider;
}());
exports.RoundDataProvider = RoundDataProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91bmREYXRhLnByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicm91bmREYXRhLnByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBUTVDO0lBNEJJO1FBQ0ksK0NBQStDO1FBQy9DLHFJQUFxSTtRQUNySSw4QkFBOEI7UUFDOUIsb0JBQW9CO1FBQ3BCLG9EQUFvRDtRQUNwRCxVQUFVO1FBQ1YsZ0JBQWdCO1FBQ2hCLDJDQUEyQztRQUMzQyxNQUFNO1FBaENILFlBQU8sR0FBYyxFQUFFLENBQUM7UUFDeEIsV0FBTSxHQUFhLEVBQUUsQ0FBQztRQUN0QixVQUFLLEdBQVksRUFBRSxDQUFDO1FBQ3BCLGlCQUFZLEdBQVksS0FBSyxDQUFDO1FBVzVCLGdCQUFXLEdBQVUsQ0FBQyxDQUFDO1FBRXpCLG1CQUFjLEdBQWEsRUFBRSxDQUFBO1FBSTdCLHlCQUFvQixHQUFZLEtBQUssQ0FBQztRQXlCdEMsd0JBQW1CLEdBQVksSUFBSSxDQUFDO1FBWHZDLCtDQUErQztRQUMvQyxxSEFBcUg7UUFDckgsOEJBQThCO1FBQzlCLG9CQUFvQjtRQUNwQixvREFBb0Q7UUFDcEQsVUFBVTtRQUNWLGdCQUFnQjtRQUNoQiwyQ0FBMkM7UUFDM0MsTUFBTTtJQUNWLENBQUM7SUFJRCxpRUFBaUU7SUFDakUsd0VBQXdFO0lBQ2pFLDJDQUFlLEdBQXRCLFVBQXVCLGFBQWE7UUFDaEMsSUFBSSxnQkFBZ0IsR0FBYyxFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1Ysa0NBQWtDO1FBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUE7UUFDckQsR0FBRyxDQUFBLENBQUMsSUFBSSxDQUFD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QUMsS0FBSyxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFBQyxDQUFDO1lBQ3JDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QixDQUFDO1FBRUQsSUFBSSxDQUFDLE9BQU8sR0FBRSxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRSxFQUFFLENBQUM7UUFFZixJQUFJLENBQUMsU0FBUyxHQUFFLEVBQUUsQ0FBQztRQUVuQixJQUFJLENBQUMsUUFBUSxHQUFFLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBL0pRLGlCQUFpQjtRQUQ3QixpQkFBVSxFQUFFOztPQUNBLGlCQUFpQixDQXVQN0I7SUFBRCx3QkFBQztDQUFBLEFBdlBELElBdVBDO0FBdlBZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbnZhciBTcWxpdGUgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXNxbGl0ZVwiKTtcblxuaW1wb3J0IHtUcml2aWFRdWVzdGlvbn0gZnJvbSBcIi4uL3RyaXZpYVF1ZXN0aW9uXCI7XG5pbXBvcnQge1RlYW19IGZyb20gXCIuLi90ZWFtXCI7XG5pbXBvcnQge1BsYXllcn0gZnJvbSBcIi4uL3BsYXllclwiO1xuaW1wb3J0IHtHcm91cH0gZnJvbSBcIi4uL2dyb3VwXCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBSb3VuZERhdGFQcm92aWRlciB7XG4gICAgXG4gICAgcHVibGljIHRyaXZpYVF1ZXN0aW9uOiBUcml2aWFRdWVzdGlvbjtcbiAgICBwdWJsaWMgY3VycmVudFBsYXllcjogUGxheWVyO1xuICAgIHB1YmxpYyBncm91cDogR3JvdXA7XG4gICAgcHVibGljIHBsYXllcnMgOiBQbGF5ZXJbXSA9IFtdO1xuICAgIHB1YmxpYyBncm91cHMgOiBHcm91cFtdID0gW107ICAgIFxuICAgIHB1YmxpYyB0ZWFtcyA6IFRlYW1bXSA9IFtdO1xuICAgIHB1YmxpYyBoYXNRdWVzdGlvbnM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwdWJsaWMgcGF0aDogc3RyaW5nO1xuICAgIHB1YmxpYyBxdWVzdGlvbnM6c3RyaW5nW107XG4gICAgcHVibGljIGFuc3dlcnM6W3N0cmluZ1tdXTtcbiAgICBwdWJsaWMgc3ViamVjdElkOiBzdHJpbmc7XG4gICAgcHVibGljIGNhdGVnb3J5OnN0cmluZztcbiAgICBwdWJsaWMgdHlwZTpzdHJpbmc7XG4gICAgcHVibGljIGRpZmZpY3VsdHk6c3RyaW5nO1xuICAgIFxuICAgIHB1YmxpYyBnYW1lTW9kZTogc3RyaW5nO1xuICAgIFxuICAgIHJlYWRvbmx5IGFuc3dlckNvdW50Om51bWJlciA9IDI7XG5cbiAgICBwdWJsaWMgcGxheWVyc0luUm91bmQ6IHN0cmluZ1tdID0gW11cbiAgICBcbiAgICBwcml2YXRlIGRhdGFiYXNlOiBhbnk7XG5cbiAgICBwdWJsaWMgZ3JvdXBGZXRjaF9jb21wbGV0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBcbiAgICBcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8vIChuZXcgU3FsaXRlKFwicGFzc3RoZXBob25lLmRiXCIpKS50aGVuKGRiID0+IHtcbiAgICAgICAgLy8gICAgIGRiLmV4ZWNTUUwoXCJDUkVBVEUgVEFCTEUgSUYgTk9UIEVYSVNUUyBwbGF5ZXJzIChpZCBJTlRFR0VSIFBSSU1BUlkgS0VZIEFVVE9JTkNSRU1FTlQsIG5hbWUgVEVYVCwgZ3JvdXBfaWQgVEVYVClcIikudGhlbihpZCA9PiB7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5kYXRhYmFzZSA9IGRiO1xuICAgICAgICAvLyAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKFwiQ1JFQVRFIFRBQkxFIEVSUk9SXCIsIGVycm9yKTtcbiAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAvLyB9LCBlcnJvciA9PiB7XG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhcIk9QRU4gREIgRVJST1JcIiwgZXJyb3IpO1xuICAgICAgICAvLyB9KTtcbiAgICAgICAgXG4gICAgICAgIC8vIChuZXcgU3FsaXRlKFwicGFzc3RoZXBob25lLmRiXCIpKS50aGVuKGRiID0+IHtcbiAgICAgICAgLy8gICAgIGRiLmV4ZWNTUUwoXCJDUkVBVEUgVEFCTEUgSUYgTk9UIEVYSVNUUyBncm91cHMgKGlkIElOVEVHRVIgUFJJTUFSWSBLRVkgQVVUT0lOQ1JFTUVOVCwgbmFtZSBURVhUKVwiKS50aGVuKGlkID0+IHtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmRhdGFiYXNlID0gZGI7XG4gICAgICAgIC8vICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coXCJDUkVBVEUgVEFCTEUgRVJST1JcIiwgZXJyb3IpO1xuICAgICAgICAvLyAgICAgfSk7XG4gICAgICAgIC8vIH0sIGVycm9yID0+IHtcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKFwiT1BFTiBEQiBFUlJPUlwiLCBlcnJvcik7XG4gICAgICAgIC8vIH0pO1xuICAgIH1cbiAgICBcbiAgICBwdWJsaWMgaGFzUmVtYWluaW5nUGxheWVyczogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvLyBSZXR1cm4gYSBwbGF5ZXIgdGhhdCBoYXZlbid0IHBsYXllZCBtb3JlIHRoYW4gYXV0aG9yaXplcyB0aW1lc1xuICAgIC8vIFJldHVybnMgbnVsbCBpZiBubyBlbGxpZ2libGUgcGxheWVyLiBIZW5jZSBuZWVkIHRvIGdvIHRvIHN1bW1hcnkgcGFnZVxuICAgIHB1YmxpYyBnZXRSYW5kb21QbGF5ZXIocXVlc3Rpb25Bc2tlcil7XG4gICAgICAgIHZhciBlbGxpZ2libGVQbGF5ZXJzIDogUGxheWVyW10gPSBbXTtcbiAgICAgICAgbGV0IGogPSAwO1xuICAgICAgICBsZXQgayA9IDA7XG4gICAgICAgIC8vcG9wdWxhdGUgZWxsaWdpYmxlIHBsYXllcnMgYXJyYXlcbiAgICAgICAgY29uc29sZS5sb2coXCJxdWVzdGlvbiBhc2tlcjogXCIuY29uY2F0KHF1ZXN0aW9uQXNrZXIpKVxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDx0aGlzLnBsYXllcnMubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICBpZih0aGlzLnBsYXllcnNbaV0uYW5zd2VyQ291bnQ8dGhpcy5hbnN3ZXJDb3VudCl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJxdWVzdGlvbiBhc2tlcjogXCIuY29uY2F0KHRoaXMucGxheWVyc1tpXS5uYW1lKSlcbiAgICAgICAgICAgICAgICBpZih0aGlzLnBsYXllcnNbaV0ubmFtZSAhPSBxdWVzdGlvbkFza2VyICYmIHRoaXMucGxheWVyc0luUm91bmQuaW5kZXhPZih0aGlzLnBsYXllcnNbaV0ubmFtZSkgPCAwICYmICh0aGlzLmN1cnJlbnRQbGF5ZXIgPT0gbnVsbCB8fCB0aGlzLnBsYXllcnNbaV0ubmFtZSAhPSB0aGlzLmN1cnJlbnRQbGF5ZXIubmFtZSkpe1xuICAgICAgICAgICAgICAgICAgICBlbGxpZ2libGVQbGF5ZXJzW2tdPXRoaXMucGxheWVyc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgaysrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBqKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYoaiA9PSAwKXtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMuaGFzUmVtYWluaW5nUGxheWVycyA9IGogPiAxO1xuICAgICAgICAgICAgY29uc29sZS5sb2coaiA+IDEpXG4gICAgICAgICAgICBsZXQgcmFuZG9tID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogayk7IFxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJyYW5kb20gXCIuY29uY2F0KChyYW5kb20pLnRvU3RyaW5nKCkpKVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJlbGxpZ2libGUgXCIuY29uY2F0KChlbGxpZ2libGVQbGF5ZXJzLmxlbmd0aCkudG9TdHJpbmcoKSkpXG4gICAgICAgICAgICB0aGlzLnBsYXllcnNJblJvdW5kLnB1c2goZWxsaWdpYmxlUGxheWVyc1tyYW5kb21dLm5hbWUpXG4gICAgICAgICAgICBpZih0aGlzLnBsYXllcnNJblJvdW5kLmxlbmd0aCA9PSB0aGlzLnBsYXllcnMubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJvdW5kIGRvbmVcIilcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllcnNJblJvdW5kID0gW11cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBlbGxpZ2libGVQbGF5ZXJzW3JhbmRvbV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcHVibGljIGNhbGN1bGF0ZVRlYW1Db3VudCgpe1xuICAgICAgICBsZXQgdGVhbUNvdW50ID0gMDtcbiAgICAgICAgaWYoICh0aGlzLnBsYXllcnMubGVuZ3RoJTIgPT0gMCB8fCB0aGlzLnBsYXllcnMubGVuZ3RoJTMgPT0gMCApICYmIHRoaXMucGxheWVycy5sZW5ndGggPiAzKSB7XG4gICAgICAgICAgICAvL3RlYW0gY3JlYXRpb24gb2YgMiBvciAzIHBsYXllciBpcyBwb3NzaWJsZVxuICAgICAgICAgICAgaWYodGhpcy5wbGF5ZXJzLmxlbmd0aCUzID09IDAgKXtcbiAgICAgICAgICAgICAgICAvL3RlYW1zIG9mIDMgd2lsbCBiZSBjcmVhdGVkXG4gICAgICAgICAgICAgICAgdGVhbUNvdW50ID0gdGhpcy5wbGF5ZXJzLmxlbmd0aC8zO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgLy90ZWFtcyBvZiAyIHdpbGwgYmUgY3JlYXRlZFxuICAgICAgICAgICAgICAgIHRlYW1Db3VudCA9IHRoaXMucGxheWVycy5sZW5ndGgvMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0ZWFtQ291bnQ7XG4gICAgICAgICAgICBcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAvLyBubyB0ZWFtIGNyZWF0aW9uIGlzIHBvc3NpYmxlXG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0UHJvZ3Jlc3MoKXtcbiAgICAgICAgdmFyIHF1ZXN0aW9uc0Fuc3dlcmVkIDogbnVtYmVyID0gMDtcbiAgICAgICAgdGhpcy5wbGF5ZXJzLmZvckVhY2gocGxheWVyID0+e1xuICAgICAgICAgICAgcXVlc3Rpb25zQW5zd2VyZWQgKz0gcGxheWVyLmFuc3dlckNvdW50O1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIChxdWVzdGlvbnNBbnN3ZXJlZC8odGhpcy5hbnN3ZXJDb3VudCAqIHRoaXMucGxheWVycy5sZW5ndGgpKSAqIDEwMDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0UGxheWVyc0luVGVhbSh0ZWFtOiBUZWFtKTogUGxheWVyW117XG4gICAgICAgIHJldHVybiB0ZWFtLnBsYXllcnM7XG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBnZXRFeGlzdGluZ0FuZFJlbWFpbmluZ1BsYXllcnModGVhbTogVGVhbSk6IFBsYXllcltde1xuICAgICAgICB2YXIgbm9UZWFtUGxheWVycyA6IFBsYXllcltdID0gW107XG4gICAgICAgIGxldCBqID0gMDtcbiAgICAgICAgXG4gICAgICAgIC8vcG9wdWxhdGUgZWxsaWdpYmxlIHBsYXllcnMgYXJyYXlcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8dGhpcy5wbGF5ZXJzLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgaWYodGhpcy5wbGF5ZXJzW2ldLnRlYW0gPT0gbnVsbCAvKnx8IHRoaXMucGxheWVyc1tpXS50ZWFtID09IHRlYW0qLyApe1xuICAgICAgICAgICAgICAgIG5vVGVhbVBsYXllcnNbal09dGhpcy5wbGF5ZXJzW2ldO1xuICAgICAgICAgICAgICAgIGorKztcbiAgICAgICAgICAgIH0gZWxzZSBpZih0aGlzLnBsYXllcnNbaV0udGVhbS5uYW1lID09ICB0ZWFtLm5hbWUpe1xuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyc1tpXS5pc1NlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBub1RlYW1QbGF5ZXJzW2pdPXRoaXMucGxheWVyc1tpXTtcbiAgICAgICAgICAgICAgICBqKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBub1RlYW1QbGF5ZXJzO1xuICAgIH1cbiAgICBcbiAgICBcbiAgICBwdWJsaWMgY2xlYXJEYXRhKCl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ2xlYXJpbmcgRGF0YS4uLlwiKTtcbiAgICAgICAgdGhpcy50cml2aWFRdWVzdGlvbiA9IG51bGw7IFxuICAgICAgICB0aGlzLmN1cnJlbnRQbGF5ZXI9IG51bGw7XG4gICAgICAgIHRoaXMuZ3JvdXA9IG51bGw7XG4gICAgICAgIFxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDx0aGlzLnBsYXllcnMubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5wbGF5ZXJzW2ldO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDx0aGlzLnRlYW1zLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMudGVhbXNbaV07XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMucGxheWVycz0gW107XG4gICAgICAgIHRoaXMudGVhbXM9IFtdO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5zdWJqZWN0SWQ9IFwiXCI7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmdhbWVNb2RlPSBcIlwiO1xuICAgIH1cbiAgICBcbiAgICAvLyBwdWJsaWMgY2xlYXJHcm91cHMoKXtcbiAgICAgICAgXG4gICAgLy8gICAgIGZvcihsZXQgaSA9IDA7IGkgPHRoaXMuZ3JvdXBzLmxlbmd0aDtpKyspe1xuICAgIC8vICAgICAgICAgZGVsZXRlIHRoaXMuZ3JvdXBzW2ldO1xuICAgIC8vICAgICB9XG4gICAgICAgIFxuICAgIC8vICAgICB0aGlzLmdyb3Vwcz0gW107XG4gICAgLy8gfVxuICAgIFxuLy8gICAgIHB1YmxpYyBpbnNlcnRfZ3JvdXAoZ3JvdXA6R3JvdXApIHsgICAgICAgIFxuLy8gICAgICAgICB0aGlzLmRhdGFiYXNlLmV4ZWNTUUwoXCJJTlNFUlQgSU5UTyBncm91cHMgKG5hbWUpIFZBTFVFUyAoPylcIiwgW2dyb3VwLm5hbWVdKS50aGVuKGlkID0+IHtcbi8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSU5TRVJUIFJFU1VMVFwiLCBpZCk7XG4vLyAgICAgICAgICAgICBncm91cC5pZD1pZDtcbi8vICAgICAgICAgICAgIC8vIHRoaXMuZmV0Y2goKTtcbi8vICAgICAgICAgICAgIHRoaXMuaW5zZXJ0X2dyb3VwX3BsYXllcnMoZ3JvdXApO1xuLy8gICAgICAgICB9LCBlcnJvciA9PiB7XG4vLyAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIklOU0VSVCBFUlJPUlwiLCBlcnJvcik7XG4vLyAgICAgICAgIH0pO1xuLy8gICAgIH1cbiAgICBcbi8vICAgICBwcml2YXRlIGluc2VydF9ncm91cF9wbGF5ZXJzKGdyb3VwOkdyb3VwKSB7XG4gICAgICAgIFxuLy8gICAgICAgICBsZXQgaW5zZXJ0X3BsYXllcnMgPSBncm91cC5wbGF5ZXJzO1xuICAgICAgICBcbi8vICAgICAgICAgZm9yICh2YXIgcGxheWVyIG9mIGluc2VydF9wbGF5ZXJzKXtcbi8vICAgICAgICAgICAgIHRoaXMuZGF0YWJhc2UuZXhlY1NRTChcIklOU0VSVCBJTlRPIHBsYXllcnMgKG5hbWUsIGdyb3VwX2lkKSBWQUxVRVMgKD8sID8pXCIsIFtwbGF5ZXIubmFtZSwgZ3JvdXAuaWRdKS50aGVuKGlkID0+IHtcbi8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIklOU0VSVCBSRVNVTFRcIiwgaWQpO1xuLy8gICAgICAgICAgICAgICAgIC8vIHRoaXMuZmV0Y2goKTtcbi8vICAgICAgICAgICAgIH0sIGVycm9yID0+IHtcbi8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIklOU0VSVCBFUlJPUlwiLCBlcnJvcik7XG4vLyAgICAgICAgICAgICB9KTtcbi8vICAgICAgICAgfVxuLy8gICAgIH1cbiAgICBcbi8vICAgICBwdWJsaWMgZmV0Y2hfZ3JvdXBzKCkge1xuLy8gICAgICAgICAvL1RPRE8uIEZldGNoIHJlY29zdHJ1Y3RzIG9iamVjdHMgYmFzZWQgb24gaWQuXG4gICAgICAgIFxuLy8gICAgICAgICBjb25zb2xlLmxvZyhcImZldGNoaW5nIGdyb3Vwcy4uLlwiKTtcbiAgICAgICAgXG4vLyAgICAgICAgIC8vIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgXG4vLyAgICAgICAgIHRoaXMuZGF0YWJhc2UuYWxsKFwiU0VMRUNUICogRlJPTSBncm91cHNcIikudGhlbihyb3dzID0+IHtcbi8vICAgICAgICAgICAgIHRoaXMuZ3JvdXBzID0gW107XG4vLyAgICAgICAgICAgICBmb3IodmFyIHJvdyBpbiByb3dzKSB7XG4vLyAgICAgICAgICAgICAgICAgdGhpcy5ncm91cHMucHVzaCh7XG4vLyAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjpyb3dzW3Jvd11bMF0sXG4vLyAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOnJvd3Nbcm93XVsxXSxcbi8vICAgICAgICAgICAgICAgICAgICAgXCJwbGF5ZXJzTmFtZVwiOlwiXCIsXG4vLyAgICAgICAgICAgICAgICAgICAgIFwicGxheWVyc1wiOm51bGxcbi8vICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICApO1xuLy8gICAgICAgICAgICAgbGV0IGxhc3RHcm91cCA9IHRoaXMuZ3JvdXBzW3RoaXMuZ3JvdXBzLmxlbmd0aC0xXTtcbi8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibmV3IGdyb3VwOiBcIitsYXN0R3JvdXAubmFtZSk7XG4vLyAgICAgICAgICAgICBsYXN0R3JvdXAucGxheWVycz0gdGhpcy5mZXRjaF9ncm91cF9wbGF5ZXJzKGxhc3RHcm91cCk7XG4vLyAgICAgICAgIH1cbi8vICAgICB9LCBlcnJvciA9PiB7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKFwiU0VMRUNUIEVSUk9SXCIsIGVycm9yKTtcbi8vICAgICB9KTtcbi8vICAgICB0aGlzLmdyb3VwRmV0Y2hfY29tcGxldGVkPXRydWU7XG4vLyB9XG5cbi8vIHB1YmxpYyBmZXRjaF9ncm91cF9wbGF5ZXJzKGdyb3VwOkdyb3VwKXtcbi8vICAgICBsZXQgZ3JvdXBfcGxheWVyczogUGxheWVyW109W107XG4gICAgXG4vLyAgICAgY29uc29sZS5sb2coXCJGZXRjaGluZyBncm91cCBwbGF5ZXJzOiBcIitncm91cC5pZCk7XG5cbiAgICBcbi8vICAgICB0aGlzLmRhdGFiYXNlLmFsbChcIlNFTEVDVCAqIEZST00gcGxheWVycyB3aGVyZSBpZCA9IDFcIikudGhlbihyb3dzID0+IHtcbi8vICAgICAgICAgZ3JvdXBfcGxheWVycyA9IFtdO1xuLy8gICAgICAgICBmb3IodmFyIHJvdyBpbiByb3dzKSB7XG4vLyAgICAgICAgICAgICBncm91cF9wbGF5ZXJzLnB1c2goe1xuLy8gICAgICAgICAgICAgICAgIFwiaWRcIjpyb3dzW3Jvd11bMF0sXG4vLyAgICAgICAgICAgICAgICAgXCJuYW1lXCI6cm93c1tyb3ddWzFdLFxuLy8gICAgICAgICAgICAgICAgIFwiYW5zd2VyQ291bnRcIjogMCxcbi8vICAgICAgICAgICAgICAgICBcInJ1bm5pbmdQb2ludHNUb3RhbFwiOiAwLFxuLy8gICAgICAgICAgICAgICAgIFwidGVhbVwiOiBudWxsLFxuLy8gICAgICAgICAgICAgICAgIFwiaXNTZWxlY3RlZFwiOmZhbHNlXG4vLyAgICAgICAgICAgICB9KTtcbi8vICAgICAgICAgfVxuLy8gICAgIH0sIGVycm9yID0+IHtcbi8vICAgICAgICAgY29uc29sZS5sb2coXCJTRUxFQ1QgRVJST1JcIiwgZXJyb3IpO1xuLy8gICAgIH0pO1xuICAgIFxuLy8gICAgIHJldHVybiBncm91cF9wbGF5ZXJzO1xuLy8gfVxuXG59Il19