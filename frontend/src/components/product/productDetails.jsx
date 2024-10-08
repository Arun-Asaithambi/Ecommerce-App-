import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../actions/productActions";
import { useParams } from "react-router-dom";
import Loader from "../layouts/loader";
import { Carousel } from "react-bootstrap";
import Title from "../layouts/Title";


export default function ProductDetails(){
    const { loading, product} = useSelector((state) => state.productState)
    const dispatch = useDispatch();
    const { id } = useParams()
    useEffect(()=>{
        dispatch(getProduct(id))
    }, [])
    return ( 
        <Fragment>
            {loading ? <Loader/> :
            <Fragment>
                <Title title={product.name}/>
                <div className="row f-flex justify-content-around">
                    <div className="col-12 col-lg-5 img-fluid" id="product_image">
                        <Carousel pause="hover">
                            {product.images && product.images.map(image =>
                            <Carousel.Item key={image._id}>
                            <img className="d-block w-100" src={image.image} alt={product.name} height="500" width="500"/>
                            </Carousel.Item>
                            )}
                        </Carousel>
                    </div>  
                    <div className="col-12 col-lg-5 mt-5" >
                        <h3>{product.name}</h3>
                        <p id="product_id"> Product #{product._id}</p>
                        <hr/>
                        <h6>Ratings:</h6>
                        <div className="rating-outer">
                            <div className="rating-inner" style={{width: `${product.ratings/5 * 100}%`}}></div>
                        </div>
                        <span id="no_of_reviews">{product.numOfReviews} Reviews</span>
                        <hr/>
                        <p id="product_price">${product.price}</p>
                        <div className="stockCount d-inline">
                            <span className="btn btn-danger minus m-1">-</span>

                            <input type="number" className="form-control count d-inline " value='1' readOnly />

                            <span className="btn btn-primary plus m-1">+</span>
                        </div>

                        <button type="button" id="cart_btn" className="btn btn-primary m-1">Add to Cart</button>

                        <hr/>

                        <p>Status: <span className={product.stock > 0 ? "greenColor" : "redColor"} id="stock_status">{product.stock > 0 ? "In Stock" : "Out of Stock"}</span> </p>

                        <hr/>

                        <h4 className="mt-2">Description</h4>
                        <p>{product.description}</p>
                        <hr/>
                        <p id="product_seller mb-3"> Sold by : <strong>{product.seller}</strong></p>
                        <button id="review_btn" type="button" className="btn btn-primary mt-4">Submit your review</button>
                    </div>
                </div>
            </Fragment>
            }
        </Fragment>
        
    )
}