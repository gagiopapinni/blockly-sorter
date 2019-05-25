
goog.provide("Sorter.BubbleSortModal");

goog.require("Bootstrap");
goog.require('Sorter');
goog.require('Sorter.ModalAlert');

Sorter.BubbleSortModal = class BubbleSortModal extends Sorter.ModalAlert {

       constructor(){
         const title = 'Bubble Sort Algorithm',
               body = `Bubble Sort Info`;
         super(body,title);



       }


}



