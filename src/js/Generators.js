
goog.provide("Sorter.Generators");


goog.require("Blockly.JavaScript");
goog.require("blockly_generators_compressed");

Sorter.Generators.init = function init ( visual_array ){



   let context = {

     array: visual_array.toPlainArray(),

     swap (a,b){

         if(this.array[a] != void(0) && this.array[b] != void(0))   
  
           //because actual changes in VisualArray are not happening instantly (for the reason of animations);
           [ this.array[a],this.array[b] ] = [ this.array[b],this.array[a] ];

         visual_array.swap(a,b); 
       
     },
      
     get_array_value(index){

         if(this.array[index] === void(0)) 
                  
             throw new RangeError('incorrect index: getElement('+index+'); ');

         return this.array[index];

     },
    
   }
   
   visual_array.listen('onReset',()=>{ context.array = visual_array.toPlainArray(); })


   Blockly.JavaScript['length'] = function(block) {

      return [visual_array.length,Blockly.JavaScript.ORDER_ADDITION];

   };

   Blockly.JavaScript['swap'] = function(block) {
           
      let a = Blockly.JavaScript.valueToCode(block, 'index_a', Blockly.JavaScript.ORDER_ADDITION) ,

          b = Blockly.JavaScript.valueToCode(block, 'index_b', Blockly.JavaScript.ORDER_ADDITION) ,

          code = " this.swap(" + a + ","+ b +");\n";

     
      return code;

   };

   Blockly.JavaScript['getter'] = function(block) {

      let index = Blockly.JavaScript.valueToCode(block, 'index', Blockly.JavaScript.ORDER_ADDITION) ,
          
          code = 'this.get_array_value('+index+')';
        
      return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];

   };
   

   return context;

};
