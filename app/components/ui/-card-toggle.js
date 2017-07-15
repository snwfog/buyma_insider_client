import Ember from 'ember';

const { computed, assert, A } = Ember;

export default Ember.Component.extend({
  init() {
    this._super();
    this.debug('initiating ui/-card-toggle component');
    // Gather all actionNames
    // Support max up to five items
    let actionItems = A();
    Object.keys(this)
      .filter((item) => /footerAction(1|2|3|4|5)/.test(item))
      .forEach((actionItemName) => {
        let actionName = this[ actionItemName ];
        let actionFn   = this.attrs[ actionName ];
        assert(`Action ${actionItemName}:${actionName} must have an action function.`, !!actionFn);

        actionItems.push({ actionItemName, actionName, actionFn });
        this.actions[ actionItemName ] = () => {
          this.debug(`Calling card ${actionItemName} (actionName: ${actionName}).`);
          actionFn();
          this.toggleProperty('displayCardContent');
        }
      });

    this.set('actionItems', actionItems);
  },

  classNames:         'card',
  displayCardContent: false,
  actionItems:        Ember.A(),
  hasActionItems:     computed.empty('actionItems'),
  actions:            {}
});
