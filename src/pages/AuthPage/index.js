import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { InputGroup, FormControl, Button, Alert, Spinner } from 'react-bootstrap';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import styles from './styles';
import { signIn } from '../../store/actions/auth';
import { AUTH_SIGNIN } from '../../store/loadingTypes';

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
    errorMsg: '',
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
    try {
      await this.props.onSignIn(email.value, password.value);
    } catch (e) {
      this.setState({ errorMsg: e });
    }
  }
  render() {
    const { errorMsg } = this.state;
    const { isLoading } = this.props;
    return (
      <div style={styles.container}>
        <form style={styles.inputArea}>
          {errorMsg &&
            <Alert variant="danger">
              {errorMsg}
            </Alert>
          }
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
          <Button variant="primary" block type="submit" onClick={this.handleSubmitClick}>
            {!isLoading && 'Sign In'}
            {isLoading && <Spinner animation="border" role="status" size="sm" />}
          </Button>
        </form>
      </div>
    );
  }
}

AuthPage.propTypes = {
  onSignIn: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isLoading: Boolean(state.ui.isLoading[AUTH_SIGNIN]),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignIn: (email, password) => dispatch(signIn(email, password)),
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(AuthPage);
