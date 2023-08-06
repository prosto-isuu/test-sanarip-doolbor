import React from 'react';
import MyInput from "./UI/Input/MyInput";
import {MySelect} from "./UI/Select/MySelect";

const ProductFilter = ({filter = ' ', setFilter}) => {
    return (
        <div>
            <MyInput
                placeholder='Поиск'
                value={filter}
                onChange={setFilter}
            />
            <MySelect
                value={filter.sort}
                onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
                defaultValue={"Сортировка категорий"}
                options={[
                    {value: 'electronics', name: 'Электроника'},
                    {value: 'jewelery', name: 'Бижутерия'},
                    {value: 'men\'s clothing', name: 'Мужская одежда'},
                    {value: 'women\'s clothing', name: 'Женская одежда'},
                ]}
            />
        </div>
    );
};

export default ProductFilter;