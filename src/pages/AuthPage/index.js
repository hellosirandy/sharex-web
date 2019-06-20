import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import styles from './styles';
import { signIn } from '../../store/actions/auth';

class AuthPage extends React.PureComponent {
  state = {
    controls: {
      email: {
        value: '',
      },
      password: {
        value: '',
      },
    },
  }
  handleInputChange = key => ({ target: { value } }) => {
    this.setState(prevState => ({
      ...prevState,
      controls: {
        ...prevState.controls,
        [key]: {
          value,
        },
      },
    }));
  }
  handleSubmitClick = async (event) => {
    event.preventDefault();
    const { controls: { email, password } } = this.state;
    console.log(email, password);
    this.props.onSignIn(email.value, password.value);
    // try {
    //   await this.props.onSignIn(email.value, password.value);
    //   this.props.navigation.navigate('AppStack');
    // } catch (e) {
    //   this.setState({ errorMsg: e });
    // }
  }
  render() {
    return (
      <div style={styles.container}>
        <form style={styles.inputArea}>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text><EmailIcon /></InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Email"
              onChange={this.handleInputChange('email')}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text><LockIcon /></InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Password"
              type="password"
              onChange={this.handleInputChange('password')}
            />
          </InputGroup>
          <Button variant="primary" block type="submit" onClick={this.handleSubmitClick}>Primary</Button>
        </form>
      </div>
    );
  }
}

AuthPage.propTypes = {
  onSignIn: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignIn: (email, password) => dispatch(signIn(email, password)),
  };
};

export default compose(connect(null, mapDispatchToProps))(AuthPage);
