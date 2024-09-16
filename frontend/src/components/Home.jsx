import {Fragment, useEffect} from "react";
import Title from "./layouts/Title";
import { getProducts } from "../actions/productsActions";
import { useDispatch, useSelector } from "react-redux";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function Home(){
    const dispatch = useDispatch();
    const { loading, products } = useSelector((sate) => sate.productsState)
    console.log(products)
    useEffect(() =>{
        dispatch(getProducts)
    },[])

    return (
        <Fragment>
            <Title title={"All-Products"}/>
                <section id="products" className="mt-5">
                    <div className="container">
                    {products && products.map(product =>(
                    <div className="col-sm-12 col-md-6 col-lg-3 my-3">
                    <div className="card p-3 rounded">
                        <img className="card-img-top mx-auto" 
                        src={product.images[0].image} />
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title">{product.name}</h5>
                            <div className="ratings mt-auto">
                                <div className="rating-outer">
                                    <div className="rating-inner" style={{width: `${product.ratings/5 * 100}%`}}></div>
                                </div>
                                    <span className="no_of_reviews">
                                        ({product.noReviews} Reviews)
                                    </span>
                                </div>
                                <p className="card-text">${product.price}</p>
                                <a className="btn btn-warning" role="button">View Details</a>
                            </div>
                        </div>

                    </div>
            ))}
                    </div>
                </section>
        </Fragment>
    )
}

export default Home;