import { useEffect, useState } from "react";
import {
  Menu,
  X,
  ArrowUp,
  ZoomIn,
  Globe,
  BookOpen,
  LayoutGrid,
  Settings2,
} from "lucide-react";

type Lang = "vi" | "en";

interface TocItem {
  id: string;
  vi: string;
  en: string;
  level: 2 | 3;
}

const TOC: TocItem[] = [
  { id: "gioi-thieu", vi: "Giới thiệu", en: "Introduction", level: 2 },
  {
    id: "tong-quan",
    vi: "Tổng quan về giao diện",
    en: "Interface overview",
    level: 2,
  },
  { id: "tong-quan-trang-chu", vi: "Trang chủ", en: "Home page", level: 3 },
  {
    id: "tong-quan-giao-dien-chinh",
    vi: "Giao diện chính",
    en: "Main interface",
    level: 3,
  },
  {
    id: "tong-quan-bo-loc",
    vi: "Bộ lọc công việc",
    en: "Job filter",
    level: 3,
  },
  {
    id: "tong-quan-trang-thai",
    vi: "Trạng thái công việc & ghi chú",
    en: "Job & note status",
    level: 3,
  },
  {
    id: "tong-quan-them-ghi-chu",
    vi: "Thêm ghi chú",
    en: "Adding a note",
    level: 3,
  },
  {
    id: "tong-quan-chinh-sua",
    vi: "Chỉnh sửa công việc",
    en: "Editing a job",
    level: 3,
  },
  {
    id: "tinh-nang",
    vi: "Các tính năng cơ bản",
    en: "Core features",
    level: 2,
  },
  {
    id: "tinh-nang-quan-ly",
    vi: "Quản lý công việc",
    en: "Managing jobs",
    level: 3,
  },
  {
    id: "tinh-nang-ghi-chu",
    vi: "Tương tác với ghi chú",
    en: "Interacting with notes",
    level: 3,
  },
  {
    id: "tinh-nang-loc",
    vi: "Lọc công việc theo nhu cầu",
    en: "Filtering jobs",
    level: 3,
  },
  {
    id: "tinh-nang-them-moi",
    vi: "Thêm mới công việc",
    en: "Creating a new job",
    level: 3,
  },
];

