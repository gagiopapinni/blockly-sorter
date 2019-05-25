
goog.provide("Sorter.HowToUseModal");

goog.require("Bootstrap");
goog.require('Sorter');
goog.require('Sorter.ModalAlert');

Sorter.HowToUseModal = class HowToUseModal extends Sorter.ModalAlert {

       constructor(){
         const title = 'How To Use',
               body = `usage info`;
         super(body,title);



       }


}























