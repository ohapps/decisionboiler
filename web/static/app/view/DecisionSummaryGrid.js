Ext.define('DecisionBoiler.view.DecisionSummaryGrid', {
   extend: 'Ext.grid.Panel',
   requires: [
      'DecisionBoiler.store.DecisionSummary'
   ],
   reference: 'decisionSummaryGrid',
   alias: 'widget.decisionsummarygrid',
   store: 'DecisionSummary',
   forceFit: true,

   columns: [
      //{ text: 'Description',  dataIndex: 'description' }
   ],
   listeners: {
      //rowclick: 'onDecisionSelect'
   },
   /*
   plugins: {
      ptype: 'cellediting',
      clicksToEdit: 1
   },
   */

   plugins: [
      Ext.create('Ext.grid.plugin.RowEditing', {
         clicksToEdit: 1
      })
   ],

   tbar: [
      {
         xtype: 'button',
         text: 'New Option',
         handler: 'clickNewOption'
      },
      '-',
      {
         xtype: 'button',
         text: 'New Criteria',
         handler: 'clickNewCriteria'
      }
   ]
});
