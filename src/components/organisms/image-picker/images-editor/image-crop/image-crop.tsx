import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../manager-hooks';

import Cropper, { Area } from 'react-easy-crop';
import { setTempCropData } from '../../redux/image-slice';

interface ImageCrop {
    imagePath: string;
}

export default function ImageCrop({ imagePath } : ImageCrop) {
    const dispatch = useDispatch();
    const cropData = useAppSelector((state) => state.image.cropData);
    const tempCropData = useAppSelector((state) => state.image.tempCropData);

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);

    function handleOnCropComplete(_croppedArea: Area, croppedAreaPixels: Area) {
        dispatch(setTempCropData(croppedAreaPixels));
    }

    const imageURL = window.viewImageURL + imagePath;
    return (
        <Cropper
            crop={crop}
            onCropChange={setCrop}
            zoom={zoom}
            onZoomChange={setZoom}
            image={imageURL}
            onCropComplete={handleOnCropComplete}
            initialCroppedAreaPixels={tempCropData || cropData}
        />
    );
}
