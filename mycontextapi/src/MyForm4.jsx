import { useState } from "react";

function MyForm4 () {
  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ email, setEmail ] = useState('');

  // 잘 생각해보면 alert을 띄우는건 학습 상황이라 그렇지 실제 얘가 하는 역할은 form 태그의 preventDefault()를 쓰기 위함에 가까움.
  const handleSubmit = (event) => {
    alert(`Hello, ${firstName} ${lastName}`);
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>first Name : </label>
      <input
        type="text"
        onChange={(event) => setFirstName(event.target.value)}
        value={firstName}
      />
      <br />
      <label>last Name : </label>
      <input
        type="text"
        onChange={(event) => setLastName(event.target.value)}
        value={lastName}
      />
      <br />
      <label>email : </label>
      <input
        type="email"
        onChange={(event) => setEmail(event.target.value)}
        value={email}
      />
      <br />
      <input type="submit" value='제출'/>
    </form>
  );
}

export default MyForm4;