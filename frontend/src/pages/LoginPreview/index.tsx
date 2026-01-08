export default function LoginPreview() {
  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="text-2xl font-bold text-gray-800">登入頁面預覽</h1>
      </div>
      <div className="w-full h-[calc(100vh-140px)] rounded-lg overflow-hidden shadow-lg">
        <iframe
          src="/login-preview/index.html"
          className="w-full h-full border-0"
          title="登入頁面預覽"
        />
      </div>
    </div>
  );
}
