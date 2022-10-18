import { gql } from '@apollo/client';
import { graphql } from 'react-apollo';
import React from 'react';
import { Link, hashHistory } from 'react-router';
import { getAllSongs } from '../queries/fetchSongs';

class CreateSong extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: '' };
  }

  onSubmit(event) {
    console.log(typeof this.state.title);
    event.preventDefault();
    this.props
      .mutate({
        variables: {
          title: this.state.title,
        },
        refetchQueries: [{ query: getAllSongs }],
      })
      .then(() => hashHistory.push('/'));
  }
  render() {
    return (
      <div>
        <Link to='/'>Back</Link>
        <h3>Create a new song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Song title:</label>
          <input
            type='text'
            onChange={(event) => this.setState({ title: event.target.value })}
            value={this.state.title}
          />
        </form>
      </div>
    );
  }
}

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      title
    }
  }
`;

export default graphql(mutation)(CreateSong);
