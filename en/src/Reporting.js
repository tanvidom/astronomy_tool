
var language1 = "en";
var cluenumber = 0;
var numberofattempts = [0,0,0,0,0,0,0,0];
var degrees_of_position1 = 0;
var degrees_of_position2 = 0;
function sessionstart()
{
  var JsonArray =
  {
  "app_name": "AstRoamer_Element_Hunt_Activity",
  "event_type": "game_start",
  "params":
  {
   "language" : language1
  }

  };
  //pass the method to calculate score.
  saveDataOnExit(JsonArray);
  console.log(JsonArray);
}
function doQuit(score)
 {
JsonArray2 =
{
"app_name": "AstRoamer_Element_Hunt_Activity",
"event_type": "session_end",
"params":
{
  "Final score" : score,

  "language" : language1
}
}
//pass the method to calculate score.
console.log('doQuit1');
console.log(JsonArray2);
saveDataOnExit(JsonArray2);

console.log(JsonArray2);

}

function clueEnd(cluenumber,numberofattempts,degrees_of_position1,degrees_of_position2){
var JsonArray =
{
"app_name": "AstRoamer_Element_Hunt_Activity",
"event_type": "clue_end",
"params":
{
"Currentclue": cluenumber,
"NumberofAttempts" : numberofattempts,
"FirstAttemptAnswer" : degrees_of_position1,
"SecondAttemptAnswer" : degrees_of_position2,
"language" : language1
}

};
//pass the method to calculate score.
saveDataOnExit(JsonArray);
console.log(JsonArray);
}

// function doQuit(){
// var JsonArray =
// {
// "app_name": "policesquadv2",
// "event_type": "session_end",
// "params":
// {
// "MissionsPlayed": playedMission, // Mission attempted [0,0,0,0]  1 is yes
// "MissionsCompleted": completedMission, //Mission completed - yes/ no
// "SessionTimeSpent": getTimeSpent(), //Mission time spent  total
// "highScore": highScore,  //highScore
// "starTotal": gameScore, //starts earned total
// "StorySkiped": StorySkiped,  //story skiped
// "GlossaryDownloaded": GlossaryDownloaded,  //Glossary downloaded
// "helpScreenviewed": helpScreen, //help screen per Mission [0,0,0,0] 1 is yes
// "Mission1Stage": currentstage,
// "Mission2Stage": CurrentStage,
// "Mission3Stage": currentStage,
// "Mission4Stage": currentLevel +1
// }

// };
// //pass the method to calculate score.
// //window.opener.saveDataOnExit(JsonArray);


// }


//starting code for gstudio
var somevariavb =0;
function opneinnewindow(){
somevariavb = window.open('/modules/policequadv2/index.html');
}
function saveDataOnExit(JsonArray)
{
gameReporter.submitData('/tools/logging', JsonArray)
console.log('hi');
}

class GameReporter
{
	constructor(data) {
		this.session_id = this.getCookie('session_uuid')
		// alert(this.getCookie('user_id'))
	}

	submitData(url, data) {
		var user_id = this.getCookie('user_id')
		var data_string = {}
		data_string['user_id'] = this.getCookie('user_id');
		var date = new Date();
		var csrftoken;
		csrftoken = this.getCookie('csrftoken');
    	var timestamp = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
		data_string['created_at'] = timestamp
		for (var key in data) {data_string[key] = data[key];};
		data_string = JSON.stringify(data_string);
	//alert(data_string)
		$.ajax({
                  type: "POST",
                  data:{
                        "user_data":data_string,
                        "app_name":"AstRoamer_Element_Hunt_Activity",
                        'csrfmiddlewaretoken':csrftoken,
                    },
                  url: "/tools/logging",
                  datatype: "json",
                  success: function(data) {
                	//alert(data)
                }
            });
		// return xhr.response
	}
	getCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1);
			if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
		}
        console.log('no uuid found')
        // alert(cname)
	}
}
var gameReporter = new GameReporter();
//returnGameReporter();
