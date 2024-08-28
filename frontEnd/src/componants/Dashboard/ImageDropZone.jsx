import React, { useEffect, useState } from 'react';
import Dropzone from 'dropzone';
import axiosHttpClient from '../../Utils/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRemove, faUpload } from '@fortawesome/free-solid-svg-icons';
import Toastify from 'toastify-js'

const ImageDropZone = ({ productId, onImageUpdate, ProductImages, isAddedProduct }) => {
    const [currentImages, setCurrentImages] = useState([]);
    
    if (currentImages && currentImages.length > 0) 
        onImageUpdate(currentImages);

    useEffect(() => {
        // Fetch product details to get the current images
        if (ProductImages)
        setCurrentImages(ProductImages);

        // Initialize Dropzone
        const dropzone = new Dropzone("#dropzone", {
            url: `${import.meta.env.VITE_URL_BACKEND}/products/${productId}/update-images`,
            method: "post",
            paramName: "images[]",
            uploadMultiple: true,
            parallelUploads: 10,
            maxFilesize: 15, // MB
            acceptedFiles: "image/*",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('access_token')}`
            },
            autoProcessQueue: true,
            addRemoveLinks: false,
            success: function (file, response) {
                
                if (!isAddedProduct)
                    setCurrentImages( response.images );
                if (isAddedProduct)
                setCurrentImages( (currentImages) => ( [...currentImages, ...response.images]) );         

                if (onImageUpdate) 
                onImageUpdate(currentImages);
            },
            error: function (file, response) {
                console.error('Image upload failed:', response);
            },
        });

        // Cleanup on unmount
        return () => {
            dropzone.destroy();
        };
    }, [productId, onImageUpdate]);

    const removeImageById = (imageId, productId) => {
        axiosHttpClient
            .delete(`${import.meta.env.VITE_URL_BACKEND}/products/${productId}/remove-image/${imageId}`)
            .then((response) => {
                setCurrentImages(response.data.images);
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
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className='w-[90%] md:w-1/2'>
            <style>
                {`
                   #dropzone .dz-details {
                        display: none;
                    }

                    .dz-preview {
                        display: none;
                    }  
                `}
            </style>
            <h2 className="text-xl m-5"> صور المنتج   :</h2>

            <div id="dropzone" className="dropzone" style={{
                border: '2px dashed #cccccc',
                padding: '20px',
                textAlign: 'center',
                cursor: 'pointer',
                marginBottom: '20px',
            }}>

                <div className="dz-message mb-5 bg-white p-5">
                    <div className='text-3xl p-3 text-yellow-600'>
                        <FontAwesomeIcon icon={faUpload} />
                    </div>
                    اسحب وأفلِت الصور هنا، أو انقر لتحديد الملفات
                </div>
                <hr />
                <div className='flex flex-wrap'>
                    {currentImages && currentImages.map((image) => (
                        <div key={image.id} style={{ position: 'relative', display: 'inline-block', margin: '10px' }}>
                            <img src={`${image.path}`} alt={`Product Image`} className='w-24 h-24 md:w-32 md:h-32' style={{ objectFit: 'cover' }} />
                            <button
                                onClick={() => {
                                    removeImageById(image.id, productId);
                                }}
                                className='absolute top-0 right-0 text-red-500 px-2 py-0 m-2 rounded'
                            >
                                <FontAwesomeIcon icon={faRemove} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ImageDropZone;
