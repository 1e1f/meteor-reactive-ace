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
    var clientFiles = getFilesFromFolder("reactive-ace", "ace-builds/src-min-noconflict");
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
    'lib/reactive-ace.js'
  ], "client");

  //api.export('AceEditor', 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('reactive-ace');
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
  "ace-builds/src-min-noconflict/ace.js",
  "ace-builds/src-min-noconflict/ext-beautify.js",
  "ace-builds/src-min-noconflict/ext-chromevox.js",
  "ace-builds/src-min-noconflict/ext-elastic_tabstops_lite.js",
  "ace-builds/src-min-noconflict/ext-emmet.js",
  "ace-builds/src-min-noconflict/ext-error_marker.js",
  "ace-builds/src-min-noconflict/ext-keybinding_menu.js",
  "ace-builds/src-min-noconflict/ext-language_tools.js",
  "ace-builds/src-min-noconflict/ext-linking.js",
  "ace-builds/src-min-noconflict/ext-modelist.js",
  "ace-builds/src-min-noconflict/ext-old_ie.js",
  "ace-builds/src-min-noconflict/ext-searchbox.js",
  "ace-builds/src-min-noconflict/ext-settings_menu.js",
  "ace-builds/src-min-noconflict/ext-spellcheck.js",
  "ace-builds/src-min-noconflict/ext-split.js",
  "ace-builds/src-min-noconflict/ext-static_highlight.js",
  "ace-builds/src-min-noconflict/ext-statusbar.js",
  "ace-builds/src-min-noconflict/ext-textarea.js",
  "ace-builds/src-min-noconflict/ext-themelist.js",
  "ace-builds/src-min-noconflict/ext-whitespace.js",
  "ace-builds/src-min-noconflict/keybinding-emacs.js",
  "ace-builds/src-min-noconflict/keybinding-vim.js",
  "ace-builds/src-min-noconflict/mode-abap.js",
  "ace-builds/src-min-noconflict/mode-actionscript.js",
  "ace-builds/src-min-noconflict/mode-ada.js",
  "ace-builds/src-min-noconflict/mode-apache_conf.js",
  "ace-builds/src-min-noconflict/mode-applescript.js",
  "ace-builds/src-min-noconflict/mode-asciidoc.js",
  "ace-builds/src-min-noconflict/mode-assembly_x86.js",
  "ace-builds/src-min-noconflict/mode-autohotkey.js",
  "ace-builds/src-min-noconflict/mode-batchfile.js",
  "ace-builds/src-min-noconflict/mode-c9search.js",
  "ace-builds/src-min-noconflict/mode-c_cpp.js",
  "ace-builds/src-min-noconflict/mode-cirru.js",
  "ace-builds/src-min-noconflict/mode-clojure.js",
  "ace-builds/src-min-noconflict/mode-cobol.js",
  "ace-builds/src-min-noconflict/mode-coffee.js",
  "ace-builds/src-min-noconflict/mode-coldfusion.js",
  "ace-builds/src-min-noconflict/mode-csharp.js",
  "ace-builds/src-min-noconflict/mode-css.js",
  "ace-builds/src-min-noconflict/mode-curly.js",
  "ace-builds/src-min-noconflict/mode-d.js",
  "ace-builds/src-min-noconflict/mode-dart.js",
  "ace-builds/src-min-noconflict/mode-diff.js",
  "ace-builds/src-min-noconflict/mode-django.js",
  "ace-builds/src-min-noconflict/mode-dockerfile.js",
  "ace-builds/src-min-noconflict/mode-dot.js",
  "ace-builds/src-min-noconflict/mode-eiffel.js",
  "ace-builds/src-min-noconflict/mode-ejs.js",
  "ace-builds/src-min-noconflict/mode-elixir.js",
  "ace-builds/src-min-noconflict/mode-elm.js",
  "ace-builds/src-min-noconflict/mode-erlang.js",
  "ace-builds/src-min-noconflict/mode-forth.js",
  "ace-builds/src-min-noconflict/mode-ftl.js",
  "ace-builds/src-min-noconflict/mode-gcode.js",
  "ace-builds/src-min-noconflict/mode-gherkin.js",
  "ace-builds/src-min-noconflict/mode-gitignore.js",
  "ace-builds/src-min-noconflict/mode-glsl.js",
  "ace-builds/src-min-noconflict/mode-golang.js",
  "ace-builds/src-min-noconflict/mode-groovy.js",
  "ace-builds/src-min-noconflict/mode-haml.js",
  "ace-builds/src-min-noconflict/mode-handlebars.js",
  "ace-builds/src-min-noconflict/mode-haskell.js",
  "ace-builds/src-min-noconflict/mode-haxe.js",
  "ace-builds/src-min-noconflict/mode-html.js",
  "ace-builds/src-min-noconflict/mode-html_ruby.js",
  "ace-builds/src-min-noconflict/mode-ini.js",
  "ace-builds/src-min-noconflict/mode-io.js",
  "ace-builds/src-min-noconflict/mode-jack.js",
  "ace-builds/src-min-noconflict/mode-jade.js",
  "ace-builds/src-min-noconflict/mode-java.js",
  "ace-builds/src-min-noconflict/mode-javascript.js",
  "ace-builds/src-min-noconflict/mode-json.js",
  "ace-builds/src-min-noconflict/mode-jsoniq.js",
  "ace-builds/src-min-noconflict/mode-jsp.js",
  "ace-builds/src-min-noconflict/mode-jsx.js",
  "ace-builds/src-min-noconflict/mode-julia.js",
  "ace-builds/src-min-noconflict/mode-latex.js",
  "ace-builds/src-min-noconflict/mode-less.js",
  "ace-builds/src-min-noconflict/mode-liquid.js",
  "ace-builds/src-min-noconflict/mode-lisp.js",
  "ace-builds/src-min-noconflict/mode-livescript.js",
  "ace-builds/src-min-noconflict/mode-logiql.js",
  "ace-builds/src-min-noconflict/mode-lsl.js",
  "ace-builds/src-min-noconflict/mode-lua.js",
  "ace-builds/src-min-noconflict/mode-luapage.js",
  "ace-builds/src-min-noconflict/mode-lucene.js",
  "ace-builds/src-min-noconflict/mode-makefile.js",
  "ace-builds/src-min-noconflict/mode-markdown.js",
  "ace-builds/src-min-noconflict/mode-mask.js",
  "ace-builds/src-min-noconflict/mode-matlab.js",
  "ace-builds/src-min-noconflict/mode-mel.js",
  "ace-builds/src-min-noconflict/mode-mushcode.js",
  "ace-builds/src-min-noconflict/mode-mysql.js",
  "ace-builds/src-min-noconflict/mode-nix.js",
  "ace-builds/src-min-noconflict/mode-objectivec.js",
  "ace-builds/src-min-noconflict/mode-ocaml.js",
  "ace-builds/src-min-noconflict/mode-pascal.js",
  "ace-builds/src-min-noconflict/mode-perl.js",
  "ace-builds/src-min-noconflict/mode-pgsql.js",
  "ace-builds/src-min-noconflict/mode-php.js",
  "ace-builds/src-min-noconflict/mode-plain_text.js",
  "ace-builds/src-min-noconflict/mode-powershell.js",
  "ace-builds/src-min-noconflict/mode-praat.js",
  "ace-builds/src-min-noconflict/mode-prolog.js",
  "ace-builds/src-min-noconflict/mode-properties.js",
  "ace-builds/src-min-noconflict/mode-protobuf.js",
  "ace-builds/src-min-noconflict/mode-python.js",
  "ace-builds/src-min-noconflict/mode-r.js",
  "ace-builds/src-min-noconflict/mode-rdoc.js",
  "ace-builds/src-min-noconflict/mode-rhtml.js",
  "ace-builds/src-min-noconflict/mode-ruby.js",
  "ace-builds/src-min-noconflict/mode-rust.js",
  "ace-builds/src-min-noconflict/mode-sass.js",
  "ace-builds/src-min-noconflict/mode-scad.js",
  "ace-builds/src-min-noconflict/mode-scala.js",
  "ace-builds/src-min-noconflict/mode-scheme.js",
  "ace-builds/src-min-noconflict/mode-scss.js",
  "ace-builds/src-min-noconflict/mode-sh.js",
  "ace-builds/src-min-noconflict/mode-sjs.js",
  "ace-builds/src-min-noconflict/mode-smarty.js",
  "ace-builds/src-min-noconflict/mode-snippets.js",
  "ace-builds/src-min-noconflict/mode-soy_template.js",
  "ace-builds/src-min-noconflict/mode-space.js",
  "ace-builds/src-min-noconflict/mode-sql.js",
  "ace-builds/src-min-noconflict/mode-stylus.js",
  "ace-builds/src-min-noconflict/mode-svg.js",
  "ace-builds/src-min-noconflict/mode-tcl.js",
  "ace-builds/src-min-noconflict/mode-tex.js",
  "ace-builds/src-min-noconflict/mode-text.js",
  "ace-builds/src-min-noconflict/mode-textile.js",
  "ace-builds/src-min-noconflict/mode-toml.js",
  "ace-builds/src-min-noconflict/mode-twig.js",
  "ace-builds/src-min-noconflict/mode-typescript.js",
  "ace-builds/src-min-noconflict/mode-vala.js",
  "ace-builds/src-min-noconflict/mode-vbscript.js",
  "ace-builds/src-min-noconflict/mode-velocity.js",
  "ace-builds/src-min-noconflict/mode-verilog.js",
  "ace-builds/src-min-noconflict/mode-vhdl.js",
  "ace-builds/src-min-noconflict/mode-xml.js",
  "ace-builds/src-min-noconflict/mode-xquery.js",
  "ace-builds/src-min-noconflict/mode-yaml.js",
  "ace-builds/src-min-noconflict/snippets/abap.js",
  "ace-builds/src-min-noconflict/snippets/actionscript.js",
  "ace-builds/src-min-noconflict/snippets/ada.js",
  "ace-builds/src-min-noconflict/snippets/apache_conf.js",
  "ace-builds/src-min-noconflict/snippets/applescript.js",
  "ace-builds/src-min-noconflict/snippets/asciidoc.js",
  "ace-builds/src-min-noconflict/snippets/assembly_x86.js",
  "ace-builds/src-min-noconflict/snippets/autohotkey.js",
  "ace-builds/src-min-noconflict/snippets/batchfile.js",
  "ace-builds/src-min-noconflict/snippets/c9search.js",
  "ace-builds/src-min-noconflict/snippets/c_cpp.js",
  "ace-builds/src-min-noconflict/snippets/cirru.js",
  "ace-builds/src-min-noconflict/snippets/clojure.js",
  "ace-builds/src-min-noconflict/snippets/cobol.js",
  "ace-builds/src-min-noconflict/snippets/coffee.js",
  "ace-builds/src-min-noconflict/snippets/coldfusion.js",
  "ace-builds/src-min-noconflict/snippets/csharp.js",
  "ace-builds/src-min-noconflict/snippets/css.js",
  "ace-builds/src-min-noconflict/snippets/curly.js",
  "ace-builds/src-min-noconflict/snippets/d.js",
  "ace-builds/src-min-noconflict/snippets/dart.js",
  "ace-builds/src-min-noconflict/snippets/diff.js",
  "ace-builds/src-min-noconflict/snippets/django.js",
  "ace-builds/src-min-noconflict/snippets/dockerfile.js",
  "ace-builds/src-min-noconflict/snippets/dot.js",
  "ace-builds/src-min-noconflict/snippets/eiffel.js",
  "ace-builds/src-min-noconflict/snippets/ejs.js",
  "ace-builds/src-min-noconflict/snippets/elixir.js",
  "ace-builds/src-min-noconflict/snippets/elm.js",
  "ace-builds/src-min-noconflict/snippets/erlang.js",
  "ace-builds/src-min-noconflict/snippets/forth.js",
  "ace-builds/src-min-noconflict/snippets/ftl.js",
  "ace-builds/src-min-noconflict/snippets/gcode.js",
  "ace-builds/src-min-noconflict/snippets/gherkin.js",
  "ace-builds/src-min-noconflict/snippets/gitignore.js",
  "ace-builds/src-min-noconflict/snippets/glsl.js",
  "ace-builds/src-min-noconflict/snippets/golang.js",
  "ace-builds/src-min-noconflict/snippets/groovy.js",
  "ace-builds/src-min-noconflict/snippets/haml.js",
  "ace-builds/src-min-noconflict/snippets/handlebars.js",
  "ace-builds/src-min-noconflict/snippets/haskell.js",
  "ace-builds/src-min-noconflict/snippets/haxe.js",
  "ace-builds/src-min-noconflict/snippets/html.js",
  "ace-builds/src-min-noconflict/snippets/html_ruby.js",
  "ace-builds/src-min-noconflict/snippets/ini.js",
  "ace-builds/src-min-noconflict/snippets/io.js",
  "ace-builds/src-min-noconflict/snippets/jack.js",
  "ace-builds/src-min-noconflict/snippets/jade.js",
  "ace-builds/src-min-noconflict/snippets/java.js",
  "ace-builds/src-min-noconflict/snippets/javascript.js",
  "ace-builds/src-min-noconflict/snippets/json.js",
  "ace-builds/src-min-noconflict/snippets/jsoniq.js",
  "ace-builds/src-min-noconflict/snippets/jsp.js",
  "ace-builds/src-min-noconflict/snippets/jsx.js",
  "ace-builds/src-min-noconflict/snippets/julia.js",
  "ace-builds/src-min-noconflict/snippets/latex.js",
  "ace-builds/src-min-noconflict/snippets/less.js",
  "ace-builds/src-min-noconflict/snippets/liquid.js",
  "ace-builds/src-min-noconflict/snippets/lisp.js",
  "ace-builds/src-min-noconflict/snippets/livescript.js",
  "ace-builds/src-min-noconflict/snippets/logiql.js",
  "ace-builds/src-min-noconflict/snippets/lsl.js",
  "ace-builds/src-min-noconflict/snippets/lua.js",
  "ace-builds/src-min-noconflict/snippets/luapage.js",
  "ace-builds/src-min-noconflict/snippets/lucene.js",
  "ace-builds/src-min-noconflict/snippets/makefile.js",
  "ace-builds/src-min-noconflict/snippets/markdown.js",
  "ace-builds/src-min-noconflict/snippets/mask.js",
  "ace-builds/src-min-noconflict/snippets/matlab.js",
  "ace-builds/src-min-noconflict/snippets/mel.js",
  "ace-builds/src-min-noconflict/snippets/mushcode.js",
  "ace-builds/src-min-noconflict/snippets/mysql.js",
  "ace-builds/src-min-noconflict/snippets/nix.js",
  "ace-builds/src-min-noconflict/snippets/objectivec.js",
  "ace-builds/src-min-noconflict/snippets/ocaml.js",
  "ace-builds/src-min-noconflict/snippets/pascal.js",
  "ace-builds/src-min-noconflict/snippets/perl.js",
  "ace-builds/src-min-noconflict/snippets/pgsql.js",
  "ace-builds/src-min-noconflict/snippets/php.js",
  "ace-builds/src-min-noconflict/snippets/plain_text.js",
  "ace-builds/src-min-noconflict/snippets/powershell.js",
  "ace-builds/src-min-noconflict/snippets/praat.js",
  "ace-builds/src-min-noconflict/snippets/prolog.js",
  "ace-builds/src-min-noconflict/snippets/properties.js",
  "ace-builds/src-min-noconflict/snippets/protobuf.js",
  "ace-builds/src-min-noconflict/snippets/python.js",
  "ace-builds/src-min-noconflict/snippets/r.js",
  "ace-builds/src-min-noconflict/snippets/rdoc.js",
  "ace-builds/src-min-noconflict/snippets/rhtml.js",
  "ace-builds/src-min-noconflict/snippets/ruby.js",
  "ace-builds/src-min-noconflict/snippets/rust.js",
  "ace-builds/src-min-noconflict/snippets/sass.js",
  "ace-builds/src-min-noconflict/snippets/scad.js",
  "ace-builds/src-min-noconflict/snippets/scala.js",
  "ace-builds/src-min-noconflict/snippets/scheme.js",
  "ace-builds/src-min-noconflict/snippets/scss.js",
  "ace-builds/src-min-noconflict/snippets/sh.js",
  "ace-builds/src-min-noconflict/snippets/sjs.js",
  "ace-builds/src-min-noconflict/snippets/smarty.js",
  "ace-builds/src-min-noconflict/snippets/snippets.js",
  "ace-builds/src-min-noconflict/snippets/soy_template.js",
  "ace-builds/src-min-noconflict/snippets/space.js",
  "ace-builds/src-min-noconflict/snippets/sql.js",
  "ace-builds/src-min-noconflict/snippets/stylus.js",
  "ace-builds/src-min-noconflict/snippets/svg.js",
  "ace-builds/src-min-noconflict/snippets/tcl.js",
  "ace-builds/src-min-noconflict/snippets/tex.js",
  "ace-builds/src-min-noconflict/snippets/text.js",
  "ace-builds/src-min-noconflict/snippets/textile.js",
  "ace-builds/src-min-noconflict/snippets/toml.js",
  "ace-builds/src-min-noconflict/snippets/twig.js",
  "ace-builds/src-min-noconflict/snippets/typescript.js",
  "ace-builds/src-min-noconflict/snippets/vala.js",
  "ace-builds/src-min-noconflict/snippets/vbscript.js",
  "ace-builds/src-min-noconflict/snippets/velocity.js",
  "ace-builds/src-min-noconflict/snippets/verilog.js",
  "ace-builds/src-min-noconflict/snippets/vhdl.js",
  "ace-builds/src-min-noconflict/snippets/xml.js",
  "ace-builds/src-min-noconflict/snippets/xquery.js",
  "ace-builds/src-min-noconflict/snippets/yaml.js",
  "ace-builds/src-min-noconflict/theme-ambiance.js",
  "ace-builds/src-min-noconflict/theme-chaos.js",
  "ace-builds/src-min-noconflict/theme-chrome.js",
  "ace-builds/src-min-noconflict/theme-clouds.js",
  "ace-builds/src-min-noconflict/theme-clouds_midnight.js",
  "ace-builds/src-min-noconflict/theme-cobalt.js",
  "ace-builds/src-min-noconflict/theme-crimson_editor.js",
  "ace-builds/src-min-noconflict/theme-dawn.js",
  "ace-builds/src-min-noconflict/theme-dreamweaver.js",
  "ace-builds/src-min-noconflict/theme-eclipse.js",
  "ace-builds/src-min-noconflict/theme-github.js",
  "ace-builds/src-min-noconflict/theme-idle_fingers.js",
  "ace-builds/src-min-noconflict/theme-katzenmilch.js",
  "ace-builds/src-min-noconflict/theme-kr_theme.js",
  "ace-builds/src-min-noconflict/theme-kuroir.js",
  "ace-builds/src-min-noconflict/theme-merbivore.js",
  "ace-builds/src-min-noconflict/theme-merbivore_soft.js",
  "ace-builds/src-min-noconflict/theme-mono_industrial.js",
  "ace-builds/src-min-noconflict/theme-monokai.js",
  "ace-builds/src-min-noconflict/theme-pastel_on_dark.js",
  "ace-builds/src-min-noconflict/theme-solarized_dark.js",
  "ace-builds/src-min-noconflict/theme-solarized_light.js",
  "ace-builds/src-min-noconflict/theme-terminal.js",
  "ace-builds/src-min-noconflict/theme-textmate.js",
  "ace-builds/src-min-noconflict/theme-tomorrow.js",
  "ace-builds/src-min-noconflict/theme-tomorrow_night.js",
  "ace-builds/src-min-noconflict/theme-tomorrow_night_blue.js",
  "ace-builds/src-min-noconflict/theme-tomorrow_night_bright.js",
  "ace-builds/src-min-noconflict/theme-tomorrow_night_eighties.js",
  "ace-builds/src-min-noconflict/theme-twilight.js",
  "ace-builds/src-min-noconflict/theme-vibrant_ink.js",
  "ace-builds/src-min-noconflict/theme-xcode.js",
  "ace-builds/src-min-noconflict/worker-coffee.js",
  "ace-builds/src-min-noconflict/worker-css.js",
  "ace-builds/src-min-noconflict/worker-html.js",
  "ace-builds/src-min-noconflict/worker-javascript.js",
  "ace-builds/src-min-noconflict/worker-json.js",
  "ace-builds/src-min-noconflict/worker-lua.js",
  "ace-builds/src-min-noconflict/worker-php.js",
  "ace-builds/src-min-noconflict/worker-xquery.js"
]
