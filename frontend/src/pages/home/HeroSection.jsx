import card1 from '../../assets/card-1.png';
import card2 from '../../assets/card-2.png';
import card3 from '../../assets/card-3.png';
const HeroSection = () => {
  const heroCards = [
    {id: 1, trend: '2024 Trend', title: 'Women Shirt', image: card1},
    {id: 2, trend: '2024 Trend', title: 'Women Dress', image: card2},
    {id: 3, trend: '2024 Trend', title: 'Women Causals', image: card3},
  ];
  return (
    <section className='hero__container mt-4 sm:mt-8'>
      {
        heroCards.map((card) => (
          <div key={card.id} className='hero__card'>
            <img src={card.image} alt="" />
            <div className='hero__content'>
              <p>{card.trend}</p>
              <h4>{card.title}</h4>
              <a href="#">Discover More</a>
            </div>
          </div>
        ))
      }
    </section>
  )
}
export default HeroSection