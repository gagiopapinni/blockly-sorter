
goog.provide("Sorter.ToolBox");

goog.require("Sorter");
goog.require("Sorter.Algorithms");


(function (){

           const toolbox = 
           
           `<xml id = "toolbox" style="display: none">

             <category name="List" colour="280">
           	<block type="length"></block>
           	<block type="swap"></block>
           	<block type="getter"></block>
             </category>

             <category name="Variables" custom="VARIABLE" colour="330"></category>

             <category name="Loops" colour="120">
               	<block type="controls_for"></block>
             	<block type="controls_whileUntil"></block>
             	<block type="controls_repeat_ext"></block>
             </category>

             <category name="Math" colour="230">
              	<block type="math_number"></block>
             	<block type="math_arithmetic"></block>
             </category>

             <category name="Logic" colour="210">     	
             	<block type="controls_if"></block>
             	<block type="logic_compare"></block>
             	<block type="logic_operation"></block>
             </category>
             <sep></sep>
             <category name="Algorithms" >     	
             	<category name="Bubble-sort">  `   	
                    	+ Sorter.Algorithms.BubbleSortXmlText +
                `</category>
                 <category name="Selection-sort">  `   	
                    	+ Sorter.Algorithms.SelectionSortXmlText +
                `</category>
                 <category name="Insertion-sort">  `   	
                    	+ Sorter.Algorithms.InsertionSortXmlText +
                `</category>
             </category>


           </xml>`;


          const parser = new DOMParser();

          Sorter.ToolBox = parser.parseFromString(toolbox, "application/xml").documentElement;
  
})()       







