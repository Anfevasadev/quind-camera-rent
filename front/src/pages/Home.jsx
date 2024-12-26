import Hero from "../components/Hero";
import ProductCarousel from "../components/ProductCarousel";
import "../styles/pages/Home.css";

function Home() {
  const cameras = [
    { id: 1, name: "Canon AE-1", brand: "Canon", available: true },
    { id: 2, name: "Pentax K1000", brand: "Pentax", available: true },
    { id: 3, name: "Nikon FM2", brand: "Nikon", available: false },
  ];

  const films = [
    { id: 1, name: "Portra 400", brand: "Kodak", available: true },
    { id: 2, name: "HP5 Plus", brand: "Ilford", available: true },
    { id: 3, name: "Gold 200", brand: "Kodak", available: false },
  ];
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
