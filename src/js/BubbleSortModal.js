
goog.provide("Sorter.BubbleSortModal");

goog.require("Bootstrap");
goog.require('Sorter');
goog.require('Sorter.ModalAlert');

Sorter.BubbleSortModal = class BubbleSortModal extends Sorter.ModalAlert {

       constructor(){
         const title = 'Bubble Sort Algorithm',
               body = `Bubble sort, sometimes referred to as sinking sort, is a simple sorting algorithm that repeatedly steps through the list, compares adjacent pairs and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted. The algorithm is named for the way smaller or larger elements "bubble" to the top of the list.`;
         super(body,title);



       }


}



