import Hero from '../components/Hero';
import '../styles/pages/Home.css';

function Home() {
  return (
    <div className="home">
      <Hero />
      <div id="catalog" className="home__catalog">
        <h2 className="home__catalog-title">Nuestra colección</h2>
      </div>
    </div>
  );
}

export default Home;
