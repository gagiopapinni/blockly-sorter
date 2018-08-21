
goog.provide("Sorter.Controls");

goog.require("Bootstrap");
goog.require('Sorter');

Sorter.Controls = class Controls {

       constructor(){

         const instance_id = Math.random().toString(36).substr(2, 9),
                  
               element = 

            `<div class=" my-5 " style="display:block;"  >
  
               <button id="execute_`+instance_id+`" type="button" class="btn  btn-danger">Execute</button> 
             
               <div class="btn-group btn-group-toggle float-right" data-toggle="buttons" >

                 <button class="btn btn-secondary" id="speed2x_`+instance_id+`">
                    <input type="radio" name="speed_`+instance_id+`"  > 2x
                 </button>

                 <button class="btn btn-secondary active" id="speed1x_`+instance_id+`">
                    <input type="radio" name="speed_`+instance_id+`" > 1x
                 </button>

                 <button class="btn btn-secondary" id="speed0.5x_`+instance_id+`">
                    <input type='radio'  name="speed_`+instance_id+`" > 0.5x
                 </button>

               </div>

               <div class="btn-group float-right mr-2" > 
                 
                 <button id="pause_`+instance_id+`" type="button" class="btn btn-secondary ">Pause</button> 

                 <button id="shuffle_`+instance_id+`" type="button" class="btn btn-secondary ">Shuffle</button>   
 
               </div> 
  
            </div>`,     

              parser = new DOMParser(),

              html = parser.parseFromString(element, "text/html");



          this.container = html.body.children[0];

          this.buttons = {  

                     execute: html.getElementById('execute_'+instance_id),
                     pause: html.getElementById('pause_'+instance_id),
                     shuffle: html.getElementById('shuffle_'+instance_id),

          }
           
          this.speed_radio = {
                 
                     '2x': html.getElementById('speed2x_'+instance_id),
                     '1x': html.getElementById('speed1x_'+instance_id),
                     '0.5x': html.getElementById('speed0.5x_'+instance_id)
          }
          



       }


}

