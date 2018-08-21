
goog.provide("Sorter.Blocks");

goog.require("Blockly.Blocks");
goog.require("Blockly");

goog.require("blockly_blocks_compressed");

Blockly.defineBlocksWithJsonArray([ 

 {
  "type": "length",
  "message0": "length",
  "inputsInline": true,
  "output": "Number",
  "colour": 280,
  "tooltip": "Returns the list's length",
  "helpUrl": ""
 },
 {
  "type": "swap",
  "message0": "Swap %1 %2  with  %3 %4 ",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "index_a",
      "check": "Number",
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "index_b",
      "check": "Number",
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 280,
  "tooltip": "Swaps the list's two elements of given indices",
  "helpUrl": ""
 },
 {
  "type": "getter",
  "message0": "get %1 %2  element",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "index"
    }
  ],
  "inputsInline": true,
 
  "output": 'Number',
  "colour": 280,
  "tooltip": "Returns the list's value at given index",
  "helpUrl": ""
 },

]);

