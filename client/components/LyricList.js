import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { likeLyric } from '../queries/fetchSongs';

class LyricList extends Component {
  onLike(id, likes) {
    console.log(id);
    this.props.mutate({
      variables: { id },
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          id: id,
          __typename: 'LyticLike',
          likes: likes + 1,
        },
      },
    });
  }
  renderLyrics() {
    return this.props.lyrics.map((lyric) => {
      return (
        <li key={lyric.id} className='collection-item'>
          {lyric.content}
          <div className='vote-box'>
            <i
              className='material-icons'
              onClick={() => this.onLike(lyric.id, lyric.likes)}
            >
              thumb_up
            </i>
            {lyric.likes}
          </div>
        </li>
      );
    });
  }
  render() {
    return <ul className='collection'>{this.renderLyrics()}</ul>;
  }
}

export default graphql(likeLyric)(LyricList);
