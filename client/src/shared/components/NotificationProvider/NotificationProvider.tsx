import Notifications from './components/Notifications';

const NotificationProvider: React.FC = ({ children }) => {
  return (
    <>
      {children}
      <Notifications />
    </>
  );
};

export default NotificationProvider;
