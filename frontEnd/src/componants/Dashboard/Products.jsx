import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axiosHttpClient from '../../Utils/api';

const MainContent = () => {

  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [orderColumn, setOrderColumn] = useState('');
  const [orderDir, setOrderDir] = useState('asc');

  const fetchData = () => {
    const params = new URLSearchParams({
      search: search,
      orderColumn: orderColumn,
      orderDir: orderDir
    });

    axiosHttpClient.get(`${import.meta.env.VITE_URL_BACKEND}/dashboard/products?${params.toString()}`)
      .then(response => {
        setData(response.data.data || []);
      })
      .catch(error => {
        console.error('Google login failed', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [search, orderColumn, orderDir]);

  const handleSort = (column, sortDirection) => {
    setOrderColumn(column.selector);
    setOrderDir(sortDirection);
  };

  const columns = [
    { name: 'اسم', selector: (row) => row?.name, sortable: true },
    { name: 'وصف', selector: (row) => row?.description ? row.description.slice(0, 50) + "..." : "", sortable: true },
    { name: 'السعر', selector: (row) => row?.price , sortable: true },
  ];

  return (
    <div className="flex-1 p-6 md:pr-64 bg-slate-100">
      <div className='mx-5'>
        <h2 class="text-3xl font-bold !leading-tight text-black sm:text-4xl md:text-[45px] p-5 text-center"> المنتجات</h2>
        <input
          className='placeholder:italic placeholder:text-slate-400 block bg-white w-auto border border-slate-300 rounded-md py-1 pr-2 shadow-sm focus:outline-none focus:border-yellow-100 focus:ring-yellow-600 focus:ring-1 sm:text-sm m-5'
          type="text"
          placeholder="  البحث عن منتج"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <DataTable
          columns={columns}
          data={data}
          pagination
          onSort={handleSort}
          customStyles={customStyles}
        />
      </div>
    </div>
  );
};

const customStyles = {
  table: {
    style: {
      minHeight: 'unset',
    },
  },
  headRow: {
    style: {
      backgroundColor: '#eab3085c', 
      borderBottomColor: '#e5e7eb', 
      borderBottomWidth: '1px',
    },
  },
  headCells: {
    style: {
      fontSize: '0.875rem', 
      fontWeight: '600', 
      color: '#4b5563', 
      paddingLeft: '0.75rem',
      paddingRight: '0.75rem',
    },
  },
  cells: {
    style: {
      fontSize: '0.875rem', 
      color: '#6b7280', 
      paddingLeft: '0.75rem',
      paddingRight: '0.75rem',
    },
  },
  rows: {
    style: {
      minHeight: '50px', 
      borderBottomColor: '#e5e7eb', 
      borderBottomWidth: '1px',
    },
  },
  pagination: {
    style: {
      borderTopColor: '#e5e7eb', 
      borderTopWidth: '1px',
    },
  },
};

export default MainContent;
