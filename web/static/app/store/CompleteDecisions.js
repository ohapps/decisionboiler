Ext.define('DecisionBoiler.store.CompleteDecisions', {
   extend: 'Ext.data.Store',
   requires: 'DecisionBoiler.model.Decision',
   model: 'DecisionBoiler.model.Decision',
   proxy: {
      type: 'ajax',
      url: '/api/decisions/?complete=1',
      reader: {
         type: 'json',
         rootProperty: 'results'
      }
   },
   autoLoad: true
});
