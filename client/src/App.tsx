import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Main from './shared/components/Main';
import Routes from './shared/components/Routes';
import { autoLogin } from './store/actions/authActions';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(autoLogin(null));
  }, []);

  return (
    <div>
      <Main>
        <Routes />
      </Main>
    </div>
  );
};

export default App;
