var fs = Npm.require("fs");

Package.describe({
  name: 'chroma:reactive-ace',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');

  api.use([
    "templating",
    "underscore",
    "reactive-var",
    "dburles:mongo-collection-instances@0.3.4"
  ], "client");

  if (false) {
    var clientFiles = getFilesFromFolder("meteor-reactive-ace", "ace-builds/src-noconflict");
    var _ = Npm.require("underscore");
    _.each(clientFiles, function(file) {
      console.log('\"' + file + '\",')
    });
    api.add_files(clientFiles, "client");
  } else {
    api.add_files(aceFiles, "client");
  }

  api.addFiles([
    'reactive-ace.html',
    'lib/reactive-ace.js',
    'reactive-ace.css'
  ], "client");

  //api.export('AceEditor', 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('chroma:reactive-ace');
  api.addFiles('reactive-ace-tests.js');
});

function getFilesFromFolder(packageName, folder) {
  // local imports
  var _ = Npm.require("underscore");
  var fs = Npm.require("fs");
  var path = Npm.require("path");
  // helper function, walks recursively inside nested folders and return absolute filenames
  function walk(folder) {
    var filenames = [];
    // get relative filenames from folder
    var folderContent = fs.readdirSync(folder);
    // iterate over the folder content to handle nested folders
    _.each(folderContent, function(filename) {
      // build absolute filename
      var absoluteFilename = folder + path.sep + filename;
      // get file stats
      var stat = fs.statSync(absoluteFilename);
      if (stat.isDirectory()) {
        // directory case => add filenames fetched from recursive call
        filenames = filenames.concat(walk(absoluteFilename));
      } else {
        // file case => simply add it
        filenames.push(absoluteFilename);
      }
    });
    return filenames;
  }
  // save current working directory (something like "/home/user/projects/my-project")
  var cwd = process.cwd();
  // chdir to our package directory
  process.chdir("packages" + path.sep + packageName);
  // launch initial walk
  var result = walk(folder);
  // restore previous cwd
  process.chdir(cwd);
  return result;
}

