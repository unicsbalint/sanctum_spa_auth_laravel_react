import { useEffect, useState } from "react";
import APIUtils from "./ApiUtils";

const RoleSpecificContent = (params) => {
  const [valid, setValid] = useState(false);

  const checkAuth = async () => {
    const localStorageSet =
      localStorage.getItem("token") &&
      localStorage.getItem("name") &&
      localStorage.getItem("role");

    if (localStorage.getItem("role") >= params?.roleRequired && localStorageSet) {
      setValid(true);
    }

    // Ha kell a megjelenítést köthetjük backendhez egyből.

    // await APIUtils.get("getUser").then((response) => {
    //     if(response.data.role >= params?.roleRequired && localStorageSet){
    //         setValid(true);
    //     }
    // }).catch(el => {
    //     setValid(false);
    // });
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (valid) {
    return <>{params.children}</>;
  } else {
    return <></>;
  }
};

export default RoleSpecificContent;
