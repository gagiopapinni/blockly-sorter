
goog.provide("Sorter.App");


goog.require("goog.dom");
goog.require("PIXI");

goog.require("Blockly");
goog.require("Blockly.JavaScript");
goog.require('Blockly.Msg.en');

goog.require("Sorter");
goog.require("Sorter.Blocks");
goog.require("Sorter.Generators");
goog.require("Sorter.VisualArray");
goog.require("Sorter.ToolBox");
goog.require("Sorter.Controls");
goog.require("Sorter.AboutMenu");

Sorter.App = class App {
    
    constructor (){
       
      this.VISUAL_ARRAY_MAX_WIDTH = 600;
      this.VISUAL_ARRAY_MAX_HEIGHT = 150;
      this.WORKSPACE_HEIGHT = 500;
 
      this.grid = this._initGrid();

      this.ticker = new PIXI.ticker.Ticker();
       
      this.renderer = this._injectRenderer();

      this.visual_array = new Sorter.VisualArray({x:0,
                                                  y:0, 
                                                  length:10,
                                                  width:this.VISUAL_ARRAY_MAX_WIDTH ,
                                                  height:this.VISUAL_ARRAY_MAX_HEIGHT
                                                }); 

      this.execution_context = Sorter.Generators.init( this.visual_array );    
      
      this.workspace = this._injectBlockly();

      this.controls = this._injectControls();

      this._injectDescriptions()
      
      this.is_executing = false;

      this.visual_array.listen('onAnimationStart',()=>{ this.is_executing = true; })
      this.visual_array.listen('onAnimationComplete',()=>{ this.is_executing = false; })
       

      this.ticker.add(function (){

        this.visual_array.render(this.renderer);

      },this);
      

      this.ticker.start();


      window.addEventListener('resize',()=>{ 
    
                this._resize();

      });

      this._resize();

      this._shuffleVisualArray();
      
    }

    _resize(){

          this. _resizeVisualArray();
          
          this.renderer.view.width = this.visual_array.width;

          this.renderer.view.height = this.visual_array.height;

    }
    _resizeVisualArray(){

          const ratio = this.visual_array.width/this.visual_array.height;

          let width = document.body.clientWidth,
              height = width / ratio;

          if( width > this.VISUAL_ARRAY_MAX_WIDTH || height > this.VISUAL_ARRAY_MAX_HEIGHT ){
  
                      width =  this.VISUAL_ARRAY_MAX_WIDTH;
                      height = this.VISUAL_ARRAY_MAX_HEIGHT;
          }

          this.visual_array.resize(width,height)

     }
    _generateRandomArray(length){

         const array = [];
 
         for(let i = 0;i<length;i++) array[i] = i;                            
       
         for(let i = 0;i<length;i++){
                      
              let a = Math.round(Math.random() * (length-1)),
                  b = Math.round(Math.random() * (length-1)); 
       
              [array[a],array[b]] = [array[b],array[a]];
         }
         
         return array;

    }
    _shuffleVisualArray(){
         
         this.visual_array.reset(this._generateRandomArray(this.visual_array.length));
  
    }
    _alert(msg){
    
         const element = document.createElement('div');

         element.setAttribute("class","alert alert-danger");

         element.innerText = msg;
         
         this.grid.column1.appendChild(element);

         setTimeout(()=>{ element.remove(); },2000)

     }
     _execute(){

          const blockly_code = new Function( Blockly.JavaScript.workspaceToCode(this.workspace) );
            
          
          try{  

              blockly_code.call(this.execution_context);
 
          }
          catch(e){

              this._alert(e.toString());
             
              this.visual_array.reset(this.visual_array.toPlainArray());
              
          }
           
     }
     _initGrid(){
         
         const container = goog.dom.createDom('div') ,  

               row = goog.dom.createDom('div',{'class':'row justify-content-center no-gutters'}),

               col_0 = goog.dom.createDom('div',{'class':'col-12 col-xl-7 no-gutters',
                                                 'id':'col_1_'+ Math.random().toString(36).substr(2, 9),
                                                }),

               devider_0 = goog.dom.createDom('div',{'class':'w-100'}),

               col_1 = goog.dom.createDom('div',{'class':'col-auto no-gutters',
                                                 'id':'col_1_'+ Math.random().toString(36).substr(2, 9),
                                                }),

               devider_1 = goog.dom.createDom('div',{'class':'w-100'}),

               col_2 = goog.dom.createDom('div',{'class':'col-12 col-xl-9 no-gutters ',
                                                 'id':'col_2_' + Math.random().toString(36).substr(2, 9),
                                                 'style':"height:"+this.WORKSPACE_HEIGHT+"px;"});
 
         document.body.appendChild(container);
         container.appendChild(row);
         row.appendChild(col_0);
         row.appendChild(devider_0);
         row.appendChild(col_1);
         row.appendChild(devider_1);
         row.appendChild(col_2);
    
         return {  container: container,
                   column0: col_0,
                   column1: col_1,
                   column2: col_2  };

     }
    _injectDescriptions(){
         let obj = new Sorter.AboutMenu();

         this.grid.column0.appendChild( obj.container );
         
     }
    _injectControls(){
       
         const controls = new Sorter.Controls(),

               execute = controls.buttons.execute,
               pause = controls.buttons.pause,
               shuffle = controls.buttons.shuffle,
        
               array = this.visual_array;


         this.grid.column1.appendChild(controls.container);


         array.listen('onAnimationStart', ()=>{               
                     execute.setAttribute('disabled',''); 
         });

         array.listen('onAnimationComplete',()=>{ 
                     execute.removeAttribute('disabled'); 
         }); 
           
         execute.addEventListener("click",()=>{ 
                     this._execute(); 
         });




         pause.innerText = 'Pause';

         array.listen('onPause',()=>{  

                     pause.innerText = 'Resume';

                     execute.setAttribute('disabled',''); 

         });

         array.listen('onResume',()=>{

                     pause.innerText = 'Pause';
                     
                     if(!this.is_executing) execute.removeAttribute('disabled');          

         });

         pause.addEventListener("click",()=>{
             
                     array.paused = !array.paused;

         });
   
         shuffle.addEventListener("click",()=>{

                     this._shuffleVisualArray();
                     
         });

         controls.speed_radio['2x'].addEventListener('click',()=>{ array.speed = 3;});

         controls.speed_radio['1x'].addEventListener('click',()=>{ array.speed = 1; });

         controls.speed_radio['0.5x'].addEventListener('click',()=>{ array.speed = 0.5; });

         return controls;


    }

    _injectRenderer(){

         let renderer = new PIXI.CanvasRenderer({width:this.VISUAL_ARRAY_MAX_WIDTH,
                                                 height:this.VISUAL_ARRAY_MAX_HEIGHT,
                                                 transparent:true});
    
         this.grid.column1.appendChild(renderer.view);

         return renderer;

    }

    _injectBlockly(){

         window.loop_limit = 10000;

         Blockly.JavaScript.INFINITE_LOOP_TRAP = `if( !(window.loop_limit--) )
                                                  {                                
                                                        window.loop_limit = 10000;
                                                        throw "Infinite loop.";

                                                  };\n`;
      
         return Blockly.inject( this.grid.column2.id ,{ 

            toolbox: Sorter.ToolBox,

            zoom:{ controls: true,
                   startScale: 1.0,
                   maxScale: 3,
                   minScale: 0.3,
                   scaleSpeed: 1.2
                 }, 

            grid:{ spacing: 20,
                   length: 1,
                   colour: '#ccc',
                   snap: true
                 },

          });

    }
    destroy (){

       /////pass
    }

};


