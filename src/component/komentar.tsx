import { useState } from "react";
import { BsDot } from "react-icons/bs";

export default function KomentarSection() {
  const [comment, setComment] = useState("");
  const comments = [
    {
      name: "Kohane",
      time: "28 Mar 2025 11:15",
      avatar: "https://res.cloudinary.com/duyurqj38/image/upload/v1747655460/munisekai/logo/icon/kohane.webp",
      text: "Mohon maaf, apakah sertifikatnya sudah tidak dapat diunduh ? Karena saya mau download ada konfirmasi bahwa TOTP aktivasi salah Bagaimana ya solusinya ?",
      replies: [
        {
          name: "Minori",
          time: "28 Mar 2025 11:15",
          avatar: "https://res.cloudinary.com/duyurqj38/image/upload/v1747655460/munisekai/logo/icon/minori.webp",
          text: "saya mengunduh sertifikatnya kok juga belumbisa",
        },
      ],
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto  p-4 rounded-md bg-white">
      <div className={"py-4 text-black relative size-fit"}>
        <h2 className="px-4 border-l-button-primary border-l-4 text-2xl font-bold">
          Komentar
        </h2>
      </div>
      {/* Input Box */}
      <div className="flex items-start gap-3 mb-4">
        <img
          src="https://res.cloudinary.com/duyurqj38/image/upload/v1747655461/munisekai/logo/icon/kanade.webp"
          alt="avatar"
          className="w-10 h-10 rounded-[8px]"
        />
        <div className="flex-1">
          <textarea
            rows={6}
            maxLength={50}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Apa yang ingin anda tanyakan?"
            className="w-full border border-gray-300 rounded-lg p-3 resize-none"
          />
          <div className="flex justify-between items-center mt-2">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Kirim
            </button>
            <span className="text-sm text-gray-500">{comment.length}/50</span>
          </div>
        </div>
      </div>

      {/* Comment List */}
      {comments.map((comment, i) => (
        <div key={i} className="mb-6 flex items-start gap-3">
          <img
            src={comment.avatar}
            className="w-10 h-10 rounded-[8px]"
            alt="user"
          />
          <div className="flex-1">
            <div className="flex gap-2 items-center mb-3">
            <p className="font-semibold text-sm text-[#526071]">{comment.name}</p>
            <BsDot/>
            <p className="text-xs text-gray-500">{comment.time}</p>
            </div>
            <p className="text-sm mb-2 text-Gray1">{comment.text}</p>
            <button className="text-button-primary font-semibold text-sm">Balas</button>

            {/* Replies */}
            {comment.replies?.map((reply, j) => (
              <div key={j} className="mt-4 ml-8 flex items-start gap-3">
                <img
                  src={reply.avatar}
                  className="w-8 h-8 rounded-[8px]"
                  alt="reply-user"
                />
                <div>
                  <div className="flex gap-2 items-center mb-3">
            <p className="font-semibold text-sm text-[#526071]">{reply.name}</p>
            <BsDot/>
            <p className="text-xs text-gray-500">{comment.time}</p>
            </div>
                  <p className="text-sm mt-1 text-Gray1">{reply.text}</p>
                  <button className="text-button-primary font-semibold text-sm mt-1">Balas</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="border-t border-t-card-default pt-4 mt-4 flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <label>Item per page</label>
          <select className="border rounded px-2 py-1 text-sm">
            <option>5</option>
            <option>10</option>
            <option>20</option>
          </select>
          <span>of 200</span>
        </div>
        <div className="flex items-center gap-1">
          <button className="px-2 py-1 hover:bg-gray-100 rounded">&lt;</button>
          <button className="px-2 py-1  text-button-primary rounded">1</button>
          <button className="px-2 py-1 hover:bg-gray-100 rounded">2</button>
          <button className="px-2 py-1 hover:bg-gray-100 rounded">&gt;</button>
        </div>
      </div>
    </div>
  );
}
