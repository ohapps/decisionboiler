Ext.define('DecisionBoiler.view.DecisionFormWindow', {
   extend: 'Ext.window.Window',
   reference: 'editDecisionWindow',
   title: 'Edit Decision',
   width: 400,
   minWidth: 300,
   layout: 'fit',
   resizable: true,
   modal: true,
   defaultFocus: 'description',
   closeAction: 'destroy',
   items: [
      {
         xtype: 'form',
         reference: 'editDecisionForm',
         layout: {
            type: 'vbox',
            align: 'stretch'
         },
         border: false,
         bodyPadding: 10,
         fieldDefaults: {
            msgTarget: 'side',
            labelWidth: 100,
            labelStyle: 'font-weight:bold'
         },
         items: [
            {
               xtype: 'textfield',
               fieldLabel: 'Description',
               id: 'description',
               name: 'description',
               allowBlank: false
            },{
               xtype: 'combobox',
               fieldLabel: 'Complete',
               name: 'complete',
               store: [['1','yes'],['0','no']],
               value: '0',
               typeAhead: true,
               queryMode: 'local'
            },{
               xtype: 'hiddenfield',
               name: 'id',
               value: ''
            }
         ],
         buttons: [
            {
               text: 'Cancel',
               handler: 'onCancelNewDecision'
            },{
               text: 'Save',
               handler: 'onSaveNewDecision'
            }
         ]
      }
   ]
});
