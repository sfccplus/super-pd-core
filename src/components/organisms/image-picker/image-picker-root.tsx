import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';

import ImagePicker from './image-picker';
import { imagesMangerStore } from './redux/images-manger-store';

import styles from './image-picker.module.scss';

export default function ImagePickerRoot() {
    const topWindow = window.top || window;
    const [windowHeight, setWindowHeight] = useState(topWindow.innerHeight);

    function handleWindowResize(event: Event) {
        const target = event.target as Window;
        setWindowHeight(target.innerHeight);
    }

    useEffect(() => {
        topWindow.addEventListener('resize', handleWindowResize);

        return () => {
            topWindow.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    // 214 is the vertical spacing between the window and the editor container in PD
    const containerHeight = windowHeight - 214;

    return (
        <Provider store={imagesMangerStore}>
            <div className={styles.imagePickerRoot} style={{ height: containerHeight }}>
                <ImagePicker />
            </div>
        </Provider>
    );
}
