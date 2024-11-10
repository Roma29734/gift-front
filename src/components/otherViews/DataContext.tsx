import React, {createContext, useContext, useState, ReactNode, useEffect} from 'react';

// Определение интерфейсов


interface UserBasic {
    userId: string;
    userName: string;
    gifts: number;
    createAt?: string;
    dataUpdate?: string;
    imageAvatar?: string | null;
}
interface DataContextType {
    dataApp: UserBasic;
    setDataApp: React.Dispatch<React.SetStateAction<UserBasic>>;
}

// Создание контекста
const DataContext = createContext<DataContextType | undefined>(undefined);

// Создание провайдера
interface DataProviderProps {
    children: ReactNode;
}

const initialUserBasic: UserBasic = {
    userId: "",
    userName: "",
    gifts: 0
};

const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
    const [dataApp, setDataApp] = useState<UserBasic>(() => {
        const storedData = localStorage.getItem('dataApp');
        return storedData ? JSON.parse(storedData) : initialUserBasic;
    });




    useEffect(() => {
        localStorage.setItem('dataApp', JSON.stringify(dataApp));
    }, [dataApp]);


    return (
        <DataContext.Provider value={{ dataApp, setDataApp}}>
            {children}
        </DataContext.Provider>
    );
};

// Кастомный хук для использования контекста
const useData = (): DataContextType => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};

export { DataProvider, useData };
