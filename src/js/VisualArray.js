
goog.provide("Sorter.VisualArray");



goog.require("PIXI");
goog.require("TimelineMax");
goog.require("Sorter");
goog.require("goog.events.EventTarget");


Sorter.VisualArray = class VisualArray extends  goog.events.EventTarget {
   
    constructor (options = {}){
      
        super();

        
        this._length = options.length || 10;

        this._colors = {
               
               font: options.font_color || 0x9f9aa4,//0xae26ed,
               cell: options.cell_color || 0x1f2421,//0xEC555B,//0x231f20,//0xfed766,// 0xFFA153,

        };

        this._borders = {

               x: options.x || 0,
               y: options.y || 0,
               width: options.width || 0,
               height: options.height || 0,

        };

        
        this._TRUE_SIZES = this._determineSizes( options.width, options.height )        

        
        this._graphics = new PIXI.Graphics();     


        this._font_styles = {
                
            cell: {fontFamily: "\"Lucida Console\", Monaco, monospace", fill: this._colors.font , align: 'center'},

            index: {fontFamily: 'Helvetica', fill: this._colors.font , align: 'center'},

        };


	this._cells = [];

        this._indices = [];
        
        this._animation_composers_queue = [];

        this._current_animation = null;

        this._time_scale = 1;

        this._paused = false;


        this._init();

        this.setPosition( this.x,this.y );


        
             

    }
    get x () {
       
        return this._borders.x;

    }
    get y () {
       
        return this._borders.y;

    } 
    get width () {
       
        return this._borders.width;

    } 
    get height () {
       
        return this._borders.height;

    } 
    get length () { 

       return this._length ;

    } 
    set paused ( paused ){
 
        this._paused = paused;
   
        if( paused ){ 

            if( this._current_animation )
           
               this._current_animation.pause();

            this.dispatchEvent("onPause");

        }else { 

             if( this._current_animation )

                this._current_animation.resume();
 
             this.dispatchEvent("onResume");

         }

    }
    get paused (){ 

        return this._paused; 
 
    }
    set speed(speed){

        this._time_scale = speed;
        
        if(this._current_animation) this._current_animation.timeScale(speed);


    }
    get speed(){ return this._time_scale; }

    _reset(array){

         for(let i = 0;i < this.length; i++){

               let value = this._cells[i].getChildByName('value');
           
               if( array[i] === void(0) ) value.text = '0';

               else value.text = array[i].toString();

         }

         this.dispatchEvent('onReset');

    }
    reset( array = [] ){
        
        this.paused = false;     

        this._animation_composers_queue = [];

        if(this._current_animation) {

             let old_one = this._current_animation.eventCallback('onComplete');

             this._current_animation.eventCallback('onComplete',() => {

                 old_one.call();
                 
                 this._reset(array);
                 
             });  

             this._current_animation.progress(1);
  
        }else

             this._reset(array);
      
    }

    toPlainArray () {
       
       let array = [];
       
       this._cells.forEach( cell => {
              
            let value = Number(cell.getChildByName('value').text);

            if( Number.isNaN(value) )  
 
                throw new TypeError("the cell's value has to be numeric");

            array.push( value );
             

       })

       return array;


    }

    swap ( index_a , index_b ) { 
        
        if( index_a >= this._length || index_b >= this._length || index_a < 0 || index_b < 0 ) 
 
              throw new RangeError("swap( "+index_a+" , "+index_b+" ); - invalid indices");

        if( index_a === index_b ) return;


  

        let animation_composer = () => {
                  

            let animation =  new TimelineMax({paused:true,}),

                cell_a = this._cells[index_a],
        
                cell_b = this._cells[index_b],
 
                type = 'soft',

                duration = 1.4;
                 
           

            animation.to(cell_a,duration,
                        {
                            bezier:{ 
                                     values:[ 
                                              {x:cell_a.x,y:0},
 
                                              {x: cell_b.x,y:0},

                                              {x: cell_b.x, y:cell_b.y},
                                            ],

                                     type:type, 
                                    
                                   } 
 
                        },0)
                 

                     .to(cell_b,duration,
                        { 
                             bezier:{
                                      values:[ 
                                               {x:cell_b.x,y:0},

                                               {x:cell_a.x,y:0},

                                               {x: cell_a.x,y: cell_a.y}, 
                                             ],

                                      type:type,

                                    }
                        },0)
   
             animation.eventCallback('onComplete',() => {
         
                 let a = index_a, b = index_b;

                 [this._cells[a],this._cells[b]] = [this._cells[b],this._cells[a]];

                 this._manageQueue(); 
    
             });

            
             return animation;

        }



        this._pushQueue(animation_composer);

    }
              
       
    _pushQueue( animation_composer ){

        this._animation_composers_queue.push( animation_composer );

        if( this._current_animation === null ) this._manageQueue(); 

     }

    _manageQueue() {  
         
       if( this._animation_composers_queue.length ) {

          let composer = this._animation_composers_queue.shift();
            
          this._current_animation = composer();
   
          if( !this._paused ) this._current_animation.play();

          this._current_animation.timeScale( this._time_scale );

          this.dispatchEvent("onAnimationStart");          
       
       }else {
        
          this._current_animation = null;
          
          this.dispatchEvent("onAnimationComplete"); 
  
       }
     
    }
    


    setPosition(x = 0,y = 0){
       
          this._borders.x = x;
   
          this._borders.y = y;

          this._graphics.position.set(x,y);

    }
    
  

    resize( width = 0, height = 0){ 

         this._borders.width = width;

         this._borders.height = height;


         let ratioX = width / this._TRUE_SIZES.width,

             ratioY = height / this._TRUE_SIZES.height;

         this._graphics.scale.set( ratioX,ratioY )
         
    }

    _determineSizes ( width, height ){

          let sizes = {};

              sizes.width = width;

              sizes.height = height;

              sizes.gap = width/60;

              sizes.cell_width = width/ this.length - sizes.gap;

              sizes.cell_height = sizes.cell_width;
              
              sizes.cell_font_size = sizes.cell_width * 0.9 ;

              sizes.index_font_size = sizes.cell_font_size / 1.6;

              if(sizes.cell_height + sizes.index_font_size > height)

                 sizes.cell_height = sizes.cell_font_size = sizes.index_font_size = height/2;
                       
              

          return sizes;
          

    }

 
    _init () {
  
          this._initCells();

          this._initIndices();

          this._initPositions();

    }

    _initPositions (){

       for( let i = 0; i < this.length ; i++){
             
           let cell,index;

           [cell,index] = [this._cells[i],this._indices[i]]         

           cell.x = i*(this._TRUE_SIZES.gap + this._TRUE_SIZES.cell_width);

           cell.y = this._borders.height - this._TRUE_SIZES.cell_height - this._TRUE_SIZES.index_font_size ;
  
           index.position.set( cell.x , cell.y + this._TRUE_SIZES.cell_height );

       }

    }
    _initCells (){
       
        for(let i = 0;i < this.length ;i++){

          let cell = new PIXI.Graphics(),

              value = new PIXI.Text( i.toString(), this._font_styles.cell );
              
          value.name = 'value';

          value.style.fontSize = this._TRUE_SIZES.cell_font_size;

          cell.addChild(value);

          cell.beginFill(this._colors.cell);

          cell.drawRoundedRect(0,0,this._TRUE_SIZES.cell_width,this._TRUE_SIZES.cell_height,4);

          this._graphics.addChild( cell );

          this._cells[i] = cell;
           
        }     

     }  
        
     _initIndices (){

        for(let i = 0;i < this.length;i++){
           
           let index = new PIXI.Text(i.toString(), this._font_styles.index );

           index.style.fontSize = this._TRUE_SIZES.index_font_size;

           index.alpha = .4

           this._indices[i] = index;

           this._graphics.addChild( index );

        }  

     }


     render(canvas_renderer){  
       
        canvas_renderer.render(this._graphics);
     
     }

}





