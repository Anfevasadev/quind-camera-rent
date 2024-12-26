import Hero from "../components/Hero";
import ProductCarousel from "../components/ProductCarousel";
import "../styles/pages/Home.css";

function Home() {
  return (
    <div className="home">
      <Hero />
      <div id="catalog" className="home__catalog">
        <h2 className="home__catalog-title">Nuestra colección</h2>
        <ProductCarousel title="Cámaras" items={cameras} type={"camera"} />
        <ProductCarousel title="Películas" items={films} type={"film"} />
      </div>
    </div>
  );
}

export default Home;
