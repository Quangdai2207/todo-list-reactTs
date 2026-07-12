import { useEffect } from "react";
import { Home, ArrowLeft, Compass } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface NotFoundProps {
  onGoHome?: () => void;
  onGoBack?: () => void;
}

export const NotFound = ({ onGoHome, onGoBack }: NotFoundProps) => {
  useEffect(() => {
    document.title = "404 - Không tìm thấy trang";
  }, []);

  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0b0b12] flex items-center justify-center px-4 py-12">
      {/* Ambient glow background, consistent with the rest of the app */}
      <div className="pointer-events-none absolute -top-32 -left-24 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-fuchsia-600/20 blur-[110px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-orange-500/15 blur-[110px]" />

      <div className="relative w-full max-w-md text-center">
        <div className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500/20 to-fuchsia-600/20 border border-white/10 flex items-center justify-center">
          <Compass className="w-8 h-8 text-orange-400" strokeWidth={1.75} />
        </div>

        <p className="text-sm font-medium tracking-[0.3em] text-white/30 mb-2">LỖI 404</p>

        <h1 className="text-6xl sm:text-7xl font-semibold tracking-tight bg-gradient-to-r from-orange-400 to-fuchsia-500 bg-clip-text text-transparent mb-4">
          404
        </h1>

        <h2 className="text-lg sm:text-xl font-medium text-white/90 mb-2">
          Không tìm thấy trang
        </h2>
        <p className="text-sm text-white/40 leading-relaxed mb-8">
          Trang bạn đang tìm không tồn tại, đã bị xóa, hoặc đường dẫn không chính xác.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={onGoHome ?? (() => navigate("/"))}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 font-medium text-sm text-white bg-gradient-to-r from-orange-500 to-fuchsia-600 hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_6px_18px_-4px_rgba(249,115,22,0.35)]"
          >
            <Home className="w-4 h-4" strokeWidth={2} />
            Về trang chủ
          </button>

          <button
            type="button"
            onClick={onGoBack ?? (() => window.history.back())}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-5 py-2.5 font-medium text-sm text-white/70 hover:bg-white/[0.08] hover:text-white/90 active:scale-[0.98] transition-all"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={2} />
            Quay lại
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;