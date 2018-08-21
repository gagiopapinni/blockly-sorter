

const gulp = require('gulp'),

      PyShell = require('python-shell'),

      fs = require('fs'),

      footer = require('gulp-footer'),

      header = require('gulp-header'),

      path = require('path'),

      closureCompiler = require('google-closure-compiler').gulp(),

      depswriter = "node_modules/google-closure-library/closure/bin/build/depswriter.py",

      JQUERY='node_modules/jquery/dist/jquery.js',
      BOOTSTRAP='node_modules/bootstrap/dist/js/bootstrap.js',
      GSAP='node_modules/gsap/src/uncompressed/TweenMax.js',
      PIXI='node_modules/pixi.js/dist/pixi.js',   

      entry_namespace = "Sorter.Start",

      deps_file = './deps.js',

      file = pth => fs.readFileSync(pth, "utf8"),
      
      generateDeps = cb => {
    
         const options = {
               mode: 'text',
               args: ['--root_with_prefix=src/js/ ../../../../src/js/',
                      '--path_with_depspath='+PIXI+'      ../../../../'+PIXI,
                      '--path_with_depspath='+GSAP+'      ../../../../'+GSAP,
                      '--path_with_depspath='+BOOTSTRAP+' ../../../../'+BOOTSTRAP,
                      '--path_with_depspath='+JQUERY+'    ../../../../'+JQUERY,
                      '--path_with_depspath=node_modules/blockly/msg/js/en.js ../../../../node_modules/blockly/msg/js/en.js',
                      `--path_with_depspath=node_modules/blockly/generators/javascript.js 
                                        ../../../../node_modules/blockly/generators/javascript.js`,
                      `--path_with_depspath=node_modules/blockly/javascript_compressed.js  
                                        ../../../../node_modules/blockly/javascript_compressed.js`,
                      `--path_with_depspath=node_modules/blockly/blocks_compressed.js 
                                        ../../../../node_modules/blockly/blocks_compressed.js`,
                      '--output_file='+deps_file]
         }

         PyShell.run( depswriter, options,(err,res) => {
          
             if (err) console.log(err.message);
             if(cb) cb();
         });  
   
      };




gulp.task("uncompressed",(finish) => {
    
    generateDeps(() => {

      fs.closeSync(fs.openSync('uncompressed.js','w'));
   
      gulp.src('uncompressed.js')

          .pipe(footer(file(deps_file)))

          .pipe(footer( "\n/* input point */\ngoog.require('"+entry_namespace+"');\n"  ))

          .pipe(gulp.dest("./"));

      finish();
    });
      
 
});

gulp.task('compressed', function (finish) {

             

             gulp.src(['src/js/*.js',
                       'node_modules/blockly/**/*js',
                       'node_modules/google-closure-library/**/*.js',
                        GSAP,PIXI,JQUERY,BOOTSTRAP,

                      ])

                 .pipe(closureCompiler(
                      {
                        compilation_level: 'SIMPLE',
                        warning_level: 'QUIET',
                        js_output_file: 'compressed.js',
                        dependency_mode: 'STRICT',
                        entry_point: entry_namespace,
                        //output_manifest: './manifest.MF'
         
                      },
                      {
                         platform: [ 'native','java','javascript' ]
                      }
                   ))

                  .pipe(gulp.dest('./')); 

             finish();
});


//some files need additional deps info
gulp.task("writeDepsInfo",(finish) => {
     
      const comment = "/*closure-like dependency information*/\n";
 
      gulp.src(PIXI)
          .pipe(header(
               comment+
               "goog.provide('PIXI');\n"+
               "PIXI = void(0);\n"
           ))
          .pipe(gulp.dest(path.dirname(PIXI)));

      gulp.src(GSAP)
          .pipe(header(
                comment+
                "goog.provide('TweenMax');\n"+
                "goog.provide('TimelineMax');\n"+
                "TimelineMax = TweenMax = void(0);\n"
          ))
          .pipe(gulp.dest(path.dirname(GSAP)));

       gulp.src(JQUERY)
          .pipe(header(
                comment+
                "goog.provide('Jquery');\n"+
                "jquery = void(0);\n"
          ))
          .pipe(gulp.dest(path.dirname(JQUERY)));

       gulp.src(BOOTSTRAP)
          .pipe(header(
                comment+
                "goog.provide('Bootstrap');\n"+
                "Bootstrap = void(0);\n"+
                "goog.require('Jquery');\n"
          ))
          .pipe(gulp.dest(path.dirname(BOOTSTRAP)));

       
       gulp.src('node_modules/blockly/blocks_compressed.js')
          .pipe(header(
                comment+
                "goog.provide('blockly_blocks_compressed');\n"
          ))
          .pipe(gulp.dest('node_modules/blockly'));

       gulp.src('node_modules/blockly/javascript_compressed.js')
          .pipe(header(
                comment+
                "goog.provide('blockly_generators_compressed');\n"
          ))
          .pipe(gulp.dest('node_modules/blockly'));


      finish();
});



