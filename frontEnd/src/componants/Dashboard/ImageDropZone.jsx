import React, { useEffect, useState } from 'react';
import Dropzone from 'dropzone';
import axiosHttpClient from '../../Utils/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRemove, faUpload } from '@fortawesome/free-solid-svg-icons';

const ImageDropZone = ({ productId, onImageUpdate, ProductImages }) => {
    const [currentImages, setCurrentImages] = useState([]);

    useEffect(() => {
        // Fetch product details to get the current images
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
                console.log(response.images);
                setCurrentImages(response.images);
                if (onImageUpdate) onImageUpdate();
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
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className='w-[90%] md:w-1/2'>
            <h2 className="text-xl m-5"> صور المنتجات  :</h2>

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
