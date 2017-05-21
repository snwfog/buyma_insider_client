import Ember from 'ember';
import DS from 'ember-data';
import config from '../config/environment';

var adapterProp = {};
if (config.environment === 'development') {
  adapterProp.host = config.APP.SERVER.endpoint;
}

export default DS.JSONAPIAdapter.extend(adapterProp);
