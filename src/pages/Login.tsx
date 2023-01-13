import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Logo from "../components/Logo";
import { AuthContext } from "../contexts/AuthContext";


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { signIn, authenticated, error, setError, activeButton, setActiveButton } = useContext(AuthContext);


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (username == '') {
      return setError('O usuário é obrigatório!')
    }
    if (password == '') {
      return setError('A senha é obrigatória!')
    }
    setError(null)
    await signIn(username, password)
  };

  useEffect(() => {

  }, [])

  if (!authenticated) {
    return (
      <main className="flex flex-col md:flex-row w-screen h-screen bg-[#0C0B10] justify-evenly items-center my-4 md:my-0">
        <div className="flex flex-col p-2 gap-3">
          <span>Seja bem vindo ao</span>
          <div className="translate-y-[-15px]">
            <Logo size="text-4xl" />
          </div>
          <p className="italic max-w-xs text-sm">Um sistema para gerenciamento de tarefas simplificado: rastreie o tempo gasto, atribua tarefas a colaboradores, adicione e remova projetos e tarefas facilmente"</p>
          <img
            className="md:max-w-xs max-w-[200px] self-center"
            src="./assets/img/tasks-icon.png" alt="" />
        </div>
        <form className="flex flex-col p-8 gap-4 bg-gray-800 min-w-[320px] max-w-[360px] rounded border-orange-600 border-solid border-2">
          <span className="text-orange-600 font-bold text-lg text-center">LOGIN:</span>
          <input
            autoComplete="off"
            value={username}
            onChange={(e) => { setUsername(e.target.value) }}
            className="px-4 py-2 rounded bg-slate-900"
            type="text" name="username" id="username" placeholder="Digite o usuário" />
          <input
            autoComplete="off"
            onChange={(e) => { setPassword(e.target.value) }}
            value={password}
            className="px-4 py-2 rounded bg-slate-900"
            type="password" name="password" id="password" placeholder="Digite a senha" />
          {error &&
            <p className="font-bold text-orange-600 text-center mt-4 text-sm uppercase">{error}</p>
          }
          {activeButton
            ?
            <button className="py-2 rounded bg-orange-600 font-bold mt-4 hover:opacity-80"
              onClick={handleSubmit}>
              ENTRAR
            </button>
            :
            <button disabled className="disabled:opacity-60 py-2 rounded bg-orange-600 font-bold mt-4 hover:opacity-80">
              CARREGANDO
            </button>
          }
        </form>
      </main>
    )
  } else {
    return <Navigate to="/home" />;
  }
};
export default Login