export const Document = () => {
  const [lang, setLang] = useState<Lang>("vi");
  const [tocOpen, setTocOpen] = useState(false);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(
    null
  );
  const [showTop, setShowTop] = useState(false);

  const t = (vi: string, en: string) => (lang === "vi" ? vi : en);

  useEffect(() => {
    document.title = "todo-list-documentation";
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 420);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToId = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTocOpen(false);
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const Figure = ({
    src,
    alt,
    caption,
  }: {
    src: string;
    alt: string;
    caption?: string;
  }) => (
    <figure className="my-4">
      <button
        type="button"
        onClick={() => setLightbox({ src, alt })}
        className="group relative block w-full max-w-xl mx-auto overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]"
      >
        <img src={src} alt={alt} className="w-full h-auto object-cover" />
        <span className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-colors">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 rounded-full bg-black/70 border border-white/10 px-3 py-1.5 text-xs text-white">
            <ZoomIn className="w-3.5 h-3.5" />
            {t("Xem ảnh lớn hơn", "View larger")}
          </span>
        </span>
      </button>
      {caption && (
        <figcaption className="text-center text-xs text-white/35 mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );

  const H2 = ({ id, children }: { id: string; children: React.ReactNode }) => (
    <h2
      id={id}
      className="scroll-mt-24 text-xl sm:text-2xl font-semibold text-white tracking-tight mt-12 mb-4 pb-3 border-b border-white/10"
    >
      {children}
    </h2>
  );
  const H3 = ({ id, children }: { id: string; children: React.ReactNode }) => (
    <h3
      id={id}
      className="scroll-mt-24 text-base sm:text-lg font-medium text-orange-300 mt-8 mb-3"
    >
      {children}
    </h3>
  );
  const P = ({ children }: { children: React.ReactNode }) => (
    <p className="text-sm sm:text-[15px] leading-relaxed text-white/70 mb-3">
      {children}
    </p>
  );

  return (
    <div className="relative min-h-screen w-full bg-[#0b0b12]">
      {/* Ambient glow background */}
      <div className="pointer-events-none fixed -top-32 -left-24 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-fuchsia-600/15 blur-[110px]" />
      <div className="pointer-events-none fixed -bottom-32 -right-24 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-orange-500/10 blur-[110px]" />

      {/* Top bar */}
      <div className="sticky top-0 z-30 border-b border-white/10 bg-[#0b0b12]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500/20 to-fuchsia-600/20 border border-white/10 flex items-center justify-center shrink-0">
              <BookOpen
                className="w-4 h-4 text-orange-400"
                strokeWidth={1.75}
              />
            </div>
            <div>
              <p className="text-sm font-medium text-white leading-tight">
                {t("Hướng dẫn sử dụng", "User Guide")}
              </p>
              <p className="text-[11px] text-white/35 leading-tight">
                Todo List
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Language toggle */}
            <div className="flex items-center rounded-lg border border-white/10 bg-white/[0.04] p-0.5">
              <button
                type="button"
                onClick={() => setLang("vi")}
                className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  lang === "vi"
                    ? "bg-gradient-to-r from-orange-500 to-fuchsia-600 text-white"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                VI
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  lang === "en"
                    ? "bg-gradient-to-r from-orange-500 to-fuchsia-600 text-white"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                EN
              </button>
            </div>

            {/* Mobile/tablet TOC toggle */}
            <button
              type="button"
              onClick={() => setTocOpen(true)}
              className="lg:hidden inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] px-3 py-2 text-xs text-white/70 transition-colors"
            >
              <Menu className="w-4 h-4" />
              {t("Mục lục", "Contents")}
            </button>
          </div>
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:flex lg:gap-10 lg:items-start">
        {/* Desktop sidebar TOC */}
        <aside className="hidden lg:block w-64 shrink-0 sticky top-24 h-[calc(100vh-7rem)] overflow-y-auto pr-2">
          <p className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-white/35 mb-3">
            <LayoutGrid className="w-3.5 h-3.5" />
            {t("Mục lục", "Table of contents")}
          </p>
          <nav className="flex flex-col gap-0.5">
            {TOC.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToId(item.id)}
                className={`text-left rounded-lg px-2.5 py-1.5 text-sm transition-colors hover:bg-white/[0.06] hover:text-white ${
                  item.level === 2
                    ? "font-medium text-white/80 mt-2"
                    : "text-white/45 pl-5"
                }`}
              >
                {t(item.vi, item.en)}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 sm:p-8 lg:p-10">
          <header className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-2">
              {t(
                "Hướng dẫn sử dụng ứng dụng Todo List",
                "Todo List — User Guide"
              )}
            </h1>
            <p className="text-sm text-white/40">
              {t(
                "Tài liệu này giúp bạn làm quen nhanh với giao diện và các tính năng chính của ứng dụng.",
                "This document helps you quickly get familiar with the interface and main features of the application."
              )}
            </p>
          </header>

          {/* Giới thiệu */}
          <section>
            <H2 id="gioi-thieu">{t("Giới thiệu", "Introduction")}</H2>
            <P>
              {t(
                "Todo List là ứng dụng giúp bạn quản lý công việc dễ dàng hơn trong cuộc sống hằng ngày. Với các chức năng cơ bản như thêm công việc bạn cần làm trong ngày và các ghi chú cho từng công việc đó.",
                "Todo List is an application that helps you manage your tasks more easily in everyday life, offering essential features such as adding the tasks you need to complete each day and attaching notes to each of them."
              )}
            </P>
          </section>

          {/* Tổng quan về giao diện */}
          <section>
            <H2 id="tong-quan">
              {t("Tổng quan về giao diện", "Interface overview")}
            </H2>

            <H3 id="tong-quan-trang-chu">{t("Trang chủ", "Home page")}</H3>
            <Figure
              src="/images/home-page.png"
              alt="home-page"
              caption={t("Trang chủ ứng dụng", "Application home page")}
            />
            <P>
              {t(
                "Trang chủ hiển thị thông tin của tác giả và phiên bản ứng dụng đang sử dụng. Ngoài ra, phần “Hướng dẫn sử dụng” giúp việc sử dụng ứng dụng trở nên dễ dàng hơn. Bạn có thể gửi email phản hồi, yêu cầu hỗ trợ hoặc liên hệ với tác giả qua số điện thoại để phản ánh về quá trình sử dụng ứng dụng.",
                "The home page displays the author's information and the current app version. In addition, the “User Guide” section makes using the app easier. You can send a feedback email, request support, or contact the author by phone to share feedback about your experience using the app."
              )}
            </P>

            <H3 id="tong-quan-giao-dien-chinh">
              {t("Giao diện chính", "Main interface")}
            </H3>
            <Figure
              src="/images/todo-list.png"
              alt="todo-list"
              caption={t("Giao diện danh sách công việc", "Job list interface")}
            />
            <P>
              {t(
                "Giao diện chính của ứng dụng Todo List dùng để quản lý công việc và các ghi chú cho từng công việc. Trong hình, một số thành phần được đánh số chú thích từ 1 đến 6, cụ thể:",
                "The main interface of the Todo List app is used to manage jobs and the notes attached to each job. In the image, several components are numbered from 1 to 6, specifically:"
              )}
            </P>
            <ol className="list-decimal list-outside pl-5 text-sm sm:text-[15px] text-white/70 space-y-1.5 mb-3">
              <li>
                {t(
                  "Nơi nhập tên người dùng của bạn",
                  "Where you enter your display name"
                )}
              </li>
              <li>
                {t(
                  "Ngày trong tuần và thời gian hiện tại, giúp theo dõi lịch trình của các công việc",
                  "Current weekday and time, helping you keep track of your job schedule"
                )}
              </li>
              <li>
                {t(
                  "Bộ lọc — khi nhấn vào biểu tượng này, ứng dụng sẽ hiển thị bộ lọc để tìm kiếm theo nhu cầu",
                  "Filter — tapping this icon opens the filter panel so you can search according to your needs"
                )}
              </li>
              <li>
                {t(
                  "Ô tìm kiếm — có thể tìm nhanh công việc bằng cách gõ tên tiêu đề công việc",
                  "Search box — quickly find a job by typing its title"
                )}
              </li>
              <li>
                {t(
                  "Các thao tác thực hiện với một công việc cụ thể",
                  "Actions available for a specific job"
                )}
                <ul className="list-disc list-outside pl-5 mt-1.5 space-y-1 text-white/55">
                  <li>
                    {t(
                      "Biểu tượng thùng rác dùng để xoá một công việc",
                      "Trash icon — deletes a job"
                    )}
                  </li>
                  <li>
                    {t(
                      "Biểu tượng cây bút dùng để chỉnh sửa một công việc",
                      "Pencil icon — edits a job"
                    )}
                  </li>
                  <li>
                    {t(
                      "Biểu tượng ghi chú dùng để thêm ghi chú cho công việc đó",
                      "Note icon — adds a note to that job"
                    )}
                  </li>
                </ul>
              </li>
              <li>
                {t(
                  "Biểu mẫu để tạo mới một công việc cần làm",
                  "Form used to create a new job"
                )}
              </li>
            </ol>

            <H3 id="tong-quan-bo-loc">{t("Bộ lọc công việc", "Job filter")}</H3>
            <Figure
              src="/images/filter-jobs.png"
              alt="filter-jobs"
              caption={t("Khu vực bộ lọc công việc", "Job filter panel")}
            />
            <P>
              {t(
                "Bộ lọc cho phép hiển thị nhanh các công việc cụ thể. Bạn có thể lọc theo trạng thái, mức độ ưu tiên hoặc theo thời gian thực hiện của công việc.",
                "The filter lets you quickly narrow down the job list. You can filter by status, priority level, or by the job's due date."
              )}
            </P>

            <H3 id="tong-quan-trang-thai">
              {t("Trạng thái công việc và ghi chú", "Job & note status")}
            </H3>
            <Figure
              src="/images/status-jobs.png"
              alt="status-jobs"
              caption={t(
                "Trạng thái công việc và ghi chú",
                "Job and note status"
              )}
            />
            <P>
              {t(
                "Có thể xem các ghi chú của một công việc, trạng thái của công việc đó và trạng thái của từng ghi chú.",
                "You can view a job's notes, the job's own status, and the status of each individual note."
              )}
            </P>

            <H3 id="tong-quan-them-ghi-chu">
              {t("Thêm ghi chú", "Adding a note")}
            </H3>
            <Figure
              src="/images/add-note.png"
              alt="add-note"
              caption={t("Popup thêm ghi chú", "Add-note popup")}
            />
            <P>
              {t(
                "Thêm một ghi chú mới cho một công việc cụ thể. Bạn có thể thêm một hoặc nhiều ghi chú nếu công việc đó cần nhiều ghi chú chi tiết.",
                "Add a new note to a specific job. You can add one or multiple notes if that job requires several detailed notes."
              )}
            </P>

            <H3 id="tong-quan-chinh-sua">
              {t("Chỉnh sửa công việc", "Editing a job")}
            </H3>
            <Figure
              src="/images/edit-job.png"
              alt="edit-job"
              caption={t("Biểu mẫu chỉnh sửa công việc", "Edit-job form")}
            />
            <P>
              {t(
                "Biểu mẫu cho phép người dùng thay đổi tên, thời gian và trạng thái cụ thể của một công việc.",
                "This form lets users change a job's title, due date, and status."
              )}
            </P>
          </section>

          {/* Các tính năng cơ bản */}
          <section>
            <H2 id="tinh-nang">{t("Các tính năng cơ bản", "Core features")}</H2>

            <H3 id="tinh-nang-quan-ly">
              {t("Quản lý công việc", "Managing jobs")}
            </H3>
            <Figure
              src="/images/feature-job.png"
              alt="feature-job"
              caption={t(
                "Các thao tác quản lý công việc",
                "Job management actions"
              )}
            />
            <P>
              {t(
                "Hình minh hoạ các thao tác quản lý công việc, cho phép người dùng thực hiện lần lượt như sau:",
                "The image illustrates the job management actions, allowing users to perform the following in order:"
              )}
            </P>
            <ol className="list-decimal list-outside pl-5 text-sm sm:text-[15px] text-white/70 space-y-1.5 mb-3">
              <li>
                {t("Thêm ghi chú cho công việc", "Add a note to the job")}
              </li>
              <li>
                {t(
                  "Nhấn để chỉnh sửa nội dung của công việc",
                  "Tap to edit the job's content"
                )}
              </li>
              <li>{t("Nhấn để xoá một công việc", "Tap to delete a job")}</li>
            </ol>

            <H3 id="tinh-nang-ghi-chu">
              {t("Tương tác với ghi chú", "Interacting with notes")}
            </H3>
            <Figure
              src="/images/interactive-note.png"
              alt="interactive-note"
              caption={t("Tương tác với ghi chú", "Interacting with notes")}
            />
            <P>
              {t(
                "Hình mô tả cách tương tác với các ghi chú của một công việc cụ thể. Để tương tác được với ghi chú, ngay tại đầu mỗi công việc có mũi tên hướng xuống — nhấn vào mũi tên để hiển thị danh sách ghi chú của công việc đó. Sau khi thấy được các ghi chú, bạn có thể thực hiện các thao tác sau, theo thứ tự đánh dấu trong hình:",
                "The image shows how to interact with the notes of a specific job. To interact with notes, each job has a down-facing arrow at the top — tap the arrow to reveal that job's note list. Once the notes are visible, you can perform the following actions, in the order marked in the image:"
              )}
            </P>
            <ol className="list-decimal list-outside pl-5 text-sm sm:text-[15px] text-white/70 space-y-1.5 mb-3">
              <li>
                {t(
                  "Nhấn vào nội dung ghi chú để thay đổi trạng thái đã hoàn thành hay chưa hoàn thành. Nếu ghi chú có chấm màu xanh nghĩa là đã hoàn thành, chấm màu đỏ nghĩa là chưa hoàn thành.",
                  "Tap a note's content to toggle its status between done and not done. A green dot means the note is done; a red dot means it is not done yet."
                )}
              </li>
              <li>
                {t(
                  "Xoá ghi chú nếu bạn muốn thay bằng ghi chú khác cho công việc đó",
                  "Delete a note if you want to replace it with a different note for that job"
                )}
              </li>
            </ol>

            <H3 id="tinh-nang-loc">
              {t("Lọc công việc theo nhu cầu", "Filtering jobs")}
            </H3>
            <Figure
              src="/images/filter-jobs.png"
              alt="filter-jobs-2"
              caption={t(
                "Lọc công việc theo nhu cầu",
                "Filtering jobs as needed"
              )}
            />
            <P>
              {t(
                "Bộ lọc cho phép người dùng nhấn chọn để hiển thị các công việc theo nhu cầu tìm kiếm cụ thể. Bạn có thể lọc theo trạng thái công việc, mức độ ưu tiên hoặc thời gian thực hiện. Nếu muốn hiển thị lại đầy đủ công việc, nhấn “Xoá bộ lọc” ở góc dưới bên trái của khu vực bộ lọc để huỷ các lựa chọn đã chọn. Ngoài ra, để tìm nhanh một công việc, bạn có thể gõ trực tiếp vào ô tìm kiếm.",
                "The filter lets users tap to display jobs matching a specific search need. You can filter by job status, priority level, or due date. To show the full job list again, tap “Clear filters” at the bottom-left of the filter area to reset your selections. You can also type directly into the search box to quickly find a job."
              )}
            </P>

            <H3 id="tinh-nang-them-moi">
              {t("Thêm mới công việc", "Creating a new job")}
            </H3>
            <P>
              {t(
                "Ngay tại giao diện quản lý công việc, bạn có thể thêm công việc trực tiếp tại biểu mẫu “Tạo công việc mới” để thêm các công việc cần làm trong ngày, trong tháng, v.v.",
                "Right from the job management screen, you can add a job directly using the “Create new job” form — for tasks you need to complete today, this month, and so on."
              )}
            </P>
          </section>

          <footer className="mt-10 pt-6 border-t border-white/10 flex items-center gap-2 text-xs text-white/25">
            <Settings2 className="w-3.5 h-3.5" />
            {t(
              "Tài liệu được cập nhật cùng phiên bản ứng dụng.",
              "This document is updated alongside the app version."
            )}
          </footer>
        </main>
      </div>

      {/* Mobile / tablet TOC drawer */}
      {tocOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-xs h-full bg-[#15151f] border-l border-white/10 p-5 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <p className="flex items-center gap-1.5 text-sm font-medium text-white">
                <LayoutGrid className="w-4 h-4 text-orange-400" />
                {t("Mục lục", "Table of contents")}
              </p>
              <button
                type="button"
                onClick={() => setTocOpen(false)}
                className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
                aria-label={t("Đóng", "Close")}
              >
                <X className="w-4.5 h-4.5 text-white/50" />
              </button>
            </div>
            <nav className="flex flex-col gap-0.5">
              {TOC.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToId(item.id)}
                  className={`text-left rounded-lg px-2.5 py-2 text-sm transition-colors hover:bg-white/[0.06] hover:text-white ${
                    item.level === 2
                      ? "font-medium text-white/80 mt-2"
                      : "text-white/45 pl-5"
                  }`}
                >
                  {t(item.vi, item.en)}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Image lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm px-4 py-8"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label={t("Đóng", "Close")}
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            onClick={(e) => e.stopPropagation()}
            className="max-w-full max-h-full rounded-xl border border-white/10 object-contain"
          />
        </div>
      )}

      {/* Back-to-top FAB */}
      {showTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label={t("Về đầu trang", "Back to top")}
          className="fixed bottom-5 right-5 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-orange-500 to-fuchsia-600 text-white flex items-center justify-center shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_10px_30px_-6px_rgba(217,70,239,0.5)] active:scale-95 transition-transform"
        >
          <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.25} />
        </button>
      )}

      {/* Language indicator hint for screen readers */}
      <span className="sr-only">
        <Globe className="w-0 h-0" />
        {t("Ngôn ngữ hiện tại: Tiếng Việt", "Current language: English")}
      </span>
    </div>
  );
};

export default Document;
