import Ember from 'ember';
import moment from 'moment';

export function momentDesc(a, b) {
  return moment.compare(Ember.get(b, 'timestamp'), Ember.get(a, 'timestamp'));
}

export function momentAsc(a, b) {
  return moment.compare(Ember.get(a, 'timestamp'), Ember.get(b, 'timestamp'));
}
