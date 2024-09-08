const customStylesDatatable = {
    table: {
        style: {
            minHeight: 'unset',
        },
    },
    headRow: {
        style: {
            backgroundColor: '#efefef',
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
            fontSize: '0.900rem',
            color: '#6b7280',
            paddingLeft: '0.75rem',
            paddingRight: '0.75rem',
            fontWeight: '600',
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

const paginationOptionsWithArabicLang = {
    rowsPerPageText: 'عدد الصفوف في الصفحة', // Translation for "Rows per page"
    rangeSeparatorText: 'من',                // Translation for "of"
    selectAllRowsItem: true,
    selectAllRowsItemText: 'اختر الكل',       // Translation for "Select All"
};

const currencyFormatter = {
    currency: 'دم',
};

const isMobile = () => {
    window.innerWidth < 768
};

export { customStylesDatatable, paginationOptionsWithArabicLang, currencyFormatter };