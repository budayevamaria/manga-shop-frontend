import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Hero from '../components/Hero';
import MangaCard from '../components/MangaCard';

import { fetchManga } from '../services/mangaApi';

import '../assets/css/manga.css';

export default function Home() {
  const [mangaList, setMangaList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchManga().then(data => {
      setMangaList(data.slice(0, 8));
      setLoading(false);
    });
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone) {
      setError('Заполните все поля');
      setMessage('');
      return;
    }

    if (!form.email.includes('@')) {
      setError('Введите корректный email');
      setMessage('');
      return;
    }

    setError('');
    setMessage(' Заявка отправлена! Мы свяжемся с вами');

    setForm({
      name: '',
      email: '',
      phone: ''
    });

    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  if (loading) return <div className="container">Загрузка...</div>;

  return (
    <div className="container">
      <Hero />

      <div className="promo-banner">
        <h2>Скидки на популярную мангу</h2>
        <p>Собери свою коллекцию любимых тайтлов уже сегодня</p>
      </div>

      <h2 className="home__heading">Популярная манга</h2>

      <div className="manga-grid">
        {mangaList.map(manga => (
          <MangaCard key={manga._id} manga={manga} />
        ))}
      </div>

      <div className="catalog-button">
        <Link to="/catalog">Смотреть весь каталог →</Link>
      </div>

      <div className="reviews-section">
        <h2 className='review__title'>Отзывы наших читателей</h2>

        <div className="reviews-grid">
          <div className="review-card">
            <h3>⭐️⭐️⭐️⭐️⭐️</h3>
            <p>Очень удобный сайт и классная подборка манги. Теперь читаю только здесь!</p>
            <span>— Алина</span>
          </div>

          <div className="review-card">
            <h3>⭐️⭐️⭐️⭐️</h3>
            <p>Тёмная тема и красивый дизайн — просто топ.</p>
            <span>— Дамир</span>
          </div>

          <div className="review-card">
            <h3>⭐️⭐️⭐️⭐️⭐️</h3>
            <p>Нашёл здесь свою любимую мангу буквально за минуту.</p>
            <span>— Артём</span>
          </div>
        </div>
      </div>

      <div className="delivery-section">
        <h2>Доставка по всему Казахстану</h2>

        <div className="delivery-grid">
          <div className="delivery-card">
            <h3>Быстрая доставка</h3>
            <p>Отправляем заказы в течение 24 часов после оформления.</p>
          </div>

          <div className="delivery-card">
            <h3>Надёжная упаковка</h3>
            <p>Каждая манга аккуратно упаковывается для защиты при доставке.</p>
          </div>

          <div className="delivery-card">
            <h3>Удобная оплата</h3>
            <p>Оплачивайте картой онлайн быстро и безопасно.</p>
          </div>
        </div>
      </div>

      <div className="contact-section">
        <h2>Оставьте заявку</h2>
        <p>Мы свяжемся с вами</p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Ваше имя"
            value={form.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Номер телефона"
            value={form.phone}
            onChange={handleChange}
          />

          <button type="submit" className='contact-button'>Отправить</button>

          {error && <p className="error-msg">{error}</p>}
          {message && <p className="success-msg">{message}</p>}
        </form>
      </div>
    </div>
  );
}
