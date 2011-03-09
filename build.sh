MINIFY=$1
CLOSURE_COMPILER="/development/tools/javascript/closure/compiler.jar"
SPROCKET_OPTS="-I lib -I /development/projects/github/sidelab/ -I /development/projects/github/"

: ${MINIFY:=false}

# sprocketize the source
sprocketize $SPROCKET_OPTS src/cani.js > cani.js

# minify
if $MINIFY; then
    java -jar $CLOSURE_COMPILER \
         --compilation_level SIMPLE_OPTIMIZATIONS \
         --js_output_file cani.min.js \
         --js cani.js
fi;