const styles = theme => ({
  container: {
    width: '100%'
  },
  topMatchesHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 20
  },
  title: {
    fontSize: '1.2rem',
    marginRight: 10
    // textAlign: 'center'
  },
  tagTitle: {
    fontSize: '1.3rem',
    fontWeight: 550,
    letterSpacing: 1.1
  },
  matches: {
    marginTop: '20px',
    height: '100%'
  },
  matchesLabel: {
    color: '#696969',
    fontSize: 10,
    fontWeight: 400,
    marginLeft: 8,
    marginBottom: '-1px'
  },
  flexMatches: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  user: {
    marginTop: 3,
    marginRight: 5
  },
  button: {
    color: 'white',
    fontWeight: 400,
    margin: '0.5rem 0'
    // textTransform: 'capitalize'
  }
});

export default styles;
