import {Link} from "react-router-dom"

export default function Product({product, col}){
    return (

        <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
                        <div className="card pt-2 rounded">
                            <img className="card-img-top mx-auto" 
                            src={product.images[0].image} />
                            <div className="card-body p-2 d-flex flex-column">
                                <h5 className="card-title"> <Link to={`/product/${product._id}`}>{product.name}</Link> </h5>
                                <div className="ratings mt-auto">
                                    <div className="rating-outer">
                                        <div className="rating-inner" style={{width: `${product.ratings/5 * 100}%`}}>  </div>
                                    </div>
                                    <div>
                                    <span className="no_of_reviews">
                                            ({product.numOfReviews} Reviews)
                                        </span>
                                    </div>
                                    </div>
                                    <p className="card-text">${product.price}</p>
                                    <Link to={`/product/${product._id}`} id='view_btn' className="btn btn-warning" role="button">View Details</Link >
                                </div>
                            </div>

                        </div>
    )
}