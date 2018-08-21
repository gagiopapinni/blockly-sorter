

goog.provide("Sorter.Algorithms");


goog.require("Sorter");

Sorter.Algorithms.SelectionSortXmlText =

`  <variables>
      <variable type="" >i</variable>
      <variable type="" >j</variable>
   </variables>
   <block type="controls_for" x="-70" y="-30">
      <field name="VAR"  variabletype="">i</field>
      <value name="FROM">
         <block type="math_number">
            <field name="NUM">0</field>
         </block>
      </value>
      <value name="TO">
         <block type="math_arithmetic">
            <field name="OP">MINUS</field>
            <value name="A">
               <block type="length" />
            </value>
            <value name="B">
               <block type="math_number">
                  <field name="NUM">2</field>
               </block>
            </value>
         </block>
      </value>
      <value name="BY">
         <block type="math_number">
            <field name="NUM">1</field>
         </block>
      </value>
      <statement name="DO">
         <block type="controls_for">
            <field name="VAR"  variabletype="">j</field>
            <value name="FROM">
               <block type="math_arithmetic">
                  <field name="OP">ADD</field>
                  <value name="A">
                     <block type="variables_get">
                        <field name="VAR"  variabletype="">i</field>
                     </block>
                  </value>
                  <value name="B">
                     <block type="math_number">
                        <field name="NUM">1</field>
                     </block>
                  </value>
               </block>
            </value>
            <value name="TO">
               <block type="math_arithmetic">
                  <field name="OP">MINUS</field>
                  <value name="A">
                     <block type="length" />
                  </value>
                  <value name="B">
                     <block type="math_number">
                        <field name="NUM">1</field>
                     </block>
                  </value>
               </block>
            </value>
            <value name="BY">
               <block type="math_number">
                  <field name="NUM">1</field>
               </block>
            </value>
            <statement name="DO">
               <block type="controls_if">
                  <value name="IF0">
                     <block type="logic_compare">
                        <field name="OP">LT</field>
                        <value name="A">
                           <block type="getter">
                              <value name="index">
                                 <block type="variables_get">
                                    <field name="VAR" variabletype="">i</field>
                                 </block>
                              </value>
                           </block>
                        </value>
                        <value name="B">
                           <block type="getter">
                              <value name="index">
                                 <block type="variables_get">
                                    <field name="VAR"  variabletype="">j</field>
                                 </block>
                              </value>
                           </block>
                        </value>
                     </block>
                  </value>
                  <statement name="DO0">
                     <block type="swap">
                        <value name="index_a">
                           <block type="variables_get">
                              <field name="VAR"  variabletype="">i</field>
                           </block>
                        </value>
                        <value name="index_b">
                           <block type="variables_get">
                              <field name="VAR"  variabletype="">j</field>
                           </block>
                        </value>
                     </block>
                  </statement>
               </block>
            </statement>
         </block>
      </statement>
   </block>`;

Sorter.Algorithms.InsertionSortXmlText = 

`  <variables>
      <variable type="">i</variable>
      <variable type="">j</variable>
   </variables>
   <block type="controls_for" x="-50" y="30">
      <field name="VAR" variabletype="">i</field>
      <value name="FROM">
         <block type="math_number">
            <field name="NUM">1</field>
         </block>
      </value>
      <value name="TO">
         <block type="math_arithmetic">
            <field name="OP">MINUS</field>
            <value name="A">
               <block type="length" />
            </value>
            <value name="B">
               <block type="math_number">
                  <field name="NUM">1</field>
               </block>
            </value>
         </block>
      </value>
      <value name="BY">
         <block type="math_number">
            <field name="NUM">1</field>
         </block>
      </value>
      <statement name="DO">
         <block type="variables_set">
            <field name="VAR" variabletype="">j</field>
            <value name="VALUE">
               <block type="math_arithmetic">
                  <field name="OP">MINUS</field>
                  <value name="A">
                     <block type="variables_get">
                        <field name="VAR"  variabletype="">i</field>
                     </block>
                  </value>
                  <value name="B">
                     <block type="math_number">
                        <field name="NUM">1</field>
                     </block>
                  </value>
               </block>
            </value>
            <next>
               <block type="controls_whileUntil">
                  <field name="MODE">WHILE</field>
                  <value name="BOOL">
                     <block type="logic_operation">
                        <field name="OP">AND</field>
                        <value name="A">
                           <block type="logic_compare">
                              <field name="OP">GTE</field>
                              <value name="A">
                                 <block type="variables_get">
                                    <field name="VAR" variabletype="">j</field>
                                 </block>
                              </value>
                              <value name="B">
                                 <block type="math_number">
                                    <field name="NUM">0</field>
                                 </block>
                              </value>
                           </block>
                        </value>
                        <value name="B">
                           <block type="logic_compare">
                              <field name="OP">LT</field>
                              <value name="A">
                                 <block type="getter">
                                    <value name="index">
                                       <block type="variables_get">
                                          <field name="VAR" variabletype="">j</field>
                                       </block>
                                    </value>
                                 </block>
                              </value>
                              <value name="B">
                                 <block type="getter">
                                    <value name="index">
                                       <block type="math_arithmetic">
                                          <field name="OP">ADD</field>
                                          <value name="A">
                                             <block type="variables_get">
                                                <field name="VAR" variabletype="">j</field>
                                             </block>
                                          </value>
                                          <value name="B">
                                             <block type="math_number">
                                                <field name="NUM">1</field>
                                             </block>
                                          </value>
                                       </block>
                                    </value>
                                 </block>
                              </value>
                           </block>
                        </value>
                     </block>
                  </value>
                  <statement name="DO">
                     <block type="swap">
                        <value name="index_a">
                           <block type="variables_get">
                              <field name="VAR" variabletype="">j</field>
                           </block>
                        </value>
                        <value name="index_b">
                           <block type="math_arithmetic">
                              <field name="OP">ADD</field>
                              <value name="A">
                                 <block type="variables_get">
                                    <field name="VAR"  variabletype="">j</field>
                                 </block>
                              </value>
                              <value name="B">
                                 <block type="math_number">
                                    <field name="NUM">1</field>
                                 </block>
                              </value>
                           </block>
                        </value>
                        <next>
                           <block type="math_change">
                              <field name="VAR" variabletype="">j</field>
                              <value name="DELTA">
                                 <shadow type="math_number">
                                    <field name="NUM">-1</field>
                                 </shadow>
                              </value>
                           </block>
                        </next>
                     </block>
                  </statement>
               </block>
            </next>
         </block>
      </statement>
   </block>`;


