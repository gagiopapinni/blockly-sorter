
goog.provide("Sorter.AboutMenu");

goog.require("Bootstrap");
goog.require('Sorter');
goog.require("Sorter.HowToUseModal");
goog.require("Sorter.BubbleSortModal");
goog.require("Sorter.SelectionSortModal");
goog.require("Sorter.InsertionSortModal");

Sorter.AboutMenu = class AboutMenu {

       constructor(){

         const instance_id = Math.random().toString(36).substr(2, 9),
                  
               element =   
            `<div class = 'mb-4' >

               <button class="btn btn-block border-light  bg-light text-black" style="opacity:1;" data-toggle="collapse" data-target="#menu_body_`+instance_id+`">
                          <b> About. </b>
               </button>
               
               <div class="  border collapse bg-dark text-center " id="menu_body_`+instance_id+`"  >
  
                  <button class="btn m-2 my-3 btn-danger" data-toggle="modal" id="how_to_use_`+instance_id+`" >
                          <b> How to use </b>
                  </button>
                  <button class="btn m-2 my-3 btn-secondary " data-toggle="modal" id="bubble_sort_`+instance_id+`" >
                           <b> Bubble Sort </b>
                  </button>
                  <button class="btn m-2 my-3 btn-secondary " data-toggle="modal" id="insertion_sort_`+instance_id+`">
                        <b> Insertion Sort </b>
                  </button>
                  <button class="btn m-2 my-3 btn-secondary " data-toggle="modal" id="selection_sort_`+instance_id+`">
                        <b> Selection Sort </b>
                  </button>
               </div>

             </div>`,     

              parser = new DOMParser(),

              html = parser.parseFromString(element, "text/html");



          this.container = html.body.children[0];

          this.buttons = {  

                     howToUse: html.getElementById('how_to_use_'+instance_id),
                     bubbleSort: html.getElementById('bubble_sort_'+instance_id),
                     insertionSort: html.getElementById('insertion_sort_'+instance_id),
                     selectionSort: html.getElementById('selection_sort_'+instance_id),


          }
   
          const modals = [new Sorter.HowToUseModal().container,
                          new Sorter.BubbleSortModal().container,
                          new Sorter.InsertionSortModal().container,
                          new Sorter.SelectionSortModal().container,]

          const buttons_keys = Object.keys(this.buttons);

          for(let i=0;i<modals.length;i++){
               this.buttons[buttons_keys[i]].setAttribute('data-target', '#'+modals[i].getAttribute('id'));
               this.container.appendChild(modals[i]);
          }
         
         


       }


}























