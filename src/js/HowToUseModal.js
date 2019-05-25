
goog.provide("Sorter.HowToUseModal");

goog.require("Bootstrap");
goog.require('Sorter');
goog.require('Sorter.ModalAlert');

Sorter.HowToUseModal = class HowToUseModal extends Sorter.ModalAlert {

       constructor(){
         const title = 'How To Use',
               body = `
               <h3>1.</h3><h4>Compose your algorithm!</h4>
               <img src="src/img/picking_blocks.gif" class="img-fluid img-thumbnail" alt="git">
               <img src="src/img/picking_algorithm.gif" class="img-fluid img-thumbnail" alt="git">

               <h3>2.</h3><h4>Sort it!</h4>
               <img src="src/img/executing.gif" class="rounded img-fluid img-thumbnail" alt="gif">

               <h3>3.</h3><h4>Shuffle the array!</h4>
               <img src="src/img/shuffling.gif" class="rounded img-fluid img-thumbnail" alt="gif">

               <h3>4.</h3><h4>Delete the blocks if needed</h4>
               <img src="src/img/deleting_block_2.gif" class="rounded img-fluid img-thumbnail" alt="gif">
`         
                   
         super(body,title);



       }


}























