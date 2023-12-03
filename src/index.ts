declare global {
    var emit: (event: any, handleClose: Function) => void;
    var changeValidationState: (state: boolean) => void;
    var publishState: (payload: any) => void;

    var viewImageURL: string;
    var imageUploaderURL: string;
    var getFolderImagesURL: string;
    var getLibraryFoldersURL: string;
}

export * from './components';