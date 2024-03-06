import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { requestPermission, onMessageListener } from './../firebase/firebaseConfig';

const Notifications = () => {
  const [notification, setNotification] = useState<{ title: string, body: string }>({ title: "", body: "" });

  useEffect(() => {
    requestPermission();

    const fetchData = async () => {
      try {
        const payload = await onMessageListener();
        console.log(payload,"payload data")
        if (payload.notification) {
          setNotification({
            title: payload.notification.title || "",
            body: payload.notification.body || "",
          });
          toast.success(
            "notification",
            {
              duration: 60000,
              position: "top-right"
            }
          )
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <Toaster />
    </div>
  )
}

export default Notifications