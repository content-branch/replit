import { createContext, useContext} from 'react';

export const MatomoConfigContext = createContext<{
    matomoConfig: any;
    setMatomoConfig: (config: any) => void;
}>({
    matomoConfig: null,
    setMatomoConfig: (_config: any) => {
        console.log('setMatomoConfig not implemented', _config);
        //do nothing
     },
});

export const useMatomoConfig = () => {
    const context = useContext(MatomoConfigContext);
    if (!context) {
        throw new Error('useMatomoConfig must be used within a MatomoConfigContext.Provider');
    }
    return context;
};
