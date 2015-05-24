Ext.application({
   name   : 'DecisionBoiler',
   autoCreateViewport: true,
   appFolder: '/static/app',
   models: ['Decision','DecisionSummary'],
   stores: ['ActiveDecisions','CompleteDecisions','DecisionSummary'],
   launch : function() {

   }
});
