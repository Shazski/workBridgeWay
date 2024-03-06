import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { requestPermission, onMessageListener } from './../firebase/firebaseConfig';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { setUserfmcToken } from '../redux/actions/user/userActions';

const Notifications = () => {
  const [notification, setNotification] = useState<{ title: string; body: string }>({ title: "", body: "" });

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fmcToken = await requestPermission();
        if (fmcToken) {
          dispatch(setUserfmcToken(fmcToken));
        }

        const payload = await onMessageListener();
        console.log(payload, "payload data");

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
  }, [dispatch]);

  return (
    <div>
      <Toaster />
    </div>
  );
};

export default Notifications;
