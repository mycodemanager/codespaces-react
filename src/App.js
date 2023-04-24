import './App.css';
import { message, Modal, Button } from 'antd';
import React, { useState } from "react";
import GoogleCode from "./components/GoogleCode/index";

function App() {
  const [messageApi, contextHolder] = message.useMessage();
  const [saveLoaad, setsaveLoaad] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  window.$message = messageApi

  function onOpenCode() {
    setIsModalOpen(true);
  }

  function googleCode(code) {
    setsaveLoaad(true)
    console.log(code);
    setTimeout(() => {
      setsaveLoaad(false)
    }, 3000)
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src="Octocat.png" className="App-logo" alt="logo" />
        <p>
          GitHub Codespaces <span className="heart">♥️</span> React
        </p>
        <p className="small">
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </p>
        <Button onClick={onOpenCode}>输入谷歌验证码</Button>
      </header>
      <Modal title="" destroyOnClose footer={null} open={isModalOpen} width={550} onCancel={() => setIsModalOpen(false)} >
        <GoogleCode codeLength={6} saveLoading={saveLoaad} onSave={googleCode} onClose={() => { setIsModalOpen(false); }} ></GoogleCode>
      </Modal>
    </div>
  );
}

export default App;
