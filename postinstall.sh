#!/bin/bash


#TO MAKE BLOCKLY WORK CORRECTLY
cd node_modules;
ln -s google-closure-library closure-library;


#ADD CLOSURE-LIKE DEPENDENCY INFORMATION TO A FEW LIBS
gulp writeDepsInfo;





