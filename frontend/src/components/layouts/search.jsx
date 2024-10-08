import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import {useLocation, useNavigate} from 'react-router-dom';

export default function Search(){
    const Navigator = useNavigate();
    const location = useLocation()
    const [keyword, setKeyword] = useState('');


    const searchHandler = (e) =>{
        e.preventDefault();
        Navigator(`/search/${keyword}`)
    }

    const clearKeyword = () =>{
        setKeyword('');
    }

    useEffect(() =>{
        if(location.pathname == "/"){
            clearKeyword()
        }
    },[location])

    return(
        <Form className="d-flex"  onSubmit={searchHandler}>
            <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
        </Form>

    )
}