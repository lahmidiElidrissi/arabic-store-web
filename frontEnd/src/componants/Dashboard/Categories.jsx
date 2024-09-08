import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axiosHttpClient from '../../Utils/api';
import { useNavigate, useOutletContext } from 'react-router-dom';
import Toastify from 'toastify-js'
import { customStylesDatatable, paginationOptionsWithArabicLang } from '../../Utils/helpers';
import Loader from '../loader';
import NoDataFound from './NoDataFound';

const Categories = () => {

    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [orderColumn, setOrderColumn] = useState('');
    const [orderDir, setOrderDir] = useState('asc');
    const navigate = useNavigate();
    const [pending, setPending] = useState(true);

    // fetch all products
    const fetchData = () => {
        const params = new URLSearchParams({
            search: search,
            orderColumn: orderColumn,
            orderDir: orderDir
        });
        setPending(true);
        axiosHttpClient.get(`${import.meta.env.VITE_URL_BACKEND}/dashboard/categories?${params.toString()}`)
            .then(response => {
                setData(response.data.data || []);
                setPending(false);
            })
            .catch(error => {
                console.error(error);
                setPending(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, [search, orderColumn, orderDir]);

    const { setIsOpen } = useOutletContext();
    useEffect(() => {
        setIsOpen(false);
        const elementMenu = document.querySelectorAll('.menu a');
        if (elementMenu.length > 0) {
            elementMenu.forEach(element => {
                element.addEventListener('click', () => {
                setIsOpen(false);
                });
            });
        }
    }, []);


    // handle sort datatable
    const handleSort = (column, sortDirection) => {
        setOrderColumn(column.selector);
        setOrderDir(sortDirection);
    };

    const columns = [
        { name: 'اسم', selector: (row) => row?.name, sortable: true },
    ];

    // function to delete product
    const onDelete = (id) => {
        axiosHttpClient.delete(`${import.meta.env.VITE_URL_BACKEND}/categories/${id}`)
            .then(response => {
                fetchData();
                if (response.status === 200) {
                    Toastify({
                        text: "تم الحذف بنجاح",
                        className: "text-1xl",
                        position: "center",
                        style: {
                            background: "linear-gradient(90deg, rgba(22,200,22,1) 0%, rgba(38,170,3,1) 43%, rgba(36,213,0,1) 100%)",
                            marginTop: "10vh",
                            width: "70%",
                        },
                    }).showToast();
                } else {
                    Toastify({
                        text: "ليس لديك صلاحية الحذف",
                        className: "text-1xl",
                        position: "center",
                        style: {
                            background: "linear-gradient(107.2deg, rgb(150, 15, 15) 10.6%, rgb(247, 0, 0) 91.1%)",
                            marginTop: "10vh",
                            width: "70%",
                        },
                    }).showToast();
                }
            })
            .catch(error => {
                console.error(error);
            });
    };

    // function to update product
    const onUpdate = (id) => {
        navigate(`/dashboard/categories/edit/${id}`);
    };

    const additionsColumns = [
        ...columns,
        {
            name: '',
            cell: (row) => (
                <>
                    <button
                        onClick={() => onUpdate(row.id)}
                        className="bg-yellow-500 m-1 px-4 py-1 m-2 rounded text-white hover:bg-yellow-600 text-sm"
                    >
                        تعديل
                    </button>
                    <button
                        onClick={() => onDelete(row.id)}
                        className="bg-red-500 m-1 px-4 py-1 m-2 rounded text-white hover:bg-red-700 text-sm"
                    >
                        حذف
                    </button>
                </>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: '200px',
        },
    ];

    return (
        <div className="flex-1 py-5 md:p-6 md:pr-64 bg-slate-100">
            <div className='mx-5'>
                <h2 class="text-3xl font-bold !leading-tight text-black sm:text-4xl md:text-[45px] md:p-5 text-center">  الفئات </h2>
                <input
                    className='placeholder:italic placeholder:text-slate-400 block bg-white w-auto border border-slate-300 rounded-md py-1 pr-2 shadow-sm focus:outline-none focus:border-yellow-100 focus:ring-yellow-600 focus:ring-1 sm:text-sm m-5'
                    type="text"
                    placeholder=" البحث عن الفئة "
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <DataTable
                    columns={additionsColumns}
                    data={data}
                    pagination
                    onSort={handleSort}
                    customStyles={customStylesDatatable}
                    paginationComponentOptions={paginationOptionsWithArabicLang}
                    noDataComponent={<NoDataFound />} 
                    progressPending={pending}
                    progressComponent={<Loader />}
                />
            </div>
        </div>
    );
};

export default Categories;
