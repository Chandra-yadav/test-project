import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import Checkbox from './Checkbox';
import {getCategories} from './apiCore.js';

const Shop = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);

    const init = () => {
        getCategories()
        .then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setCategories(data);
            }
        })
    }

    useEffect(() => {
        init();
    }, [])

    return(
        <Layout
            title="Shop Page"
            description="Search and find books of your choice"
            className="container-fluid">
            <div className="row">
                <div className="col-4">
                    <h4>Categories</h4>
                    <ul>
                        <Checkbox categoties={categories}/>
                    </ul>
                </div>
                <div className="col-8">
                    right area
                </div>                
            </div>
        </Layout>
    );
}

export default Shop;