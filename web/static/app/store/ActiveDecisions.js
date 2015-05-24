Ext.define('DecisionBoiler.store.ActiveDecisions', {
   extend: 'Ext.data.Store',
   requires: 'DecisionBoiler.model.Decision',
   model: 'DecisionBoiler.model.Decision',
   proxy: {
      type: 'ajax',
      url: '/api/decisions/?complete=0',
      reader: {
         type: 'json',
         rootProperty: 'results'
      }
   },
   autoLoad: true
});
