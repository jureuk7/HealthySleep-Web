import React, { useState } from "react";

const Login = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const onIdChange = (e: any) => setId(e.target.value);
  const onPwChange = (e: any) => setPw(e.target.value);

  const onSubmit = () => {
    alert(`아이디:${id} 비밀번호:${pw}`);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={id}
          placeholder="id를입력해주세요"
          onChange={onIdChange}
        />
        <input
          type="password"
          value={pw}
          placeholder="비밀번호를쳐줘요"
          onChange={onPwChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
