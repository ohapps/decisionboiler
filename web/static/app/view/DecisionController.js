Ext.define('DecisionBoiler.view.DecisionController', {
   extend: 'Ext.app.ViewController',
   alias: 'controller.descision',
   selectedDecisionRecord: '',

   clickNewDecision: function(){
      var decisionForm = new DecisionBoiler.view.DecisionFormWindow();
      decisionForm.show();
   },

   onCancelNewDecision: function(){
      var window = this.lookupReference('editDecisionWindow');
      window.close();
   },

   onSaveNewDecision: function(){
      var formPanel = this.lookupReference('editDecisionForm');
      form = formPanel.getForm();
      if(form.isValid()){
         form.submit({
            url: '/api/decisions/',
            method: 'POST',
            scope: this,
            success: function(form, action) {
               Ext.Msg.alert('Success', 'The decision was updated successfully');
            },
            failure: function(form, action){
               if(action.result.id){
                  Ext.Msg.alert('Success', 'The decision was updated successfully');
                  var grid = this.lookupReference('activeDecisionGrid');
                  grid.getStore().reload();
                  var grid = this.lookupReference('completeDecisionGrid');
                  grid.getStore().reload();
                  this.onCancelNewDecision();
               }else{
                  Ext.Msg.alert('Failure', 'The decision could not be updated');
               }
            }
         });
      }else{
         Ext.MessageBox.alert('Error', 'Please enter the required fields');
      }
   },

   clickNewOption: function(){
      var optionWindow = new DecisionBoiler.view.OptionFormWindow();
      optionWindow.show();
   },

   onSaveNewOption: function(){
      var formPanel = this.lookupReference('newOptionForm');
      form = formPanel.getForm();
      if(form.isValid()){
         form.submit({
            url: '/api/option/',
            method: 'POST',
            params: { decision : this.selectedDecisionRecord.get('id') },
            scope: this,
            success: function(form, action) {
               Ext.Msg.alert('Success', 'The option was updated successfully');
            },
            failure: function(form, action){
               if(action.result.id){
                  Ext.Msg.alert('Success', 'The option was updated successfully');
                  var grid = this.lookupReference('decisionSummaryGrid');
                  grid.getStore().reload();
                  this.onCancelNewOption();
               }else{
                  Ext.Msg.alert('Failure', 'The option could not be updated');
               }
            }
         });
      }else{
         Ext.MessageBox.alert('Error', 'Please enter the required fields');
      }
   },

   onCancelNewOption: function(){
      var window = this.lookupReference('newOptionWindow');
      window.close();
   },

   onDecisionSelect: function(grid, record){

      // SHOW LOADING MESSAGE
      Ext.MessageBox.show({
         title: 'Please wait',
         msg: 'Loading decision...',
         progressText: 'Initializing...',
         width:300,
         progress:true,
         closable:false
      });

      this.selectedDecisionRecord = record;

      // UPDATE PANEL
      var panel = this.lookupReference('decisionPanel');
      panel.setConfig('title', 'Decision Summary: ' + record.get('description'));
      panel.removeAll();

      // CREATE DEFAULT GRID
      var summaryGrid = new DecisionBoiler.view.DecisionSummaryGrid();
      var columns = [];
      columns.push({text: 'ID',  dataIndex: 'id', hidden: true});
      columns.push({text: 'Description',  dataIndex: 'description', editor: 'textfield'});

      // UPDATE GRID
      Ext.Ajax.request({
         url: '/api/criteria/',
         method: 'GET',
         params: {
            decisionId: record.get('id')
         },
         scope: this,
         success: function(response){
            var jsonResponse = Ext.JSON.decode(response.responseText);
            jsonResponse.results.forEach(function(result){
               columns.push({text: result.description,  dataIndex: 'criteria_' + result.id, editor: 'textfield'});
            });
            summaryGrid.reconfigure( null, columns );
            panel.add(summaryGrid);
            summaryGrid.getStore().load({
               url: '/api/decision-summary/' + record.get('id')
            });
            Ext.MessageBox.hide();
         }
      });

      summaryGrid.on('edit', this.onDecisionSummaryUpdate );
   },

   onDecisionSummaryUpdate: function(editor, e){
      Ext.MessageBox.show({
         title: 'Please wait',
         msg: 'Saving decision...',
         progressText: 'Saving...',
         width:300,
         progress:true,
         closable:false
      });
      Ext.Ajax.request({
         url: '/api/update-decision-option',
         method: 'POST',
         params: e.record.getData(),
         scope: this,
         success: function(response){
            e.record.commit();
            Ext.MessageBox.hide();
         }
      });
   }
});
