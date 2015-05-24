Ext.define('DecisionBoiler.view.ActiveDecisionsGrid', {
   extend: 'Ext.grid.Panel',
   requires: [
      'DecisionBoiler.store.ActiveDecisions'
   ],
   alias: 'widget.activedecisiongrid',
   title: 'Active',
   store: 'ActiveDecisions',   
   frame: true,
   forceFit: true,
   columns: [
      { text: 'Description',  dataIndex: 'description' }
   ],
   listeners: {
      rowclick: 'onDecisionSelect'
   }
});
