import {Fragment, useEffect, useState} from "react";
import Title from "./layouts/Title";
import { getProducts } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Loader from "./layouts/loader";
import Product from "./product/product";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";

function Home(){
    const dispatch = useDispatch();
    const { loading, products, error, productsCount, resPerPage} = useSelector((state) => state.productsState);
    const [currentPage, setCurrentPage] = useState(1);
    
    const setCurrentPageNo = (pageNo) =>{
        setCurrentPage(pageNo)
    }

    useEffect(() =>{
        if(error){
            return toast.error(error)
        }// ,{position:toast.POSITION.BOTTOM_CENTER}
        dispatch(getProducts(null,null,null,null, currentPage))
    },[error, dispatch, currentPage])

    return (
        <Fragment>
            {loading ? <Loader/>: 
            <Fragment>
                <Title title={"All-Products"}/>
                    <section id="products" className="container mt-5">
                        <div className="row">
                        {products && products.map(product =>(
                        <Product col={3} key={product._id} product={product}/>
                        ))}
                        </div>  
                    </section>
                    {productsCount > 0 && productsCount > resPerPage ?
                    <div className="d-flex justify-content-center mt-5">
                           <Pagination 
                                activePage={currentPage}
                                onChange={setCurrentPageNo}
                                totalItemsCount={productsCount}
                                itemsCountPerPage={resPerPage}
                                nextPageText={'Next'}
                                firstPageText={'First'}
                                lastPageText={'Last'}
                                itemClass={'page-item'}
                                linkClass={'page-link'}
                           />     
                    </div> : null }
            </Fragment>
            }
        </Fragment>
    )
}

export default Home;