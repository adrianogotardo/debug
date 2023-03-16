import axios from "axios";
import logo from "../../assets/trackitLogo.svg"
import { url } from "../../constants/url";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { InputsStyles, MainStyle } from "../../style/SignInSignUp";
import UserInfoContext from "../../contexts/UserInfoContext";
import TokenContext from "../../contexts/TokenContext";

export default function LoginPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState({});
    const [processing, setProcessing] = useState(false);
    const { userInfo, setUserInfo } = useContext(UserInfoContext);
    const { tokenStored } = useContext(TokenContext);
    useEffect(() => {
        setForm({ email: '', password: '' });
        if(userInfo.token){
            navigate('/hoje');
        }
    }, [tokenStored]);
    function handleLoginSubmit(e) {
        e.preventDefault();
        setProcessing(true);
        axios.post(`${url}/auth/login`, form)
            .then(res => {
                navigate('/hoje');
                setUserInfo({ ...userInfo, name: res.data.name, image: res.data.image, token: res.data.token });
                const localData = JSON.stringify({ name: res.data.name, image: res.data.image, token: res.data.token });
                localStorage.setItem('userData', localData);
            })
            .catch(err => {
                alert(err.response.data.message);
                setProcessing(false);
            });
    }
    function handleInputChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    return (
        <MainStyle>
            <img src={logo} />
            <InputsStyles>
                <form onSubmit={handleLoginSubmit} >
                    <input
                        placeholder="email"
                        type='email'
                        name='email'
                        required
                        onChange={handleInputChange}
                        disabled={processing}
                        data-test="email-input"
                    />
                    <input
                        placeholder="senha"
                        type='password'
                        name='password'
                        required
                        onChange={handleInputChange}
                        disabled={processing}
                        data-test="password-input"
                    />
                    <button type='submit' disabled={processing} data-test="login-btn">
                        {!processing ? 'Entrar' : <ThreeDots color='#ffff' width='51px' />}
                    </button>
                </form>
                <Link to='/cadastro' data-test="signup-link">
                    Não tem uma conta? Cadastre-se!
                </Link>
            </InputsStyles>
        </MainStyle>
    );
}

