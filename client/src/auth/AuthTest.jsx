import APIUtils from "./ApiUtils";
import AuthenticatedContent from "./AuthenticatedContent";
import RoleSpecificContent from "./RoleSpecificContent";
import NotAuthenticated from "./NotAuthenticated";

const AuthTest = () => {
  const userData = {
    name: "John Doe",
    email: "john@example.com",
    password: "szerajszeraj",
    password_confirmation: "szerajszeraj",
  };

  const onRegister = () => {
    APIUtils.post("register", userData)
      .then((response) => {
        console.log("Registration successful:", response.data);
        // Handle success response
        onLogin(userData.email, userData.password);
      })
      .catch((error) => {
        console.error("Registration failed:", error);
        // Handle error
      });
  };

  const onLogin = async (email = null, password = null) => {
    APIUtils.post("login", {
      email: email || "john@example.com",
      password: password || "szerajszeraj",
    })
      .then(async (response) => {
        localStorage.setItem("token", response.data.token);
        await setUserInfo();

        location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const setUserInfo = async () => {
    await APIUtils.get("getUser").then((response) => {
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("name", response.data.name);
    });
  };

  const onLogout = () => {
    APIUtils.post("logout")
      .then(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("name");
        location.reload();
      })
      .catch(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("name");
      });
  };

  const szeraj = () => {
    APIUtils.get("protected").then((response) => {
      alert(response.data);
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <NotAuthenticated>
          <button onClick={() => onRegister()}>Register</button>
          <button onClick={() => onLogin()}>Login</button>
        </NotAuthenticated>

        <AuthenticatedContent>
          <button onClick={() => onLogout()}>Logout</button>
        </AuthenticatedContent>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <AuthenticatedContent>
          <span style={{ background: "yellow" }}>
            Only client-side auth checked content
          </span>
        </AuthenticatedContent>

        <RoleSpecificContent roleRequired="0">
          <span style={{ background: "orange" }}>
            Only visible for READ_ONLY (and above) users
          </span>
        </RoleSpecificContent>

        <RoleSpecificContent roleRequired="1">
          <span style={{ background: "red" }}>
            Only visible for WRITE users
          </span>
        </RoleSpecificContent>
        <button onClick={() => szeraj()}>
          Protected API (only for write users)
        </button>
      </div>
    </div>
  );
};

export default AuthTest;
