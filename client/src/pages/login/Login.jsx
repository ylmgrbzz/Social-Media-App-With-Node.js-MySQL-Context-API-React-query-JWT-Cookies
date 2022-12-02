import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Merhaba.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Hesabınız Yok Mu?</span>
          <Link to="/register">
            <button>Kayıt Ol</button>
          </Link>
        </div>
        <div className="right">
          <h1>Giriş Yap!</h1>
          <form>
            <input
              type="text"
              placeholder="Kullanıcı Adı"
              name="username"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Şifre"
              name="password"
              onChange={handleChange}
            />
            {err && err}
            <button onClick={handleLogin}>Giriş</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
