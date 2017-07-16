import Ember from 'ember';

const { computed, assert, A } = Ember;

export default Ember.Component.extend({
  init() {
    this._super();
    // Gather all footer actions
    let footerItems       = this.getWithDefault('footerItems', '');
    let footerActionItems = A();
    footerItems
      .split(',')
      .forEach((footerItemName, index) => {
        let footerActionName = `footerAction${index + 1}`;
        footerActionItems.push({ footerItemName, footerActionName });
//        this.actions[ footerActionName ] = () => {
//          this.debug(`Calling card ${footerActionName} (actionName: ${footerItemName}).`);
//          this.sendAction(footerItemName);
//          this.toggleProperty('displayCardContent');
//        };
      });

    this.set('footerActionItems', footerActionItems);
  },

  classNames:         'card',
  displayCardContent: false,
  footerItems:        '',
  footerActionItems:  A(),
  actions:            {
    footerAction1() { this.sendAction('footerAction1'); },
    footerAction2() { this.sendAction('footerAction2'); },
    footerAction3() { this.sendAction('footerAction3'); },
    footerAction4() { this.sendAction('footerAction4'); },
  }
});
