
goog.provide("Sorter.Generators");


goog.require("Blockly.JavaScript");
goog.require("blockly_generators_compressed");

Sorter.Generators.init = function init ( visual_array ){

   

   const context = {

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
 
     is_highlighted: false,

     highlight(idx1,idx2){

         try{

           visual_array.highlight([idx1,idx2]);
           this.is_highlighted = true;

         }catch(e){/*this should stay quiet*/}

         return true;    
     },
     unhighlightAll(){

         if(this.is_highlighted){

           visual_array.highlight( [...this.array.keys()] , false );
           this.is_highlighted = false;

         }

         return true;
     },
   
    
   }
   


   visual_array.listen('onReset',()=>{ context.array = visual_array.toPlainArray(); })

   visual_array.listen('onAnimationComplete',()=>{ context.unhighlightAll(); })



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
   
   Blockly.JavaScript['logic_compare'] = function(block) {
     

      //--- Default Comparison operator.
      var OPERATORS = {
       'EQ': '==',
       'NEQ': '!=',
       'LT': '<',
       'LTE': '<=',
       'GT': '>',
       'GTE': '>='
      };
      var operator = OPERATORS[block.getFieldValue('OP')];
      var order = (operator == '==' || operator == '!=') ?
            Blockly.JavaScript.ORDER_EQUALITY : Blockly.JavaScript.ORDER_RELATIONAL;
      var argument0 = Blockly.JavaScript.valueToCode(block, 'A', order) || '0';
      var argument1 = Blockly.JavaScript.valueToCode(block, 'B', order) || '0';
      var code = argument0 + ' ' + operator + ' ' + argument1;
      //---

      const input_A_block = block.getInputTargetBlock('A'),
            input_B_block = block.getInputTargetBlock('B');

      if(input_A_block.type === 'getter' && input_B_block.type === 'getter'){

        const idx1 = Blockly.JavaScript.valueToCode(input_A_block, 'index', Blockly.JavaScript.ORDER_ADDITION),
              idx2 = Blockly.JavaScript.valueToCode(input_B_block, 'index', Blockly.JavaScript.ORDER_ADDITION);

        code = "(this.unhighlightAll() && this.highlight("+idx1+","+idx2+") && ("+code+"))";

      }

      return [code, order];
   };


   return context;

};