var aceFiles = [
  "ace-builds/src-noconflict/ace.js",
  "ace-builds/src-noconflict/ext-beautify.js",
  "ace-builds/src-noconflict/ext-chromevox.js",
  "ace-builds/src-noconflict/ext-elastic_tabstops_lite.js",
  "ace-builds/src-noconflict/ext-emmet.js",
  "ace-builds/src-noconflict/ext-error_marker.js",
  "ace-builds/src-noconflict/ext-keybinding_menu.js",
  "ace-builds/src-noconflict/ext-language_tools.js",
  "ace-builds/src-noconflict/ext-linking.js",
  "ace-builds/src-noconflict/ext-modelist.js",
  "ace-builds/src-noconflict/ext-old_ie.js",
  "ace-builds/src-noconflict/ext-searchbox.js",
  "ace-builds/src-noconflict/ext-settings_menu.js",
  "ace-builds/src-noconflict/ext-spellcheck.js",
  "ace-builds/src-noconflict/ext-split.js",
  "ace-builds/src-noconflict/ext-static_highlight.js",
  "ace-builds/src-noconflict/ext-statusbar.js",
  "ace-builds/src-noconflict/ext-textarea.js",
  "ace-builds/src-noconflict/ext-themelist.js",
  "ace-builds/src-noconflict/ext-whitespace.js",
  "ace-builds/src-noconflict/keybinding-emacs.js",
  "ace-builds/src-noconflict/keybinding-vim.js",
  "ace-builds/src-noconflict/mode-abap.js",
  "ace-builds/src-noconflict/mode-actionscript.js",
  "ace-builds/src-noconflict/mode-ada.js",
  "ace-builds/src-noconflict/mode-apache_conf.js",
  "ace-builds/src-noconflict/mode-applescript.js",
  "ace-builds/src-noconflict/mode-asciidoc.js",
  "ace-builds/src-noconflict/mode-assembly_x86.js",
  "ace-builds/src-noconflict/mode-autohotkey.js",
  "ace-builds/src-noconflict/mode-batchfile.js",
  "ace-builds/src-noconflict/mode-c9search.js",
  "ace-builds/src-noconflict/mode-c_cpp.js",
  "ace-builds/src-noconflict/mode-cirru.js",
  "ace-builds/src-noconflict/mode-clojure.js",
  "ace-builds/src-noconflict/mode-cobol.js",
  "ace-builds/src-noconflict/mode-coffee.js",
  "ace-builds/src-noconflict/mode-coldfusion.js",
  "ace-builds/src-noconflict/mode-csharp.js",
  "ace-builds/src-noconflict/mode-css.js",
  "ace-builds/src-noconflict/mode-curly.js",
  "ace-builds/src-noconflict/mode-d.js",
  "ace-builds/src-noconflict/mode-dart.js",
  "ace-builds/src-noconflict/mode-diff.js",
  "ace-builds/src-noconflict/mode-django.js",
  "ace-builds/src-noconflict/mode-dockerfile.js",
  "ace-builds/src-noconflict/mode-dot.js",
  "ace-builds/src-noconflict/mode-eiffel.js",
  "ace-builds/src-noconflict/mode-ejs.js",
  "ace-builds/src-noconflict/mode-elixir.js",
  "ace-builds/src-noconflict/mode-elm.js",
  "ace-builds/src-noconflict/mode-erlang.js",
  "ace-builds/src-noconflict/mode-forth.js",
  "ace-builds/src-noconflict/mode-ftl.js",
  "ace-builds/src-noconflict/mode-gcode.js",
  "ace-builds/src-noconflict/mode-gherkin.js",
  "ace-builds/src-noconflict/mode-gitignore.js",
  "ace-builds/src-noconflict/mode-glsl.js",
  "ace-builds/src-noconflict/mode-golang.js",
  "ace-builds/src-noconflict/mode-groovy.js",
  "ace-builds/src-noconflict/mode-haml.js",
  "ace-builds/src-noconflict/mode-handlebars.js",
  "ace-builds/src-noconflict/mode-haskell.js",
  "ace-builds/src-noconflict/mode-haxe.js",
  "ace-builds/src-noconflict/mode-html.js",
  "ace-builds/src-noconflict/mode-html_ruby.js",
  "ace-builds/src-noconflict/mode-ini.js",
  "ace-builds/src-noconflict/mode-io.js",
  "ace-builds/src-noconflict/mode-jack.js",
  "ace-builds/src-noconflict/mode-jade.js",
  "ace-builds/src-noconflict/mode-java.js",
  "ace-builds/src-noconflict/mode-javascript.js",
  "ace-builds/src-noconflict/mode-json.js",
  "ace-builds/src-noconflict/mode-jsoniq.js",
  "ace-builds/src-noconflict/mode-jsp.js",
  "ace-builds/src-noconflict/mode-jsx.js",
  "ace-builds/src-noconflict/mode-julia.js",
  "ace-builds/src-noconflict/mode-latex.js",
  "ace-builds/src-noconflict/mode-less.js",
  "ace-builds/src-noconflict/mode-liquid.js",
  "ace-builds/src-noconflict/mode-lisp.js",
  "ace-builds/src-noconflict/mode-livescript.js",
  "ace-builds/src-noconflict/mode-logiql.js",
  "ace-builds/src-noconflict/mode-lsl.js",
  "ace-builds/src-noconflict/mode-lua.js",
  "ace-builds/src-noconflict/mode-luapage.js",
  "ace-builds/src-noconflict/mode-lucene.js",
  "ace-builds/src-noconflict/mode-makefile.js",
  "ace-builds/src-noconflict/mode-markdown.js",
  "ace-builds/src-noconflict/mode-mask.js",
  "ace-builds/src-noconflict/mode-matlab.js",
  "ace-builds/src-noconflict/mode-mel.js",
  "ace-builds/src-noconflict/mode-mushcode.js",
  "ace-builds/src-noconflict/mode-mysql.js",
  "ace-builds/src-noconflict/mode-nix.js",
  "ace-builds/src-noconflict/mode-objectivec.js",
  "ace-builds/src-noconflict/mode-ocaml.js",
  "ace-builds/src-noconflict/mode-pascal.js",
  "ace-builds/src-noconflict/mode-perl.js",
  "ace-builds/src-noconflict/mode-pgsql.js",
  "ace-builds/src-noconflict/mode-php.js",
  "ace-builds/src-noconflict/mode-plain_text.js",
  "ace-builds/src-noconflict/mode-powershell.js",
  "ace-builds/src-noconflict/mode-praat.js",
  "ace-builds/src-noconflict/mode-prolog.js",
  "ace-builds/src-noconflict/mode-properties.js",
  "ace-builds/src-noconflict/mode-protobuf.js",
  "ace-builds/src-noconflict/mode-python.js",
  "ace-builds/src-noconflict/mode-r.js",
  "ace-builds/src-noconflict/mode-rdoc.js",
  "ace-builds/src-noconflict/mode-rhtml.js",
  "ace-builds/src-noconflict/mode-ruby.js",
  "ace-builds/src-noconflict/mode-rust.js",
  "ace-builds/src-noconflict/mode-sass.js",
  "ace-builds/src-noconflict/mode-scad.js",
  "ace-builds/src-noconflict/mode-scala.js",
  "ace-builds/src-noconflict/mode-scheme.js",
  "ace-builds/src-noconflict/mode-scss.js",
  "ace-builds/src-noconflict/mode-sh.js",
  "ace-builds/src-noconflict/mode-sjs.js",
  "ace-builds/src-noconflict/mode-smarty.js",
  "ace-builds/src-noconflict/mode-snippets.js",
  "ace-builds/src-noconflict/mode-soy_template.js",
  "ace-builds/src-noconflict/mode-space.js",
  "ace-builds/src-noconflict/mode-sql.js",
  "ace-builds/src-noconflict/mode-stylus.js",
  "ace-builds/src-noconflict/mode-svg.js",
  "ace-builds/src-noconflict/mode-tcl.js",
  "ace-builds/src-noconflict/mode-tex.js",
  "ace-builds/src-noconflict/mode-text.js",
  "ace-builds/src-noconflict/mode-textile.js",
  "ace-builds/src-noconflict/mode-toml.js",
  "ace-builds/src-noconflict/mode-twig.js",
  "ace-builds/src-noconflict/mode-typescript.js",
  "ace-builds/src-noconflict/mode-vala.js",
  "ace-builds/src-noconflict/mode-vbscript.js",
  "ace-builds/src-noconflict/mode-velocity.js",
  "ace-builds/src-noconflict/mode-verilog.js",
  "ace-builds/src-noconflict/mode-vhdl.js",
  "ace-builds/src-noconflict/mode-xml.js",
  "ace-builds/src-noconflict/mode-xquery.js",
  "ace-builds/src-noconflict/mode-yaml.js",
  "ace-builds/src-noconflict/snippets/abap.js",
  "ace-builds/src-noconflict/snippets/actionscript.js",
  "ace-builds/src-noconflict/snippets/ada.js",
  "ace-builds/src-noconflict/snippets/apache_conf.js",
  "ace-builds/src-noconflict/snippets/applescript.js",
  "ace-builds/src-noconflict/snippets/asciidoc.js",
  "ace-builds/src-noconflict/snippets/assembly_x86.js",
  "ace-builds/src-noconflict/snippets/autohotkey.js",
  "ace-builds/src-noconflict/snippets/batchfile.js",
  "ace-builds/src-noconflict/snippets/c9search.js",
  "ace-builds/src-noconflict/snippets/c_cpp.js",
  "ace-builds/src-noconflict/snippets/cirru.js",
  "ace-builds/src-noconflict/snippets/clojure.js",
  "ace-builds/src-noconflict/snippets/cobol.js",
  "ace-builds/src-noconflict/snippets/coffee.js",
  "ace-builds/src-noconflict/snippets/coldfusion.js",
  "ace-builds/src-noconflict/snippets/csharp.js",
  "ace-builds/src-noconflict/snippets/css.js",
  "ace-builds/src-noconflict/snippets/curly.js",
  "ace-builds/src-noconflict/snippets/d.js",
  "ace-builds/src-noconflict/snippets/dart.js",
  "ace-builds/src-noconflict/snippets/diff.js",
  "ace-builds/src-noconflict/snippets/django.js",
  "ace-builds/src-noconflict/snippets/dockerfile.js",
  "ace-builds/src-noconflict/snippets/dot.js",
  "ace-builds/src-noconflict/snippets/eiffel.js",
  "ace-builds/src-noconflict/snippets/ejs.js",
  "ace-builds/src-noconflict/snippets/elixir.js",
  "ace-builds/src-noconflict/snippets/elm.js",
  "ace-builds/src-noconflict/snippets/erlang.js",
  "ace-builds/src-noconflict/snippets/forth.js",
  "ace-builds/src-noconflict/snippets/ftl.js",
  "ace-builds/src-noconflict/snippets/gcode.js",
  "ace-builds/src-noconflict/snippets/gherkin.js",
  "ace-builds/src-noconflict/snippets/gitignore.js",
  "ace-builds/src-noconflict/snippets/glsl.js",
  "ace-builds/src-noconflict/snippets/golang.js",
  "ace-builds/src-noconflict/snippets/groovy.js",
  "ace-builds/src-noconflict/snippets/haml.js",
  "ace-builds/src-noconflict/snippets/handlebars.js",
  "ace-builds/src-noconflict/snippets/haskell.js",
  "ace-builds/src-noconflict/snippets/haxe.js",
  "ace-builds/src-noconflict/snippets/html.js",
  "ace-builds/src-noconflict/snippets/html_ruby.js",
  "ace-builds/src-noconflict/snippets/ini.js",
  "ace-builds/src-noconflict/snippets/io.js",
  "ace-builds/src-noconflict/snippets/jack.js",
  "ace-builds/src-noconflict/snippets/jade.js",
  "ace-builds/src-noconflict/snippets/java.js",
  "ace-builds/src-noconflict/snippets/javascript.js",
  "ace-builds/src-noconflict/snippets/json.js",
  "ace-builds/src-noconflict/snippets/jsoniq.js",
  "ace-builds/src-noconflict/snippets/jsp.js",
  "ace-builds/src-noconflict/snippets/jsx.js",
  "ace-builds/src-noconflict/snippets/julia.js",
  "ace-builds/src-noconflict/snippets/latex.js",
  "ace-builds/src-noconflict/snippets/less.js",
  "ace-builds/src-noconflict/snippets/liquid.js",
  "ace-builds/src-noconflict/snippets/lisp.js",
  "ace-builds/src-noconflict/snippets/livescript.js",
  "ace-builds/src-noconflict/snippets/logiql.js",
  "ace-builds/src-noconflict/snippets/lsl.js",
  "ace-builds/src-noconflict/snippets/lua.js",
  "ace-builds/src-noconflict/snippets/luapage.js",
  "ace-builds/src-noconflict/snippets/lucene.js",
  "ace-builds/src-noconflict/snippets/makefile.js",
  "ace-builds/src-noconflict/snippets/markdown.js",
  "ace-builds/src-noconflict/snippets/mask.js",
  "ace-builds/src-noconflict/snippets/matlab.js",
  "ace-builds/src-noconflict/snippets/mel.js",
  "ace-builds/src-noconflict/snippets/mushcode.js",
  "ace-builds/src-noconflict/snippets/mysql.js",
  "ace-builds/src-noconflict/snippets/nix.js",
  "ace-builds/src-noconflict/snippets/objectivec.js",
  "ace-builds/src-noconflict/snippets/ocaml.js",
  "ace-builds/src-noconflict/snippets/pascal.js",
  "ace-builds/src-noconflict/snippets/perl.js",
  "ace-builds/src-noconflict/snippets/pgsql.js",
  "ace-builds/src-noconflict/snippets/php.js",
  "ace-builds/src-noconflict/snippets/plain_text.js",
  "ace-builds/src-noconflict/snippets/powershell.js",
  "ace-builds/src-noconflict/snippets/praat.js",
  "ace-builds/src-noconflict/snippets/prolog.js",
  "ace-builds/src-noconflict/snippets/properties.js",
  "ace-builds/src-noconflict/snippets/protobuf.js",
  "ace-builds/src-noconflict/snippets/python.js",
  "ace-builds/src-noconflict/snippets/r.js",
  "ace-builds/src-noconflict/snippets/rdoc.js",
  "ace-builds/src-noconflict/snippets/rhtml.js",
  "ace-builds/src-noconflict/snippets/ruby.js",
  "ace-builds/src-noconflict/snippets/rust.js",
  "ace-builds/src-noconflict/snippets/sass.js",
  "ace-builds/src-noconflict/snippets/scad.js",
  "ace-builds/src-noconflict/snippets/scala.js",
  "ace-builds/src-noconflict/snippets/scheme.js",
  "ace-builds/src-noconflict/snippets/scss.js",
  "ace-builds/src-noconflict/snippets/sh.js",
  "ace-builds/src-noconflict/snippets/sjs.js",
  "ace-builds/src-noconflict/snippets/smarty.js",
  "ace-builds/src-noconflict/snippets/snippets.js",
  "ace-builds/src-noconflict/snippets/soy_template.js",
  "ace-builds/src-noconflict/snippets/space.js",
  "ace-builds/src-noconflict/snippets/sql.js",
  "ace-builds/src-noconflict/snippets/stylus.js",
  "ace-builds/src-noconflict/snippets/svg.js",
  "ace-builds/src-noconflict/snippets/tcl.js",
  "ace-builds/src-noconflict/snippets/tex.js",
  "ace-builds/src-noconflict/snippets/text.js",
  "ace-builds/src-noconflict/snippets/textile.js",
  "ace-builds/src-noconflict/snippets/toml.js",
  "ace-builds/src-noconflict/snippets/twig.js",
  "ace-builds/src-noconflict/snippets/typescript.js",
  "ace-builds/src-noconflict/snippets/vala.js",
  "ace-builds/src-noconflict/snippets/vbscript.js",
  "ace-builds/src-noconflict/snippets/velocity.js",
  "ace-builds/src-noconflict/snippets/verilog.js",
  "ace-builds/src-noconflict/snippets/vhdl.js",
  "ace-builds/src-noconflict/snippets/xml.js",
  "ace-builds/src-noconflict/snippets/xquery.js",
  "ace-builds/src-noconflict/snippets/yaml.js",
  "ace-builds/src-noconflict/theme-ambiance.js",
  "ace-builds/src-noconflict/theme-chaos.js",
  "ace-builds/src-noconflict/theme-chrome.js",
  "ace-builds/src-noconflict/theme-clouds.js",
  "ace-builds/src-noconflict/theme-clouds_midnight.js",
  "ace-builds/src-noconflict/theme-cobalt.js",
  "ace-builds/src-noconflict/theme-crimson_editor.js",
  "ace-builds/src-noconflict/theme-dawn.js",
  "ace-builds/src-noconflict/theme-dreamweaver.js",
  "ace-builds/src-noconflict/theme-eclipse.js",
  "ace-builds/src-noconflict/theme-github.js",
  "ace-builds/src-noconflict/theme-idle_fingers.js",
  "ace-builds/src-noconflict/theme-katzenmilch.js",
  "ace-builds/src-noconflict/theme-kr_theme.js",
  "ace-builds/src-noconflict/theme-kuroir.js",
  "ace-builds/src-noconflict/theme-merbivore.js",
  "ace-builds/src-noconflict/theme-merbivore_soft.js",
  "ace-builds/src-noconflict/theme-mono_industrial.js",
  "ace-builds/src-noconflict/theme-monokai.js",
  "ace-builds/src-noconflict/theme-pastel_on_dark.js",
  "ace-builds/src-noconflict/theme-solarized_dark.js",
  "ace-builds/src-noconflict/theme-solarized_light.js",
  "ace-builds/src-noconflict/theme-terminal.js",
  "ace-builds/src-noconflict/theme-textmate.js",
  "ace-builds/src-noconflict/theme-tomorrow.js",
  "ace-builds/src-noconflict/theme-tomorrow_night.js",
  "ace-builds/src-noconflict/theme-tomorrow_night_blue.js",
  "ace-builds/src-noconflict/theme-tomorrow_night_bright.js",
  "ace-builds/src-noconflict/theme-tomorrow_night_eighties.js",
  "ace-builds/src-noconflict/theme-twilight.js",
  "ace-builds/src-noconflict/theme-vibrant_ink.js",
  "ace-builds/src-noconflict/theme-xcode.js",
  "ace-builds/src-noconflict/worker-coffee.js",
  "ace-builds/src-noconflict/worker-css.js",
  "ace-builds/src-noconflict/worker-html.js",
  "ace-builds/src-noconflict/worker-javascript.js",
  "ace-builds/src-noconflict/worker-json.js",
  "ace-builds/src-noconflict/worker-lua.js",
  "ace-builds/src-noconflict/worker-php.js",
  "ace-builds/src-noconflict/worker-xquery.js"
]
