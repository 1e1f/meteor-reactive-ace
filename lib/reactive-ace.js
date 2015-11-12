Ace = {};

// https://github.com/ajaxorg/ace/wiki/Configuring-Ace
var defaultOptions = function(context) {
  return {
    editor: { // editor options
      selectionStyle: "text",
      cursorStyle: "ace",
      mergeUndoDeltas: true,
    },
    renderer: { // renderer options
      theme: "ace/theme/textmate"
    },
    mouse: { // mouse options
    },
    session: { //session options
      firstLineNumber: 1,
      tabSize: 2,
      mode: "ace/mode/javascript"
    },
    extensions: { // extensions
    }
  }
};

// editor.setOption will also modify options of editor.session, editor.renderer and editor.$mouseHandle

Template.ace.helpers({
  content: function() {
    if (_.isEmpty(this)) return '</br>';
    var collection = this.collection || this.options.collection;
    var Collection = Mongo.Collection.get(collection);
    var field = this.field || this.options.field;
    var fields = {};
    fields[field] = 1;
    var _id = this._id || this.options._id;
    return Collection.findOne(_id, {
      field: fields
    })[field] || '</br>';
  },
  aceId: function() {
    //console.log('div id', Template.instance().data.aceId);
    return Template.instance().aceId;
  }
});

Template.ace.onCreated(function() {
  this.aceId = Random.id(6);
  this.state = new ReactiveVar('inactive');
});

Template.ace.onRendered(function() {
  var data = this.data || {}; //options set explicitly in html template
  var options = this.data.options || defaultOptions(this); //options set via javascript options variable

  // this.data.state = new ReactiveVar;

  Object.keys(data).forEach(function(key) { //merge with priority to data
    if (key == 'options') return;
    options[key] = data[key];
  });
  data = {};
  ['collection', 'field', '_id', 'enabled'].forEach(function(key) {
    data[key] = options[key]; //data for meteor update
    delete options[key]; //leaves only the options to pass to summernote
  });

  var save = function(event) {
    if (data.updateMethod) {
      Meteor.call(data.updateMethod, data._id, text, callback);
    } else {
      var updateDoc = {
        $set: {}
      };
      updateDoc.$set[data.field] = text;
      Collection = Mongo.Collection.get(data.collection);
      Collection.update(data._id, updateDoc, callback);
    }
  }

  // //  update text should it be changed from elsewhere
  // this.autorun(function() {
  //   Collection = Mongo.Collection.get(data.collection);
  //   var doc = Collection.findOne(data._id)
  //
  //   var templateInstance = this.templateInstance();
  //
  //   if (this.editor) {
  //     if (this.state.get() === 'script'){
  //       this.editor.setValue(doc[script]);
  //       this.editor.setOption({mode: "ace/mode/javascript"});
  //     }
  //     else if (this.state.get() === 'template'){
  //       this.editor.setValue(doc[template]);
  //       this.editor.setOption({mode: "ace/mode/html"});
  //     }
  //   }
  // });

  this.autorun(_.bind(function() {
    // we assume that the data context (this.data) is the slider doc itself
    // this line of code makes our computation depend on changes done to
    // the Slides collection
    var templateInstance = this;
    var aceId = templateInstance.aceId;
    if (!aceId) {
      console.log('no id yet? : ', templateInstance);
      return;
    }
    var state = templateInstance.state.get();
    // we wait until the #each block invalidation has finished inserting items
    // in the DOM
    Deps.afterFlush(function() {
      // here it is safe to initialize your jQuery plugin because DOM is ready
      if (state == 'inactive') {
        templateInstance.editor = ace.edit(aceId);
        //$('#' + aceId).trigger('resize');
        //console.log('ace edit : ', templateInstance.aceId);
        if (templateInstance.editor) {
          templateInstance.state.set('loaded');
        }
      } else if (state == 'loaded') {
        var editor_div = document.getElementById(aceId);
        var doc = templateInstance.editor.getSession().getDocument()
      }

    });
  }, this));

});


// editor.session.$worker.call("changeOptions", [{
//    globals: {foo: false, bar: false...},
//    undef: true, // enable warnings on undefined variables
//    // other jshint options go here check jshint site for more info
// }]);
