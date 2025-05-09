export default function InputCommon({ label, type, value, onChange, error }) {
  return (
    <div className="mb-4">
      <label className="block mb-1 text-sm">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full border rounded px-3 py-2"
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

// label과 input , error 메세지 를 포함하는 하나의 공통 컴포넌트를 생성합니다.
// 이에 label input(type,value,onChange), error 를 props로 받아온다.
// 쉽게 생각해서 구현사항 사진을 보면 라벨이름,input창,에러글씨 이렇게 나오는데
// 이걸 하나의 재사용컴포넌트로 만들어서 쓰려고 common이라는 컴포넌트를 만든거다.

// {error && <p className="text-red-500 text-xs mt-1">{error}</p>} 이 코드는
// if (error) {
//     return <p>에러 메시지</p>
//   } 이거랑 똑같다. 그런데 이걸 jsx문법으로 쓰려고 하니 이 코드만 {} 중괄호로 묶은 것
