Ext.define('DecisionBoiler.view.CompleteDecisionsGrid', {
   extend: 'Ext.grid.Panel',
   requires: [
      'DecisionBoiler.store.CompleteDecisions'
   ],
   alias: 'widget.completedecisiongrid',
   title: 'Complete',
   store: 'CompleteDecisions',
   frame: true,
   forceFit: true,
   columns: [
      { text: 'Description',  dataIndex: 'description' }
   ],
   listeners: {
      rowclick: 'onDecisionSelect'
   }
});
