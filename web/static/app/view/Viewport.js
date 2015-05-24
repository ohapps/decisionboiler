Ext.define('DecisionBoiler.view.Viewport', {
   extend: 'Ext.container.Viewport',
   layout: 'border',
   requires: [
      'DecisionBoiler.view.ActiveDecisionsGrid',
      'DecisionBoiler.view.CompleteDecisionsGrid',
      'DecisionBoiler.view.DecisionSummaryGrid',
      'DecisionBoiler.view.DecisionController',
      'DecisionBoiler.view.DecisionFormWindow',
      'DecisionBoiler.view.OptionFormWindow'
   ],
   controller: 'descision',
   items: [
      {
         region: 'north',
         height: 40,
         contentEl: 'header'
      },{
         xtype: 'tabpanel',
         title: 'Decisions',
         plain: true,
         frame: true,
         collapsible: true,
         region: 'west',
         width: 250,
         margin: '5 5 5 10',
         tbar: [
            {
               xtype: 'button',
               text: 'New Decision',
               handler: 'clickNewDecision'
            }
         ],
         items: [
            {
               xtype: 'activedecisiongrid',
               reference: 'activeDecisionGrid'
            },{
               xtype: 'completedecisiongrid',
               reference: 'completeDecisionGrid'
            }
         ]
      },{
         title: 'please select a decision to view summary',
         reference: 'decisionPanel',
         frame: true,
         collapsible: false,
         layout: 'fit',
         region: 'center',
         margin: '5 10 5 5'
      },{
         region: 'south',
         height: 40,
         contentEl: 'footer'
      }
   ]
});
