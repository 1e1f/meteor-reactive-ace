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

Template.ace.onCreated(function() {
  this.state = new ReactiveVar;
});

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
  }
});

Template.ace.onRendered(function() {
  var data = this.data || {}; //options set explicitly in html template
  var options = this.data.options || defaultOptions(this); //options set via javascript options variable

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

  // update text should it be changed from elsewhere
  this.autorun(function() {
    Collection = Mongo.Collection.get(data.collection);
    var doc = Collection.findOne(data._id)

    if (this.editor) {
      if (this.state.get() === 'script'){
        this.editor.setValue(doc[script]);
        this.editor.setOption({mode: "ace/mode/javascript"});
      }
      else if (this.state.get() === 'template'){
        this.editor.setValue(doc[template]);
        this.editor.setOption({mode: "ace/mode/html"});
      }
    }
  });

  //ace has no enable/disable method, so we create and
  //destroy based on the reactive variable enabled
  this.autorun(function() {
    var templateInstance = this.templateInstance();

    var newData = templateInstance.data;
    var newOptions = templateInstance.data.options || defaultOptions(templateInstance);

    if (newData.enabled !== false && !this.templateInstance().editor) { //how can I check if summernote is already enabled?
      this.templateInstance().editor = ace.edit("ace");
    } else {
      //element.destroy();
    }

    _.each(newOptions, function(category, key) {
      if (_.contains(['editor', 'renderer', 'mouse', 'session', 'extensions'], key)) {
        _.each(category, function(option, key) {
          templateInstance.editor.setOption(key, option);
        });
      }
    });

  })

  this.state.set('output');

});