Sorter.Algorithms.BubbleSortXmlText = 

`  <variables>
      <variable type="" >i</variable>
      <variable type="" >j</variable>
   </variables>
   <block type="controls_for" x="10" y="10">
      <field name="VAR"  variabletype="">i</field>
      <value name="FROM">
         <block type="math_number">
            <field name="NUM">0</field>
         </block>
      </value>
      <value name="TO">
         <block type="math_arithmetic">
            <field name="OP">MINUS</field>
            <value name="A">
               <block type="length" />
            </value>
            <value name="B">
               <block type="math_number">
                  <field name="NUM">2</field>
               </block>
            </value>
         </block>
      </value>
      <value name="BY">
         <block type="math_number">
            <field name="NUM">1</field>
         </block>
      </value>
      <statement name="DO">
         <block type="controls_for">
            <field name="VAR" variabletype="">j</field>
            <value name="FROM">
               <block type="math_number">
                  <field name="NUM">0</field>
               </block>
            </value>
            <value name="TO">
               <block type="math_arithmetic">
                  <field name="OP">MINUS</field>
                  <value name="A">
                     <block type="math_arithmetic">
                        <field name="OP">MINUS</field>
                        <value name="A">
                           <block type="length" />
                        </value>
                        <value name="B">
                           <block type="math_number">
                              <field name="NUM">2</field>
                           </block>
                        </value>
                     </block>
                  </value>
                  <value name="B">
                     <block type="variables_get">
                        <field name="VAR"  variabletype="">i</field>
                     </block>
                  </value>
               </block>
            </value>
            <value name="BY">
               <block type="math_number">
                  <field name="NUM">1</field>
               </block>
            </value>
            <statement name="DO">
               <block type="controls_if">
                  <value name="IF0">
                     <block type="logic_compare">
                        <field name="OP">LT</field>
                        <value name="A">
                           <block type="getter">
                              <value name="index">
                                 <block type="variables_get">
                                    <field name="VAR" variabletype="">j</field>
                                 </block>
                              </value>
                           </block>
                        </value>
                        <value name="B">
                           <block type="getter">
                              <value name="index">
                                 <block type="math_arithmetic">
                                    <field name="OP">ADD</field>
                                    <value name="A">
                                       <block type="variables_get">
                                          <field name="VAR" variabletype="">j</field>
                                       </block>
                                    </value>
                                    <value name="B">
                                       <block type="math_number">
                                          <field name="NUM">1</field>
                                       </block>
                                    </value>
                                 </block>
                              </value>
                           </block>
                        </value>
                     </block>
                  </value>
                  <statement name="DO0">
                     <block type="swap">
                        <value name="index_a">
                           <block type="variables_get">
                              <field name="VAR" variabletype="">j</field>
                           </block>
                        </value>
                        <value name="index_b">
                           <block type="math_arithmetic">
                              <field name="OP">ADD</field>
                              <value name="A">
                                 <block type="variables_get">
                                    <field name="VAR" variabletype="">j</field>
                                 </block>
                              </value>
                              <value name="B">
                                 <block type="math_number">
                                    <field name="NUM">1</field>
                                 </block>
                              </value>
                           </block>
                        </value>
                     </block>
                  </statement>
               </block>
            </statement>
         </block>
      </statement>
   </block>`;
