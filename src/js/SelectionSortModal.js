
goog.provide("Sorter.SelectionSortModal");

goog.require("Bootstrap");
goog.require('Sorter');
goog.require('Sorter.ModalAlert');

Sorter.SelectionSortModal = class SelectionSortModal extends Sorter.ModalAlert {

       constructor(){
         const title = 'Selection Sort Algorithm',
               body = `Selection Sort Info`;
         super(body,title);



       }


}



