import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { requestPermission, onMessageListener, messaging } from './../firebase/firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { setUserfmcToken } from '../redux/actions/user/userActions';
import { getToken } from 'firebase/messaging';

const Notifications = () => {
  const [notification, setNotification] = useState<{ title: string; body: string }>({ title: "", body: "" });
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fmcToken = await requestPermission();
        if (fmcToken && user?.role === "user") {
          dispatch(setUserfmcToken(fmcToken));
        }

        const payload = await onMessageListener();

        if (payload.notification) {
          setNotification({
            title: payload.notification.title || "",
            body: payload.notification.body || "",
          });
          toast.success(
            `${notification.title}, ${notification.body}`,
            {
              duration: 6000,
              position: "top-right",
            }
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const handleTokenRefresh = async () => {
      try {
        const refreshedToken = await getToken(messaging);
        console.log("Token refreshed:", refreshedToken);
        dispatch(setUserfmcToken(refreshedToken))
      } catch (error) {
        console.error("Error refreshing token:", error);
      }
    };

    const intervalId = setInterval(() => {
      handleTokenRefresh();
    }, 24 * 60 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  return (
    <div>
      <Toaster />
    </div>
  );
};

export default Notifications;
