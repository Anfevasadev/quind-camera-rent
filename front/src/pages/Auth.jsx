import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import '../styles/pages/Auth.css';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-tabs">
            <button 
              className={`auth-tab ${isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(true)}
            >
              Iniciar sesión
            </button>
            <button 
              className={`auth-tab ${!isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(false)}
            >
              Crear cuenta
            </button>
          </div>
          {isLogin ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    );
};

export default Auth;