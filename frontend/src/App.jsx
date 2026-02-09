import {useEffect, useState} from "react";

import api from "./axiosConfig.js";

function App() {
    const[testMessage, setTestMessage] = useState("Loading...");

    useEffect(() => {
        api.get('/test')
            .then((response) => {
                console.log("Loaded data:",response.data);
                setTestMessage(response.data);
            })
        .catch((error) => {
            console.log(error);
        })
    })
  return (
    <>
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>프론트엔드 - 백엔드 통신 테스트</h1>
            <hr />
            {/* 백엔드에서 온 메시지가 여기 떠야 성공! */}
            <h2 style={{ color: 'blue' }}>{testMessage}</h2>
        </div>
    </>
  )
}

export default App
