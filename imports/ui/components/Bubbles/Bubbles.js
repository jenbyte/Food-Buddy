import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Typography from '@material-ui/core/Typography';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { TagCategories } from '../../../api/tagCategories';
import { Tags } from '../../../api/tags';
import { Chip, Button } from '@material-ui/core';

class Bubbles extends React.Component {
  constructor(props) {
    super(props);
    let selectedTags = [];
    if (this.props.currentUser.profile && this.props.currentUser.profile.tags) {
      selectedTags = this.props.currentUser.profile.tags;
    }
    this.state = {
      selectedTags
    };
  }

  handleSelect = tag => {
    console.log(this.state.selectedTags);
    this.state.selectedTags.some(t => t === tag._id)
      ? this.setState(
          {
            selectedTags: this.state.selectedTags.filter(t => {
              return t !== tag._id;
            })
          },
          () => {
            console.log('removing tag', this.state.selectedTags);
            //'users.updateUserTagsByCategory'(tagids, categoryid)
            Meteor.call('users.updateUserTags', this.state.selectedTags);
          }
        )
      : this.setState(
          { selectedTags: [...this.state.selectedTags, tag._id] },
          () => {
            console.log('adding tag', this.state.selectedTags);
            Meteor.call('users.updateUserTags', this.state.selectedTags);
          }
        );
  };

  sortTagsBySelected(tags) {
    const sortedTags = [...tags];
    sortedTags.sort((tag1, tag2) => {
      const isTag1Selected = this.state.selectedTags.includes(tag1._id);
      const isTag2Selected = this.state.selectedTags.includes(tag2._id);
      if (isTag1Selected !== isTag2Selected) {
        return isTag1Selected ? -1 : 1;
      } else {
        if (tag1.title < tag2.title) return -1;
        else return 1;
      }
    });
    return sortedTags;
  }

  sortTagsAlphabet(tags) {
    const sortTags = [...tags];
    sortTags.sort((tag1, tag2) => {
      if (tag1.title < tag2.title) return -1;
      else return 1;
    });
    return sortTags;
  }

  render() {
    const { classes, categoryid } = this.props;
    console.log('CATEGORY ID IS', categoryid);
    // const tags = this.sortTagsBySelected(this.props.tags);
    const tags = this.sortTagsAlphabet(this.props.tags);

    return (
      <div className={classes.bubbleWrap}>
        {tags.map(tag => (
          <Chip
            variant={
              this.state.selectedTags.includes(tag._id) ? 'default' : 'outlined'
            }
            color={
              this.state.selectedTags.includes(tag._id) ? 'primary' : 'default'
            }
            key={tag._id}
            label={tag.title}
            className={
              this.state.selectedTags.includes(tag._id)
                ? classes.chipSelected
                : classes.chip
            }
            // className={classes.chip}
            onClick={() => this.handleSelect(tag)}
          />
        ))}
        {/* <Button
          onClick={() => {
            Meteor.call(
              'users.updateUserTagsByCategory',
              ['jBNakiDmZ3WRffLcP', 'QteTDKetbHLAbAifq'],
              'vjf8fR5EfP8Tejbj9'
            );
          }}
        >
          Clickme
        </Button> */}
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('tags');
  Meteor.subscribe('tagCategories');
  return {
    currentUser: Meteor.user(),
    tagCategories: TagCategories.find({}).fetch()
  };
})(withStyles(styles, { withTheme: true })(Bubbles));
