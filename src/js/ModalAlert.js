
goog.provide("Sorter.ModalAlert");

goog.require("Bootstrap");
goog.require('Sorter');

Sorter.ModalAlert = class ModalAlert {

       constructor(body,title){


         const instance_id = Math.random().toString(36).substr(2, 9),
                  
               element =
   
            `<div class="modal fade" id="modal_info_`+instance_id+`" tabindex="-1" aria-hidden="true">
               <div class="modal-dialog" >
                <div class="modal-content">
                 <div class="modal-header">
                   <h5 class="modal-title" >`+title+`</h5>
                   <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                     <span aria-hidden="true">&times;</span>
                   </button>
                 </div>
                 <div class="modal-body">
                    `+body+`
                 </div>
                 <div class="modal-footer">
                     <button type="button" class="btn btn-danger btn-block" data-dismiss="modal">OK</button>
                 </div>
                </div>
               </div>
             </div>`,     

              parser = new DOMParser(),

              html = parser.parseFromString(element, "text/html");



          this.container = html.body.children[0];

         
         


       }


}























