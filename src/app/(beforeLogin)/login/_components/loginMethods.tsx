export default function LoginMethods() {
  return (
    <div className="flex flex-col w-full gap-3">
      {["카카오톡으", "구글", "애플"].map((name) => {
        return <button key={name} className="border w-full h-10 rounded-3xl font-bold">{name}로 시작하기</button>;
      })}
    </div>
  );
}
