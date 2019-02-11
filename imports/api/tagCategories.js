import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
export const TagCategories = new Mongo.Collection('tagCategories');

/**
 * Each document in TagCategories must have:
 * _id,
 * title (category title)
 */
// TODO do we need separate TagCategories collection?
export const TagCategoriesSchema = new SimpleSchema({
  _id: { type: SimpleSchema.RegEx.Id },
  title: { type: String }
});
TagCategories.attachSchema(TagCategoriesSchema);

if (Meteor.isServer) {
  Meteor.publish('tagCategories', function tagCategoriesPublication() {
    if (!this.userId) {
      throw new Meteor.Error(
        'tagCategories.publish.not-authorized',
        'You are not logged in.'
      );
    }
    return TagCategories.find({});
  });
}
