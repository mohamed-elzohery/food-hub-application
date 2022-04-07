import React from "react";
import Meals from "../components/Meals/Meals";
import NotificationBox from "../UI/Notification/NotificationBox";
import Notification from "../UI/Notification/Notification";
import { useSelector } from "react-redux";

const Home = () => {
    const notifications = useSelector(state => state.UI.notifications);
    return <>
    <Meals />
    {!!notifications.length ? <NotificationBox>{notifications.map(notification => <Notification msg={notification.msg} key={notification.id}/>)}</NotificationBox> : null}
    </>
}

export default Home;