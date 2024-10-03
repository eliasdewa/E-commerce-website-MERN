import { Link } from 'react-router-dom';
import category1 from '../../assets/category-1.jpg';
import category2 from '../../assets/category-2.jpg';
import category3 from '../../assets/category-3.jpg';
import category4 from '../../assets/category-4.jpg';
const Category = () => {
  const categories = [
    { name: 'Accessories', path: 'accessories', image: category1},
    { name: 'Dress', path: 'dress', image: category2 },
    { name: 'Jewellers', path: 'jewellers', image: category3 },
    { name: 'Cosmetics', path: 'cosmetics', image: category4 },
    // Add more categories as needed...
  ]
  return (
    <section className='category__container mt-4 sm:mt-8'>
      <h2 className="section__header">Popular Categories</h2>
      <p className="section__subheader">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
      <div className='categories__grid'>
        {
          categories.map((category) => (
            <div key={category.path}>
              <Link to={`/categories/${category.path}`} className='categories__card'>
                <img src={category.image} alt={category.name} />
                <h4>{category.name}</h4>
              </Link>
            </div>
          ))
        }
      </div>
    </section>
  )
}
export default Category