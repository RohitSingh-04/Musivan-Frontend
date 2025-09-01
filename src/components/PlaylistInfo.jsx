import React, { useState, useRef, useEffect } from 'react';

const PlaylistInfo = ({ Title, SubTitle, playlistURL, playlistName, playlistDesc, global, setimageBase64 }) => {
    const inputFile = useRef();
    const [imgSrc, setImgSrc] = useState(null);

    const handleFile = (file) => {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = async ()=>{
                setImgSrc(reader.result);
                setimageBase64(reader.result);
            }
        }
    };
    const uploadImage = () => {
        const file = inputFile.current.files[0];
        handleFile(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        handleFile(droppedFile);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };


    useEffect(() => {
        return () => {
            if (imgSrc) {
                URL.revokeObjectURL(imgSrc);
            }
        };
    }, [imgSrc]);

    return (
        <>
            <h1 className='text-5xl mb-3 text-center'>{Title}</h1>
            <h2 className='text-l mb-3 text-center'>{SubTitle}</h2>
            <div className='flex flex-col sm:flex-row sm:content-right items-center'>
                <div className='flex flex-col'>
                    <label htmlFor="url" className='my-2'>Image URL</label>
                    <input type="url" id="url" ref={playlistURL} placeholder='https://abc.com/image.png' className='border rounded p-2 mb-4 md:w-70' disabled = {(imgSrc)?true:false}/>
                </div>
                <span className='mx-3'>or</span>

                <div className='flex flex-col items-center'>
                    <label
                        className='w-[200px] h-[200px] border-2 border-dashed rounded-2xl flex justify-center cursor-pointer items-center'
                        title='choose a file or drop it'
                        htmlFor='image-select'
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                    >
                        {imgSrc ? (
                            <img src={imgSrc} alt="Playlist cover" className='w-full h-full object-cover rounded-2xl' />
                        ) : (
                            <div className='bg-center bg-cover'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className='h-[100px] fill-[#121212]'><path d="M352 128c0-17.7-14.3-32-32-32s-32 14.3-32 32v160H128c-17.7 0-32 14.3-32 32s14.3 32 32 32h160v160c0 17.7 14.3 32 32 32s32-14.3 32-32V352h160c17.7 0 32-14.3 32-32s-14.3-32-32-32H352V128z" /></svg>
                            </div>
                        )}
                        <input type="file" name="select-image" id="image-select" accept='image/*' ref={inputFile} onChange={uploadImage} hidden />
                    </label>
                    <span>Upload file</span>
                </div>
            </div>
            {/* The rest of your component code */}
            <div className='flex flex-col me-5'>
                <label htmlFor="name" className='my-2'>Name</label>
                <input type="text" id="name" ref={playlistName} placeholder='Cool Name' className='border rounded p-2 mb-4' />
            </div>
            <div className='flex flex-col me-5'>
                <label htmlFor="desc">Description</label>
                <input type="text" id="desc" ref={playlistDesc} placeholder='An awsome playlist by Rohiyaa' className='border rounded p-2 mb-4' />
            </div>

            <div className='flex items-center'>
                <input type="checkbox" id="global" ref={global} />
                <label htmlFor="global" className='px-2'>Set Public</label>
            </div>
        </>
    );
};

export default PlaylistInfo;