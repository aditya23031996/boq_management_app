export default function Footer() {
  return (
    <footer className="bg-white border-t mt-10">
      <div className="max-w-7xl mx-auto px-6 py-6 text-center">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-semibold text-[#154078]">
            Dheeradi Projects Private Limited
          </span>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
}
