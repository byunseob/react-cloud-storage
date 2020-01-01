// @ts-ignore
import React, {createContext, useState} from 'react';


interface FileContextProps {
    setFile: Function,
    file: any,
}

const FileContext = createContext<FileContextProps>({
    setFile: (file: any) => {},
    file : null
});

export const FileContextProvider: React.FC = ({children}) => {
    const [file, setFile] = useState<any>(null);

    return (
        <FileContext.Provider value={{
            setFile,
            file
        }}>
            {children}
        </FileContext.Provider>
    );
};

export default FileContext;
