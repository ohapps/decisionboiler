Ext.define('DecisionBoiler.store.DecisionSummary', {
   extend: 'Ext.data.Store',
   requires: 'DecisionBoiler.model.DecisionSummary',
   model: 'DecisionBoiler.model.DecisionSummary',
   proxy: {
      type: 'ajax',
      reader: {
         type: 'json',
         rootProperty: 'results'
      }
   },
   autoLoad: false
});
