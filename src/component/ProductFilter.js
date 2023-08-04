import React from 'react';
import MyInput from "./UI/Input/MyInput";
import {MySelect} from "./UI/Select/MySelect";

const ProductFilter = ({filter, setFilter}) => {
    return (
        <div>
            <MyInput
                placeholder='Поиск'
                value={filter.query}
                onChange={e => setFilter({...filter, query:e.currentTarget.value})}
            />
                <MySelect
                    value={filter.sort}
                    onChange={selectedSort => setFilter({...filter, sort:selectedSort})}
                    defaultValue={"Сортировка"}
                    options={[
                        {value: 'title', name: 'По названию'},
                        {value: 'body', name: 'По описанию'},
                    ]}
                />
        </div>
    );
};

export default ProductFilter;