import React, { Component } from 'react';

class AuthForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            profileImageUrl: ''
        };
    }

    handleChange = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const authType = this.props.signUp ? 'signup' : 'signin';
        this.props.onAuth(authType, this.state).then(() => {
            this.props.history.push('/');
        })
        .catch(() => {
            return;
        });
    }

    render() {

        const { email, username, password, profileImageUrl } = this.state;
        const { heading, buttonText, signUp, errors, history, removeError } = this.props;

        history.listen(() => {
            removeError();
        });

        return (
            <div className='row justify-content-md-center text-center'>
                <div className='col-md-6'>
                    <form onSubmit={this.handleSubmit}>
                        <h2>{heading}</h2>
                        {errors.message && <div className='alert alert-danger'>{errors.message}</div>}
                        <label htmlFor='email'>Email:</label>
                        <input 
                            className='form-control'
                            id='email'
                            name='email'
                            type='text' 
                            value={email} 
                            onChange={this.handleChange} 
                        />
                        <label htmlFor='password'>Password:</label>
                        <input 
                            className='form-control'
                            id='password'
                            name='password'
                            type='password' 
                            value={password} 
                            onChange={this.handleChange} 
                        />
                        {signUp && (
                            <div>
                                <label>Username:</label>
                                <input 
                                    className='form-control'
                                    name='username'
                                    id='username'
                                    value={username}
                                    type='text'
                                    onChange={this.handleChange}
                                />
                                <label>profileImageUrl</label>
                                <input
                                    className='form-control'
                                    name='profileImageUrl'
                                    id='image-url'
                                    type='text'
                                    value={profileImageUrl} 
                                    onChange={this.handleChange}
                                />
                            </div>
                        )}
                        <button type="submit" className='btn btn-primary btn-block btn-lg'>
                        Sign me up!
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default AuthForm;