import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
          error: null
        }

        componentDidMount () {
          this.reqInterceptor = axios.interceptors.request.use(req => {
              this.setState({error:null});
              return req;
          });
          this.resInterceptor = axios.interceptors.response.use(res => res, error => {
              this.setState({ error: error });
          });
        }

        // If you use a functional component (useEffect() Hook), you can write this code in the 'return' of the useEffect()
        componentWillUnmount () {
          // executes when a component isn't required anymore
          // eject() removes interceptors that aren't used anymore
          axios.interceptors.request.eject(this.reqInterceptor);
          axios.interceptors.request.eject(this.resInterceptor);
        }


        errorConfirmedHandler = () => {
          this.setState({ error: null });
        }

        render () {
            return (
                <Aux>
                    <Modal
                      show={this.state.error}
                      modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;
