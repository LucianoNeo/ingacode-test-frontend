import { useState } from "react"
import Logo from "../components/Logo"

function Login() {

  const [error, setError] = useState()

  return (
    <main className="flex flex-col md:flex-row w-screen h-screen bg-[#0C0B10] justify-evenly items-center my-4 md:my-0">
      <div className="flex flex-col p-2 gap-3">
        <span>Seja bem vindo ao</span>
        <div className="translate-y-[-15px]">
          <Logo size="5xl" />
        </div>
        <p className="italic max-w-xs text-sm">Um sistema para gerenciamento de tarefas simplificado: rastreie o tempo gasto, atribua tarefas a colaboradores, adicione e remova projetos e tarefas facilmente"</p>
        <img
          className="md:max-w-xs max-w-[200px] self-center"
          src="./assets/img/tasks-icon.png" alt="" />
      </div>
      <form className="flex flex-col p-8 gap-4 bg-gray-800 min-w-[320px] max-w-[360px] rounded border-orange-600 border-solid border-2">
        <span className="text-orange-600 font-bold text-lg text-center">LOGIN:</span>
        <input
          className="px-4 py-2 rounded bg-slate-900"
          type="text" name="username" id="username" placeholder="Digite o usuário" />
        <input
          className="px-4 py-2 rounded bg-slate-900"
          type="password" name="password" id="password" placeholder="Digite a senha" />
        {error &&
          <p className="font-bold text-orange-600 text-center mt-4 text-sm uppercase">{error}</p>
        }
        <button className="py-2 rounded bg-orange-600 font-bold mt-4 hover:opacity-80">ENTRAR</button>
      </form>
    </main>
  )
}

export default Login
