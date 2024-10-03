import dealsImg from '../../assets/deals.png'
const DealSection = () => {
  return (
    <section className="deals__container mt-4 sm:mt-8">
      <div className="deals__image">
        <img src={dealsImg} alt="deals image" />
      </div>
      <div className="deals__content">
        <h5>Exclusive Deals: Get Up To 20% Discount</h5>
        <p>Check out our latest deals.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias ab debitis sunt. Aspernatur placeat iusto esse molestiae necessitatibus culpa. Vel.</p>
        <div className='deals__countdown flex-wrap'>
          <div className='deals__countdown__card'>
            <h4>14</h4>
            <p>Days</p>
          </div>
          <div className='deals__countdown__card'>
            <h4>20</h4>
            <p>Hrs</p>
          </div>
          <div className='deals__countdown__card'>
            <h4>15</h4>
            <p>Mins</p>
          </div>
          <div className='deals__countdown__card'>
            <h4>05</h4>
            <p>Secs</p>
          </div>
        </div>
      </div>
    </section>
  )
}
export default DealSection