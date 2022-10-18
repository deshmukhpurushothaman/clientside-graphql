import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { addLyricToSong, getSingleSong } from '../queries/fetchSongs';

class CreateLyric extends Component {
  constructor(props) {
    super(props);
    this.state = { content: '' };
  }

  onSubmit(e) {
    e.preventDefault();
    this.props
      .mutate({
        variables: {
          content: this.state.content,
          songId: this.props.songId,
        },
      })
      .then(() => this.setState({ content: '' }));
  }
  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <label>Add Lyric</label>
        <input
          type='text'
          value={this.state.content}
          onChange={(e) => this.setState({ content: e.target.value })}
        />
      </form>
    );
  }
}

export default graphql(addLyricToSong)(CreateLyric);
