import * as React from 'react';
import {AppNavigation} from './src/navigation';
import Providers from './src/navigation/providers';
//import SplashScreen from 'react-native-splash-screen';
import BootSplash from 'react-native-bootsplash';

const App = () => {
  React.useEffect(() => {
    //SplashScreen.hide();
    BootSplash.hide({fade: true});
  }, []);

  return (
    <Providers>
      <AppNavigation />
    </Providers>
  );
};

export default App;
