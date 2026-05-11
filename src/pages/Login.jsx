import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import '../assets/css/auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/profile');
    } catch {
      setError('Неверный email или пароль');
    }
  };

  return (
    <div className="auth">
      <h2 className='auth__title'>Вход</h2>
      <form onSubmit={handleSubmit} className='auth__form'>
        <input type="email" placeholder="Email"value={email} onChange={e => setEmail(e.target.value)} required className='auth__input' />
        <input type="password" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} required className='auth__input' />
        {error && <p>{error}</p>}
        <button type="submit" className='auth__button' >Войти</button>
        <p className='auth__text'>Нет аккаунта? <Link to="/register">Зарегистрироваться</Link></p>
      </form>
    </div>
  );
}