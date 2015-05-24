Ext.define('DecisionBoiler.view.OptionFormWindow', {
   extend: 'Ext.window.Window',
   reference: 'newOptionWindow',
   title: 'New Option',
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
      reference: 'newOptionForm',
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
            xtype: 'hiddenfield',
            name: 'id',
            value: ''
         }
      ],
      buttons: [
      {
         text: 'Cancel',
         handler: 'onCancelNewOption'
      },{
         text: 'Save',
         handler: 'onSaveNewOption'
      }
      ]
   }
   ]
});
