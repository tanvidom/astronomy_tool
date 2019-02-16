 window.onload = function()
 {
 var background = [];
 var question_text_upper;
 var question_text_lower;
 var clue_board;
 var sun_pic;
 var rotate_sound;
 var yay_sound;
 var treasure_sound;
 var click_sound;
 var earth_np; //north pole view of earth
 var tips = [];
 var z = 0;//counter for degrees_of_position
 var bounce;
 var count_no_of_attempts = [0,0,0,0,0,0,0,0];
 var degrees_of_position = [];
 var check = [];
 var rotation = [];
 var holders = [];
 var reset_btn = [];
 var country = [];
 var time_of_day= [];
 var elementname = [];
 var input_answer = [];
 var country_name = [' India’s','Australia','Russia','Peru','Mexico','Brazil','Egypt','South Africa'];
 var elementname_text = ['Copper','Lithium','Cobalt','Tin','Silver','Platinum','Gold.','Carbon'];
 var time_of_day_text = ['noon','sunset','midnight','start of the new day;','Sun is about to set;','high in the sky;','morning','midnight;']
 var p1 = 0;
 var rules_button;
 var demo_button;
 var reg={};
 var help_button;
 var game = new Phaser.Game(800, 640);
 var submit_buttons = [];
 var next_buttons = [];
 var clue_name;
 var clue_number;
 var clue_number1 = ['Clue 1','Clue 2','Clue 3','Clue 4','Clue 5','Clue 6','Clue 7','Clue 8'];
 var clue_line_one = [];
 var clue_line_two = [];
 var clue_text1;
 var element_holder_names = ['GOLD_IN','PLATINUM_IN','TIN_IN','copper_IN','COBALT_IN','SILVER_IN','LITHIUM_IN','CARBON_IN'];
 var instruction_text;
 var instruction_text_content = 'Rotate the Earth to the correct position and click             to check your answer.';
 var clockwise_arrow;
 var anticlockwise_arrow;
 var screen_text = [];
 var start_button;
 var element_hunter_names = [];
 var earth_images = [];
 var next_button;
 var fill_elements = [0,0,0,0,0,0,0,0];
 var elements = [];
 var score = 0;
 //code for starting screen
 var start_screen = function(game){}
 start_screen.prototype =
 {
  init : function()
  {
     game.load = new CustomLoader(game);
  },
   preload : function()
  {
   game.load.atlasJSONHash('buttons','assets/buttons_en.png','assets/buttons_en.json');
   game.load.atlasJSONHash('demo','assets/demo.png','assets/demo.json');
   game.load.webfont('tahoma','Tahoma');
   game.load.image('rules','assets/rule_popup.jpg');

 },
  create : function()
  {
     sessionstart();
     reg.modal = new gameModal(game);
       this.createModals();
  background[0] = game.add.sprite(0,0,'demo','INTROSCREEN_BG');
  //submit_button = game.add.button()
  var style = { font: "23px tahoma", fill: "#00C7FF", boundsAlignH: "center", boundsAlignV: "middle" };
  screen_text[0] = game.add.text(167,100,'AstRoamer: What is the time?',style);
  var style1 = { font: "16px tahoma", fill: "#00C7FF", boundsAlignH: "center", boundsAlignV: "middle" };
  screen_text[1] = game.add.text(165,166,'Elements are the building blocks of the universe. The International Element Search Institute is offering a reward to element hunters who find these precious elements. To win the reward, you and your teammate must decode the clues sent by the Institute’s satellite to locate and collect the elements. There are eight elements up for grabs. The team that collects the most elements wins! Are you ready?',style1);
  screen_text[1].wordWrap = true;
  screen_text[1].wordWrapWidth = 380;
  var style2 = { font: "16px tahoma", fill: "#F0E6DB", boundsAlignH: "center", boundsAlignV: "middle" };
  var style5 = { font: "16px tahoma", fill: "#00C7FF", boundsAlignH: "center", boundsAlignV: "middle" };
  var screen_text5 = game.add.text(162,465,'Note : The images of the earth in the activity are not to scale and motion \n of Earth is only illustrative, not accurate.',style5);

  screen_text[2] = game.add.text(162,375,'Click the Rules button to read the rules of the activity.',style2);
  screen_text[3] = game.add.text(162,405,'Click the Demo button to watch a demo of how to collect the elements.',style2);
  screen_text[4] = game.add.text(162,435,'Click Start to begin.',style2);
  start_button = game.add.button(362,531,'demo',this.start_function,this,'START_BUTTON_ROLL_OVER','START_BUTTON_NORMAL','START_BUTTON_MOUSE_DOWN');
  rules_button = game.add.button(629,140,'demo',this.rules_button_function,this,'RULE_BUTTON_HIGHLIGHTED','RULE_BUTTON_NOT_HIGHLIGHTED','RULE_BUTTON_HIGHLIGHTED');
  demo_button = game.add.button(629,172,'demo',this.demo_button_function,this,'DEMO_BUTTON_HIGHLIGHTED','DEMO_BUTTON_NOT_HIGHLIGHTED','DEMO_BUTTON_HIGHLIGHTED');

  },
  rules_button_function : function()
  {
    this.showModal1();
  },
  demo_button_function : function()
  {
   game.state.start('VideoScreen');
  },
  start_function : function()
  {

    game.state.start('hunter_name_screen');
  },
   createModals: function() {

     reg.modal.createModal({
        type: "modal1",
        includeBackground: true,
        modalCloseOnInput: false,
        itemsArr: [{
            type: 'image',
            //atlasParent :'demo',
            content : 'rules'


          },
          {
            type: "sprite",
            atlasParent : 'buttons',
            content: 'CLOSE_BUTTON_NORMAL',
            offsetX: 220,
            offsetY: -270,
            callback: function()
                    {
                      reg.modal.hideModal("modal1");
                    }
        },
           {

           type : "text",
           content: "Click X to continue.",
          offsetX : 0,
          offsetY: 260,
          fontFamily: "tahoma",
          fontSize: 15,
          align: "left",
          color: "0xeeeeee",

        },


          ]

    });
  },
  showModal1:function()
  {
    // yay_sound.play('',0,1);
    reg.modal.showModal("modal1");
},
  /*render : function()
         {
          game.debug.text('x: ' + game.input.x + ' y: ' + game.input.y, 32, 32);
          }, */

 }
 var hunter_name_screen = function(game){}
 hunter_name_screen.prototype =
 {
  init : function()
  {
     game.load = new CustomLoader(game);
  },
  preload : function()
  {
   game.add.plugin(PhaserInput.Plugin);
   game.load.atlasJSONHash('game_astri','assets/all_screen_astro_2.png','assets/all_screen_astro_2.json');
   game.load.atlasJSONHash('buttons','assets/buttons_en.png','assets/buttons_en.json');
   game.load.atlasJSONHash('demo','assets/demo.png','assets/demo.json');
   game.load.webfont('tahoma','Tahoma');
 },
  create : function()
  {
   // reg.modal = new gameModal(game);
     //  this.createModals();
   background[1] = game.add.sprite(0,0,'demo','SELECT HEMISPHERE_BG');
   var style = { font: "23px tahoma", fill: "#00C7FF", boundsAlignH: "center", boundsAlignV: "middle" };
   screen_text[5] = game.add.text(172,81,'Select a hemisphere',style);
    var style1 = { font: "16px tahoma", fill: "#00C7FF", boundsAlignH: "center", boundsAlignV: "middle" };
    screen_text[6] = game.add.text(172,130,'Before you begin the element hunt, you and your teammate must each choose a hemisphere.',style1);
    screen_text[6].wordWrap = true;
    screen_text[6].wordWrapWidth = 500;
     var style2 = { font: "16px tahoma", fill: "#F0E6DB", boundsAlignH: "center", boundsAlignV: "middle" };
    screen_text[7] = game.add.text(172,200,'Type your name against the hemisphere of your choice. Then, click Next to read the first clue.',style2);
    screen_text[7].wordWrap = true;
    screen_text[7].wordWrapWidth = 400;
    earth_images[0] = game.add.sprite(200,293,'demo','NORTH_HEMISPHERE');
    earth_images[1] = game.add.sprite(460,293,'demo','SOUTH_HEMISPHERE');
    next_button = game.add.button(380,525,'buttons',this.next_function,this,'NEXT_BUTTON_ROLLOVER','NEXT_BUTTON_NORMAL','NEXT_BUTTON_MOUSE_DOWN');
    screen_text[8] = game.add.text(217,262,'Northern Hemisphere',style1);
    screen_text[9] = game.add.text(470,262,'Southern Hemisphere',style1);
    var style2 = { font: "14px tahoma", fill: "#00C7FF", boundsAlignH: "center", boundsAlignV: "middle" };
    screen_text[10] = game.add.text(240,475,'Element Hunter :',style2);
    screen_text[11] = game.add.text(504,475,'Element Hunter :',style2);
    input_answer[0] = game.add.inputField(233, 500, {
    font: '11px Arial',
    fill: '#212121',
    fontWeight: 'bold',
    width: 100,
    padding: 8,
    borderWidth: 1,
    borderColor: '#0EC2F5',
    borderRadius: 6,

});
    input_answer[1] = game.add.inputField(498,500,{
    font: '11px Arial',
    fill: '#212121',
    fontWeight: 'bold',
    width: 100,
    padding: 8,
    borderWidth: 1,
    borderColor: '#0EC2F5',
    borderRadius: 6,

});


 },
 update : function()
 {
     if (((/^[A-z]+$/.test(input_answer[0].value)) == false) && (((/^[A-z]+$/.test(input_answer[1].value)) == false)))
  {
            next_button.tint = 0x666677;
            next_button.inputEnabled = false;
        }
        else
        {
          next_button.tint = 0xffffff;
           next_button.inputEnabled = true;
        }
 },
  /*render : function()
         {
          game.debug.text('x: ' + game.input.x + ' y: ' + game.input.y, 32, 32);
          }, */
          next_function : function ()
          {
            game.state.start('PlayGame');
          }

}
 var playGame = function(game){}
 playGame.prototype =
 {
  init : function()
  {
     game.load = new CustomLoader(game);
  },
  preload : function()
  {
   game.add.plugin(PhaserInput.Plugin);
   game.load.atlasJSONHash('game_astri','assets/all_screen_astro_2.png','assets/all_screen_astro_2.json');
   game.load.atlasJSONHash('buttons','assets/buttons_en.png','assets/buttons_en.json');
   game.load.atlasJSONHash('demo','assets/demo.png','assets/demo.json');
   game.load.image('rules','assets/rule_popup.jpg');
   game.load.webfont('tahoma','Tahoma');
   game.load.atlasJSONHash('game_astro','assets/sprites_2.png','assets/sprites_2.json');
   game.load.audio('click','assets/sounds/submit_click.wav');
    game.load.audio('yay','assets/sounds/yay.wav');
    game.load.audio('rotation','assets/sounds/rotation.wav');
    game.load.audio('treasure','assets/sounds/correct.wav');
    game.load.atlasJSONHash('answer_screens','assets/spritesheet_en.png','assets/sprites_en.json');

 },
  create : function()
  {
    reg.modal = new gameModal(game);
       this.createModals();
        rotate_sound = game.add.audio('rotation');
        yay_sound = game.add.audio('yay');
        click_sound = game.add.audio('click');
        treasure_sound = game.add.audio('treasure');
  background = game.add.sprite(0,0,'game_astro','BACKGROUND_with_sunrays');


    var k = 0;
    var j = 0;
    for(var i = 0;i<8;i++)
    {

      if(i%2==0)
      {
      holders[i] = game.add.sprite(653,133 + (k*124),'game_astri','ELEMENT_HOLDER_LIGHTOFF');
      k = k+1;
      }
      else
      {
      holders[i] = game.add.sprite(728,133 + (j*124),'game_astri','ELEMENT_HOLDER_LIGHTOFF');
      j=j+1;
      }

  }
   var style = { font: "bold 18px tahoma", fill: "#00FF7F", boundsAlignH: "center", boundsAlignV: "middle" };
   var style0 = { font: "bold 18px tahoma", fill: "#00FFFF", boundsAlignH: "center", boundsAlignV: "middle" };
   clue_name = game.add.text(48,22,'Element Hunt',style0);
    clue_number = game.add.text(78,52,clue_number1[0],style);
    var style1 = { font: "17px tahoma", fill: "#00B8E6", boundsAlignH: "center", boundsAlignV: "middle" };
    var style5 = { font: "bold 17px tahoma", fill: "#00B8E6", boundsAlignH: "center", boundsAlignV: "middle" };
 // clue_text1 = game.add.text(180,17,clue_text[0],style1);
  //clue_text1.wordWrap = true;
  //clue_text1.wordWrapWidth = 330;
  country[0] = game.add.text(247,17,country_name[0],style5);
  time_of_day[0] = game.add.text(383,17,time_of_day_text[0],style5);
  elementname[0] = game.add.text(303,48,elementname_text[0],style5);
  clue_line_one[0] = game.add.text(180,17,'Move to             capital at          and be led,',style1);
  clue_line_two[0] = game.add.text(180,48,'To the element,           , which is red.',style1);
  var style2 = { font: "16px tahoma", fill: "#F0E6DB", boundsAlignH: "center", boundsAlignV: "middle" };
   //var submit = game.add.text(512,78,'Submit',style3);
  var style3 = { font: "bold 16px tahoma", fill: "#F0E6DB", boundsAlignH: "center", boundsAlignV: "middle" };
  instruction_text = game.add.text(163,78,instruction_text_content,style2);
  var submit = game.add.text(512,78,'Submit',style3);
  rules_button = game.add.button(0,122,'buttons',this.rules_button_function,this,'RULE_ROLLOVER','RULE_NORMAL','RULE_MOUSEDOWN');
  demo_button = game.add.button(0,154,'buttons',this.demo_button_function,this,'DEMO_ROLLOVER','DEMO_NORMAL','DEMO_MOUSEDOWN');
  reset_btn[0] = game.add.button(140,590,'game_astro',this.reset_function_one,this,'RESET_BUTTON_ROLLOVER','RESET_BUTTON_NORMAL','RESET_BUTTON_MOUSE_DOWN');
  submit_buttons[0] = game.add.button(252,598,'buttons',this.submit_function,this,'SUBMIT_BUTTON_ROLLOVER','SUBMIT_BUTTON_NORMAL','SUBMIT_BUTTON_MOUSE_DOWN');
  next_buttons[0] = game.add.button(360,598,'buttons',this.next_stage_two,this,'NEXT_BUTTON_ROLLOVER','NEXT_BUTTON_NORMAL','NEXT_BUTTON_MOUSE_DOWN');
  earth_np = game.add.sprite(308,353,'game_astro','NORTH_EARTH_WITHLABLE');
  earth_np.scale.setTo(0.85,0.85);
  earth_np.anchor.setTo(0.5,0.5);

              anticlockwise_arrow = game.add.button(307,354,'game_astri',this.input_function_one,this,'ARROW_ANTI_CLOCKWISE_WITH_GLOW','ARROW_ANTI_CLOCKWISE','ARROW_ANTI_CLOCKWISE_WITH_GLOW');
            anticlockwise_arrow.scale.setTo(0.85,0.85);
            anticlockwise_arrow.anchor.setTo(0.5,0.5);

             anticlockwise_arrow.onInputOver.add(this.input_function,this);
            anticlockwise_arrow.onInputOut.add(this.input_function_stop,this);

},
update : function()
{
  if(fill_elements[3] == 1 || fill_elements[3] == 2)
  {
     this.next_question_one();
  }
  if(count_no_of_attempts[0] >3 ||  fill_elements[3] == 1 ||  fill_elements[3] == 2 || fill_elements[3] == 4)
  {
    next_buttons[0].tint = 0xffffff;
   next_buttons[0].inputEnabled = true;
   reset_btn[0].tint = 0x666677;
   reset_btn[0].inputEnabled = false;
   submit_buttons[0].inputEnabled = false;
   submit_buttons[0].tint = 0x666677;
   anticlockwise_arrow.inputEnabled = false;

  }
  else
  {
    next_buttons[0].tint = 0x666677;
   next_buttons[0].inputEnabled = false;
   reset_btn[0].tint = 0xffffff;
   reset_btn[0].inputEnabled = true;
    submit_buttons[0].inputEnabled = true;
   submit_buttons[0].tint = 0xffffff;
   anticlockwise_arrow.inputEnabled = true;

  }
  if(rotation[0] ==1 )
  {
    console.log('hi');
    anticlockwise_arrow.angle = anticlockwise_arrow.angle - 0.4;
   earth_np.angle = earth_np.angle - 0.4;
    //rotate_sound.play('',0,1);
  }
},
 input_function_stop : function()
 {
   rotation[0] = 0;

 },
 input_function_one : function()
 {
  rotation[0] = 1;
 },
 /*render : function()
         {
          game.debug.text('x: ' + game.input.x + ' y: ' + game.input.y, 32, 32);
          }, */
          input_function : function()
          {
             rotation[0] = 1;
             /*console.log(earth_np.angle);
             anticlockwise_arrow.angle = anticlockwise_arrow.angle - 5;
            earth_np.angle = earth_np.angle - 5;
            console.log(earth_np.angle);*/
          },
          //the main function which calculates whether answer is right.
          submit_function : function()
          {
            count_no_of_attempts[0] = count_no_of_attempts[0] + 1;
            if(count_no_of_attempts[0] < 2)
            {
            //passing data for degrees_of_position
            degrees_of_position[z] = earth_np.angle;
              z++;
            //console.log(degrees_of_position[z]);

            if(earth_np.angle <= -135.00000000000006  && earth_np.angle >= -185.00000000000006)
            {
              console.log('correct');
              this.showModal1();
            }
            else
            {
             console.log('false');
             this.showModal2();
            }
          }
          else
          {
            degrees_of_position[z] = earth_np.angle;
              z++;

             if(earth_np.angle <= -135.00000000000006  && earth_np.angle >= -185.00000000000006)
            {
              console.log('correct');
              this.showModal1();
            }
            else
            {
            console.log('show popup');
            this.showModal3();
          }
          }

          },
          rules_button_function : function()
          {
            console.log('hi');
            this.showModal4();
          },
          demo_button_function : function()
          {
            game.state.start('VideoScreen1');
          },
          reset_function_one : function()
          {
            earth_np.angle = 0;
          },

 createModals: function() {

     reg.modal.createModal({
        type: "modal1",
        includeBackground: true,
        modalCloseOnInput: false,
        itemsArr: [{
            type: 'sprite',
            atlasParent :'game_astri',
            content : 'FEEDBACK POPUP_WITHOUT BLACK BG'


          },
          {
            type: "sprite",
             atlasParent : 'buttons',
            content: 'CLOSE_BUTTON_NORMAL',
            //content: "close_button",
            offsetX: 209,
            offsetY: -250,
            callback: function()
                    {
                      fill_elements[3] = 1;
                      reg.modal.hideModal("modal1");

                    }
        },
        {

           type : "text",
           content: "Well done!",
          offsetX : 0,
          offsetY: -220,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0xeeeeee",

        },
         {

           type : "text",
           content: "You found Copper (Cu), the element in the first clue.",
          offsetX : 0,
          offsetY: -180,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0x00B8E6",

        },
          {

           type : "text",
           content: "Click X to continue.",
          offsetX : 0,
          offsetY: -140,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0xeeeeee",

        },
         {
            type: "sprite",
             atlasParent : 'answer_screens',
            content: 'Answer01',
            //content: "close_button",
            offsetX: 40,
            offsetY: 35,
        },
           {
            type: "sprite",
             atlasParent : 'game_astri',
            content: '12_PM',
            //content: "close_button",
            offsetX: -190,
            offsetY: 18,
        },
          {

           type : "text",
           content: "Noon",
          offsetX : -180,
          offsetY: 60,
          fontFamily: "tahoma",
          fontSize: 16,
          align: "left",
          color: "0xeeeeee",

        },



          ]

    });
 reg.modal.createModal({
        type: "modal2",
        includeBackground: true,
        modalCloseOnInput: false,
        itemsArr: [{
            type: 'sprite',
            atlasParent :'game_astri',
            content : 'FEEDBACK POPUP_WITHOUT BLACK BG'


          },
          {
            type: "sprite",
             atlasParent : 'buttons',
            content: 'CLOSE_BUTTON_NORMAL',
            //content: "close_button",
            offsetX: 209,
            offsetY: -250,
            callback: function()
                    {
                      reg.modal.hideModal("modal2");
                    }
        },
        {

           type : "text",
           content: "That is not correct.",
          offsetX : -135,
          offsetY: -160,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0x00B8E6",

        },
         {

           type : "text",
           content: "Notice that the clue mentions the time of day and a \ncountry. Find the name of the country and time of day \nfrom the clue. Rotate the Earth so that the time and \nplace are correct. Try Again.",
          offsetX : 0,
          offsetY: -60,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0x00B8E6",

        },

              {

           type : "text",
           content: "If you need help with the activity, click the \nDemo button.",
          offsetX : -40,
          offsetY: 30,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0xeeeeee",

        },
           {

           type : "text",
           content: "Click X to continue.",
          offsetX : -135,
          offsetY: 100,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0xeeeeee",

        },

          ]

    });
   reg.modal.createModal({
        type: "modal3",
        includeBackground: true,
        modalCloseOnInput: false,
        itemsArr: [{
            type: 'sprite',
            atlasParent :'game_astri',
            content : 'FEEDBACK POPUP_WITHOUT BLACK BG'


          },
          {
            type: "sprite",
             atlasParent : 'buttons',
            content: 'CLOSE_BUTTON_NORMAL',
            //content: "close_button",
            offsetX: 209,
            offsetY: -250,
            callback: function()
                    {
                      fill_elements[3] =2;
                      reg.modal.hideModal("modal3");

                    }
        },
        {

           type : "text",
           content: "Sorry! ",
          offsetX : -170,
          offsetY: -220,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0x00B8E6",

        },
        {

           type : "text",
           content: "You should have rotated the Earth so that it is \nnoon in India and collected the element Copper (Cu).",
          offsetX : 0,
          offsetY: -170,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0x00B8E6",

        },
         {

           type : "text",
           content: "Click X to continue.",
          offsetX : -130,
          offsetY: -120,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0xeeeeee",

        },
         {
            type: "sprite",
             atlasParent : 'answer_screens',
            content: 'Answer01',
            //content: "close_button",
            offsetX: 40,
            offsetY: 35,
        },

          {
            type: "sprite",
             atlasParent : 'game_astri',
            content: '12_PM',
            //content: "close_button",
            offsetX: -190,
            offsetY: 18,
        },
          {

           type : "text",
           content: "Noon",
          offsetX : -180,
          offsetY: 60,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0xeeeeee",

        },



          ]

    });
 reg.modal.createModal({
        type: "modal4",
        includeBackground: true,
        modalCloseOnInput: false,
        itemsArr: [{
            type: 'image',
            //atlasParent :'demo',
            content : 'rules'


          },
          {
            type: "sprite",
            atlasParent : 'buttons',
            content: 'CLOSE_BUTTON_NORMAL',
            offsetX: 220,
            offsetY: -270,
            callback: function()
                    {
                      reg.modal.hideModal("modal4");
                    }
        },
            {

           type : "text",
           content: "Click X to continue.",
          offsetX : 0,
          offsetY: 260,
          fontFamily: "tahoma",
          fontSize: 15,
          align: "left",
          color: "0xeeeeee",

        },


          ]

    });
  },
  showModal1:function()
  {
     yay_sound.play('',0,1);
    reg.modal.showModal("modal1");
},
showModal2:function()
  {

    reg.modal.showModal("modal2");
},
showModal3:function()
  {

    reg.modal.showModal("modal3");
},
showModal4:function()
  {

    reg.modal.showModal("modal4");
},
next_question_one:function()
{
  //reg.modal.hideModal("modal1");
  //fill_elements[0] = 1;
  //making element fly
  //elements[0] = game.add.sprite(147,349,'game_astri','copper');

  if(fill_elements[3] == 1)
  {

   //elements[0] = game.add.sprite(156,357,'game_astri','copper');

        /*var speed = game.rnd.between(4000, 6000);
        bounce = game.add.tween(elements[0]);
        bounce.to({x:737, y: 266},500, Phaser.Easing.Bounce.Out, false, 20, 0, false);
        bounce.start(0,0);
        bounce.onComplete.add(this.startBounceTween, this);*/

        holders[3].loadTexture('game_astri',element_holder_names[3]);
        fill_elements[3] = 4;
        treasure_sound.play('',0,1);
       //delay += 200;



  //holders[3].loadTexture('game_astri',element_holder_names[3]);
  submit_buttons[0].inputEnabled = false;


  //next_buttons[0] = game.add.button(360,598,'buttons',this.next_stage_two,this,'NEXT_BUTTON_ROLLOVER','NEXT_BUTTON_NORMAL','NEXT_BUTTON_MOUSE_DOWN');
  }
  else
  {
   submit_buttons[0].inputEnabled = false;

  //next_buttons[0] = game.add.button(360,598,'buttons',this.next_stage_two,this,'NEXT_BUTTON_ROLLOVER','NEXT_BUTTON_NORMAL','NEXT_BUTTON_MOUSE_DOWN');
  }
  //game.physics.enable(elements[0], Phaser.Physics.ARCADE);

    //elements[0].body.velocity.x=150;
    //elements[0].

},
next_stage_two : function()
{
  //console.log('hi');
 if(count_no_of_attempts[0] == 1)
 {
  clueEnd(clue_number1[0],count_no_of_attempts[0],degrees_of_position[z-1]);
 }
  else
  {
    clueEnd(clue_number1[0],count_no_of_attempts[0],degrees_of_position[z-2],degrees_of_position[z-1]);
  }
  game.state.start('PlayGame1');
}

}
  var playGame1 = function(game){}
 playGame1.prototype =
 {
  init : function()
  {
     game.load = new CustomLoader(game);
  },
  preload : function()
  {
   game.add.plugin(PhaserInput.Plugin);
   game.load.atlasJSONHash('game_astri','assets/all_screen_astro_2.png','assets/all_screen_astro_2.json');
   game.load.atlasJSONHash('buttons','assets/buttons_en.png','assets/buttons_en.json');
   game.load.atlasJSONHash('demo','assets/demo.png','assets/demo.json');
   game.load.image('rules','assets/rule_popup.jpg');
   game.load.webfont('tahoma','Tahoma');
    game.load.atlasJSONHash('game_astro','assets/sprites_2.png','assets/sprites_2.json');
      game.load.atlasJSONHash('answer_screens','assets/spritesheet_en.png','assets/sprites_en.json');

   game.load.audio('click','assets/sounds/submit_click.wav');
    game.load.audio('yay','assets/sounds/yay.wav');
    game.load.audio('rotation','assets/sounds/rotation.wav');
    game.load.audio('treasure','assets/sounds/correct.wav');

 },
  create : function()
  {
    reg.modal = new gameModal(game);
       this.createModals();
  background = game.add.sprite(0,0,'game_astro','BACKGROUND_with_sunrays');
  rotate_sound = game.add.audio('rotation');
        yay_sound = game.add.audio('yay');
        click_sound = game.add.audio('click');
        treasure_sound = game.add.audio('treasure');

    var k = 0;
    var j = 0;
    //adding element holders
    for(var i = 0;i<8;i++)
    {

      if(i%2==0)
      {
      if(fill_elements[i]==0 || fill_elements[i] == 2)
      {
      holders[i] = game.add.sprite(653,133 + (k*124),'game_astri','ELEMENT_HOLDER_LIGHTOFF');
      k = k+1;
      }
      else
      {
      holders[i] = game.add.sprite(653,133 + (k*124),'game_astri',element_holder_names[i]);
      k = k +1;
      }
      }
      else
      {
      if(fill_elements[i] ==0 || fill_elements[i]==2)
      {
      holders[i] = game.add.sprite(728,133 + (j*124),'game_astri','ELEMENT_HOLDER_LIGHTOFF');
      j=j+1;
      }
      else
      {
        holders[i] = game.add.sprite(728,133 + (j*124),'game_astri',element_holder_names[i]);
      j = j +1;
      }
    }
  }
   var style = { font: "bold 18px tahoma", fill: "#00FF7F", boundsAlignH: "center", boundsAlignV: "middle" };
    var style0 = { font: "bold 18px tahoma", fill: "#00FFFF", boundsAlignH: "center", boundsAlignV: "middle" };
   clue_name = game.add.text(48,22,'Element Hunt',style0);
    clue_number = game.add.text(78,52,clue_number1[1],style);
    var style1 = { font: "17px tahoma", fill: "#00B8E6", boundsAlignH: "center", boundsAlignV: "middle" };
     var style5 = { font: "bold 17px tahoma", fill: "#00B8E6", boundsAlignH: "center", boundsAlignV: "middle" };
 // clue_text1 = game.add.text(180,17,clue_text[0],style1);
  //clue_text1.wordWrap = true;
  //clue_text1.wordWrapWidth = 330;
  country[1] = game.add.text(228,17,country_name[1],style5);
  time_of_day[1] = game.add.text(324,17,time_of_day_text[1],style5);
  elementname[1] = game.add.text(280,48,elementname_text[1],style5);
  clue_line_one[1] = game.add.text(180,17,'Go to               at           ,',style1);
  clue_line_two[1] = game.add.text(180,48,'You will find              deposit.',style1);
  var style3 = { font: "bold 16px tahoma", fill: "#F0E6DB", boundsAlignH: "center", boundsAlignV: "middle" };
   var submit = game.add.text(512,78,'Submit',style3);
  //clue_text1 = game.add.text(180,17,clue_text[1],style1);
  //clue_text1.wordWrap = true;
  //clue_text1.wordWrapWidth = 220;
  var style2 = { font: "16px tahoma", fill: "#F0E6DB", boundsAlignH: "center", boundsAlignV: "middle" };
  instruction_text = game.add.text(163,78,instruction_text_content,style2);
  rules_button = game.add.button(0,122,'buttons',this.rules_button_function,this,'RULE_ROLLOVER','RULE_NORMAL','RULE_MOUSEDOWN');
  demo_button = game.add.button(0,154,'buttons',this.demo_button_function,this,'DEMO_ROLLOVER','DEMO_NORMAL','DEMO_MOUSEDOWN');
  submit_buttons[1] = game.add.button(252,598,'buttons',this.submit_function_one,this,'SUBMIT_BUTTON_ROLLOVER','SUBMIT_BUTTON_NORMAL','SUBMIT_BUTTON_MOUSE_DOWN');
  reset_btn[1] = game.add.button(140,590,'game_astro',this.reset_function_two,this,'RESET_BUTTON_ROLLOVER','RESET_BUTTON_NORMAL','RESET_BUTTON_MOUSE_DOWN');
  next_buttons[1] = game.add.button(360,598,'buttons',this.next_stage_two,this,'NEXT_BUTTON_ROLLOVER','NEXT_BUTTON_NORMAL','NEXT_BUTTON_MOUSE_DOWN');
  earth_np = game.add.sprite(308,353,'game_astri','SOUTH_EARTH_WITHLABLE');
  earth_np.scale.setTo(0.85,0.85);
  earth_np.anchor.setTo(0.5,0.5);

             clockwise_arrow = game.add.button(307,354,'game_astri',this.input_function_one,this,'ARROW_CLOCKWISE_WITH_GLOW','ARROW_CLOCKWISE','ARROW_CLOCKWISE_WITH_GLOW');
            clockwise_arrow.scale.setTo(0.85,0.85);
            clockwise_arrow.anchor.setTo(0.5,0.5);
            //clockwise_arrow.onInputUp.add(this.input_function,this);
            clockwise_arrow.onInputOver.add(this.input_function,this);
            clockwise_arrow.onInputOut.add(this.input_function_stop,this);

            /*anticlockwise_arrow = game.add.button(307,354,'game_astri',this.input_function,this,'ARROW_ANTI_CLOCKWISE_WITH_GLOW','ARROW_ANTI_CLOCKWISE','ARROW_ANTI_CLOCKWISE_WITH_GLOW');
            anticlockwise_arrow.scale.setTo(0.85,0.85);
            anticlockwise_arrow.anchor.setTo(0.5,0.5);*/
},
update : function()
{
  if(fill_elements[6] == 1 || fill_elements[6] == 2)
  {
     this.next_question_two();
  }
  //next button and reset button code
  if(count_no_of_attempts[1] > 3 ||  fill_elements[6] == 1 ||  fill_elements[6] == 2 || fill_elements[6] == 4)
  {
    next_buttons[1].tint = 0xffffff;
   next_buttons[1].inputEnabled = true;
   submit_buttons[1].inputEnabled = false;
  submit_buttons[1].tint = 0x666677;
   reset_btn[1].tint = 0x666677;
   reset_btn[1].inputEnabled = false;
   clockwise_arrow.inputEnabled = false;
  }
  else
  {
    next_buttons[1].tint = 0x666677;
   next_buttons[1].inputEnabled = false;
   reset_btn[1].tint = 0xffffff;
   reset_btn[1].inputEnabled = true;
    submit_buttons[1].inputEnabled = true;
  submit_buttons[1].tint = 0xffffff;
   clockwise_arrow.inputEnabled = true;
  }
  //
  if(rotation[1] ==1 )
  {
    console.log(earth_np.angle);
    clockwise_arrow.angle = clockwise_arrow.angle + 0.4;
   earth_np.angle = earth_np.angle + 0.4;
    //rotate_sound.play('',0,1);
  }
},
input_function_one : function()
{
  rotation[1] = 1;
console.log('hi');

},
reset_function_two : function()
{
  earth_np.angle = 0;
},
input_function_stop : function()
{
rotation[1] = 0;
console.log('out');
},
 /*render : function()
         {
          game.debug.text('x: ' + game.input.x + ' y: ' + game.input.y, 32, 32);
          }, */
          input_function : function()
          {
           rotation[1] = 1;
            /*for(;rotation!=0;)
            {
             console.log(earth_np.angle);
             clockwise_arrow.angle = clockwise_arrow.angle + 5;
            earth_np.angle = earth_np.angle + 5;
            console.log(earth_np.angle);*/
          },
          //the main function which calculates whether answer is right.
          submit_function_one : function()
          {
            count_no_of_attempts[1] = count_no_of_attempts[1] + 1;
            if(count_no_of_attempts[1] <2)
            {
              degrees_of_position[z] = earth_np.angle;
                z++;


            if(earth_np.angle <= -104  && earth_np.angle >= -155)
            {
              console.log('correct');
              this.showModal1();
            }
            else
            {
             console.log('false');
             this.showModal2();
            }
          }
          else
          {
            degrees_of_position[z] = earth_np.angle;
              z++;
           if(earth_np.angle <= -104  && earth_np.angle >= -155)
            {
              console.log('correct');
              this.showModal1();
            }
            else
            {
            console.log('show popup');
            this.showModal3();
          }
          }

          },
          rules_button_function : function()
          {
            console.log('hi');
            this.showModal4();
          },
          demo_button_function : function()
          {
            game.state.start('VideoScreen2');
          },

 createModals: function() {

     reg.modal.createModal({
        type: "modal1",
        includeBackground: true,
        modalCloseOnInput: false,
        itemsArr: [{
            type: 'sprite',
            atlasParent :'game_astri',
            content : 'FEEDBACK POPUP_WITHOUT BLACK BG'


          },
          {
            type: "sprite",
             atlasParent : 'buttons',
            content: 'CLOSE_BUTTON_NORMAL',
            //content: "close_button",
            offsetX: 209,
            offsetY: -250,
            callback: function()
                    {
                      fill_elements[6] = 1;
                      reg.modal.hideModal("modal1");

                    }
        },
        {

           type : "text",
           content: "Well done!",
          offsetX : 0,
          offsetY: -240,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0xeeeeee",

        },
         {

           type : "text",
           content: "You found Lithium (Li), the next element.",
          offsetX : 0,
          offsetY: -200,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0x00B8E6",

        },
           {

           type : "text",
           content: "Click X to continue",
          offsetX : 0,
          offsetY: -165 ,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0xeeeeee",

        },
         {
            type: "sprite",
             atlasParent : 'answer_screens',
            content: 'Answer02',
            //content: "close_button",
            offsetX: 0,
            offsetY: 60,
        },
           {
            type: "sprite",
             atlasParent : 'game_astri',
            content: '6_PM',
            //content: "close_button",
            offsetX: -15,
            offsetY: -110,
        },
          {

           type : "text",
           content: "Sunset",
          offsetX : -170,
          offsetY: -100,
          fontFamily: "tahoma",
          fontSize: 18,
          align: "left",
          color: "0xeeeeee",

        },



          ]

    });
 reg.modal.createModal({
        type: "modal2",
        includeBackground: true,
        modalCloseOnInput: false,
        itemsArr: [{
            type: 'sprite',
            atlasParent :'game_astri',
            content : 'FEEDBACK POPUP_WITHOUT BLACK BG'


          },
          {
            type: "sprite",
             atlasParent : 'buttons',
            content: 'CLOSE_BUTTON_NORMAL',
            //content: "close_button",
            offsetX: 209,
            offsetY: -250,
            callback: function()
                    {
                      reg.modal.hideModal("modal2");
                    }
        },
         {

           type : "text",
           content: "That is not correct.",
          offsetX : -135,
          offsetY: -160,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0x00B8E6",

        },
         {

           type : "text",
           content: "Notice that the clue mentions the time of day and a \ncountry. Find the name of the country and time of day \nfrom the clue. Rotate the Earth so that the time and \nplace are correct. Try Again.",
          offsetX : 0,
          offsetY: -60,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0x00B8E6",

        },

              {

           type : "text",
           content: "If you need help with the activity, click the \nDemo button.",
          offsetX : -40,
          offsetY: 30,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0xeeeeee",

        },
           {

           type : "text",
           content: "Click X to continue.",
          offsetX : -135,
          offsetY: 100,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0xeeeeee",

        },

          ]

    });
   reg.modal.createModal({
        type: "modal3",
        includeBackground: true,
        modalCloseOnInput: false,
        itemsArr: [{
            type: 'sprite',
            atlasParent :'game_astri',
            content : 'FEEDBACK POPUP_WITHOUT BLACK BG'


          },
          {
            type: "sprite",
             atlasParent : 'buttons',
            content: 'CLOSE_BUTTON_NORMAL',
            //content: "close_button",
            offsetX: 209,
            offsetY: -250,
            callback: function()
                    {
                      fill_elements[6] =2;
                      reg.modal.hideModal("modal3");

                    }
        },
         {

           type : "text",
           content: "Sorry! ",
          offsetX : -170,
          offsetY: -220,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0x00B8E6",

        },
        {

           type : "text",
           content: "You should have rotated the Earth so that it is \nevening in Australia and collected the element Lithium (Li).",
          offsetX : 0,
          offsetY: -170,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0x00B8E6",

        },
         {

           type : "text",
           content: "Click X to continue.",
          offsetX : -150,
          offsetY: -120,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0xeeeeee",

        },
         {
            type: "sprite",
             atlasParent : 'answer_screens',
            content: 'Answer02',
            //content: "close_button",
            offsetX: 0,
            offsetY: 60,
        },

          {
            type: "sprite",
             atlasParent : 'game_astri',
            content: '6_PM',
            //content: "close_button",
            offsetX: 20,
            offsetY: -110,
        },
          {

           type : "text",
           content: "Sunset",
          offsetX : 140,
          offsetY: -110,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0xeeeeee",

        },



          ]

    });
 reg.modal.createModal({
        type: "modal4",
        includeBackground: true,
        modalCloseOnInput: false,
        itemsArr: [{
            type: 'image',
            //atlasParent :'demo',
            content : 'rules'


          },
          {
            type: "sprite",
            atlasParent : 'buttons',
            content: 'CLOSE_BUTTON_NORMAL',
            offsetX: 220,
            offsetY: -270,
            callback: function()
                    {
                      reg.modal.hideModal("modal4");
                    }
        },
            {

           type : "text",
           content: "Click X to continue.",
          offsetX : 0,
          offsetY: 260,
          fontFamily: "tahoma",
          fontSize: 15,
          align: "left",
          color: "0xeeeeee",

        }


          ]

    });
  },
  showModal1:function()
  {
     yay_sound.play('',0,1);
    reg.modal.showModal("modal1");
},
showModal2:function()
  {

    reg.modal.showModal("modal2");
},
showModal3:function()
  {

    reg.modal.showModal("modal3");
},
showModal4:function()
  {

    reg.modal.showModal("modal4");
},
next_question_two:function()
{
  //reg.modal.hideModal("modal1");
  //fill_elements[0] = 1;
  //making element fly
  //elements[0] = game.add.sprite(147,349,'game_astri','copper');
  if(fill_elements[6] == 1)
  {
  holders[6].loadTexture('game_astri',element_holder_names[6]);
  fill_elements[6] = 4;
   treasure_sound.play('',0,1);


  //next_buttons[0] = game.add.button(388,598,'buttons',this.next_stage_two,this,'NEXT_BUTTON_ROLLOVER','NEXT_BUTTON_NORMAL','NEXT_BUTTON_MOUSE_DOWN');
  }
  else
  {
   submit_buttons[1].inputEnabled = false;


  //next_buttons[0] = game.add.button(388,598,'buttons',this.next_stage_two,this,'NEXT_BUTTON_ROLLOVER','NEXT_BUTTON_NORMAL','NEXT_BUTTON_MOUSE_DOWN');
  }
  //game.physics.enable(elements[0], Phaser.Physics.ARCADE);

    //elements[0].body.velocity.x=150;
    //elements[0].

},
next_stage_two : function()
{
  if(count_no_of_attempts[1] == 1)
  {
   clueEnd(clue_number1[1],count_no_of_attempts[1],degrees_of_position[z-1]);
  }
   else
   {
     clueEnd(clue_number1[1],count_no_of_attempts[1],degrees_of_position[z-2],degrees_of_position[z-1]);
   }
//  clueEnd(clue_number1[1],count_no_of_attempts[1],degrees_of_position);
  game.state.start('PlayGame2');
}

}
var playGame2 = function(game){}
playGame2.prototype =
{
   init : function()
  {
     game.load = new CustomLoader(game);
  },
  preload : function()
  {
   game.add.plugin(PhaserInput.Plugin);
   game.load.atlasJSONHash('game_astri','assets/all_screen_astro_2.png','assets/all_screen_astro_2.json');
   game.load.atlasJSONHash('buttons','assets/buttons_en.png','assets/buttons_en.json');
   game.load.atlasJSONHash('demo','assets/demo.png','assets/demo.json');
   game.load.image('rules','assets/rule_popup.jpg');
   game.load.webfont('tahoma','Tahoma');
    game.load.atlasJSONHash('game_astro','assets/sprites_2.png','assets/sprites_2.json');
    game.load.audio('yay','assets/sounds/yay.wav');
    game.load.audio('rotation','assets/sounds/rotation.wav');
    game.load.audio('treasure','assets/sounds/correct.wav');
      game.load.atlasJSONHash('answer_screens','assets/spritesheet_en.png','assets/sprites_en.json');

 },
  create : function()
  {
    reg.modal = new gameModal(game);
       this.createModals();
  background = game.add.sprite(0,0,'game_astro','BACKGROUND_with_sunrays');
    rotate_sound = game.add.audio('rotation');
        yay_sound = game.add.audio('yay');
        click_sound = game.add.audio('click');
        treasure_sound = game.add.audio('treasure');
    var k = 0;
    var j = 0;
     //adding element holders
    for(var i = 0;i<8;i++)
    {

      if(i%2==0)
      {
      if(fill_elements[i] ==0 || fill_elements[i] ==2)
      {
      holders[i] = game.add.sprite(653,133 + (k*124),'game_astri','ELEMENT_HOLDER_LIGHTOFF');
      k = k+1;
      }
      else
      {
      holders[i] = game.add.sprite(653,133 + (k*124),'game_astri',element_holder_names[i]);
      k = k +1;
      }
      }
      else
      {
      if(fill_elements[i]==0 || fill_elements[i]==2)
      {
      holders[i] = game.add.sprite(728,133 + (j*124),'game_astri','ELEMENT_HOLDER_LIGHTOFF');
      j=j+1;
      }
      else
      {
        holders[i] = game.add.sprite(728,133 + (j*124),'game_astri',element_holder_names[i]);
      j = j +1;
      }
    }
  }
   //var style = { font: "bold 18px tahoma", fill: "#90CCF0", boundsAlignH: "center", boundsAlignV: "middle" };
    var style = { font: "bold 18px tahoma", fill: "#00FF7F", boundsAlignH: "center", boundsAlignV: "middle" };
   var style0 = { font: "bold 18px tahoma", fill: "#00FFFF", boundsAlignH: "center", boundsAlignV: "middle" };
   clue_name = game.add.text(48,22,'Element Hunt',style0);
    clue_number = game.add.text(78,52,clue_number1[2],style);
    var style1 = { font: "17px tahoma", fill: "#00B8E6", boundsAlignH: "center", boundsAlignV: "middle" };
   var style5 = { font: "bold 17px tahoma", fill: "#00B8E6", boundsAlignH: "center", boundsAlignV: "middle" };
 // clue_text1 = game.add.text(180,17,clue_text[0],style1);
  //clue_text1.wordWrap = true;
  //clue_text1.wordWrapWidth = 330;
  country[2] = game.add.text(228,17,country_name[2],style5);
  time_of_day[2] = game.add.text(310,17,time_of_day_text[2],style5);
  elementname[2] = game.add.text(280,48,elementname_text[2],style5);
  clue_line_one[2] = game.add.text(180,17,'Go to            at                when the stars are shining;',style1);
  clue_line_two[2] = game.add.text(180,48,'You will find             is ready for collecting.',style1);
  var style3 = { font: "bold 16px tahoma", fill: "#F0E6DB", boundsAlignH: "center", boundsAlignV: "middle" };
   var submit = game.add.text(512,78,'Submit',style3);
  var style2 = { font: "16px tahoma", fill: "#F0E6DB", boundsAlignH: "center", boundsAlignV: "middle" };
  instruction_text = game.add.text(163,78,instruction_text_content,style2);
  rules_button = game.add.button(0,122,'buttons',this.rules_button_function,this,'RULE_ROLLOVER','RULE_NORMAL','RULE_MOUSEDOWN');
  demo_button = game.add.button(0,154,'buttons',this.demo_button_function,this,'DEMO_ROLLOVER','DEMO_NORMAL','DEMO_MOUSEDOWN');
  reset_btn[2] = game.add.button(140,590,'game_astro',this.reset_function_three,this,'RESET_BUTTON_ROLLOVER','RESET_BUTTON_NORMAL','RESET_BUTTON_MOUSE_DOWN');
  submit_buttons[2] = game.add.button(252,598,'buttons',this.submit_function_two,this,'SUBMIT_BUTTON_ROLLOVER','SUBMIT_BUTTON_NORMAL','SUBMIT_BUTTON_MOUSE_DOWN');
  next_buttons[2] = game.add.button(360,598,'buttons',this.next_stage_three,this,'NEXT_BUTTON_ROLLOVER','NEXT_BUTTON_NORMAL','NEXT_BUTTON_MOUSE_DOWN');
  earth_np = game.add.sprite(308,353,'game_astro','NORTH_EARTH_WITHLABLE');
  earth_np.scale.setTo(0.85,0.85);
  earth_np.anchor.setTo(0.5,0.5);

              anticlockwise_arrow = game.add.button(307,354,'game_astri',this.input_function_three,this,'ARROW_ANTI_CLOCKWISE_WITH_GLOW','ARROW_ANTI_CLOCKWISE','ARROW_ANTI_CLOCKWISE_WITH_GLOW');
            anticlockwise_arrow.scale.setTo(0.85,0.85);
            anticlockwise_arrow.anchor.setTo(0.5,0.5);
             anticlockwise_arrow.onInputOver.add(this.input_function,this);
            anticlockwise_arrow.onInputOut.add(this.input_function_stop,this);

},
update : function()
{
  if(fill_elements[4] == 1 || fill_elements[4] == 2)
  {
     this.next_question_three();
  }
    if(count_no_of_attempts[2] > 3 ||  fill_elements[4] == 1 ||  fill_elements[4] == 2 || fill_elements[4] == 4)
  {
    next_buttons[2].tint = 0xffffff;
   next_buttons[2].inputEnabled = true;
   reset_btn[2].tint = 0x666677;
   reset_btn[2].inputEnabled = false;
   anticlockwise_arrow.inputEnabled = false;
   submit_buttons[2].inputEnabled = false;
   submit_buttons[2].tint = 0x666677;

  }
  else
  {
    next_buttons[2].tint = 0x666677;
   next_buttons[2].inputEnabled = false;
   reset_btn[2].tint = 0xffffff;
   reset_btn[2].inputEnabled = true;
   anticlockwise_arrow.inputEnabled = true;
   submit_buttons[2].inputEnabled = true;
   submit_buttons[2].tint = 0xffffff;

  }
  if(rotation[2] ==1 )
  {
    console.log(earth_np.angle);
    anticlockwise_arrow.angle = anticlockwise_arrow.angle - 0.4;
   earth_np.angle = earth_np.angle - 0.4;
    //rotate_sound.play('',0,1);
  }

},
 /*render : function()
         {
          game.debug.text('x: ' + game.input.x + ' y: ' + game.input.y, 32, 32);
          }, */
          input_function : function()
          {

           rotation[2] = 1;
          },
          input_function_stop : function()
          {
            rotation[2] = 0;
          },
          input_function_three : function()
          {
            rotation[2] = 1;
          },
          reset_function_three : function()
          {
            earth_np.angle = 0;
          },
          //the main function which calculates whether answer is right.
          submit_function_two : function()
          {
            count_no_of_attempts[2] = count_no_of_attempts[2] + 1;
            if(count_no_of_attempts[2] < 2)
            {
              degrees_of_position[z] = earth_np.angle;
              z++;
            if(earth_np.angle <= 90  && earth_np.angle >= 45)
            {
              console.log('correct');
              this.showModal1();
            }
            else
            {
             console.log('false');
             this.showModal2();
            }
          }
          else
          {
            degrees_of_position[z] = earth_np.angle;
            z++;
              if(earth_np.angle <= 90  && earth_np.angle >= 45)
            {
              console.log('correct');
              this.showModal1();
            }
            else
            {
            console.log('show popup');
            this.showModal3();
          }
          }

          },
          rules_button_function : function()
          {
            console.log('hi');
            this.showModal4();
          },
          demo_button_function : function()
          {
            game.state.start('VideoScreen3');
          },

 createModals: function() {

     reg.modal.createModal({
        type: "modal1",
        includeBackground: true,
        modalCloseOnInput: false,
        itemsArr: [{
            type: 'sprite',
            atlasParent :'game_astri',
            content : 'FEEDBACK POPUP_WITHOUT BLACK BG'


          },
          {
            type: "sprite",
             atlasParent : 'buttons',
            content: 'CLOSE_BUTTON_NORMAL',
            //content: "close_button",
            offsetX: 209,
            offsetY: -250,
            callback: function()
                    {
                      fill_elements[4] = 1;
                      reg.modal.hideModal("modal1");

                    }
        },
          {

           type : "text",
           content: "Well done!",
          offsetX : 0,
          offsetY: -220,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0xeeeeee",

        },
         {

           type : "text",
           content: "You found the next element, Cobalt (Co).",
          offsetX : 0,
          offsetY: -180,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0x00B8E6",

        },
          {

           type : "text",
           content: "Click X to continue.",
          offsetX : 0,
          offsetY: -140,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0xeeeeee",

        },
         {
            type: "sprite",
             atlasParent : 'answer_screens',
            content: 'Answer03',
            //content: "close_button",
            offsetX: -110,
            offsetY: 30,
        },
           {
            type: "sprite",
             atlasParent : 'game_astri',
            content: '12_AM',
            //content: "close_button",
            offsetX: 110,
            offsetY: 45,
        },
          {

           type : "text",
           content: "Midnight",
          offsetX : 110,
          offsetY: 110,
          fontFamily: "tahoma",
          fontSize: 18,
          align: "left",
          color: "0xeeeeee",

        },



          ]

    });
 reg.modal.createModal({
        type: "modal2",
        includeBackground: true,
        modalCloseOnInput: false,
        itemsArr: [{
            type: 'sprite',
            atlasParent :'game_astri',
            content : 'FEEDBACK POPUP_WITHOUT BLACK BG'


          },
          {
            type: "sprite",
             atlasParent : 'buttons',
            content: 'CLOSE_BUTTON_NORMAL',
            //content: "close_button",
            offsetX: 209,
            offsetY: -250,
            callback: function()
                    {
                      reg.modal.hideModal("modal2");
                    }
        },
         {

           type : "text",
           content: "That is not correct.",
          offsetX : -135,
          offsetY: -160,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0x00B8E6",

        },
         {

           type : "text",
           content: "Notice that the clue mentions the time of day and a \ncountry. Find the name of the country and time of day \nfrom the clue. Rotate the Earth so that the time and \nplace are correct. Try Again.",
          offsetX : 0,
          offsetY: -60,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0x00B8E6",

        },

              {

           type : "text",
           content: "If you need help with the activity, click the \nDemo button.",
          offsetX : -40,
          offsetY: 30,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0xeeeeee",

        },
           {

           type : "text",
           content: "Click X to continue.",
          offsetX : -135,
          offsetY: 100,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0xeeeeee",

        },

          ]

    });
   reg.modal.createModal({
        type: "modal3",
        includeBackground: true,
        modalCloseOnInput: false,
        itemsArr: [{
            type: 'sprite',
            atlasParent :'game_astri',
            content : 'FEEDBACK POPUP_WITHOUT BLACK BG'


          },
          {
            type: "sprite",
             atlasParent : 'buttons',
            content: 'CLOSE_BUTTON_NORMAL',
            //content: "close_button",
            offsetX: 209,
            offsetY: -250,
            callback: function()
                    {
                      fill_elements[4] =2;
                      reg.modal.hideModal("modal3");

                    }
        },
         {

           type : "text",
           content: "Sorry! ",
          offsetX : -170,
          offsetY: -220,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0x00B8E6",

        },
         {

           type : "text",
           content: "You should have rotated the Earth so that it is \nmidnight in Russia and collected the element Cobalt (Co).",
          offsetX : 0,
          offsetY: -170,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0x00B8E6",

        },
         {

           type : "text",
           content: "Click X to continue.",
          offsetX : -145,
          offsetY: -120,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0xeeeeee",

        },

           {
            type: "sprite",
             atlasParent : 'answer_screens',
            content: 'Answer03',
            //content: "close_button",
            offsetX: -115,
            offsetY: 35,
        },

          {
            type: "sprite",
             atlasParent : 'game_astri',
            content: '12_AM',
            //content: "close_button",
            offsetX: 110,
            offsetY: 18,
        },
          {

           type : "text",
           content: "Midnight",
          offsetX : 125,
          offsetY: 60,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0xeeeeee",

        },



          ]

    });
 reg.modal.createModal({
        type: "modal4",
        includeBackground: true,
        modalCloseOnInput: false,
        itemsArr: [{
            type: 'image',
            //atlasParent :'demo',
            content : 'rules'


          },
          {
            type: "sprite",
            atlasParent : 'buttons',
            content: 'CLOSE_BUTTON_NORMAL',
            offsetX: 220,
            offsetY: -270,
            callback: function()
                    {
                      reg.modal.hideModal("modal4");
                    }
        },
            {

           type : "text",
           content: "Click X to continue.",
          offsetX : 0,
          offsetY: 260,
          fontFamily: "tahoma",
          fontSize: 15,
          align: "left",
          color: "0xeeeeee",

        }


          ]

    });
  },
  showModal1:function()
  {
     yay_sound.play('',0,1);
    reg.modal.showModal("modal1");
},
showModal2:function()
  {

    reg.modal.showModal("modal2");
},
showModal3:function()
  {

    reg.modal.showModal("modal3");
},
showModal4:function()
  {

    reg.modal.showModal("modal4");
},
next_question_three:function()
{
  //reg.modal.hideModal("modal1");
  //fill_elements[0] = 1;
  //making element fly
  //elements[0] = game.add.sprite(147,349,'game_astri','copper');
  if(fill_elements[4] == 1)
  {
  //elements[0] = game.add.sprite(663,389,'game_astri','COBALT');
  holders[4].loadTexture('game_astri',element_holder_names[4]);
   fill_elements[4] = 4;
   treasure_sound.play('',0,1);



  //next_buttons[2] = game.add.button(388,598,'buttons',this.next_stage_three,this,'NEXT_BUTTON_ROLLOVER','NEXT_BUTTON_NORMAL','NEXT_BUTTON_MOUSE_DOWN');
  }
  else
  {
   submit_buttons[2].inputEnabled = false;

  //next_buttons[2] = game.add.button(388,598,'buttons',this.next_stage_three,this,'NEXT_BUTTON_ROLLOVER','NEXT_BUTTON_NORMAL','NEXT_BUTTON_MOUSE_DOWN');
  }
  //game.physics.enable(elements[0], Phaser.Physics.ARCADE);

    //elements[0].body.velocity.x=150;
    //elements[0].

},
next_stage_three : function()
{
  if(count_no_of_attempts[2] == 1)
  {
   clueEnd(clue_number1[2],count_no_of_attempts[2],degrees_of_position[z-1]);
  }
   else
   {
     clueEnd(clue_number1[2],count_no_of_attempts[2],degrees_of_position[z-2],degrees_of_position[z-1]);
   }
  game.state.start('PlayGame3');
}

}
var playGame3 = function(game){}
playGame3.prototype =
{
 init : function()
  {
     game.load = new CustomLoader(game);
  },
  preload : function()
  {
   game.add.plugin(PhaserInput.Plugin);
   game.load.atlasJSONHash('game_astri','assets/all_screen_astro_2.png','assets/all_screen_astro_2.json');
   game.load.atlasJSONHash('buttons','assets/buttons_en.png','assets/buttons_en.json');
   game.load.atlasJSONHash('demo','assets/demo.png','assets/demo.json');
   game.load.image('rules','assets/rule_popup.jpg');
   game.load.webfont('tahoma','Tahoma');
    game.load.atlasJSONHash('game_astro','assets/sprites_2.png','assets/sprites_2.json');
    game.load.audio('yay','assets/sounds/yay.wav');
    game.load.audio('rotation','assets/sounds/rotation.wav');
    game.load.audio('treasure','assets/sounds/correct.wav');
      game.load.atlasJSONHash('answer_screens','assets/spritesheet_en.png','assets/sprites_en.json');

 },
  create : function()
  {
    reg.modal = new gameModal(game);
       this.createModals();
        rotate_sound = game.add.audio('rotation');
        yay_sound = game.add.audio('yay');
        click_sound = game.add.audio('click');
        treasure_sound = game.add.audio('treasure');
  background = game.add.sprite(0,0,'game_astro','BACKGROUND_with_sunrays');

    var k = 0;
    var j = 0;
    //adding element holders
    for(var i = 0;i<8;i++)
    {

      if(i%2==0)
      {
      if(fill_elements[i] ==0 || fill_elements[i] ==2)
      {
      holders[i] = game.add.sprite(653,133 + (k*124),'game_astri','ELEMENT_HOLDER_LIGHTOFF');
      k = k+1;
      }
      else
      {
      holders[i] = game.add.sprite(653,133 + (k*124),'game_astri',element_holder_names[i]);
      k = k +1;
      }
      }
      else
      {
      if(fill_elements[i]==0 || fill_elements[i] == 2)
      {
      holders[i] = game.add.sprite(728,133 + (j*124),'game_astri','ELEMENT_HOLDER_LIGHTOFF');
      j=j+1;
      }
      else
      {
        holders[i] = game.add.sprite(728,133 + (j*124),'game_astri',element_holder_names[i]);
      j = j +1;
      }
    }
  }
   //var style = { font: "bold 18px tahoma", fill: "#90CCF0", boundsAlignH: "center", boundsAlignV: "middle" };
     var style = { font: "bold 18px tahoma", fill: "#00FF7F", boundsAlignH: "center", boundsAlignV: "middle" };
   var style0 = { font: "bold 18px tahoma", fill: "#00FFFF", boundsAlignH: "center", boundsAlignV: "middle" };
   clue_name = game.add.text(48,22,'Element Hunt',style0);
    clue_number = game.add.text(78,52,clue_number1[3],style);
    var style1 = { font: "17px tahoma", fill: "#00B8E6", boundsAlignH: "center", boundsAlignV: "middle" };
  var style5 = { font: "bold 17px tahoma", fill: "#00B8E6", boundsAlignH: "center", boundsAlignV: "middle" };
 // clue_text1 = game.add.text(180,17,clue_text[0],style1);
  //clue_text1.wordWrap = true;
  //clue_text1.wordWrapWidth = 330;
  country[3] = game.add.text(247,17,country_name[3],style5);
  time_of_day[3] = game.add.text(342  ,17,time_of_day_text[3],style5);
  elementname[3] = game.add.text(280,48,elementname_text[3],style5);
  clue_line_one[3] = game.add.text(180,17,'Move to         at the ',style1);
  clue_line_two[3] = game.add.text(180,48,'You will find        along the bay.',style1);
  var style3 = { font: "bold 16px tahoma", fill: "#F0E6DB", boundsAlignH: "center", boundsAlignV: "middle" };
   var submit = game.add.text(512,78,'Submit',style3);
  var style2 = { font: "16px tahoma", fill: "#F0E6DB", boundsAlignH: "center", boundsAlignV: "middle" };
  instruction_text = game.add.text(163,78,instruction_text_content,style2);
  rules_button = game.add.button(0,122,'buttons',this.rules_button_function,this,'RULE_ROLLOVER','RULE_NORMAL','RULE_MOUSEDOWN');
  demo_button = game.add.button(0,154,'buttons',this.demo_button_function,this,'DEMO_ROLLOVER','DEMO_NORMAL','DEMO_MOUSEDOWN');
  reset_btn[3] = game.add.button(140,590,'game_astro',this.reset_function_four,this,'RESET_BUTTON_ROLLOVER','RESET_BUTTON_NORMAL','RESET_BUTTON_MOUSE_DOWN');
  submit_buttons[3] = game.add.button(252,598,'buttons',this.submit_function_three,this,'SUBMIT_BUTTON_ROLLOVER','SUBMIT_BUTTON_NORMAL','SUBMIT_BUTTON_MOUSE_DOWN');
  next_buttons[3] = game.add.button(360,598,'buttons',this.next_stage_four,this,'NEXT_BUTTON_ROLLOVER','NEXT_BUTTON_NORMAL','NEXT_BUTTON_MOUSE_DOWN');
  //submit_buttons[3] = game.add.button(272,598,'buttons',this.submit_function_three,this,'SUBMIT_BUTTON_ROLLOVER','SUBMIT_BUTTON_NORMAL','SUBMIT_BUTTON_MOUSE_DOWN');
  earth_np = game.add.sprite(308,353,'game_astri','SOUTH_EARTH_WITHLABLE');
  earth_np.scale.setTo(0.85,0.85);
  earth_np.anchor.setTo(0.5,0.5);

             clockwise_arrow = game.add.button(307,354,'game_astri',this.input_function_four,this,'ARROW_CLOCKWISE_WITH_GLOW','ARROW_CLOCKWISE','ARROW_CLOCKWISE_WITH_GLOW');
            clockwise_arrow.scale.setTo(0.85,0.85);
            clockwise_arrow.anchor.setTo(0.5,0.5);
                  clockwise_arrow.onInputOver.add(this.input_function,this);
            clockwise_arrow.onInputOut.add(this.input_function_stop,this);
            /*anticlockwise_arrow = game.add.button(307,354,'game_astri',this.input_function,this,'ARROW_ANTI_CLOCKWISE_WITH_GLOW','ARROW_ANTI_CLOCKWISE','ARROW_ANTI_CLOCKWISE_WITH_GLOW');
            anticlockwise_arrow.scale.setTo(0.85,0.85);
            anticlockwise_arrow.anchor.setTo(0.5,0.5);*/
},
update : function()
{
  if(fill_elements[2] == 1 || fill_elements[2] == 2)
  {
     this.next_question_three();
  }
   if(count_no_of_attempts[3] > 3 ||  fill_elements[2] == 1 ||  fill_elements[2] == 2 || fill_elements[2] == 4)
  {
    next_buttons[3].tint = 0xffffff;
   next_buttons[3].inputEnabled = true;
   reset_btn[3].tint = 0x666677;
   reset_btn[3].inputEnabled = false;
   clockwise_arrow.inputEnabled = false;
   submit_buttons[3].inputEnabled = false;
   submit_buttons[3].tint = 0x666677;

  }
  else
  {
    next_buttons[3].tint = 0x666677;
   next_buttons[3].inputEnabled = false;
   reset_btn[3].tint = 0xffffff;
   reset_btn[3].inputEnabled = true;
   clockwise_arrow.inputEnabled = true;
     submit_buttons[3].inputEnabled = true;
   submit_buttons[3].tint = 0xffffff;
  }
  //
  if(rotation[3] ==1 )
  {
    console.log(earth_np.angle);
    clockwise_arrow.angle = clockwise_arrow.angle + 0.4;
   earth_np.angle = earth_np.angle + 0.4;
    //rotate_sound.play('',0,1);
  }

},
reset_function_four : function()
{
 earth_np.angle = 0;
},
 /*render : function()
         {
          game.debug.text('x: ' + game.input.x + ' y: ' + game.input.y, 32, 32);
          }, */
          input_function : function()
          {
            rotation[3] = 1;
          },
          input_function_four : function()
          {
            rotation[3] = 1;
          },
          input_function_stop : function()
          {
            rotation[3] = 0;
          },
          //the main function which calculates whether answer is right.
          submit_function_three : function()
          {
            count_no_of_attempts[3] = count_no_of_attempts[3] + 1;
            if(count_no_of_attempts[3] < 2)
            {
              degrees_of_position[z] = earth_np.angle;
              z++;
            if(earth_np.angle <= -85  && earth_np.angle >= -130)
            {
              console.log('correct');
              this.showModal1();
            }
            else
            {
             console.log('false');
             this.showModal2();
            }
          }
          else
          {
            degrees_of_position[z] = earth_np.angle;
            z++;
             if(earth_np.angle <= -85  && earth_np.angle >= -130)
            {
              console.log('correct');
              this.showModal1();
            }
            else
            {
            console.log('show popup');
            this.showModal3();
          }
        }
          },
          rules_button_function : function()
          {
            console.log('hi');
            this.showModal4();
          },
          demo_button_function : function()
          {
            game.state.start('VideoScreen4');
          },

 createModals: function() {

     reg.modal.createModal({
        type: "modal1",
        includeBackground: true,
        modalCloseOnInput: false,
        itemsArr: [{
            type: 'sprite',
            atlasParent :'game_astri',
            content : 'FEEDBACK POPUP_WITHOUT BLACK BG'


          },
          {
            type: "sprite",
             atlasParent : 'buttons',
            content: 'CLOSE_BUTTON_NORMAL',
            //content: "close_button",
            offsetX: 209,
            offsetY: -250,
            callback: function()
                    {
                      fill_elements[2] = 1;
                      reg.modal.hideModal("modal1");

                    }
        },
        {

           type : "text",
           content: "Well done!",
          offsetX : 0,
          offsetY: -220,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0xeeeeee",

        },
         {

           type : "text",
           content: "You found Tin (Sn).",
          offsetX : 0,
          offsetY: -190,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0x00B8E6",

        },
          {

           type : "text",
           content: "Click X to continue.",
          offsetX : 0,
          offsetY: -160,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0xeeeeee",

        },
         {
            type: "sprite",
             atlasParent : 'answer_screens',
            content: 'Answer04',
            //content: "close_button",
            offsetX: 0,
            offsetY: 0,
        },
           {
            type: "sprite",
             atlasParent : 'game_astri',
            content: '6_AM',
            //content: "close_button",
            offsetX: -15,
            offsetY: 170,
        },
          {

           type : "text",
           content: "Morning",
          offsetX : -170,
          offsetY: 170,
          fontFamily: "tahoma",
          fontSize: 18,
          align: "left",
          color: "0xeeeeee",

        },



          ]

    });
 reg.modal.createModal({
        type: "modal2",
        includeBackground: true,
        modalCloseOnInput: false,
        itemsArr: [{
            type: 'sprite',
            atlasParent :'game_astri',
            content : 'FEEDBACK POPUP_WITHOUT BLACK BG'


          },
          {
            type: "sprite",
             atlasParent : 'buttons',
            content: 'CLOSE_BUTTON_NORMAL',
            //content: "close_button",
            offsetX: 209,
            offsetY: -250,
            callback: function()
                    {
                      reg.modal.hideModal("modal2");
                    }
        },
        {

           type : "text",
           content: "That is not correct.",
          offsetX : -135,
          offsetY: -160,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0x00B8E6",

        },
         {

           type : "text",
           content: "Notice that the clue mentions the time of day and a \ncountry. Find the name of the country and time of day \nfrom the clue. Rotate the Earth so that the time and \nplace are correct. Try Again.",
          offsetX : 0,
          offsetY: -60,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0x00B8E6",

        },

              {

           type : "text",
           content: "If you need help with the activity, click the \nDemo button.",
          offsetX : -40,
          offsetY: 30,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0xeeeeee",

        },
        {

           type : "text",
           content: "Click X to continue.",
          offsetX : -135,
          offsetY: 100,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0xeeeeee",

        },
          ]

    });
   reg.modal.createModal({
        type: "modal3",
        includeBackground: true,
        modalCloseOnInput: false,
        itemsArr: [{
            type: 'sprite',
            atlasParent :'game_astri',
            content : 'FEEDBACK POPUP_WITHOUT BLACK BG'


          },
          {
            type: "sprite",
             atlasParent : 'buttons',
            content: 'CLOSE_BUTTON_NORMAL',
            //content: "close_button",
            offsetX: 209,
            offsetY: -250,
            callback: function()
                    {
                      fill_elements[2] =2;
                      reg.modal.hideModal("modal3");

                    }
        },
        {

           type : "text",
           content: "Sorry!",
          offsetX : -160,
          offsetY: -240,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0x00B8E6",

        },
         {

           type : "text",
           content: "You should have rotated the Earth so that it is early\nmorning in Peru and collected the element Tin (Sn).",
          offsetX : 10,
          offsetY: -195,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0x00B8E6",

        },
         {

           type : "text",
           content: "Click X to continue.",
          offsetX : -115,
          offsetY: -150,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0xeeeeee",

        },

         {
            type: "sprite",
             atlasParent : 'answer_screens',
            content: 'Answer04',
            //content: "close_button",
            offsetX: 0,
            offsetY: 0,
        },

          {
            type: "sprite",
             atlasParent : 'game_astri',
            content: '6_AM',
            //content: "close_button",
            offsetX: -15,
            offsetY: 170,
        },
          {

           type : "text",
           content: "Morning",
          offsetX : -170,
          offsetY: 170,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0xeeeeee",

        },



          ]

    });
 reg.modal.createModal({
        type: "modal4",
        includeBackground: true,
        modalCloseOnInput: false,
        itemsArr: [{
            type: 'image',
            //atlasParent :'demo',
            content : 'rules'


          },
          {
            type: "sprite",
            atlasParent : 'buttons',
            content: 'CLOSE_BUTTON_NORMAL',
            offsetX: 220,
            offsetY: -270,
            callback: function()
                    {
                      reg.modal.hideModal("modal4");
                    }
        },
            {

           type : "text",
           content: "Click X to continue.",
          offsetX : 0,
          offsetY: 260,
          fontFamily: "tahoma",
          fontSize: 15,
          align: "left",
          color: "0xeeeeee",

        }


          ]

    });
  },
  showModal1:function()
  {
     yay_sound.play('',0,1);
    reg.modal.showModal("modal1");
},
showModal2:function()
  {

    reg.modal.showModal("modal2");
},
showModal3:function()
  {

    reg.modal.showModal("modal3");
},
showModal4:function()
  {

    reg.modal.showModal("modal4");
},
next_question_three:function()
{
  //reg.modal.hideModal("modal1");
  //fill_elements[0] = 1;
  //making element fly
  //elements[0] = game.add.sprite(147,349,'game_astri','copper');
  if(fill_elements[2] == 1)
  {
  holders[2].loadTexture('game_astri',element_holder_names[2]);
   treasure_sound.play('',0,1);
   fill_elements[2] = 4;
  submit_buttons[3].inputEnabled = false;

  //next_buttons[3] = game.add.button(388,598,'buttons',this.next_stage_four,this,'NEXT_BUTTON_ROLLOVER','NEXT_BUTTON_NORMAL','NEXT_BUTTON_MOUSE_DOWN');
  }
  else
  {
   submit_buttons[3].inputEnabled = false;

  //next_buttons[3] = game.add.button(388,598,'buttons',this.next_stage_four,this,'NEXT_BUTTON_ROLLOVER','NEXT_BUTTON_NORMAL','NEXT_BUTTON_MOUSE_DOWN');
  }
  //game.physics.enable(elements[0], Phaser.Physics.ARCADE);

    //elements[0].body.velocity.x=150;
    //elements[0].

},
next_stage_four : function()
{
  if(count_no_of_attempts[3] == 1)
  {
   clueEnd(clue_number1[3],count_no_of_attempts[3],degrees_of_position[z-1]);
  }
   else
   {
     clueEnd(clue_number1[3],count_no_of_attempts[3],degrees_of_position[z-2],degrees_of_position[z-1]);
   }
  console.log('stop');
  game.state.start('PlayGame4');
}


}
var playGame4 = function(game){}
playGame4.prototype =
{

  init : function()
  {
     game.load = new CustomLoader(game);
  },
  preload : function()
  {
   game.add.plugin(PhaserInput.Plugin);
   game.load.atlasJSONHash('game_astri','assets/all_screen_astro_2.png','assets/all_screen_astro_2.json');
   game.load.atlasJSONHash('buttons','assets/buttons_en.png','assets/buttons_en.json');
   game.load.atlasJSONHash('demo','assets/demo.png','assets/demo.json');
   game.load.image('rules','assets/rule_popup.jpg');
   game.load.webfont('tahoma','Tahoma');
    game.load.atlasJSONHash('game_astro','assets/sprites_2.png','assets/sprites_2.json');
    game.load.audio('yay','assets/sounds/yay.wav');
    game.load.audio('rotation','assets/sounds/rotation.wav');
    game.load.audio('treasure','assets/sounds/correct.wav');
      game.load.atlasJSONHash('answer_screens','assets/spritesheet_en.png','assets/sprites_en.json');

 },
  create : function()
  {
    reg.modal = new gameModal(game);
       this.createModals();
  background = game.add.sprite(0,0,'game_astro','BACKGROUND_with_sunrays');
   rotate_sound = game.add.audio('rotation');
        yay_sound = game.add.audio('yay');
        click_sound = game.add.audio('click');
        treasure_sound = game.add.audio('treasure');

    var k = 0;
    var j = 0;
     //adding element holders
    for(var i = 0;i<8;i++)
    {

      if(i%2==0)
      {
      if(fill_elements[i]==0 || fill_elements[i]==2)
      {
      holders[i] = game.add.sprite(653,133 + (k*124),'game_astri','ELEMENT_HOLDER_LIGHTOFF');
      k = k+1;
      }
      else
      {
      holders[i] = game.add.sprite(653,133 + (k*124),'game_astri',element_holder_names[i]);
      k = k +1;
      }
      }
      else
      {
      if(fill_elements[i]==0 || fill_elements[i]==2)
      {
      holders[i] = game.add.sprite(728,133 + (j*124),'game_astri','ELEMENT_HOLDER_LIGHTOFF');
      j=j+1;
      }
      else
      {
        holders[i] = game.add.sprite(728,133 + (j*124),'game_astri',element_holder_names[i]);
      j = j +1;
      }
    }
  }
   var style = { font: "bold 18px tahoma", fill: "#00FF7F", boundsAlignH: "center", boundsAlignV: "middle" };
   var style0 = { font: "bold 18px tahoma", fill: "#00FFFF", boundsAlignH: "center", boundsAlignV: "middle" };
   clue_name = game.add.text(48,22,'Element Hunt',style0);
    clue_number = game.add.text(78,52,clue_number1[4],style);
    var style1 = { font: "17px tahoma", fill: "#00B8E6", boundsAlignH: "center", boundsAlignV: "middle" };
  var style5 = { font: "bold 17px tahoma", fill: "#00B8E6", boundsAlignH: "center", boundsAlignV: "middle" };
 // clue_text1 = game.add.text(180,17,clue_text[0],style1);
  //clue_text1.wordWrap = true;
  //clue_text1.wordWrapWidth = 330;
  country[4] = game.add.text(248,17,country_name[4],style5);
  time_of_day[4] = game.add.text(385,17,time_of_day_text[4],style5);
  elementname[4] = game.add.text(312,48,elementname_text[4],style5);
  clue_line_one[4] = game.add.text(180,17,'Move to             when the',style1);
  clue_line_two[4] = game.add.text(180,48,'Look around and          you will get.',style1);
  var style3 = { font: "bold 16px tahoma", fill: "#F0E6DB", boundsAlignH: "center", boundsAlignV: "middle" };
   var submit = game.add.text(512,78,'Submit',style3);
  var style2 = { font: "16px tahoma", fill: "#F0E6DB", boundsAlignH: "center", boundsAlignV: "middle" };
  instruction_text = game.add.text(163,78,instruction_text_content,style2);
  rules_button = game.add.button(0,122,'buttons',this.rules_button_function,this,'RULE_ROLLOVER','RULE_NORMAL','RULE_MOUSEDOWN');
  demo_button = game.add.button(0,154,'buttons',this.demo_button_function,this,'DEMO_ROLLOVER','DEMO_NORMAL','DEMO_MOUSEDOWN');
  reset_btn[4] = game.add.button(140,590,'game_astro',this.reset_function_five,this,'RESET_BUTTON_ROLLOVER','RESET_BUTTON_NORMAL','RESET_BUTTON_MOUSE_DOWN');
  submit_buttons[4] = game.add.button(252,598,'buttons',this.submit_function_four,this,'SUBMIT_BUTTON_ROLLOVER','SUBMIT_BUTTON_NORMAL','SUBMIT_BUTTON_MOUSE_DOWN');
  next_buttons[4] = game.add.button(360,598,'buttons',this.next_stage_five,this,'NEXT_BUTTON_ROLLOVER','NEXT_BUTTON_NORMAL','NEXT_BUTTON_MOUSE_DOWN');

  //submit_buttons[4] = game.add.button(272,598,'buttons',this.submit_function_four,this,'SUBMIT_BUTTON_ROLLOVER','SUBMIT_BUTTON_NORMAL','SUBMIT_BUTTON_MOUSE_DOWN');
  earth_np = game.add.sprite(308,353,'game_astro','NORTH_EARTH_WITHLABLE');
  earth_np.scale.setTo(0.85,0.85);
  earth_np.anchor.setTo(0.5,0.5);

              anticlockwise_arrow = game.add.button(307,354,'game_astri',this.input_function_five,this,'ARROW_ANTI_CLOCKWISE_WITH_GLOW','ARROW_ANTI_CLOCKWISE','ARROW_ANTI_CLOCKWISE_WITH_GLOW');
            anticlockwise_arrow.scale.setTo(0.85,0.85);
            anticlockwise_arrow.anchor.setTo(0.5,0.5);

             anticlockwise_arrow.onInputOver.add(this.input_function,this);
            anticlockwise_arrow.onInputOut.add(this.input_function_stop,this);
},
update : function()
{
  if(fill_elements[5] == 1 || fill_elements[5] == 2)
  {
     this.next_question_four();
  }
   if(count_no_of_attempts[4] > 3 ||  fill_elements[5] == 1 ||  fill_elements[5] == 2 || fill_elements[5] == 4)
  {
    next_buttons[4].tint = 0xffffff;
   next_buttons[4].inputEnabled = true;
   reset_btn[4].tint = 0x666677;
   reset_btn[4].inputEnabled = false;
   anticlockwise_arrow.inputEnabled = false;
   submit_buttons[4].inputEnabled = false;
   submit_buttons[4].tint = 0x666677;

  }
  else
  {
    next_buttons[4].tint = 0x666677;
   next_buttons[4].inputEnabled = false;
   reset_btn[4].tint = 0xffffff;
   reset_btn[4].inputEnabled = true;
   anticlockwise_arrow.inputEnabled = true;
   submit_buttons[4].inputEnabled = true;
   submit_buttons[4].tint = 0xffffff;

  }
  if(rotation[4] ==1 )
  {
    console.log(earth_np.angle);
    anticlockwise_arrow.angle = anticlockwise_arrow.angle - 0.4;
   earth_np.angle = earth_np.angle - 0.4;
    //rotate_sound.play('',0,1);
  }

},
reset_function_five : function()
{
earth_np.angle = 0;
},


 /*render : function()
         {
          game.debug.text('x: ' + game.input.x + ' y: ' + game.input.y, 32, 32);
          }, */
          input_function_five : function()
          {

             rotation[4] = 1;
          },
          input_function : function()

 {
  rotation[4] = 1;
},
           input_function_stop : function()
           {
              rotation[4] = 0;
           },
                     //the main function which calculates whether answer is right.
          submit_function_four : function()
          {
            count_no_of_attempts[4] = count_no_of_attempts[4] + 1;
            if(count_no_of_attempts[4] < 2)
            {
              degrees_of_position[z] = earth_np.angle;
              z++;
            if(earth_np.angle <= -55  && earth_np.angle >= -110)
            {
              console.log('correct');
              this.showModal1();
            }
            else
            {
             console.log('false');
             this.showModal2();
            }
          }
          else
          {
            degrees_of_position[z] = earth_np.angle;
            z++;
             if(earth_np.angle <= -55  && earth_np.angle >= -110)
            {
              console.log('correct');
              this.showModal1();
            }
            else
            {
            console.log('show popup');
            this.showModal3();
          }
          }
          },
          rules_button_function : function()
          {
            console.log('hi');
            this.showModal4();
          },
          demo_button_function : function()
          {
            game.state.start('VideoScreen5');
          },

 createModals: function() {

     reg.modal.createModal({
        type: "modal1",
        includeBackground: true,
        modalCloseOnInput: false,
        itemsArr: [{
            type: 'sprite',
            atlasParent :'game_astri',
            content : 'FEEDBACK POPUP_WITHOUT BLACK BG'


          },
          {
            type: "sprite",
             atlasParent : 'buttons',
            content: 'CLOSE_BUTTON_NORMAL',
            //content: "close_button",
            offsetX: 209,
            offsetY: -250,
            callback: function()
                    {
                      fill_elements[5] = 1;
                      reg.modal.hideModal("modal1");

                    }
        },
         {

           type : "text",
           content: "Well done!",
          offsetX : 0,
          offsetY: -220,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0xeeeeee",

        },
         {

           type : "text",
           content: "You found Silver (Ag).",
          offsetX : 0,
          offsetY: -190,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0x00B8E6",

        },
          {

           type : "text",
           content: "Click X to continue.",
          offsetX : 0,
          offsetY: -160,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0xeeeeee",

        },
         {
            type: "sprite",
             atlasParent : 'answer_screens',
            content: 'Answer05',
            //content: "close_button",
            offsetX: -110,
            offsetY: -10,
        },
           {
            type: "sprite",
             atlasParent : 'game_astri',
            content: '6_PM',
            //content: "close_button",
            offsetX: -100,
            offsetY: 170,
        },
          {

           type : "text",
           content: "Evening",
          offsetX : 40,
          offsetY: 180,
          fontFamily: "tahoma",
          fontSize: 18,
          align: "left",
          color: "0xeeeeee",

        },



          ]

    });
 reg.modal.createModal({
        type: "modal2",
        includeBackground: true,
        modalCloseOnInput: false,
        itemsArr: [{
            type: 'sprite',
            atlasParent :'game_astri',
            content : 'FEEDBACK POPUP_WITHOUT BLACK BG'


          },
          {
            type: "sprite",
             atlasParent : 'buttons',
            content: 'CLOSE_BUTTON_NORMAL',
            //content: "close_button",
            offsetX: 209,
            offsetY: -250,
            callback: function()
                    {
                      reg.modal.hideModal("modal2");
                    }
        },
        {

           type : "text",
           content: "That is not correct.",
          offsetX : -135,
          offsetY: -160,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0x00B8E6",

        },
         {

           type : "text",
           content: "Notice that the clue mentions the time of day and a \ncountry. Find the name of the country and time of day \nfrom the clue. Rotate the Earth so that the time and \nplace are correct. Try Again.",
          offsetX : 0,
          offsetY: -60,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0x00B8E6",

        },

              {

           type : "text",
           content: "If you need help with the activity, click the \nDemo button.",
          offsetX : -40,
          offsetY: 30,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0xeeeeee",

        },
        {

           type : "text",
           content: "Click X to continue.",
          offsetX : -135,
          offsetY: 100,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0xeeeeee",

        },
          ]

    });
   reg.modal.createModal({
        type: "modal3",
        includeBackground: true,
        modalCloseOnInput: false,
        itemsArr: [{
            type: 'sprite',
            atlasParent :'game_astri',
            content : 'FEEDBACK POPUP_WITHOUT BLACK BG'


          },
          {
            type: "sprite",
             atlasParent : 'buttons',
            content: 'CLOSE_BUTTON_NORMAL',
            //content: "close_button",
            offsetX: 209,
            offsetY: -250,
            callback: function()
                    {
                      fill_elements[5] =2;
                      reg.modal.hideModal("modal3");

                    }
        },
         {

           type : "text",
           content: "Sorry! ",
          offsetX : -160,
          offsetY: -235,
          fontFamily: "tahoma",
          fontSize: 16,
          align: "left",
          color: "0x00B8E6",

        },
        {

           type : "text",
           content: "You should have rotated the Earth so that it is \nevening in Mexico and collected the element Silver (Ag).",
          offsetX : 0,
          offsetY: -195,
          fontFamily: "tahoma",
          fontSize: 16,
          align: "left",
          color: "0x00B8E6",

        },
         {

           type : "text",
           content: "Click X to continue.",
          offsetX : -135,
          offsetY: -150,
          fontFamily: "tahoma",
          fontSize: 15,
          align: "left",
          color: "0xeeeeee",

        },
         {
            type: "sprite",
             atlasParent : 'answer_screens',
            content: 'Answer05',
            //content: "close_button",
            offsetX: -110,
            offsetY: -5,
        },

          {
            type: "sprite",
             atlasParent : 'game_astri',
            content: '6_PM',
            //content: "close_button",
            offsetX: -100,
            offsetY: 175,
        },
          {

           type : "text",
           content: "Evening",
          offsetX : 50,
          offsetY: 180,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0xeeeeee",

        },



          ]

    });
 reg.modal.createModal({
        type: "modal4",
        includeBackground: true,
        modalCloseOnInput: false,
        itemsArr: [{
            type: 'image',
            //atlasParent :'demo',
            content : 'rules'


          },
          {
            type: "sprite",
            atlasParent : 'buttons',
            content: 'CLOSE_BUTTON_NORMAL',
            offsetX: 220,
            offsetY: -270,
            callback: function()
                    {
                      reg.modal.hideModal("modal4");
                    }
        },
            {

           type : "text",
           content: "Click X to continue.",
          offsetX : 0,
          offsetY: 260,
          fontFamily: "tahoma",
          fontSize: 15,
          align: "left",
          color: "0xeeeeee",

        }


          ]

    });
  },
  showModal1:function()
  {
     yay_sound.play('',0,1);
    reg.modal.showModal("modal1");
},
showModal2:function()
  {

    reg.modal.showModal("modal2");
},
showModal3:function()
  {

    reg.modal.showModal("modal3");
},
showModal4:function()
  {

    reg.modal.showModal("modal4");
},
next_question_four:function()
{
  //reg.modal.hideModal("modal1");
  //fill_elements[0] = 1;
  //making element fly
  //elements[0] = game.add.sprite(147,349,'game_astri','copper');
  if(fill_elements[5] == 1)
  {
  //elements[0] = game.add.sprite(663,389,'game_astri','COBALT');
  holders[5].loadTexture('game_astro',element_holder_names[5]);
  submit_buttons[4].inputEnabled = false;
  fill_elements[5] = 4;
   treasure_sound.play('',0,1);

  //next_buttons[4] = game.add.button(388,598,'buttons',this.next_stage_four,this,'NEXT_BUTTON_ROLLOVER','NEXT_BUTTON_NORMAL','NEXT_BUTTON_MOUSE_DOWN');
  }
  else
  {
   submit_buttons[4].inputEnabled = false;

  //next_buttons[4] = game.add.button(388,598,'buttons',this.next_stage_four,this,'NEXT_BUTTON_ROLLOVER','NEXT_BUTTON_NORMAL','NEXT_BUTTON_MOUSE_DOWN');
  }
  //game.physics.enable(elements[0], Phaser.Physics.ARCADE);

    //elements[0].body.velocity.x=150;
    //elements[0].

},
next_stage_five : function()
{
  if(count_no_of_attempts[4] == 1)
  {
   clueEnd(clue_number1[4],count_no_of_attempts[4],degrees_of_position[z-1]);
  }
   else
   {
     clueEnd(clue_number1[4],count_no_of_attempts[4],degrees_of_position[z-2],degrees_of_position[z-1]);
   }
  game.state.start('PlayGame5');
}
}
var playGame5 = function(game){}
playGame5.prototype =
{
   init : function()
  {
     game.load = new CustomLoader(game);
  },
  preload : function()
  {
   game.add.plugin(PhaserInput.Plugin);
   game.load.atlasJSONHash('game_astri','assets/all_screen_astro_2.png','assets/all_screen_astro_2.json');
   game.load.atlasJSONHash('buttons','assets/buttons_en.png','assets/buttons_en.json');
   game.load.atlasJSONHash('demo','assets/demo.png','assets/demo.json');
   game.load.image('rules','assets/rule_popup.jpg');
   game.load.webfont('tahoma','Tahoma');
    game.load.atlasJSONHash('game_astro','assets/sprites_2.png','assets/sprites_2.json');
    game.load.audio('yay','assets/sounds/yay.wav');
    game.load.audio('rotation','assets/sounds/rotation.wav');
    game.load.audio('treasure','assets/sounds/correct.wav');
      game.load.atlasJSONHash('answer_screens','assets/spritesheet_en.png','assets/sprites_en.json');

 },
  create : function()
  {
    reg.modal = new gameModal(game);
       this.createModals();
  background = game.add.sprite(0,0,'game_astro','BACKGROUND_with_sunrays');
   rotate_sound = game.add.audio('rotation');
        yay_sound = game.add.audio('yay');
        click_sound = game.add.audio('click');
        treasure_sound = game.add.audio('treasure');

    var k = 0;
    var j = 0;
    //adding element holders
    for(var i = 0;i<8;i++)
    {

      if(i%2==0)
      {
      if(fill_elements[i]==0 || fill_elements[i]==2)
      {
      holders[i] = game.add.sprite(653,133 + (k*124),'game_astri','ELEMENT_HOLDER_LIGHTOFF');
      k = k+1;
      }
      else
      {
      holders[i] = game.add.sprite(653,133 + (k*124),'game_astri',element_holder_names[i]);
      k = k +1;
      }
      }
      else
      {
      if(fill_elements[i]==0 || fill_elements[i]==2)
      {
      holders[i] = game.add.sprite(728,133 + (j*124),'game_astri','ELEMENT_HOLDER_LIGHTOFF');
      j=j+1;
      }
      else
      {
        holders[i] = game.add.sprite(728,133 + (j*124),'game_astri',element_holder_names[i]);
      j = j +1;
      }
    }
  }
   var style = { font: "bold 18px tahoma", fill: "#00FF7F", boundsAlignH: "center", boundsAlignV: "middle" };
   var style0 = { font: "bold 18px tahoma", fill: "#00FFFF", boundsAlignH: "center", boundsAlignV: "middle" };
   //var style = { font: "bold 18px tahoma", fill: "#90CCF0", boundsAlignH: "center", boundsAlignV: "middle" };
   clue_name = game.add.text(48,22,'Element Hunt',style0);
    clue_number = game.add.text(78,52,clue_number1[5],style);
    var style1 = { font: "17px tahoma", fill: "#00B8E6", boundsAlignH: "center", boundsAlignV: "middle" };
 var style5 = { font: "bold 17px tahoma", fill: "#00B8E6", boundsAlignH: "center", boundsAlignV: "middle" };
 // clue_text1 = game.add.text(180,17,clue_text[0],style1);
  //clue_text1.wordWrap = true;
  //clue_text1.wordWrapWidth = 330;
  country[5] = game.add.text(230,17,country_name[5],style5);
  time_of_day[5] = game.add.text(405,17,time_of_day_text[5],style5);
  elementname[5] = game.add.text(250,48,elementname_text[5],style5);
  clue_line_one[5] = game.add.text(180,17,'Go to           when the Sun is ',style1);
  clue_line_two[5] = game.add.text(180,48,'Precious               is easy to come by.',style1);
  var style3 = { font: "bold 16px tahoma", fill: "#F0E6DB", boundsAlignH: "center", boundsAlignV: "middle" };
   var submit = game.add.text(512,78,'Submit',style3);
  var style2 = { font: "16px tahoma", fill: "#F0E6DB", boundsAlignH: "center", boundsAlignV: "middle" };
  instruction_text = game.add.text(163,78,instruction_text_content,style2);
  rules_button = game.add.button(0,122,'buttons',this.rules_button_function,this,'RULE_ROLLOVER','RULE_NORMAL','RULE_MOUSEDOWN');
  demo_button = game.add.button(0,154,'buttons',this.demo_button_function,this,'DEMO_ROLLOVER','DEMO_NORMAL','DEMO_MOUSEDOWN');
   reset_btn[5] = game.add.button(140,590,'game_astro',this.reset_function_six,this,'RESET_BUTTON_ROLLOVER','RESET_BUTTON_NORMAL','RESET_BUTTON_MOUSE_DOWN');
  submit_buttons[5] = game.add.button(252,598,'buttons',this.submit_function_five,this,'SUBMIT_BUTTON_ROLLOVER','SUBMIT_BUTTON_NORMAL','SUBMIT_BUTTON_MOUSE_DOWN');
  next_buttons[5] = game.add.button(360,598,'buttons',this.next_stage_six,this,'NEXT_BUTTON_ROLLOVER','NEXT_BUTTON_NORMAL','NEXT_BUTTON_MOUSE_DOWN');
  //submit_buttons[5] = game.add.button(272,598,'buttons',this.submit_function_five,this,'SUBMIT_BUTTON_ROLLOVER','SUBMIT_BUTTON_NORMAL','SUBMIT_BUTTON_MOUSE_DOWN');
  earth_np = game.add.sprite(308,353,'game_astri','SOUTH_EARTH_WITHLABLE');
  earth_np.scale.setTo(0.85,0.85);
  earth_np.anchor.setTo(0.5,0.5);

             clockwise_arrow = game.add.button(307,354,'game_astri',this.input_function_six,this,'ARROW_CLOCKWISE_WITH_GLOW','ARROW_CLOCKWISE','ARROW_CLOCKWISE_WITH_GLOW');
            clockwise_arrow.scale.setTo(0.85,0.85);
            clockwise_arrow.anchor.setTo(0.5,0.5);
            /*anticlockwise_arrow = game.add.button(307,354,'game_astri',this.input_function,this,'ARROW_ANTI_CLOCKWISE_WITH_GLOW','ARROW_ANTI_CLOCKWISE','ARROW_ANTI_CLOCKWISE_WITH_GLOW');
            anticlockwise_arrow.scale.setTo(0.85,0.85);
            anticlockwise_arrow.anchor.setTo(0.5,0.5);*/
             clockwise_arrow.onInputOver.add(this.input_function,this);
            clockwise_arrow.onInputOut.add(this.input_function_stop,this);
},
update : function()
{
  if(fill_elements[1] == 1 || fill_elements[1] == 2)
  {
     this.next_question_five();
  }
  if(count_no_of_attempts[5] >= 3 ||  fill_elements[1] == 1 ||  fill_elements[1] == 2 || fill_elements[1] == 4)
  {
    next_buttons[5].tint = 0xffffff;
   next_buttons[5].inputEnabled = true;
   reset_btn[5].tint = 0x666677;
   reset_btn[5].inputEnabled = false;
   clockwise_arrow.inputEnabled = false;
   submit_buttons[5].inputEnabled = false;
   submit_buttons[5].tint = 0x666677;
  }
  else
  {
    next_buttons[5].tint = 0x666677;
   next_buttons[5].inputEnabled = false;
   reset_btn[5].tint = 0xffffff;
   reset_btn[5].inputEnabled = true;
   clockwise_arrow.inputEnabled = true;
    submit_buttons[5].inputEnabled = true;
   submit_buttons[5].tint = 0xffffff;
  }
  //
  if(rotation[5] ==1 )
  {
    console.log(earth_np.angle);
    clockwise_arrow.angle = clockwise_arrow.angle + 0.4;
   earth_np.angle = earth_np.angle + 0.4;
    //rotate_sound.play('',0,1);
  }
},
 /*render : function()
         {
          game.debug.text('x: ' + game.input.x + ' y: ' + game.input.y, 32, 32);
          }, */
          input_function : function()
          {

            rotation[5] =1;
          },
          input_function_stop : function()
          {
            rotation[5] = 0;
          },
          input_function_six : function()
          {
              rotation[5] = 1;
          },
          //the main function which calculates whether answer is right.
          submit_function_five : function()
          {
            count_no_of_attempts[5] = count_no_of_attempts[5] + 1;
            if(count_no_of_attempts[5] < 2)
            {
              degrees_of_position[z] = earth_np.angle;
              z++;
            if(earth_np.angle <= -25  && earth_np.angle >= -70)
            {
              console.log('correct');
              this.showModal1();
            }
            else
            {
             console.log('false');
             this.showModal2();
            }
          }
          else
          {
            degrees_of_position[z] = earth_np.angle;
            z++;
            if(earth_np.angle <= -25  && earth_np.angle >= -70)
            {
              console.log('correct');
              this.showModal1();
            }
            else
            {
            console.log('show popup');
            this.showModal3();
          }
          }
          },
          rules_button_function : function()
          {
            console.log('hi');
            this.showModal4();
          },
          demo_button_function : function()
          {
            game.state.start('VideoScreen6');
          },
          reset_function_six : function()
          {
             earth_np.angle = 0;
          },

 createModals: function() {

     reg.modal.createModal({
        type: "modal1",
        includeBackground: true,
        modalCloseOnInput: false,
        itemsArr: [{
            type: 'sprite',
            atlasParent :'game_astri',
            content : 'FEEDBACK POPUP_WITHOUT BLACK BG'


          },
          {
            type: "sprite",
             atlasParent : 'buttons',
            content: 'CLOSE_BUTTON_NORMAL',
            //content: "close_button",
            offsetX: 209,
            offsetY: -250,
            callback: function()
                    {
                      fill_elements[1] = 1;
                      reg.modal.hideModal("modal1");

                    }
        },
        {

           type : "text",
           content: "Well done!",
          offsetX : 0,
          offsetY: -220,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0xeeeeee",

        },
         {

           type : "text",
           content: "You found Platinum (Pt), the next element in the list.",
          offsetX : 0,
          offsetY: -180,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0x00B8E6",

        },
          {

           type : "text",
           content: "Click X to continue.",
          offsetX : 0,
          offsetY: -140,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0xeeeeee",

        },

         {
            type: "sprite",
             atlasParent : 'answer_screens',
            content: 'Answer06',
            //content: "close_button",
            offsetX: 40,
            offsetY: 35,
        },
           {
            type: "sprite",
             atlasParent : 'game_astri',
            content: '12_PM',
            //content: "close_button",
            offsetX: -190,
            offsetY: 18,
        },
          {

           type : "text",
           content: "Noon",
          offsetX : -180,
          offsetY: 60,
          fontFamily: "tahoma",
          fontSize: 18,
          align: "left",
          color: "0xeeeeee",

        },



          ]

    });
 reg.modal.createModal({
        type: "modal2",
        includeBackground: true,
        modalCloseOnInput: false,
        itemsArr: [{
            type: 'sprite',
            atlasParent :'game_astri',
            content : 'FEEDBACK POPUP_WITHOUT BLACK BG'


          },
          {
            type: "sprite",
             atlasParent : 'buttons',
            content: 'CLOSE_BUTTON_NORMAL',
            //content: "close_button",
            offsetX: 209,
            offsetY: -250,
            callback: function()
                    {
                      reg.modal.hideModal("modal2");
                    }
        },
         {

           type : "text",
           content: "That is not correct.",
          offsetX : -135,
          offsetY: -160,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0x00B8E6",

        },
         {

           type : "text",
           content: "Notice that the clue mentions the time of day and a \ncountry. Find the name of the country and time of day \nfrom the clue. Rotate the Earth so that the time and \nplace are correct. Try Again.",
          offsetX : 0,
          offsetY: -60,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0x00B8E6",

        },

              {

           type : "text",
           content: "If you need help with the activity, click the \nDemo button.",
          offsetX : -40,
          offsetY: 30,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0xeeeeee",

        },
        {

           type : "text",
           content: "Click X to continue.",
          offsetX : -135,
          offsetY: 100,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0xeeeeee",

        },
          ]

    });
   reg.modal.createModal({
        type: "modal3",
        includeBackground: true,
        modalCloseOnInput: false,
        itemsArr: [{
            type: 'sprite',
            atlasParent :'game_astri',
            content : 'FEEDBACK POPUP_WITHOUT BLACK BG'


          },
          {
            type: "sprite",
             atlasParent : 'buttons',
            content: 'CLOSE_BUTTON_NORMAL',
            //content: "close_button",
            offsetX: 209,
            offsetY: -250,
            callback: function()
                    {
                      fill_elements[1] =2;
                      reg.modal.hideModal("modal3");

                    }
        },
        {

           type : "text",
           content: "Sorry! ",
          offsetX : -170,
          offsetY: -220,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0x00B8E6",

        },
        {

           type : "text",
           content: "You should have rotated the Earth so that it is \nnoon in Brazil and collected the element Platinum (Pt).",
          offsetX : 0,
          offsetY: -170,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0x00B8E6",

        },
         {

           type : "text",
           content: "Click X to continue.",
          offsetX : -130,
          offsetY: -120,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0xeeeeee",

        },
         {
            type: "sprite",
             atlasParent : 'answer_screens',
            content: 'Answer06',
            //content: "close_button",
            offsetX: 40,
            offsetY: 35,
        },

          {
            type: "sprite",
             atlasParent : 'game_astri',
            content: '12_PM',
            //content: "close_button",
            offsetX: -190,
            offsetY: 18,
        },
          {

           type : "text",
           content: "Noon",
          offsetX : -180,
          offsetY: 60,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0xeeeeee",

        },



          ]

    });
 reg.modal.createModal({
        type: "modal4",
        includeBackground: true,
        modalCloseOnInput: false,
        itemsArr: [{
            type: 'image',
            //atlasParent :'demo',
            content : 'rules'


          },
          {
            type: "sprite",
            atlasParent : 'buttons',
            content: 'CLOSE_BUTTON_NORMAL',
            offsetX: 220,
            offsetY: -270,
            callback: function()
                    {
                      reg.modal.hideModal("modal4");
                    }
        },
            {

           type : "text",
           content: "Click X to continue.",
          offsetX : 0,
          offsetY: 260,
          fontFamily: "tahoma",
          fontSize: 15,
          align: "left",
          color: "0xeeeeee",

        }


          ]

    });
  },
  showModal1:function()
  {
     yay_sound.play('',0,1);
    reg.modal.showModal("modal1");
},
showModal2:function()
  {

    reg.modal.showModal("modal2");
},
showModal3:function()
  {

    reg.modal.showModal("modal3");
},
showModal4:function()
  {

    reg.modal.showModal("modal4");
},
next_question_five:function()
{
  //reg.modal.hideModal("modal1");
  //fill_elements[0] = 1;
  //making element fly
  //elements[0] = game.add.sprite(147,349,'game_astri','copper');
  if(fill_elements[1] == 1)
  {
  holders[1].loadTexture('game_astri',element_holder_names[1]);
   treasure_sound.play('',0,1);
   fill_elements[1] = 4;
  submit_buttons[5].inputEnabled = false;

  //submit_buttons[5].inputEnabled = false;

  //next_buttons[5] = game.add.button(388,598,'buttons',this.next_stage_five,this,'NEXT_BUTTON_ROLLOVER','NEXT_BUTTON_NORMAL','NEXT_BUTTON_MOUSE_DOWN');
  }
  else
  {
   submit_buttons[5].inputEnabled = false;

  //next_buttons[5] = game.add.button(388,598,'buttons',this.next_stage_five,this,'NEXT_BUTTON_ROLLOVER','NEXT_BUTTON_NORMAL','NEXT_BUTTON_MOUSE_DOWN');
  }
  //game.physics.enable(elements[0], Phaser.Physics.ARCADE);

    //elements[0].body.velocity.x=150;
    //elements[0].

},
next_stage_six : function()
{
  if(count_no_of_attempts[5] == 1)
  {
   clueEnd(clue_number1[5],count_no_of_attempts[5],degrees_of_position[z-1]);
  }
   else
   {
     clueEnd(clue_number1[5],count_no_of_attempts[5],degrees_of_position[z-2],degrees_of_position[z-1]);
   }
  game.state.start('PlayGame6');
}

}
var playGame6 = function(game){}
playGame6.prototype =
{
    init : function()
  {
     game.load = new CustomLoader(game);
  },
  preload : function()
  {
   game.add.plugin(PhaserInput.Plugin);
   game.load.atlasJSONHash('game_astri','assets/all_screen_astro_2.png','assets/all_screen_astro_2.json');
   game.load.atlasJSONHash('buttons','assets/buttons_en.png','assets/buttons_en.json');
   game.load.atlasJSONHash('demo','assets/demo.png','assets/demo.json');
   game.load.image('rules','assets/rule_popup.jpg');
   game.load.webfont('tahoma','Tahoma');
    game.load.atlasJSONHash('game_astro','assets/sprites_2.png','assets/sprites_2.json');
    game.load.audio('yay','assets/sounds/yay.wav');
    game.load.audio('rotation','assets/sounds/rotation.wav');
    game.load.audio('treasure','assets/sounds/correct.wav');
      game.load.atlasJSONHash('answer_screens','assets/spritesheet_en.png','assets/sprites_en.json');

 },
  create : function()
  {
    reg.modal = new gameModal(game);
       this.createModals();
  background = game.add.sprite(0,0,'game_astro','BACKGROUND_with_sunrays');
   rotate_sound = game.add.audio('rotation');
        yay_sound = game.add.audio('yay');
        click_sound = game.add.audio('click');
        treasure_sound = game.add.audio('treasure');

    var k = 0;
    var j = 0;
     //adding element holders
    for(var i = 0;i<8;i++)
    {

      if(i%2==0)
      {
      if(fill_elements[i]==0 || fill_elements[i]==2)
      {
      holders[i] = game.add.sprite(653,133 + (k*124),'game_astri','ELEMENT_HOLDER_LIGHTOFF');
      k = k+1;
      }
      else
      {
      holders[i] = game.add.sprite(653,133 + (k*124),'game_astri',element_holder_names[i]);
      k = k +1;
      }
      }
      else
      {
      if(fill_elements[i]==0 || fill_elements[i]==2)
      {
      holders[i] = game.add.sprite(728,133 + (j*124),'game_astri','ELEMENT_HOLDER_LIGHTOFF');
      j=j+1;
      }
      else
      {
        holders[i] = game.add.sprite(728,133 + (j*124),'game_astri',element_holder_names[i]);
      j = j +1;
      }
    }
  }
  var style = { font: "bold 18px tahoma", fill: "#00FF7F", boundsAlignH: "center", boundsAlignV: "middle" };
   var style0 = { font: "bold 18px tahoma", fill: "#00FFFF", boundsAlignH: "center", boundsAlignV: "middle" };
   //var style = { font: "bold 18px tahoma", fill: "#90CCF0", boundsAlignH: "center", boundsAlignV: "middle" };
   clue_name = game.add.text(48,22,'Element Hunt',style0);
    clue_number = game.add.text(78,52,clue_number1[6],style);
    var style1 = { font: "17px tahoma", fill: "#00B8E6", boundsAlignH: "center", boundsAlignV: "middle" };
     var style5 = { font: "bold 17px tahoma", fill: "#00B8E6", boundsAlignH: "center", boundsAlignV: "middle" };
 // clue_text1 = game.add.text(180,17,clue_text[0],style1);
  //clue_text1.wordWrap = true;
  //clue_text1.wordWrapWidth = 330;
  country[6] = game.add.text(320,48,country_name[6],style5);
  time_of_day[6] = game.add.text(270,17,time_of_day_text[6],style5);
  elementname[6] = game.add.text(429,48,elementname_text[6],style5);
  clue_line_one[6] = game.add.text(180,17,'In the early             when the Sun drives away the cold.',style1);
  clue_line_two[6] = game.add.text(180,48,'Visit the desert of           to find ',style1);
  var style3 = { font: "bold 16px tahoma", fill: "#F0E6DB", boundsAlignH: "center", boundsAlignV: "middle" };
   var submit = game.add.text(512,78,'Submit',style3);
  var style2 = { font: "16px tahoma", fill: "#F0E6DB", boundsAlignH: "center", boundsAlignV: "middle" };
  instruction_text = game.add.text(163,78,instruction_text_content,style2);
  rules_button = game.add.button(0,122,'buttons',this.rules_button_function,this,'RULE_ROLLOVER','RULE_NORMAL','RULE_MOUSEDOWN');

  demo_button = game.add.button(0,154,'buttons',this.demo_button_function,this,'DEMO_ROLLOVER','DEMO_NORMAL','DEMO_MOUSEDOWN');
  reset_btn[6] = game.add.button(140,590,'game_astro',this.reset_function_seven,this,'RESET_BUTTON_ROLLOVER','RESET_BUTTON_NORMAL','RESET_BUTTON_MOUSE_DOWN');
  submit_buttons[6] = game.add.button(252,598,'buttons',this.submit_function_six,this,'SUBMIT_BUTTON_ROLLOVER','SUBMIT_BUTTON_NORMAL','SUBMIT_BUTTON_MOUSE_DOWN');
  next_buttons[6] = game.add.button(360,598,'buttons',this.next_stage_seven,this,'NEXT_BUTTON_ROLLOVER','NEXT_BUTTON_NORMAL','NEXT_BUTTON_MOUSE_DOWN');
  //submit_buttons[6] = game.add.button(272,598,'buttons',this.submit_function_six,this,'SUBMIT_BUTTON_ROLLOVER','SUBMIT_BUTTON_NORMAL','SUBMIT_BUTTON_MOUSE_DOWN');
  earth_np = game.add.sprite(308,353,'game_astro','NORTH_EARTH_WITHLABLE');
  earth_np.scale.setTo(0.85,0.85);
  earth_np.anchor.setTo(0.5,0.5);

              anticlockwise_arrow = game.add.button(307,354,'game_astri',this.input_function_seven,this,'ARROW_ANTI_CLOCKWISE_WITH_GLOW','ARROW_ANTI_CLOCKWISE','ARROW_ANTI_CLOCKWISE_WITH_GLOW');
            anticlockwise_arrow.scale.setTo(0.85,0.85);
            anticlockwise_arrow.anchor.setTo(0.5,0.5);
            anticlockwise_arrow.onInputOver.add(this.input_function,this);
            anticlockwise_arrow.onInputOut.add(this.input_function_stop,this);

},
update : function()
{
  if(fill_elements[0] == 1 || fill_elements[0] == 2)
  {
     this.next_question_six();
  }
     if(count_no_of_attempts[6] > 3 ||  fill_elements[0] == 1 ||  fill_elements[0] == 2 || fill_elements[0] == 4)
  {
    next_buttons[6].tint = 0xffffff;
   next_buttons[6].inputEnabled = true;
   reset_btn[6].tint = 0x666677;
   reset_btn[6].inputEnabled = false;
   anticlockwise_arrow.inputEnabled = false;
   submit_buttons[6].inputEnabled = false;
   submit_buttons[6].tint = 0x666677;

  }
  else
  {
    next_buttons[6].tint = 0x666677;
   next_buttons[6].inputEnabled = false;
   reset_btn[6].tint = 0xffffff;
   reset_btn[6].inputEnabled = true;
   anticlockwise_arrow.inputEnabled = true;
    submit_buttons[6].inputEnabled = true;
   submit_buttons[6].tint = 0xffffff;

  }
  if(rotation[6] ==1 )
  {
    console.log(earth_np.angle);
    anticlockwise_arrow.angle = anticlockwise_arrow.angle - 0.4;
   earth_np.angle = earth_np.angle - 0.4;
    //rotate_sound.play('',0,1);
  }

},
 /*render : function()
         {
          game.debug.text('x: ' + game.input.x + ' y: ' + game.input.y, 32, 32);
          }, */
          input_function : function()
          {
           rotation[6] = 1;
          },
          input_function_stop : function()
          {
            rotation[6] = 0;
          },
          input_function_seven : function()
          {
            rotation[6] = 1;
          },
          //the main function which calculates whether answer is right.
          submit_function_six : function()
          {
            count_no_of_attempts[6] = count_no_of_attempts[6] + 1;
            if(count_no_of_attempts[6] < 2)
            {
              degrees_of_position[z] = earth_np.angle;
              z++;
            if(earth_np.angle <= -105  && earth_np.angle >= -145)
            {
              console.log('correct');
              this.showModal1();
            }
            else
            {
             console.log('false');
             this.showModal2();
            }
          }
          else
          {
            degrees_of_position[z] = earth_np.angle;
            z++;
            if(earth_np.angle <= -105  && earth_np.angle >= -145)
            {
              console.log('correct');
              this.showModal1();
            }
            else
            {
            console.log('show popup');
            this.showModal3();
          }
          }
          //doQuit(count_no_of_attempts);
          },
          rules_button_function : function()
          {
            console.log('hi');
            this.showModal4();
          },
          demo_button_function : function()
          {
           game.state.start('VideoScreen7');
          },
          reset_function_seven : function()
          {
            earth_np.angle = 0;
          },

 createModals: function() {

     reg.modal.createModal({
        type: "modal1",
        includeBackground: true,
        modalCloseOnInput: false,
        itemsArr: [{
            type: 'sprite',
            atlasParent :'game_astri',
            content : 'FEEDBACK POPUP_WITHOUT BLACK BG'


          },
          {
            type: "sprite",
             atlasParent : 'buttons',
            content: 'CLOSE_BUTTON_NORMAL',
            //content: "close_button",
            offsetX: 209,
            offsetY: -250,
            callback: function()
                    {
                      fill_elements[0] = 1;
                      reg.modal.hideModal("modal1");

                    }
        },
         {

           type : "text",
           content: "Well done!",
          offsetX : 0,
          offsetY: -240,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0xeeeeee",

        },
         {

           type : "text",
           content: "You found Gold (Au), the element mentioned in the clue.",
          offsetX : 0,
          offsetY: -200,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0x00B8E6",

        },
           {

           type : "text",
           content: "Click X to continue",
          offsetX : 0,
          offsetY: -165 ,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0xeeeeee",

        },
         {
            type: "sprite",
             atlasParent : 'answer_screens',
            content: 'Answer07',
            //content: "close_button",
            offsetX: 0,
            offsetY: 60,
        },
           {
            type: "sprite",
             atlasParent : 'game_astri',
            content: '6_AM',
            //content: "close_button",
            offsetX: -15,
            offsetY: -110,
        },
          {

           type : "text",
           content: "Morning",
          offsetX : -170,
          offsetY: -100,
          fontFamily: "tahoma",
          fontSize: 18,
          align: "left",
          color: "0xeeeeee",

        },



          ]

    });
 reg.modal.createModal({
        type: "modal2",
        includeBackground: true,
        modalCloseOnInput: false,
        itemsArr: [{
            type: 'sprite',
            atlasParent :'game_astri',
            content : 'FEEDBACK POPUP_WITHOUT BLACK BG'


          },
          {
            type: "sprite",
             atlasParent : 'buttons',
            content: 'CLOSE_BUTTON_NORMAL',
            //content: "close_button",
            offsetX: 209,
            offsetY: -250,
            callback: function()
                    {
                      reg.modal.hideModal("modal2");
                    }
        },
        {

           type : "text",
           content: "That is not correct.",
          offsetX : -135,
          offsetY: -160,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0x00B8E6",

        },
         {

           type : "text",
           content: "Notice that the clue mentions the time of day and a \ncountry. Find the name of the country and time of day \nfrom the clue. Rotate the Earth so that the time and \nplace are correct. Try Again.",
          offsetX : 0,
          offsetY: -60,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0x00B8E6",

        },

              {

           type : "text",
           content: "If you need help with the activity, click the \nDemo button.",
          offsetX : -40,
          offsetY: 30,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0xeeeeee",

        },
        {

           type : "text",
           content: "Click X to continue.",
          offsetX : -135,
          offsetY: 100,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0xeeeeee",

        },
          ]

    });
   reg.modal.createModal({
        type: "modal3",
        includeBackground: true,
        modalCloseOnInput: false,
        itemsArr: [{
            type: 'sprite',
            atlasParent :'game_astri',
            content : 'FEEDBACK POPUP_WITHOUT BLACK BG'


          },
          {
            type: "sprite",
             atlasParent : 'buttons',
            content: 'CLOSE_BUTTON_NORMAL',
            //content: "close_button",
            offsetX: 209,
            offsetY: -250,
            callback: function()
                    {
                      fill_elements[0] =2;
                      reg.modal.hideModal("modal3");

                    }
        },
        {

           type : "text",
           content: "Sorry! ",
          offsetX : -150,
          offsetY: -235,
          fontFamily: "tahoma",
          fontSize: 16,
          align: "left",
          color: "0x00B8E6",

        },
        {

           type : "text",
           content: "You should have rotated the Earth so that it is \nmorning in Egypt and collected the element Gold (Au).",
          offsetX : 0,
          offsetY: -200,
          fontFamily: "tahoma",
          fontSize: 16,
          align: "left",
          color: "0x00B8E6",

        },
         {

           type : "text",
           content: "Click X to continue.",
          offsetX : -125,
          offsetY: -160,
          fontFamily: "tahoma",
          fontSize: 16,
          align: "left",
          color: "0xeeeeee",

        },

         {
            type: "sprite",
             atlasParent : 'answer_screens',
            content: 'Answer07',
            //content: "close_button",
            offsetX: 0,
            offsetY: 60,
        },

          {
            type: "sprite",
             atlasParent : 'game_astri',
            content: '6_AM',
            //content: "close_button",
            offsetX: -15,
            offsetY: -110,
        },
          {

           type : "text",
           content: "Morning",
          offsetX : -170,
          offsetY: -100,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0xeeeeee",

        },



          ]

    });
 reg.modal.createModal({
        type: "modal4",
        includeBackground: true,
        modalCloseOnInput: false,
        itemsArr: [{
            type: 'image',
            //atlasParent :'demo',
            content : 'rules'


          },
          {
            type: "sprite",
            atlasParent : 'buttons',
            content: 'CLOSE_BUTTON_NORMAL',
            offsetX: 220,
            offsetY: -270,
            callback: function()
                    {
                      reg.modal.hideModal("modal4");
                    }
        },
            {

           type : "text",
           content: "Click X to continue.",
          offsetX : 0,
          offsetY: 260,
          fontFamily: "tahoma",
          fontSize: 15,
          align: "left",
          color: "0xeeeeee",

        },


          ]

    });
  },
  showModal1:function()
  {
     yay_sound.play('',0,1);
    reg.modal.showModal("modal1");
},
showModal2:function()
  {

    reg.modal.showModal("modal2");
},
showModal3:function()
  {

    reg.modal.showModal("modal3");
},
showModal4:function()
  {

    reg.modal.showModal("modal4");
},
next_question_six:function()
{
  //reg.modal.hideModal("modal1");
  //fill_elements[0] = 1;
  //making element fly
  //elements[0] = game.add.sprite(147,349,'game_astri','copper');
  if(fill_elements[0] == 1)
  {
  //elements[0] = game.add.sprite(663,389,'game_astri','COBALT');
  holders[0].loadTexture('game_astri',element_holder_names[0]);
  //submit_buttons[6].inputEnabled = false;
   // treasure_sound.play('',0,1);
    treasure_sound.play('',0,1);
   fill_elements[0] = 4;
  submit_buttons[6].inputEnabled = false;

  //next_buttons[6] = game.add.button(388,598,'buttons',this.next_stage_six,this,'NEXT_BUTTON_ROLLOVER','NEXT_BUTTON_NORMAL','NEXT_BUTTON_MOUSE_DOWN');
  }
  else
  {
   submit_buttons[6].inputEnabled = false;

  //next_buttons[6] = game.add.button(388,598,'buttons',this.next_stage_six,this,'NEXT_BUTTON_ROLLOVER','NEXT_BUTTON_NORMAL','NEXT_BUTTON_MOUSE_DOWN');
  }
  //game.physics.enable(elements[0], Phaser.Physics.ARCADE);

    //elements[0].body.velocity.x=150;
    //elements[0].

},
next_stage_seven : function()
{
  if(count_no_of_attempts[6] == 1)
  {
   clueEnd(clue_number1[6],count_no_of_attempts[6],degrees_of_position[z-1]);
  }
   else
   {
     clueEnd(clue_number1[6],count_no_of_attempts[6],degrees_of_position[z-2],degrees_of_position[z-1]);
   }
  game.state.start('PlayGame7');
}
}
var playGame7 = function(game){}
playGame7.prototype =
{
  init : function()
  {
     game.load = new CustomLoader(game);
  },
  preload : function()
  {
   game.add.plugin(PhaserInput.Plugin);
   game.load.atlasJSONHash('game_astri','assets/all_screen_astro_2.png','assets/all_screen_astro_2.json');
   game.load.atlasJSONHash('buttons','assets/buttons_en.png','assets/buttons_en.json');
   game.load.atlasJSONHash('demo','assets/demo.png','assets/demo.json');
   game.load.image('rules','assets/rule_popup.jpg');
   game.load.webfont('tahoma','Tahoma');
    game.load.atlasJSONHash('game_astro','assets/sprites_2.png','assets/sprites_2.json');
    game.load.audio('yay','assets/sounds/yay.wav');
    game.load.audio('rotation','assets/sounds/rotation.wav');
    game.load.audio('treasure','assets/sounds/correct.wav');
    game.load.image('ANSWER8','assets/ANSWER8.png');
      game.load.atlasJSONHash('answer_screens','assets/spritesheet_en.png','assets/sprites_en.json');

 },
  create : function()
  {
    reg.modal = new gameModal(game);
       this.createModals();
  background = game.add.sprite(0,0,'game_astro','BACKGROUND_with_sunrays');
   rotate_sound = game.add.audio('rotation');
        yay_sound = game.add.audio('yay');
        click_sound = game.add.audio('click');
        treasure_sound = game.add.audio('treasure');

    var k = 0;
    var j = 0;
    //adding element holders
    for(var i = 0;i<8;i++)
    {

      if(i%2==0)
      {
      if(fill_elements[i]==0 || fill_elements[i]==2)
      {
      holders[i] = game.add.sprite(653,133 + (k*124),'game_astri','ELEMENT_HOLDER_LIGHTOFF');
      k = k+1;
      }
      else
      {
      holders[i] = game.add.sprite(653,133 + (k*124),'game_astri',element_holder_names[i]);
      k = k +1;
      }
      }
      else
      {
      if(fill_elements[i]==0 || fill_elements[i]==2)
      {
      holders[i] = game.add.sprite(728,133 + (j*124),'game_astri','ELEMENT_HOLDER_LIGHTOFF');
      j=j+1;
      }
      else
      {
        holders[i] = game.add.sprite(728,133 + (j*124),'game_astri',element_holder_names[i]);
      j = j +1;
      }
    }
  }
  var style = { font: "bold 18px tahoma", fill: "#00FF7F", boundsAlignH: "center", boundsAlignV: "middle" };
   var style0 = { font: "bold 18px tahoma", fill: "#00FFFF", boundsAlignH: "center", boundsAlignV: "middle" };
   //var style = { font: "bold 18px tahoma", fill: "#90CCF0", boundsAlignH: "center", boundsAlignV: "middle" };
   clue_name = game.add.text(48,22,'Element Hunt',style0);
    clue_number = game.add.text(78,52,clue_number1[7],style);
    var style1 = { font: "17px tahoma", fill: "#00B8E6", boundsAlignH: "center", boundsAlignV: "middle" };
        var style5 = { font: "bold 17px tahoma", fill: "#00B8E6", boundsAlignH: "center", boundsAlignV: "middle" };
 // clue_text1 = game.add.text(180,17,clue_text[0],style1);
  //clue_text1.wordWrap = true;
  //clue_text1.wordWrapWidth = 330;
  country[7] = game.add.text(232,17,country_name[7],style5);
  time_of_day[7] = game.add.text(360,17,time_of_day_text[7],style5);
  elementname[7] = game.add.text(180,48,elementname_text[7],style5);
  clue_line_one[7] = game.add.text(180,17,'Go to                     at ',style1);
  clue_line_two[7] = game.add.text(180,48,'            in the form of diamonds sparkles bright.',style1);
  var style3 = { font: "bold 16px tahoma", fill: "#F0E6DB", boundsAlignH: "center", boundsAlignV: "middle" };
   var submit = game.add.text(512,78,'Submit',style3);

 // clue_text1 = game.add.text(180,17,'Go to South Africa at midnight;\nCarbon in the form of diamonds sparkles bright',style1);
  //clue_text1.wordWrap = true;
  //clue_text1.wordWrapWidth = 270;
  var style2 = { font: "16px tahoma", fill: "#F0E6DB", boundsAlignH: "center", boundsAlignV: "middle" };
  instruction_text = game.add.text(163,78,instruction_text_content,style2);
  rules_button = game.add.button(0,122,'buttons',this.rules_button_function,this,'RULE_ROLLOVER','RULE_NORMAL','RULE_MOUSEDOWN');
  demo_button = game.add.button(0,154,'buttons',this.demo_button_function,this,'DEMO_ROLLOVER','DEMO_NORMAL','DEMO_MOUSEDOWN');
  reset_btn[7] = game.add.button(140,590,'game_astro',this.reset_function_eight,this,'RESET_BUTTON_ROLLOVER','RESET_BUTTON_NORMAL','RESET_BUTTON_MOUSE_DOWN');
  submit_buttons[7] = game.add.button(252,598,'buttons',this.submit_function_seven,this,'SUBMIT_BUTTON_ROLLOVER','SUBMIT_BUTTON_NORMAL','SUBMIT_BUTTON_MOUSE_DOWN');
  next_buttons[7] = game.add.button(360,598,'buttons',this.next_stage_seven,this,'NEXT_BUTTON_ROLLOVER','NEXT_BUTTON_NORMAL','NEXT_BUTTON_MOUSE_DOWN');
  //submit_buttons[7] = game.add.button(272,598,'buttons',this.submit_function_seven,this,'SUBMIT_BUTTON_ROLLOVER','SUBMIT_BUTTON_NORMAL','SUBMIT_BUTTON_MOUSE_DOWN');
  earth_np = game.add.sprite(308,353,'game_astri','SOUTH_EARTH_WITHLABLE');
  earth_np.scale.setTo(0.85,0.85);
  earth_np.anchor.setTo(0.5,0.5);

             clockwise_arrow = game.add.button(307,354,'game_astri',this.input_function_eight,this,'ARROW_CLOCKWISE_WITH_GLOW','ARROW_CLOCKWISE','ARROW_CLOCKWISE_WITH_GLOW');
            clockwise_arrow.scale.setTo(0.85,0.85);
            clockwise_arrow.anchor.setTo(0.5,0.5);
              clockwise_arrow.onInputOver.add(this.input_function,this);
            clockwise_arrow.onInputOut.add(this.input_function_stop,this);
            /*anticlockwise_arrow = game.add.button(307,354,'game_astri',this.input_function,this,'ARROW_ANTI_CLOCKWISE_WITH_GLOW','ARROW_ANTI_CLOCKWISE','ARROW_ANTI_CLOCKWISE_WITH_GLOW');
            anticlockwise_arrow.scale.setTo(0.85,0.85);
            anticlockwise_arrow.anchor.setTo(0.5,0.5);*/
},
update : function()
{
  if(fill_elements[7] == 1 || fill_elements[7] == 2)
  {
     this.next_question_seven();
  }
   if(count_no_of_attempts[7] >= 3 ||  fill_elements[7] == 1 ||  fill_elements[7] == 2 || fill_elements[7] == 4)
  {
    next_buttons[7].tint = 0xffffff;
   next_buttons[7].inputEnabled = true;
   reset_btn[7].tint = 0x666677;
   reset_btn[7].inputEnabled = false;
   clockwise_arrow.inputEnabled = false;
   submit_buttons[7].inputEnabled = false;
   submit_buttons[7].tint = 0x666677;
  }
  else
  {
    next_buttons[7].tint = 0x666677;
   next_buttons[7].inputEnabled = false;
   reset_btn[7].tint = 0xffffff;
   reset_btn[7].inputEnabled = true;
   clockwise_arrow.inputEnabled = true;
   submit_buttons[7].inputEnabled = true;
   submit_buttons[7].tint = 0xffffff;

  }
  //
  if(rotation[7] ==1 )
  {
    console.log(earth_np.angle);
    clockwise_arrow.angle = clockwise_arrow.angle + 0.4;
   earth_np.angle = earth_np.angle + 0.4;
    //rotate_sound.play('',0,1);
  }

},
 /*render : function()
         {
          game.debug.text('x: ' + game.input.x + ' y: ' + game.input.y, 32, 32);
          }, */
          input_function : function()
          {

            rotation[7] = 1;
          },
          input_function_stop : function()
          {
            rotation[7] = 0;
          },
          input_function_eight : function()
          {
             rotation[7] = 1;
          },
          reset_function_eight : function()
          {
             earth_np.angle = 0;
          },
          //the main function which calculates whether answer is right.
          submit_function_seven : function()
          {
            count_no_of_attempts[7] = count_no_of_attempts[7] + 1;
            if(count_no_of_attempts[7] < 2)
            {
              degrees_of_position[z] = earth_np.angle;
              z++;
            if(earth_np.angle <= 85  && earth_np.angle >= 40)
            {
              console.log('correct');
              this.showModal1();
            }
            else
            {
             console.log('false');
             this.showModal2();
            }
          }
          else
          {
            degrees_of_position[z] = earth_np.angle;
            z++;
             if(earth_np.angle <= 85  && earth_np.angle >= 40)
            {
              console.log('correct');
              this.showModal1();
            }
            else
            {
            console.log('show popup');
            this.showModal3();
          }
          }
          },
          rules_button_function : function()
          {
            console.log('hi');
            this.showModal4();
          },
          demo_button_function : function()
          {
            game.state.start('VideoScreen8');
          },

 createModals: function() {

     reg.modal.createModal({
        type: "modal1",
        includeBackground: true,
        modalCloseOnInput: false,
        itemsArr: [{
            type: 'sprite',
            atlasParent :'game_astri',
            content : 'FEEDBACK POPUP_WITHOUT BLACK BG'


          },
          {
            type: "sprite",
             atlasParent : 'buttons',
            content: 'CLOSE_BUTTON_NORMAL',
            //content: "close_button",
            offsetX: 209,
            offsetY: -250,
            callback: function()
                    {
                      fill_elements[7] = 1;
                      reg.modal.hideModal("modal1");

                    }
        },
          {

           type : "text",
           content: "Well done!",
          offsetX : 0,
          offsetY: -220,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0xeeeeee",

        },
         {

           type : "text",
           content: "You found Diamond.Diamond is a form of Carbon (C).",
          offsetX : 0,
          offsetY: -180,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0x00B8E6",

        },
          {
           type : "text",

           content: "Click X to continue.",
          offsetX : 0,
          offsetY: -140,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0xeeeeee",

        },
         {
            type: "sprite",
            atlasParent : 'answer_screens',
            content: 'Answer08',
            //content: "close_button",
            offsetX: -110,
            offsetY: 30,
        },
           {
            type: "sprite",
             atlasParent : 'game_astri',
            content: '12_AM',
            //content: "close_button",
            offsetX: 110,
            offsetY: 45,
        },
          {

           type : "text",
           content: "Midnight",
          offsetX : 110,
          offsetY: 110,
          fontFamily: "tahoma",
          fontSize: 18,
          align: "left",
          color: "0xeeeeee",

        },



          ]

    });
 reg.modal.createModal({
        type: "modal2",
        includeBackground: true,
        modalCloseOnInput: false,
        itemsArr: [{
            type: 'sprite',
            atlasParent :'game_astri',
            content : 'FEEDBACK POPUP_WITHOUT BLACK BG'


          },
          {
            type: "sprite",
             atlasParent : 'buttons',
            content: 'CLOSE_BUTTON_NORMAL',
            //content: "close_button",
            offsetX: 209,
            offsetY: -250,
            callback: function()
                    {
                      reg.modal.hideModal("modal2");
                    }
        },
         {

           type : "text",
           content: "That is not correct.",
          offsetX : -135,
          offsetY: -160,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0x00B8E6",

        },
         {

           type : "text",
           content: "Notice that the clue mentions the time of day and a \ncountry. Find the name of the country and time of day \nfrom the clue. Rotate the Earth so that the time and \nplace are correct. Try Again.",
          offsetX : 0,
          offsetY: -60,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0x00B8E6",

        },

              {

           type : "text",
           content: "If you need help with the activity, click the \nDemo button.",
          offsetX : -40,
          offsetY: 30,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0xeeeeee",

        },
        {

           type : "text",
           content: "Click X to continue.",
          offsetX : -135,
          offsetY: 100,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0xeeeeee",

        },]

    });
   reg.modal.createModal({
        type: "modal3",
        includeBackground: true,
        modalCloseOnInput: false,
        itemsArr: [{
            type: 'sprite',
            atlasParent :'game_astri',
            content : 'FEEDBACK POPUP_WITHOUT BLACK BG'


          },
          {
            type: "sprite",
             atlasParent : 'buttons',
            content: 'CLOSE_BUTTON_NORMAL',
            //content: "close_button",
            offsetX: 209,
            offsetY: -250,
            callback: function()
                    {
                      fill_elements[7] =2;
                      reg.modal.hideModal("modal3");

                    }
        },
         {

           type : "text",
           content: "Sorry! ",
          offsetX : -150,
          offsetY: -235,
          fontFamily: "tahoma",
          fontSize: 16,
          align: "left",
          color: "0x00B8E6",

        },
         {

           type : "text",
           content: "You should have rotated the Earth so that it is \nmidnight in South Africa and collected the\n element Diamond. Diamond is a form of Carbon (C).",
          offsetX : 5,
          offsetY: -180,
          fontFamily: "tahoma",
          fontSize: 16,
          align: "left",
          color: "0x00B8E6",

        },
         {

           type : "text",
           content: "Click X to continue.",
          offsetX : -115,
          offsetY: -125,
          fontFamily: "tahoma",
          fontSize: 16,
          align: "left",
          color: "0xeeeeee",

        },
         {
            type: "sprite",
            atlasParent : 'answer_screens',
            content: 'Answer08',
            //content: "close_button",
            offsetX: -115,
            offsetY: 30,
        },

          {
            type: "sprite",
             atlasParent : 'game_astri',
            content: '12_AM',
            //content: "close_button",
            offsetX: 110,
            offsetY: 18,
        },
          {

           type : "text",
           content: "Midnight",
          offsetX : 125,
          offsetY: 60,
          fontFamily: "tahoma",
          fontSize: 17,
          align: "left",
          color: "0xeeeeee",

        },



          ]

    });
 reg.modal.createModal({
        type: "modal4",
        includeBackground: true,
        modalCloseOnInput: false,
        itemsArr: [{
            type: 'image',
            //atlasParent :'demo',
            content : 'rules'


          },
          {
            type: "sprite",
            atlasParent : 'buttons',
            content: 'CLOSE_BUTTON_NORMAL',
            offsetX: 220,
            offsetY: -270,
            callback: function()
                    {
                      reg.modal.hideModal("modal4");
                    }
        },
            {

           type : "text",
           content: "Click X to continue.",
          offsetX : 0,
          offsetY: 260,
          fontFamily: "tahoma",
          fontSize: 15,
          align: "left",
          color: "0xeeeeee",

        },


          ]

    });
  },
  showModal1:function()
  {
     yay_sound.play('',0,1);
    reg.modal.showModal("modal1");
},
showModal2:function()
  {

    reg.modal.showModal("modal2");
},
showModal3:function()
  {

    reg.modal.showModal("modal3");
},
showModal4:function()
  {

    reg.modal.showModal("modal4");
},
next_question_seven:function()
{
  //reg.modal.hideModal("modal1");
  //fill_elements[0] = 1;
  //making element fly
  //elements[0] = game.add.sprite(147,349,'game_astri','copper');
  if(fill_elements[7] == 1)
  {
  holders[7].loadTexture('game_astri',element_holder_names[7]);
   treasure_sound.play('',0,1);
   fill_elements[7] = 4;
  submit_buttons[7].inputEnabled = false;

  //next_buttons[7] = game.add.button(388,598,'buttons',this.next_stage_seven,this,'NEXT_BUTTON_ROLLOVER','NEXT_BUTTON_NORMAL','NEXT_BUTTON_MOUSE_DOWN');
  }
  else
  {
   submit_buttons[7].inputEnabled = false;

  //next_buttons[7] = game.add.button(388,598,'buttons',this.next_stage_seven,this,'NEXT_BUTTON_ROLLOVER','NEXT_BUTTON_NORMAL','NEXT_BUTTON_MOUSE_DOWN');
  }
  //game.physics.enable(elements[0], Phaser.Physics.ARCADE);

    //elements[0].body.velocity.x=150;
    //elements[0].

},
next_stage_seven : function()
{
  if(count_no_of_attempts[7] == 1)
  {
   clueEnd(clue_number1[7],count_no_of_attempts[7],degrees_of_position[z-1]);
  }
   else
   {
     clueEnd(clue_number1[7],count_no_of_attempts[7],degrees_of_position[z-2],degrees_of_position[z-1]);
   }
  game.state.start('conclusion_screen');
}

}
var conclusion_screen = function(game){}
conclusion_screen.prototype =
{
   init : function()
  {
     game.load = new CustomLoader(game);
  },
   preload : function()
  {
   game.load.atlasJSONHash('buttons','assets/buttons_en.png','assets/buttons_en.json');
   game.load.atlasJSONHash('demo','assets/demo.png','assets/demo.json');
   game.load.webfont('tahoma','Tahoma');
   game.load.image('rules','assets/rule_popup.jpg');
    game.load.atlasJSONHash('game_astro','assets/sprites_2.png','assets/sprites_2.json');
    game.load.atlasJSONHash('game_astri','assets/all_screen_astro_2.png','assets/all_screen_astro_2.json');
 },
 /*render : function()
 {
            game.debug.text('x: ' + game.input.x + ' y: ' + game.input.y, 32, 32);

 },*/
  create : function()
  {
     var text_final;
     for(var i=0;i<8;i++)
     {
     if(fill_elements[i] == 4)
      {
       score = score + 1;
      }
    }
    //var text1 = game.add.text()
    background = game.add.sprite(0,0,'game_astro','BACKGROUND_with_sunrays');
    var fb_bg = game.add.sprite(-80,70,'game_astri','FEEDBACK POPUP_WITHOUT BLACK BG');
       var k = 0;
    var j = 0;
    //adding element holders
    for(var i = 0;i<8;i++)
    {

      if(i%2==0)
      {
      if(fill_elements[i]==0 || fill_elements[i]==2)
      {
      holders[i] = game.add.sprite(653,133 + (k*124),'game_astri','ELEMENT_HOLDER_LIGHTOFF');
      k = k+1;
      }
      else
      {
      holders[i] = game.add.sprite(653,133 + (k*124),'game_astri',element_holder_names[i]);
      k = k +1;
      }
      }
      else
      {
      if(fill_elements[i]==0 || fill_elements[i]==2)
      {
      holders[i] = game.add.sprite(728,133 + (j*124),'game_astri','ELEMENT_HOLDER_LIGHTOFF');
      j=j+1;
      }
      else
      {
        holders[i] = game.add.sprite(728,133 + (j*124),'game_astri',element_holder_names[i]);
      j = j +1;
      }
    }
  }
     if(score==8)
     {
      text_final = "Congratulations! You have collected all the elements and won the element hunt!";
     }
     else if(score <= 7 && score >=5)
     {
      text_final = "That was close! You just missed winning the prize. Better luck next time.";
     }
     else
     {
      text_final = "Another team won the prize. Better luck next time."
     }
  //submit_button = game.add.button()
  var style = { font: "30px tahoma", fill: "#00FF7F", boundsAlignH: "center", boundsAlignV: "middle" };
  screen_text[12] = game.add.text(373,35,'Game End',style);
  var style1 = { font: "bold 20px tahoma", fill: "#00C7FF", boundsAlignH: "center", boundsAlignV: "middle" };
  screen_text[13] = game.add.text(130,180,'You have reached the end of the element hunt!',style1)
  screen_text[14] = game.add.text(130,312,text_final,style1);
  screen_text[14].wordWrap = true;
  screen_text[14].wordWrapWidth = 380;
  var style2 = { font: "20px tahoma", fill: "#F0E6DB", boundsAlignH: "center", boundsAlignV: "middle" };
  screen_text[15] = game.add.text(130,440,'Close this tab and return to the first tab to continue.',style2);
  screen_text[15].wordWrap = true;
  screen_text[15].wordWrapWidth = 380;
  doQuit(score);
  },

 //calculating the score

 //displaying text on screen according to score.
}
var VideoScreen = function(game){}
VideoScreen.prototype =
{
      preload : function()
      {
        //game.add.image('back','assets/back-button.png')
        game.load.video('demo','assets/demo1.mp4');
      },
      create : function()
      {
        video_play = 0;
        game.stage.backgroundColor = '#232323';
        video = game.add.video('demo');

        video.play(true);
        var sprite = video.addToWorld(-80,60,0,0);
        sprite.scale.setTo(0.75,0.75);
        var style2 = { font: "bold 20px tahoma", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle" };
        var back_text = game.add.text(690,10,'BACK',style2);
        back_text.inputEnabled = true;
        console.log(video.loop);

        video.loop = false;
        video.onComplete.add(this.video_stop,this);
        back_text.events.onInputDown.add(this.back_function,this);
        //var image4 = game.add.image(550,590,'back',this.back_function,this);
        console.log(video.onComplete);

    //  true = loop


       game.input.onDown.add(this.pause, this);
      },
      pause : function()
      {

      video.paused = (video.paused) ? false : true;

      },
      video_stop : function()
      {

       game.state.start('start_screen');

      },
      back_function : function()
      {
        game.state.start('start_screen');
      }

}
var VideoScreen1 = function(game){}
VideoScreen1.prototype =
{
      preload : function()
      {
        //game.add.image('back','assets/back-button.png')
        game.load.video('demo','assets/demo1.mp4');
      },
      create : function()
      {
        video_play = 0;
        game.stage.backgroundColor = '#232323';
        video = game.add.video('demo');
        video.play(true);
        var sprite = video.addToWorld(0,40,0,0);
        sprite.scale.setTo(0.75,0.75);
        var style2 = { font: "bold 20px tahoma", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle" };
        var back_text = game.add.text(690,10,'BACK',style2);
        back_text.inputEnabled = true;
        console.log(video.loop);

        video.loop = false;
        video.onComplete.add(this.video_stop,this);
        back_text.events.onInputDown.add(this.back_function,this);
        //var image4 = game.add.image(550,590,'back',this.back_function,this);
        console.log(video.onComplete);

    //  true = loop


       game.input.onDown.add(this.pause, this);
      },
      pause : function()
      {

      video.paused = (video.paused) ? false : true;

      },
      video_stop : function()
      {

       game.state.start('PlayGame');

      },
      back_function : function()
      {
        game.state.start('PlayGame');
      }

}
var VideoScreen2 = function(game){}
VideoScreen2.prototype =
{
      preload : function()
      {
        //game.add.image('back','assets/back-button.png')
        game.load.video('demo','assets/demo1.mp4');
      },
      create : function()
      {
        video_play = 0;
        game.stage.backgroundColor = '#232323';
        video = game.add.video('demo');
        video.play(true);
        var sprite = video.addToWorld(0,40,0,0);
        sprite.scale.setTo(0.75,0.75);
        var style2 = { font: "bold 20px tahoma", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle" };
        var back_text = game.add.text(690,10,'BACK',style2);
        back_text.inputEnabled = true;
        console.log(video.loop);

        video.loop = false;
        video.onComplete.add(this.video_stop,this);
        back_text.events.onInputDown.add(this.back_function,this);
        //var image4 = game.add.image(550,590,'back',this.back_function,this);
        console.log(video.onComplete);

    //  true = loop


       game.input.onDown.add(this.pause, this);
      },
      pause : function()
      {

      video.paused = (video.paused) ? false : true;

      },
      video_stop : function()
      {

       game.state.start('PlayGame1');

      },
      back_function : function()
      {
        game.state.start('PlayGame1');
      }

}
var VideoScreen3 = function(game){}
VideoScreen3.prototype =
{
      preload : function()
      {
        //game.add.image('back','assets/back-button.png')
        game.load.video('demo','assets/demo1.mp4');
      },
      create : function()
      {
        video_play = 0;
        game.stage.backgroundColor = '#232323';
        video = game.add.video('demo');
        video.play(true);
        var sprite = video.addToWorld(0,40,0,0);
        sprite.scale.setTo(0.75,0.75);
        var style2 = { font: "bold 20px tahoma", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle" };
        var back_text = game.add.text(690,10,'BACK',style2);
        back_text.inputEnabled = true;
        console.log(video.loop);

        video.loop = false;
        video.onComplete.add(this.video_stop,this);
        back_text.events.onInputDown.add(this.back_function,this);
        //var image4 = game.add.image(550,590,'back',this.back_function,this);
        console.log(video.onComplete);

    //  true = loop


       game.input.onDown.add(this.pause, this);
      },
      pause : function()
      {

      video.paused = (video.paused) ? false : true;

      },
      video_stop : function()
      {

       game.state.start('PlayGame2');

      },
      back_function : function()
      {
        game.state.start('PlayGame2');
      }

}
var VideoScreen4 = function(game){}
VideoScreen4.prototype =
{
      preload : function()
      {
        //game.add.image('back','assets/back-button.png')
        game.load.video('demo','assets/demo1.mp4');
      },
      create : function()
      {
        video_play = 0;
        game.stage.backgroundColor = '#232323';
        video = game.add.video('demo');
        video.play(true);
        var sprite = video.addToWorld(0,40,0,0);
        sprite.scale.setTo(0.75,0.75);
        var style2 = { font: "bold 20px tahoma", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle" };
        var back_text = game.add.text(690,10,'BACK',style2);
        back_text.inputEnabled = true;
        console.log(video.loop);

        video.loop = false;
        video.onComplete.add(this.video_stop,this);
        back_text.events.onInputDown.add(this.back_function,this);
        //var image4 = game.add.image(550,590,'back',this.back_function,this);
        console.log(video.onComplete);

    //  true = loop


       game.input.onDown.add(this.pause, this);
      },
      pause : function()
      {

      video.paused = (video.paused) ? false : true;

      },
      video_stop : function()
      {

       game.state.start('PlayGame3');

      },
      back_function : function()
      {
        game.state.start('PlayGame3');
      }

}
var VideoScreen5 = function(game){}
VideoScreen5.prototype =
{
      preload : function()
      {
        //game.add.image('back','assets/back-button.png')
        game.load.video('demo','assets/demo1.mp4');
      },
      create : function()
      {
        video_play = 0;
        game.stage.backgroundColor = '#232323';
        video = game.add.video('demo');
        video.play(true);
        var sprite = video.addToWorld(0,40,0,0);
        sprite.scale.setTo(0.75,0.75);
        var style2 = { font: "bold 20px tahoma", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle" };
        var back_text = game.add.text(690,10,'BACK',style2);
        back_text.inputEnabled = true;
        console.log(video.loop);

        video.loop = false;
        video.onComplete.add(this.video_stop,this);
        back_text.events.onInputDown.add(this.back_function,this);
        //var image4 = game.add.image(550,590,'back',this.back_function,this);
        console.log(video.onComplete);

    //  true = loop


       game.input.onDown.add(this.pause, this);
      },
      pause : function()
      {

      video.paused = (video.paused) ? false : true;

      },
      video_stop : function()
      {

       game.state.start('PlayGame4');

      },
      back_function : function()
      {
        game.state.start('PlayGame4');
      }

}
var VideoScreen6 = function(game){}
VideoScreen6.prototype =
{
      preload : function()
      {
        //game.add.image('back','assets/back-button.png')
        game.load.video('demo','assets/demo1.mp4');
      },
      create : function()
      {
        video_play = 0;
        game.stage.backgroundColor = '#232323';
        video = game.add.video('demo');
        video.play(true);
        var sprite = video.addToWorld(0,40,0,0);
        sprite.scale.setTo(0.75,0.75);
        var style2 = { font: "bold 20px tahoma", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle" };
        var back_text = game.add.text(690,10,'BACK',style2);
        back_text.inputEnabled = true;
        console.log(video.loop);

        video.loop = false;
        video.onComplete.add(this.video_stop,this);
        back_text.events.onInputDown.add(this.back_function,this);
        //var image4 = game.add.image(550,590,'back',this.back_function,this);
        console.log(video.onComplete);

    //  true = loop


       game.input.onDown.add(this.pause, this);
      },
      pause : function()
      {

      video.paused = (video.paused) ? false : true;

      },
      video_stop : function()
      {

       game.state.start('PlayGame5');

      },
      back_function : function()
      {
        game.state.start('PlayGame5');
      }

}
var VideoScreen7 = function(game){}
VideoScreen7.prototype =
{
      preload : function()
      {
        //game.add.image('back','assets/back-button.png')
        game.load.video('demo','assets/demo1.mp4');
      },
      create : function()
      {
        video_play = 0;
        game.stage.backgroundColor = '#232323';
        video = game.add.video('demo');
        video.play(true);
        var sprite = video.addToWorld(0,40,0,0);
        sprite.scale.setTo(0.75,0.75);
        var style2 = { font: "bold 20px tahoma", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle" };
        var back_text = game.add.text(690,10,'BACK',style2);
        back_text.inputEnabled = true;
        console.log(video.loop);

        video.loop = false;
        video.onComplete.add(this.video_stop,this);
        back_text.events.onInputDown.add(this.back_function,this);
        //var image4 = game.add.image(550,590,'back',this.back_function,this);
        console.log(video.onComplete);

    //  true = loop


       game.input.onDown.add(this.pause, this);
      },
      pause : function()
      {

      video.paused = (video.paused) ? false : true;

      },
      video_stop : function()
      {

       game.state.start('PlayGame6');

      },
      back_function : function()
      {
        game.state.start('PlayGame6');
      }

}
var VideoScreen8 = function(game){}
VideoScreen8.prototype =
{
      preload : function()
      {
        //game.add.image('back','assets/back-button.png')
        game.load.video('demo','assets/demo1.mp4');
      },
      create : function()
      {
        video_play = 0;
        game.stage.backgroundColor = '#232323';
        video = game.add.video('demo');
        video.play(true);
        var sprite = video.addToWorld(0,40,0,0);
        sprite.scale.setTo(0.75,0.75);
        var style2 = { font: "bold 20px tahoma", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle" };
        var back_text = game.add.text(690,10,'BACK',style2);
        back_text.inputEnabled = true;
        console.log(video.loop);

        video.loop = false;
        video.onComplete.add(this.video_stop,this);
        back_text.events.onInputDown.add(this.back_function,this);
        //var image4 = game.add.image(550,590,'back',this.back_function,this);
        console.log(video.onComplete);

    //  true = loop


       game.input.onDown.add(this.pause, this);
      },
      pause : function()
      {

      video.paused = (video.paused) ? false : true;

      },
      video_stop : function()
      {

       game.state.start('PlayGame7');

      },
      back_function : function()
      {
        game.state.start('PlayGame7');
      }

}

game.state.add('PlayGame', playGame);
game.state.add('PlayGame1',playGame1);
game.state.add('PlayGame2',playGame2);
game.state.add('PlayGame3',playGame3);
game.state.add('PlayGame4',playGame4);
game.state.add('PlayGame5',playGame5);
game.state.add('PlayGame6',playGame6);
game.state.add('PlayGame7',playGame7);
game.state.add('VideoScreen',VideoScreen);
game.state.add('VideoScreen1',VideoScreen1);
game.state.add('VideoScreen2',VideoScreen2);
game.state.add('VideoScreen3',VideoScreen3);
game.state.add('VideoScreen4',VideoScreen4);
game.state.add('VideoScreen5',VideoScreen5);
game.state.add('VideoScreen6',VideoScreen6);
game.state.add('VideoScreen7',VideoScreen7);
game.state.add('VideoScreen8',VideoScreen8);
game.state.add('hunter_name_screen',hunter_name_screen);
game.state.add('start_screen',start_screen);
game.state.add('conclusion_screen',conclusion_screen);
game.state.start('start_screen');

}
