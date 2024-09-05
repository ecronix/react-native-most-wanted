import React, {useState, createContext, useCallback, useEffect} from 'react';
import {BackHandler} from 'react-native';

export type ModalContextType = {
  isOpenModal: (name: string) => boolean;
  setOpenModal: (name: string, open: boolean) => void;
};
export interface IModalsProvider {
  children: React.ReactNode;
}

export const ModalsContext = createContext<ModalContextType>({
  isOpenModal: () => false,
  setOpenModal: () => {},
});

const ModalsProvider: React.FC<IModalsProvider> = ({children}) => {
  const [modals, setModals] = useState<any>({});
  //const navigation = useNavigation();

  const setOpenModal = (
    name: string,
    open: boolean,
    closeOthers: boolean = true,
  ) => {
    if (closeOthers) {
      setModals({[name]: open});
    } else {
      setModals((pr: any) => {
        return {...pr, [name]: open};
      });
    }
  };

  const isOpenModal = useCallback(
    (name: string): boolean => {
      return modals ? modals[name] : false;
    },
    [modals],
  );

  const handleBackButtonClick = useCallback(() => {
    let hasOpenModals = false;

    Object.keys(modals).forEach(key => {
      if (modals[key]) {
        hasOpenModals = true;
      }
    });

    if (hasOpenModals) {
      setModals({});
      return true;
    } else {
      return false;
    }
    //return true;
  }, [modals]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, [handleBackButtonClick]);

  return (
    <ModalsContext.Provider value={{setOpenModal, isOpenModal}}>
      {children}
    </ModalsContext.Provider>
  );
};

export default ModalsProvider;
